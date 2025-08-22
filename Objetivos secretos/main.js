let siguiente = document.getElementById("siguiente")
let revelar = document.getElementById("revelar")
let objetivorevelado = document.getElementById("objetivo")

function texto1 (){
  objetivorevelado.textContent = "Objetivo revelado."
  siguiente.disabled = false
}
revelar.addEventListener ("click", texto1) 

function texto2 (){
    objetivorevelado.textContent = "Todos los jugadores salvo el jugador colorjugador."
    siguiente.disabled = true
  }
  siguiente.addEventListener ("click", texto2) 