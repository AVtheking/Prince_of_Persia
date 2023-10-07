import { boundaries, enemy, enemy2, enemy3, prince } from "./game.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 400);
const CANVAS_HEIGHT = (canvas.height = 320);

let gamespeed = 0;
const backgroundLayer1 = new Image();
backgroundLayer1.src = "./images/prince-of persia-map.png";

let x = 0;

const movables = [...boundaries];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer1, x, 0);
  boundaries.forEach((boundary) => {
    boundary.drawRect();
  });

  if (canvas.width - prince.x <= 50) {
    gamespeed = 100;
  } else if (prince.x <= 50) {
    gamespeed = -100;
  } else {
    gamespeed = 0;
  }

  if (x < -2400) x = 2400 - gamespeed;
  else {
    x -= gamespeed;
    movables.forEach((movable) => {
      movable.position.x -= gamespeed;
    });
    // testBoundary.position.x -= gamespeed;
    prince.x -= gamespeed;
    enemy.x -= gamespeed;
    enemy2.x -= gamespeed;
    enemy3.x -= gamespeed;
  }

  requestAnimationFrame(animate);
}
animate();
