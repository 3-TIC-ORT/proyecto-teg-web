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
  
  // Ejemplo de uso:
  const fases = new fasesMachine();
  console.log(`Estado inicial: ${fases.state}`); // Salida: Estado inicial: fase de ataque
  
  fases.transition('press');
  console.log(`Estado actual: ${fases.state}`); // Salida: Estado actual: fase de reagrupación
  
  fases.transition('press');
  console.log(`Estado actual: ${fases.state}`); // Salida: Estado actual: fase de reposición
  
  fases.transition('press');
  console.log(`Estado actual: ${fases.state}`); // Salida: Estado actual: fase de ataque