class Player {
  constructor() {
    this.pos = [250, 250];
    this.color = '#000000';
    this.radius = 18.0;
    this.collidable = false;
    this.dead = false;
    this.image = new Image();
    this.image.src = "./assets/green.png";
    this.shouldDraw = true;


    this.blinking();
    setTimeout(() => {
      this.collidable = true;
      this.color = '#000000';
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

  handleInput() {
    if(window.input.isDown('DOWN') && window.input.isDown('RIGHT')){
      this.pos[0] += 1.7;
      this.pos[1] += 1.7;
    } else if(window.input.isDown('DOWN') && window.input.isDown('LEFT')){
      this.pos[1] += 1.7;
      this.pos[0] -= 1.7;
    } else if(window.input.isDown('UP') && window.input.isDown('LEFT')){
      this.pos[1] -= 1.7;
      this.pos[0] -= 1.7;
    } else if(window.input.isDown('UP') && window.input.isDown('RIGHT')){
      this.pos[1] -= 1.7;
      this.pos[0] += 1.7;
    } else if(window.input.isDown('DOWN')){
      this.pos[1] += 1.7;
    } else if(window.input.isDown('UP')){
      this.pos[1] -= 1.7;
    } else if(window.input.isDown('LEFT')){
      this.pos[0] -= 1.7;
    } else if(window.input.isDown('RIGHT')){
      this.pos[0] += 1.7;
    }

    this.wrap();
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

  handleCollision(circle){
    if(this.collidable){
      if(this.radius >= circle.radius){
        this.radius += (circle.radius * .20);
        circle.radius = 0;
      } else {
        this.radius = 0;
        this.dead = true;
      }
    }
  }

  draw(ctx) {
    if(this.shouldDraw){
      ctx.drawImage(this.image, this.pos[0]-this.radius, this.pos[1]-this.radius, this.radius*2, this.radius*2);
    }
  }
}

export default Player;
