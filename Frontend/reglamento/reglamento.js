  const hotspotsData = [
      { id: 'h1', label: 'Objetivo del juego', sectionTitle: 'Objetivo del juego', sectionText: '<p>El objetivo del juego es completar todas las misiones antes que los demás jugadores.</p>' },
      { id: 'h2', label: 'Preparación', sectionTitle: 'Preparación', sectionText: '<p>Coloca el tablero en el centro, reparte las cartas y asigna los roles.</p>' },
      { id: 'h3', label: 'Turno de un jugador', sectionTitle: 'Turno de un jugador', sectionText: '<p>En cada turno, un jugador puede moverse, usar habilidades o interactuar con el entorno.</p>' },
      { id: 'h4', label: 'Fin de ronda', sectionTitle: 'Fin de ronda', sectionText: '<p>La ronda termina cuando todos los jugadores han completado su turno.</p>' },
      { id: 'h5', label: 'Cómo ganar', sectionTitle: 'Cómo ganar', sectionText: '<p>Gana el jugador que logre completar todas sus misiones primero.</p>' },
      { id: 'h6', label: 'Consejos', sectionTitle: 'Consejos', sectionText: '<p>Planifica tus movimientos, colabora con otros y aprovecha tus habilidades especiales.</p>' }
    ];

    const mainStageEl = document.getElementById('mainStage');
    const instructionPanelEl = document.getElementById('instructionPanel');
    const instructionSectionsEl = document.getElementById('instructionSections');
    const backButtonEl = document.getElementById('backButton');

    function renderHotspots() {
      hotspotsData.forEach(h => {
        const btn = document.createElement('button');
        btn.className = 'interactive-hotspot';
        btn.setAttribute('data-id', h.id);
        btn.innerText = h.label;
        btn.addEventListener('click', () => openInstructionForHotspot(h.id));
        mainStageEl.appendChild(btn);
      });
    }

    function renderInstructionSections() {
      instructionSectionsEl.innerHTML = '';
      hotspotsData.forEach(h => {
        const section = document.createElement('div');
        section.className = 'instruction-section';
        section.id = 'section-' + h.id;
        section.innerHTML = `<strong>${h.sectionTitle}</strong>${h.sectionText}`;
        instructionSectionsEl.appendChild(section);
      });
    }

    function openInstructionForHotspot(id) {
      instructionPanelEl.style.display = 'block';
      const all = instructionSectionsEl.querySelectorAll('.instruction-section');
      all.forEach(a => {
        a.classList.remove('active');
      });

      const target = document.getElementById('section-' + id);
      if (target) {
        target.classList.add('active');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      mainStageEl.style.display = 'none';
    }

    function returnToMainAndFocus() {
      instructionPanelEl.style.display = 'none';
      mainStageEl.style.display = 'grid';
    }

    backButtonEl.addEventListener('click', returnToMainAndFocus);

    renderHotspots();
    renderInstructionSections();