---
title: "8bit Duels Devlog Part 5"
date: 2023-01-02T22:19:57+01:00
draft: false
---

👋 Hi again! This is part 5 of my devlog where I code my multiplayer turn-based strategy game.
It's been a while since I made a devlog, so there's quite a bit to unpack here.
Priorities have changed for the better, gameplay mechanics have been established, a community chat has been created, and an artist has joined forces with me to create the game!
There's been quite a bit of progress made in the code as well. Without any further ado, let's get into it!

### Announcements

* #### Testing Community

I knewly created a Discord server ([link](https://discord.gg/NbBcF4bGU5)) for anyone interested in testing the game.
There, I will post updates on the development of 8bit Duels, and I'll set a server up when the game will be in MVP stage.
The game is almost ready to be played, so join if you want to be notified of that!

* #### New Artist

One of my friends agreed to make pixel art for my game! He is way more talented than me, so the art is much better and detailed with his help.
You will see more of his work down below.

### Prioritizing Gameplay

After I left off the devlog last time, I started working on the game's UI. However, this just detracted me from the gameplay coding.
I also had issues with the UI library I was using, and wasn't making any real progress.
However, once I started focusing more on the gameplay, things started to pick up rapidly.

### Gameplay Elements

Since my last devlog, I have added many things, the most important of which being the turn system.
Now, players each take turns placing troops, moving them and attacking with them.
I also added the ability to spawn troops, and to win the game with them (if the are on the last row of the board and have the ability to move, then you can use them to win the game).
When a player spawns troops, it is automatically stunned for one turn. While stunned, it can't attack or move.

I also added the two game currencies. The first is the number of pawns, which determines how many troops a single player can have on the board at the same time.
When placing a troop, you loose one pawn. When one of your troops dies, you gain one.
One interesting mechanic this brings is the possibility to make troops that require more than one pawn to be placed, and they might be more powerful.
Another possibility would be to add a card ability that would increase your total number of troops.
The other currency in my game will be the number of spirits. These are used to buy troops.
The initial concept behind them was the idea that you would make pawns become alive by being infused with spirits.
The more powerful the troop, the more spirits it needs to be spawned. Also, when you defeat an enemy troop, you gain half of the spirits that were spent to spawn that troop, rounded down to an integer.
Players also gain one spirit every turn.

#### Troop Abilities

To make the gameplay more interesting, I added these new abilities (they haven't been fully implemented yet):

* **Spirit Collector**: When the troop that has this ability defeats an enemy, the player receives all of the spirits spent to spawn the enemy, instead of half.
* **Multi Attack**: When a troop has this ability, it can attack multiple times per turn (the amount of maximum attacks changes per troop).
* **Stun**: This troop has the ability to stun enemy troops when attacking them.

There are many more abilities to come.

#### Troops

##### **Skeleton**: The skeleton got a new sprite, which looks like this: 

![skeleton](/static/skeleton.png)

Here are the stats for the skeleton:

* **Health Points**: 5
* **Attack Damage**: 3
* **Spirit Cost**: 2
* **Abilities** None

##### **Reaper**: Here is the new reaper!

![reaper](/static/reaper.png)

Here are his stats:

* **Health Points**: 6
* **Attack Damage**: 4
* **Spirit Cost**: 5
* **Abilities**: Spirit Collector

##### **Kraken**: Here is the new kraken!

![kraken](/static/kraken.png)

Here are its stats:

* **Health Points**: 12
* **Attack Damage**: 1
* **Spirit Cost**: 5
* **Abilities**: Multi Attack 3

##### **Spider**: Here is the new spider!

![spider](/static/spider.png)

Here are its stats:

* **Health Points**: 4
* **Attack Damage**: 2
* **Spirit Cost**: 4
* **Abilities**: Stun 1

### Conclusion

If you've read this far, thank you! This devlog was pretty long, and I think I will no longer be showing snippets of code in the future.
The code, as always, is available on [Github](https://github.com/ThousandthStar/8bit-duels).
That is all for me, I will see you in the next one!
