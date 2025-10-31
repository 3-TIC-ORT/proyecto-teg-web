import fs from "fs"
 
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";


subscribePOSTEvent("guardar", (data) =>{
let joaco = fs.readFileSync("./joaco.json","utf-8")
joaco.push(data)
fs.writeFileSync("./joaco.json",joaco)
})

let estadoActual = "colocacion";

subscribeGETEvent("obtenerEstado", () => {
    return { estado: estadoActual };
  });

  subscribePOSTEvent("cambiarEstado", (data) => {
    let nuevoEstado = data.nuevo;
    console.log("cambiando estado: "+ estadoActual + " a "+ nuevoEstado);
    estadoActual = nuevoEstado;
    return { ok: true, estado: estadoActual };
  });

// cambiar el timer
let segundosRestantes = 120;

let intervalo = null;

function IniciarTimer() {
  clearInterval(intervalo);
  intervalo = setInterval(() => {
    segundosRestantes--;
    realTimeEvent("tick", {segundos: segundosrRestantes});
    if (segundosRestantes <= 0 ){
      clearInterval(intervalo);
      realTimeEvent("Tiempo Terminado", {});
    }
  }, 1000);
}
subscribeGETEvent("obtenerTimer", () => { segundos: segundosRestantes});

subscribePOSTEvent("reiniciarTimer", () => {
segundosRestantes = 120;
IniciarTimer();
return {ok: true};
});




  startServer(3000, true);