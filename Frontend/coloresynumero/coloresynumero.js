let todosLosColores = ["Azul", "Rojo", "Amarillo", "Verde", "Rosa", "Negro"];

function generarSelectores() {
  let cantidadJugadores = parseInt(document.getElementById("cantidadJugadores").value);
  let contenedor = document.getElementById("selectores");
  contenedor.innerHTML = "";

  for (let i = 0; i < cantidadJugadores; i++) {
    let div = document.createElement("div");
    div.className = "seleccion-jugador";

    let etiqueta = document.createElement("label");
    etiqueta.textContent = `Jugador ${i + 1}:`;

    let selector = document.createElement("select");
    selector.id = `jugador${i}`;
    selector.onchange = () => actualizarOpciones();

    div.appendChild(etiqueta);
    div.appendChild(selector);
    contenedor.appendChild(div);
  }

  actualizarOpciones();
  localStorage.setItem("lsnumeroJugadores", cantidadJugadores.value)
}

let coloresDisponibles =  new Array(5).fill("");

function actualizarOpciones() {
  let cantidadJugadores = parseInt(document.getElementById("cantidadJugadores").value);
  let coloresSeleccionados = [];

  // Recoger los colores seleccionados
  for (let i = 0; i < cantidadJugadores; i++) {
    let selector = document.getElementById(`jugador${i}`);
    if (selector.value) coloresSeleccionados.push(selector.value);
  }

  // Actualizar las opciones de cada selector
  for (let i = 0; i < cantidadJugadores; i++) {
    let selector = document.getElementById(`jugador${i}`);
    let valorActual = selector.value;

    // Limpiar las opciones del selector
    while (selector.options.length > 0) {
      selector.remove(0);
    }

    // Agregar la opción "Seleccione un color..."
    let opcionVacia = document.createElement("option");
    opcionVacia.value = "";
    opcionVacia.textContent = "Seleccione un color...";
    opcionVacia.disabled = true;
    if (!valorActual) opcionVacia.selected = true;
    selector.appendChild(opcionVacia);

    // Filtrar colores disponibles
    let coloresDisponibles = todosLosColores.filter(
      color => !coloresSeleccionados.includes(color) || color === valorActual
    );

    // Agregar las opciones de colores disponibles
    coloresDisponibles.forEach(color => {
      let opcion = document.createElement("option");
      opcion.value = color;
      opcion.textContent = color;
      if (color === valorActual) opcion.selected = true;
      selector.appendChild(opcion);
    });
  }

  // Guardar el estado de los colores seleccionados en localStorage
  localStorage.setItem("lscolores", coloresSeleccionados);
}


function verificarColoresSeleccionados() {
  const cantidadJugadores = parseInt(document.getElementById("cantidadJugadores").value);
  for (let i = 0; i < cantidadJugadores; i++) {
    const selector = document.getElementById(`jugador${i}`);
    if (!selector.value) {
      alert(`El Jugador ${i + 1} debe seleccionar un color.`);
      return false;
    }
  }
  alert("Todos los jugadores tienen un color asignado");
  window.location.href = "../juegoprincipal/juegoprincipal.html";
  return true;
}


localStorage.setItem("lsnumeroJugadores", cantidadJugadores)