// Maquina de estados finitos
let cantidadJugadores = prompt("¿Cuántos jugadores?");
cantidadJugadores = Math.max(3, Math.min(6, parseInt(cantidadJugadores) || 3));
const faseActual = document.getElementById('faseActual');
const botonPararAtacar = document.getElementById('botonPararAtacar');
const botonTerminarTurno = document.getElementById("terminarTurno");

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
          paisesSeleccionados.length = 0;
          actualizarListeners();
        }
        break;

      case 'fase de reagrupación':
        if (event === 'click' && this.cambioDeFaseTurnos < cantidadJugadores * 2) {
          console.log('Cambio de fase de reagrupacion a fase de ataque');
          this.state = 'fase de ataque';
          this.cambioDeFaseTurnos++;
          paisesSeleccionados.length = 0;
          actualizarListeners();
        } else if (event === 'click' && this.cambioDeFaseTurnos >= cantidadJugadores * 2) {
          console.log('Cambio de fase de reagrupación a fase de reposición');
          this.state = 'fase de reposición';
          this.cambioDeFaseTurnos = 0;
          paisesSeleccionados.length = 0;
          actualizarListeners();
        }
        break;

      case 'fase de reposición':
        if (event === 'click' && this.reposicionesHechas < cantidadJugadores) {
          console.log('Repone el siguiente jugador');
          this.state = 'fase de reposición';
          this.reposicionesHechas++;
          paisesSeleccionados.length = 0;
          actualizarListeners();
        } else if (event === 'click' && this.reposicionesHechas >= cantidadJugadores) {
          console.log('Cambio de fase de reposición a fase de ataque');
          this.state = 'fase de ataque';
          this.reposicionesHechas = 0;
          paisesSeleccionados.length = 0;
          actualizarListeners();
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

    // Quitamos ambos antes para evitar duplicados
    pais.mapa.removeEventListener("click", clickAtaque);
    pais.mapa.removeEventListener("click", clickReagrupacion);

    if (maquinaDeFases.state === "fase de ataque") {
      pais.mapa.addEventListener("click", clickAtaque);
    } else if (maquinaDeFases.state === "fase de reagrupación") {
      pais.mapa.addEventListener("click", clickReagrupacion);
    }
  });
}

function pararAtaque() {
  if (maquinaDeFases.state === 'fase de ataque') {
    maquinaDeFases.transition('click');
    actualizarFase();
  } else {
    console.log("Este botón no tiene efecto en la fase actual.");
  }
}
if (botonPararAtacar) botonPararAtacar.addEventListener('click', pararAtaque);

function terminarTurno() {
  if (maquinaDeFases.state === 'fase de reagrupación' || maquinaDeFases.state === 'fase de reposición') {
    maquinaDeFases.transition('click');
    actualizarFase();
  } else {
    console.log("Este botón no tiene efecto en la fase actual.");
  }
}
if (botonTerminarTurno) botonTerminarTurno.addEventListener('click', terminarTurno);

// 
// ataque
// 
let paisesSeleccionados = [];

let paisAtacante = { nombre: null, fichas: null };
let paisAtacado = { nombre: null, fichas: null };


let dadosAtacante = [];
let dadosAtacado = [];

function gestionarSeleccionAtaque(pais) {
  const indice = paisesSeleccionados.indexOf(pais.nombre);
  const estaSeleccionado = indice !== -1;

  if (estaSeleccionado) {
    paisesSeleccionados.splice(indice, 1);
    pais.seleccionado = false;
    console.log(`${pais.nombre} ha sido deseleccionado.`);

    if (paisAtacante.nombre === pais.nombre) paisAtacante = { nombre: null, fichas: null };
    if (paisAtacado.nombre === pais.nombre) paisAtacado = { nombre: null, fichas: null };

  } else {
    if (paisesSeleccionados.length < 2) {
      paisesSeleccionados.push(pais.nombre);
      pais.seleccionado = true;
      console.log(`${pais.nombre} ha sido seleccionado.`);

      if (!paisAtacante.nombre) {
        paisAtacante = { nombre: pais.nombre, fichas: pais.fichas };
      } else if (!paisAtacado.nombre) {
        paisAtacado = { nombre: pais.nombre, fichas: pais.fichas };
      }
    } else {
      console.log("Ya tienes 2 países seleccionados. Por favor, deselecciona uno para elegir otro.");
    }
  }

  console.log("Países seleccionados:", paisesSeleccionados);
  console.log("Atacante:", paisAtacante);
  console.log("Atacado:", paisAtacado);
}

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
      console.log(`El defensor pierde 1 ficha. (${paisAtacado.nombre}: ${paisAtacado.fichas})`);
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

  botonAtacar.disabled = false;
  estadoAtaque = "esperando";
}

// Estado y botones
let estadoAtaque = "esperando";

const botonAtacar = document.getElementById("atacar");
const botonDadosAtacante = document.getElementById("tirar1");
const botonDadosAtacado = document.getElementById("tirar2");

if (botonDadosAtacante) botonDadosAtacante.disabled = true;
if (botonDadosAtacado) botonDadosAtacado.disabled = true;

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

if (botonAtacar) {
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
      console.log("Todavía no tiró el atacante.");
      return;
    }
    ValoresAtacado(); 
    estadoAtaque = "resolviendo";
    ataqueResolucion();
    console.log("Resolviendo combate");
  });
}
//
//reagrupacion
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

function moverFichas() {
  if (paisesSeleccionados.length !== 2) {
    console.log("Debes seleccionar dos países para mover fichas.");
    return;
  }

  let paisEmisor = paises[paisesSeleccionados[0]];
  let paisReceptor = paises[paisesSeleccionados[1]];
  let cantidad = parseInt(prompt("¿Cuántas fichas querés mover?"), 10);

  if (isNaN(cantidad) || cantidad <= 0) {
    console.log("Movimiento inválido.");
    return;
  }
  if (paisEmisor.fichas - cantidad < 1) {
    console.log(`Error: ${paisEmisor.nombre} debe conservar al menos una ficha.`);
    return;
  }

  paisEmisor.fichas -= cantidad;
  paisReceptor.fichas += cantidad;

  const idEm = paisEmisor.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
  const idRe = paisReceptor.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

  const elEm = document.getElementById(`fichas-${idEm}`);
  const elRe = document.getElementById(`fichas-${idRe}`);
  if (elEm) elEm.textContent = paisEmisor.fichas;
  if (elRe) elRe.textContent = paisReceptor.fichas;

  console.log(`Se movieron ${cantidad} fichas de ${paisEmisor.nombre} a ${paisReceptor.nombre}.`);
}

const botonMoverFichas = document.getElementById("mover-fichas-btn");
if (botonMoverFichas) botonMoverFichas.addEventListener('click', moverFichas);
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

  pais.handlers = crearHandlers(pais);

  let fichasElemento = document.getElementById("fichas-" + idHTML);
  if (fichasElemento) {
    fichasElemento.textContent = pais.fichas;
  }

  paises[nombre] = pais;
});

console.log("Países TEG inicializados correctamente:", paises);

if (paises["Argentina"]) {
  paises["Argentina"].fichas = 10;
  const el = document.getElementById("fichas-argentina");
  if (el) el.textContent = 10;
}

actualizarFase();
