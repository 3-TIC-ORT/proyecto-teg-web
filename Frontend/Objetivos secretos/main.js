let players = ['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4'];
let currentPlayerIndex = 0;
let objectivos = []
let objetivo1= {"destruir al ejercito amatillo"}
let objetivo2= {"destruir al ejercito azul"}
let objetivo3= {"destruir al ejercito rojo"}
let objetivo4={"destruir al ejercito negro"}
let objetivo5={"destruir al ejercito verde"}
let objetivo6={"destruir al ejercito rosa"}
let objetivo7={"ocupar America del sur, 7 paices de Europa y tres paices limitrofes entre si"}
let objetivo8={"Ocupar europa, 4 paices de Asia y 2 paices de America del sur"}
let objetivo9={"Ocupar africa, 5 paices de America del norte y 4 paices de Europa"}
let objetivo10={"Ocupar Oceania, africa y 5 paices de America del norte"}
let objetivo11={"ocupar America del sur, africa y 4 paices de Asia"}
let objetivo12={"Ocupar Asia y 2 paices de America del sur"}
let objetivo13={"Ocupar America del norte - 2 paices de oceania y 4 de Asia"}
let objetivo14={"Ocupar 2 paices de Oceania, 2 Paices de Africa, 2 paices de America del sur, 3 paices de Europa, 4 paices de Africa y 3 de Asia"}

if ( jugadoresamarillo === false){
    objetivo1.pop
}
if (jugadorazul===false){
    objetivo2.pop
}
if (jugadorrojo===false){
    objetivo3.pop
}
if (jugadornegro===false){
    objetivo4.pop
}
if (jugadorverde===false){
    objetivo5.pop
}
if (jugadorrosa===false){
    objetivo6.pop
}
function setObjectiveForCurrentPlayer() {
    // Mostrar objetivo secreto al jugador actual
    let objective = objectives[currentPlayerIndex];
    document.getElementById('objectiveText').textContent = objective;

    // Oscurecer la pantalla para privacidad
    document.getElementById('blurredScreen').style.display = 'block';

    // Mostrar objetivo secreto
    document.getElementById('objective').classList.remove('hidden-content');
}

function closeEyes() {
    // Si el jugador no está activo, bloquea el botón de "cerrar ojos"
    if (currentPlayerIndex !== 0) {
        alert("Este no es tu turno. Espera.");
    }
}

document.getElementById('showObjectiveButton').addEventListener('click', () => {
    setObjectiveForCurrentPlayer();
});

document.getElementById('nextTurnButton').addEventListener('click', () => {
    // Pasar al siguiente jugador
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    document.getElementById('gameStatus').textContent = `Es el turno de ${players[currentPlayerIndex]}.`;
    document.getElementById('blurredScreen').style.display = 'none';
    document.getElementById('objective').classList.add('hidden-content');
});

// Inicializar
document.getElementById('gameStatus').textContent = `Es el turno de ${players[currentPlayerIndex]}.`;
//cosa 2 q me dijo chat

const objectives = [
    "Destruir al ejército amatillo",
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

  const jugadores = ['AZUL', 'ROJO', 'VERDE', 'NEGRO', 'AMARILLO', 'ROSADO']; // Modificar según la cantidad de jugadores
  let cantidadjugadores = 0;
  let gameStarted = false;

  function startGame() {
    document.getElementById('gameContainer').style.display = 'block';
    gameStarted = true;
    updatePlayer();
  }

  function updatePlayer() {
    const playerName = players[cantidadjugadores];
    document.getElementById('currentPlayer').textContent = playerName;

    document.getElementById('instruction').textContent = `TODOS LOS JUGADORES CIERRAN LOS OJOS EXCEPTO EL JUGADOR ${playerName}.`;
  }

  function revealObjective() {
    const objective = objectives[cantidadjugadores];
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('objectivesContainer').style.display = 'block';
    document.getElementById('playerObjective').textContent = `Tu objetivo es: ${objective}`;
    document.getElementById('nextPlayerButton').style.display = 'block';
  }

  function nextPlayer() {
    currentPlayerIndex++;
    if (currentPlayerIndex < players.length) {
      document.getElementById('objectivesContainer').style.display = 'none';
      document.getElementById('overlay').style.display = 'block';
      updatePlayer();
    } else {
      alert("¡La partida ha terminado!");
    }
  }

  document.getElementById('revealButton').addEventListener('click', revealObjective);
  document.getElementById('nextPlayerButton').addEventListener('click', nextPlayer);

  // Iniciar el juego
  startGame();