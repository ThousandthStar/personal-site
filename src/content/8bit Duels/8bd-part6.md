---
title: "8bit Duels Devlog Part 6"
date: 2023-03-29T13:12:50-04:00
draft: false
---

Hey again 👋 ! I'm back with another devlog for my game 8bit Duels!
This is devlog #6 and it includes some pretty interesting bits. Let's get into it!
Also, to discuss the game and follow the development more closely, you can join the [Discord](https://discord.com/invite/NbBcF4bGU5). 
A Revolt bridge is also available, please message me privately if you want to join that instead.

## Changes 
This devlog includes mostly gameplay polish change, to make the game easier to understand and to follow.
* Indicator for stunned troops
* Selected troop indicator
* Ownership indicators
* Movement animations
* Attack animations
* In-game chat feature
* Settings menu


### Indicator for Stunned Troops

Before, the only way to tell if a troop was stunned was to click it and look on the sidebar UI.
Now, a simple yellow outline will tell you without you needing to click the troop.
It looks like this:

![stun_indicator](/static/stun_indicator.png)

### Selected Troop Indicator

Now, the selected troop is highlighted with black square corners like this:

![select_indicator](/static/select_indicator.png)

### Ownership Indicators

Now, if you own a troop, it will have a blue background. 
Enemy troops on the otherhand, have a red background, just like this:

![ownership](/static/ownership_indicators.png)

### Movement Animations

These are the new movement animations for the troops. 
I had to rewrite the code for ownership indicators for the animations to work correctly.
The method I was using before was very dumb: I assigned ownership indicators to troops every frame, and that lead to some bizarre bugs. 
Instead, I now just spawn them as children of the troop they indicate the ownership of.
That way, it is a lot simpler to control them (making them invisible when the troop is performing an animation).

![movement_anims](/static/movement_animations.gif)

**Note:** this is a GIF, and the pixel art is a bit weird. I wasn't able to get normal videos to work,
so I stuck with this. If anyone know how to add an MP4 video to Hugo, please send me a message.

### Attack Animations

These are the new attack animations: 

![attack_anims](/static/attack_animations.gif)

### In-Game Chat Feature

The game now has a chat in game! This means you may discuss with your opponent while player.
Usernames are also coming soon (although they will just be local, there is no account system yet).

![chat](/static/chat.png)

### Settings Menu 

Here is the new settings menu: 

![settings](/static/settings_menu.png)

The server address is the only working setting at the moment though.
As mentionned before, usernames are coming in the future.
Also, while debug mode is technically working, it doesn't show anything else more than the usually game. 
That is also coming in the future.

### Conclusion

If you made it this far, as always, thanks for reading!
I pour a ton of time into this project and hope to see it be played soon.
You can test the game locally by downloading the code ([Github](https://github.com/ThousandthStar/8bit-duels)). Just remember to add `-- dev` when using `cargo run` to not make the game crash when running two instances.

Finally, [here](https://drive.google.com/file/d/1lnzNvxDk5PSc_qFp1iYzUJ3Ekx4i0ESM/view?usp=share_link) is a little chiptune song I've been working on.
