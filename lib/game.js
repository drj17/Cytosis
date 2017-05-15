import Circle from './circle';
import Player from './player';
class Game {
  constructor(){
    this.circles = [];
    this.player = new Player();
    this.playing = false;
    this.paused = false;
    this.sizeModifier = 1.0;
    this.maxRadius = 40;
    this.score = 0;
    this.gameOver = false;
    this.pauseOverlay = document.getElementById('pause-overlay');
    this.generateCircles();
    this.modal = document.getElementById("end-modal");
    this.restartBtn = document.getElementById("restart");
    this.restartBtn.addEventListener("click", () => this.restart());
    window.addEventListener('keydown', (e) => {
      if(e.keyCode === 32){
        this.restart();
      }
    });
  }

  unpause(){
    this.paused = false;
    this.pauseOverlay.style.display = 'none';
    this.interval = setInterval(() => {
      this.circles.push(new Circle(false, (this.player.radius*this.sizeModifier)));
    }, 1500);
  }

  pause(){
    this.paused = true;
    clearInterval(this.interval);
    this.pauseOverlay.style.display = 'block';
  }

  start(){
    this.playing = true;
    this.player = new Player();
    this.interval =
    setInterval(() => {
      this.circles.push(new Circle(false, (this.player.radius*this.sizeModifier)));
    }, 1500);
  }

  restart() {
    clearInterval(this.interval);
    this.circles = [];
    this.modal.style.display = "none";
    this.player = new Player();
    this.generateCircles();
    this.sizeModifier = 1.0;
    this.maxRadius = 40;
    this.score = 0;
    this.gameOver = false;
    this.start();
  }

  generateCircles() {
    for(let i = 0; i < 20; i++){
      let circle = new Circle(true, this.player.radius);
      this.circles.push(circle);
    }
  }

  draw(ctx) {

    if(this.player.radius > this.maxRadius){
      this.sizeModifier *= 0.75;
      this.maxRadius *= 1.3;
      this.shrink();
    }
    ctx.clearRect(0, 0, 1400, 700);
    this.player.draw(ctx);
    ctx.beginPath();
    this.circles.forEach(circle => {
      circle.draw(ctx);
    });
    ctx.font = "24pt Serif";
    ctx.fillStyle = "#49E5FE";
    if(!this.gameOver){
      ctx.fillText("Score: "+this.score, 8, 25);
    }
    this.moveCircles();
  }

  shrink() {
    this.player.radius *= this.sizeModifier;
    this.circles.forEach(circle => {circle.radius *= this.sizeModifier;});
  }

  setGameOver() {
    clearInterval(this.interval);
    this.circles = [];
    this.gameOver = true;
    this.modal.style.display = "block";

    const score = document.createTextNode(`Your score was: ${this.score}`);
    const scoreText = document.getElementById("score");
    scoreText.textContent = `Your score was: ${this.score}`;

  }

  moveCircles() {
    this.player.handleInput();
    this.circles.forEach(circle => {
      circle.move();
    });
    if(this.playing){
      this.checkCollisions();
    }
  }

  checkCollisions() {
    this.circles.forEach(circle => {
      if(circle.collidesWith(this.player) && circle.collidable){
        let circleRadius = circle.radius;
        this.player.handleCollision(circle);
        if (this.player.dead){
          this.setGameOver();
        } else if(this.player.collidable) {
          this.score += Math.round((circleRadius / this.sizeModifier));
        }
      }
    });
  }
}


export default Game;
