---
title: "8bit Duels Devlog Part 1"
date: 2022-09-24T18:07:54-05:00
draft: false
---

Hello readers! Welcome to the week 1 devlog of my multiplayer game using Rust and the Bevy game engine. In this post, I will talk about my progress for the first week. This isn't the beginning of the project, but rather my first devlog. Without further ado, let's get into it!

Please note that you are more than welcome to comment on my code. Hints on how to make it more efficient, performant, etc. are greatly appreciated.

## Packet handling and bug fixes

I have just started the networking between the client and the server, and I already have had to fix two small but impactful  and hard to find bugs (one was hiding in plain sight but I was too stupid to see it). But first, we have to take a look at how the networking in managed on both the client and server side. They both make use of threads to read and write to each other via TCP. They also use the `std::sync::Mutex` class wrapped in a `std::sync::Arc` to safely manage mutable references to the packet queues (more on them later).
 
#### Client-side

###### Related files:
* **client/src/net/mod.rs**
* **client/src/net/input.rs**
* **client/src/net/out.rs**
* **client/src/net/packet_handler.rs**


Because of how the Bevy engine works, to get our packets to be read by the game, we need to pass them as resources to our App (Bevy uses the [ECS](https://en.wikipedia.org/wiki/Entity_component_system) architectural pattern). These resources can then be used by the systems that run on every time the game updates. These resources typically are tuple structs, because Bevy needs every different resource to be a different struct. We use a `VecDeque` object to make a queue for the packets, because it allows us to push data to the end of the queue, and then pop the front of it. Hence, we declare the queues as 

```rust 
// mod.rs
pub(crate) struct QueueIn(pub(crate) Arc<Mutex<VecDeque<String>>>);
pub(crate) struct QueueOut(pub(crate) Arc<Mutex<VecDeque<String>>>);
```

These create a way for our `handle_packets` to process and write packets.

```rust
// packet_handler.rs
fn handle_packets(
    mut queue_in: ResMut<QueueIn>,
    mut queue_out: ResMut<QueueOut>,
    mut commands: Commands,
    mut state: ResMut<State<GameState>>,
) {
    let mut guard = queue_in.0.lock().unwrap();

    if !guard.is_empty() {
        let packet_to_read = guard.pop_front().unwrap();
        let packet: Value =
            serde_json::from_str::<Value>(packet_to_read.as_str()).unwrap_or(Value::Null);

        if matches!(packet, Value::Object(_)) {

            if let Value::String(string) = packet["packet-type"].clone() {
                match string.as_str() {
                    "server-start-game" => {
                        state.set(GameState::Playing);
                    }
                    "none" => {
                        println!("bad packet from the server!")
                    }
                    &_ => {}
                }
            }
        }
    }
    drop(guard);
}
```
Here, we get the first packet (which is a `String` read from the TcpStream) in the queue and deserialize it using the `serde_json` crate. This parses it into a `Value` object, which represents JSON data. We then get the `"packet-type"` field from the JSON object, and if it exists, we use a simple `match` statement to handle the packet. You can also see that in the declaration of the function (functions represent systems in Bevy) that we tell Bevy to get the `QueueIn` and `QueueOut` resources, which is where the packets are located. We also need to `drop()` the `MutexGuard` (which gives us control over the queue) at the end of the function to let the rest of the code access it.

To read the packets from the server and to send the packets to it, we have too very basic threads that are spawned in `input.rs` and `out.rs`:

```rust
//input.rs
pub(crate) fn spawn_input_thread(
    queue_in_ref: Arc<Mutex<VecDeque<String>>>,
    mut reader: BufReader<TcpStream>,
) {
    thread::spawn(move || {
        let mut buffer: [u8; 1024] = [0; 1024];
        let mut received_data: usize;
        loop {
            received_data = reader.read(&mut buffer).unwrap_or(0);
            if received_data > 0 {
                if let Ok(string) = std::str::from_utf8_mut(&mut buffer) {
                    let mut guard = queue_in_ref.lock().unwrap();
                    guard.push_back(string.replace("\0", "").to_string());
                    drop(guard);
                    buffer = [0; 1024];
                } else {
                    println!("Got an invalid UTF-8 packet!")
                }
            } else {
                break;
            }
        }
    });
}
```

We are using a 1024 character buffer, which should be more than enough for the packets we will receive. One thing to note, and which caused a lot of headaches, is that we need to remove every `\0` (whitespace) character. This happens because the buffer is always larger than the packet, which causes it to add unnecessary characters to the end of the `String`. This causes `serde_json` to fail to parse the packet.

```rust
// out.rs
pub(crate) fn spawn_output_thread(queue_out_ref: Arc<Mutex<VecDeque<String>>>, mut stream: TcpStream){
    thread::spawn(move || {
        loop{
            let mut guard = queue_out_ref.lock().unwrap();
            if guard.is_empty() {drop(guard); continue;}

            if stream.write(guard.pop_front().unwrap().as_bytes()).is_err(){
                panic!("Error Writing to the server!");
            }
            drop(guard);
        }
    });
}
```

#### Server-side.

On the server side, we use a similar technique with the packet queues. However, here, they are managed by a `Game` struct which owns and operates on them (a `Game` represents a duel between two players). There isn't much to see here, since it's more of a simplified version of the client side, and we don't use Bevy for the server.

#### Common protocol

I haven't started coding the gameplay yet, but I've established a way to communicate the `Card` (or Troop, haven't decided on the name) data over the network. On both the client and the server, we have a `game` module, which contains the file `card.rs`. In this file, we define the structs that represent our `Card` data:

```rust
// card.rs
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Card {
    name: String,
    type_: CardType,
    hp: f32,
    attack: f32,
    cost: i32,
    abilities: Vec<CardAbility>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
enum CardType {
    TROOP,
    SPELL,
    BUILDING,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct CardEntity{
    card: Card,
    current_hp: i32,
} 

#[derive(Serialize, Deserialize, Clone, Debug)]
enum CardAbility {
    ProduceGold(i32),
}
```
As you can see, we have two `Card` structs and two enums. The `Card` struct defines the troops' stats, including their abilities, which are defined in the `CardAbility` enum (more abilities will be added later). This will be useful when we need to code the game logic and check a troop's properties. The `CardType` struct does not yet serve a specific purpose, but I still included it. Finally, the `CardEntity` struct represents a troop that is on the game board. It needs an additional hp (health points) property.

That concludes the brief coding progress progress made during this week.

#### Game art progress

I've finally decided on my color palette, and made this simple 8x skeleton pixel art, which I hope will be in the game at some point. I'm truly a beginner when it comes to art, however.

![skelly](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dlectqe8cjh7k3bopxer.png)

#### Meme of the week

It's time for the meme of the week: 
![meme](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qzaxb5orjql1hbh05p79.jpg)

#### Conclusion

If you made it this far, thank you very much for reading. This has been the week #1 of my multiplayer game devlog. I hope to continue this series and post updates every week.





