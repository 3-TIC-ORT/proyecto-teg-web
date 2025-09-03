let cantidadjugadores = document.getElementById ("cantidadjugadores")
let botoncantidadjugadores = document.getElementById ("botoncantdadjugadores")
let numerodejugadores =document.getElementById ("numerodejugadores")
let numero   =[]
if (cantidadjugadores > 6 || cantidadjugadores < 3){
  alert ("no llegas a la cantidad de jugadores")
}
function canti (){
  numero.push (numerodejugadores.value)
  console.log (numero)
}
//colores 
let objetivos =document.getElementById ("objetivos")
let botoncolor = document.getElementById ("botoncolor")
let colorines =document.getElementById ("color de jugadores")
let colores = []
function objetos (){

  if (colores > cantidadJugadores || colores  <cantidadJugadores){
    alert ("no coincide la cantidad de jugadores con los colores")
  }
  colores.push (objetivos.value)
  console.log (colores)
  
}
function final (){
  while (i < players){
  if (jugador === players[i]){
      let pizzeria=document.createElement ("botoncolor")
      pizzeria.textContent= players
      objetivos.appendChild (li)}
  i++

}
}
colorines.addEventListener ("click",final)

//intento de la eleccion de color
