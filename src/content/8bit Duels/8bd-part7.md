---
title: "8bit Duels Devlog Part 7"
date: 2023-07-24T21:59:49-04:00
draft: false
---


Hey, welcome to yet another 8bit Duels devlog. It has been almost 4 MONTHS since my last post, mainly because I was
waiting to have completed the UI (menus) before releasing another devlog. However, I am not quite done, so I thought I'd
share my progress so far. I have also implemented the debug mode setting, have added my chiptune song to the main menu, 
and have improved my workflow through Github Issues.

## UI Library

To build the whole UI, I initially decided to go with the default `bevy_ui` crate. I tried to use `egui` for a bit, then experimented with
`kayak_ui`. In the end, I settled with the default UI crate, since, while being extremely verbose and requiring a lot of boilerplate,
it is simple in all its aspects.

However, I have just discovered the `belly` crate which leverages the power of Rust macros to provide
a declarative UI framework that is directly translated to `bevy` components. I will rewrite my whole UI
using `belly`, as it removes all of the boilerplate associated with the `bevy_ui` crate. It is also extremely simple
to use, and UIs are declared using `eml` syntax (similar to `html`).

## UI Changes 

#### Main Menu

For the main menu, I drew an animated background with the four characters currently implemented in the game (Skeleton, Reaper,
Kraken and Spider).

![Main Menu UI](/static/ui_main_menu.png)
_Image of the main menu UI_

#### Settings Menu

The settings now are stored inside the `config.ron` file (inside the assets folder). This isn't ideal, as I load the file 
with standard IO. I may change it in the future by creating a custom Bevy asset type for the settings. Anyways, here is the
settings menu:

![Settings Menu UI](/static/ui_settings.png)
_Image of the settings menu UI_

#### In-Game UI

The in-game UI is by far the longest to implement. I have laid out most of the UI widgets, but I still have to connect it to the 
logic (so the buttons can... you know... do their buttoning). 

![In-Game UI](/static/ui_in_game.png)
_Image of the in-game UI_

## That's it!

Yes, that's it! 4 months of work, and only this! I agree it isn't much progress, but I was extremely busy with some other projects,
and school of course. Now, I just decided to rebuild the whole UI, \*sigh\*. It should be much faster though. The `belly` crate is
awesome, and I highly recommend it to all my fellow game developers using `bevy`.

## Pixel Artist

I am not exactly an artist, and I am slightly unsatisfied about the pixel art in 8bit Duels (someone else made it, but they aren't
going to continue helping out with the project). I am considering AI art (using Stable Diffusion) to redo all the art, but 
AI isn't quite ready to do pixel art (from what I can tell). If any pixel artists are reading this and would like to contribute some 
art (there isn't much to do, as the characters don't have animations), please join the [Discord server](https://discord.com/invite/NbBcF4bGU5) so we can talk. 

## Contributions

If anyone is interested in contributing code to 8bit Duels, please join the Discord or open/comment on issues on the [Github Repository](https://github.com/ThousandthStar/8bit-duels).
Many new features could be implemented, and I am open to feedback. For example, the Discord community told me that a dark mode
may be preferable for the UI. It would be great if others implemented suggestions such as this, as my main focus is to add the missing features to 8bit Duels.
There is no documentation in the repository, and barely any comments, but if anyone asks me about how my messy code works, I will 
gradly guide them so they can contribute.


## Conclusion

As I always write, if you made it this far, thank you. I will try to finish a minimum version of 8bit Duels before the end of the summer.
This is mostly a learning project, and it has absolutely succeeded in this regard. I am grateful for all of you following my progress.
I may switch over to web development using Rust of Javascript after I am done with 8bit Duels. Anyways, I am not quite done. I will serveryou in the next devlog, hopefully soon! 















