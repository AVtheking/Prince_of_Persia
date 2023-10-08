document.getElementById("button").addEventListener("click", navigate, true);

let gameStartSound = new Audio("../Sound/starting.mp3");

function navigate() {
  gameStartSound.play();
  window.location.href = "./game_screen.html";
}
