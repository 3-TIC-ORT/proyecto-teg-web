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
let cantidadJugadores

do {
  cantidadJugadores = prompt("¿Cuántos jugadores? (mínimo 3, máximo 6)");
  cantidadJugadores = Number(cantidadJugadores);
} while (
  isNaN(cantidadJugadores) || cantidadJugadores < 3 || cantidadJugadores > 6 ||
  !Number.isInteger(cantidadJugadores)
);

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
  // América del Sur
  "Argentina", "Brasil", "Chile", "Uruguay", "Perú", "Colombia",
  // América del Norte
  "México", "California", "Canada", "Groenlandia", "Alaska", "Labrador", "Terranova", "Oregon", "Nueva York", "Yukon",
  // Europa
  "Islandia", "GranBretana", "Francia", "Alemania", "Italia", "Espana", "Polonia", "Suecia", "Rusia",
  // africa
  "Sahara", "Egipto", "Zaire", "Etiopia", "Sudafrica", "Madagascar",
  // Asia
  "Arabia", "Turquia", "Israel", "Iran", "India", "Siberia", "Mongolia", "China", "Japon", "Kamchatka", "Tartaria", "Taimir", "Gobi", "Malasia", "Aral",
  // Oceania
  "Australia", "NuevaZelanda", "Sumatra", "Java"
];

const fronteras = {
  //América del sur
  Argentina: ["Chile", "Uruguay", "Brasil", "Perú"],
  Chile: ["Argentina", "Perú", "Australia"],
  Uruguay: ["Argentina", "Brasil"],
  Brasil: ["Uruguay", "Argentina", "Perú", "Colombia", "Sahara"],
  Peru: ["Chile", "Brasil", "Colombia", "Argentina"],
  Colombia: ["Brasil", "Perú", "México"],
  //América del Norte
  Mexico: ["Colombia", "California"],
  California: ["México", "Nueva York", "Oregon"],
  Oregon: ["California", "Nueva York", "Canada", "Yukon", "Alaska"],
  NuevaYork: ["California", "Oregon", "Canada", "Terranova", "Groenlandia"],
  Alaska: ["Kamchatka", "Oregon", "Yukon"],
  Yukon: ["Alaska", "Oregon", "Canada"],
  Canada: ["Yukon", "Oregon", "Nueva York", "Terranova"],
  Terranova: ["Nueva York", "Canada", "Labrador"],
  Labrador: ["Terranova", "Groenlandia"],
  Groenlandia: ["Nueva York", "Labrador", "Islandia"],
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
  const idHTML = nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  let pais = {
    nombre,
    mapa: document.getElementById(idHTML),
    fichas: 1,
    fichasRecibidas: 0,
    seleccionado: false,
    paisesLimitrofes: fronteras[nombre] || []
  };

  pais.handlers = crearHandlers(pais);

  let fichasElemento = document.getElementById("fichas-" + idHTML);
  if (fichasElemento) {
    fichasElemento.textContent = pais.fichas;
  }

  paises[nombre] = pais;
});


console.log("Paises TEG inicializados correctamente:", paises);

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

  while (dadosAtacante.length > i && dadosAtacado.length > i) {
    if (dadosAtacante[i] > dadosAtacado[i]) {
      paisAtacado.fichas--;
      console.log(`El atacado pierde 1 ficha. (${paisAtacado.nombre}: ${paisAtacado.fichas})`);
    } else {
      paisAtacante.fichas--;
      console.log(`El atacante pierde 1 ficha. (${paisAtacante.nombre}: ${paisAtacante.fichas})`);
    }
    i++;
  }

  try {
    const idAt = paisAtacante.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    const idDef = paisAtacado.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    const elAt = document.getElementById(`fichas-${idAt}`);
    const elDef = document.getElementById(`fichas-${idDef}`);
    if (elAt) elAt.textContent = paisAtacante.fichas;
    if (elDef) elDef.textContent = paisAtacado.fichas;
  } catch (e) {
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
      console.log("Solo podés mover fichas en la fase de reagrupación.");
      return;
    }

    if (paisesSeleccionados.length !== 2) {
      console.log("Tenés que seleccionar 2 países aliados y limítrofes primero.");
      return;
    }

    const [nombreOrigen, nombreDestino] = paisesSeleccionados;
    const paisEmisor = paises[nombreOrigen];
    const paisReceptor = paises[nombreDestino];

    paisEmisor.fichasRecibidas = paisEmisor.fichasRecibidas || 0;
    paisReceptor.fichasRecibidas = paisReceptor.fichasRecibidas || 0;

    const fichasDisponibles = paisEmisor.fichas - paisEmisor.fichasRecibidas;
    if (fichasDisponibles <= 1) {
      console.log(`${paisEmisor.nombre} no tiene fichas libres para mover (fichas bloqueadas: ${paisEmisor.fichasRecibidas}).`);
      return;
    }

    const cantidad = parseInt(
      prompt(`¿Cuántas fichas querés mover de ${paisEmisor.nombre} a ${paisReceptor.nombre}? (máx ${fichasDisponibles - 1})`),
      10
    );

    if (isNaN(cantidad) || cantidad <= 0 || cantidad >= fichasDisponibles) {
      console.log("Cantidad inválida.");
      return;
    }

    paisEmisor.fichas -= cantidad;
    paisReceptor.fichas += cantidad;

    paisReceptor.fichasRecibidas += cantidad;

    const idOrigen = paisEmisor.nombre.toLowerCase().replace(/\s+/g, "-");
    const idDestino = paisReceptor.nombre.toLowerCase().replace(/\s+/g, "-");
    document.getElementById(`fichas-${idOrigen}`).textContent = paisEmisor.fichas;
    document.getElementById(`fichas-${idDestino}`).textContent = paisReceptor.fichas;

    console.log("Movimiento de fichas realizado:", {
      origen: paisEmisor.nombre,
      destino: paisReceptor.nombre,
      cantidad,
      bloqueadasEnDestino: paisReceptor.fichasRecibidas
    });

    console.log("Estado actualizado:", [
      { nombre: paisEmisor.nombre, fichas: paisEmisor.fichas, bloqueadas: paisEmisor.fichasRecibidas },
      { nombre: paisReceptor.nombre, fichas: paisReceptor.fichas, bloqueadas: paisReceptor.fichasRecibidas }
    ]);

    paisesSeleccionados = [];
  });
}


actualizarFase(); 
siguienteJugador