  let cantidadJugadores = prompt("cuantos jugadores?")
  if (cantidadJugadores < 3) {
    cantidadJugadores = 3
  }
  if (cantidadJugadores > 6) {
    cantidadJugadores = 6
  }
  let cantidadFases = 0 

  class fasesMachine {
    constructor() {
      this.state = 'fase de ataque';
    }
  
    transition(event) {
      switch (this.state) {
        case 'fase de ataque':
          if (event === 'press') {
            console.log('Cambio de fase de ataque a fase de reagrupacion');
            this.state = 'ON';
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
  

  for ( cantidadFases = 0 ; cantidadFases < cantidadJugadores ; cantidadFases++) {
    cantidadFases = cantidadFases + 1
  const fases = new fasesMachine();
  const fasesTurno = cantidadJugadores * 2
  const fasesJugadas = 0
  while (fasesJugadas <= fasesTurno) {
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
  }
}