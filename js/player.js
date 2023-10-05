import entity from "./entity.js";

export default class Player extends entity {
  constructor(player, x, y, width, height) {
    super();
    this.player = player;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw(ctx) {
    ctx.drawImage(this.player, this.x, this.y, this.width, this.height);
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
}
