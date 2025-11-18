let todosLosColores = ["Azul", "Rojo", "Amarillo", "Verde", "Rosa", "Negro"];

const colorMap = {
  "Azul": "blue",
  "Rojo": "red",
  "Amarillo": "yellow",
  "Verde": "green",
  "Rosa": "pink",
  "Negro": "black"
};

function aplicarColorAlSelect(selector) {
  if (!selector) return;
  const nombre = selector.value;
  const cssColor = colorMap[nombre] || "";
  selector.style.backgroundColor = cssColor || "white";
  const darkColors = ["black", "blue", "red", "green"];
  selector.style.color = darkColors.includes(cssColor) ? "white" : "black";
}

function generarSelectores(cantidadJugadores) {
  let contenedor = document.getElementById("selectores");
  contenedor.innerHTML = "";
  contenedor.style.display = "block";

  // Mostrar flechas
  document.getElementById("flecha-izquierda").style.display = "block";
  document.getElementById("flecha-derecha").style.display = "block";

  // Ocultar botones de cantidad de jugadores
  const botonesCont = document.querySelector(".botones-jugadores");
  if (botonesCont) botonesCont.style.display = "none";

  for (let i = 0; i < cantidadJugadores; i++) {
    let div = document.createElement("div");
    div.className = "seleccion-jugador";

    let etiqueta = document.createElement("label");
    etiqueta.textContent = `Jugador ${i + 1}: `;

    let selector = document.createElement("select");
    selector.id = `jugador${i}`;
    selector.onchange = () => {
      actualizarOpciones(cantidadJugadores);
      aplicarColorAlSelect(selector);
    };

    div.appendChild(etiqueta);
    div.appendChild(selector);
    contenedor.appendChild(div);
  }

  actualizarOpciones(cantidadJugadores);

  for (let i = 0; i < cantidadJugadores; i++) {
    aplicarColorAlSelect(document.getElementById(`jugador${i}`));
  }

  localStorage.setItem("lsnumeroJugadores", cantidadJugadores);
}

function actualizarOpciones(cantidadJugadores) {
  let coloresSeleccionados = [];

  for (let i = 0; i < cantidadJugadores; i++) {
    let sel = document.getElementById(`jugador${i}`);
    if (sel && sel.value) coloresSeleccionados.push(sel.value);
  }

  for (let i = 0; i < cantidadJugadores; i++) {
    let selector = document.getElementById(`jugador${i}`);
    if (!selector) continue;
    let valorActual = selector.value;

    while (selector.options.length > 0) selector.remove(0);

    let opcionVacia = document.createElement("option");
    opcionVacia.value = "";
    opcionVacia.textContent = "Seleccione un color...";
    opcionVacia.disabled = true;
    if (!valorActual) opcionVacia.selected = true;
    selector.appendChild(opcionVacia);

    let coloresDisponibles = todosLosColores.filter(
      color => !coloresSeleccionados.includes(color) || color === valorActual
    );

    coloresDisponibles.forEach(color => {
      let opcion = document.createElement("option");
      opcion.value = color;
      opcion.textContent = color;

      const cssColor = colorMap[color] || "";
      if (cssColor) {
        opcion.style.backgroundColor = cssColor;
        const darkColors = ["black", "blue", "red", "green"];
        opcion.style.color = darkColors.includes(cssColor) ? "white" : "black";
      }

      if (color === valorActual) opcion.selected = true;
      selector.appendChild(opcion);
    });

    aplicarColorAlSelect(selector);
  }

  localStorage.setItem("lscolores", coloresSeleccionados);
}

function verificarColoresSeleccionados() {
  const cantidad = parseInt(localStorage.getItem("lsnumeroJugadores")) || 0;
  for (let i = 0; i < cantidad; i++) {
    const selector = document.getElementById(`jugador${i}`);
    if (!selector || !selector.value) {
      alert(`El Jugador ${i + 1} debe seleccionar un color.`);
      return false;
    }
  }

  alert("Todos los jugadores tienen un color asignado ✅");
  window.location.href = "../objetivos/objetivos.html";
  return true;
}

function volverASeleccionJugadores() {
  // Ocultar el contenedor de selects
  document.getElementById("selectores").style.display = "none";

  // Ocultar flechas
  document.getElementById("flecha-izquierda").style.display = "none";
  document.getElementById("flecha-derecha").style.display = "none";

  // Mostrar botones de cantidad de jugadores
  const botonesCont = document.querySelector(".botones-jugadores");
  if (botonesCont) botonesCont.style.display = "block";}
  function volverAlMenuPrincipal() {
    window.location.href = "../menu%20principal/menuprincipal.html";
  }
  