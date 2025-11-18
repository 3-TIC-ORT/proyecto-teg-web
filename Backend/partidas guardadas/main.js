import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

function leerPartidas() {
  try {
    return JSON.parse(fs.readFileSync("./joaco.json", "utf-8"));
  } catch {
    return [];
  }
}
let estadoActual = {
  cantidadjugadores: null,
  faseDeEstados: null,
  jugadorActual: null,
  jugadores:[],
  timer: 240000
};
// cantidad de jugadores
subscribePOSTEvent("cantidadJugadores", (data) => {
  estadoActual.cantidadJugadores = data.cantidadJugadores;
  return { ok: true };
});
// guarda fase del juego
subscribePOSTEvent("FaseDeEstados",(data) => {
estadoActual.faseDeEstados = data.fase;
return{ ok: true };
});
// guarda jugador actual
subscribePOSTEvent("jugador", (data) => {
  estadoActual.jugadorActual = data.jugador;
  return { ok:true };
});
// guarda lista completa de jugadores
subscribePOSTEvent("jugadores", (data) => {
  estadoActual.jugadores = data.jugadores;
  return { ok: true };
});
//guarda timer al pausar
subscribePOSTEvent("ActualizarTimer", (data) => {
  estadoActual.timer = data.segundos;
  return { ok: true };
});

subscribeGETEvent("timer", () => {
  return { timer: estadoActual.timer };
});

subscribePOSTEvent("guardarPartida", (data) => {
  let partidas = leerPartidas();

  partidas.push({
    datos: estadoActual,
    partida: data,
  });

  fs.writeFileSync("./joaco.json", JSON.stringify(partidas, null, 2));
  return { ok: true, mensaje: "Partida guardada correctamente" };
});

startServer(3000);