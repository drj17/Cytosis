# Cytosis

[Live Demo](http://david-janas.com/Cytosis)

### About

Cytosis is javascript recreation of the classic Feeding Frenzy game. The player
controls a small bacteria and can move around the view plane with
the arrow keys.  The player must consume smaller bacteria to
grow in size while avoiding being eaten by larger ones.  

Cytosis uses HTML5 Canvas to draw the game, and vanilla JavaScript to handle the game logic.

### How to Play
- Space to start or restart
- Arrow keys to move
- Avoid enemies larger than you while eating enemies smaller than you
- See how high of a score you can get!

### Features

#### 2D-Rendering

![gamescreen]('http://i.imgur.com/rnFSTjm.jpg')

Cytosis uses Canvas to render the player and enemy sprites.  JavaScript is used
to handle collision-detection

```
collidesWith(player) {
  const centerDist = dist(this.pos, player.pos);
  return centerDist < (this.radius + player.radius);
}
```

Both the player and enemies are invulnerable for a few seconds after being
created, this is accomplished using intervals to conditionally draw the sprites

```
blinking() {
  let startTime = new Date().getTime();
  let interval = setInterval(() => {
    if(new Date().getTime() - startTime > 2000){
      this.shouldDraw = true;
      clearInterval(interval);
      return;
    }
    this.shouldDraw = !this.shouldDraw;
  }, 250);
}
```
#### Gameplay

After eating an enemy, the players sprite increases based on the size of
the enemy.  The enemies radius is then added to the score.

```
if(circle.collidesWith(this.player) && circle.collidable){
  let circleRadius = circle.radius;
  this.player.handleCollision(circle);
  if (this.player.dead){
    this.setGameOver();
  } else if(this.player.collidable) {
    this.score += Math.round((circleRadius / this.sizeModifier));
  }
}
```

### Future Features
- [ ] Add leaderboard for player scores
