import {
  boundaries,
  enemy,
  enemy2,
  enemy3,
  enemy5,
  enemy6,
  enemy7,
  enemy8,
  enemy9,
  prince,
} from "./game.js";

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
  // console.log(x);
  boundaries.forEach((boundary) => {
    boundary.drawRect();
  });

  if (canvas.width - prince.x <= 150) {
    gamespeed = 50;
  } else if (prince.x <= 50) {
    gamespeed = -50;
  } else {
    gamespeed = 0;
  }

  if (x == -2200) x = -2200;
  else {
    prince.x -= gamespeed;
    x -= gamespeed;
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
    enemy9.x -= gamespeed;
  }

  requestAnimationFrame(animate);
}
animate();
