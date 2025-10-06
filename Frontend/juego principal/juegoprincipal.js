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
const targetDate = new Date();
targetDate.setSeconds(targetDate.getSeconds() + 120); 

function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("timer").textContent = "¡Tiempo terminado!";
    clearInterval(timerInterval);
    return;
  }
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("timer").textContent =
    String(minutes).padStart(2, '0') + ":" +
    String(seconds).padStart(2, '0');

}
const timerInterval = setInterval(updateTimer, 1000);
//termine el  timer
const resultado1 = tirarDado(); 
let tirar1 = document.getElementById("tirar1") 
tirar1.addEventListener("click", tirarDado) 
function tirarDado() {
  let numeroAleatorio = Math.round((Math.random() * 5) + 1)*3;
  console.log (numeroAleatorio) 
}
let tirar2 = document.getElementById("tirar2") 
tirar2.addEventListener("click", tirarDado) 
//esta es la función de tirar dados y también hice que se ejecute cuando apretamos los botones de tirar. 
//cantidad de jugadores
let botoncantidadjugadores = document.getElementById ("botoncantdadjugadores")
let numerodejugadores =document.getElementById ("numerodejugadores")
let numero = []
function nombre (){
  numero.push (numerodejugadores.value)
  console.log (numero)
}

let objetivos =document.getElementById ("objetivos")

// La Maquina de Estados Finitos
let cantidadJugadores = prompt("¿Cuántos jugadores?");
cantidadJugadores = Math.max(3, Math.min(6, parseInt(cantidadJugadores) || 3))
const faseActual = document.getElementById('faseActual');
const botonPararAtacar = document.getElementById('botonPararAtacar');
const botonTerminarTurno = document.getElementById("terminarTurno")
class fasesMachine {
        constructor() {
            this.state = 'fase de ataque';
            this.cambioDeFaseTurnos = 0;
            this.reposicionesHechas = 1;
        }
    
        transition(event) {
            const estadoAnterior = this.state;
            switch (this.state) {
                case 'fase de ataque':
                    if (event === 'click') {
                        console.log('Cambio de fase de ataque a fase de reagrupación');
                        this.state = 'fase de reagrupación';
                    }
                    break;
                case 'fase de reagrupación':
                    if (event === 'click' && this.cambioDeFaseTurnos < cantidadJugadores * 2) {
                        console.log('Cambio de fase de reagrupacion a fase de ataque');
                        this.state = 'fase de ataque';
                        this.cambioDeFaseTurnos++
                    }
                    else if (event === 'click' && this.cambioDeFaseTurnos >= cantidadJugadores * 2) {
                        console.log('Cambio de fase de reagrupación a fase de reposición');
                        this.state = 'fase de reposición';
                        this.cambioDeFaseTurnos = 0;
                    }
                    break;
                case 'fase de reposición':
                    if (event === 'click' && this.reposicionesHechas < cantidadJugadores) {
                        console.log('Repone el siguiente jugador');
                        this.state = 'fase de reposición';
                        this.reposicionesHechas++
                    }
                    else  if (event === 'click' && this.reposicionesHechas >= cantidadJugadores) {
                        console.log('Cambio de fase de reposición a fase de ataque');
                        this.state = 'fase de ataque';
                        this.reposicionesHechas = 1;
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

let paisesSeleccionados = [];
function gestionarSeleccion(pais) {
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

function moverFichas(paisOrigen, paisDestino, cantidad) {
  if (!paisOrigen || !paisDestino || cantidad <= 0 || !Number.isInteger(cantidad)) {
    console.log("Movimiento de fichas inválido.");
    return;
  }

  if (paisOrigen.fichas - cantidad >= 1) {
    paisOrigen.fichas -= cantidad;
    paisDestino.fichas += cantidad;

    document.getElementById(`fichas-${paisOrigen.nombre.toLowerCase().replace(/\s/g, "")}`).textContent = paisOrigen.fichas;
    document.getElementById(`fichas-${paisDestino.nombre.toLowerCase().replace(/\s/g, "")}`).textContent = paisDestino.fichas;

    console.log(`Se han movido ${cantidad} fichas de ${paisOrigen.nombre} a ${paisDestino.nombre}.`);
  } else {
    console.log(`Error: ${paisOrigen.nombre} debe conservar al menos una ficha.`);
  }
}

const botonMoverFichas = document.getElementById("mover-fichas-btn");
if (botonMoverFichas) {
  botonMoverFichas.addEventListener('click', moverFichas);
}

// América del Sur
let argentina = {
  nombre: "Argentina",
  mapa: document.getElementById("argentina"),
  fichas: 1,
  seleccionado: false
};
let fichasArgentinaElemento = document.getElementById("fichas-argentina");
if (fichasArgentinaElemento) {
  fichasArgentinaElemento.textContent = argentina.fichas;
}
if (argentina.mapa) {
  argentina.mapa.addEventListener('click', function() {
    gestionarSeleccion(argentina);
  });
}

let chile = {
  nombre: "Chile",
  mapa: document.getElementById("chile"),
  fichas: 1,
  seleccionado: false
};
let fichasChileElemento = document.getElementById("fichas-chile");
if (fichasChileElemento) {
  fichasChileElemento.textContent = chile.fichas;
}
if (chile.mapa) {
  chile.mapa.addEventListener('click', function() {
    gestionarSeleccion(chile);
  });
}

let uruguay = {
  nombre: "Uruguay",
  mapa: document.getElementById("uruguay"),
  fichas: 1,
  seleccionado: false
};
let fichasUruguayElemento = document.getElementById("fichas-uruguay");
if (fichasUruguayElemento) {
  fichasUruguayElemento.textContent = uruguay.fichas;
}
if (uruguay.mapa) {
  uruguay.mapa.addEventListener('click', function() {
    gestionarSeleccion(uruguay);
  });
}

let brasil = {
  nombre: "Brasil",
  mapa: document.getElementById("brasil"),
  fichas: 1,
  seleccionado: false
};
let fichasBrasilElemento = document.getElementById("fichas-brasil");
if (fichasBrasilElemento) {
  fichasBrasilElemento.textContent = brasil.fichas;
}
if (brasil.mapa) {
  brasil.mapa.addEventListener('click', function() {
    gestionarSeleccion(brasil);
  });
}

let peru = {
  nombre: "Perú",
  mapa: document.getElementById("peru"),
  fichas: 1,
  seleccionado: false
};
let fichasPeruElemento = document.getElementById("fichas-peru");
if (fichasPeruElemento) {
  fichasPeruElemento.textContent = peru.fichas;
}
if (peru.mapa) {
  peru.mapa.addEventListener('click', function() {
    gestionarSeleccion(peru);
  });
}

let colombia = {
  nombre: "Colombia",
  mapa: document.getElementById("colombia"),
  fichas: 1,
  seleccionado: false
};
let fichasColombiaElemento = document.getElementById("fichas-colombia");
if (fichasColombiaElemento) {
  fichasColombiaElemento.textContent = colombia.fichas;
}
if (colombia.mapa) {
  colombia.mapa.addEventListener('click', function() {
    gestionarSeleccion(colombia);
  });
}

// Europa
let islandia = {
  nombre: "Islandia",
  mapa: document.getElementById("islandia"),
  fichas: 1,
  seleccionado: false
};
let fichasIslandiaElemento = document.getElementById("fichas-islandia");
if (fichasIslandiaElemento) {
  fichasIslandiaElemento.textContent = islandia.fichas;
}
if (islandia.mapa) {
  islandia.mapa.addEventListener('click', function() {
    gestionarSeleccion(islandia);
  });
}

let bretana = {
  nombre: "Bretaña",
  mapa: document.getElementById("inglaterra"),
  fichas: 1,
  seleccionado: false
};
let fichasBretanaElemento = document.getElementById("fichas-bretana");
if (fichasBretanaElemento) {
  fichasBretanaElemento.textContent = bretana.fichas;
}
if (bretana.mapa) {
  bretana.mapa.addEventListener('click', function() {
    gestionarSeleccion(bretana);
  });
}

let espana = {
  nombre: "España",
  mapa: document.getElementById("espana"),
  fichas: 1,
  seleccionado: false
};
let fichasEspanaElemento = document.getElementById("fichas-espana");
if (fichasEspanaElemento) {
  fichasEspanaElemento.textContent = espana.fichas;
}
if (espana.mapa) {
  espana.mapa.addEventListener('click', function() {
    gestionarSeleccion(espana);
  });
}

let francia = {
  nombre: "Francia",
  mapa: document.getElementById("francia"),
  fichas: 1,
  seleccionado: false
};
let fichasFranciaElemento = document.getElementById("fichas-francia");
if (fichasFranciaElemento) {
  fichasFranciaElemento.textContent = francia.fichas;
}
if (francia.mapa) {
  francia.mapa.addEventListener('click', function() {
    gestionarSeleccion(francia);
  });
}

let alemania = {
  nombre: "Alemania",
  mapa: document.getElementById("alemania"),
  fichas: 1,
  seleccionado: false
};
let fichasAlemaniaElemento = document.getElementById("fichas-alemania");
if (fichasAlemaniaElemento) {
  fichasAlemaniaElemento.textContent = alemania.fichas;
}
if (alemania.mapa) {
  alemania.mapa.addEventListener('click', function() {
    gestionarSeleccion(alemania);
  });
}

let italia = {
  nombre: "Italia",
  mapa: document.getElementById("italia"),
  fichas: 1,
  seleccionado: false
};
let fichasItaliaElemento = document.getElementById("fichas-italia");
if (fichasItaliaElemento) {
  fichasItaliaElemento.textContent = italia.fichas;
}
if (italia.mapa) {
  italia.mapa.addEventListener('click', function() {
    gestionarSeleccion(italia);
  });
}

let polonia = {
  nombre: "Polonia",
  mapa: document.getElementById("polonia"),
  fichas: 1,
  seleccionado: false
};
let fichasPoloniaElemento = document.getElementById("fichas-polonia");
if (fichasPoloniaElemento) {
  fichasPoloniaElemento.textContent = polonia.fichas;
}
if (polonia.mapa) {
  polonia.mapa.addEventListener('click', function() {
    gestionarSeleccion(polonia);
  });
}

let rusia = {
  nombre: "Rusia",
  mapa: document.getElementById("rusia"),
  fichas: 1,
  seleccionado: false
};
let fichasRusiaElemento = document.getElementById("fichas-rusia");
if (fichasRusiaElemento) {
  fichasRusiaElemento.textContent = rusia.fichas;
}
if (rusia.mapa) {
  rusia.mapa.addEventListener('click', function() {
    gestionarSeleccion(rusia);
  });
}

// Oceanía y Sudeste Asiático
let australia = {
  nombre: "Australia",
  mapa: document.getElementById("australia"),
  fichas: 1,
  seleccionado: false
};
let fichasAustraliaElemento = document.getElementById("fichas-australia");
if (fichasAustraliaElemento) {
  fichasAustraliaElemento.textContent = australia.fichas;
}
if (australia.mapa) {
  australia.mapa.addEventListener('click', function() {
    gestionarSeleccion(australia);
  });
}

let sumatra = {
  nombre: "Sumatra",
  mapa: document.getElementById("sumatra"),
  fichas: 1,
  seleccionado: false
};
let fichasSumatraElemento = document.getElementById("fichas-sumatra");
if (fichasSumatraElemento) {
  fichasSumatraElemento.textContent = sumatra.fichas;
}
if (sumatra.mapa) {
  sumatra.mapa.addEventListener('click', function() {
    gestionarSeleccion(sumatra);
  });
}

let java = {
  nombre: "Java",
  mapa: document.getElementById("java"),
  fichas: 1,
  seleccionado: false
};
let fichasJavaElemento = document.getElementById("fichas-java");
if (fichasJavaElemento) {
  fichasJavaElemento.textContent = java.fichas;
}
if (java.mapa) {
  java.mapa.addEventListener('click', function() {
    gestionarSeleccion(java);
  });
}

let borneo = {
  nombre: "Borneo",
  mapa: document.getElementById("borneo"),
  fichas: 1,
  seleccionado: false
};
let fichasBorneoElemento = document.getElementById("fichas-borneo");
if (fichasBorneoElemento) {
  fichasBorneoElemento.textContent = borneo.fichas;
}
if (borneo.mapa) {
  borneo.mapa.addEventListener('click', function() {
    gestionarSeleccion(borneo);
  });
}

// África
let sahara = {
  nombre: "Sahara",
  mapa: document.getElementById("sahara"),
  fichas: 1,
  seleccionado: false
};
let fichasSaharaElemento = document.getElementById("fichas-sahara");
if (fichasSaharaElemento) {
  fichasSaharaElemento.textContent = sahara.fichas;
}
if (sahara.mapa) {
  sahara.mapa.addEventListener('click', function() {
    gestionarSeleccion(sahara);
  });
}

let egipto = {
  nombre: "Egipto",
  mapa: document.getElementById("egipto"),
  fichas: 1,
  seleccionado: false
};
let fichasEgiptoElemento = document.getElementById("fichas-egipto");
if (fichasEgiptoElemento) {
  fichasEgiptoElemento.textContent = egipto.fichas;
}
if (egipto.mapa) {
  egipto.mapa.addEventListener('click', function() {
    gestionarSeleccion(egipto);
  });
}

let etiopia = {
  nombre: "Etiopía",
  mapa: document.getElementById("etiopia"),
  fichas: 1,
  seleccionado: false
};
let fichasEtiopiaElemento = document.getElementById("fichas-etiopia");
if (fichasEtiopiaElemento) {
  fichasEtiopiaElemento.textContent = etiopia.fichas;
}
if (etiopia.mapa) {
  etiopia.mapa.addEventListener('click', function() {
    gestionarSeleccion(etiopia);
  });
}

let zaire = {
  nombre: "Zaire",
  mapa: document.getElementById("zaire"),
  fichas: 1,
  seleccionado: false
};
let fichasZaireElemento = document.getElementById("fichas-zaire");
if (fichasZaireElemento) {
  fichasZaireElemento.textContent = zaire.fichas;
}
if (zaire.mapa) {
  zaire.mapa.addEventListener('click', function() {
    gestionarSeleccion(zaire);
  });
}

let sudafrica = {
  nombre: "Sudáfrica",
  mapa: document.getElementById("sudafrica"),
  fichas: 1,
  seleccionado: false
};
let fichasSudafricaElemento = document.getElementById("fichas-sudafrica");
if (fichasSudafricaElemento) {
  fichasSudafricaElemento.textContent = sudafrica.fichas;
}
if (sudafrica.mapa) {
  sudafrica.mapa.addEventListener('click', function() {
    gestionarSeleccion(sudafrica);
  });
}

let madagascar = {
  nombre: "Madagascar",
  mapa: document.getElementById("madagascar"),
  fichas: 1,
  seleccionado: false
};
let fichasMadagascarElemento = document.getElementById("fichas-madagascar");
if (fichasMadagascarElemento) {
  fichasMadagascarElemento.textContent = madagascar.fichas;
}
if (madagascar.mapa) {
  madagascar.mapa.addEventListener('click', function() {
    gestionarSeleccion(madagascar);
  });
}

// América del Norte
let alaska = {
  nombre: "Alaska",
  mapa: document.getElementById("alaska"),
  fichas: 1,
  seleccionado: false
};
let fichasAlaskaElemento = document.getElementById("fichas-alaska");
if (fichasAlaskaElemento) {
  fichasAlaskaElemento.textContent = alaska.fichas;
}
if (alaska.mapa) {
  alaska.mapa.addEventListener('click', function() {
    gestionarSeleccion(alaska);
  });
}

let canada = {
  nombre: "Canadá",
  mapa: document.getElementById("canada"),
  fichas: 1,
  seleccionado: false
};
let fichasCanadaElemento = document.getElementById("fichas-canada");
if (fichasCanadaElemento) {
  fichasCanadaElemento.textContent = canada.fichas;
}
if (canada.mapa) {
  canada.mapa.addEventListener('click', function() {
    gestionarSeleccion(canada);
  });
}

let groenlandia = {
  nombre: "Groenlandia",
  mapa: document.getElementById("groenlandia"),
  fichas: 1,
  seleccionado: false
};
let fichasGroenlandiaElemento = document.getElementById("fichas-groenlandia");
if (fichasGroenlandiaElemento) {
  fichasGroenlandiaElemento.textContent = groenlandia.fichas;
}
if (groenlandia.mapa) {
  groenlandia.mapa.addEventListener('click', function() {
    gestionarSeleccion(groenlandia);
  });
}

let terranova = {
  nombre: "Terranova",
  mapa: document.getElementById("terranova"),
  fichas: 1,
  seleccionado: false
};
let fichasTerranovaElemento = document.getElementById("fichas-terranova");
if (fichasTerranovaElemento) {
  fichasTerranovaElemento.textContent = terranova.fichas;
}
if (terranova.mapa) {
  terranova.mapa.addEventListener('click', function() {
    gestionarSeleccion(terranova);
  });
}

let mexico = {
  nombre: "México",
  mapa: document.getElementById("mexico"),
  fichas: 1,
  seleccionado: false
};
let fichasMexicoElemento = document.getElementById("fichas-mexico");
if (fichasMexicoElemento) {
  fichasMexicoElemento.textContent = mexico.fichas;
}
if (mexico.mapa) {
  mexico.mapa.addEventListener('click', function() {
    gestionarSeleccion(mexico);
  });
}

let california = {
  nombre: "California",
  mapa: document.getElementById("california"),
  fichas: 1,
  seleccionado: false
};
let fichasCaliforniaElemento = document.getElementById("fichas-california");
if (fichasCaliforniaElemento) {
  fichasCaliforniaElemento.textContent = california.fichas;
}
if (california.mapa) {
  california.mapa.addEventListener('click', function() {
    gestionarSeleccion(california);
  });
}

let labrador = {
  nombre: "Labrador",
  mapa: document.getElementById("labrador"),
  fichas: 1,
  seleccionado: false
};
let fichasLabradorElemento = document.getElementById("fichas-labrador");
if (fichasLabradorElemento) {
  fichasLabradorElemento.textContent = labrador.fichas;
}
if (labrador.mapa) {
  labrador.mapa.addEventListener('click', function() {
    gestionarSeleccion(labrador);
  });
}

let oregon = {
  nombre: "Oregón",
  mapa: document.getElementById("oregon"),
  fichas: 1,
  seleccionado: false
};
let fichasOregonElemento = document.getElementById("fichas-oregon");
if (fichasOregonElemento) {
  fichasOregonElemento.textContent = oregon.fichas;
}
if (oregon.mapa) {
  oregon.mapa.addEventListener('click', function() {
    gestionarSeleccion(oregon);
  });
}

let nuevaYork = {
  nombre: "Nueva York",
  mapa: document.getElementById("nuevaYork"),
  fichas: 1,
  seleccionado: false
};
let fichasNuevaYorkElemento = document.getElementById("fichas-nuevaYork");
if (fichasNuevaYorkElemento) {
  fichasNuevaYorkElemento.textContent = nuevaYork.fichas;
}
if (nuevaYork.mapa) {
  nuevaYork.mapa.addEventListener('click', function() {
    gestionarSeleccion(nuevaYork);
  });
}

let yukon = {
  nombre: "Yukón",
  mapa: document.getElementById("yukon"),
  fichas: 1,
  seleccionado: false
};
let fichasYukonElemento = document.getElementById("fichas-yukon");
if (fichasYukonElemento) {
  fichasYukonElemento.textContent = yukon.fichas;
}
if (yukon.mapa) {
  yukon.mapa.addEventListener('click', function() {
    gestionarSeleccion(yukon);
  });
}

// Asia
let china = {
  nombre: "China",
  mapa: document.getElementById("china"),
  fichas: 1,
  seleccionado: false
};
let fichasChinaElemento = document.getElementById("fichas-china");
if (fichasChinaElemento) {
  fichasChinaElemento.textContent = china.fichas;
}
if (china.mapa) {
  china.mapa.addEventListener('click', function() {
    gestionarSeleccion(china);
  });
}

let japon = {
  nombre: "Japón",
  mapa: document.getElementById("japon"),
  fichas: 1,
  seleccionado: false
};
let fichasJaponElemento = document.getElementById("fichas-japon");
if (fichasJaponElemento) {
  fichasJaponElemento.textContent = japon.fichas;
}
if (japon.mapa) {
  japon.mapa.addEventListener('click', function() {
    gestionarSeleccion(japon);
  });
}

let iran = {
  nombre: "Irán",
  mapa: document.getElementById("iran"),
  fichas: 1,
  seleccionado: false
};
let fichasIranElemento = document.getElementById("fichas-iran");
if (fichasIranElemento) {
  fichasIranElemento.textContent = iran.fichas;
}
if (iran.mapa) {
  iran.mapa.addEventListener('click', function() {
    gestionarSeleccion(iran);
  });
}

let israel = {
  nombre: "Israel",
  mapa: document.getElementById("israel"),
  fichas: 1,
  seleccionado: false
};
let fichasIsraelElemento = document.getElementById("fichas-israel");
if (fichasIsraelElemento) {
  fichasIsraelElemento.textContent = israel.fichas;
}
if (israel.mapa) {
  israel.mapa.addEventListener('click', function() {
    gestionarSeleccion(israel);
  });
}

let arabia = {
  nombre: "Arabia",
  mapa: document.getElementById("arabia"),
  fichas: 1,
  seleccionado: false
};
let fichasArabiaElemento = document.getElementById("fichas-arabia");
if (fichasArabiaElemento) {
  fichasArabiaElemento.textContent = arabia.fichas;
}
if (arabia.mapa) {
  arabia.mapa.addEventListener('click', function() {
    gestionarSeleccion(arabia);
  });
}

let turquia = {
  nombre: "Turquía",
  mapa: document.getElementById("turquia"),
  fichas: 1,
  seleccionado: false
};
let fichasTurquiaElemento = document.getElementById("fichas-turquia");
if (fichasTurquiaElemento) {
  fichasTurquiaElemento.textContent = turquia.fichas;
}
if (turquia.mapa) {
  turquia.mapa.addEventListener('click', function() {
    gestionarSeleccion(turquia);
  });
}

let tartaria = {
  nombre: "Tartaria",
  mapa: document.getElementById("tartaria"),
  fichas: 1,
  seleccionado: false
};
let fichasTartariaElemento = document.getElementById("fichas-tartaria");
if (fichasTartariaElemento) {
  fichasTartariaElemento.textContent = tartaria.fichas;
}
if (tartaria.mapa) {
  tartaria.mapa.addEventListener('click', function() {
    gestionarSeleccion(tartaria);
  });
}

let kamchatka = {
  nombre: "Kamchatka",
  mapa: document.getElementById("kamchatka"),
  fichas: 1,
  seleccionado: false
};
let fichasKamchatkaElemento = document.getElementById("fichas-kamchatka");
if (fichasKamchatkaElemento) {
  fichasKamchatkaElemento.textContent = kamchatka.fichas;
}
if (kamchatka.mapa) {
  kamchatka.mapa.addEventListener('click', function() {
    gestionarSeleccion(kamchatka);
  });
}

let taimir = {
  nombre: "Taimir",
  mapa: document.getElementById("taimir"),
  fichas: 1,
  seleccionado: false
};
let fichasTaimirElemento = document.getElementById("fichas-taimir");
if (fichasTaimirElemento) {
  fichasTaimirElemento.textContent = taimir.fichas;
}
if (taimir.mapa) {
  taimir.mapa.addEventListener('click', function() {
    gestionarSeleccion(taimir);
  });
}

let gobi = {
  nombre: "Gobi",
  mapa: document.getElementById("gobi"),
  fichas: 1,
  seleccionado: false
};
let fichasGobiElemento = document.getElementById("fichas-gobi");
if (fichasGobiElemento) {
  fichasGobiElemento.textContent = gobi.fichas;
}
if (gobi.mapa) {
  gobi.mapa.addEventListener('click', function() {
    gestionarSeleccion(gobi);
  });
}

let india = {
  nombre: "India",
  mapa: document.getElementById("india"),
  fichas: 1,
  seleccionado: false
};
let fichasIndiaElemento = document.getElementById("fichas-india");
if (fichasIndiaElemento) {
  fichasIndiaElemento.textContent = india.fichas;
}
if (india.mapa) {
  india.mapa.addEventListener('click', function() {
    gestionarSeleccion(india);
  });
}

let malasia = {
  nombre: "Malasia",
  mapa: document.getElementById("malasia"),
  fichas: 1,
  seleccionado: false
};
let fichasMalasiaElemento = document.getElementById("fichas-malasia");
if (fichasMalasiaElemento) {
  fichasMalasiaElemento.textContent = malasia.fichas;
}
if (malasia.mapa) {
  malasia.mapa.addEventListener('click', function() {
    gestionarSeleccion(malasia);
  });
}

let siberia = {
  nombre: "Siberia",
  mapa: document.getElementById("siberia"),
  fichas: 1,
  seleccionado: false
};
let fichasSiberiaElemento = document.getElementById("fichas-siberia");
if (fichasSiberiaElemento) {
  fichasSiberiaElemento.textContent = siberia.fichas;
}
if (siberia.mapa) {
  siberia.mapa.addEventListener('click', function() {
    gestionarSeleccion(siberia);
  });
}

let aral = {
  nombre: "Aral",
  mapa: document.getElementById("aral"),
  fichas: 1,
  seleccionado: false
};
let fichasAralElemento = document.getElementById("fichas-aral");
if (fichasAralElemento) {
  fichasAralElemento.textContent = aral.fichas;
}
if (aral.mapa) {
  aral.mapa.addEventListener('click', function() {
    gestionarSeleccion(aral);
  });
}

let mongolia = {
  nombre: "Mongolia",
  mapa: document.getElementById("mongolia"),
  fichas: 1,
  seleccionado: false
};
let fichasMongoliaElemento = document.getElementById("fichas-mongolia");
if (fichasMongoliaElemento) {
  fichasMongoliaElemento.textContent = mongolia.fichas;
}
if (mongolia.mapa) {
  mongolia.mapa.addEventListener('click', function() {
    gestionarSeleccion(mongolia);
  });
}