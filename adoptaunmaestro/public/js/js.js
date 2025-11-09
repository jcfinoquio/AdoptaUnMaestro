document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
     FORMULARIO DE LOGIN
  =========================== */
  const form = document.getElementById("login-form");
  const mensaje = document.getElementById("mensaje");
  const inputEmail = document.getElementById("mail");
  const lightbox = document.querySelector(".login-container");

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = inputEmail?.value.trim() || "";

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
  mensaje.textContent = "Correo electrónico válido ✅";
  mensaje.style.color = "green";

  // ✅ Cerrar el lightbox correctamente
  if (lightbox) {
    lightbox.classList.add("oculto");
    document.body.style.overflow = "auto";
  }
    // ToDo: Aquí logica para enviar los datos al servidor con fetch/AJAX
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
