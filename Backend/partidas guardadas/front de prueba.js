const timerDisplay = document.getElementById("timer");
const btnGuardar = document.getElementById("btn-guardar");
const mensajeServidor = document.getElementById("mensaje-servidor");
const elementosJugadores = document.querySelectorAll(".jugador");

// Conectarse al servidor
connect2Server();

// TIMER
let segundosActuales = 270; // 4:30
let timerInterval;

// Formato mm:ss
function formatoTiempo(segundos) {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

function actualizarTimer() {
    segundosActuales--;
    timerDisplay.innerText = formatoTiempo(segundosActuales);

    // Enviar al backend
    postEvent("ActualizarTimer", { segundos: segundosActuales });

    if (segundosActuales <= 0) {
        clearInterval(timerInterval);
        mensajeServidor.innerText = "¡Tiempo agotado!";
        btnGuardar.disabled = true;
    }
}

function iniciarTimer() {
    // Pedir al backend el valor real del timer
    getEvent("ObtenerTimer", (r) => {
        segundosActuales = r.segundos;
        timerDisplay.innerText = formatoTiempo(segundosActuales);

        timerInterval = setInterval(actualizarTimer, 1000);
    });
}

// GUARDAR PARTIDA
function handleGuardar() {
    clearInterval(timerInterval);

    const jugadores = Array.from(elementosJugadores).map(j => j.dataset.color);

    const data = {
        jugadores,
        tiempoRestante: segundosActuales
    };

    mensajeServidor.innerText = "Guardando...";

    postEvent("guardarPartida", data, (resp) => {
        if (resp.ok) {
            mensajeServidor.innerText = "✔ Partida guardada correctamente.";
        } else {
            mensajeServidor.innerText = "❌ Error al guardar.";
        }
    });
}

btnGuardar.addEventListener("click", handleGuardar);

// Iniciar todo
iniciarTimer();
