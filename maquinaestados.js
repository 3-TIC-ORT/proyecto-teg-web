const machine = {
    // Estado inicial
    initialState: 'OFF',
  
    // Definición de los estados y sus transiciones
    states: {
      OFF: {
        actions: {
          press() {
            console.log('Botón presionado. Cambiando a estado ON.');
            this.state = 'ON';
          },
        },
      },
      ON: {
        actions: {
          press() {
            console.log('Botón presionado. Cambiando a estado BLINK.');
            this.state = 'BLINK';
          },
        },
      },
      BLINK: {
        actions: {
          press() {
            console.log('Botón presionado. Cambiando a estado OFF.');
            this.state = 'OFF';
          },
        },
      },
    },
  
    // Método para manejar eventos (acciones)
    dispatch(actionName) {
      const action = this.states[this.state].actions[actionName];
      if (action) {
        action.call(this); // Llama al método de acción en el contexto de la máquina
      } else {
        console.log(`La acción "${actionName}" no es válida para el estado "${this.state}".`);
      }
    },
  
    // Propiedad para rastrear el estado actual
    state: 'OFF', // O podrías usar this.initialState
  };
  
  // Ejemplo de uso:
  console.log(`Estado inicial: ${machine.state}`); // Salida: Estado inicial: OFF
  
  machine.dispatch('press'); // Salida: Botón presionado. Cambiando a estado ON.
  console.log(`Estado actual: ${machine.state}`); // Salida: Estado actual: ON
  
  machine.dispatch('press'); // Salida: Botón presionado. Cambiando a estado BLINK.
  console.log(`Estado actual: ${machine.state}`); // Salida: Estado actual: BLINK
  
  machine.dispatch('press'); // Salida: Botón presionado. Cambiando a estado OFF.
  console.log(`Estado actual: ${machine.state}`); // Salida: Estado actual: OFF