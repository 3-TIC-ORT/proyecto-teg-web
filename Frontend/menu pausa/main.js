// app.js

const cartas = [
 { nombre: "barco", src: "../imagenes/cartaBarco.svg" },
  { nombre: "cañon", src: "../imagenes/cartaCañon.svg" },
  { nombre: "globo", src: "../imagenes/cartaGlobo.svg" },
  { nombre: "todas", src: "../imagenes/cartaTodas.svg" }
];

const atacarBtn = document.getElementById("atacar");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const cerrarBtn = document.getElementById("cerrar");
const popupContent = document.getElementById("popupContent");
const container = document.getElementById("cartasContainer");

let cartasObtenidas = [];

function obtenerCartaRandom() {
  const randomIndex = Math.floor(Math.random() * cartas.length);
  return cartas[randomIndex];
}

function mostrarPopup(carta) {
  popupContent.innerHTML = `
    <img src="${carta.src}" alt="${carta.nombre}">
    <p>${carta.nombre}</p>
  `;
  overlay.hidden = false;
  popup.hidden = false;
}

function cerrarPopup() {
  overlay.hidden = true;
  popup.hidden = true;
}

function agregarCarta() {
  const carta = obtenerCartaRandom();
  cartasObtenidas.push(carta);

  // Mostrar en el contenedor acumulado
  const cardEl = document.createElement("div");
  cardEl.className = "carta";
  cardEl.innerHTML = `
    <img src="${carta.src}" alt="${carta.nombre}">
    <p>${carta.nombre}</p>
  `;
  container.appendChild(cardEl);

  // Mostrar popup con la carta obtenida
  mostrarPopup(carta);

  console.log("Cartas obtenidas:", cartasObtenidas);
}

atacarBtn.addEventListener("click", agregarCarta);
cerrarBtn.addEventListener("click", cerrarPopup);
overlay.addEventListener("click", cerrarPopup);
