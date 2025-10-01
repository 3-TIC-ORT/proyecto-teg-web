function tirarDadoAtacado1() {
    let numeroAleatorio1 = Math.round((Math.random() * 5) + 1) * 3;
    console.log(numeroAleatorio1)
}
function tirarDadoAtacado2() {
    let numeroAleatorio2 = Math.round((Math.random() * 5) + 1) * 3;
    console.log(numeroAleatorio2)
}
function tirarDadoAtacado3() {
    let numeroAleatorio3 = Math.round((Math.random() * 5) + 1) * 3;
    console.log(numeroAleatorio3)
}
let tirarDadosAtacado = document.getElementById("tirar2")
tirarDadosAtacado.addEventListener("click", tirarDadoAtacado1, tirarDadoAtacado2, tirarDadoAtacado3)

const resultadoAtacado1 = tirarDadoAtacado1();
const resultadoAtacado2 = tirarDadoAtacado2();
const resultadoAtacado3 = tirarDadoAtacado3();
const dadosAtacado = [resultadoAtacado1, resultadoAtacado2, resultadoAtacado3]
const numeroDadosAtacado = dadosAtacado.length

if (paisAtacado.fichas >= 4) {
    if (numeroDadosAtacado === 3) {
        dadosAtacado.push(resultadoAtacado3)
    }
    if (numeroDadosAtacado === 2) {
        dadosAtacado.push(resultadoAtacado2)
        dadosAtacado.push(resultadoAtacado3)
    }
    console.log("Dados del Atacado: dado 1:" + dadosAtacado.resultadoAtacado1) 
    console.log("Dados del Atacado: dado 2:" + dadosAtacado.resultadoAtacado2)
    console.log("Dados del Atacado: dado 3:" + dadosAtacado.resultadoAtacado3)
}
if (paisAtacado.fichas === 3) {
    if (numeroDadosAtacado.length === 3) {
        dadosAtacado.splice(2, 1)
    }
    if (numeroDadosAtacado === 1) {
        dadosAtacado.push(resultadoAtacado2)
    }
    console.log("Dados del Atacado: dado 1:" + dadosAtacado.resultadoAtacado1)
    console.log("Dados del Atacado: dado 2:" + dadosAtacado.resultadoAtacado2)
}
if (paisAtacado.fichas === 2) {
    if (numeroDadosAtacado.length === 3) {
        dadosAtacado.splice(2, 1)
        dadosAtacado.splice(1, 1)
    }
    if (numeroDadosAtacado.length === 2) {
        dadosAtacado.splice(1, 1)
    }
    console.log("Dados del Atacado: dado 1:" + dadosAtacado.resultadoAtacado1)
}
if (paisAtacado.fichas === null) {
    console.log("El país fué conquistado por el atacante")
}
