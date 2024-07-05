---
title: "8bit Duels Devlog Part 3"
date: 2022-10-09T18:15:02-05:00
draft: false
---

Hello Readers! Welcome to the third devlog on this series where I code a multiplayer turn-based strategy game! If you haven't read the three previous posts, go check them out! This week, I created a simple and exciting selecting system for my troops. Without further ado, let's get into it. Hope you enjoy!

## Troop selecting

In the last devlog, I talk about how I implemented the spawning mechanism in my game. Essentially, placing some troops on the board. This went very well and is now fully functional. However, we still need to be able to select those troops and move them. This is what it looks like after this week:

![ss 1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/maxl2s37d9nuw1zwri65.png)

Here the skeleton is not clearly distinguishable, so I'll make sure to change some colors for next time.

![ss 2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0agwjxjjun2losdc3npg.png)

The code for this was actually quite long, so I'll simply sum it up for you. Essentially, we spawn on every board tile two entities, one for movement interactions and one for attack interactions. These both have their own separate components named `MoveInteraction` and `AttackInteraction`. They are always invisible, except when the `SelectedCardEntity` resource (which is an `Option<CardEntity>`) contains an entity. When that happens, if they are close enough to that entity, we show them. Pretty simple, right? Well, this took around about 200 lines of code. However, I think the result is definitely worth it.

#### Meme of the week

![meme](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oloxwgnxkl3719rdqj8g.jpg)

#### Conclusion

In conclusion, this was a very short devlog for this week, and it's a bit late. Normally, I would post on Friday, but I think I'll start doing it on the weekends. I may even only post every other week, since I don't have enough progress to show for after a week. 

In addition, the code is now on Github for everyone to see! You can find it at [here](https://github.com/ThousandthStar/multiplayer_game)

Finally, I would like to say thank you if you read this post all the way. This was a short one.

