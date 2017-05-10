import dist from '../util/dist';


class MovingObject {
  constructor(start, playerRadius) {
    this.img1 = new Image();
    this.img1.src = "./assets/brown.png";
    this.img2 = new Image();
    this.img2.src = "./assets/black.png";
    this.img3 = new Image();
    this.img3.src = "./assets/yellow.png";
    this.IMAGES = [
      this.img1,
      this.img2,
      this.img3
    ];
    this.playerRadius = playerRadius;
    this.pos = this.generateRandomPosition();
    this.vel = this.generateRandomVelocity();
    this.radius = this.generateRandomRadius(playerRadius);
    this.image = this.IMAGES[Math.floor(Math.random()*this.IMAGES.length)];
    this.shouldDraw = true;
    this.collidable = false;
    if(!start){
      this.blinking();
    }
    setTimeout(() => {
      this.collidable = true;
    }, 2000);

  }

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

  generateRandomRadius() {
    return Math.floor(Math.random() * ((this.playerRadius*4) - this.playerRadius/1.5)) + this.playerRadius/1.5;
  }

  generateRandomVelocity() {
    let randX = Math.floor(Math.random() * (2.2 - 0)) + 0;
    let randY = Math.floor(Math.random() * (2.2 - 0)) + 0;
    return [randX, randY];
  }

  generateRandomPosition() {
    let randX = Math.floor(Math.random() * (1400 - 0)) + 0;
    let randY = Math.floor(Math.random() * (1400 - 0)) + 0;
    return [randX, randY];
  }

  collidesWith(player) {
    const centerDist = dist(this.pos, player.pos)*1.1;
    return centerDist < (this.radius + player.radius);
  }

  draw(ctx) {
    if(this.shouldDraw){
      ctx.drawImage(this.image, this.pos[0]-this.radius, this.pos[1]-this.radius, this.radius*2, this.radius*2);
    }
  }

  outOfBounds(pos){
    return (pos[0] < 0 || pos[0] > 1400 ||
            pos[1] < 0 || pos[1] > 700);
  }

  move() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if(this.outOfBounds(this.pos)){
      this.wrap();
    }
  }

  wrap(){
    if(this.pos[0] < -30){
      this.pos[0] = 1430;
    } else if(this.pos[0] > 1430) {
      this.pos[0] = -30;
    } else if(this.pos[1] < -30){
      this.pos[1] = 730;
    } else if(this.pos[1] > 730){
      this.pos[1] = -30;
    }
  }
}

export default MovingObject;
