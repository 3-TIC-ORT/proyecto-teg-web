let cantidadjugadores = prompt("cuantos jugadores?")
let coloresjugadores = []
let i = 0
if (cantidadjugadores < 3) {
    alert ("no llegas")
}
if (cantidadjugadores > 6) {
    alert ("te pasas")
}
let messi = prompt ("que color queres?")
if (cantidadjugadores === 3) {
  coloresjugadores.push (messi.value)
  console.log (coloresjugadores)
}
if (cantidadjugadores === 4) {
  coloresjugadores.push (messi.value)
  console.log (coloresjugadores)
  }
  if (cantidadjugadores === 5) {
    coloresjugadores.push (messi.value)
    console.log ("coloresjugadores")
  }
  if (cantidadjugadores === 6) {
    coloresjugadores.push (messi.value)
    console.log (coloresjugadores)
  }