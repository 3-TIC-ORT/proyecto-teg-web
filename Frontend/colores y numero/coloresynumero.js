const colors = ['azul', 'rojo', 'amarillo', 'verde', 'rosa', 'negro'];
        
        let playerCount = 3; // Número inicial de jugadores (mínimo 3)
        let selectedColors = []; // Colores seleccionados por los jugadores

        // Actualiza la cantidad de jugadores y los colores disponibles
        function updatePlayerSelection() {
            // Obtener el número de jugadores seleccionado
            playerCount = parseInt(document.getElementById('playerCount').value);

            // Resetear la lista de colores seleccionados
            selectedColors = [];

            // Limpiar la selección de colores
            const colorButtonsContainer = document.getElementById('colorButtons');
            colorButtonsContainer.innerHTML = '';

            // Mostrar los botones de colores según la cantidad de jugadores
            for (let i = 0; i < playerCount; i++) {
                const colorButton = document.createElement('button');
                colorButton.classList.add('color-button');
                colorButton.textContent = colors[i];
                colorButton.style.backgroundColor = colors[i];
                colorButton.onclick = () => selectColor(i);
                colorButtonsContainer.appendChild(colorButton);
            }

            // Deshabilitar el botón de siguiente si no hay suficientes colores seleccionados
            document.getElementById('nextButton').disabled = selectedColors.length !== playerCount;
        }

        // Selecciona un color para un jugador
        function selectColor(playerIndex) {
            const colorButton = document.getElementsByClassName('color-button')[playerIndex];
            const selectedColor = colorButton.textContent;

            // Si el color ya está seleccionado, lo deseleccionamos
            if (selectedColors.includes(selectedColor)) {
                const colorIndex = selectedColors.indexOf(selectedColor);
                selectedColors.splice(colorIndex, 1);
                colorButton.classList.remove('selected');
            } else {
                // Si el color no está seleccionado, lo agregamos a la lista
                if (selectedColors.length < playerCount) {
                    selectedColors.push(selectedColor);
                    colorButton.classList.add('selected');
                }
            }

            // Deshabilitar el botón de siguiente si no hay suficientes colores seleccionados
            document.getElementById('nextButton').disabled = selectedColors.length !== playerCount;
        }

        // Comienza el juego con los jugadores y sus colores seleccionados
        function startGame() {
            if (selectedColors.length === playerCount) {
                alert(`Juego iniciado con ${playerCount} jugadores: ${selectedColors.join(', ')}`);
                // Aquí puedes agregar la lógica para comenzar el juego
            } else {
                alert("Debes seleccionar un color para cada jugador.");
            }
        }

        // Inicializa el juego con 3 jugadores y colores
        updatePlayerSelection();
