// Datos de hotspots (cada parte del reglamento)
   const hotspotsData = [
     { id: 'h1', label: 'Artículo 1', top: 12, left: 8, width: 18, height: 8,
       sectionTitle: 'Artículo 1: Normas Generales',
       sectionText: '<p>Este artículo establece las normas generales de convivencia y respeto entre los miembros.</p>' },
     { id: 'h2', label: 'Artículo 2', top: 28, left: 50, width: 20, height: 8,
       sectionTitle: 'Artículo 2: Derechos',
       sectionText: '<p>Los miembros tienen derecho a participar en todas las actividades y recibir información clara.</p>' },
     { id: 'h3', label: 'Artículo 3', top: 45, left: 30, width: 22, height: 9,
       sectionTitle: 'Artículo 3: Obligaciones',
       sectionText: '<p>Los miembros deben cumplir con las normas establecidas y respetar las decisiones del comité.</p>' },
     { id: 'h4', label: 'Artículo 4', top: 62, left: 65, width: 20, height: 9,
       sectionTitle: 'Artículo 4: Sanciones',
       sectionText: '<p>El incumplimiento de las normas podrá derivar en sanciones proporcionales a la falta cometida.</p>' },
     { id: 'h5', label: 'Artículo 5', top: 80, left: 20, width: 20, height: 9,
       sectionTitle: 'Artículo 5: Disposiciones Finales',
       sectionText: '<p>Este reglamento entra en vigor a partir de su aprobación y podrá ser modificado por mayoría.</p>' }
   ];

   const mainStageEl = document.getElementById('mainStage');
   const instructionPanelEl = document.getElementById('instructionPanel');
   const instructionSectionsEl = document.getElementById('instructionSections');
   const backButtonEl = document.getElementById('backButton');

   function renderHotspots(){
     while (mainStageEl.querySelector('.interactive-hotspot')) {
       mainStageEl.querySelector('.interactive-hotspot').remove();
     }
     hotspotsData.forEach(h => {
       const btn = document.createElement('button');
       btn.className = 'interactive-hotspot';
       btn.setAttribute('data-id', h.id);
       btn.setAttribute('aria-label', h.label);
       btn.tabIndex = 0;
       btn.style.top = h.top + '%';
       btn.style.left = h.left + '%';
       btn.style.width = h.width + '%';
       btn.style.height = h.height + '%';
       const span = document.createElement('span');
       span.className = 'hotspot-text';
       span.innerText = h.label;
       btn.appendChild(span);
       btn.addEventListener('click', () => openInstructionForHotspot(h.id));
       mainStageEl.appendChild(btn);
     });
   }

   function renderInstructionSections(){
     instructionSectionsEl.innerHTML = '';
     hotspotsData.forEach(h => {
       const section = document.createElement('div');
       section.className = 'instruction-section';
       section.id = 'section-' + h.id;
       section.innerHTML = `<strong>${h.sectionTitle}</strong>${h.sectionText}<div style="margin-top:8px"><button type="button" data-target="${h.id}">Volver al botón</button></div>`;
       instructionSectionsEl.appendChild(section);
     });
     instructionSectionsEl.querySelectorAll('button[data-target]').forEach(b=>{
       b.addEventListener('click', (e)=>{
         const targetId = e.currentTarget.dataset.target;
         returnToMainAndFocus(targetId);
       });
     });
   }

   function openInstructionForHotspot(id){
     instructionPanelEl.classList.add('active');
     instructionPanelEl.setAttribute('aria-hidden','false');
     mainStageEl.style.display = 'none';
     const all = instructionSectionsEl.querySelectorAll('.instruction-section');
     all.forEach(a => a.style.boxShadow = 'none');
     const target = document.getElementById('section-' + id);
     if(target){
       target.style.boxShadow = '0 6px 20px rgba(11,102,255,0.12)';
       target.scrollIntoView({behavior:'smooth', block:'center'});
     }
     history.pushState({view:'instruction', id}, '', '#instructivo-'+id);
   }

   function returnToMainAndFocus(id){
     instructionPanelEl.classList.remove('active');
     instructionPanelEl.setAttribute('aria-hidden','true');
     mainStageEl.style.display = '';
     history.pushState({view:'main'}, '', location.pathname);
     if(id){
       const hs = document.querySelector('.interactive-hotspot[data-id="'+id+'"]');
       if(hs){ hs.focus(); }
     }
   }

   backButtonEl.addEventListener('click', ()=> returnToMainAndFocus());

   renderHotspots();
   renderInstructionSections();

   window.addEventListener('popstate', (e)=>{
     if(e.state && e.state.view === 'instruction'){
       instructionPanelEl.classList.add('active');
       mainStageEl.style.display = 'none';
     } else {
       instructionPanelEl.classList.remove('active');
       mainStageEl.style.display = '';
     }
   });

   document.addEventListener('keydown', (e)=>{
     if(e.key === 'Escape'){
       if(instructionPanelEl.classList.contains('active')) returnToMainAndFocus();
     }
     }
   );