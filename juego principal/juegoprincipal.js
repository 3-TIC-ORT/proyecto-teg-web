let atacar = document.getElementById("Atacar")
let reagrupar = document.getElementById("Reagrupar")
let reponer = document.getElementById ("Reponer")
let canjear = document.getElementById ("Canjear")
let menu = document.getElementById ("Menu")
let parar = document.getElementById ("Parar de atacar")
let terminar = document.getElementById ("Terminar turno")
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
  let numeroAleatorio = Math.round(Math.random() * 5) + 1;
  console.log (numeroAleatorio) 
}
let tirar2 = document.getElementById("tirar2") 
tirar2.addEventListener("click", tirarDado) 
//esta es la función de tirar dados y también hice que se ejecute cuando apretamos los botones de tirar. 
