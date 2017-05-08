class Player {
  constructor() {
    this.pos = [250, 250];
    this.color = '#000000';
    this.radius = 15.0;
    this.collidable = false;
    this.dead = false;
    
    this.blinking();
    setTimeout(() => {
      this.collidable = true;
      this.color = '#000000';
    }, 2000);
  }

  blinking() {
    this.color = "#f7f6f2";
    let startTime = new Date().getTime();
    let interval = setInterval(() => {
      if(new Date().getTime() - startTime > 2000){
        clearInterval(interval);
        return;
      }
      this.color = this.color === "#f7f6f2" ? "#000000" : "#f7f6f2";
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
      this.pos[0] = 1030;
    } else if(this.pos[0] > 1030) {
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
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

export default Player;
