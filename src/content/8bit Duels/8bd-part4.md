---
title: "8bit Duels Devlog Part 4"
date: 2022-11-25T18:17:24-05:00
draft: false
---

Hello! Welcome to the fourth part of my devlog where I develop my multiplayer turn-based game. I previously didn't have a name, but I have decided to name it 8bit Duels! I think this fits the theme pretty nicely. Anyways, on with the devlog!

### Refactoring

This devlog is all about refactoring, and how I made my code cleaner. I did this by creating a workspace shared between the client and the server. This allows me to directly serialize and deserialize packets into `ClientMessage` and `ServerMessage` enum variants. One reason I adore Rust is because you can pass parameters to some enums. This is great in my case, as I need to send some data between the client and the server. These changes were suggested by a user in the Rust gamedev Discord server ([link to their website](https://gamedev.rs/)).

This refactoring was done over most of the networking code, so I won't show everything here. The code is on Github [here](https://github.com/ThousandthStar/8bit-duels) if you want to check it out (stars are greatly appreciated).

The main thing is that I now need less logic to handle packets. Before, I was creating some raw JSON in the client and putting a `packet-type` value in the object. I was then matching that value on the server-side, and vice-versa. This is an extremely bad practice, and it resulted in longer tedious code, since I needed to also get the other variables in the packets by their name in the JSON object. Now, I've just created a shared `common` package along with the client and server packages. It contains these simple API packets: 

```rust
#[derive(Serialize, Deserialize, Debug)]
pub enum ServerMessage {
    // 1st param: whether or not the player is player_1
    StartGame(bool),
    StartTurn,
    // 1st param: the `CardEntity` to spawn
    SpawnCard(CardEntity),
    /*
    1st param: the initial x position
    2nd param: the initial y position
    3rd param: the final   x position
    4th param: the final   y position
    */
    MoveTroop(i32, i32, i32, i32),
    AttackTroop(i32, i32, i32, i32),
}

#[derive(Serialize, Deserialize, Debug)]
pub enum ClientMessage {
    Deck(Vec<Card>),
    MoveTroop(i32, i32, i32, i32),
    AttackTroop(i32, i32, i32, i32),
}
```

Using `serde_json`, a great JSON library, I can just serialize and deserialize packets into enum variants. These are handled like so on the client (I removed, the logic, since it's very straightforward):

```rust
if let Some(message) = guard.pop_front() {
        match message {
            ServerMessage::StartGame(is_player_1) => {
                // Starting the game
            }
            ServerMessage::SpawnCard(card_entity) => {
                // Spawning troops
            }
            ServerMessage::MoveTroop(start_x, start_y, end_x, end_y) => {
                // Moving troops
            }
            ServerMessage::AttackTroop(start_x, start_y, end_x, end_y) => {
                // Attacking troops
            }
            _ => {}
        }
    }
```

On the server, we have something similar, but with `ClientMessage` instead.

### Conclusion

If you made it this far, thanks again for reading! This devlog was pretty short since there wasn't much to explain. I do plan on finishing this game as soon as possible, but I am very busy at the moment, so progress is very slow. With that, I hope you enjoyed and are somewhat hoping to try out my game in the future. See you next time!

**Special thanks to the user who helped me improve my code. Hints on grammar and best practices are always greatly appreciated.**

