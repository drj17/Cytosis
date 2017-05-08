/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__circle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(4);


class Game {
  constructor(){
    this.circles = [];
    this.player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */]();
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
    this.player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */]();
    setInterval(() => this.circles.push(new __WEBPACK_IMPORTED_MODULE_0__circle__["a" /* default */](false, this.player.radius)), 1250);
  }

  generateCircles() {
    for(let i = 0; i < 20; i++){
      let circle = new __WEBPACK_IMPORTED_MODULE_0__circle__["a" /* default */](true, this.player.radius);
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


/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_input__ = __webpack_require__(6);


class Viewport {
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    this.start();
  }

  start() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_input__["a" /* default */])();
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

/* harmony default export */ __webpack_exports__["a"] = (Viewport);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_dist__ = __webpack_require__(5);



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
    return Math.floor(Math.random() * ((this.playerRadius*3.2) - this.playerRadius/3.0)) + this.playerRadius/3.0;
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
    const centerDist = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_dist__["a" /* default */])(this.pos, player.pos);
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

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewport__ = __webpack_require__(1);



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("viewport");
  canvas.width = 1000;
  canvas.height = 700;


  const ctx = canvas.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  new __WEBPACK_IMPORTED_MODULE_1__viewport__["a" /* default */](game, ctx);
  const btn = document.getElementById("start");
  const modal = document.getElementById("modal");
  btn.onclick = function() {
    modal.style.display = "none";
    game.start();
  };
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const dist = (pos1, pos2) => {
  return Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
  );
};

/* harmony default export */ __webpack_exports__["a"] = (dist);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const registerEventListeners = () => {
  let pressedKeys = {};

  const setKey = (event, status) => {
    let code = event.keyCode;
    let key;

    switch(code){
      case 65, 37:
        key = 'LEFT';
        break;
      case 87, 38:
        key = 'UP';
        break;
      case 68, 39:
        key = 'RIGHT';
        break;
      case 83, 40:
        key = 'DOWN';
        break;
      default:
        break;
    }

    pressedKeys[key] = status;
  };

  document.addEventListener('keydown', (e) => {
    setKey(e, true);
  });
  document.addEventListener('keyup', (e) => {
    setKey(e, false);
  });
  window.addEventListener('blur', () => {
    pressedKeys = {};
  });
  window.input = {
    isDown: (key) => { return pressedKeys[key];}
  };
};

/* harmony default export */ __webpack_exports__["a"] = (registerEventListeners);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map