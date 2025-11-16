document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
     FORMULARIO DE LOGIN
  =========================== */
const form = document.getElementById("login-form");
const mensaje = document.getElementById("mensaje");
const inputEmail = document.getElementById("mail");
const inputPassword = document.getElementById("password");
const modalOverlay = document.getElementById("login-overlay");
const btnCerrarModal = document.getElementById("cerrar-modal");

// Función para validar formato de email

const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Funcionalidad del modal
document.getElementById('abrir-modal')?.addEventListener('click', function() {
    modalOverlay.classList.add('active');
    document.body.classList.add('modal-active');
});

document.getElementById('cerrar-modal')?.addEventListener('click', function() {
    cerrarModal();
});

// Cerrar modal al hacer clic fuera del contenido
modalOverlay?.addEventListener('click', function(e) {
    if (e.target === this) {
        cerrarModal();
    }
});

// Función para cerrar el modal
function cerrarModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-overlay');
    // Limpiar mensajes y campos
    mensaje.textContent = '';
    form.reset();
}

// Manejo del formulario
form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = inputEmail?.value.trim() || "";
    const password = inputPassword?.value || "";

    // Validaciones
    if (!email) {
        mensaje.textContent = "Por favor, introduce tu correo electrónico.";
        mensaje.style.color = "red";
        return;
    }
    
    if (!validarEmail(email)) {
        mensaje.textContent = "El formato del correo electrónico no es válido.";
        mensaje.style.color = "red";
        return;
    }
    
    if (!password) {
        mensaje.textContent = "Por favor, introduce tu contraseña.";
        mensaje.style.color = "red";
        return;
    }

    // Simulación de envío
    mensaje.textContent = "Iniciando sesión...";
    mensaje.style.color = "blue";

    setTimeout(() => {
        // Simular respuesta del servidor
        if (email === "usuario@ejemplo.com" && password === "123456") {
            mensaje.textContent = "¡Login exitoso! ✅";
            mensaje.style.color = "green";
            
            // Cerrar modal después de éxito
            setTimeout(() => {
                cerrarModal();
                // Redirigir o actualizar la interfaz
                alert("Bienvenido!");
            }, 1000);
        } else {
            mensaje.textContent = "Credenciales incorrectas. Inténtalo de nuevo.";
            mensaje.style.color = "red";
        }
    }, 1500);
});
/* ===========================
    FUNCIONALIDAD EMPLEOS
=========================== */
window.toggleExpand = function(btn) {
    const jobOffer = btn.closest('.job-offer');
    if (jobOffer) {
        jobOffer.classList.toggle("expanded");
        btn.textContent = jobOffer.classList.contains("expanded") ? "Leer menos" : "Leer más";
    }
};

    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            window.toggleExpand(this);
        });
    });
    
    // Botones de postulación
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent === 'Postularme') {
            button.addEventListener('click', function() {
                alert('¡Postulación enviada correctamente!');
                this.textContent = 'Postulado';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                this.disabled = true;
            });
        }});

/* ===========================
    CONTADORES DE VISITAS
=========================== */

// Esta función incrementa las visitas de todos los elementos que sigan el patrón "visitas-*"
const inicializarContadoresDeVisitas = () => {
  const elementosVisitas = document.querySelectorAll("[id^='visitas-']");

  elementosVisitas.forEach((elemento) => {
    const clave = elemento.id; // ej: "visitas-publi1" o "visitas-perfil"
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
  // Seleccionamos todos los botones de like (por id que empiece con "contador-likes")
  const botonesLike = document.querySelectorAll("[id^='contador-likes']");

  botonesLike.forEach((boton) => {
    const idNumero = boton.id.replace("contador-likes", ""); // ej: "1", "2", "3"
    const contadorDisplay = document.getElementById(`numero-likes${idNumero}`);
    const STORAGE_KEY = `likes-count${idNumero}`;
    const USER_LIKED_KEY = `user-liked${idNumero}`;

    let likes = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
    contadorDisplay && (contadorDisplay.textContent = likes);

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

});

/* ===========================
FUNCIONALIDADES REGISTRO
=========================== */

    document.addEventListener('DOMContentLoaded', () => {
      const rolSelect = document.getElementById('rol');
      const bloqueMaestro = document.getElementById('bloqueMaestro');
      const bloqueCentro = document.getElementById('bloqueCentro');
      const formacionesCont = document.getElementById('formacionesContenedor');
      const btnAddForm = document.getElementById('btnAddForm');
      const form = document.getElementById('registroForm');

      function mostrarBloque(rol) {
        if (rol === 'maestro') {
          bloqueMaestro.classList.remove('hidden');
          bloqueCentro.classList.add('hidden');
        } else if (rol === 'centro') {
          bloqueCentro.classList.remove('hidden');
          bloqueMaestro.classList.add('hidden');
        } else {
          bloqueMaestro.classList.add('hidden');
          bloqueCentro.classList.add('hidden');
        }
      }

      rolSelect.addEventListener('change', (e) => mostrarBloque(e.target.value));

      // Añadir formaciones dinámicamente
      let formCount = 0;
      function crearBloqueFormacion() {
        formCount++;
        const idx = formCount;
        const wrapper = document.createElement('div');
        wrapper.className = 'formation-block';
        wrapper.dataset.index = idx;
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
            <button type="button" class="btn-cancel" data-remove="${idx}">Eliminar</button>
          </div>
        `;
        formacionesCont.appendChild(wrapper);

        wrapper.querySelector('[data-remove]').addEventListener('click', () => wrapper.remove());
      }

      btnAddForm.addEventListener('click', crearBloqueFormacion);

      // Validación mínima
      form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
          e.preventDefault();
          form.reportValidity();
          return;
        }
        const rol = rolSelect.value;
        if (rol === '') {
          e.preventDefault();
          alert('Selecciona tu rol (Maestro o Centro).');
          return;
        }
        if (rol === 'maestro') {
          const nombre = document.getElementById('nombre').value.trim();
          const apellidos = document.getElementById('apellidos').value.trim();
          if (!nombre || !apellidos) {
            e.preventDefault();
            alert('Para registrarte como Maestro, indica nombre y apellidos.');
            return;
          }
        }
      });

      mostrarBloque(rolSelect.value);
    });

/*Registro*/
     document.addEventListener('DOMContentLoaded', () => {
      const rolSelect = document.getElementById('rol');
      const bloqueMaestro = document.getElementById('bloqueMaestro');
      const bloqueCentro = document.getElementById('bloqueCentro');
      const formacionesCont = document.getElementById('formacionesContenedor');
      const btnAddForm = document.getElementById('btnAddForm');
      const form = document.getElementById('registroForm');

      function mostrarBloque(rol) {
        bloqueMaestro.classList.toggle('hidden', rol !== 'maestro');
        bloqueCentro.classList.toggle('hidden', rol !== 'centro');
      }

      rolSelect.addEventListener('change', (e) => mostrarBloque(e.target.value));

      let formCount = 0;
      btnAddForm?.addEventListener('click', () => {
        formCount++;
        const idx = formCount;
        const wrapper = document.createElement('div');
        wrapper.className = 'formation-block';
        wrapper.innerHTML = `
          <div class="form-row">
            <div class="form-group">
              <label>Título</label>
              <input name="formacion[${idx}][titulo]" type="text" placeholder="Título (Ej: Máster en Educación)" />
            </div>
            <div class="form-group">
              <label>Centro formador</label>
              <input name="formacion[${idx}][centroFormador]" type="text" placeholder="Centro formador" />
            </div>
            <div class="form-group">
              <label>Año fin</label>
              <input name="formacion[${idx}][anioFin]" type="number" min="1900" max="2100" />
            </div>
            <div class="form-group">
              <label>Tipo</label>
              <input name="formacion[${idx}][tipoFormacion]" type="text" placeholder="Tipo (FP, Grado...)" />
            </div>
          </div>
          <div style="text-align:right;margin-top:8px;">
            <button type="button" class="btn btn-outline" onclick="this.closest('.formation-block').remove()">Eliminar</button>
          </div>`;
        formacionesCont.appendChild(wrapper);
      });

      form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
          e.preventDefault();
          form.reportValidity();
        }
      });
    });


    /*LISTADO COLES */
    document.addEventListener('DOMContentLoaded', () => {
      // Datos de ejemplo con imágenes reales de bancos gratuitos
      const colegios = [
        { 
          id:1, 
          nombre:'Colegio San José', 
          provincia:'Sevilla', 
          tipo:'Concertado', 
          ciudad:'Sevilla', 
          telefono:'955 123 456', 
          logo:'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop', 
          resumen:'Centro con enfoque STEM y apoyo a la inclusión.'
        },
        { 
          id:2, 
          nombre:'Escuela La Marina', 
          provincia:'Málaga', 
          tipo:'Concertado', 
          ciudad:'Málaga', 
          telefono:'952 234 567', 
          logo:'https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&h=300&fit=crop', 
          resumen:'Fuerte programa de idiomas y actividades náuticas.'
        },
        { 
          id:3, 
          nombre:'Colegio Las Acacias', 
          provincia:'Cádiz', 
          tipo:'Privado', 
          ciudad:'Cádiz', 
          telefono:'956 345 678', 
          logo:'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', 
          resumen:'Proyecto artístico y cultural consolidado.'
        },
        { 
          id:4, 
          nombre:'Centro Virgen del Alba', 
          provincia:'Granada', 
          tipo:'Concertado', 
          ciudad:'Granada', 
          telefono:'958 456 789', 
          logo:'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop', 
          resumen:'Metodologías activas en primaria.'
        },
        { 
          id:5, 
          nombre:'Colegio Horizonte', 
          provincia:'Córdoba', 
          tipo:'Público', 
          ciudad:'Córdoba', 
          telefono:'957 567 890', 
          logo:'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=400&h=300&fit=crop', 
          resumen:'Enfoque en mejora continua y convivencia.'
        },
        { 
          id:6, 
          nombre:'Colegio Andalucía', 
          provincia:'Jaén', 
          tipo:'Concertado', 
          ciudad:'Jaén', 
          telefono:'953 678 901', 
          logo:'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop', 
          resumen:'Programa de inclusión y proyectos rurales.'
        },
        { 
          id:7, 
          nombre:'Escuela Nueva Ola', 
          provincia:'Huelva', 
          tipo:'Privado', 
          ciudad:'Huelva', 
          telefono:'959 789 012', 
          logo:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop', 
          resumen:'Talleres tecnológicos y deportivos.'
        },
        { 
          id:8, 
          nombre:'Colegio Alborán', 
          provincia:'Almería', 
          tipo:'Concertado', 
          ciudad:'Almería', 
          telefono:'950 890 123', 
          logo:'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop', 
          resumen:'Apuesta por la naturaleza y huertos escolares.'
        },
        { 
          id:9, 
          nombre:'Colegio Río Verde', 
          provincia:'Sevilla', 
          tipo:'Público', 
          ciudad:'Dos Hermanas', 
          telefono:'955 901 234', 
          logo:'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop', 
          resumen:'Proyectos STEAM desde infantil.'
        },
        { 
          id:10, 
          nombre:'Colegio Mediterráneo', 
          provincia:'Málaga', 
          tipo:'Concertado', 
          ciudad:'Fuengirola', 
          telefono:'952 012 345', 
          logo:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop', 
          resumen:'Programas bilingües y actividades marinas.'
        },
        { 
          id:11, 
          nombre:'Colegio San Martín', 
          provincia:'Cádiz', 
          tipo:'Concertado', 
          ciudad:'Jerez', 
          telefono:'956 123 987', 
          logo:'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=300&fit=crop', 
          resumen:'Trabajo en valores y deporte escolar.'
        },
        { 
          id:12, 
          nombre:'Colegio Sierra', 
          provincia:'Granada', 
          tipo:'Privado', 
          ciudad:'Motril', 
          telefono:'958 234 876', 
          logo:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop', 
          resumen:'Atención a la diversidad y música.'
        },
        { 
          id:13, 
          nombre:'Colegio Córdoba Centro', 
          provincia:'Córdoba', 
          tipo:'Concertado', 
          ciudad:'Córdoba', 
          telefono:'957 345 765', 
          logo:'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop', 
          resumen:'Énfasis en tecnología educativa.'
        },
        { 
          id:14, 
          nombre:'Colegio Norte', 
          provincia:'Jaén', 
          tipo:'Público', 
          ciudad:'Linares', 
          telefono:'953 456 654', 
          logo:'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop', 
          resumen:'Programas deportivos y convivencia.'
        },
        { 
          id:15, 
          nombre:'Colegio Costa', 
          provincia:'Huelva', 
          tipo:'Concertado', 
          ciudad:'Lepe', 
          telefono:'959 567 543', 
          logo:'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop', 
          resumen:'Formación profesional y FP dual.'
        }
      ];

      const PER_PAGE = 15;

      let state = { q: '', provincia: '', tipo: '', page: 1 };

      const resultadosEl = document.getElementById('resultados');
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
        resultadosEl.setAttribute('aria-busy', 'true');
        const datos = filtrarDatos();
        const totalPages = Math.max(1, Math.ceil(datos.length / PER_PAGE));
        state.page = Math.min(state.page, totalPages);
        const start = (state.page - 1) * PER_PAGE;
        const pageItems = datos.slice(start, start + PER_PAGE);

        resultadosEl.innerHTML = pageItems.map(c => `
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

        pageInfo.textContent = `${state.page} / ${totalPages}`;
        prevBtn.disabled = state.page <= 1;
        nextBtn.disabled = state.page >= totalPages;
        resultadosEl.setAttribute('aria-busy', 'false');
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
        modalGoPerfil.href = `./detalle-colegio.html?id=${c.id}`;

        modalContactBtn.onclick = () => alert(`Solicitud de contacto enviada a ${c.nombre}. Tel: ${c.telefono}`);

        modalOverlay.classList.add('open');
        modalOverlay.setAttribute('aria-hidden', 'false');
        trapFocus(modalOverlay);
      }

      function closeModal() {
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        releaseFocusTrap();

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
          lastFocusedElement.focus();
        }
      }

      // Event listeners para el modal
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });
      modalCloseBtn.addEventListener('click', closeModal);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
          closeModal();
        }
      });

      // Simple focus trap
      let focusableElements = [];
      let firstFocusable = null;
      let lastFocusable = null;

      function trapFocus(container) {
        focusableElements = Array.from(container.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))
          .filter(el => el.offsetParent !== null);

        if (focusableElements.length > 0) {
          firstFocusable = focusableElements[0];
          lastFocusable = focusableElements[focusableElements.length - 1];
          firstFocusable.focus();
        }

        container.addEventListener('keydown', handleTrap);
      }

      function releaseFocusTrap() {
        modalOverlay.removeEventListener('keydown', handleTrap);
        focusableElements = [];
        firstFocusable = lastFocusable = null;
      }

      function handleTrap(e) {
        if (e.key !== 'Tab') return;

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }

      // Event listeners principales
      buscarEl.addEventListener('input', e => { state.q = e.target.value; state.page = 1; render(); });
      filtroProvincia.addEventListener('change', e => { state.provincia = e.target.value; state.page = 1; render(); });
      filtroTipo.addEventListener('change', e => { state.tipo = e.target.value; state.page = 1; render(); });
      
      // ERROR CORREGIDO: Faltaba el punto en addEventListener
      btnLimpiar.addEventListener('click', () => {
        buscarEl.value = ''; 
        filtroProvincia.value = ''; 
        filtroTipo.value = '';
        state.q = ''; 
        state.provincia = ''; 
        state.tipo = ''; 
        state.page = 1; 
        render();
      });

      prevBtn.addEventListener('click', () => {
        if (state.page > 1) { state.page--; render(); }
      });

      nextBtn.addEventListener('click', () => {
        state.page++; render();
      });

      // Event delegation para botones
      resultadosEl.addEventListener('click', e => {
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
    });