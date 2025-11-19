document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
     LOGIN
  =========================== */
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    const mensaje = document.getElementById("mensaje");
    const inputEmail = document.getElementById("mail");
    const inputPassword = document.getElementById("password");
    const loginOverlay = document.getElementById("login-overlay");
    const btnCerrarModal = document.getElementById("cerrar-modal");

    const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    document.getElementById('abrir-modal')?.addEventListener('click', () => {
      loginOverlay.classList.add('active');
      document.body.classList.add('modal-active');
    });

    [inputEmail, inputPassword].forEach(input => {
      input.addEventListener("blur", () => {
        const valor = input.value.trim();
        if (!valor) return mostrarMensaje("", "");

        if (input === inputEmail) {
          mostrarMensaje(!validarEmail(valor) ? "Formato de correo inválido." : "", !validarEmail(valor) ? "red" : "");
        }

        if (input === inputPassword) {
          mostrarMensaje(valor.length < 4 ? "La contraseña es demasiado corta." : "", valor.length < 4 ? "red" : "");
        }
      });
    });

    btnCerrarModal?.addEventListener('click', cerrarModal);
    loginOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) cerrarModal();
    });

    function cerrarModal() {
      loginOverlay.classList.remove('active');
      document.body.classList.remove('modal-active');
      mensaje.textContent = '';
      loginForm.reset();
    }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = inputEmail.value.trim();
      const password = inputPassword.value;

      if (!email) return mostrarMensaje("Por favor, introduce tu correo electrónico.", "red");
      if (!validarEmail(email)) return mostrarMensaje("El formato del correo electrónico no es válido.", "red");
      if (!password) return mostrarMensaje("Por favor, introduce tu contraseña.", "red");

      mostrarMensaje("Iniciando sesión...", "blue");
      setTimeout(() => {
        if (email === "usuario@ejemplo.com" && password === "123456") {
          mostrarMensaje("¡Login exitoso! ✅", "green");
          setTimeout(() => { cerrarModal(); alert("Bienvenido!"); }, 1000);
        } else {
          mostrarMensaje("Credenciales incorrectas. Inténtalo de nuevo.", "red");
        }
      }, 1500);
    });

    function mostrarMensaje(texto, color) {
      mensaje.textContent = texto;
      mensaje.style.color = color;
    }
  }

  /* ===========================
     EMPLEOS
  =========================== */
  window.toggleExpand = function (btn) {
    const jobOffer = btn.closest('.job-offer');
    if (jobOffer) {
      jobOffer.classList.toggle("expanded");
      btn.textContent = jobOffer.classList.contains("expanded") ? "Leer menos" : "Leer más";
    }
  };

  document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', function () { window.toggleExpand(this); });
  });

  document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent === 'Postularme') {
      button.addEventListener('click', function () {
        alert('¡Postulación enviada correctamente!');
        this.textContent = 'Postulado';
        this.classList.remove('btn-primary');
        this.classList.add('btn-success');
        this.disabled = true;
      });
    }
  });
  /* ===========================
     CONTADORES DE VISITAS
  =========================== */
  document.querySelectorAll("[id^='visitas-']").forEach(el => {
    const key = el.id;
    let visitas = parseInt(localStorage.getItem(key)) || 0;
    visitas++;
    localStorage.setItem(key, visitas);
    el.textContent = visitas;
  });
  /* ===========================
     CONTADORES DE LIKES
  =========================== */
  document.querySelectorAll("[id^='contador-likes']").forEach(btn => {
    const idNum = btn.id.replace("contador-likes", "");
    const display = document.getElementById(`numero-likes${idNum}`);
    if (!display) return;

    const STORAGE_KEY = `likes-count${idNum}`;
    const USER_LIKED_KEY = `user-liked${idNum}`;

    let likes = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
    display.textContent = likes;

    if (sessionStorage.getItem(USER_LIKED_KEY) === "true") {
      btn.classList.add("clicado");
      btn.disabled = true;
    }

    btn.addEventListener("click", () => {
      if (!sessionStorage.getItem(USER_LIKED_KEY)) {
        likes++;
        display.textContent = likes;
        localStorage.setItem(STORAGE_KEY, likes);
        btn.classList.add("clicado");
        btn.disabled = true;
        sessionStorage.setItem(USER_LIKED_KEY, "true");
      }
    });
  });
  /* ===========================
     REGISTRO
  =========================== */
  const registroForm = document.getElementById('registroForm');
  if (registroForm) {
    const rolSelect = document.getElementById('rol');
    const bloqueMaestro = document.getElementById('bloqueMaestro');
    const bloqueCentro = document.getElementById('bloqueCentro');
    const formacionesCont = document.getElementById('formacionesContenedor');
    const btnAddForm = document.getElementById('btnAddForm');

    function mostrarBloque(rol) {
      if (bloqueMaestro) bloqueMaestro.classList.toggle('hidden', rol !== 'maestro');
      if (bloqueCentro) bloqueCentro.classList.toggle('hidden', rol !== 'centro');
    }

    rolSelect?.addEventListener('change', e => mostrarBloque(e.target.value));
    if (rolSelect) mostrarBloque(rolSelect.value);

    let formCount = 0;
    btnAddForm?.addEventListener('click', () => {
      formCount++;
      const wrapper = document.createElement('div');
      wrapper.className = 'formation-block';
      wrapper.innerHTML = `
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <div style="flex:1 1 45%;"><label>Título</label><input name="formacion[${formCount}][titulo]" type="text" placeholder="Título" /></div>
          <div style="flex:1 1 45%;"><label>Centro formador</label><input name="formacion[${formCount}][centroFormador]" type="text" placeholder="Centro formador" /></div>
          <div style="flex:1 1 30%;"><label>Año fin</label><input name="formacion[${formCount}][anioFin]" type="number" min="1900" max="2100" /></div>
          <div style="flex:1 1 30%;"><label>Tipo</label><input name="formacion[${formCount}][tipoFormacion]" type="text" placeholder="Tipo" /></div>
        </div>
        <div style="text-align:right;margin-top:8px;">
          <button type="button" class="btn-cancel" onclick="this.closest('.formation-block').remove()">Eliminar</button>
        </div>
      `;
      formacionesCont.appendChild(wrapper);
    });

    registroForm.addEventListener('submit', e => {
      if (!registroForm.checkValidity()) {
        e.preventDefault();
        registroForm.reportValidity();
      }
    });
  }
  /* ===========================
     COLEGIOS Y MODAL
  =========================== */
  const resultadosColegios = document.getElementById('resultados');
  if (resultadosColegios) {
    const colegios = window.colegios || []; // asume que ya tienes array de colegios
    const PER_PAGE = 15;
    let state = { q: '', provincia: '', tipo: '', page: 1 };

    const buscarEl = document.getElementById('buscar');
    const filtroProvincia = document.getElementById('filtroProvincia');
    const filtroTipo = document.getElementById('filtroTipo');
    const btnLimpiar = document.getElementById('btnLimpiar');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    const colegiosModalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalLogo = document.getElementById('modalLogo');
    const modalProvinciaTipo = document.getElementById('modalProvinciaTipo');
    const modalCiudad = document.getElementById('modalCiudad');
    const modalDescripcion = document.getElementById('modalDescripcion');
    const modalTelefono = document.getElementById('modalTelefono');
    const modalContactBtn = document.getElementById('modalContactBtn');
    const modalGoPerfil = document.getElementById('modalGoPerfil');

    let lastFocusedElement = null;

    function filtrarDatos() {
      const q = state.q.toLowerCase().trim();
      return colegios.filter(c =>
        ((c.nombre + ' ' + c.ciudad + ' ' + c.resumen + ' ' + c.provincia).toLowerCase().includes(q)) &&
        (!state.provincia || c.provincia === state.provincia) &&
        (!state.tipo || c.tipo === state.tipo)
      );
    }

    function render() {
      resultadosColegios.setAttribute('aria-busy', 'true');
      const datos = filtrarDatos();
      const totalPages = Math.max(1, Math.ceil(datos.length / PER_PAGE));
      state.page = Math.min(state.page, totalPages);
      const start = (state.page - 1) * PER_PAGE;
      const pageItems = datos.slice(start, start + PER_PAGE);

      resultadosColegios.innerHTML = pageItems.map(c => `
        <article class="colegio-card" role="article" aria-labelledby="colegio-${c.id}">
          <div class="colegio-logo" style="background-image:url('${c.logo}')" role="img" aria-label="${c.nombre} logo"></div>
          <div class="colegio-meta">
            <h4 id="colegio-${c.id}">${c.nombre}</h4>
            <p><strong>${c.ciudad}</strong> · ${c.provincia}</p>
            <p>${c.resumen}</p>
            <div class="colegio-badges"><span class="badge">${c.tipo}</span></div>
          </div>
          <div class="colegio-actions">
            <button class="btn-outline btn-view" data-id="${c.id}" aria-label="Ver ficha de ${c.nombre}">Ver ficha</button>
            <button class="btn-primary btn" data-contact="${c.id}">Contactar centro</button>
          </div>
        </article>
      `).join('');

      pageInfo && (pageInfo.textContent = `${state.page} / ${totalPages}`);
      prevBtn && (prevBtn.disabled = state.page <= 1);
      nextBtn && (nextBtn.disabled = state.page >= totalPages);
      resultadosColegios.setAttribute('aria-busy', 'false');
    }

    function openModalFor(id, opener) {
      const c = colegios.find(x => x.id === id);
      if (!c) return;
      lastFocusedElement = opener || document.activeElement;

      modalTitle.textContent = c.nombre;
      modalLogo.style.backgroundImage = `url('${c.logo}')`;
      modalProvinciaTipo.textContent = `${c.tipo} · ${c.provincia}`;
      modalCiudad.textContent = `Ciudad: ${c.ciudad}`;
      modalDescripcion.textContent = c.resumen;
      modalTelefono.textContent = `Teléfono: ${c.telefono}`;
      modalGoPerfil && (modalGoPerfil.href = `./detalle-colegio.html?id=${c.id}`);

      modalContactBtn && (modalContactBtn.onclick = () => alert(`Solicitud de contacto enviada a ${c.nombre}. Tel: ${c.telefono}`));

      colegiosModalOverlay?.classList.add('open');
      colegiosModalOverlay?.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
      colegiosModalOverlay?.classList.remove('open');
      colegiosModalOverlay?.setAttribute('aria-hidden', 'true');
      lastFocusedElement?.focus();
    }

    colegiosModalOverlay?.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
    modalCloseBtn?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    buscarEl?.addEventListener('input', e => { state.q = e.target.value; state.page = 1; render(); });
    filtroProvincia?.addEventListener('change', e => { state.provincia = e.target.value; state.page = 1; render(); });
    filtroTipo?.addEventListener('change', e => { state.tipo = e.target.value; state.page = 1; render(); });
    btnLimpiar?.addEventListener('click', () => { buscarEl && (buscarEl.value = ''); filtroProvincia && (filtroProvincia.value = ''); filtroTipo && (filtroTipo.value = ''); state = { q: '', provincia: '', tipo: '', page: 1 }; render(); });
    prevBtn?.addEventListener('click', () => { if (state.page > 1) { state.page--; render(); } });
    nextBtn?.addEventListener('click', () => { state.page++; render(); });

    resultadosColegios.addEventListener('click', e => {
      if (e.target.classList.contains('btn-view')) openModalFor(Number(e.target.dataset.id), e.target);
      const contactBtn = e.target.closest('[data-contact]');
      if (contactBtn) { const c = colegios.find(x => x.id == Number(contactBtn.dataset.contact)); if (c) alert(`Solicitud de contacto enviada a ${c.nombre}. Teléfono: ${c.telefono}`); }
    });

    render();
  }
  /* ===========================
    LISTADO MAESTROS
  =========================== */
  const maestrosResultadosEl = document.getElementById('maestrosResultados');

  if (maestrosResultadosEl) {
    // Datos de ejemplo con imágenes reales
    const maestros = [
      {
        id: 1,
        nombre: 'María López',
        especialidad: 'Primaria',
        anios: 6,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
        resumen: 'Maestra con experiencia en metodologías activas y aprendizaje cooperativo.'
      },
      {
        id: 2,
        nombre: 'Carlos Ruiz',
        especialidad: 'Inglés',
        anios: 8,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
        resumen: 'Profesor B2 certificado, experiencia en infantil y primaria.'
      },
      {
        id: 3,
        nombre: 'Ana Pérez',
        especialidad: 'Matemáticas',
        anios: 4,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
        resumen: 'Apasionada por el razonamiento lógico y creativo en matemáticas.'
      },
      {
        id: 4,
        nombre: 'Javier Gómez',
        especialidad: 'Educación Física',
        anios: 12,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
        resumen: 'Entrenador y profesor con enfoque inclusivo y saludable.'
      },
      {
        id: 5,
        nombre: 'Lucía Martín',
        especialidad: 'Inglés',
        anios: 3,
        avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=200&h=200&fit=crop&crop=face',
        resumen: 'Formación en TEFL y experiencia internacional en UK.'
      },
      {
        id: 6,
        nombre: 'Miguel Torres',
        especialidad: 'Educación Física',
        anios: 10,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
        resumen: 'Entrenador y maestro de deportes, fomenta hábitos saludables y trabajo en equipo.'
      },
      {
        id: 7,
        nombre: 'Sofía Ramírez',
        especialidad: 'Arte',
        anios: 6,
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face',
        resumen: 'Creativa y apasionada por el arte y la expresión visual en la educación.'
      },
      {
        id: 8,
        nombre: 'Pedro Sánchez',
        especialidad: 'Música',
        anios: 8,
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&crop=face',
        resumen: 'Profesor de música con experiencia en coro, instrumentos y pedagogía musical.'
      },
      {
        id: 9,
        nombre: 'Isabel Navarro',
        especialidad: 'Inglés',
        anios: 9,
        avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a2c9f2?w=200&h=200&fit=crop&crop=face',
        resumen: 'Maestra con certificación C1, especializada en enseñanza divertida e interactiva.'
      },
      {
        id: 10,
        nombre: 'Antonio Herrera',
        especialidad: 'Matemáticas',
        anios: 12,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
        resumen: 'Profesor con amplia experiencia en secundaria y preparación de exámenes.'
      },
      {
        id: 11,
        nombre: 'Elena Díaz',
        especialidad: 'Ciencias Sociales',
        anios: 5,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
        resumen: 'Apasionada por la historia y geografía, fomenta debates y pensamiento crítico.'
      },
      {
        id: 12,
        nombre: 'Luis Gómez',
        especialidad: 'Tecnología',
        anios: 7,
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop&crop=face',
        resumen: 'Profesor de informática y programación, motivador del aprendizaje digital.'
      },
      {
        id: 13,
        nombre: 'Marta Vázquez',
        especialidad: 'Educación Infantil',
        anios: 4,
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face',
        resumen: 'Experta en desarrollo infantil, juegos educativos y atención individualizada.'
      },
      {
        id: 14,
        nombre: 'Diego Ruiz',
        especialidad: 'Química',
        anios: 8,
        avatar: 'https://images.unsplash.com/photo-1521120098172-760b0c03c8e5?w=200&h=200&fit=crop&crop=face',
        resumen: 'Profesor entusiasta de laboratorio, fomenta experimentos prácticos y seguros.'
      },
      {
        id: 15,
        nombre: 'Laura Morales',
        especialidad: 'Física',
        anios: 6,
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&crop=face',
        resumen: 'Apasionada por la física aplicada y el pensamiento crítico en ciencias.'
      },
      {
        id: 16,
        nombre: 'Jorge Castillo',
        especialidad: 'Geografía',
        anios: 7,
        avatar: 'https://images.unsplash.com/photo-1502767089025-6572583495b0?w=200&h=200&fit=crop&crop=face',
        resumen: 'Fomenta el conocimiento del mundo y la cultura a través de proyectos prácticos.'
      },
      {
        id: 17,
        nombre: 'Patricia Blanco',
        especialidad: 'Lengua y Literatura',
        anios: 9,
        avatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=200&h=200&fit=crop&crop=face',
        resumen: 'Maestra creativa en lectura, escritura y análisis literario.'
      },
      {
        id: 18,
        nombre: 'Fernando Herrera',
        especialidad: 'Educación Física',
        anios: 11,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
        resumen: 'Profesor de deportes y hábitos saludables, especialista en coordinación motriz.'
      },
      {
        id: 19,
        nombre: 'Raquel Jiménez',
        especialidad: 'Arte',
        anios: 5,
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face',
        resumen: 'Fomenta la creatividad y el pensamiento visual en proyectos artísticos.'
      },
      {
        id: 20,
        nombre: 'Alberto Santos',
        especialidad: 'Música',
        anios: 6,
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&crop=face',
        resumen: 'Profesor de música con experiencia en instrumentos y teoría musical.'
      },
      {
        id: 21,
        nombre: 'Silvia Ramos',
        especialidad: 'Inglés',
        anios: 10,
        avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a2c9f2?w=200&h=200&fit=crop&crop=face',
        resumen: 'Enseña inglés de forma interactiva y divertida para primaria y secundaria.'
      },
      {
        id: 22,
        nombre: 'Ricardo Medina',
        especialidad: 'Matemáticas',
        anios: 8,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face',
        resumen: 'Apasionado por el razonamiento lógico y resolución de problemas prácticos.'
      },
      {
        id: 23,
        nombre: 'Mónica Fuentes',
        especialidad: 'Ciencias Sociales',
        anios: 6,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
        resumen: 'Especialista en historia, geografía y proyectos interdisciplinarios.'
      },
      {
        id: 24,
        nombre: 'Víctor Delgado',
        especialidad: 'Tecnología',
        anios: 7,
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop&crop=face',
        resumen: 'Profesor de informática y robótica educativa, motivador del aprendizaje digital.'
      }, {
        id: 25,
        nombre: 'Javier Morales',
        especialidad: 'Ciencias Naturales',
        anios: 7,
        avatar: 'https://images.unsplash.com/photo-1502767089025-6572583495b0?w=200&h=200&fit=crop&crop=face',
        resumen: 'Profesor dedicado a fomentar la curiosidad y el pensamiento crítico en ciencias.'
      },
      {
        id: 26,
        nombre: 'Lucía Fernández',
        especialidad: 'Lengua y Literatura',
        anios: 5,
        avatar: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=200&h=200&fit=crop&crop=face',
        resumen: 'Especialista en escritura creativa y comprensión lectora en primaria y secundaria.'
      }
    ];

    const MAESTROS_PER_PAGE = 15;
    let maestrosState = { q: '', especialidad: '', page: 1 };

    const maestrosBuscarEl = document.getElementById('maestrosBuscar');
    const filtroEspecialidadEl = document.getElementById('filtroEspecialidad');
    const btnMaestrosLimpiar = document.getElementById('btnMaestrosLimpiar');
    const maestrosPrevBtn = document.getElementById('maestrosPrevPage');
    const maestrosNextBtn = document.getElementById('maestrosNextPage');
    const maestrosPageInfo = document.getElementById('maestrosPageInfo');
    const maestrosResultsInfo = document.getElementById('maestrosResultsInfo');
    const maestrosResultsCount = document.getElementById('maestrosResultsCount');

    function setupEventListeners() {
      if (maestrosBuscarEl) {
        maestrosBuscarEl.addEventListener('input', e => {
          maestrosState.q = e.target.value;
          maestrosState.page = 1;
          renderMaestros();
        });
      }

      if (filtroEspecialidadEl) {
        filtroEspecialidadEl.addEventListener('change', e => {
          maestrosState.especialidad = e.target.value;
          maestrosState.page = 1;
          renderMaestros();
        });
      }

      if (btnMaestrosLimpiar) {
        btnMaestrosLimpiar.addEventListener('click', () => {
          if (maestrosBuscarEl) maestrosBuscarEl.value = '';
          if (filtroEspecialidadEl) filtroEspecialidadEl.value = '';
          maestrosState.q = '';
          maestrosState.especialidad = '';
          maestrosState.page = 1;
          renderMaestros();
        });
      }

      if (maestrosPrevBtn) {
        maestrosPrevBtn.addEventListener('click', () => {
          if (maestrosState.page > 1) {
            maestrosState.page--;
            renderMaestros();
          }
        });
      }

      if (maestrosNextBtn) {
        maestrosNextBtn.addEventListener('click', () => {
          maestrosState.page++;
          renderMaestros();
        });
      }

      // Event delegation para botones de contacto
      maestrosResultadosEl.addEventListener('click', e => {
        const btn = e.target.closest('[data-contact]');
        if (btn) {
          const id = Number(btn.dataset.contact);
          const m = maestros.find(x => x.id === id);
          if (m) {
            alert(`Solicitud de contacto enviada a ${m.nombre}.`);
          }
        }
      });
    }

    function filtrarMaestros() {
      const q = maestrosState.q.toLowerCase().trim();
      return maestros.filter(m =>
        ((m.nombre + ' ' + m.especialidad + ' ' + m.resumen).toLowerCase().includes(q)) &&
        (!maestrosState.especialidad || m.especialidad === maestrosState.especialidad)
      );
    }

    function renderMaestros() {
      maestrosResultadosEl.setAttribute('aria-busy', 'true');
      const datos = filtrarMaestros();
      const totalPages = Math.max(1, Math.ceil(datos.length / MAESTROS_PER_PAGE));
      maestrosState.page = Math.min(maestrosState.page, totalPages);
      const start = (maestrosState.page - 1) * MAESTROS_PER_PAGE;
      const pageItems = datos.slice(start, start + MAESTROS_PER_PAGE);

      // Actualizar contador de resultados
      if (maestrosResultsCount) {
        maestrosResultsCount.textContent = datos.length;
      }

      if (pageItems.length === 0) {
        maestrosResultadosEl.innerHTML = `
                <div class="maestros-empty-state" style="grid-column: 1 / -1;">
                    <h3>No se encontraron maestros</h3>
                    <p>Intenta ajustar tus filtros de búsqueda</p>
                    <button class="btn-maestros-outline" onclick="document.getElementById('btnMaestrosLimpiar')?.click()">Limpiar filtros</button>
                </div>
            `;
      } else {
        maestrosResultadosEl.innerHTML = pageItems.map(m => `
                <article class="maestro-card" role="article" aria-labelledby="maestro-${m.id}">
                    <div class="maestro-avatar" style="background-image:url('${m.avatar}')" role="img" aria-label="${m.nombre}"></div>
                    <div class="maestro-meta">
                        <h4 id="maestro-${m.id}">${m.nombre}</h4>
                        <p><strong>${m.especialidad}</strong> · ${m.anios} años exp.</p>
                        <p>${m.resumen}</p>
                        <div class="maestro-badges">
                            <span class="maestro-badge">${m.anios}+ años</span>
                            <span class="maestro-badge">${m.especialidad}</span>
                        </div>
                    </div>
                    <div class="maestro-actions">
                        <a class="btn-maestros-outline" href="./perfil.html?maestro=${m.id}">Ver perfil</a>
                        <button class="btn-maestros-primary" data-contact="${m.id}">Contactar</button>
                    </div>
                </article>
            `).join('');
      }

      if (maestrosPageInfo) {
        maestrosPageInfo.textContent = `${maestrosState.page} / ${totalPages}`;
      }
      if (maestrosPrevBtn) {
        maestrosPrevBtn.disabled = maestrosState.page <= 1;
      }
      if (maestrosNextBtn) {
        maestrosNextBtn.disabled = maestrosState.page >= totalPages;
      }
      maestrosResultadosEl.setAttribute('aria-busy', 'false');
    }
    // Inicializar
    setupEventListeners();
    renderMaestros();

/*=======================
MENSAJES
======================= */

  }
})

// Abrir modal y cargar email
function openReplyModal(email) {
    const modal = document.getElementById("reply-modal");
    const inputTo = document.getElementById("reply-to");

    inputTo.value = email;      // Rellena el campo "Para:"
    modal.classList.add("active"); // Muestra el modal
}

// Cerrar modal
document.getElementById("close-reply-modal").addEventListener("click", () => {
    document.getElementById("reply-modal").classList.remove("active");
});

// También cerrar si se hace clic fuera de la ventana
document.getElementById("reply-modal").addEventListener("click", (e) => {
    if (e.target.id === "reply-modal") {
        e.target.classList.remove("active");
    }
});



function toggleExpandM(button) {
    const msgContainer = button.closest(".message-box");
    const expandedClass = "msg-expanded-unique";
    const initialHeight = "20vh";

    // Si se está expandiendo
    if (!msgContainer.classList.contains(expandedClass)) {
        msgContainer.classList.add(expandedClass);

        // Poner altura automática para medir el contenido
        msgContainer.style.maxHeight = msgContainer.scrollHeight + "px";

        button.textContent = "Leer menos";
    }
    // Si se está contrayendo
    else {
        msgContainer.classList.remove(expandedClass);

        msgContainer.style.maxHeight = initialHeight;

        button.textContent = "Leer más";
    }
}

// ==================
// PERFIL
//=========================
// Handlers para likes (guardado en sessionStorage)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.contador-likes');
      if (!btn) return;
      const id = btn.dataset.id;
      const key = 'likes_pub_' + id;
      const current = Number(sessionStorage.getItem(key) || 0);
      const newVal = current + 1;
      sessionStorage.setItem(key, newVal);
      const span = btn.querySelector('span');
      if (span) span.textContent = newVal;
      btn.setAttribute('aria-pressed', 'true');
    });

    // Inicializar visitas (ejemplo)
    ['1', '2', '3'].forEach(id => {
      const visitasEl = document.getElementById('visitas-publi' + id);
      if (visitasEl && !sessionStorage.getItem('visitas_pub_' + id)) {
        sessionStorage.setItem('visitas_pub_' + id, Math.floor(Math.random() * 120));
      }
      if (visitasEl) visitasEl.textContent = sessionStorage.getItem('visitas_pub_' + id) || '0';
    });
    const vp = document.getElementById('visitas-perfil');
    if (vp && !sessionStorage.getItem('visitas_perfil')) sessionStorage.setItem('visitas_perfil', Math.floor(Math.random() * 400));
    if (vp) vp.textContent = sessionStorage.getItem('visitas_perfil') || '0';

















