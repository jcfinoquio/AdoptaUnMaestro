document.addEventListener("DOMContentLoaded", () => {
  // ===========================
// FORMULARIO DE LOGIN
// ===========================
const loginForm = document.getElementById("login-form");

if (loginForm) {
  const mensaje = document.getElementById("mensaje");
  const inputEmail = document.getElementById("mail");
  const inputPassword = document.getElementById("password");
  const modalOverlay = document.getElementById("login-overlay");
  const btnCerrarModal = document.getElementById("cerrar-modal");

  // Función para validar formato de email
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Abrir modal
  document.getElementById('abrir-modal')?.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    document.body.classList.add('modal-active');
  });

  // Validación previa mientras se escribe o se cambia de campo
[inputEmail, inputPassword].forEach(input => {
  input.addEventListener("blur", () => { // Se puede cambiar a "input" para validar mientras escribe
    const valor = input.value.trim();

    if (!valor) {
      mostrarMensaje("", ""); // No mostrar nada si está vacío
      return;
    }

    if (input === inputEmail) {
      if (!validarEmail(valor)) {
        mostrarMensaje("Formato de correo inválido.", "red");
      } else {
        mostrarMensaje("", ""); // Quita mensaje si es válido
      }
    }

    if (input === inputPassword) {
      if (valor.length < 4) { // ejemplo de validación mínima de contraseña
        mostrarMensaje("La contraseña es demasiado corta.", "red");
      } else {
        mostrarMensaje("", "");
      }
    }
  });
});

  // Cerrar modal con botón
  btnCerrarModal?.addEventListener('click', cerrarModal);

  // Cerrar modal al hacer clic fuera del contenido
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) cerrarModal();
  });

  // Función para cerrar modal y limpiar mensajes
  function cerrarModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-active');
    mensaje.textContent = '';
    loginForm.reset();
  }

  // Manejo del formulario
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = inputEmail.value.trim();
    const password = inputPassword.value;

    // Validaciones
    if (!email) {
      mostrarMensaje("Por favor, introduce tu correo electrónico.", "red");
      return;
    }

    if (!validarEmail(email)) {
      mostrarMensaje("El formato del correo electrónico no es válido.", "red");
      return;
    }

    if (!password) {
      mostrarMensaje("Por favor, introduce tu contraseña.", "red");
      return;
    }

    // Simulación de envío
    mostrarMensaje("Iniciando sesión...", "blue");

    setTimeout(() => {
      // Simular respuesta del servidor
      if (email === "usuario@ejemplo.com" && password === "123456") {
        mostrarMensaje("¡Login exitoso! ✅", "green");

        setTimeout(() => {
          cerrarModal();
          alert("Bienvenido!");
        }, 1000);
      } else {
        mostrarMensaje("Credenciales incorrectas. Inténtalo de nuevo.", "red");
      }
    }, 1500);
  });

  // Función auxiliar para actualizar el <p id="mensaje">
  function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
  }
}

  /* ===========================
    FUNCIONALIDAD EMPLEOS
  =========================== */
  window.toggleExpand = function (btn) {
    const jobOffer = btn.closest('.job-offer');
    if (jobOffer) {
      jobOffer.classList.toggle("expanded");
      btn.textContent = jobOffer.classList.contains("expanded") ? "Leer menos" : "Leer más";
    }
  };

  // Inicializar botones de empleos si existen
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  if (readMoreButtons.length > 0) {
    readMoreButtons.forEach(button => {
      button.addEventListener('click', function () {
        window.toggleExpand(this);
      });
    });

    // Botones de postulación
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
  }

  /* ===========================
    CONTADORES DE VISITAS
  =========================== */
  const inicializarContadoresDeVisitas = () => {
    const elementosVisitas = document.querySelectorAll("[id^='visitas-']");

    elementosVisitas.forEach((elemento) => {
      const clave = elemento.id;
      let visitas = parseInt(localStorage.getItem(clave)) || 0;

      // Incrementar y guardar
      visitas++;
      localStorage.setItem(clave, visitas);

      // Mostrar en pantalla
      elemento.textContent = visitas;
    });
  };

  inicializarContadoresDeVisitas();

  /* ===========================
     CONTADORES DE LIKES
  =========================== */
  const inicializarContadoresDeLikes = () => {
    const botonesLike = document.querySelectorAll("[id^='contador-likes']");

    botonesLike.forEach((boton) => {
      const idNumero = boton.id.replace("contador-likes", "");
      const contadorDisplay = document.getElementById(`numero-likes${idNumero}`);

      if (!contadorDisplay) return;

      const STORAGE_KEY = `likes-count${idNumero}`;
      const USER_LIKED_KEY = `user-liked${idNumero}`;

      let likes = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
      contadorDisplay.textContent = likes;

      const userLiked = sessionStorage.getItem(USER_LIKED_KEY) === "true";
      if (userLiked) {
        boton.classList.add("clicado");
        boton.disabled = true;
      }

      boton.addEventListener("click", () => {
        if (!sessionStorage.getItem(USER_LIKED_KEY)) {
          likes++;
          contadorDisplay.textContent = likes;
          localStorage.setItem(STORAGE_KEY, likes);
          boton.classList.add("clicado");
          boton.disabled = true;
          sessionStorage.setItem(USER_LIKED_KEY, "true");
        }
      });
    });
  };

  inicializarContadoresDeLikes();

  /* ===========================
    FUNCIONALIDADES REGISTRO
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

    if (rolSelect) {
      rolSelect.addEventListener('change', (e) => mostrarBloque(e.target.value));
    }

    let formCount = 0;

    if (btnAddForm && formacionesCont) {
      btnAddForm.addEventListener('click', () => {
        formCount++;
        const idx = formCount;
        const wrapper = document.createElement('div');
        wrapper.className = 'formation-block';
        wrapper.innerHTML = `
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <div style="flex:1 1 45%;">
              <label>Título</label>
              <input name="formacion[${idx}][titulo]" type="text" placeholder="Título (Ej: Máster en Educación)" />
            </div>
            <div style="flex:1 1 45%;">
              <label>Centro formador</label>
              <input name="formacion[${idx}][centroFormador]" type="text" placeholder="Centro formador" />
            </div>
            <div style="flex:1 1 30%;">
              <label>Año fin</label>
              <input name="formacion[${idx}][anioFin]" type="number" min="1900" max="2100" />
            </div>
            <div style="flex:1 1 30%;">
              <label>Tipo</label>
              <input name="formacion[${idx}][tipoFormacion]" type="text" placeholder="Tipo (FP, Grado...)" />
            </div>
          </div>
          <div style="text-align:right;margin-top:8px;">
            <button type="button" class="btn-cancel" onclick="this.closest('.formation-block').remove()">Eliminar</button>
          </div>
        `;
        formacionesCont.appendChild(wrapper);
      });
    }

    registroForm.addEventListener('submit', (e) => {
      if (!registroForm.checkValidity()) {
        e.preventDefault();
        registroForm.reportValidity();
      }
    });

    if (rolSelect) {
      mostrarBloque(rolSelect.value);
    }
  }

  /* ===========================
    LISTADO COLEGIOS
  =========================== */
  const resultadosColegios = document.getElementById('resultados');

  if (resultadosColegios) {
    // Datos de ejemplo con imágenes reales de bancos gratuitos
    const colegios = [
      {
        id: 1,
        nombre: 'Colegio San José',
        provincia: 'Sevilla',
        tipo: 'Concertado',
        ciudad: 'Sevilla',
        telefono: '955 123 456',
        logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
        resumen: 'Centro con enfoque STEM y apoyo a la inclusión.'
      },
      {
        id: 2,
        nombre: 'Escuela La Marina',
        provincia: 'Málaga',
        tipo: 'Concertado',
        ciudad: 'Málaga',
        telefono: '952 234 567',
        logo: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=300&fit=crop',
        resumen: 'Fuerte programa de idiomas y actividades náuticas.'
      },
      {
        id: 3,
        nombre: 'Colegio Las Acacias',
        provincia: 'Cádiz',
        tipo: 'Privado',
        ciudad: 'Cádiz',
        telefono: '956 345 678',
        logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
        resumen: 'Proyecto artístico y cultural consolidado.'
      },
      {
        id: 4,
        nombre: 'Centro Virgen del Alba',
        provincia: 'Granada',
        tipo: 'Concertado',
        ciudad: 'Granada',
        telefono: '958 456 789',
        logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop',
        resumen: 'Metodologías activas en primaria.'
      },
      {
        id: 5,
        nombre: 'Colegio Horizonte',
        provincia: 'Córdoba',
        tipo: 'Público',
        ciudad: 'Córdoba',
        telefono: '957 567 890',
        logo: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=400&h=300&fit=crop',
        resumen: 'Enfoque en mejora continua y convivencia.'
      },
      {
        id: 6,
        nombre: 'Colegio Andalucía',
        provincia: 'Jaén',
        tipo: 'Concertado',
        ciudad: 'Jaén',
        telefono: '953 678 901',
        logo: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop',
        resumen: 'Programa de inclusión y proyectos rurales.'
      },
      {
        id: 7,
        nombre: 'Escuela Nueva Ola',
        provincia: 'Huelva',
        tipo: 'Privado',
        ciudad: 'Huelva',
        telefono: '959 789 012',
        logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
        resumen: 'Talleres tecnológicos y deportivos.'
      },
      {
        id: 8,
        nombre: 'Colegio Alborán',
        provincia: 'Almería',
        tipo: 'Concertado',
        ciudad: 'Almería',
        telefono: '950 890 123',
        logo: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop',
        resumen: 'Apuesta por la naturaleza y huertos escolares.'
      },
      {
        id: 9,
        nombre: 'Colegio Río Verde',
        provincia: 'Sevilla',
        tipo: 'Público',
        ciudad: 'Dos Hermanas',
        telefono: '955 901 234',
        logo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
        resumen: 'Proyectos STEAM desde infantil.'
      },
      {
        id: 10,
        nombre: 'Colegio Mediterráneo',
        provincia: 'Málaga',
        tipo: 'Concertado',
        ciudad: 'Fuengirola',
        telefono: '952 012 345',
        logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
        resumen: 'Programas bilingües y actividades marinas.'
      }
    ];

    const PER_PAGE = 15;
    let state = { q: '', provincia: '', tipo: '', page: 1 };

    const buscarEl = document.getElementById('buscar');
    const filtroProvincia = document.getElementById('filtroProvincia');
    const filtroTipo = document.getElementById('filtroTipo');
    const btnLimpiar = document.getElementById('btnLimpiar');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    // Modal elements
    const modalOverlay = document.getElementById('modalOverlay');
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
            <button class="btn-primary" data-contact="${c.id}">Contactar centro</button>
          </div>
        </article>
      `).join('');

      if (pageInfo) pageInfo.textContent = `${state.page} / ${totalPages}`;
      if (prevBtn) prevBtn.disabled = state.page <= 1;
      if (nextBtn) nextBtn.disabled = state.page >= totalPages;
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
      if (modalGoPerfil) modalGoPerfil.href = `./detalle-colegio.html?id=${c.id}`;

      if (modalContactBtn) {
        modalContactBtn.onclick = () => alert(`Solicitud de contacto enviada a ${c.nombre}. Tel: ${c.telefono}`);
      }

      if (modalOverlay) {
        modalOverlay.classList.add('open');
        modalOverlay.setAttribute('aria-hidden', 'false');
      }
    }

    function closeModal() {
      if (modalOverlay) {
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
      }

      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    // Event listeners para el modal
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });

    // Event listeners principales
    if (buscarEl) {
      buscarEl.addEventListener('input', e => { state.q = e.target.value; state.page = 1; render(); });
    }

    if (filtroProvincia) {
      filtroProvincia.addEventListener('change', e => { state.provincia = e.target.value; state.page = 1; render(); });
    }

    if (filtroTipo) {
      filtroTipo.addEventListener('change', e => { state.tipo = e.target.value; state.page = 1; render(); });
    }

    if (btnLimpiar) {
      btnLimpiar.addEventListener('click', () => {
        if (buscarEl) buscarEl.value = '';
        if (filtroProvincia) filtroProvincia.value = '';
        if (filtroTipo) filtroTipo.value = '';
        state.q = '';
        state.provincia = '';
        state.tipo = '';
        state.page = 1;
        render();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (state.page > 1) { state.page--; render(); }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        state.page++; render();
      });
    }

    // Event delegation para botones
    resultadosColegios.addEventListener('click', e => {
      // Botones "Ver ficha"
      if (e.target.classList.contains('btn-view')) {
        const id = Number(e.target.dataset.id);
        openModalFor(id, e.target);
      }

      // Botones "Contactar centro" 
      const contactBtn = e.target.closest('[data-contact]');
      if (contactBtn) {
        const id = Number(contactBtn.dataset.contact);
        const c = colegios.find(x => x.id === id);
        if (c) {
          alert(`Solicitud de contacto enviada a ${c.nombre}. Teléfono: ${c.telefono}`);
        }
      }
    });

    // Inicial render
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
  }
});