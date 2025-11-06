let todosLosColores = ["Azul", "Rojo", "Amarillo", "Verde", "Rosa", "Negro"];

    function generarSelectores(cantidadJugadores) {
      let contenedor = document.getElementById("selectores");
      contenedor.innerHTML = "";

      for (let i = 0; i < cantidadJugadores; i++) {
        let div = document.createElement("div");
        div.className = "seleccion-jugador";

        let etiqueta = document.createElement("label");
        etiqueta.textContent = `Jugador ${i + 1}: `;

        let selector = document.createElement("select");
        selector.id = `jugador${i}`;
        selector.onchange = () => actualizarOpciones(cantidadJugadores);

        div.appendChild(etiqueta);
        div.appendChild(selector);
        contenedor.appendChild(div);
      }

      actualizarOpciones(cantidadJugadores);

      // Guardar la cantidad de jugadores seleccionada en localStorage
      localStorage.setItem("lsnumeroJugadores", cantidadJugadores);
    }

    function actualizarOpciones(cantidadJugadores) {
      let coloresSeleccionados = [];

      for (let i = 0; i < cantidadJugadores; i++) {
        let selector = document.getElementById(`jugador${i}`);
        if (selector.value) coloresSeleccionados.push(selector.value);
      }

      for (let i = 0; i < cantidadJugadores; i++) {
        let selector = document.getElementById(`jugador${i}`);
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
          if (color === valorActual) opcion.selected = true;
          selector.appendChild(opcion);
        });
      }

      localStorage.setItem("lscolores", JSON.stringify(coloresSeleccionados));
    }

    function verificarColoresSeleccionados() {
      const cantidadJugadores = parseInt(localStorage.getItem("lsnumeroJugadores"));
      for (let i = 0; i < cantidadJugadores; i++) {
        const selector = document.getElementById(`jugador${i}`);
        if (!selector.value) {
          alert(`El Jugador ${i + 1} debe seleccionar un color.`);
          return false;
        }
      }

      alert("Todos los jugadores tienen un color asignado ✅");
      window.location.href = "../juegoprincipal/juegoprincipal.html";
      return true;
    }