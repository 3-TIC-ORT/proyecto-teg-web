let objetivos = [
  "Destruir al ejército amarillo",
  "Destruir al ejército azul",
  "Destruir al ejército rojo",
  "Destruir al ejército negro",
  "Destruir al ejército verde",
  "Destruir al ejército rosa",
  "Ocupar América del Sur, 7 países de Europa y tres países limítrofes entre sí",
  "Ocupar Europa, 4 países de Asia y 2 países de América del Sur",
  "Ocupar África, 5 países de América del Norte y 4 países de Europa",
  "Ocupar Oceanía, África y 5 países de América del Norte",
  "Ocupar América del Sur, África y 4 países de Asia",
  "Ocupar Asia y 2 países de América del Sur",
  "Ocupar América del Norte, 2 países de Oceanía y 4 de Asia",
  "Ocupar 2 países de Oceanía, 2 países de África, 2 países de América del Sur, 3 países de Europa, 4 países de África y 3 de Asia"
];

let jugadoresSeleccionados = [];
let jugadoresobjetivos = {};
let i = 0;

window.onload = () => {
  let cantidad = null;
  let coloresJugadores = [];

  const configRaw = localStorage.getItem("cantidadJugadores");
  if (configRaw) {
    try {
      const cfg = JSON.parse(configRaw);
      cantidad = parseInt(cfg.cantidad, 10);
      // cfg.elecciones puede ser objeto con claves "1","2",...
      for (let idx = 1; idx <= cantidad; idx++) {
        const key = String(idx);
        coloresJugadores.push((cfg.elecciones && (cfg.elecciones[key] || cfg.elecciones[idx])) || null);
      }
    } catch (err) {
      // si falla el parseo, sigue al fallback
      cantidad = null;
      coloresJugadores = [];
    }
  }

  // Fallback a formato antiguo (cantidadJugadores + coloresElegidos)
  if (!cantidad) {
    const data = localStorage.getItem("cantidadJugadores");
    console.log(data)
    if (!data) {
      alert("No se encontraron jugadores seleccionados.");
      window.location.href = "seleccion.html";
      return;
    }
    cantidad = parseInt(data, 10);
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Número de jugadores inválido.");
      window.location.href = "seleccion.html";
      return;
    }

    const coloresRaw = localStorage.getItem("coloresElegidos") || "{}";
    console.log(coloresRaw) 
    // Intentar parsear JSON
    let parsed = {};
    try {
      parsed = JSON.parse(coloresRaw);
    } catch (e) {
      parsed = {};
    }

    // El formato guardado es un objeto con claves "1", "2", etc.
    for (let idx = 1; idx <= cantidad; idx++) {
        const key = String(idx);
        coloresJugadores.push(parsed[key] || null);
    }
  }

  // Asegurar longitud correcta rellenando con nulls si falta
  while (coloresJugadores.length < cantidad) coloresJugadores.push(null);

  // Generar lista de jugadores simples ("Jugador 1", ...)
  jugadoresSeleccionados = Array.from({ length: cantidad }, (_, idx) => `Jugador ${idx + 1}`);

  // Mezclar objetivos
    // --- Mezclar y asignar objetivos evitando destruir colores inactivos ---
  // Normalizar y obtener set de colores activos (lowercase, trimmed)
  const activeColors = new Set(
    coloresJugadores
      .filter(Boolean)
      .map(c => String(c).toLowerCase().trim())
  );

  // Mezclar la lista de objetivos
  let mezcla = objetivos.slice().sort(() => 0.5 - Math.random());

  // Función utilitaria: devuelve true si el objetivo es "Destruir al ejército X"
  // y X está activo y diferente del color prohibido (ownColorLower)
  function puedeAsignarDestruir(obj, ownColorLower) {
    const prefix = "destruir al ejército ";
    const low = obj.toLowerCase().trim();
    if (!low.startsWith(prefix)) return false;
    const colorTarget = low.slice(prefix.length).trim();
    // Solo permitir si el color está en la partida y no es el propio
    return activeColors.has(colorTarget) && colorTarget !== ownColorLower;
  }

  jugadoresSeleccionados.forEach((jugadores, idx) => {
    const colorJugadorRaw = coloresJugadores[idx];
    const colorJugador = colorJugadorRaw ? String(colorJugadorRaw).toLowerCase().trim() : null;
    const objetivoProhibido = colorJugador; // puede ser null

    // Buscar prioridad 1: un "destruir" válido (color activo y no propio)
    let objetivoAsignado = mezcla.find(obj => {
      return puedeAsignarDestruir(obj, objetivoProhibido);
    });

    // Prioridad 2: si no hay un "destruir" válido, elegir cualquier objetivo que no
    // sea "destruir a <color inexistente o propio>" — es decir, preferir objetivos no-destrucción.
    if (!objetivoAsignado) {
      objetivoAsignado = mezcla.find(obj => {
        const low = obj.toLowerCase().trim();
        const prefix = "destruir al ejército ";
        if (!low.startsWith(prefix)) return true; // objetivo que no es "destruir" -> válido
        // Si es "destruir", comprobar si apoya al color activo y distinto (por si hay alguno)
        return puedeAsignarDestruir(obj, objetivoProhibido);
      });
    }

    // Si aún no hay (caso extremo), tomar el primer objetivo disponible
    if (!objetivoAsignado) objetivoAsignado = mezcla[0];

    jugadoresobjetivos[jugadores] = objetivoAsignado;
    // Quitar el objetivo asignado de la mezcla para que no se repita
    mezcla = mezcla.filter(obj => obj !== objetivoAsignado);
  });

  
  // Asignar objetivos evitando "destruir su propio color" cuando sea posible
  jugadoresSeleccionados.forEach((jugadores, idx) => {
    const colorJugador = coloresJugadores[idx]; // puede ser null
    let objetivoProhibido = colorJugador ? `Destruir al ejército ${colorJugador}` : null;

    // Buscar objetivo válido
    let objetivoAsignado = mezcla.find(obj => objetivoProhibido ? obj.toLowerCase() !== objetivoProhibido.toLowerCase() : true);

    // Si no hay (caso absurdo), elegir uno que no empiece con "Destruir" si es posible
    if (!objetivoAsignado) {
      objetivoAsignado = mezcla.find(obj => !obj.toLowerCase().startsWith("destruir")) || mezcla[0];
    }

    jugadoresobjetivos[jugadores] = objetivoAsignado;
    mezcla = mezcla.filter(obj => obj !== objetivoAsignado);
  });

  mostrarSiguientejugadores();
};

function mostrarSiguientejugadores() {
  let jugadores = jugadoresSeleccionados[i];
  document.getElementById("reveal-instructions").innerHTML =
    `¡MÍRALO RÁPIDO Y NO LO COMPARTAS!<br>Y ¡ASEGÚRATE QUE NADIE ESTÉ VIENDO!<br><br>
    TODOS CIERRAN LOS OJOS EXCEPTO <b>${jugadores.toUpperCase()}</b><br>
    CUANDO TODOS CIERREN LOS OJOS, <b>${jugadores.toUpperCase()}</b> DEBE APRETAR EL BOTÓN`;

  document.getElementById("objective").style.display = "none";
  const btn = document.getElementById("action-button");
  btn.innerText = "REVELAR OBJETIVO SECRETO";
  btn.onclick = showObjective;
  document.getElementById("overlay").style.display = "flex";
}

function showObjective() {
  let jugadores = jugadoresSeleccionados[i];
  document.getElementById("objective").innerText =
    `CONQUISTAR “${jugadoresobjetivos[jugadores]}”`;
  document.getElementById("objective").style.display = "block";

  const btn = document.getElementById("action-button");
  btn.innerText = "SIGUIENTE JUGADOR";
  btn.onclick = nextObjective;
}

function nextObjective() {
  i++;
  if (i < jugadoresSeleccionados.length) {
    mostrarSiguientejugadores();
  } else {
    localStorage.setItem("objetivos", JSON.stringify(jugadoresobjetivos));
    document.getElementById("overlay").style.display = "none";
    alert("Todos los objetivos fueron revelados. ¡A jugar!");
    window.location.href = "../juegoprincipal/juegoprincipal.html";
  }
}

