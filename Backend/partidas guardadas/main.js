import fs from "fs"
 
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";


subscribePOSTEvent("guardarPartida", (data) => {
  let partidas = JSON.parse(fs.readFileSync("./joaco.json", "utf-8"));

  partidas.push({
    fecha: new Date().toISOString(),
    partida: data, 
  });

  fs.writeFileSync("./joaco.json", JSON.stringify(partidas, null, 2));

  return { ok: true, mensaje: "Partida guardada correctamente" };
});

//timer 
let segundosrestantes = 240;

subscribeGETEvent("ObtenerTimer",() =>{
return{ segundos: segundosrestantes};
});

subscribePOSTEvent("ActualizarTimer", (data) =>{
  segundosrestantes = data.segundos;
  return{ok: true};
});

let contenido = JSON.parse(fs.readFileSync("./joaco.json","utf-8"));

contenido.push({
  segundos: segundosrestantes
});

fs.writeFileSync("./joaco.json", JSON.stringify(contenido, null, 2));

return{ok: true, mensaje: "Timer guardado"};

startServer(3000, true);