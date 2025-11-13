import fs from "fs";
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

function leerPartidas() {
  try {
    return JSON.parse(fs.readFileSync("./joaco.json", "utf-8"));
  } catch {
    return [];
  }
}

subscribePOSTEvent("guardarPartida", (data) => {
  let partidas = leerPartidas();

  partidas.push({
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


startServer(3000);