import dist from '../util/dist';


class MovingObject {
  constructor(start, playerRadius) {
    this.COLORS = [
      "blue",
      "red",
      "yellow",
      "green",
      "orange",
      "purple",
      "pink"
    ];
    this.playerRadius = playerRadius;
    this.pos = this.generateRandomPosition();
    this.vel = this.generateRandomVelocity();
    this.radius = this.generateRandomRadius(playerRadius);
    this.color = this.COLORS[Math.floor(Math.random()*this.COLORS.length)];
    this.collidable = false;
    if(!start){
      this.blinking();
    }
    setTimeout(() => {
      this.collidable = true;
    }, 2000);

  }

  blinking() {
    let temp = this.color;
    this.color = "#f7f6f2";
    let startTime = new Date().getTime();
    let interval = setInterval(() => {
      if(new Date().getTime() - startTime > 2000){
        this.color = temp;
        clearInterval(interval);
        return;
      }
      this.color = this.color === "#f7f6f2" ? temp : "#f7f6f2";
    }, 250);
  }

  generateRandomRadius() {
    return Math.floor(Math.random() * ((this.playerRadius*3.5) - this.playerRadius/3.0)) + this.playerRadius/3.0;
  }

  generateRandomVelocity() {
    let randX = Math.floor(Math.random() * (2.2 - 0)) + 0;
    let randY = Math.floor(Math.random() * (2.2 - 0)) + 0;
    return [randX, randY];
  }

  generateRandomColor() {
    const HEX_DIGITS = "0123456789ABCDEF";
    let color = "#";
  for (let i = 0; i < 6; i++) {
    color += HEX_DIGITS[Math.floor((Math.random() * 16))];
  }

  return color;
}

  generateRandomPosition() {
    let randX = Math.floor(Math.random() * (1000 - 0)) + 0;
    let randY = Math.floor(Math.random() * (1000 - 0)) + 0;
    return [randX, randY];
  }

  collidesWith(player) {
    const centerDist = dist(this.pos, player.pos);
    return centerDist < (this.radius + player.radius);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.fill();
  }

  outOfBounds(pos){
    return (pos[0] < 0 || pos[0] > 1000 ||
            pos[1] < 0 || pos[1] > 700);
  }

  move() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if(this.outOfBounds(this.pos)){
      this.wrap();
    }
  }

  wrap(){
    if(this.pos[0] < 0){
      this.pos[0] = 1000;
    } else if(this.pos[0] > 1000) {
      this.pos[0] = 0;
    } else if(this.pos[1] < 0){
      this.pos[1] = 700;
    } else if(this.pos[1] > 700){
      this.pos[1] = 0;
    }
  }
}

export default MovingObject;
