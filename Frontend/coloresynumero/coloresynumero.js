
const colores = ["Azul", "Rojo", "Amarillo", "Verde", "Rosa", "Negro"];
let cantidadJugadores = 0;
let elecciones = {};

function seleccionarJugadores(cantidad) {
  cantidadJugadores = cantidad;
  document.getElementById("pantalla-jugadores").classList.add("oculto");
  document.getElementById("pantalla-colores").classList.remove("oculto");
  document.querySelector(".cruz").style.display = "none";

  const container = document.getElementById("jugadores-selects");
  container.innerHTML = "";
  elecciones = {};

  for (let i = 1; i <= cantidad; i++) {
    const select = document.createElement("select");
    select.id = `jugador-${i}`;
    select.dataset.jugador = i;
    select.innerHTML = generarOpciones();
    select.addEventListener("change", actualizarOpciones);
    container.appendChild(select);
  }
}

function generarOpciones(seleccionActual = "") {
  let opciones = `<option value="">Elegí color</option>`;
  const coloresDisponibles = colores.filter(c => {
    return !Object.values(elecciones).includes(c) || c === seleccionActual;
  });
  coloresDisponibles.forEach(color => {
    opciones += `<option value="${color}">${color}</option>`;
  });
  return opciones;
}

function actualizarOpciones(e) {
  const jugador = e.target.dataset.jugador;
  const nuevoColor = e.target.value;
  elecciones[jugador] = nuevoColor;

  for (let i = 1; i <= cantidadJugadores; i++) {
    const select = document.getElementById(`jugador-${i}`);
    const seleccionActual = elecciones[i] || "";
    const valorPrevio = select.value;
    select.innerHTML = generarOpciones(seleccionActual);
    select.value = valorPrevio;
  }
}

function volverSeleccion() {
  document.getElementById("pantalla-colores").classList.add("oculto");
  document.getElementById("pantalla-jugadores").classList.remove("oculto");
  document.querySelector(".cruz").style.display = "block";
}

function continuarObjetivos() {
  for (let i = 1; i <= cantidadJugadores; i++) {
    const valor = document.getElementById(`jugador-${i}`).value;
    if (!valor) {
      alert("Faltan jugadores por elegir su color");
      return;
    }
  }



  localStorage.setItem("cantidadJugadores", cantidadJugadores)
  localStorage.setItem("coloresElegidos", JSON.stringify(elecciones))

  window.location.href = "../objetivos/objetivos.html"
}
function irMenuPrincipal() {
  window.location.href = "../menu%20principal/menuprincipal.html"
}
