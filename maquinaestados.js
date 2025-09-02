  let cantidadJugadores = prompt("¿Cuántos jugadores?");
  cantidadJugadores = Math.max(3, Math.min(6, parseInt(cantidadJugadores) || 3));

  // Paso 1: Obtener los elementos HTML
  const faseActual = document.getElementById('faseActual');
  const infoTurnos = document.getElementById('infoTurnos');
  const botonCambioFase = document.getElementById('botonCambioFase');

  // Variables para controlar el flujo del juego
  let jugadorActual = 1;
  let faseJuego = 'ataque y reagrupacion'; 

  // Función para actualizar la interfaz del juego
  function actualizarInterfaz() {
      faseActual.textContent = `fase de ${faseJuego}`;
      infoTurnos.textContent = `Jugador ${jugadorActual}`;

      // Si todos los jugadores terminaron su fase de ataque/reagrupación,
      // pasamos a la fase de reposición
      if (jugadorActual > cantidadJugadores && faseJuego === 'ataque y reagrupacion') {
          faseJuego = 'reposicion';
          jugadorActual = 1;
          // Actualizamos la interfaz una vez más para reflejar el cambio de fase
          faseActual.textContent = `fase de ${faseJuego}`;
      } 
      // Si todos los jugadores terminaron su fase de reposición, el juego termina
      else if (jugadorActual > cantidadJugadores && faseJuego === 'reposicion') {
          botonCambioFase.disabled = true;
          botonCambioFase.textContent = "¡Turno Finalizado!";
          faseActual.textContent = "Finalizado";
          infoTurnos.textContent = "Todos los jugadores han completado su turno.";
      }
  }

  // Paso 2: Asignar el listener de clic al botón
  botonCambioFase.addEventListener('click', () => {
      // Avanzar al siguiente jugador
      jugadorActual++;
      actualizarInterfaz();
  });

  // (Opcional) Actualizar la interfaz al cargar la página
  actualizarInterfaz();