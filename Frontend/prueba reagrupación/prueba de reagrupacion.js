// América del Sur
let argentina = {
  argentinaMapa: document.getElementById("argentina"),
  fichasArgentina: 1,
  argentinaSeleccionado: false
};
argentina.argentinaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Argentina.");
  if (argentina.argentinaSeleccionado === false) {
    argentina.argentinaSeleccionado = true;
    console.log("Argentina ha sido seleccionada.");
  }
  if (argentina.argentinaSeleccionado === true) {
    argentina.argentinaSeleccionado = false;
    console.log("Argentina ha sido deseleccionada.");
  }
});

let chile = {
  chileMapa: document.getElementById("chile"),
  fichasChile: 1,
  chileSeleccionado: false
};
chile.chileMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Chile.");
  if (chile.chileSeleccionado === false) {
    chile.chileSeleccionado = true;
    console.log("Chile ha sido seleccionado.");
  }
  if (chile.chileSeleccionado === true) {
    chile.chileSeleccionado = false;
    console.log("Chile ha sido deseleccionado.");
  }
});

let uruguay = {
  uruguayMapa: document.getElementById("uruguay"),
  fichasUruguay: 1,
  uruguaySeleccionado: false
};
uruguay.uruguayMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Uruguay.");
  if (uruguay.uruguaySeleccionado === false) {
    uruguay.uruguaySeleccionado = true;
    console.log("Uruguay ha sido seleccionado.");
  }
  if (uruguay.uruguaySeleccionado === true) {
    uruguay.uruguaySeleccionado = false;
    console.log("Uruguay ha sido deseleccionado.");
  }
});

let brasil = {
  brasilMapa: document.getElementById("brasil"),
  fichasBrasil: 1,
  brasilSeleccionado: false
};
brasil.brasilMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Brasil.");
  if (brasil.brasilSeleccionado === false) {
    brasil.brasilSeleccionado = true;
    console.log("Brasil ha sido seleccionado.");
  }
  if (brasil.brasilSeleccionado === true) {
    brasil.brasilSeleccionado = false;
    console.log("Brasil ha sido deseleccionado.");
  }
});

let peru = {
  peruMapa: document.getElementById("peru"),
  fichasPeru: 1,
  peruSeleccionado: false
};
peru.peruMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Perú.");
  if (peru.peruSeleccionado === false) {
    peru.peruSeleccionado = true;
    console.log("Perú ha sido seleccionado.");
  }
  if (peru.peruSeleccionado === true) {
    peru.peruSeleccionado = false;
    console.log("Perú ha sido deseleccionado.");
  }
});

let colombia = {
  colombiaMapa: document.getElementById("colombia"),
  fichasColombia: 1,
  colombiaSeleccionado: false
};
colombia.colombiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Colombia.");
  if (colombia.colombiaSeleccionado === false) {
    colombia.colombiaSeleccionado = true;
    console.log("Colombia ha sido seleccionada.");
  }
  if (colombia.colombiaSeleccionado === true) {
    colombia.colombiaSeleccionado = false;
    console.log("Colombia ha sido deseleccionada.");
  }
});

// Europa
let islandia = {
  islandiaMapa: document.getElementById("islandia"),
  fichasIslandia: 1,
  islandiaSeleccionado: false
};
islandia.islandiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Islandia.");
  if (islandia.islandiaSeleccionado === false) {
    islandia.islandiaSeleccionado = true;
    console.log("Islandia ha sido seleccionada.");
  }
  if (islandia.islandiaSeleccionado === true) {
    islandia.islandiaSeleccionado = false;
    console.log("Islandia ha sido deseleccionada.");
  }
});

let bretana = {
  bretanaMapa: document.getElementById("inglaterra"),
  fichasBretana: 1,
  bretanaSeleccionado: false
};
bretana.bretanaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Bretaña.");
  if (bretana.bretanaSeleccionado === false) {
    bretana.bretanaSeleccionado = true;
    console.log("Bretaña ha sido seleccionada.");
  }
  if (bretana.bretanaSeleccionado === true) {
    bretana.bretanaSeleccionado = false;
    console.log("Bretaña ha sido deseleccionada.");
  }
});

let espana = {
  espanaMapa: document.getElementById("espana"),
  fichasEspana: 1,
  espanaSeleccionado: false
};
espana.espanaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en España.");
  if (espana.espanaSeleccionado === false) {
    espana.espanaSeleccionado = true;
    console.log("España ha sido seleccionada.");
  }
  if (espana.espanaSeleccionado === true) {
    espana.espanaSeleccionado = false;
    console.log("España ha sido deseleccionada.");
  }
});

let francia = {
  franciaMapa: document.getElementById("francia"),
  fichasFrancia: 1,
  franciaSeleccionado: false
};
francia.franciaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Francia.");
  if (francia.franciaSeleccionado === false) {
    francia.franciaSeleccionado = true;
    console.log("Francia ha sido seleccionada.");
  }
  if (francia.franciaSeleccionado === true) {
    francia.franciaSeleccionado = false;
    console.log("Francia ha sido deseleccionada.");
  }
});

let alemania = {
  alemaniaMapa: document.getElementById("alemania"),
  fichasAlemania: 1,
  alemaniaSeleccionado: false
};
alemania.alemaniaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Alemania.");
  if (alemania.alemaniaSeleccionado === false) {
    alemania.alemaniaSeleccionado = true;
    console.log("Alemania ha sido seleccionada.");
  }
  if (alemania.alemaniaSeleccionado === true) {
    alemania.alemaniaSeleccionado = false;
    console.log("Alemania ha sido deseleccionada.");
  }
});

let italia = {
  italiaMapa: document.getElementById("italia"),
  fichasItalia: 1,
  italiaSeleccionado: false
};
italia.italiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Italia.");
  if (italia.italiaSeleccionado === false) {
    italia.italiaSeleccionado = true;
    console.log("Italia ha sido seleccionada.");
  }
  if (italia.italiaSeleccionado === true) {
    italia.italiaSeleccionado = false;
    console.log("Italia ha sido deseleccionada.");
  }
});

let polonia = {
  poloniaMapa: document.getElementById("polonia"),
  fichasPolonia: 1,
  poloniaSeleccionado: false
};
polonia.poloniaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Polonia.");
  if (polonia.poloniaSeleccionado === false) {
    polonia.poloniaSeleccionado = true;
    console.log("Polonia ha sido seleccionada.");
  }
  if (polonia.poloniaSeleccionado === true) {
    polonia.poloniaSeleccionado = false;
    console.log("Polonia ha sido deseleccionada.");
  }
});

let rusia = {
  rusiaMapa: document.getElementById("rusia"),
  fichasRusia: 1,
  rusiaSeleccionado: false
};
rusia.rusiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Rusia.");
  if (rusia.rusiaSeleccionado === false) {
    rusia.rusiaSeleccionado = true;
    console.log("Rusia ha sido seleccionada.");
  }
  if (rusia.rusiaSeleccionado === true) {
    rusia.rusiaSeleccionado = false;
    console.log("Rusia ha sido deseleccionada.");
  }
});

// Oceanía y Sudeste Asiático
let australia = {
  australiaMapa: document.getElementById("australia"),
  fichasAustralia: 1,
  australiaSeleccionado: false
};
australia.australiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Australia.");
  if (australia.australiaSeleccionado === false) {
    australia.australiaSeleccionado = true;
    console.log("Australia ha sido seleccionada.");
  }
  if (australia.australiaSeleccionado === true) {
    australia.australiaSeleccionado = false;
    console.log("Australia ha sido deseleccionada.");
  }
});

let sumatra = {
  sumatraMapa: document.getElementById("sumatra"),
  fichasSumatra: 1,
  sumatraSeleccionado: false
};
sumatra.sumatraMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Sumatra.");
  if (sumatra.sumatraSeleccionado === false) {
    sumatra.sumatraSeleccionado = true;
    console.log("Sumatra ha sido seleccionada.");
  }
  if (sumatra.sumatraSeleccionado === true) {
    sumatra.sumatraSeleccionado = false;
    console.log("Sumatra ha sido deseleccionada.");
  }
});

let java = {
  javaMapa: document.getElementById("java"),
  fichasJava: 1,
  javaSeleccionado: false
};
java.javaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Java.");
  if (java.javaSeleccionado === false) {
    java.javaSeleccionado = true;
    console.log("Java ha sido seleccionada.");
  }
  if (java.javaSeleccionado === true) {
    java.javaSeleccionado = false;
    console.log("Java ha sido deseleccionada.");
  }
});

let borneo = {
  borneoMapa: document.getElementById("borneo"),
  fichasBorneo: 1,
  borneoSeleccionado: false
};
borneo.borneoMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Borneo.");
  if (borneo.borneoSeleccionado === false) {
    borneo.borneoSeleccionado = true;
    console.log("Borneo ha sido seleccionado.");
  }
  if (borneo.borneoSeleccionado === true) {
    borneo.borneoSeleccionado = false;
    console.log("Borneo ha sido deseleccionado.");
  }
});

// África
let sahara = {
  saharaMapa: document.getElementById("sahara"),
  fichasSahara: 1,
  saharaSeleccionado: false
};
sahara.saharaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Sahara.");
  if (sahara.saharaSeleccionado === false) {
    sahara.saharaSeleccionado = true;
    console.log("Sahara ha sido seleccionado.");
  }
  if (sahara.saharaSeleccionado === true) {
    sahara.saharaSeleccionado = false;
    console.log("Sahara ha sido deseleccionado.");
  }
});

let egipto = {
  egiptoMapa: document.getElementById("egipto"),
  fichasEgipto: 1,
  egiptoSeleccionado: false
};
egipto.egiptoMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Egipto.");
  if (egipto.egiptoSeleccionado === false) {
    egipto.egiptoSeleccionado = true;
    console.log("Egipto ha sido seleccionado.");
  }
  if (egipto.egiptoSeleccionado === true) {
    egipto.egiptoSeleccionado = false;
    console.log("Egipto ha sido deseleccionado.");
  }
});

let etiopia = {
  etiopiaMapa: document.getElementById("etiopia"),
  fichasEtiopia: 1,
  etiopiaSeleccionado: false
};
etiopia.etiopiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Etiopía.");
  if (etiopia.etiopiaSeleccionado === false) {
    etiopia.etiopiaSeleccionado = true;
    console.log("Etiopía ha sido seleccionada.");
  }
  if (etiopia.etiopiaSeleccionado === true) {
    etiopia.etiopiaSeleccionado = false;
    console.log("Etiopía ha sido deseleccionada.");
  }
});

let zaire = {
  zaireMapa: document.getElementById("zaire"),
  fichasZaire: 1,
  zaireSeleccionado: false
};
zaire.zaireMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Zaire.");
  if (zaire.zaireSeleccionado === false) {
    zaire.zaireSeleccionado = true;
    console.log("Zaire ha sido seleccionado.");
  }
  if (zaire.zaireSeleccionado === true) {
    zaire.zaireSeleccionado = false;
    console.log("Zaire ha sido deseleccionado.");
  }
});

let sudafrica = {
  sudafricaMapa: document.getElementById("sudafrica"),
  fichasSudafrica: 1,
  sudafricaSeleccionado: false
};
sudafrica.sudafricaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Sudáfrica.");
  if (sudafrica.sudafricaSeleccionado === false) {
    sudafrica.sudafricaSeleccionado = true;
    console.log("Sudáfrica ha sido seleccionada.");
  }
  if (sudafrica.sudafricaSeleccionado === true) {
    sudafrica.sudafricaSeleccionado = false;
    console.log("Sudáfrica ha sido deseleccionada.");
  }
});

let madagascar = {
  madagascarMapa: document.getElementById("madagascar"),
  fichasMadagascar: 1,
  madagascarSeleccionado: false
};
madagascar.madagascarMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Madagascar.");
  if (madagascar.madagascarSeleccionado === false) {
    madagascar.madagascarSeleccionado = true;
    console.log("Madagascar ha sido seleccionada.");
  }
  if (madagascar.madagascarSeleccionado === true) {
    madagascar.madagascarSeleccionado = false;
    console.log("Madagascar ha sido deseleccionada.");
  }
});

// América del Norte
let alaska = {
  alaskaMapa: document.getElementById("alaska"),
  fichasAlaska: 1,
  alaskaSeleccionado: false
};
alaska.alaskaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Alaska.");
  if (alaska.alaskaSeleccionado === false) {
    alaska.alaskaSeleccionado = true;
    console.log("Alaska ha sido seleccionada.");
  }
  if (alaska.alaskaSeleccionado === true) {
    alaska.alaskaSeleccionado = false;
    console.log("Alaska ha sido deseleccionada.");
  }
});

let canada = {
  canadaMapa: document.getElementById("canada"),
  fichasCanada: 1,
  canadaSeleccionado: false
};
canada.canadaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Canadá.");
  if (canada.canadaSeleccionado === false) {
    canada.canadaSeleccionado = true;
    console.log("Canadá ha sido seleccionada.");
  }
  if (canada.canadaSeleccionado === true) {
    canada.canadaSeleccionado = false;
    console.log("Canadá ha sido deseleccionada.");
  }
});

let groenlandia = {
  groenlandiaMapa: document.getElementById("groenlandia"),
  fichasGroenlandia: 1,
  groenlandiaSeleccionado: false
};
groenlandia.groenlandiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Groenlandia.");
  if (groenlandia.groenlandiaSeleccionado === false) {
    groenlandia.groenlandiaSeleccionado = true;
    console.log("Groenlandia ha sido seleccionada.");
  }
  if (groenlandia.groenlandiaSeleccionado === true) {
    groenlandia.groenlandiaSeleccionado = false;
    console.log("Groenlandia ha sido deseleccionada.");
  }
});

let terranova = {
  terranovaMapa: document.getElementById("terranova"),
  fichasTerranova: 1,
  terranovaSeleccionado: false
};
terranova.terranovaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Terranova.");
  if (terranova.terranovaSeleccionado === false) {
    terranova.terranovaSeleccionado = true;
    console.log("Terranova ha sido seleccionada.");
  }
  if (terranova.terranovaSeleccionado === true) {
    terranova.terranovaSeleccionado = false;
    console.log("Terranova ha sido deseleccionada.");
  }
});

let mexico = {
  mexicoMapa: document.getElementById("mexico"),
  fichasMexico: 1,
  mexicoSeleccionado: false
};
mexico.mexicoMapa.addEventListener('click', function() {
  console.log("Hiciste clic en México.");
  if (mexico.mexicoSeleccionado === false) {
    mexico.mexicoSeleccionado = true;
    console.log("México ha sido seleccionado.");
  }
  if (mexico.mexicoSeleccionado === true) {
    mexico.mexicoSeleccionado = false;
    console.log("México ha sido deseleccionado.");
  }
});

let california = {
  californiaMapa: document.getElementById("california"),
  fichasCalifornia: 1,
  californiaSeleccionado: false
};
california.californiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en California.");
  if (california.californiaSeleccionado === false) {
    california.californiaSeleccionado = true;
    console.log("California ha sido seleccionada.");
  }
  if (california.californiaSeleccionado === true) {
    california.californiaSeleccionado = false;
    console.log("California ha sido deseleccionada.");
  }
});

let labrador = {
  labradorMapa: document.getElementById("labrador"),
  fichasLabrador: 1,
  labradorSeleccionado: false
};
labrador.labradorMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Labrador.");
  if (labrador.labradorSeleccionado === false) {
    labrador.labradorSeleccionado = true;
    console.log("Labrador ha sido seleccionado.");
  }
  if (labrador.labradorSeleccionado === true) {
    labrador.labradorSeleccionado = false;
    console.log("Labrador ha sido deseleccionado.");
  }
});

let oregon = {
  oregonMapa: document.getElementById("oregon"),
  fichasOregon: 1,
  oregonSeleccionado: false
};
oregon.oregonMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Oregon.");
  if (oregon.oregonSeleccionado === false) {
    oregon.oregonSeleccionado = true;
    console.log("Oregón ha sido seleccionado.");
  }
  if (oregon.oregonSeleccionado === true) {
    oregon.oregonSeleccionado = false;
    console.log("Oregón ha sido deseleccionado.");
  }
});

let nuevaYork = {
  nuevaYorkMapa: document.getElementById("nuevaYork"),
  fichasNuevaYork: 1,
  nuevaYorkSeleccionado: false
};
nuevaYork.nuevaYorkMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Nueva York.");
  if (nuevaYork.nuevaYorkSeleccionado === false) {
    nuevaYork.nuevaYorkSeleccionado = true;
    console.log("Nueva York ha sido seleccionada.");
  }
  if (nuevaYork.nuevaYorkSeleccionado === true) {
    nuevaYork.nuevaYorkSeleccionado = false;
    console.log("Nueva York ha sido deseleccionada.");
  }
});

let yukon = {
  yukonMapa: document.getElementById("yukon"),
  fichasYukon: 1,
  yukonSeleccionado: false
};
yukon.yukonMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Yukón.");
  if (yukon.yukonSeleccionado === false) {
    yukon.yukonSeleccionado = true;
    console.log("Yukón ha sido seleccionado.");
  }
  if (yukon.yukonSeleccionado === true) {
    yukon.yukonSeleccionado = false;
    console.log("Yukón ha sido deseleccionado.");
  }
});

// Asia
let china = {
  chinaMapa: document.getElementById("china"),
  fichasChina: 1,
  chinaSeleccionado: false
};
china.chinaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en China.");
  if (china.chinaSeleccionado === false) {
    china.chinaSeleccionado = true;
    console.log("China ha sido seleccionada.");
  }
  if (china.chinaSeleccionado === true) {
    china.chinaSeleccionado = false;
    console.log("China ha sido deseleccionada.");
  }
});

let japon = {
  japonMapa: document.getElementById("japon"),
  fichasJapon: 1,
  japonSeleccionado: false
};
japon.japonMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Japón.");
  if (japon.japonSeleccionado === false) {
    japon.japonSeleccionado = true;
    console.log("Japón ha sido seleccionado.");
  }
  if (japon.japonSeleccionado === true) {
    japon.japonSeleccionado = false;
    console.log("Japón ha sido deseleccionado.");
  }
});

let iran = {
  iranMapa: document.getElementById("iran"),
  fichasIran: 1,
  iranSeleccionado: false
};
iran.iranMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Irán.");
  if (iran.iranSeleccionado === false) {
    iran.iranSeleccionado = true;
    console.log("Irán ha sido seleccionado.");
  }
  if (iran.iranSeleccionado === true) {
    iran.iranSeleccionado = false;
    console.log("Irán ha sido deseleccionado.");
  }
});

let israel = {
  israelMapa: document.getElementById("israel"),
  fichasIsrael: 1,
  israelSeleccionado: false
};
israel.israelMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Israel.");
  if (israel.israelSeleccionado === false) {
    israel.israelSeleccionado = true;
    console.log("Israel ha sido seleccionado.");
  }
  if (israel.israelSeleccionado === true) {
    israel.israelSeleccionado = false;
    console.log("Israel ha sido deseleccionado.");
  }
});

let arabia = {
  arabiaMapa: document.getElementById("arabia"),
  fichasArabia: 1,
  arabiaSeleccionado: false
};
arabia.arabiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Arabia.");
  if (arabia.arabiaSeleccionado === false) {
    arabia.arabiaSeleccionado = true;
    console.log("Arabia ha sido seleccionada.");
  }
  if (arabia.arabiaSeleccionado === true) {
    arabia.arabiaSeleccionado = false;
    console.log("Arabia ha sido deseleccionada.");
  }
});

let turquia = {
  turquiaMapa: document.getElementById("turquia"),
  fichasTurquia: 1,
  turquiaSeleccionado: false
};
turquia.turquiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Turquía.");
  if (turquia.turquiaSeleccionado === false) {
    turquia.turquiaSeleccionado = true;
    console.log("Turquía ha sido seleccionada.");
  }
  if (turquia.turquiaSeleccionado === true) {
    turquia.turquiaSeleccionado = false;
    console.log("Turquía ha sido deseleccionada.");
  }
});

let tartaria = {
  tartariaMapa: document.getElementById("tartaria"),
  fichasTartaria: 1,
  tartariaSeleccionado: false
};
tartaria.tartariaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Tartaria.");
  if (tartaria.tartariaSeleccionado === false) {
    tartaria.tartariaSeleccionado = true;
    console.log("Tartaria ha sido seleccionada.");
  }
  if (tartaria.tartariaSeleccionado === true) {
    tartaria.tartariaSeleccionado = false;
    console.log("Tartaria ha sido deseleccionada.");
  }
});

let kamchatka = {
  kamchatkaMapa: document.getElementById("kamchatka"),
  fichasKamchatka: 1,
  kamchatkaSeleccionado: false
};
kamchatka.kamchatkaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Kamchatka.");
  if (kamchatka.kamchatkaSeleccionado === false) {
    kamchatka.kamchatkaSeleccionado = true;
    console.log("Kamchatka ha sido seleccionada.");
  }
  if (kamchatka.kamchatkaSeleccionado === true) {
    kamchatka.kamchatkaSeleccionado = false;
    console.log("Kamchatka ha sido deseleccionada.");
  }
});

let taimir = {
  taimirMapa: document.getElementById("taimir"),
  fichasTaimir: 1,
  taimirSeleccionado: false
};
taimir.taimirMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Taimir.");
  if (taimir.taimirSeleccionado === false) {
    taimir.taimirSeleccionado = true;
    console.log("Taimir ha sido seleccionado.");
  }
  if (taimir.taimirSeleccionado === true) {
    taimir.taimirSeleccionado = false;
    console.log("Taimir ha sido deseleccionado.");
  }
});

let gobi = {
  gobiMapa: document.getElementById("gobi"),
  fichasGobi: 1,
  gobiSeleccionado: false
};
gobi.gobiMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Gobi.");
  if (gobi.gobiSeleccionado === false) {
    gobi.gobiSeleccionado = true;
    console.log("Gobi ha sido seleccionado.");
  }
  if (gobi.gobiSeleccionado === true) {
    gobi.gobiSeleccionado = false;
    console.log("Gobi ha sido deseleccionado.");
  }
});

let india = {
  indiaMapa: document.getElementById("india"),
  fichasIndia: 1,
  indiaSeleccionado: false
};
india.indiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en India.");
  if (india.indiaSeleccionado === false) {
    india.indiaSeleccionado = true;
    console.log("India ha sido seleccionada.");
  }
  if (india.indiaSeleccionado === true) {
    india.indiaSeleccionado = false;
    console.log("India ha sido deseleccionada.");
  }
});

let malasia = {
  malasiaMapa: document.getElementById("malasia"),
  fichasMalasia: 1,
  malasiaSeleccionado: false
};
malasia.malasiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Malasia.");
  if (malasia.malasiaSeleccionado === false) {
    malasia.malasiaSeleccionado = true;
    console.log("Malasia ha sido seleccionada.");
  }
  if (malasia.malasiaSeleccionado === true) {
    malasia.malasiaSeleccionado = false;
    console.log("Malasia ha sido deseleccionada.");
  }
});

let siberia = {
  siberiaMapa: document.getElementById("siberia"),
  fichasSiberia: 1,
  siberiaSeleccionado: false
};
siberia.siberiaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Siberia.");
  if (siberia.siberiaSeleccionado === false) {
    siberia.siberiaSeleccionado = true;
    console.log("Siberia ha sido seleccionada.");
  }
  if (siberia.siberiaSeleccionado === true) {
    siberia.siberiaSeleccionado = false;
    console.log("Siberia ha sido deseleccionada.");
  }
});

let aral = {
  aralMapa: document.getElementById("aral"),
  fichasAral: 1,
  aralSeleccionado: false
};
aral.aralMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Aral.");
  if (aral.aralSeleccionado === false) {
    aral.aralSeleccionado = true;
    console.log("Aral ha sido seleccionado.");
  }
  if (aral.aralSeleccionado === true) {
    aral.aralSeleccionado = false;
    console.log("Aral ha sido deseleccionado.");
  }
});

let mongolia = {
  mongoliaMapa: document.getElementById("mongolia"),
  fichasMongolia: 1,
  mongoliaSeleccionado: false
};
mongolia.mongoliaMapa.addEventListener('click', function() {
  console.log("Hiciste clic en Mongolia.");
  if (mongolia.mongoliaSeleccionado === false) {
    mongolia.mongoliaSeleccionado = true;
    console.log("Mongolia ha sido seleccionada.");
  }
  if (mongolia.mongoliaSeleccionado === true) {
    mongolia.mongoliaSeleccionado = false;
    console.log("Mongolia ha sido deseleccionada.");
  }
});