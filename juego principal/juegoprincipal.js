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
  console.log (numeroAleatorio) 
}
let tirar2 = document.getElementById("tirar2") 
tirar2.addEventListener("click", tirarDado) 
//esta es la función de tirar dados y también hice que se ejecute cuando apretamos los botones de tirar. 
//cantidad de jugadores
let cantidadjugadores = document.getElementById ("cantidadjugadores")
let botoncantidadjugadores = document.getElementById ("botoncantdadjugadores")
let numerodejugadores =document.getElementById ("numerodejugadores")
let numero   =[]
if (cantidadjugadores > 6 || cantidadjugadores < 3){
  alert ("no llegas a la cantidad de jugadores")
}
function canti (){
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
      objetivos.appendChild (li)}
  i++

}
}
colorines.addEventListener ("click",final)

//intento de la eleccion de color
