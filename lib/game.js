import Circle from './circle';
import Player from './player';
class Game {
  constructor(){
    this.circles = [];
    this.player = new Player();
    this.playing = false;
    this.generateCircles();
    this.sizeModifier = 1.0;
    this.maxRadius = 40;
    this.score = 0;
    this.gameOver = false;
    this.modal = document.getElementById("end-modal");
  }

  start(){
    this.playing = true;
    this.player = new Player();
    setInterval(() => this.circles.push(new Circle(false, this.player.radius)), 1250);
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
    ctx.clearRect(0, 0, 1000, 700);
    ctx.fillStyle = "#f7f6f2";
    ctx.fillRect(0, 0, 1000, 700);
    this.player.draw(ctx);
    ctx.beginPath();
    this.circles.forEach(circle => {
      circle.draw(ctx);
    });
    ctx.font = "24pt Serif";
    ctx.fillStyle = "#000000";
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
    this.gameOver = true;
    this.modal.style.display = "block";
    const restartBtn = document.getElementById("restart");
    restartBtn.addEventListener("click", () => {
      this.gameOver = false;
      this.modal.style.display = "none";
      this.start();
    });
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
