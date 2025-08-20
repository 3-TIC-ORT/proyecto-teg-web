let siguiente = document.getElementsByClassName("siguiente")
let revelar = document.getElementsByClassName("revelar")
let objetivorevelado = document.getElementsByClassName("objetivo")

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