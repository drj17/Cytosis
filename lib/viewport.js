import registerEventListeners from '../util/input';

class Viewport {
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.start();
  }

  start() {
    registerEventListeners();
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    if(!this.game.gameOver){
      const dt = time - this.lastTime;

      this.game.moveCircles();
      this.game.draw(this.ctx);
      this.lastTime = time;

      requestAnimationFrame(this.animate.bind(this));
    } else {
        this.ctx.fillText("Game Over! Your Final Score: " + this.game.score, 290, 350);
    }
  }

}

export default Viewport;
