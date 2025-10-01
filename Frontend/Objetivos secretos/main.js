
const objectives = [
  "Destruir al ejército amarillo",
  "Destruir al ejército azul",
  "Destruir al ejército rojo",
  "Destruir al ejército negro",
  "Destruir al ejército verde",
  "Destruir al ejército rosa",
  "Ocupar América del Sur, 7 países de Europa y tres países limítrofes entre sí",
  "Ocupar Europa, 4 países de Asia y 2 países de América del Sur",
  "Ocupar África, 5 países de América del Norte y 4 países de Europa",
  "Ocupar Oceanía, África y 5 países de América del Norte",
  "Ocupar América del Sur, África y 4 países de Asia",
  "Ocupar Asia y 2 países de América del Sur",
  "Ocupar América del Norte, 2 países de Oceanía y 4 de Asia",
  "Ocupar 2 países de Oceanía, 2 países de África, 2 países de América del Sur, 3 países de Europa, 4 países de África y 3 de Asia"
];

let selectedPlayers = [];
let playerObjectives = {};
let currentIndex = 0;

function startSequence() {
  selectedPlayers = Array.from(document.querySelectorAll('.selector input[type="checkbox"]:checked')).map(cb => cb.value);
  if (selectedPlayers.length === 0) {
    alert("Seleccioná al menos un jugador.");
    return;
  }

  // Asignar objetivos aleatorios únicos
  const shuffledObjectives = objectives.sort(() => 0.5 - Math.random());
  selectedPlayers.forEach((player, i) => {
    playerObjectives[player] = shuffledObjectives[i % objectives.length];
  });

  currentIndex = 0;
  showNextPlayer();
}

function showNextPlayer() {
  const player = selectedPlayers[currentIndex];
  document.getElementById("reveal-instructions").innerHTML =
    `EXCEPTO EL JUGADOR ${player.toUpperCase()}<br>CUANDO TODOS CIERREN LOS OJOS,<br>EL JUGADOR ${player.toUpperCase()} DEBE APRETAR EL BOTÓN DE REVELAR OBJETIVO SECRETO`;
  document.getElementById("objective").style.display = "none";
  document.getElementById("overlay").style.display = "flex";
}

function showObjective() {
  const player = selectedPlayers[currentIndex];
  document.getElementById("objective").innerText = `Objetivo secreto del jugador ${player.toUpperCase()}:\n\n${playerObjectives[player]}`;
  document.getElementById("objective").style.display = "block";

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < selectedPlayers.length) {
      showNextPlayer();
    } else {
      document.getElementById("overlay").style.display = "none";
      alert("Todos los objetivos fueron revelados. ¡A jugar!");
    }
  }, 8000);
}
