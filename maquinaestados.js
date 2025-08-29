  let cantidadJugadores = prompt("cuantos jugadores?")
  if (cantidadJugadores < 3) {
    cantidadJugadores = 3
  }
  if (cantidadJugadores > 6) {
    cantidadJugadores = 6
  }
  let cantidadFases = 0 
      
      // Paso 1: Obtener el elemento HTML para mostrar el estado y el botón
        const faseActual = document.getElementById('faseActual');
        const botonCambioFase = document.getElementById('botonCambioFase');
      
      // Paso 2: Definir la máquina de estados
        const maquinaFasesTurnos = {
            // Estado inicial
            state: 'fase de ataque',

            // Definición de los estados y sus transiciones
            states: {
                fasaeAtaque: {
                    apretar: 'fase de reagrupación',
                },
                faseReagrupacion: {
                    apretar: 'fase de reposición',
                },
                faseReposicion: {
                    apretar: 'fase de ataque',
                },
            },

            // Método para manejar eventos (acciones)
            transition(evento) {
                const faseActual = this.state;
                const proximaFase = this.states[faseActual][evento];

                if (proximaFase) {
                    this.state = proximaFase;
                    console.log(`Transición: de "${faseActual}" a "${proximaFase}" con el evento "${evento}".`);
                    // Actualizar el texto en la página
                    maquinaFasesTurnos.textContent = this.state;
                } else {
                    console.log(`Error: El evento "${evento}" no es válido en el estado "${faseActual}".`);
                }
            },
        };

        // Asignar un listener de clic al botón
        botonCambioFase.addEventListener('click', () => {
            // Cuando se haga clic, llama al método transition con el evento 'apretar'
            maquinaFasesTurnos.transition('click');
        });

        // (Opcional) Establecer el estado inicial en la página al cargar
        maquinaFasesTurnos.textContent = maquinaFasesTurnos.state;

  class fasesMachine {
    constructor() {
      this.state = 'fase de ataque';
    }
  
    transition(event) {
      switch (this.state) {
        case 'fase de ataque':
          if (event === 'press') {
            console.log('Cambio de fase de ataque a fase de reagrupacion');
            this.state = 'fase de ataque';
          }
          break;
        case 'fase de reagrupacion':
          if (event === 'press') {
            console.log('Cambio de fase de reagrupacion a fase de reposición');
            this.state = 'fase de reposición';
          }
          break;
        case 'fase de reposición':
          if (event === 'press') {
            console.log('Cambio de fase de reposición a fase de ataque');
            this.state = 'fase de ataque';
          }
          break;
        default:
          console.log(`No se puede manejar el evento "${event}" en el estado "${this.state}".`);
      }
      return this.state;
    }
  }
  

  for ( cantidadFases = 0 ; cantidadFases <= cantidadJugadores ; cantidadFases++) {
    cantidadFases = cantidadFases + 1
  const fases = new fasesMachine();
  const fasesTurnos = cantidadJugadores * 2
  const fasesJugadas = 0
  for (fasesJugadas = 0 ; fasesJugadas <= fasesTurnos ; fasesJugadas++) {
  
  console.log(`Estado inicial: ${fases.state}`); 
  
  fases.transition('press');
  console.log(`Estado actual: ${fases.state}`); 
  
  fasesJugadas = fasesJugadas + 1
 
  fases.transition('press');
  console.log(`Estado actual: ${fases.state}`); 

  fasesJugadas = fasesJugadas + 1
  }

  if (cantidadFases <= cantidadJugadores) {
    cantidadFases = 0
    const reposicionesHechas = 0
  while (reposicionesHechas <= cantidadJugadores)
    fases.transition('press');
    console.log(`Estado actual: ${fases.state}`); 
    reposicionesHechas = reposicionesHechas + 1
  }
}