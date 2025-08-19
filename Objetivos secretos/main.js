let siguiente = document.getElementById("siguiente")
let revelar = document.getElementById("revelar")
let objetivorevelado = document.getElementById("objetivo")

function texto1 (){
  objetivorevelado.textContent = "Objetivo revelado."
}
revelar.addEventListener ("click", texto1) 

function texto2 (){
    objetivorevelado.textContent = "Todos los jugadores salvo el jugador colorjugador."
  }
  siguiente.addEventListener ("click", texto2)