// hice todas las varientes que se pero de ahi nada mas preguntale a ivo como hacemos
let atacar = document.getElementById ("Atacar")
let reagrupar = document.getElementById("Reagrupar")
let reponer = document.getElementById ("Reponer")
let canjear = document.getElementById ("Canjear")
let menu = document.getElementById ("Menu")
let parar = document.getElementById ("Parar de atacar")
let terminar = document.getElementById ("Terminar turno")
// timer
let temporizador = document.getElementById ("temporizador")
let minutesEl = document.getElementById('minutos');
let secondsEl = document.getElementById('segundos');

let newYear = '1 jan 2026'; // Cambia esta fecha por tu fecha objetivo

function countdown() {
  let newYearDate = new Date(newYear);
  let currentDate = new Date();

  let totalSeconds = (newYearDate - currentDate) / 1000;

  let minutes = Math.floor(totalSeconds / 60) % 60;
  let seconds = Math.floor(totalSeconds) % 60;


  minutesEl.innerHTML = formatTime(minutes);
  secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? (`0${time}`) : time;
}
countdown();

setInterval(countdown, 1000);
//el timer  preguntale a ivo como lo termino