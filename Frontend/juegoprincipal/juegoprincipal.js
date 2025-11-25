// connect2Server
let cantidadJugadores = localStorage.getItem("cantidadJugadores")
console.log (cantidadJugadores)

let coloresjugadores = JSON.parse(localStorage.getItem("coloresElegidos") || "{}")
console.log(coloresjugadores)
let objetivos = JSON.parse(localStorage.getItem("objetivos") || "{}")
console.log (objetivos)
let atacar = document.getElementById("Atacar")
let reagrupar = document.getElementById("Reagrupar")
let reponer = document.getElementById ("Reponer")
let canjear = document.getElementById ("Canjear")
let menu = document.getElementById ("Menu")
let parar = document.getElementById ("Parar de atacar")
let terminar = document.getElementById ("Terminar turno")
let paisselecionado = document.getElementById("paisselecionado")
let jugador1 = document.getElementById ("")
// timer
let fecha = new Date()
fecha.setSeconds(fecha.getSeconds() + 240) 
let tiempo = 240000
let timerInterval
let pausado = false;
function cambiotimer() {
  if (pausado) return; 

  let tiempoact = new Date();
  let diff = fecha - tiempoact;

  if (diff <= 0) {
    document.getElementById("timer").textContent = "¡Tiempo terminado!";
    clearInterval(timerInterval);
    return;
  }

  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("timer").textContent =
    String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, "0");
}


function iniciartimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(cambiotimer, 1000);
  cambiotimer();
}
iniciartimer();

// -------------------------
// 🔘 PAUSA
// -------------------------
const pauseBtn = document.getElementById("pauseBtn");
const overlay = document.getElementById("pauseOverlay");
const botonReanudar = document.getElementById("boton2");

pauseBtn.addEventListener("click", function () {
  pausado = true
  tiempo = fecha - new Date()
  clearInterval(timerInterval)
  overlay.style.display = "flex"
});

botonReanudar.addEventListener("click", function () {
  pausado = false
  fecha = new Date(new Date().getTime() + tiempo)
  overlay.style.display = "none"
  iniciartimer()
});


if (paused) {
  PostEvent("cantidadJugadores", { cantidadJugadores });
  PostEvent("faseDeEstados", { fase });
  PostEvent("jugador", { jugador });
  PostEvent("jugadores", { jugadores });
}

const botonReglamento = document.getElementById("boton1")
botonReglamento.addEventListener("click", function () {
  window.open("reglamento.html");
});





const infoBtn = document.getElementById("infoBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

infoBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});


//esto es para estandarizar los nombres de cosas
function idFromName(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function getPaisByNameFlexible(nombre) {
  if (paises[nombre]) return paises[nombre];
  const objetivo = idFromName(nombre);
  for (const key of Object.keys(paises)) {
    if (idFromName(key) === objetivo) return paises[key];
  }
  return null;
}


const botonAtacar = document.getElementById("atacar");
const botonDadosAtacante = document.getElementById("tirar1");
const botonDadosAtacado = document.getElementById("tirar2");
const botonMoverFichas = document.getElementById("moverfichas");
const botonPararAtacar = document.getElementById('botonPararAtacar');
const botonTerminarTurno = document.getElementById("terminarTurno");

//Jugadores
class Jugador {
  constructor(id, nombre, color) {
    this.id = id;
    this.nombre = nombre;
    this.color = color;
    this.paises = [];
    this.estaActivo = true;
  }

  agregarPais(pais) {
    this.paises.push(pais);
  }

  quitarPais(pais) {
    this.paises = this.paises.filter(p => p !== pais);
  }

  totalFichas() {
    return this.paises.reduce((suma, nombrePais) => {
      return suma + (paises[nombrePais]?.fichas || 0);
    }, 0);
  }
}
function repartirPaises() {
  let paisesDisponibles = Object.keys(paises);

  for (let i = paisesDisponibles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [paisesDisponibles[i], paisesDisponibles[j]] = [paisesDisponibles[j], paisesDisponibles[i]];
  }

  let indiceJugador = 0;
  while (paisesDisponibles.length > 0) {
    const pais = paisesDisponibles.pop();
    const jugador = jugadores[indiceJugador % jugadores.length];

    jugador.agregarPais(pais);
    paises[pais].duenio = jugador;

    paises[pais].fichas = 1;

    const idHTML = pais.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
    const fichasEl = document.getElementById("fichas-" + idHTML);
    if (fichasEl) fichasEl.textContent = paises[pais].fichas;

    indiceJugador++;
  }

  console.log("Paises repartidos entre los jugadores:");
  jugadores.forEach(j => {
    console.log(`${j.nombre} (${j.color}) tiene:`, j.paises);
  });
}
/*
let cantidadJugadores

do {
  cantidadJugadores = prompt("¿Cuántos jugadores? (mínimo 3, máximo 6)");
  cantidadJugadores = Number(cantidadJugadores);
} while (
  isNaN(cantidadJugadores) || cantidadJugadores < 3 || cantidadJugadores > 6 ||
  !Number.isInteger(cantidadJugadores)
);
*/
console.log(`Se jugará con ${cantidadJugadores} jugadores.`);


const colores = ["rojo", "azul", "verde", "amarillo", "rosa", "negro"];

let jugadores = [];

for (let i = 0; i < cantidadJugadores; i++) {
  const nombre = prompt(`Nombre del jugador ${i + 1}:`) || `Jugador ${i + 1}`;
  jugadores.push(new Jugador(i + 1, nombre, colores[i]));
}

console.log("Jugadores creados:", jugadores);

let turnoActual = 0;

function jugadorActual() {
  return jugadores[turnoActual % cantidadJugadores];
}

function siguienteJugador() {
  turnoActual = (turnoActual + 1) % cantidadJugadores;
  console.log(`Turno del siguiente jugador: ${jugadorActual().nombre}`);
}

function terminarTurno() {
  if (maquinaDeFases.state === 'fase de reagrupacion' || maquinaDeFases.state === 'fase de reposicion') {
    maquinaDeFases.transition('click');
    function siguienteJugador() {
      turnoActual = (turnoActual + 1) % cantidadJugadores;
      paisesBloqueados.clear();
      console.log(`Turno del siguiente jugador: ${jugadorActual().nombre}`);
    }

    actualizarFase();
  } else {
    console.log("Este boton no tiene efecto en la fase actual.");
  }
}
const jugadorActualElemento = document.getElementById("jugadorActual");

function actualizarJugadorActual() {
  const jugador = jugadorActual();
  jugadorActualElemento.textContent = `Turno de: ${jugador.nombre.toUpperCase()} (${jugador.color})`;
}

// Maquina de estados finitos
cantidadJugadores = Math.max(3, Math.min(6, parseInt(cantidadJugadores) || 3));
const faseActual = document.getElementById('faseActual');

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
          console.log('Cambio de fase de ataque a fase de reagrupacion');
          this.state = 'fase de reagrupacion';
          paisesSeleccionados.length = 0;
          actualizarListeners();
        }
        break;

      case 'fase de reagrupacion':
        if (event === 'click' && this.cambioDeFaseTurnos < cantidadJugadores * 2) {
          console.log('Cambio de fase de reagrupacion a fase de ataque');
          this.state = 'fase de ataque';
          this.cambioDeFaseTurnos++;
          paisesSeleccionados.length = 0;
          actualizarListeners();
          siguienteJugador();
          actualizarJugadorActual();
        } else if (event === 'click' && this.cambioDeFaseTurnos >= cantidadJugadores * 2) {
          console.log('Cambio de fase de reagrupacion a fase de reposicion');
          this.state = 'fase de reposicion';
          this.cambioDeFaseTurnos = 0;
          paisesSeleccionados.length = 0;
          actualizarListeners();
          siguienteJugador();
          actualizarJugadorActual();
        }
        break;

      case 'fase de reposicion':
        if (event === 'click' && this.reposicionesHechas < cantidadJugadores) {
          console.log('Repone el siguiente jugador');
          this.state = 'fase de reposicion';
          this.reposicionesHechas++;
          paisesSeleccionados.length = 0;
          actualizarListeners();
          siguienteJugador();
          actualizarJugadorActual();
        } else if (event === 'click' && this.reposicionesHechas >= cantidadJugadores) {
          console.log('Cambio de fase de reposicion a fase de ataque');
          this.state = 'fase de ataque';
          this.reposicionesHechas = 0;
          paisesSeleccionados.length = 0;
          actualizarListeners();
          siguienteJugador();
          actualizarJugadorActual();
        }
        break;

      default:
        console.log(`No se puede manejar el evento "${event}" en el estado "${this.state}".`);
    }

    if (this.state !== estadoAnterior) {
      this.cambioDeFaseTurnos++;
      console.log(`Fase cambiada: ${estadoAnterior} → ${this.state}`);
    }
    return this.state;
  }
}

const maquinaDeFases = new fasesMachine(cantidadJugadores);

function actualizarFase() {
  faseActual.textContent = `Fase actual: ${maquinaDeFases.state.toUpperCase()}`;
  actualizarListeners();
}

function actualizarListeners() {
  Object.values(paises).forEach(pais => {
    if (!pais.mapa) return;
    const { clickAtaque, clickReagrupacion } = pais.handlers;

    pais.mapa.removeEventListener("click", clickAtaque);
    pais.mapa.removeEventListener("click", clickReagrupacion);

    if (maquinaDeFases.state === "fase de ataque") {
      pais.mapa.addEventListener("click", clickAtaque);
    } else if (maquinaDeFases.state === "fase de reagrupacion") {
      pais.mapa.addEventListener("click", clickReagrupacion);
    } else {
    }
  });

  if (typeof botonMoverFichas !== "undefined" && botonMoverFichas) {
    botonMoverFichas.disabled = maquinaDeFases.state !== "fase de reagrupacion";
  }

  if (typeof botonAtacar !== "undefined" && botonAtacar) {
    botonAtacar.disabled = maquinaDeFases.state !== "fase de ataque";
  }
  if (typeof botonDadosAtacante !== "undefined" && botonDadosAtacante) {
    botonDadosAtacante.disabled = true;
  }
  if (typeof botonDadosAtacado !== "undefined" && botonDadosAtacado) {
    botonDadosAtacado.disabled = true;
  }
}


function pararAtaque() {
  if (maquinaDeFases.state === 'fase de ataque') {
    maquinaDeFases.transition('click');
    actualizarFase();
  } else {
    console.log("Este boton no tiene efecto en la fase actual.");
  }
}
if (botonPararAtacar) botonPararAtacar.addEventListener('click', pararAtaque);

function terminarTurno() {
  if (maquinaDeFases.state === 'fase de reagrupacion' || maquinaDeFases.state === 'fase de reposicion') {
    maquinaDeFases.transition('click');
    actualizarFase();
  } else {
    console.log("Este boton no tiene efecto en la fase actual.");
  }
}
if (botonTerminarTurno) botonTerminarTurno.addEventListener('click', terminarTurno);

//
//paises
//
let paises = {};

function crearHandlers(pais) {
  return {
    clickAtaque: () => gestionarSeleccionAtaque(pais),
    clickReagrupacion: () => gestionarSeleccionReagrupacion(pais)
  };
}

const nombresPaises = [
  // America del Sur
  "Argentina", "Brasil", "Chile", "Uruguay", "Peru", "Colombia",
  // America del Norte
  "Mexico", "California", "Canada", "Groenlandia", "Alaska", "Labrador", "Terranova", "Oregon", "Nueva York", "Yukon",
  // Europa
  "Islandia", "GranBretana", "Francia", "Alemania", "Italia", "Espana", "Polonia", "Suecia", "Rusia",
  // Africa
  "Sahara", "Egipto", "Zaire", "Etiopia", "Sudafrica", "Madagascar",
  // Asia
  "Arabia", "Turquia", "Israel", "Iran", "India", "Siberia", "Mongolia", "China", "Japon", "Kamchatka", "Tartaria", "Taimir", "Gobi", "Malasia", "Aral",
  // Oceania
  "Australia", "NuevaZelanda", "Sumatra", "Java"
];

const fronteras = {
  //America del sur
  Argentina: ["Chile", "Uruguay", "Brasil", "Peru"],
  Chile: ["Argentina", "Peru", "Australia"],
  Uruguay: ["Argentina", "Brasil"],
  Brasil: ["Uruguay", "Argentina", "Peru", "Colombia", "Sahara"],
  Peru: ["Chile", "Brasil", "Colombia", "Argentina"],
  Colombia: ["Brasil", "Peru", "Mexico"],
  //America del Norte
  Mexico: ["Colombia", "California"],
  California: ["Mexico", "NuevaYork", "Oregon"],
  Oregon: ["California", "NuevaYork", "Canada", "Yukon", "Alaska"],
  NuevaYork: ["California", "Oregon", "Canada", "Terranova", "Groenlandia"],
  Alaska: ["Kamchatka", "Oregon", "Yukon"],
  Yukon: ["Alaska", "Oregon", "Canada"],
  Canada: ["Yukon", "Oregon", "Nueva York", "Terranova"],
  Terranova: ["NuevaYork", "Canada", "Labrador"],
  Labrador: ["Terranova", "Groenlandia"],
  Groenlandia: ["NuevaYork", "Labrador", "Islandia"],
  //Europa
  Islandia: ["Groenlandia", "GranBretana", "Suecia"],
  GranBretana: ["Islandia", "Espana", "Alemania", "Suecia"],
  Espana: ["GranBretana", "Francia", "Sahara"],
  Francia: ["Espana", "Alemania", "Italia"],
  Italia: ["Francia", "Alemania"],
  Alemania: ["GranBretana", "Francia", "Italia", "Polonia"],
  Suecia: ["Islandia", "Rusia"],
  Polonia: ["Alemania", "Egipto", "Rusia", "Turquia"],
  Rusia: ["Suecia", "Polonia", "Turquia", "Iran", "Aral"],
  //Africa
  Sahara: ["Brasil", "Espana", "Zaire", "Etiopia", "Egipto"],
  Zaire: ["Sahara", "Etiopia", "Sudafrica", "Madagascar"],
  Egipto: ["Sahara", "Etiopia", "Polonia", "Turquia", "Israel", "Madagascar"],
  Etiopia: ["Sahara", "Egipto", "Zaire", "Sudafrica"],
  Sudafrica: ["Zaire", "Etiopia"],
  Madagascar: ["Zaire", "Egipto"],
  //Asia
  Turquia: ["Polonia", "Egipto", "Israel", "Rusia", "Iran", "Arabia"],
  Israel: ["Turquia", "Egipto", "Arabia"],
  Aral: ["Rusia", "Iran", "Tartaria", "Siberia", "Mongolia"],
  Iran: ["Rusia", "Turquia", "Aral", "Mongolia", "Gobi", "China"],
  Arabia: ["Israel", "Turquia"],
  India: ["Iran", "China", "Sumatra", "Malasia",],
  Malasia: ["India", "China", "Borneo"],
  Gobi: ["Iran", "China", "Mongolia"],
  Mongolia: ["Aral", "Iran", "Siberia", "Gobi", "China"],
  Tartaria: ["Taimir", "Aral", "Siberia"],
  Siberia: ["Aral", "Tartraria", "Mongolia", "Taimir", "China", "Kamchatka"],
  Kamchatka: ["Siberia", "China", "Japon"],
  China: ["Siberia", "Mongolia", "Gobi", "Iran", "Kamchatka", "India", "Malasia", "Japon"],
  Japon: ["China", "Kamchatka"],
  //oceania 
  Sumatra: ["India", "Australia"],
  Australia: ["Sumatra", "Borneo", "Java", "Chile"],
  Borneo: ["Malasia", "Australia"],
  Java: ["Australia"]
};

nombresPaises.forEach(nombre => {
  const idHTML = idFromName(nombre);
  const pais = {
    nombre,
    mapa: document.getElementById(idHTML),
    fichas: 1,
    fichasRecibidas: 0,
    seleccionado: false,
    paisesLimitrofes: fronteras[nombre] || []
  };
  pais.handlers = crearHandlers(pais);

  const fichasElemento = document.getElementById("fichas-" + idHTML);
  if (fichasElemento) {
    fichasElemento.textContent = pais.fichas;
  }

  paises[nombre] = pais;
});

console.log("Paises TEG inicializados correctamente:", paises);

repartirPaises();

// Le doy ficahas de mas a argentina  y chile para hacer pruebas
if (paises["Argentina"]) {
  paises["Argentina"].fichas = 10;
  const el = document.getElementById("fichas-argentina");
  if (el) el.textContent = 10;
}
if (paises["Chile"]) {
  paises["Chile"].fichas = 10;
  const el = document.getElementById("fichas-chile");
  if (el) el.textContent = 10;
}
// 
// ataque
// 
let paisesSeleccionados = [];

let paisAtacante = { nombre: null, fichas: null };
let paisAtacado = { nombre: null, fichas: null };


let dadosAtacante = [];
let dadosAtacado = [];

function gestionarSeleccionAtaque(pais) {
  if (maquinaDeFases.state !== "fase de ataque") {
    console.log("No podes seleccionar para atacar en esta fase.");
    return;
  }

  const jugador = jugadorActual();
  const indice = paisesSeleccionados.indexOf(pais.nombre);
  const estaSeleccionado = indice !== -1;

  if (estaSeleccionado) {
    paisesSeleccionados.splice(indice, 1);
    pais.seleccionado = false;
    console.log(`${pais.nombre} ha sido deseleccionado.`, paisesSeleccionados);

    if (paisAtacante.nombre === pais.nombre) paisAtacante = { nombre: null, fichas: null };
    if (paisAtacado.nombre === pais.nombre) paisAtacado = { nombre: null, fichas: null };
    return;
  }

  if (paisesSeleccionados.length === 0) {
    if (pais.duenio !== jugador) {
      console.log("Solo podes seleccionar como atacante un país que te pertenezca.");
      return;
    }
    if (pais.fichas <= 1) {
      console.log(`${pais.nombre} no puede atacar (solo tiene ${pais.fichas} ficha(s)).`);
      return;
    }

    paisesSeleccionados.push(pais.nombre);
    pais.seleccionado = true;
    paisAtacante = { nombre: pais.nombre, fichas: pais.fichas };
    console.log(`${pais.nombre} seleccionado como atacante.`);

  } else if (paisesSeleccionados.length === 1) {
    const nombreAtacante = paisesSeleccionados[0];
    const paisAt = paises[nombreAtacante];

    if (pais.duenio && pais.duenio.id === jugador.id) {
      console.log("No podes atacar a un país aliado.");
      return;
    }

    if (!paisAt.paisesLimitrofes.includes(pais.nombre)) {
      console.log(`${pais.nombre} no es limitrofe de ${paisAt.nombre}. No se puede atacar.`);
      return;
    }

    paisesSeleccionados.push(pais.nombre);
    pais.seleccionado = true;
    paisAtacado = { nombre: pais.nombre, fichas: pais.fichas };
    console.log(`${pais.nombre} seleccionado como atacado.`);
  } else {
    console.log("Ya tienes 2 paises seleccionados. Deselecciona uno para elegir otro.");
  }

  console.log("Paises seleccionados:", paisesSeleccionados);
  console.log("Atacante:", paisAtacante);
  console.log("Atacado:", paisAtacado);
}

console.log("Paises seleccionados:", paisesSeleccionados);
console.log("Atacante:", paisAtacante);
console.log("Atacado:", paisAtacado);

function tirarDados(cantidad) {
  const resultados = [];
  for (let i = 0; i < cantidad; i++) {
    resultados.push(Math.ceil(Math.random() * 6));
  }
  return resultados.sort((a, b) => b - a);
}

function ValoresAtacante() {
  const cantidad = Math.max(0, Math.min(3, paisAtacante.fichas - 1));
  dadosAtacante = tirarDados(cantidad);
  console.log("Dados del atacante:", dadosAtacante);
  return dadosAtacante;
}

function ValoresAtacado() {
  const cantidad = Math.max(0, Math.min(3, paisAtacado.fichas));
  dadosAtacado = tirarDados(cantidad);
  console.log("Dados del atacado:", dadosAtacado);
  return dadosAtacado;
}

function ataqueResolucion() {
  let i = 0;
  console.log("Resolviendo combate...");
  console.log("Dados Atacante:", dadosAtacante, "Dados Atacado:", dadosAtacado);

  const atacanteObj = getPaisByNameFlexible(paisAtacante.nombre);
  const atacadoObj = getPaisByNameFlexible(paisAtacado.nombre);

  while (dadosAtacante.length > i && dadosAtacado.length > i) {
    if (dadosAtacante[i] > dadosAtacado[i]) {
      atacadoObj.fichas--;
      console.log(`El atacado pierde 1 ficha. (${atacadoObj.nombre}: ${atacadoObj.fichas})`);
    } else {
      atacanteObj.fichas--;
      console.log(`El atacante pierde 1 ficha. (${atacanteObj.nombre}: ${atacanteObj.fichas})`);
    }
    i++;
  }

  try {
    const idAt = idFromName(atacanteObj.nombre);
    const idDef = idFromName(atacadoObj.nombre);
    const elAt = document.getElementById(`fichas-${idAt}`);
    const elDef = document.getElementById(`fichas-${idDef}`);
    if (elAt) elAt.textContent = atacanteObj.fichas;
    if (elDef) elDef.textContent = atacadoObj.fichas;
  } catch (e) {
    console.error(e);
  }

  if (atacadoObj.fichas <= 0) {
    console.log(`${atacanteObj.nombre} conquistó ${atacadoObj.nombre}!`);

    const nuevoDuenio = atacanteObj.duenio;
    atacadoObj.duenio = nuevoDuenio;

    nuevoDuenio.agregarPais(atacadoObj.nombre);

    const atacado = jugadores.find(j => j.paises.includes(atacadoObj.nombre) && j !== nuevoDuenio);
    if (atacado) atacado.quitarPais(atacadoObj.nombre);

    const maxMovibles = atacanteObj.fichas - 1;
    let mover = parseInt(prompt(`Conquistaste ${atacadoObj.nombre}! ¿Cuántas fichas querés mover desde ${atacanteObj.nombre}? (1-${maxMovibles})`), 10);

    if (isNaN(mover) || mover < 1 || mover > maxMovibles) mover = 1; 

    atacanteObj.fichas -= mover;
    atacadoObj.fichas = mover;

    const elAt = document.getElementById(`fichas-${idFromName(atacanteObj.nombre)}`);
    const elDef = document.getElementById(`fichas-${idFromName(atacadoObj.nombre)}`);
    if (elAt) elAt.textContent = atacanteObj.fichas;
    if (elDef) elDef.textContent = atacadoObj.fichas;

    console.log(`${nuevoDuenio.nombre} ahora posee ${atacadoObj.nombre} con ${mover} fichas.`);
  }

  if (botonDadosAtacante) botonDadosAtacante.disabled = true;
  if (botonDadosAtacado) botonDadosAtacado.disabled = true;
  if (botonAtacar) botonAtacar.disabled = false;
  estadoAtaque = "esperando";
}


let estadoAtaque = "esperando";

if (botonDadosAtacante) botonDadosAtacante.disabled = true;
if (botonDadosAtacado) botonDadosAtacado.disabled = true;

function puedeAtacar() {
  if (!paisAtacante || !paisAtacante.fichas) {
    console.log("No hay pais atacante seleccionado.");
    return false;
  }
  if (paisAtacante.fichas <= 1) {
    console.log(`${paisAtacante.nombre} no puede atacar porque solo tiene ${paisAtacante.fichas} ficha(s).`);
    return false;
  }
  console.log(`${paisAtacante.nombre} puede atacar (tiene ${paisAtacante.fichas} fichas).`);
  return true;
}

if (botonAtacar) {
  botonAtacar.addEventListener("click", () => {
    if (paisesSeleccionados.length !== 2) {
      console.log("Debes seleccionar exactamente 2 paises para iniciar el ataque.");
      return;
    }

    const atacanteNombre = paisesSeleccionados[0];
    const atacadoNombre = paisesSeleccionados[1];
    const pais1 = paises[atacanteNombre];
    const pais2 = paises[atacadoNombre];
    const jugador = jugadorActual();

    if (!pais1 || !pais2) {
      console.log("Error interno: país no encontrado.");
      return;
    }
    if (pais1.duenio !== jugador) {
      console.log("El país atacante no es tuyo.");
      return;
    }
    if (pais2.duenio && pais2.duenio.id === jugador.id) {
      console.log("No podes atacar a un país aliado.");
      return;
    }
    if (!pais1.paisesLimitrofes.includes(pais2.nombre)) {
      console.log(`${pais2.nombre} no es limitrofe con ${pais1.nombre}. No se puede atacar.`);
      return;
    }
    if (pais1.fichas <= 1) {
      console.log(`${pais1.nombre} no puede atacar (solo tiene ${pais1.fichas} ficha(s)).`);
      return;
    }

    paisAtacante = { nombre: pais1.nombre, fichas: pais1.fichas };
    paisAtacado = { nombre: pais2.nombre, fichas: pais2.fichas };

    botonAtacar.disabled = true;
    estadoAtaque = "dadosAtacante";
    console.log("Ataque iniciado. Turno del atacante.");
    if (botonDadosAtacante) botonDadosAtacante.disabled = false;
    if (botonDadosAtacado) botonDadosAtacado.disabled = true;
  });
}


if (botonDadosAtacante) {
  botonDadosAtacante.addEventListener("click", () => {
    if (estadoAtaque !== "dadosAtacante") {
      console.log("No es el turno del atacante.");
      return;
    }
    ValoresAtacante();
    estadoAtaque = "dadosAtacado";
    if (botonDadosAtacante) botonDadosAtacante.disabled = true;
    if (botonDadosAtacado) botonDadosAtacado.disabled = false;
    console.log("Turno del atacado.");
  });
}

if (botonDadosAtacado) {
  botonDadosAtacado.addEventListener("click", () => {
    if (estadoAtaque !== "dadosAtacado") {
      console.log("Todavia no tiro el atacante.");
      return;
    }
    if (botonDadosAtacado) botonDadosAtacado.disabled = true;
    if (botonDadosAtacante) botonDadosAtacante.disabled = true;

    ValoresAtacado();

    estadoAtaque = "resuelto";
    ataqueResolucion();
    console.log("combate resuelto");
  });
}

//
//reagrupacion
//

let paisesBloqueados = new Set();

function gestionarSeleccionReagrupacion(pais) {
  if (maquinaDeFases.state !== "fase de reagrupacion") return;
  const jugador = jugadorActual();

  if (!pais.duenio || pais.duenio.id !== jugador.id) {
    console.log(`${pais.nombre} no te pertenece.`);
    return;
  }

  if (paisesSeleccionados.includes(pais.nombre)) {
    paisesSeleccionados = paisesSeleccionados.filter(p => p !== pais.nombre);
    console.log(`Deseleccionaste ${pais.nombre}. Array:`, paisesSeleccionados);
    return;
  }

  if (paisesSeleccionados.length === 0) {
    paisesSeleccionados.push(pais.nombre);
    console.log("País de origen seleccionado:", paisesSeleccionados);
    return;
  }

  if (paisesSeleccionados.length === 1) {
    const paisEmisor = paises[paisesSeleccionados[0]];

    if (!paisEmisor.paisesLimitrofes.includes(pais.nombre)) {
      console.log(`${pais.nombre} no es limítrofe con ${paisEmisor.nombre}`);
      return;
    }

    if (pais.duenio.id !== jugador.id) {
      console.log(`${pais.nombre} no pertenece al jugador actual.`);
      return;
    }

    paisesSeleccionados.push(pais.nombre);
    console.log("Países seleccionados para reagrupación:", paisesSeleccionados);
    console.log("Datos actuales:", [
      { nombre: paisEmisor.nombre, fichas: paisEmisor.fichas },
      { nombre: pais.nombre, fichas: pais.fichas }
    ]);
    return;
  }

  if (paisesSeleccionados.length === 2) {
    paisesSeleccionados = [pais.nombre];
    console.log("Reiniciaste la selección. Nuevo array:", paisesSeleccionados);
  }
}



if (botonMoverFichas) {
  botonMoverFichas.addEventListener("click", () => {
    if (maquinaDeFases.state !== "fase de reagrupacion") {
      console.log("Solo podes mover fichas en la fase de reagrupación.");
      return;
    }

    if (paisesSeleccionados.length !== 2) {
      console.log("Tenes que seleccionar 2 países aliados y limítrofes primero.");
      return;
    }

    const [nombreOrigen, nombreReceptor] = paisesSeleccionados;
    const paisEmisor = paises[nombreOrigen];
    const paisReceptor = paises[nombreReceptor];

    paisEmisor.fichasRecibidas = paisEmisor.fichasRecibidas || 0;
    paisReceptor.fichasRecibidas = paisReceptor.fichasRecibidas || 0;

    const fichasDisponibles = paisEmisor.fichas - paisEmisor.fichasRecibidas;
    if (fichasDisponibles <= 1) {
      console.log(`${paisEmisor.nombre} no tiene fichas libres para mover (fichas bloqueadas: ${paisEmisor.fichasRecibidas}).`);
      return;
    }

    const cantidad = parseInt(
      prompt(`¿Cuántas fichas queres mover de ${paisEmisor.nombre} a ${paisReceptor.nombre}? (máx ${fichasDisponibles - 1})`),
      10
    );

    if (isNaN(cantidad) || cantidad <= 0 || cantidad >= fichasDisponibles) {
      console.log("Cantidad inválida.");
      return;
    }

    paisEmisor.fichas -= cantidad;
    paisReceptor.fichas += cantidad;

    paisReceptor.fichasRecibidas += cantidad;

    const idOrigen = idFromName(paisEmisor.nombre);
    const idReceptor = idFromName(paisReceptor.nombre);

    const elOrigen = document.getElementById(`fichas-${idOrigen}`);
    const elReceptor = document.getElementById(`fichas-${idReceptor}`);

    if (elOrigen) elOrigen.textContent = paisEmisor.fichas;
    if (elReceptor) elReceptor.textContent = paisReceptor.fichas;

    console.log("Movimiento de fichas realizado:", {
      origen: paisEmisor.nombre,
      receptor: paisReceptor.nombre,
      cantidad,
      bloqueadasEnReceptor: paisReceptor.fichasRecibidas
    });

    console.log("Estado actualizado:", [
      { nombre: paisEmisor.nombre, fichas: paisEmisor.fichas, bloqueadas: paisEmisor.fichasRecibidas },
      { nombre: paisReceptor.nombre, fichas: paisReceptor.fichas, bloqueadas: paisReceptor.fichasRecibidas }
    ]);

    paisesSeleccionados = [];
  });
}

//
//reposicion
//

actualizarFase(); 


/*
Variables que necesita el back (Joaco más te vale hacer algo con esto)
Variable que da el estado de la maquina: maquinaDeFases.state
Variable de cantidad de jugadores: cantidadJugadores
Variable de jugador actual: jugador
Array con todos los jugadores actuales: jugadores   
(Si por ejemplo hace falta que paises tiene el jugador 2, poné jugadores[1].paises)
Objeto con todos los paises: paises 
*/
function mostrarPantallaVictoria() {
  const jugador = localStorage.getItem('jugador');
  const logro = localStorage.getItem('logro');

  const mensaje = `El jugador ${jugador} ha conseguido ${logro}`;
  document.getElementById('victory-message').textContent = mensaje;

  document.getElementById('victory-screen').style.display = 'flex';
}

// Eventos de los botones
document.getElementById('btn-menu').addEventListener('click', () => {
  window.location.href = 'menu.html'; // o la ruta que uses
});

document.getElementById('btn-restart').addEventListener('click', () => {
  location.reload(); // o lógica para reiniciar el juego
});
