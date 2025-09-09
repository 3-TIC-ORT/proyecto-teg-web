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
                        console.log('Cambio de fase de ataque a fase de reagrupación');
                        this.state = 'fase de reagrupación';
                    }
                    break;
                case 'fase de reagrupación':
                    if (event === 'click' && this.cambioDeFaseTurnos < cantidadJugadores * 2) {
                        console.log('Cambio de fase de reagrupacion a fase de ataque');
                        this.state = 'fase de ataque';
                        this.cambioDeFaseTurnos++
                    }
                    else if (event === 'click' && this.cambioDeFaseTurnos >= cantidadJugadores * 2) {
                        console.log('Cambio de fase de reagrupación a fase de reposición');
                        this.state = 'fase de reposición';
                        this.cambioDeFaseTurnos = 0;
                    }
                    break;
                case 'fase de reposición':
                    if (event === 'click' && this.reposicionesHechas < cantidadJugadores) {
                        console.log('Repone el siguiente jugador');
                        this.state = 'fase de reposición';
                        this.reposicionesHechas++
                    }
                    else  if (event === 'click' && this.reposicionesHechas >= cantidadJugadores) {
                        console.log('Cambio de fase de reposición a fase de ataque');
                        this.state = 'fase de ataque';
                        this.reposicionesHechas = 0;
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

const maquinaDeFases = new fasesMachine(cantidadJugadores);

function actualizarFase() {
    faseActual.textContent = `Fase actual: ${maquinaDeFases.state}`;
}

function pararAtaque() {
    if (maquinaDeFases.state === 'fase de ataque') {
        maquinaDeFases.transition('click');
        actualizarFase();
    } else {
        console.log("Este botón no tiene efecto en la fase actual.");
    }
}
botonPararAtacar.addEventListener('click', pararAtaque);

function terminarTurno() {
    if (maquinaDeFases.state === 'fase de reagrupación' || maquinaDeFases.state === 'fase de reposición') {
        maquinaDeFases.transition('click');
        actualizarFase();
    } else {
        console.log("Este botón no tiene efecto en la fase actual.");
    }
}
botonTerminarTurno.addEventListener('click', terminarTurno);
