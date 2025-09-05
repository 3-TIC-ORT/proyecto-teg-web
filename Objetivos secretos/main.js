let siguiente = document.getElementById("siguiente")
let revelar = document.getElementById("revelar")
let objetivorevelado = document.getElementById("objetivo")
let objetivo1 =document.getElementById("objeto1")
let objetivo2 =document.getElementById("objeto2")

function texto1 (){
  objetivorevelado.textContent = "Objetivo revelado."
  siguiente.disabled = false
}
siguiente.addEventListener ("click", texto1) 

function texto2 (){
    objetivorevelado.textContent = "Todos los jugadores salvo el jugador colorjugador."
    siguiente.disabled = true
  }
revelar.addEventListener ("click", texto2) 