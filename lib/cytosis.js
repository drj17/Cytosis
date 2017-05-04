import Game from './game';
import Viewport from './viewport';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("viewport");
  canvas.width = 1000;
  canvas.height = 700;


  const ctx = canvas.getContext("2d");
  const game = new Game();
  new Viewport(game, ctx);
});
