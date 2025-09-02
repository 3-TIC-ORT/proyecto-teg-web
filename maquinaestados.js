 let cantidadJugadores = prompt("¿Cuántos jugadores?");
 cantidadJugadores = Math.max(3, Math.min(6, parseInt(cantidadJugadores) || 3));

 const faseActual = document.getElementById('faseActual');
 const infoTurnos = document.getElementById('infoTurnos');
 const botonCambioFase = document.getElementById('botonCambioFase');

 // Variables para controlar el flujo del juego
 let jugadorActual = 1;
 let faseDelJuego = 'ataque y reagrupacion'; // 'ataque y reagrupacion' o 'reposicion'

 // Función para actualizar la interfaz del juego
 function actualizarInterfaz() {
     if (jugadorActual > cantidadJugadores) {
         if (faseDelJuego === 'ataque y reagrupacion') {
             faseDelJuego = 'reposicion';
             jugadorActual = 1; // Reinicia para la fase de reposición
             console.log("Todos los jugadores han atacado y reagrupado. Comienza la fase de reposición.");
         } else { // Si ya estaban en reposición, reinicia el ciclo completo
             faseDelJuego = 'ataque y reagrupacion';
             jugadorActual = 1; // Reinicia para la próxima ronda de ataque y reagrupación
             console.log("Todos los jugadores han repuesto. Un nuevo turno ha comenzado.");
         }
     }

     // Actualizar el texto en la página
     faseActual.textContent = `fase de ${faseDelJuego}`;
     infoTurnos.textContent = `Jugador ${jugadorActual}`;
 }

 // Paso 2: Asignar el listener de clic al botón
 botonCambioFase.addEventListener('click', () => {
     jugadorActual++;
     actualizarInterfaz();
 });

 // (Opcional) Actualizar la interfaz al cargar la página
 actualizarInterfaz();
