import Player from "./player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frameCount = 12;
const frameInterval = 100;
const X = 50;
const Y = 50;
let animationInterval;
let isArrayRightPressed = false;
let currentFrame = 1;
let lastTimestamp = 0;

let kid = new Image();
kid.src = "./images/idle/idle.png";

const images = [];
const idleImage = [];
idleImage.push(kid);
for (let i = 1; i <= frameCount; i++) {
  const image = new Image();
  image.src = `./images/running/${i}.png`;
  images.push(image);
}

let prince = new Player(X, Y, 10, 20, idleImage);
function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  prince.draw(ctx);
  prince.updateAnimation(isArrayRightPressed);
  if (timestamp - lastTimestamp >= frameInterval) {
    lastTimestamp = timestamp;
  }

  requestAnimationFrame(animate);
}
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight") {
    isArrayRightPressed = true;
    prince.setAnimation(images);
    prince.move(event.key);
    // animationInterval = setInterval(() => {
    //   prince.updateAnimation();
    // }, 100);
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key == "ArrowRight") {
    isArrayRightPressed = false;
    prince.setAnimation(idleImage);
    clearInterval(animationInterval);
  }
});

// function runningAnimate() {
//   console.log(currentFrame);
//   currentFrame++;
//   if (currentFrame >= 11) {
//     currentFrame = 1;
//   }
// }

Promise.all(
  images.map((image) => new Promise((resolve) => (image.onload = resolve)))
).then(() => {
  lastTimestamp = performance.now();
  animate(lastTimestamp);
});
