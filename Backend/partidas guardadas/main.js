import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

startServer();

function leerPartidas() {
  try {
    return JSON.parse(fs.readFileSync("./joaco.json", "utf-8"));
  } catch {
    return []; // si no existe o está vacío
  }
}

subscribePOSTEvent("guardarPartida", (data) => {
  let partidas = leerPartidas();

  partidas.push({
    fecha: new Date().toISOString(),
    partida: data,
  });

  fs.writeFileSync("./joaco.json", JSON.stringify(partidas, null, 2));

  return { ok: true, mensaje: "Partida guardada correctamente" };
});

// timer 
let segundosrestantes = 240;

subscribeGETEvent("ObtenerTimer", () => {
  return { segundos: segundosrestantes };
});

subscribePOSTEvent("ActualizarTimer", (data) => {
  segundosrestantes = data.segundos;
  return { ok: true };
});
