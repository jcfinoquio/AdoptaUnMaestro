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
    window.colegios =[{ id: 1, nombre: "Colegio San José", ciudad: "Sevilla", provincia: "Sevilla", tipo: "Concertado", resumen: "Centro con amplia trayectoria en educación primaria y secundaria.", telefono: "954 123 456", logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop" },
    { id: 2, nombre: "Instituto La Salle", ciudad: "Málaga", provincia: "Málaga", tipo: "Privado", resumen: "Enseñanza personalizada y proyectos tecnológicos.", telefono: "952 987 654", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop" },
    { id: 3, nombre: "CEIP Marismas del Tinto", ciudad: "Huelva", provincia: "Huelva", tipo: "Público", resumen: "Comprometido con la educación pública y la integración.", telefono: "959 456 789", logo: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=400&h=300&fit=crop" },
    { id: 4, nombre: "Colegio Ave María", ciudad: "Granada", provincia: "Granada", tipo: "Concertado", resumen: "Tradición educativa con valores cristianos.", telefono: "958 234 567", logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop" },
    { id: 5, nombre: "Academia Santa Teresa", ciudad: "Cádiz", provincia: "Cádiz", tipo: "Privado", resumen: "Especializado en idiomas y bachillerato internacional.", telefono: "956 345 678", logo: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop" }];
    const colegios = window.colegios; // asume que ya tienes array de colegios
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
  
  if (!modal || !inputTo) return; // Verifica que existan
  
  inputTo.value = email;
  modal.classList.add("active");
}

// Cerrar modal - SÓLO si existe el botón
const closeReplyBtn = document.getElementById("close-reply-modal");
if (closeReplyBtn) {
  closeReplyBtn.addEventListener("click", () => {
    const modal = document.getElementById("reply-modal");
    if (modal) modal.classList.remove("active");
  });
}

// Cerrar al hacer clic fuera - SÓLO si existe el modal
const replyModal = document.getElementById("reply-modal");
if (replyModal) {
  replyModal.addEventListener("click", (e) => {
    if (e.target.id === "reply-modal") {
      e.target.classList.remove("active");
    }
  });
}


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


/* ===========================
   CÓDIGO COMÚN PAGINAS ASIDE
=========================== */
(function () {
  "use strict";

  /* =============
     Utilidades
     ============= */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function safeText(node, fallback = "") {
    return node ? node.textContent.trim() : fallback;
  }

  /* ============================
     Inicialización principal
     ============================ */
  document.addEventListener("DOMContentLoaded", () => {
    // Ejecutar las inicializaciones en orden lógico
    initSidebarActiveLink();
    initToggleExpandButtons();
    initLikeCounters();
    initFAQ();
    initSupportForm();
    initEventRegistration();
    initRecursosActions();
    initForoCreateIfPresent();
    initAccessibilityHelpers();

    // Segunda pasada de comprobaciones (revisión 2)
    // - vuelvo a asegurar handlers ligados y estados iniciales
    ensureReadMoreButtonsState();
    // fin revisión 2
  });

  /* =====================================
     1) Sidebar: marcar enlace activo según body class
     ===================================== */
  function initSidebarActiveLink() {
    try {
      const body = document.body;
      const pageClass = Array.from(body.classList).find((c) =>
        c.startsWith("page-")
      ); // p.ej. page-eventos, page-recursos...
      if (!pageClass) return;

      const mapping = {
        "page-eventos": "eventos-y-talleres.html",
        "page-recursos": "recursos-educativos.html",
        "page-foros": "foros.html",
        "page-sobre": "sobre-nosotros.html",
        "page-ayuda": "ayuda.html",
        "page-empleos": "empleos.html",
        "page-perfil": "perfil.html",
      };

      const targetHref = mapping[pageClass] || null;
      if (!targetHref) return;

      const links = $$("nav.menu a, .side-links a");
      links.forEach((a) => {
        try {
          const href = a.getAttribute("href");
          if (!href) return;
          if (href.includes(targetHref) || href === targetHref) {
            a.classList.add("active-link");
            // estilo accesible: aria-current
            a.setAttribute("aria-current", "page");
          } else {
            a.classList.remove("active-link");
            a.removeAttribute("aria-current");
          }
        } catch (e) {
          // ignore
        }
      });
    } catch (e) {
      // no crítico
      console.warn("initSidebarActiveLink:", e);
    }
  }

  /* =============================
     2) Botones "Leer más" -> expandir tarjetas (empleos, ofertas...)
     ============================= */
  // Este nombre existe en algunos HTML como onclick="toggleExpand(this)"
  window.toggleExpand = function (btn) {
    // botón dentro de .job-offer
    if (!btn) return;
    const offer = btn.closest(".job-offer");
    if (!offer) return;
    const expanded = offer.classList.toggle("expanded");
    btn.textContent = expanded ? "Leer menos" : "Leer más";
    // A11y
    btn.setAttribute("aria-expanded", String(expanded));
  };

  function initToggleExpandButtons() {
    try {
      const buttons = $$(
        ".read-more-btn, .read-more-butn, .btn.read-more, button.read-more-btn"
      );
      buttons.forEach((btn) => {
        // si ya se usa onclick inline, respetamos. Si no, añadimos listener.
        if (!btn.getAttribute("data-listener")) {
          btn.addEventListener("click", (e) => {
            // si el HTML ya tiene onclick="toggleExpand(this)" entonces funcionará igual
            window.toggleExpand(btn);
          });
          btn.setAttribute("data-listener", "1");
        }
      });
    } catch (e) {
      console.warn("initToggleExpandButtons:", e);
    }
  }

  function ensureReadMoreButtonsState() {
    // Segunda pasada: aseguramos que el texto coincide con el estado inicial
    $$(".job-offer").forEach((offer) => {
      const btn = $(".read-more-btn", offer);
      if (btn) {
        const expanded = offer.classList.contains("expanded");
        btn.textContent = expanded ? "Leer menos" : "Leer más";
        btn.setAttribute("aria-expanded", String(expanded));
      }
    });
  }

  /* =============================
     3) Contadores de "likes" (perfil.html entradas)
     ============================= */
  function initLikeCounters() {
    try {
      const likeButtons = $$(".contador-likes");
      likeButtons.forEach((btn) => {
        if (btn._likesInit) return;
        btn._likesInit = true;

        btn.addEventListener("click", (e) => {
          // toggle local pressed state
          const pressed = btn.getAttribute("aria-pressed") === "true";
          const newPressed = !pressed;
          btn.setAttribute("aria-pressed", String(newPressed));

          // buscar span interno y sumar o restar
          const span = btn.querySelector("span");
          if (!span) return;
          let n = parseInt(span.textContent || "0", 10);
          if (Number.isNaN(n)) n = 0;
          n = newPressed ? n + 1 : Math.max(0, n - 1);
          span.textContent = n;

          // simple animación (clase temporal)
          btn.classList.add("liked");
          setTimeout(() => btn.classList.remove("liked"), 300);
        });
      });
    } catch (e) {
      console.warn("initLikeCounters:", e);
    }
  }

  /* =============================
     4) FAQ expand/collapse (ayuda.html)
     ============================= */
  function initFAQ() {
    try {
      const faqs = $$(".faq-item");
      faqs.forEach((item, index) => {
        const header =
          item.querySelector("h3") ||
          item.querySelector("summary") ||
          item.firstElementChild;
        if (!header) return;

        // ensure aria attributes
        item.setAttribute("role", "region");
        const content = Array.from(item.children).filter(
          (c) => c !== header && !(c.tagName === "HR")
        );
        // hide content except first paragraph by default
        if (!item.classList.contains("expanded")) {
          content.forEach((c) => (c.style.display = "none"));
        } else {
          content.forEach((c) => (c.style.display = ""));
        }

        header.setAttribute("tabindex", "0");
        header.setAttribute("role", "button");
        header.setAttribute("aria-expanded", item.classList.contains("expanded"));
        header.addEventListener("click", () => toggleFAQ(item, header, content));
        header.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault();
            toggleFAQ(item, header, content);
          }
        });
      });
    } catch (e) {
      console.warn("initFAQ:", e);
    }
  }

  function toggleFAQ(item, header, contentNodes) {
    const expanded = item.classList.toggle("expanded");
    header.setAttribute("aria-expanded", String(expanded));
    contentNodes.forEach((n) => {
      n.style.display = expanded ? "" : "none";
    });
  }

  /* =============================
     5) Formulario de soporte (ayuda) — validación simple y feedback
     ============================= */
  function initSupportForm() {
    try {
      const form = $(".support-form");
      if (!form) return;

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        // simple validación
        const name = form.querySelector('input[type="text"]');
        const email = form.querySelector('input[type="email"]');
        const textarea = form.querySelector("textarea");
        const errors = [];

        if (!name || name.value.trim().length < 2) {
          errors.push("Nombre (mínimo 2 caracteres)");
        }
        if (!email || !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
          errors.push("Email válido");
        }
        if (!textarea || textarea.value.trim().length < 10) {
          errors.push("Mensaje (mínimo 10 caracteres)");
        }

        // limpiar mensajes anteriores
        const old = form.querySelector(".form-feedback");
        if (old) old.remove();

        const feedback = document.createElement("div");
        feedback.className = "form-feedback";
        feedback.style.marginTop = "12px";

        if (errors.length) {
          feedback.innerHTML =
            "<strong>Por favor corrige los siguientes errores:</strong><ul>" +
            errors.map((e) => `<li>${e}</li>`).join("") +
            "</ul>";
          feedback.style.color = "#b00020";
          form.appendChild(feedback);
          // focus en primer campo con error
          if (errors[0].includes("Nombre")) name.focus();
          else if (errors[0].includes("Email")) email.focus();
          else textarea.focus();
          return;
        }

        // Simular envío (sin backend): mostrar mensaje de éxito y limpiar campos
        feedback.innerHTML =
          "<strong>Mensaje enviado correctamente.</strong> Nuestro equipo te responderá en breve.";
        feedback.style.color = "#094032";
        form.appendChild(feedback);

        // opcional: limpiar
        name.value = "";
        email.value = "";
        textarea.value = "";
      });
    } catch (e) {
      console.warn("initSupportForm:", e);
    }
  }

  /* =============================
     6) Eventos: "Inscribirme" simulación
     ============================= */
  function initEventRegistration() {
    try {
      // delegado: escucha clicks en botones dentro de .evento-card
      document.addEventListener("click", (e) => {
        const btn = e.target.closest(".evento-card .btn, .evento-card .btn-primary, .evento-card .btn-outline");
        if (!btn) return;
        const card = btn.closest(".evento-card");
        if (!card) return;

        // si el botón tiene data-action="register" o es btn-primary dentro de evento-card -> inscribir
        const isRegister = btn.classList.contains("btn-primary") && !btn.classList.contains("btn-outline");
        if (isRegister) {
          // toggle inscrito
          const registered = card.classList.toggle("registered");
          btn.textContent = registered ? "Inscrito" : "Inscribirme";
          btn.disabled = registered;
          // accesibilidad
          btn.setAttribute("aria-pressed", String(!!registered));
          // animación breve
          card.classList.add("flash");
          setTimeout(() => card.classList.remove("flash"), 500);
        }
      });
    } catch (e) {
      console.warn("initEventRegistration:", e);
    }
  }

  /* =============================
     7) Recursos: descargar / abrir (simulación)
     ============================= */
  function initRecursosActions() {
    try {
      document.addEventListener("click", (e) => {
        const btn = e.target.closest(".recurso-card .btn, .recurso-card .btn-primary, .recurso-card .btn-outline");
        if (!btn) return;
        const card = btn.closest(".recurso-card");
        if (!card) return;
        const title = safeText(card.querySelector("h3"), "recurso");

        // Simular descarga / apertura
        if (btn.classList.contains("btn-primary") && !btn.classList.contains("btn-outline")) {
          // "Descargar" o "Acceder"
          // Crear blob temporal con contenido de muestra (no persistente)
          try {
            const sample = `Recurso: ${title}\nGenerado por Adopta un Maestro - simulación de descarga.`;
            const blob = new Blob([sample], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = (title.replace(/\s+/g, "_").toLowerCase() || "recurso") + ".txt";
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 2000);
          } catch (err) {
            console.warn("download simulation failed", err);
          }
        } else {
          // Ver plantillas / Abrir (btn-outline)
          // Mostrar feedback ligero
          const msg = document.createElement("div");
          msg.className = "recurso-feedback";
          msg.textContent = `Abriendo "${title}"... (simulación)`;
          msg.style.marginTop = "8px";
          card.appendChild(msg);
          setTimeout(() => msg.remove(), 2200);
        }
      });
    } catch (e) {
      console.warn("initRecursosActions:", e);
    }
  }

  /* =============================
     8) Foros: creación simple de hilos si existe formulario
     ============================= */
  function initForoCreateIfPresent() {
    try {
      const form = $("#foro-create-form");
      const list = $("#foro-list");
      if (!form || !list) return;

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = safeText(form.querySelector('input[name="title"]')) || form.querySelector('input[name="title"]').value;
        const body = form.querySelector('textarea[name="body"]').value || "";

        if (!title || title.trim().length < 3) {
          showTemporaryMessage(form, "El título debe tener al menos 3 caracteres.", true);
          return;
        }
        if (!body || body.trim().length < 5) {
          showTemporaryMessage(form, "El mensaje debe tener al menos 5 caracteres.", true);
          return;
        }

        // construir hilo minimalista
        const item = document.createElement("article");
        item.className = "foro-card";
        item.innerHTML = `
          <h3>${escapeHtml(title)}</h3>
          <p class="foro-meta">0 respuestas · nuevo</p>
          <p>${escapeHtml(body)}</p>
          <div class="foro-actions">
            <button class="btn btn-outline btn-reply">Responder</button>
            <button class="btn btn-primary btn-open">Abrir</button>
          </div>
        `;
        list.prepend(item);
        form.reset();
        showTemporaryMessage(form, "Hilo creado correctamente.", false);

        // opcional: scroll al hilo
        item.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (e) {
      console.warn("initForoCreateIfPresent:", e);
    }
  }

  // helper mensajes temporales
  function showTemporaryMessage(container, text, isError = false) {
    const msg = document.createElement("div");
    msg.className = "temp-msg";
    msg.textContent = text;
    msg.style.padding = "10px";
    msg.style.marginTop = "8px";
    msg.style.borderRadius = "8px";
    msg.style.color = isError ? "#7a0b15" : "#063";
    msg.style.background = isError ? "rgba(186, 84, 84, 0.08)" : "rgba(9, 64, 50, 0.06)";
    container.appendChild(msg);
    setTimeout(() => msg.remove(), 2800);
  }

  // escape básico para html
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* =============================
     9) Pequeños helpers de accesibilidad y comportamiento
     ============================= */
  function initAccessibilityHelpers() {
    try {
      // añadir focus visible class para teclado
      document.body.addEventListener("keydown", (e) => {
        if (e.key === "Tab") document.body.classList.add("show-focus");
      });
      document.body.addEventListener("mousedown", () => {
        document.body.classList.remove("show-focus");
      });

      // aria labels para botones de sidebar si no los tienen
      $$(".side-links a").forEach((a) => {
        if (!a.hasAttribute("aria-label")) {
          a.setAttribute("aria-label", a.textContent.trim());
        }
      });
    } catch (e) {
      console.warn("initAccessibilityHelpers:", e);
    }
  }

})();
