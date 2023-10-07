import Player from "./player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frameCount = 12;
const frameInterval = 100;
const X = 128;
const Y = 268;
let animationInterval;
// let isPressed = false;
let isRightKeyPressed = false;
let fighting_mode = false;
let currentFrame = 1;
let lastTimestamp = 0;

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

idleImage.push(kid);
fightingMode_image.push(fighter);
fightingImages.push(fight);

fillArray("running", 12, runningImages);
fillArray("jump", 4, jumpImages);
fillArray("enemy", 4, enemyImages);
// fillArray("fighting", 10, fightingImages);

export let prince = new Player(X, Y, 15, 20, idleImage);
export let enemy = new Player(656, 268, 20, 20, enemyImages);
export let enemy2 = new Player(400, 268, 20, 20, enemyImages);
export let enemy3 = new Player(816, 268, 20, 20, enemyImages);
export let enemy4 = new Player(400, 268, 20, 20, enemyImages);

function fillArray(folder, count, images) {
  for (let i = 1; i <= count; i++) {
    const image = new Image();
    image.src = `./images/${folder}/${i}.png`;
    images.push(image);
  }
}
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
    // isPressed = true;
    isRightKeyPressed = true;
    prince.setAnimation(runningImages);
    prince.move(event.key, 5);
  }

  if (event.key == " " && isRightKeyPressed) {
    // isPressed = true;
    prince.jump(true);
    prince.setAnimation(jumpImages);
  } else if (event.key == " ") {
    // isPressed = true;

    prince.setAnimation(jumpImages);
    prince.jump();
  }

  if (event.key == "z" && !fighting_mode) {
    fighting_mode = true;
    prince.setAnimation(fightingMode_image);
  } else if (event.key == "z" && fighting_mode) {
    fighting_mode = false;
    prince.setAnimation(idleImage);
  }

  if (event.key == "x" && fighting_mode) {
    // isPressed = true;
    prince.setAnimation(fightingImages);
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
    // isPressed = false;
    isRightKeyPressed = false;
    if (fighting_mode) {
      prince.setAnimation(fightingMode_image);
    } else {
      prince.setAnimation(idleImage);
    }
    // clearInterval(animationInterval);
  }

  if (event.key == " ") {
    if (fighting_mode) {
      prince.setAnimation(fightingMode_image);
    } else {
      prince.setAnimation(idleImage);
    }
  }
  if (event.key == "x" && fighting_mode) {
    // isPressed = false;
    prince.setAnimation(fightingMode_image);
    // clearInterval(animationInterval);
  }
});
function animate(timestamp) {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(prince.x);
  // Update the game state for all objects (player and enemy)
  enemy.updateAnimation();
  enemy2.updateAnimation();
  enemy3.updateAnimation();
  prince.updateAnimation();

  // Draw all objects on the canvas
  enemy.draw(ctx);
  enemy2.draw(ctx);
  enemy3.draw(ctx);
  prince.draw(ctx);

  if (prince.jumping) {
    prince.y += 0.5;
    if (prince.y >= prince.initialY) {
      prince.y = prince.initialY;
      prince.jumping = false;
    }
  }
  console.log(canvas.width);
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
