function elegircolorjugador (colorjugador) {
    return Math.random() * (1, 6);
}
let colorjugador = (1, 6)
let colorjugador1 = elegircolorjugador 
if (colorjugador1 === 1) {
    colorjugador1 = "ROJO"
}
if (colorjugador1 === 2) {
    colorjugador1 = "AZUL"
}
if (colorjugador1 === 3) {
    colorjugador1 = "VERDE"
}
if (colorjugador1 === 4) {
    colorjugador1 = "AMARILLO"
}
if (colorjugador1 === 5) {
    colorjugador1 = "ROSA"
}
if (colorjugador1 === 6) {
    colorjugador1 = "NEGRO"
}
let objetivossectretos = "TODOS LOS JUGADORES CIERRAN LOS OJOS EXCEPTO EL JUGADOR " + colorjugador +  " CUANDO TODOS CIERREN LOS OJOS, EL JUGADOR AZUL DEBE APRETAR EL BOTÓN DE REVELAR OBJETIVO SECRETO"
console.log ()
console.log (objetivossectretos)