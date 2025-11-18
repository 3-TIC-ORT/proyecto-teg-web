const timerDisplay = document.getElementById("timer");
const btnGuardar = document.getElementById("btn-guardar");
const mensajeServidor = document.getElementById("mensaje-servidor");
const elementosJugadores = document.querySelectorAll(".jugador-btn");

// --- Variables del Timer
const TIEMPO_TOTAL_SEGUNDOS = 270; // 4 minutos y 30 segundos
let segundosActuales = TIEMPO_TOTAL_SEGUNDOS;
let timerInterval;

// Paso 1: Conexión al servidor
// Es crucial usar el puerto 3000 para coincidir con tu startServer(3000).
connect2Server(3000);


// --- Lógica del Temporizador

function formatoTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    const segFormato = seg < 10 ? `0${seg}` : seg;
    return `${minutos}:${segFormato}`;
}

function actualizarTimer() {
    segundosActuales--;
    timerDisplay.innerText = formatoTiempo(segundosActuales);

    if (segundosActuales <= 0) {
        clearInterval(timerInterval);
        mensajeServidor.innerText = "¡Tiempo de turno agotado!";
        btnGuardar.disabled = true;
    }
}

function iniciarTimer() {
    timerDisplay.innerText = formatoTiempo(segundosActuales);
    // Usa setInterval para decrementar cada segundo
    timerInterval = setInterval(actualizarTimer, 1000);
}


// --- Manejador del Botón Guardar (Secuencia de POST)

function handleGuardar() {
    // 1. Detener el temporizador y deshabilitar el botón
    // Se frena el contador y se captura el valor exacto (requisito)
    clearInterval(timerInterval);
    btnGuardar.disabled = true;

    // 2. Recolectar la data del frontend
    const coloresJugadores = Array.from(elementosJugadores).map(el => el.getAttribute('data-color'));

    // El backend almacena el timer en milisegundos (240000ms = 4 minutos), así que enviamos el dato en ese formato.
    const tiempoRestanteMS = segundosActuales * 1000;

    mensajeServidor.innerText = `Detenido en ${formatoTiempo(segundosActuales)}. Sincronizando estado en el backend...`;

    // 3. SECUENCIA DE COMUNICACIÓN CON EL BACKEND (Comunicación iniciada por el frontend)

    // El orden de las llamadas es crucial para que el 'estadoActual' del backend se actualice correctamente.

    // A. POST: Actualizar Jugadores
    // Llama a subscribePOSTEvent("jugadores", ...)
    postEvent("jugadores", { jugadores: coloresJugadores }, (resJugadores) => {
        if (!resJugadores.ok) {
            mensajeServidor.innerText = "❌ Error al sincronizar jugadores.";
            return;
        }

        // B. POST: Actualizar Timer
        // Llama a subscribePOSTEvent("ActualizarTimer", ...)
        postEvent("ActualizarTimer", { timer: tiempoRestanteMS }, (resTimer) => {
            if (!resTimer.ok) {
                mensajeServidor.innerText = "❌ Error al sincronizar timer.";
                return;
            }

            // C. POST: Ejecutar el Guardado en Archivo
            // Llama a subscribePOSTEvent("guardarPartida", ...)
            // Esta función usa el 'estadoActual' que acabamos de construir.
            postEvent("guardarPartida", null, (resGuardado) => {
                if (resGuardado.ok) {
                    mensajeServidor.innerText = `✅ ¡Partida Guardada! Datos enviados: ${coloresJugadores.join(', ')} y tiempo restante: ${formatoTiempo(segundosActuales)}.`;
                } else {
                    mensajeServidor.innerText = `❌ Error al guardar archivo.`;
                }
            });
        });
    });
}

// --- Inicialización
btnGuardar.addEventListener("click", handleGuardar);
iniciarTimer();
