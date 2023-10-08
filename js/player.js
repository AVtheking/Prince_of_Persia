import entity from "./entity.js";
let gameFrame = 0;
export default class Player extends entity {
  constructor(x, y, width, height, defaultImages) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.animationFrames = defaultImages;
    this.currentFrame = 0;
    this.jumping = false;
    this.initialY = this.y;
    this.health = 50;
  }
  draw(ctx) {
    ctx.drawImage(
      this.animationFrames[this.currentFrame],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  updateAnimation() {
    // console.log(this.currentFrame);

    if (gameFrame % 50 == 0) this.currentFrame++;

    gameFrame++;

    if (this.currentFrame > this.animationFrames.length - 1) {
      this.currentFrame = 0;
    }
  }
  setAnimation(images) {
    // console.log("done");
    this.animationFrames = images;
    this.currentFrame = 0;
  }
  move(key, speed) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    switch (key) {
      case "ArrowLeft":
        if (this.x - speed >= 0) {
          this.x -= speed;
        }
        break;
      case "ArrowRight":
        if (this.x + this.width + speed <= canvasWidth) {
          this.x += speed;
        }
        break;
      case "ArrowUp":
        if (this.y - speed >= 0) {
          this.y -= speed;
        }
        break;
      case "ArrowDown":
        if (this.y + this.height + speed <= canvasHeight) {
          this.y += speed;
        }
        break;
    }
  }

  jump(isMoving) {
    if (!this.jumping) {
      this.jumping = true;
      this.initialY = this.y;
      this.y -= 32;
      if (isMoving) this.x += 32;
    }
  }
  attack(target) {
 sound
    if (target instanceof Player) {
      target.health -= 5;
    }

  }
}
