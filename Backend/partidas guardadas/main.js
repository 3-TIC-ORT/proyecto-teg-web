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

// timer cambiado
let segundosRestantes = 330;
let intervalo;

function iniciarTimer() {
  clearInterval(intervalo);
  segundosRestantes = 330;

  intervalo = setInterval(() => {
    segundosRestantes--;
    realTimeEvent("tick", { segundos: segundosRestantes }); 

    if (segundosRestantes <= 0) {
      clearInterval(intervalo);
      realTimeEvent("tiempoTerminado", {}); 

     
      maquinaDeFases.transition("click");  

  
      iniciarTimer();
    }
  }, 1000);
}

startServer(3000, true);