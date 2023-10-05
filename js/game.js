const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let kid = new Image();
kid.src = "./images/sprites2.png";

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(kid, 0, 2, 15, 40, 50, 50, 45, 45);
  requestAnimationFrame(animate);
}
animate();
