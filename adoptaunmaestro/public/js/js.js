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
     CONTADOR DE VISITAS
  =========================== */
  const visitasPerfilDisplay = document.getElementById("visitas-perfil");
  const visitasPubliDisplay = document.getElementById("visitas-publi");

  const incrementarVisitas = () => {
    let visitasPerfil = parseInt(localStorage.getItem("visitas-perfil")) || 0;
    let visitasPubli = parseInt(localStorage.getItem("visitas-publi")) || 0;

    visitasPerfil++;
    visitasPubli++;

    localStorage.setItem("visitas-perfil", visitasPerfil);
    localStorage.setItem("visitas-publi", visitasPubli);

    visitasPerfilDisplay && (visitasPerfilDisplay.textContent = visitasPerfil);
    visitasPubliDisplay && (visitasPubliDisplay.textContent = visitasPubli);
  };
  incrementarVisitas();

  /* ===========================
     CONTADOR DE LIKES CON UNA SOLA INTERACCIÓN POR USUARIO
  =========================== */
  const botonCorazon = document.getElementById("contador-likes");
  const contadorDisplay = document.getElementById("numero-likes");
  const STORAGE_KEY = "likes-count";
  const USER_LIKED_KEY = "user-liked";

  const inicializarLikes = () => {
    if (!botonCorazon || !contadorDisplay) return;

    // Obtener total de likes
    let likes = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
    contadorDisplay.textContent = likes;

    // Verificar si el usuario ya ha dado like en esta sesión
    const userLiked = sessionStorage.getItem(USER_LIKED_KEY) === "true";
    if (userLiked) {
      botonCorazon.classList.add("clicado");
      botonCorazon.disabled = true;
    }

    botonCorazon.addEventListener("click", () => {
      if (!sessionStorage.getItem(USER_LIKED_KEY)) {
        likes++;
        contadorDisplay.textContent = likes;
        localStorage.setItem(STORAGE_KEY, likes);
        botonCorazon.classList.add("clicado");
        botonCorazon.disabled = true;
        sessionStorage.setItem(USER_LIKED_KEY, "true");
      }
    });
  };
  inicializarLikes();

});
