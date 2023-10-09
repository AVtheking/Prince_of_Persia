import {
  boundaries,
  enemy,
  enemy2,
  enemy3,
  enemy5,
  enemy6,
  enemy7,
  enemy8,
  prince,
} from "./game.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 400);
const CANVAS_HEIGHT = (canvas.height = 320);

let gamespeed = 0;
const backgroundLayer1 = new Image();
backgroundLayer1.src = "./images/prince-of persia-map.png";

export let WIDTH = 0;

const movables = [...boundaries];

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer1, WIDTH, 0);
  // console.log(x);
  boundaries.forEach((boundary) => {
    boundary.drawRect();
  });

  if (canvas.width - prince.x <= 150) {
    gamespeed = 1;
  } else if (prince.x <= 50) {
    gamespeed = -1;
  } else {
    gamespeed = 0;
  }

  if (WIDTH == -2200) WIDTH = -2200;
  else {
    prince.x -= gamespeed;
    WIDTH -= gamespeed;
    movables.forEach((movable) => {
      movable.position.x -= gamespeed;
    });
    // testBoundary.position.x -= gamespeed;
    enemy.x -= gamespeed;
    enemy2.x -= gamespeed;
    enemy3.x -= gamespeed;
    enemy5.x -= gamespeed;
    enemy6.x -= gamespeed;
    enemy7.x -= gamespeed;
    enemy8.x -= gamespeed;
    gamespeed += 1;
  }

  requestAnimationFrame(animate);
}
animate();
