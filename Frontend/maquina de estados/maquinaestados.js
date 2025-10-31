//Maquina de estados finitos

let cantidadJugadores = prompt("¿Cuántos jugadores?");
cantidadJugadores = Math.max(3, Math.min(6, parseInt(cantidadJugadores) || 3))
const faseActual = document.getElementById('faseActual');
const botonPararAtacar = document.getElementById('botonPararAtacar');
const botonTerminarTurno = document.getElementById("terminarTurno")

class fasesMachine {
    constructor() {
        this.state = 'fase de ataque';
        this.cambioDeFaseTurnos = 0;
        this.reposicionesHechas = 0;
    }

    transition(event) {
        const estadoAnterior = this.state;
        switch (this.state) {
            case 'fase de ataque':
                if (event === 'click') {
                    console.log('Cambio de fase de ataque a fase de reagrupación');
                    this.state = 'fase de reagrupación';
                    paisesSeleccionados.length = 0
                }
                break;
            case 'fase de reagrupación':
                if (event === 'click' && this.cambioDeFaseTurnos < cantidadJugadores * 2) {
                    console.log('Cambio de fase de reagrupacion a fase de ataque');
                    this.state = 'fase de ataque';
                    this.cambioDeFaseTurnos++
                    paisesSeleccionados.length = 0
                }
                else if (event === 'click' && this.cambioDeFaseTurnos >= cantidadJugadores * 2) {
                    console.log('Cambio de fase de reagrupación a fase de reposición');
                    this.state = 'fase de reposición';
                    this.cambioDeFaseTurnos = 0;
                    paisesSeleccionados.length = 0
                }
                break;
            case 'fase de reposición':
                if (event === 'click' && this.reposicionesHechas < cantidadJugadores) {
                    console.log('Repone el siguiente jugador');
                    this.state = 'fase de reposición';
                    this.reposicionesHechas++
                    paisesSeleccionados.length = 0
                }
                else if (event === 'click' && this.reposicionesHechas >= cantidadJugadores) {
                    console.log('Cambio de fase de reposición a fase de ataque');
                    this.state = 'fase de ataque';
                    this.reposicionesHechas = 0;
                    paisesSeleccionados.length = 0
                }
                break;
            default:
                console.log(`No se puede manejar el evento "${event}" en el estado "${this.state}".`);
        }

        if (this.state !== estadoAnterior) {
            this.cambioDeFaseTurnos++;
        }
        if (this.state === this.estadoAnterior) {
            this.reposicionesHechas++;
        }
        return this.state;
    }
}

const maquinaDeFases = new fasesMachine(cantidadJugadores);

function actualizarFase() {
    faseActual.textContent = `Fase actual: ${maquinaDeFases.state}`;
}

function pararAtaque() {
    if (maquinaDeFases.state === 'fase de ataque') {
        maquinaDeFases.transition('click');
        actualizarFase();
    } else {
        console.log("Este botón no tiene efecto en la fase actual.");
    }
}
botonPararAtacar.addEventListener('click', pararAtaque);

function terminarTurno() {
    if (maquinaDeFases.state === 'fase de reagrupación' || maquinaDeFases.state === 'fase de reposición') {
        maquinaDeFases.transition('click');
        actualizarFase();
    } else {
        console.log("Este botón no tiene efecto en la fase actual.");
    }
}
botonTerminarTurno.addEventListener('click', terminarTurno);

//
//ATAQUE
//
let paisesSeleccionados = [];

let paisAtacante = { nombre: null, fichas: null };
let paisAtacado = { nombre: null, fichas: null };

function gestionarSeleccionAtaque(pais) {
    const indice = paisesSeleccionados.indexOf(pais);
    const estaSeleccionado = indice !== -1;

    if (estaSeleccionado) {

        paisesSeleccionados.splice(indice, 1);
        pais.seleccionado = false;
        console.log(`${pais.nombre} ha sido deseleccionado.`);

        if (paisAtacante.nombre === pais.nombre) {
            paisAtacante = { nombre: null, fichas: null };
        }

        if (paisAtacado.nombre === pais.nombre) {
            paisAtacado = { nombre: null, fichas: null };
        }
    } else {

        if (paisesSeleccionados.length < 2) {
            paisesSeleccionados.push(pais);
            pais.seleccionado = true;
            console.log(`${pais.nombre} ha sido seleccionado.`);

            if (!paisAtacante.nombre) {
                paisAtacante = {
                    nombre: pais.nombre,
                    fichas: pais.fichas
                };
            } else if (!paisAtacado.nombre) {
                paisAtacado = {
                    nombre: pais.nombre,
                    fichas: pais.fichas
                };
            }
        } else {
            console.log("Ya tienes 2 países seleccionados. Por favor, deselecciona uno para elegir otro.");
        }
    }

    console.log("Países seleccionados:", paisesSeleccionados);
    console.log("Atacante:", paisAtacante);
    console.log("Atacado:", paisAtacado);
}


function tirarDadoAtacante() {
    let numeroAleatorio = Math.round((Math.random() * 5) + 1);
    return numeroAleatorio
}
let tirarDadosAtacante = document.getElementById("tirar1")


const resultadoAtacante1 = tirarDadoAtacante();
const resultadoAtacante2 = tirarDadoAtacante();
const resultadoAtacante3 = tirarDadoAtacante();
const dadosAtacante = [resultadoAtacante1, resultadoAtacante2, resultadoAtacante3]
const numeroDadosAtacante = dadosAtacante.length

function ValoresAtacante() {

    if (paisAtacante.fichas >= 4) {
        if (numeroDadosAtacante === 2) {
            dadosAtacante.push(resultadoAtacante3)
        }
        else if (numeroDadosAtacante === 1) {
            dadosAtacante.push(resultadoAtacante2)
            dadosAtacante.push(resultadoAtacante3)
        }
        dadosAtacante.sort((a, b) => b - a);
        console.log("Dados del atacante: " + dadosAtacante)
    } else if (paisAtacante.fichas === 3) {
        if (numeroDadosAtacante === 3) {
            dadosAtacante.splice(2, 1)
        }
        else if (numeroDadosAtacante === 1) {
            dadosAtacante.push(resultadoAtacante2)
        }
        dadosAtacante.sort((a, b) => b - a);
        console.log("Dados del atacante: " + dadosAtacante)
    } else if (paisAtacante.fichas === 2) {
        if (numeroDadosAtacante === 3) {
            dadosAtacante.splice(2, 1)
            dadosAtacante.splice(1, 1)
        }
        else if (numeroDadosAtacante === 2) {
            dadosAtacante.splice(1, 1)
        }
        console.log("Dados del atacante: dado 1: " + dadosAtacante)
    } else if (paisAtacante.fichas <= 1) {
        console.log("Ejércitos insuficientes")
    } else {
        console.log("Error desconocido");
    }
    return (dadosAtacante);
}

function tirarDadoAtacado() {
    let numeroAleatorio = Math.round((Math.random() * 5) + 1);
    return numeroAleatorio
}
let tirarDadosAtacado = document.getElementById("tirar2")

const resultadoAtacado1 = tirarDadoAtacado();
const resultadoAtacado2 = tirarDadoAtacado();
const resultadoAtacado3 = tirarDadoAtacado();
const dadosAtacado = [resultadoAtacado1, resultadoAtacado2, resultadoAtacado3]
const numeroDadosAtacado = dadosAtacado.length


function ValoresAtacado() {


    if (paisAtacado.fichas >= 3) {
        if (numeroDadosAtacado === 2) {
            dadosAtacado.push(resultadoAtacado3)
        }
        else if (numeroDadosAtacado === 1) {
            dadosAtacado.push(resultadoAtacado2)
            dadosAtacado.push(resultadoAtacado3)
        }
        dadosAtacado.sort((a, b) => b - a);
        console.log("Dados del Atacado: " + dadosAtacado)
    }
    if (paisAtacado.fichas === 2) {
        if (numeroDadosAtacado === 3) {
            dadosAtacado.splice(2, 1)
        }
        else if (numeroDadosAtacado === 1) {
            dadosAtacado.push(resultadoAtacado2)
        }
        dadosAtacado.sort((a, b) => b - a);
        console.log("Dados del Atacado: " + dadosAtacado)
    }

    if (paisAtacado.fichas === 1) {
        if (numeroDadosAtacado === 3) {
            dadosAtacado.splice(2, 1)
            dadosAtacado.splice(1, 1)
        }
        else if (numeroDadosAtacado === 2) {
            dadosAtacado.splice(1, 1)
        }
        console.log("Dado del Atacado: " + dadosAtacado)
    }
    if (paisAtacado.fichas <= 0) {
        console.log("El país fué conquistado por el atacante")
    }
    return (dadosAtacado);
}


function ataqueResolucion() {
    let i = 0;
    while (dadosAtacante.length > i && dadosAtacado.length > i) {
        if (dadosAtacante[i] > dadosAtacado[i]) {
            paisAtacado.fichas = paisAtacado.fichas - 1
            i = i + 1
        } else if (dadosAtacante[i] <= dadosAtacado[i]) {
            paisAtacante.fichas = paisAtacante.fichas - 1
            i = i + 1
        }
        while (dadosAtacante.length > i && dadosAtacado.length > i) {
            if (dadosAtacante[i] > dadosAtacado[i]) {
                paisAtacado.fichas = paisAtacado.fichas - 1
                i = i + 1
            } else if (dadosAtacante[i] <= dadosAtacado[i]) {
                paisAtacante.fichas = paisAtacante.fichas - 1
                i = i + 1
            }
            while (dadosAtacante.length > i && dadosAtacado.length > i) {
                if (dadosAtacante[i] > dadosAtacado[i]) {
                    paisAtacado.fichas = paisAtacado.fichas - 1
                } else if (dadosAtacante[i] <= dadosAtacado[i]) {
                    paisAtacante.fichas = paisAtacante.fichas - 1
                }
            }
        }
    };
    i = 0
    botonAtacar.disabled = false;
}

let estadoAtaque = "esperando";

const botonAtacar = document.getElementById("atacar");
const botonDadosAtacante = document.getElementById("tirar1");
const botonDadosAtacado = document.getElementById("tirar2");

botonDadosAtacante.disabled = true;
botonDadosAtacado.disabled = true;

function puedeAtacar() {
    if (!paisAtacante || !paisAtacante.fichas) {
        console.log("No hay país atacante seleccionado.");
        return false;
    }

    if (paisAtacante.fichas <= 1) {
        console.log(`${paisAtacante.nombre} no puede atacar porque solo tiene ${paisAtacante.fichas} ficha(s).`);
        return false;
    }

    console.log(`${paisAtacante.nombre} puede atacar (tiene ${paisAtacante.fichas} fichas).`);
    return true;
}

botonAtacar.addEventListener("click", () => {
    if (paisesSeleccionados.length !== 2) {
        console.log("Debes seleccionar exactamente 2 países para iniciar el ataque.");
        return;
    }

    if (!paisAtacante || !paisAtacante.nombre) {
        console.log("No hay país atacante seleccionado.");
        return;
    }

    if (!paisAtacado || !paisAtacado.nombre) {
        console.log("No hay país atacado seleccionado.");
        return;
    }

    if (paisAtacante.fichas <= 1) {
        console.log(`${paisAtacante.nombre} no puede atacar porque solo tiene ${paisAtacante.fichas} ficha(s).`);
        return;
    }

    botonAtacar.disabled = true;
    estadoAtaque = "dadosAtacante";
    console.log("Ataque iniciado. Turno del atacante.");
    botonDadosAtacante.disabled = false;
    botonDadosAtacado.disabled = true;
});



botonDadosAtacante.addEventListener("click", () => {
    if (estadoAtaque !== "dadosAtacante") {
        console.log("No es el turno del atacante.");
        return;
    }

    ValoresAtacante();

    estadoAtaque = "dadosAtacado";
    botonDadosAtacante.disabled = true;
    botonDadosAtacado.disabled = false;
    console.log("Turno del atacado.");
});

botonDadosAtacado.addEventListener("click", () => {
    if (estadoAtaque !== "dadosAtacado") {
        console.log("Todavía no tiró el atacante.");
        return;
    }

    ValoresAtacado();

    estadoAtaque = "resolviendo";
    ataqueResolucion();
    console.log("Resolviendo combate");

    estadoAtaque = "esperando";
    botonDadosAtacante.disabled = true;
    botonDadosAtacado.disabled = true;
});

//
//REAGRUPACION
//
function gestionarSeleccionReagrupacion(pais) {
    const indice = paisesSeleccionados.indexOf(pais.nombre);
    const estaSeleccionado = indice !== -1;

    if (estaSeleccionado) {
        paisesSeleccionados.splice(indice, 1);
        pais.seleccionado = false;
        console.log(`${pais.nombre} ha sido deseleccionado.`);
    } else {
        if (paisesSeleccionados.length < 2) {
            paisesSeleccionados.push(pais.nombre);
            pais.seleccionado = true;
            console.log(`${pais.nombre} ha sido seleccionado.`);
        } else {
            console.log("Ya tienes 2 países seleccionados. Por favor, deselecciona uno para elegir otro.");
        }
    }
    console.log("Países seleccionados:", paisesSeleccionados);
}

let paisEmisor = null;

let paisReceptor = null;

if (paisesSeleccionados.length === 2) {
    paisEmisor = paisesSeleccionados[0];
    paisReceptor = paisesSeleccionados[1];

    console.log(`País Emisor: ${paisEmisor}`);
    console.log(`País Receptor: ${paisReceptor}`);
} else {
    console.log("Aún no se han seleccionado 2 países.");
}

function moverFichas(paisEmisor, paisReceptor, cantidad) {
    if (paisEmisor === null|| paisReceptor === null || cantidad <= 0 || !Number.isInteger(cantidad)) {
        console.log("Movimiento de fichas inválido.");
        return;
    }

    if (paisEmisor.fichas - cantidad >= 1) {
        paisEmisor.fichas -= cantidad;
        paisReceptor.fichas += cantidad;

        document.getElementById(`fichas-${paisEmisor.nombre.toLowerCase().replace(/\s/g, "")}`).textContent = paisEmisor.fichas;
        document.getElementById(`fichas-${paisReceptor.nombre.toLowerCase().replace(/\s/g, "")}`).textContent = paisReceptor.fichas;

        console.log(`Se han movido ${cantidad} fichas de ${paisEmisor.nombre} a ${paisReceptor.nombre}.`);
    } else {
        console.log(`Error: ${paisEmisor.nombre} debe conservar al menos una ficha.`);
    }
}

const botonMoverFichas = document.getElementById("mover-fichas-btn");
if (botonMoverFichas) {
    botonMoverFichas.addEventListener('click', moverFichas);
}

let paises = {};

// Estados de fase esperados: "fase de ataque" | "fase de reagrupación"
// Asegurate de que `maquinaDeFases.state` contenga ese valor

// Funciones reutilizables para handlers
function crearHandlers(pais) {
  return {
    clickAtaque: () => gestionarSeleccionAtaque(pais),
    clickReagrupacion: () => gestionarSeleccionReagrupacion(pais)
  };
}

const nombresPaises = [
  // América del Sur
  "Argentina", "Brasil", "Chile", "Uruguay", "Perú", "Colombia",

  // América del Norte
  "México", "California", "Canadá", "Groenlandia", "Alaska", "Labrador", "Terranova", "Oregón", "Nueva York", "Yukón",

  // Europa
  "Islandia", "Gran Bretaña", "Francia", "Alemania", "Italia", "España", "Polonia", "Suecia", "Rusia",

  // África
  "Sahara", "Egipto", "Zaire", "Etiopía", "Sudáfrica", "Madagascar",

  // Asia
  "Arabia", "Turquía", "Israel", "Irán", "India", "Siberia", "Mongolia", "China", "Japón", "Kamchatka", "Tartaria", "Taimir", "Gobi", "Malasia", "Aral",

  // Oceanía
  "Australia", "Nueva Zelanda", "Sumatra", "Java"
];

nombresPaises.forEach(nombre => {
  const idHTML = nombre
    .toLowerCase()
    .normalize("NFD")              
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");        

  let pais = {
    nombre,
    mapa: document.getElementById(idHTML),
    fichas: 1,
    seleccionado: false
  };

  let fichasElemento = document.getElementById("fichas-" + idHTML);
  if (fichasElemento) {
    fichasElemento.textContent = pais.fichas;
  }
  
  const handlers = crearHandlers(pais);

  if (pais.mapa) {
    if (maquinaDeFases.state === "fase de ataque") {
      pais.mapa.removeEventListener("click", handlers.clickReagrupacion);
      pais.mapa.addEventListener("click", handlers.clickAtaque);
    } else if (maquinaDeFases.state === "fase de reagrupación") {
      pais.mapa.removeEventListener("click", handlers.clickAtaque);
      pais.mapa.addEventListener("click", handlers.clickReagrupacion);
    }
  }

  paises[nombre] = pais;
});

console.log("Países TEG inicializados correctamente:", paises);

paises["Argentina"].fichas = 10;
document.getElementById("fichas-argentina").textContent = 10;