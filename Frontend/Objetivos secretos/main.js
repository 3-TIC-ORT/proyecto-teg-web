let players = ['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4'];
let currentPlayerIndex = 0;
let objectives = [
    "Conquistar 5 países",
    "Destruir a Jugador 2",
    "Conquistar 10 países",
    "Destruir a Jugador 3"
];

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