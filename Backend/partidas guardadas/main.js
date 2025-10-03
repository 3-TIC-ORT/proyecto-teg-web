import fs from "fs"
 
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";


export function inicializarEventosJuego() {
  
  subscribePOSTEvent("colocarTropas", (data) => {
   
    let resultado = {
      ok: true,
      estado: {},
    };
    return resultado;
  });

  
  subscribePOSTEvent("atacar", (data) => {
    let resultado = {
      ok: true,
      cambio: {},  
      estado: {}, 
    };
    return resultado;
  });

 
  subscribePOSTEvent("moverTropas", (data) => {
    return { ok: true, estado: {} };
  });


  subscribePOSTEvent("terminarTurno", (data) => {
    let estadoNuevo = {};
    realTimeEvent("turnoCambiado", { partidaId: data.partidaId, estado: estadoNuevo });
    return { ok: true, estado: estadoNuevo };
  });

 }
  subscribeGETEvent("informacionJugador", (data) => {
    return { jugador: {} };
  });
startServer (3000, true);