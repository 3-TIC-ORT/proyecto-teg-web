const timerDisplay = document.getElementById("timer");
const btnGuardar = document.getElementById("btn-guardar");
const mensajeServidor = document.getElementById("mensaje-servidor");
const elementosJugadores = document.querySelectorAll(".jugador");

// --- Variables del Timer
const TIEMPO_TOTAL_SEGUNDOS = 270; // 4 minutos y 30 segundos
let segundosActuales = TIEMPO_TOTAL_SEGUNDOS;
let timerInterval;

// Inicia la conexión al servidor SoqueTIC. Por defecto, usa el puerto 3000.
connect2Server();

// --- Funciones del Temporizador

/**
 * Convierte segundos a formato MM:SS.
 * @param {number} segundos
 * @returns {string} Tiempo formateado.
 */
function formatoTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    const segFormato = seg < 10 ? `0${seg}` : seg;
    return `${minutos}:${segFormato}`;
}

/**
 * Actualiza el temporizador cada segundo.
 */
function actualizarTimer() {
    segundosActuales--;
    timerDisplay.innerText = formatoTiempo(segundosActuales);

    if (segundosActuales <= 0) {
        clearInterval(timerInterval);
        mensajeServidor.innerText = "¡Tiempo de turno agotado!";
        btnGuardar.disabled = true;
    }
}

/**
 * Inicia el temporizador.
 */
function iniciarTimer() {
    timerDisplay.innerText = formatoTiempo(segundosActuales);
    timerInterval = setInterval(actualizarTimer, 1000);
}


// --- Manejador del Botón Guardar

function handleGuardar() {
    // 1. Detener el temporizador y capturar el estado actual (requisito)
    clearInterval(timerInterval);
    btnGuardar.disabled = true; // Previene doble clic

    // 2. Recolectar la información que se enviará al backend
    // Captura el color/nombre de cada jugador
    const coloresJugadores = Array.from(elementosJugadores).map(el => el.getAttribute('data-color'));

    // Objeto de datos que será enviado por POST
    const estadoJuego = {
        jugadores: coloresJugadores,
        tiempoRestante: segundosActuales // El valor exacto en el que se frenó
    };

    mensajeServidor.innerText = `Deteniendo en ${formatoTiempo(segundosActuales)}. Enviando datos al servidor...`;

    // 3. Enviar la información al Backend usando postEvent de SoqueTIC
    // Utilizamos "guardarPartida" para coincidir con tu subscribePOSTEvent
    postEvent("guardarPartida", estadoJuego, (respuesta) => {
        // Este callback recibe la respuesta que retorna el backend ({ ok: true, mensaje: ... })
        if (respuesta.ok) {
            mensajeServidor.innerText = `✅ ¡Guardado exitoso! ${respuesta.mensaje}`;
        } else {
            mensajeServidor.innerText = `❌ Error al guardar: ${respuesta.mensaje}`;
        }
    });
}

// --- Inicialización
btnGuardar.addEventListener("click", handleGuardar);
iniciarTimer();