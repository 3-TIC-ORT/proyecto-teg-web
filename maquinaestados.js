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
  
  let boton = document.getElementById("apretar")
  boton.addEventListener("click", dispatch(press))
  
  machine.dispatch('press'); // Salida: Botón presionado. Cambiando a estado ON.
  console.log(`Estado actual: ${machine.state}`); // Salida: Estado actual: ON
  
  machine.dispatch('press'); // Salida: Botón presionado. Cambiando a estado BLINK.
  console.log(`Estado actual: ${machine.state}`); // Salida: Estado actual: BLINK
  
  machine.dispatch('press'); // Salida: Botón presionado. Cambiando a estado OFF.
  console.log(`Estado actual: ${machine.state}`); // Salida: Estado actual: OFF

  
  
  
  
  class LightbulbMachine {
    constructor() {
      this.state = 'OFF';
    }
  
    transition(event) {
      switch (this.state) {
        case 'OFF':
          if (event === 'press') {
            console.log('Cambio de OFF a ON');
            this.state = 'ON';
          }
          break;
        case 'ON':
          if (event === 'press') {
            console.log('Cambio de ON a BLINK');
            this.state = 'BLINK';
          }
          break;
        case 'BLINK':
          if (event === 'press') {
            console.log('Cambio de BLINK a OFF');
            this.state = 'OFF';
          }
          break;
        default:
          console.log(`No se puede manejar el evento "${event}" en el estado "${this.state}".`);
      }
      return this.state;
    }
  }
  
  // Ejemplo de uso:
  const lightbulb = new LightbulbMachine();
  console.log(`Estado inicial: ${lightbulb.state}`); // Salida: Estado inicial: OFF
  
  lightbulb.transition('press');
  console.log(`Estado actual: ${lightbulb.state}`); // Salida: Estado actual: ON
  
  lightbulb.transition('press');
  console.log(`Estado actual: ${lightbulb.state}`); // Salida: Estado actual: BLINK
  
  lightbulb.transition('press');
  console.log(`Estado actual: ${lightbulb.state}`); // Salida: Estado actual: OFF