// import { collisionMap } from "./main.js";
import Boundary, { collisionMap, objectCollision } from "./boundary.js";
import Player from "./player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let hearts = document.getElementsByClassName("heart");
let heading = document.getElementById("head-2");
let paragraph = document.getElementById("para");
let gameOverScreen = document.getElementById("gameOverScreen");
let box = document.getElementById("box");
let health_bar = document.getElementById("health-bar");

const frameInterval = 100;
const X = 137;
const Y = 263;

let isRightKeyPressed = false;
let fighting_mode = false;
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

let walking_sound = new Audio("../Sound/walking2.mp3");
let fight_sound = new Audio("../Sound/fight.mp3");
let game_over = new Audio("../Sound/ending.wav");
let game_won = new Audio("../Sound/game_won.mp3");

idleImage.push(kid);
fightingMode_image.push(fighter);
fightingImages.push(fight);

fillArray("running", 12, runningImages);
fillArray("jump", 4, jumpImages);
fillArray("enemy", 4, enemyImages);

export let prince = new Player(X, Y, 20, 25, idleImage);
export let enemy = new Player(656, 263, 25, 25, enemyImages);
export let enemy2 = new Player(329, 263, 25, 25, enemyImages);
export let enemy3 = new Player(816, 263, 25, 25, enemyImages);
export let enemy5 = new Player(1200, 263, 25, 25, enemyImages);
export let enemy6 = new Player(1450, 263, 25, 25, enemyImages);
export let enemy7 = new Player(1650, 263, 25, 25, enemyImages);

let activeEnemies = [enemy, enemy2, enemy3, enemy5, enemy6, enemy7];
for (const enemy of activeEnemies) {
  enemy.health = 20;
}

// enemy.health = 10;
// enemy2.health = 10;
// enemy3.health = 10;
// enemy4.health = 10;

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
function fillArray(folder, count, images) {
  for (let i = 1; i <= count; i++) {
    const image = new Image();
    image.src = `./images/${folder}/${i}.png`;
    images.push(image);
  }
}

function gameOver() {
  game_over.play();
  canvas.style.display = "none";
  box.style.display = "none";
  health_bar.style.display = "none";
  gameOverScreen.style.display = "block";
  heading.style.fontSize = "45px";
  heading.style.color = "white";
  paragraph.style.fontSize = "34px";
  paragraph.style.color = "white";
  document.addEventListener("keypress", (event) => {
    location.reload();
  });
}
function damage() {
  prince.health -= 1;
  if (prince.health == 400) {
    hearts[4].style.opacity = 0;
  }
  if (prince.health == 300) {
    hearts[3].style.opacity = 0;
  }
  if (prince.health == 200) {
    hearts[2].style.opacity = 0;
  }
  if (prince.health == 100) {
    hearts[1].style.opacity = 0;
  }
  if (prince.health == 0) {
    hearts[0].style.opacity = 0;
    gameOver();
  }
}
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
function calculateDistance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}
function isEnemyInFrontOfPrince(distanceThreshold) {
  for (const enemy of activeEnemies) {
    const distance = calculateDistance(prince.x, prince.y, enemy.x, enemy.y);

    const relativeX = enemy.x - prince.x;

    if (
      relativeX > 0 &&
      relativeX <= distanceThreshold &&
      distance <= distanceThreshold
    ) {
      return true;
    }
  }
  return false;
}

//Movements
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight") {
    if (!checkCollisions(-3, 0) && !isEnemyInFrontOfPrince(10)) {
      walking_sound.pause();
      walking_sound.currentTime = 0;
      walking_sound.play();
      isRightKeyPressed = true;
      prince.setAnimation(runningImages);
      prince.move(event.key, 3);
    }
  } else if (event.key == "ArrowLeft") {
    if (!checkCollisions(3, 0)) {
      isRightKeyPressed = true;
      prince.setAnimation(runningImages);
      prince.move(event.key, 3);
    }
  }

  if (event.key == " " && isRightKeyPressed) {
    if (!checkCollisions(-40, 40)) {
      prince.jump(true);
      prince.setAnimation(jumpImages);
    }
  } else if (event.key == " ") {
    if (!checkCollisions(0, 40)) {
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
    fight_sound.pause();
    fight_sound.currentTime = 0;
    fight_sound.play();

    let nearestEnemy = null;
    let nearestDistance = Infinity;
    // const allEnemies = [enemy, enemy2, enemy3, enemy4];
    for (const currentEnemy of activeEnemies) {
      const distance = calculateDistance(
        prince.x,
        prince.y,
        currentEnemy.x,
        currentEnemy.y
      );
      const relativeX = currentEnemy.x - prince.x;

      if (relativeX > 0 && relativeX <= 10 && distance < nearestDistance) {
        nearestEnemy = currentEnemy;
        nearestDistance = distance;
      }
    }
    // prince.health -= 2;
    // nearestEnemy.health -= 5;
    prince.attack(nearestEnemy);
    prince.setAnimation(fightingImages);
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
    isRightKeyPressed = false;

    if (fighting_mode) {
      prince.setAnimation(fightingMode_image);
    } else {
      prince.setAnimation(idleImage);
    }
  }

  if (event.key == " ") {
    // collisonForward = false;
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
  if (prince.x >= 259) {
    // game_won.play();
    window.location.href = "./end-page.html";
  }
  console.log(prince.x);
  if (prince.y >= canvas.height - 20) {
    gameOver();
  }

  // collisionBelow = false;
  for (const enemy of activeEnemies) {
    enemy.updateAnimation("enemy");
    enemy.draw(ctx);

    if (enemy.health <= 0) {
      const index = activeEnemies.indexOf(enemy);
      if (index !== -1) {
        activeEnemies.splice(index, 1);
      }
    }
  }
  prince.updateAnimation("prince");
  for (const enemy of activeEnemies) {
    const distance = calculateDistance(prince.x, prince.y, enemy.x, enemy.y);

    const relativeX = enemy.x - prince.x;

    if (relativeX > 0 && relativeX <= 10 && distance <= 10) {
      damage();
    }
  }

  prince.draw(ctx);

  if (!checkCollisions(0, -1)) {
    prince.y += 1;
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
