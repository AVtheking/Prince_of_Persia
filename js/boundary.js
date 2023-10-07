import { collision } from "./collosion.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
export const collisionMap = [];
for (let i = 0; i < collision.length; i += 80) {
  collisionMap.push(collision.slice(i, 80 + i));
}
export default class Boundary {
  constructor({ position }) {
    this.position = position;
    this.width = 32;
    this.height = 32;
  }
  drawRect() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export function objectCollision({ object1, object2 }) {
  return (
    object1.x + object1.width >= object2.position.x &&
    object1.x <= object2.position.x + object2.width &&
    object1.y + object1.height > object2.position.y &&
    object1.y < object2.position.y + object2.height
  );
}
