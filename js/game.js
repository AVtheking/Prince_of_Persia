// import { collisionMap } from "./main.js";
import Boundary, { collisionMap, objectCollision } from "./boundary.js";
import Player from "./player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frameCount = 12;
const frameInterval = 100;
const X = 137;
const Y = 263;

let isRightKeyPressed = false;
let fighting_mode = false;
let currentFrame = 1;
let lastTimestamp = 0;
let colliding = false;
let collidingRight = false;
let collidingLeft = false;

let kid = new Image();
let fighter = new Image();
let fight = new Image();

kid.src = "./images/idle/idle2.png";
fighter.src = "./images/sword.png";
fight.src = "./images/12.png";

const runningImages = [];
const idleImage = [];
const jumpImages = [];
const fightingImages = [];
const fightingMode_image = [];
const enemyImages = [];
const blockSizeX = 32;
const blockSizeY = 32;
let collisionBelow = false;
let collisonForward = false;
let collisionUp = false;

idleImage.push(kid);
fightingMode_image.push(fighter);
fightingImages.push(fight);

fillArray("running", 12, runningImages);
fillArray("jump", 4, jumpImages);
fillArray("enemy", 4, enemyImages);

export let prince = new Player(X, Y, 20, 25, idleImage);
export let enemy = new Player(656, 263, 25, 25, enemyImages);
export let enemy2 = new Player(400, 263, 25, 25, enemyImages);
export let enemy3 = new Player(816, 263, 25, 25, enemyImages);
export let enemy4 = new Player(400, 263, 25, 25, enemyImages);

function fillArray(folder, count, images) {
  for (let i = 1; i <= count; i++) {
    const image = new Image();
    image.src = `./images/${folder}/${i}.png`;
    images.push(image);
  }
}
export const boundaries = [];
collisionMap.forEach((row, i) => {
  row.forEach((block, j) => {
    if (block == 280)
      boundaries.push(
        new Boundary({
          position: {
            x: j * 32,
            y: i * 32,
          },
        })
      );
  });
});
function checkCollisions(X, Y) {
  let isCollision = false;
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i];
    if (
      objectCollision({
        object1: prince,
        object2: {
          ...boundary,
          position: {
            x: boundary.position.x + X,
            y: boundary.position.y + Y,
          },
        },
      })
    ) {
      isCollision = true;
      break;
    }
  }
  return isCollision;
}
//Movements
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight") {
    if (!checkCollisions(-5, 0)) {
      isRightKeyPressed = true;
      prince.setAnimation(runningImages);
      prince.move(event.key, 5);
    }
  } else if (event.key == "ArrowLeft") {
    if (!checkCollisions(5, 0)) {
      isRightKeyPressed = true;
      prince.setAnimation(runningImages);
      prince.move(event.key, 5);
    }
  }

  if (event.key == " " && isRightKeyPressed) {
    if (!checkCollisions(-32, 32)) {
      prince.jump(true);
      prince.setAnimation(jumpImages);
    }
  } else if (event.key == " ") {
    if (!checkCollisions(0, 32)) {
      prince.setAnimation(jumpImages);
      prince.jump();
    }
  }

  if (event.key == "z" && !fighting_mode) {
    fighting_mode = true;
    prince.setAnimation(fightingMode_image);
  } else if (event.key == "z" && fighting_mode) {
    fighting_mode = false;
    prince.setAnimation(idleImage);
  }

  if (event.key == "x" && fighting_mode) {
    prince.setAnimation(fightingImages);
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
    isRightKeyPressed = false;
    collidingRight = false;
    collidingLeft = false;
    if (fighting_mode) {
      prince.setAnimation(fightingMode_image);
    } else {
      prince.setAnimation(idleImage);
    }
  }

  if (event.key == " ") {
    collisonForward = false;
    if (fighting_mode) {
      prince.setAnimation(fightingMode_image);
    } else {
      prince.setAnimation(idleImage);
    }
  }
  if (event.key == "x" && fighting_mode) {
    prince.setAnimation(fightingMode_image);
  }
});
function animate(timestamp) {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionBelow = false;
  enemy.updateAnimation();
  enemy2.updateAnimation();
  enemy3.updateAnimation();
  prince.updateAnimation();

  enemy.draw(ctx);
  enemy2.draw(ctx);
  enemy3.draw(ctx);
  prince.draw(ctx);

  if (!checkCollisions(0, -1)) {
    prince.y += 0.5;
  } else {
    prince.jumping = false;
    prince.velocityY = 0;
  }

  if (prince.jumping) {
    prince.y += 0.1;
    if (prince.y >= prince.initialY) {
      prince.y = prince.initialY;
      prince.jumping = false;
    }
  }

  if (timestamp - lastTimestamp >= frameInterval) {
    lastTimestamp = timestamp;
  }

  requestAnimationFrame(animate);
}

Promise.all(
  runningImages.map(
    (image) => new Promise((resolve) => (image.onload = resolve))
  )
).then(() => {
  lastTimestamp = performance.now();
  animate(lastTimestamp);
});
