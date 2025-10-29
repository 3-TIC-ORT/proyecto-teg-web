const todosLosColores = ["Azul", "Rojo", "Amarillo", "Verde", "Rosa", "Negro"];

function generarSelectores() {
  const cantidadJugadores = parseInt(document.getElementById("cantidadJugadores").value);
  const contenedor = document.getElementById("selectores");
  contenedor.innerHTML = "";

  for (let i = 0; i < cantidadJugadores; i++) {
    const div = document.createElement("div");
    div.className = "seleccion-jugador";

    const etiqueta = document.createElement("label");
    etiqueta.textContent = `Jugador ${i + 1}:`;

    const selector = document.createElement("select");
    selector.id = `jugador${i}`;
    selector.onchange = () => actualizarOpciones();

    div.appendChild(etiqueta);
    div.appendChild(selector);
    contenedor.appendChild(div);
  }

  actualizarOpciones();
}

function actualizarOpciones() {
  const cantidadJugadores = parseInt(document.getElementById("cantidadJugadores").value);
  const coloresSeleccionados = [];

  for (let i = 0; i < cantidadJugadores; i++) {
    const selector = document.getElementById(`jugador${i}`);
    if (selector.value) coloresSeleccionados.push(selector.value);
  }

  for (let i = 0; i < cantidadJugadores; i++) {
    const selector = document.getElementById(`jugador${i}`);
    const valorActual = selector.value;
    selector.innerHTML = "";

    const opcionVacia = document.createElement("option");
    opcionVacia.value = "";
    opcionVacia.textContent = "Seleccione un color...";
    opcionVacia.disabled = true;
    if (!valorActual) opcionVacia.selected = true;
    selector.appendChild(opcionVacia);

    const coloresDisponibles = todosLosColores.filter(
      color => !coloresSeleccionados.includes(color) || color === valorActual
    );

    coloresDisponibles.forEach(color => {
      const opcion = document.createElement("option");
      opcion.value = color;
      opcion.textContent = color;
      if (color === valorActual) opcion.selected = true;
      selector.appendChild(opcion);
    });
  }
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
  window.location.href = "../Objetivos%20secretos/objetivos.html";
  return true;
}

