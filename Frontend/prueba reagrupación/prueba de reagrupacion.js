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

const botonMoverFichas = document.getElementById("mover-fichas-btn");
if (botonMoverFichas) {
  botonMoverFichas.addEventListener('click', solicitarMovimiento);
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