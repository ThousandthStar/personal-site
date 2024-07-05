---
title: "8bit Duels Devlog Part 2"
date: 2022-10-01T18:12:30-05:00
draft: false
---

Hello readers! This is my progress for week 2 of coding my multiplayer game with Rust and Bevy. This post is a bit late, and should’ve been out yesterday, but I wasn't able to make it in time. Anyways, here is my progress this week. As a reminder, this is only a side project, and I don't work on it for extended periods of time, so progress is slow.

In this post, we will cover three things:
 * **Asset loading**: how I load the sprites for my game and access them throughout the code.
 * **Spawning troops**: how I send the packets required to place troops on the board, which needs to be slightly different for each client.
 * **Game art progress**: my two new sprites for the game.

In this post, I will also show an image of how the game looks at the moment so you can give feedback in the comments, and maybe even come up with a name for the game (it still doesn't have one). Without further ado, let's get into it!

### Asset loading

I have decided that all my character sprites will be 8x pixel art tiles. The best way to handle that is to put them all in a sprite sheet and use Bevy's `TextureAtlas` struct and store it in a resource (`Res`) for our systems to use. This is done as such in the `game/card.rs` file:

```rust
// game/card.rs

pub(crate) struct CardSprites(
    pub(crate) Handle<TextureAtlas>,
    pub(crate) HashMap<String, usize>,
);

fn load_card_sprites(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
    mut texture_atlases: ResMut<Assets<TextureAtlas>>,
) {
    let sprite_sheet = asset_server.load("sprite_sheet.png");
    let atlas: TextureAtlas = TextureAtlas::from_grid(sprite_sheet, Vec2::splat(8.), 1, 1);

    let atlas_handle = texture_atlases.add(atlas);
    let mut card_sprite_map = HashMap::new();
    card_sprite_map.insert("skeleton".to_string(), 0);

    commands.insert_resource(CardSprites(atlas_handle, card_sprite_map));
}
```

Here, we load the sprite_sheet.png file, which is in our assets folder. We tell Bevy to parse it as a grid of 8x8 tiles. This gives us a `TextureAtlas`, from which we store a `Handle` (sort of reference struct for Bevy) into our `CardSprites` resource. This resource also contains a map that allows us to get the index of a character's texture with its name. This makes it very simple to add more characters later on. In other systems that need to access these sprites, we can just add `Res<CardSprites>` to the function arguments. That is very helpful, as we will see later on.

### Spawning troops

Now for the interesting part. We can finally start putting some stuff on the game board! To do this, we first have to go into the server side and code a way for it to send spawning packets to the clients.

```rust 
// net/packets.rs

pub fn spawn_troop(card: &Card, x_pos: i32, y_pos: i32, flip_board: bool) -> Packet {
        let mut json: Value = serde_json::from_str(
            r#"
            {
                "packet-type": "spawn-card"        
            }
        "#,
        )
        .unwrap();
        if let Value::Object(ref mut map) = json {
            let card_entity = CardEntity::new(
                card,
                if flip_board { 4 - x_pos } else { x_pos },
                if flip_board { 8 - y_pos } else { y_pos },
            );
            map.insert(
                "troop".to_string(),
                serde_json::to_value(&card_entity).unwrap(),
            );
        }
        Packet { data: json }
    }
}
```

This is mostly some simple JSON object creation. However, notice there is an argument called `flip_board`. If it is set to true, this boolean makes it so we flip the x and y positions of the troop on the board (it's a 5x9 board, that's why there's the 4 and the 8). This is necessary to insure that both clients see their perspective of the game. Here is what the handling of this packet looks like on the client side:  

```rust
// net/packet_handler.rs

"spawn-card" => {
    if !matches!(packet["troop"].clone(), Value::Null) {
        let result =
            serde_json::from_value::<CardEntity>(packet["troop"].clone());
        if result.is_ok() {
            let card_entity = result.unwrap();
            let mut sprite = TextureAtlasSprite::new(
                card_sprites
                    .1
                    .get(&card_entity.card.get_name())
                    .unwrap()
                    .clone(),
            );
            sprite.custom_size = Some(Vec2::splat(tile_size.0 * 0.8));

            commands
                .spawn_bundle(SpriteSheetBundle {
                    sprite,
                    texture_atlas: card_sprites.0.clone(),
                    transform: Transform::from_xyz(0., 0., 500.),
                    ..Default::default()
                })
                .insert(card_entity);
        }
    }
}
```

**Note:** we need to add `card_sprites: Res<CardSprites>,` to the function arguments so that we can access the sprites we loaded earlier.

Here, we get the troop data from the packet if it exists. This returns a `CardEntity` (if you don't know what this is, go check out the the week 1 devlog) that we can use to spawn the new troop. Here, it is placed at the (0, 0) coordinates. This is because we have another simple system that takes care of positioning the entities. This is what is looks like if we spawn a skeleton at (0, 0).

![sneak peak](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wjswoazqscm5fyoz3e1o.png)

### Game art progress

This week, I drew two very simple sprites that I'll hopefully  using by next week for character interactions. The blue tile is for movement and the red one is for attack.

![movement](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vwmouyeeymp4b9pa513p.png)

![attack](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lpjsr7yen2kn4ifz78vb.png)

### Meme of the week

It's that time again!

![java devs be like](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ejb76yq97w0d2prnapq4.jpg)

Once again, if you made it this far, thank you so much for reading. As for me, I'm out, and I hope to have some good progress to show for next week!

