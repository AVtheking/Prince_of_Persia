import Player from "./player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frameCount = 12;
const frameInterval = 100;
const X = 50;
const Y = 50;
let animationInterval;
let isPressed = false;
let fighting_mode = false;
let currentFrame = 1;
let lastTimestamp = 0;

let kid = new Image();
let fighter = new Image();
let fight = new Image();

kid.src = "./images/idle/idle.png";
fighter.src = "./images/sword.png";
fight.src = "./images/fight.png";

const runningImages = [];
const idleImage = [];
const jumpImages = [];
const fightingImages = [];
const fightingMode_image = [];

idleImage.push(kid);
fightingMode_image.push(fighter);
fightingImages.push(fight);

fillArray("running", 12, runningImages);
fillArray("jump", 2, jumpImages);
// fillArray("fighting", 10, fightingImages);

let prince = new Player(X, Y, 12, 20, idleImage);

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  prince.draw(ctx);
  prince.updateAnimation(isPressed);
  if (prince.jumping) {
    // prince.updateAnimation(isPressed);
    prince.y += 0.3;
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
function fillArray(folder, count, images) {
  for (let i = 1; i <= count; i++) {
    const image = new Image();
    image.src = `./images/${folder}/${i}.png`;
    images.push(image);
  }
}
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
    isPressed = true;
    prince.setAnimation(runningImages);
    prince.move(event.key);
  }
  if (event.key == " " && !isPressed) {
    isPressed = true;

    prince.setAnimation(jumpImages);
    prince.jump();
  } else if (event.key == " " && isPressed) {
    prince.setAnimation(idleImage);
  }
  if (event.key == "z" && !fighting_mode) {
    fighting_mode = true;
    prince.setAnimation(fightingMode_image);
  } else if (event.key == "z" && fighting_mode) {
    fighting_mode = false;
    prince.setAnimation(idleImage);
  }
  if (event.key == "x") {
    isPressed = true;
    prince.setAnimation(fightingImages);
  }
});
document.addEventListener("keyup", (event) => {
  if (
    event.key == "ArrowRight" ||
    event.key == "ArrowLeft" ||
    event.key == " "
  ) {
    isPressed = false;
    prince.setAnimation(idleImage);
    clearInterval(animationInterval);
  }
  if (event.key == "x" && fighting_mode) {
    isPressed = false;
    prince.setAnimation(fightingMode_image);
    clearInterval(animationInterval);
  }
});

Promise.all(
  runningImages.map(
    (image) => new Promise((resolve) => (image.onload = resolve))
  )
).then(() => {
  lastTimestamp = performance.now();
  animate(lastTimestamp);
});
