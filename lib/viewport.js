import registerEventListeners from '../util/input';

class Viewport {
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.start();
    this.paused = false;
  }

  start() {
    registerEventListeners();
    this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const dt = time - this.lastTime;
    if(!this.paused){
      this.game.moveCircles();
      this.game.draw(this.ctx);
      this.lastTime = time;
    }
    requestAnimationFrame(this.animate.bind(this));
  }

}

export default Viewport;
