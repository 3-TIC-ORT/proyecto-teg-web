// app.js

const cartas = [
  { nombre: "barco", src: "../imagenes/cartaBarco.svg" },
  { nombre: "cañon", src: "../imagenes/cartaCañon.svg" },
  { nombre: "globo", src: "../imagenes/cartaGlobo.svg" },
  { nombre: "todas", src: "../imagenes/cartaTodas.svg" }
];

const openBtn = document.getElementById("openCardsBtn");
const overlay = document.getElementById("cardsOverlay");
const dialog = document.getElementById("cardsDialog");
const closeBtn = document.getElementById("closeDialogBtn");
const grid = document.getElementById("cardsGrid");

function renderCartas() {
  grid.innerHTML = "";
  cartas.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${c.src}" alt="${c.nombre}">
      <p>${c.nombre}</p>
    `;
    grid.appendChild(card);
  });
}

function openDialog() {
  renderCartas();
  overlay.hidden = false;
  dialog.hidden = false;
}

function closeDialog() {
  overlay.hidden = true;
  dialog.hidden = true;
}

openBtn.addEventListener("click", openDialog);
overlay.addEventListener("click", closeDialog);
closeBtn.addEventListener("click", closeDialog);
