let atacar = document.getElementById("Atacar")
let reagrupar = document.getElementById("Reagrupar")
let reponer = document.getElementById ("Reponer")
let canjear = document.getElementById ("Canjear")
let menu = document.getElementById ("Menu")
let parar = document.getElementById ("Parar de atacar")
let terminar = document.getElementById ("Terminar turno")
let paisselecionado = document.getElementById("paisselecionado")
let jugador1 = document.getElementById ("")
// timer
const targetDate = new Date();
targetDate.setSeconds(targetDate.getSeconds() + 120); 

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
//termine el putisimo timer
const resultado1 = tirarDado(); 
let tirar1 = document.getElementById("tirar1") 
tirar1.addEventListener("click", tirarDado) 
function tirarDado() {
  let numeroAleatorio = Math.round((Math.random() * 5) + 1)*3;
  console.log (numeroAleatorio) 
}
let tirar2 = document.getElementById("tirar2") 
tirar2.addEventListener("click", tirarDado) 
//esta es la función de tirar dados y también hice que se ejecute cuando apretamos los botones de tirar. 

//colores 
let objetivos =document.getElementById ("objetivos")
let botoncolor = document.getElementById ("botoncolor")
let colorines =document.getElementById ("color de jugadores")
let colores = []
function objetos (){
  colores.push (objetivos.value)
  console.log (colores)
}
function final (){
  while (i < players){
  if (jugador === players[i]){
      let pizzeria=document.createElement ("botoncolor")
      pizzeria.textContent= players
      objetivos.appendChild (li)}
  i++

}
}
colorines.addEventListener ("click",final)

//intento de la eleccion de color
//paso de maquina de estado

  // Paso 1: Obtener el elemento HTML para mostrar el estado y el botón
        const faseActual = document.getElementById('atacar');
        const botonCambioFase = document.getElementsByClassName('botonCambioFase');
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
