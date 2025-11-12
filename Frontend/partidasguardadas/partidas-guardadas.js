connect2Server
let cantidadJugadores=localStorage.getItem("cantidad")
PostEvent ("cantidadJugadores",{cantidadJugadores})

let fase =localStorage.getItem("lsfase")
PostEvent ("faseDeEstados",{fase})

let jugador = localStorage.getItem("jugador")
PostEvent("jugador",{jugador})

let jugadores =localStorage.getItem("lsjugadores")
PostEvent("jugadores", {jugadores})
function jugadoractual(){
    respuesta.forEach(jugadores => {
        div.innerHTML+=`
        <div class="numero-jugadores">
       
        `
        
    });
   }

