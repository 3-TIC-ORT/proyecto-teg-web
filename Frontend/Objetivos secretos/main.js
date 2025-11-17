let objectives = [
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
let i = 0;

window.onload = () => {
  const data = localStorage.getItem("jugadoresSeleccionados");
  if (!data) {
    alert("No se encontraron jugadores seleccionados.");
    window.location.href = "seleccion.html";
    return;
  }

  selectedPlayers = JSON.parse(data);
  let mezcla = objectives.sort(() => 0.5 - Math.random());
  selectedPlayers.forEach((player, idx) => {
    playerObjectives[player] = mezcla[idx % objectives.length];
  });

  showNextPlayer();
};

function showNextPlayer() {
  let player = selectedPlayers[i];
  document.getElementById("reveal-instructions").innerHTML =
    `¡MÍRALO RÁPIDO Y NO LO COMPARTAS!<br>Y ¡ASEGÚRATE QUE NADIE ESTÉ VIENDO!<br><br>
    TODOS CIERRAN LOS OJOS EXCEPTO <b>${player.toUpperCase()}</b><br>
    CUANDO TODOS CIERREN LOS OJOS, <b>${player.toUpperCase()}</b> DEBE APRETAR EL BOTÓN`;

  document.getElementById("objective").style.display = "none";
  const btn = document.getElementById("action-button");
  btn.innerText = "REVELAR OBJETIVO SECRETO";
  btn.onclick = showObjective;
  document.getElementById("overlay").style.display = "flex";
}

function showObjective() {
  let player = selectedPlayers[i];
  document.getElementById("objective").innerText =
    `CONQUISTAR “${playerObjectives[player]}”`;
  document.getElementById("objective").style.display = "block";

  const btn = document.getElementById("action-button");
  btn.innerText = "SIGUIENTE JUGADOR";
  btn.onclick = nextObjective;
}

function nextObjective() {
  i++;
  if (i < selectedPlayers.length) {
    showNextPlayer();
  } else {
    document.getElementById("overlay").style.display = "none";
    alert("Todos los objetivos fueron revelados. ¡A jugar!");
    localStorage.removeItem("jugadoresSeleccionados");
  }
}
