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
  updateAnimation(isPressed) {
    console.log(this.currentFrame);
    if (isPressed) {
      if (gameFrame % 20 == 0) this.currentFrame++;
    }
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
  move(key) {
    switch (key) {
      case "ArrowLeft":
        this.x -= 5;
        break;
      case "ArrowRight":
        this.x += 5;
        break;
      case "ArrowUp":
        this.y -= 5;
        break;
      case "ArrowDown":
        this.y += 5;
        break;
    }
  }
  jump() {
    if (!this.jumping) {
      this.jumping = true;
      this.initialY = this.y;
      this.y -= 10;
      this.x += 15;
    }
  }
}
