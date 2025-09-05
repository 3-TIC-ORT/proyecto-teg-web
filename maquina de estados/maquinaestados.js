let cantidadJugadores = prompt("¿Cuántos jugadores?");
cantidadJugadores = Math.max(3, Math.min(6, parseInt(cantidadJugadores) || 3))
const faseActual = document.getElementById('faseActual');
const botonPararAtacar = document.getElementById('botonPararAtacar');
const botonTerminarTurno = document.getElementById("terminarTurno")

class fasesMachine {
        constructor() {
            this.state = 'fase de ataque';
            this.cambioDeFaseTurnos = 0;
            this.reposicionesHechas = 0;
        }
    
        transition(event) {
            const estadoAnterior = this.state;
            switch (this.state) {
                case 'fase de ataque':
                    if (event === 'click') {
                        console.log('Cambio de fase de ataque a fase de reagrupacion');
                        this.state = 'fase de reagrupación';
                    }
                    break;
                case 'fase de reagrupacion':
                    if (event === 'click' && this.cambioDeFaseTurnos < cantidadJugadores * 2) {
                        console.log('Cambio de fase de reagrupacion a fase de ataque');
                        this.state = 'fase de ataque';
                    }
                    else if (event === 'click' && this.cambioDeFaseTurnos === cantidadJugadores * 2) {
                        console.log('Cambio de fase de reagrupacion a fase de reposición');
                        this.state = 'fase de reposición';
                        cambioDeFaseTurnos = 0;
                    }
                    break;
                case 'fase de reposición':
                    if (event === 'click' && this.reposicionesHechas < cantidadJugadores) {
                        console.log('Repone el siguiente jugador');
                        this.state = 'fase de reposición';
                    }
                   else  if (event === 'click' && this.reposicionesHechas >= cantidadJugadores) {
                        console.log('Cambio de fase de reposición a fase de ataque');
                        this.state = 'fase de ataque';
                        reposicionesHechas = 0;
                    }
                    break;
                default:
                    console.log(`No se puede manejar el evento "${event}" en el estado "${this.state}".`);
            }
    
            if (this.state !== estadoAnterior) {
                this.cambioDeFaseTurnos++;
            }
            if (this.state === this.estadoAnterior) {
                this.reposicionesHechas++;
            }
            return this.state;
        }
    }

function pararAtaque() {

}

function terminarTurno() {

}

for (cantidadFases = 0; cantidadFases <= cantidadJugadores; cantidadFases++) {
    cantidadFases = cantidadFases + 1
    const fases = new fasesMachine();

    if (botonPararAtacar.click) {
        fases.transition('click');
        console.log(`fase actual: ${fases.state}`);
    }

    if (cantidadFases <= cantidadJugadores) {
        cantidadFases = 0
        const reposicionesHechas = 0
        while (reposicionesHechas <= cantidadJugadores)
            fases.transition('click');
        console.log(`Estado actual: ${fases.state}`);
        reposicionesHechas = reposicionesHechas + 1
    }
} 

