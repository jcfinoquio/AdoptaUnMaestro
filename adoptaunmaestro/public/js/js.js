document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
     FORMULARIO DE LOGIN
  =========================== */
const form = document.getElementById("login-form");
const mensaje = document.getElementById("mensaje");
const inputEmail = document.getElementById("mail");
const inputPassword = document.getElementById("password");
const modalOverlay = document.getElementById("modal-login");

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
    document.body.classList.remove('modal-active');
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