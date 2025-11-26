// ...existing code...
let objectives = [
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

let selectedPlayers = [];
let playerObjectives = {};
let i = 0;

window.onload = () => {
  // Intentar leer formato nuevo: objeto JSON guardado como 'configJugadores'
  let cantidad = null;
  let coloresJugadores = [];

  const configRaw = localStorage.getItem("configJugadores");
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
      parsed = JSON.parse(coloresRaw)
    } catch (e) {
      parsed = {}
    }
    for (let idx = 1; idx <= cantidad; idx++) {
        const key = String(idx)
        coloresJugadores.push(parsed[key] || null)
    }
  }
  while (coloresJugadores.length < cantidad) coloresJugadores.push(null)
  selectedPlayers = Array.from({ length: cantidad }, (_, idx) => `Jugador ${idx + 1}`)
  let mezcla = objectives.slice().sort(() => 0.5 - Math.random())
  selectedPlayers.forEach((player, idx) => {
    const colorJugador = coloresJugadores[idx]
    let objetivoProhibido = colorJugador ? `Destruir al ejército ${colorJugador}` : null
    let objetivoAsignado = mezcla.find(obj => objetivoProhibido ? obj.toLowerCase() !== objetivoProhibido.toLowerCase() : true)
    if (!objetivoAsignado) {
      objetivoAsignado = mezcla.find(obj => !obj.toLowerCase().startsWith("destruir")) || mezcla[0];
    }
    playerObjectives[player] = objetivoAsignado
    mezcla = mezcla.filter(obj => obj !== objetivoAsignado)
  })
  showNextPlayer()
}
function showNextPlayer() {
  let player = selectedPlayers[i];
  document.getElementById("reveal-instructions").innerHTML =
    `¡MÍRALO RÁPIDO Y NO LO COMPARTAS!<br>Y ¡ASEGÚRATE QUE NADIE ESTÉ VIENDO!<br><br>
    TODOS CIERRAN LOS OJOS EXCEPTO <b>${player.toUpperCase()}</b><br>
    CUANDO TODOS CIERREN LOS OJOS, <b>${player.toUpperCase()}</b> DEBE APRETAR EL BOTÓN`

  document.getElementById("objective").style.display = "none"
  const btn = document.getElementById("action-button")
  btn.innerText = "REVELAR OBJETIVO SECRETO"
  btn.onclick = showObjective
  document.getElementById("overlay").style.display = "flex"
}

function showObjective() {
  let player = selectedPlayers[i];
  document.getElementById("objective").innerText =
    `CONQUISTAR “${playerObjectives[player]}”`;
  document.getElementById("objective").style.display = "block";

  const btn = document.getElementById("action-button");
  btn.innerText = "SIGUIENTE JUGADOR";
  btn.onclick = nextObjective;
}

function nextObjective() {
  i++;
  if (i < selectedPlayers.length) {
    showNextPlayer();
  } else {
    localStorage.setItem("objetivos", JSON.stringify(playerObjectives));
    document.getElementById("overlay").style.display = "none";
    alert("Todos los objetivos fueron revelados. ¡A jugar!");
    window.location.href = "../juegoprincipal/juegoprincipal.html";
  }
}
