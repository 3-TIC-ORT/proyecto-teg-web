function elegircolorjugador (colorjugador) {
    return Math.random() * (max - min) + min;
}
let colorjugador = (1, 6)
if (colorjugador === 1) {
    colorjugador = "ROJO"
}
if (colorjugador === 2) {
    colorjugador = "AZUL"
}
if (colorjugador === 3) {
    colorjugador = "VERDE"
}
if (colorjugador === 4) {
    colorjugador = "AMARILLO"
}
if (colorjugador === 5) {
    colorjugador = "ROSA"
}
if (colorjugador === 6) {
    colorjugador = "NEGRO"
}
let objetivossectretos = "TODOS LOS JUGADORES CIERRAN LOS OJOS EXCEPTO EL JUGADOR " + colorjugador +  " CUANDO TODOS CIERREN LOS OJOS, EL JUGADOR AZUL DEBE APRETAR EL BOTÓN DE REVELAR OBJETIVO SECRETO"
console.log ()
console.log (objetivossectretos)