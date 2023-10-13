export default class Player {
  constructor(x, y, width, height, defaultImages) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.animationFrames = defaultImages;
    this.currentFrame = 0;
    this.jumping = false;
    this.initialY = this.y;
    this.health = 500;
    this.gameFrame = 0;
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
    if (this.gameFrame % 10 == 0) this.currentFrame++;

    this.gameFrame++;

    if (this.currentFrame > this.animationFrames.length - 1) {
      this.currentFrame = 0;
    }
  }
  setAnimation(images) {
    this.animationFrames = images;
    // this.currentFrame = 0;
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

  jump(Moving) {
    console.log(this.jumping);
    if (!this.jumping) {
      // this.jumping = true;
      this.initialY = this.y;
      this.y -= 40;
      if (Moving == "right") this.x += 40;
      else if (Moving == "left") this.x -= 40;
    }
  }
  attack(target) {
    if (target instanceof Player) {
      target.health -= 5;
    }
  }
}
