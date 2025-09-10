let atacar = document.getElementById("Atacar")
let reagrupar = document.getElementById("Reagrupar")
let reponer = document.getElementById ("Reponer")
let canjear = document.getElementById ("Canjear")
let menu = document.getElementById ("Menu")
let parar = document.getElementById ("Parar de atacar")
let terminar = document.getElementById ("Terminar turno")
let paisselecionado = document.getElementById("paisselecionado")
let jugador1 = document.getElementById ("")
let cantidadJugadores = prompt("¿Cuántos jugadores?");
cantidadJugadores = Math.max(3, Math.min(6, parseInt(cantidadJugadores) || 3))
const faseActual = document.getElementById('faseActual');
const botonPararAtacar = document.getElementById('botonPararAtacar');
const botonTerminarTurno = document.getElementById("terminarTurno")
// La Maquina de Estados Finitos
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

// timer
const targetDate = new Date();
targetDate.setSeconds(targetDate.getSeconds() + 180); 

function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("timer").textContent = "¡Tiempo terminado!";
    clearInterval(timerInterval);
    return;
  }
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("timer").textContent =
    String(minutes).padStart(2, '0') + ":" +
    String(seconds).padStart(2, '0');

}
const timerInterval = setInterval(updateTimer, 1000);
//termine el  timer
const resultado1 = tirarDado(); 
let tirar1 = document.getElementById("tirar1") 
tirar1.addEventListener("click", tirarDado) 
function tirarDado() {
  let numeroAleatorio = Math.round((Math.random() * 5) + 1)*3;
  alert (numeroAleatorio) 
}
let tirar2 = document.getElementById("tirar2") 
tirar2.addEventListener("click", tirarDado) 
//esta es la función de tirar dados y también hice que se ejecute cuando apretamos los botones de tirar. 
//cantidad de jugadores
let botoncantidadjugadores = document.getElementById ("botoncantdadjugadores")
let numerodejugadores =document.getElementById ("numerodejugadores")
let numero = []
function nombre (){
  numero.push (numerodejugadores.value)
  console.log (numero)
}
//colores 
let objetivos =document.getElementById ("objetivos")
let botoncolor = document.getElementById ("botoncolor")
let colorines =document.getElementById ("color de jugadores")
let colores = []
function objetos (){

  if (colores > cantidadJugadores || colores  <cantidadJugadores){
    alert ("no coincide la cantidad de jugadores con los colores")
  }
  colores.push (objetivos.value)
  console.log (colores)
  
}
function final (){
  while (i < players){
  if (jugador === players[i]){
      let pizzeria=document.createElement ("botoncolor")
      pizzeria.textContent= players
      objetivos.appendChild (p)}
  i++

 }
}
colorines.addEventListener ("click",final)

//intento de la eleccion de color
//intento color2
