import fs from "fs"
 
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

let atacar = document.getElementById("Atacar");
//no tiene que haber un id en back porque no hay html y el id es un elemento html
if (atacar) {  // solo si existe
  atacar.addEventListener("click", () => {
    console.log("¡Atacando!");
  });
} else {
  console.error("No encontré el botón con id 'Atacar'");
}
//esto ya esta mal