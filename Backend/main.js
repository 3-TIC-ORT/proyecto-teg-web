import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";


function leerPartida() {
  try {
    return JSON.parse(fs.readFileSync("./joaco.json", "utf-8"));
  } catch {
    return null;
  }
}

function guardarPartidaArchivo(data) {
  fs.writeFileSync("./joaco.json", JSON.stringify(data, null, 2));
}

let estadoActual = {
  cantidadJugadores: null,
  faseDeEstados: null,
  jugadorActual: null,
  jugadores: [],
  timer: 240000 
};

subscribePOSTEvent("cantidadJugadores", (data) => {
  estadoActual.cantidadJugadores = data.cantidadJugadores;
  return { ok: true };
});

subscribePOSTEvent("FaseDeEstados", (data) => {
  estadoActual.faseDeEstados = data.fase;
  return { ok: true };
});

subscribePOSTEvent("jugador", (data) => {
  estadoActual.jugadorActual = data.jugador;
  return { ok: true };
});

subscribePOSTEvent("jugadores", (data) => {
  estadoActual.jugadores = data.jugadores;
  return { ok: true };
});

// timer 
subscribePOSTEvent("ActualizarTimer", (data) => {
  estadoActual.timer = data.timer; 
  return { ok: true };
});

//guarda la partida
subscribePOSTEvent("guardarPartida", (data) => {
  let joaco = JSON.parse(fs.readFileSync("./joaco.json","utf-8"))
  data = estadoActual
  joaco = estadoActual
  fs.writeFileSync("./joaco.json", JSON.stringify(joaco, null, 2));
  return joaco
});

subscribeGETEvent("cargarPartida", () => {
  let datos = leerPartida();
  return datos || estadoActual;
});

startServer(3000);