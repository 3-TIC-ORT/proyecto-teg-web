import fs from "fs"
 
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

let atacar = document.getElementById("Atacar");

if (atacar) {  // solo si existe
  atacar.addEventListener("click", () => {
    console.log("¡Atacando!");
  });
} else {
  console.error("No encontré el botón con id 'Atacar'");
}