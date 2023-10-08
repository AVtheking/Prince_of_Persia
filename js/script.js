document.getElementById("button").addEventListener("click", navigate, true);

let gameStartSound = new Audio("../sound/start.mpeg");

function navigate() {
  gameStartSound.play();
  window.location.href = "./game_screen.html";
}
