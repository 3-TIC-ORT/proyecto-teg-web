const allColors = ["Azul", "Rojo", "Amarillo", "Verde", "Rosa", "Negro"];


function generateSelectors() {
  const numPlayers = parseInt(document.getElementById("numPlayers").value);
  const container = document.getElementById("selectors");
  container.innerHTML = "";


  const selectedColors = [];


  for (let i = 0; i < numPlayers; i++) {
    const div = document.createElement("div");
    div.className = "player-select";


    const label = document.createElement("label");
    label.textContent = `Jugador ${i + 1}:`;


    const select = document.createElement("select");
    select.id = `player${i}`;
    select.onchange = () => updateOptions();


    div.appendChild(label);
    div.appendChild(select);
    container.appendChild(div);
  }


  updateOptions();
}


function updateOptions() {
  const numPlayers = parseInt(document.getElementById("numPlayers").value);
  const selectedColors = [];


  for (let i = 0; i < numPlayers; i++) {
    const select = document.getElementById(`player${i}`);
    if (select.value) selectedColors.push(select.value);
  }


  for (let i = 0; i < numPlayers; i++) {
    const select = document.getElementById(`player${i}`);
    const currentValue = select.value;
    select.innerHTML = "";


    const availableColors = allColors.filter(color => !selectedColors.includes(color) || color === currentValue);


    availableColors.forEach(color => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      if (color === currentValue) option.selected = true;
      select.appendChild(option);
    });
  }
}
