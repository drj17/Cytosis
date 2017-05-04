import dist from '../util/dist';


class MovingObject {
  constructor() {
    this.pos = this.generateRandomPosition();
    this.vel = this.generateRandomVelocity();
    this.radius = this.generateRandomRadius();
    this.color = this.generateRandomColor();
  }

  generateRandomRadius() {
    return Math.floor(Math.random() * (80 - 2)) + 2;
  }

  generateRandomVelocity() {
    let randX = Math.floor(Math.random() * (2 - 0)) + 0;
    let randY = Math.floor(Math.random() * (2 - 0)) + 0;
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
    let randX = Math.floor(Math.random() * (750 - 0)) + 0;
    let randY = Math.floor(Math.random() * (750 - 0)) + 0;
    return [randX, randY];
  }

  collidesWith(player) {
    const centerDist = dist(this.pos, player.pos);
    return centerDist < (this.radius + player.radius);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  move() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  }
}

export default MovingObject;
