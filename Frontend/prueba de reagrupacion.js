let numerofichas = document.getElementById ("numerofichas")
let reagrupar = document.getElementById ("reagrupar")
let numero = 1;
let indice =0
let country =
    {
        argentina:1,
        chile:1,
        uruguay:1,
        brasil:1,
        peru:1,
        colombia:1,

        Islandia:1,
        Bretaña:1,
        España:1,
        Francia:1,
        Alemania:1,
        Italia:1,
        Polonia:1,
        Rusia:1,

        Australia:1,
        Sumatra:1,
        Java:1,
        borneo:1,

        sahara:1,
        Egipto:1,
        Etiopía:1,
        Zaire:1,
        Sudáfrica:1,
        Madagascar:1,

        Alaska:1,
        Canadá:1,
        Groenlandia:1,
        terranova:1,
        México:1,
        California:1,
        Labrador:1,
        oregon:1,
        nuevayork:1,
        yukon:1,

        china:1,
        japon:1,
        iran:1,
        israel:1,
        arabia:1,
        turquia:1,
        tartaria:1,
        kamchatka:1,
        taimir:1,
        gobi:1,
        india:1,
        malasia:1,
        siberria:1,
        aral:1,
        tartaria:1,
        mongolia:1,
    }
function alasketa(){
if (reagrupar===Alaska && Alaska===1){
    fichas.Alaska = 2
}

if (reagrupar===Alaska && Alaska===2){
    fichas.Alaska = 3
}

if (reagrupar===Alaska && Alaska===3){
    fichas.Alaska = 4
}

if (reagrupar===Alaska && Alaska===4){
    fichas.Alaska = 5
}
}

//copiado en chat gpt
let seleccion = [];

const countryElements = document.getElementsByClassName('.country');
const btnReagrupar = document.getElementById('btn-reagrupar');
const menuReagrupar = document.getElementById('menu-reagrupar');
const selectCantidad = document.getElementById('cantidad-mover');

countryElements.forEach(el => {
  el.addEventListener('click', () => {
    const id = parseInt(el.getAttribute('data-id'));

    if (seleccion.length < 2) {
      if (!seleccion.includes(id)) {
        seleccion.push(id);
        el.classList.add('selected');
      }

      if (seleccion.length === 2) {
        const [origen, destino] = seleccion;
        if (paises[origen].conexiones.includes(destino)) {
          btnReagrupar.disabled = false;
        } else {
          alert("No podes mover por esos paises.");
          resetSeleccion();
        }
      }
    }
  });
});

btnReagrupar.addEventListener('click', () => {
  const [origenId, destinoId] = seleccion;
  const origen = paises[origenId];
  const destino = paises[destinoId];

  // Calcular máximo de fichas que se pueden mover
  const maxMover = origen.fichas - 1;
  const yaMovidas = origen.yaMovidas;

  const fichasDisponibles = maxMover - yaMovidas;

  selectCantidad.innerHTML = '';

  if (fichasDisponibles <= 1) {
    alert("No hay fichas disponibles para mover desde este país.");
    resetSeleccion();
    return;
  }

  for (let i = 1; i <= fichasDisponibles; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    selectCantidad.appendChild(opt);
  }

  menuReagrupar.style.display = 'block';
});

function moverFichas() {
  const cantidad = parseInt(selectCantidad.value);
  const [origenId, destinoId] = seleccion;

  paises[origenId].fichas -= cantidad;
  paises[destinoId].fichas += cantidad;

  paises[origenId].yaMovidas += cantidad;

  actualizarUI();
  resetSeleccion();
}

function resetSeleccion() {
  seleccion = [];
  btnReagrupar.disabled = true;
  menuReagrupar.style.display = 'none';

  countryElements.forEach(el => el.classList.remove('selected'));
}

function actualizarUI() {
  countryElements.forEach(el => {
    const id = parseInt(el.getAttribute('data-id'));
    el.textContent = `${paises[id].nombre} (${paises[id].fichas})`;
  });
}