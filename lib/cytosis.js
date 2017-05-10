import Game from './game';
import Viewport from './viewport';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("viewport");
  canvas.width = 1400;
  canvas.height = 700;
  const ctx = canvas.getContext("2d");
  const game = new Game();
  const viewPort = new Viewport(game, ctx);
  const btn = document.getElementById("start");
  const modal = document.getElementById("modal");

  document.addEventListener('keydown', (e) => {
    if(e.keyCode === 32 && !game.playing){
      modal.style.display = "none";
      game.start();
    } else if(e.keyCode === 13){
      viewPort.paused = !viewPort.paused;
      game.paused ? game.unpause() : game.pause();
    }
  });

  btn.onclick = function() {
    modal.style.display = "none";
    game.start();
  };
});
