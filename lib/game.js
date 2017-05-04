import Circle from './circle';
import Player from './player';
class Game {
  constructor(){
    this.circles = [];
    this.generateCircles();
    this.player = new Player();
  }

  generateCircles() {
    for(let i = 0; i < 15; i++){
      let circle = new Circle();
      this.circles.push(circle);
    }

    setInterval(() => this.circles.push(new Circle()), 1000);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 700, 700);
    ctx.fillStyle = "#f7f6f2";
    ctx.fillRect(0, 0, 700, 700);
    this.player.draw(ctx);
    ctx.beginPath();
    this.circles.forEach(circle => {
      circle.draw(ctx);
    });
    this.moveCircles();
  }

  moveCircles() {
    this.player.handleInput();
    this.circles.forEach(circle => {
      circle.move();
    });
    this.checkCollisions();
  }

  checkCollisions() {
    this.circles.forEach(circle => {
      if(circle.collidesWith(this.player)){
        this.player.handleCollision(circle);
      }
    });
  }
}


export default Game;
