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
    this.generateCircles();
    this.player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */]();
  }

  generateCircles() {
    for(let i = 0; i < 15; i++){
      let circle = new __WEBPACK_IMPORTED_MODULE_0__circle__["a" /* default */]();
      this.circles.push(circle);
    }

    setInterval(() => this.circles.push(new __WEBPACK_IMPORTED_MODULE_0__circle__["a" /* default */]()), 1000);
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


/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_input__ = __webpack_require__(5);


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

    const dt = time - this.lastTime;

    this.game.moveCircles();
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Viewport);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_dist__ = __webpack_require__(6);



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
    const centerDist = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util_dist__["a" /* default */])(this.pos, player.pos);
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
  canvas.width = 700;
  canvas.height = 700;


  const ctx = canvas.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
  new __WEBPACK_IMPORTED_MODULE_1__viewport__["a" /* default */](game, ctx);
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
  constructor() {
    this.pos = [250, 250];
    this.color = '#000000';
    this.radius = 20;
    this.collidable = false;
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
      this.pos[0] += 1.3;
      this.pos[1] += 1.3;
    } else if(window.input.isDown('DOWN') && window.input.isDown('LEFT')){
      this.pos[1] += 1.3;
      this.pos[0] -= 1.3;
    } else if(window.input.isDown('UP') && window.input.isDown('LEFT')){
      this.pos[1] -= 1.3;
      this.pos[0] -= 1.3;
    } else if(window.input.isDown('UP') && window.input.isDown('RIGHT')){
      this.pos[1] -= 1.3;
      this.pos[0] += 1.3;
    } else if(window.input.isDown('DOWN')){
      this.pos[1] += 1.3;
    } else if(window.input.isDown('UP')){
      this.pos[1] -= 1.3;
    } else if(window.input.isDown('LEFT')){
      this.pos[0] -= 1.3;
    } else if(window.input.isDown('RIGHT')){
      this.pos[0] += 1.3;
    }
  }

  handleCollision(circle){
    if(this.collidable){
      if(this.radius >= circle.radius){
        this.radius += (circle.radius * .25);
        circle.radius = 0;
      } else {
        this.radius = 0;
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


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const dist = (pos1, pos2) => {
  return Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
  );
};

/* harmony default export */ __webpack_exports__["a"] = (dist);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map