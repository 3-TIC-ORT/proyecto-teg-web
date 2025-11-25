// --- Elementos DOM
const timerDisplay = document.getElementById("timer");
const btnGuardar = document.getElementById("btn-guardar");
const mensajeServidor = document.getElementById("mensaje-servidor");
// Seleccionamos todos los botones de jugador
const elementosJugadores = document.querySelectorAll(".jugador-btn");

// --- Variables del Timer
const TIEMPO_TOTAL_SEGUNDOS = 270; // 4 minutos y 30 segundos
let segundosActuales = TIEMPO_TOTAL_SEGUNDOS;
let timerInterval;

// Paso 1: Inicializa la conexión con el servidor
connect2Server();

// --- Lógica del Temporizador

function formatoTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    // Asegura que los segundos tengan dos dígitos (00-09)
    const segFormato = seg < 10 ? `0${seg}` : seg;
    return `${minutos}:${segFormato}`;
}

function actualizarTimer() {
    segundosActuales--;
    timerDisplay.innerText = formatoTiempo(segundosActuales);

    if (segundosActuales <= 0) {
        clearInterval(timerInterval);
        mensajeServidor.innerText = "¡Tiempo de turno agotado! No se puede guardar.";
        btnGuardar.disabled = true;
    }
}

function iniciarTimer() {
    timerDisplay.innerText = formatoTiempo(segundosActuales);
    // Usa setInterval para decrementar cada segundo
    timerInterval = setInterval(actualizarTimer, 1000);
}


// --- Manejador del Botón Guardar (postEvent)

function handleGuardar() {
    // 1. Detener el temporizador (Requisito)
    // El frontend frena el contador y captura el valor final
    clearInterval(timerInterval);


    // 2. Recolectar la información para el POST
    // Mapeamos los botones para obtener sus colores (data-color)
    const coloresJugadores = Array.from(elementosJugadores).map(el => el.getAttribute('data-color'));

    const estadoJuego = {
        jugadores: coloresJugadores,
        tiempoRestante: segundosActuales // Los segundos exactos en que se frenó
    };

    mensajeServidor.innerText = `Detenido en ${formatoTiempo(segundosActuales)}. Enviando datos...`;

    // 3. Enviar la información al Backend usando postEvent
    // Utilizamos el tipo "guardarPartida" que tu backend está esperando
    // postEvent(type, data, callback)
    postEvent("guardarPartida", estadoJuego, (data) => {
        console.log("Servidor respondió:", data);
    });
    
}

// --- Inicialización
btnGuardar.addEventListener("click", handleGuardar);
iniciarTimer();