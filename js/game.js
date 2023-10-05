import Player from "./player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frameCount = 10;
const frameInterval = 100;
const X = 23;
const Y = 23;

let currentFrame = 1;
let lastTimestamp = 0;

let kid = new Image();
kid.src = "./images/running/1.png";

// Preload all the images for the animation
const images = [];
for (let i = 1; i <= frameCount; i++) {
  const image = new Image();
  image.src = `./images/running/${i}.png`;
  images.push(image);
}

let prince = new Player(kid, X, Y, 15, 25);

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  prince.draw(ctx);

  if (timestamp - lastTimestamp >= frameInterval) {
    // currentFrame++;
    // if (currentFrame > frameCount) {
    //   currentFrame = 1;
    // }

    lastTimestamp = timestamp;
  }

  requestAnimationFrame(animate);
}
document.addEventListener("keydown", (event) => {
  prince.move(event.key);
});

function drawFrame(frame) {
  ctx.drawImage(images[frame - 1], 55, 55, 20, 30);
}

Promise.all(
  images.map((image) => new Promise((resolve) => (image.onload = resolve)))
).then(() => {
  lastTimestamp = performance.now();
  animate(lastTimestamp);
});
