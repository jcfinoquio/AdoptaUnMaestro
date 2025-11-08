document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const loginContainer = document.querySelector(".login-container");
  const mensaje = document.getElementById("mensaje"); // Asegúrate de que existe en HTML

  // Validación de formulario
  form?.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita recarga

    const email = document.getElementById("mail").value.trim(); // id correcto
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      mensaje.textContent = "Por favor, introduce tu correo electrónico.";
      mensaje.style.color = "red";
      return;
    }

    if (!patronEmail.test(email)) {
      mensaje.textContent = "El formato del correo electrónico no es válido.";
      mensaje.style.color = "red";
      return;
    }

    mensaje.textContent = "Correo electrónico válido ✅";
    mensaje.style.color = "green";

    // Aquí podrías enviar los datos al servidor con fetch/AJAX
  });

  // CONTADOR DE VISITAS
  const visitasPerfilDisplay = document.getElementById("visitas-perfil");
  const visitasPubliDisplay = document.getElementById("visitas-publi");

  let visitasPerfil = parseInt(localStorage.getItem("visitas-perfil")) || 0;
  let visitasPubli = parseInt(localStorage.getItem("visitas-publi")) || 0;

  visitasPerfil++;
  visitasPubli++;

  localStorage.setItem("visitas-perfil", visitasPerfil);
  localStorage.setItem("visitas-publi", visitasPubli);

  visitasPerfilDisplay && (visitasPerfilDisplay.textContent = visitasPerfil);
  visitasPubliDisplay && (visitasPubliDisplay.textContent = visitasPubli);

  // CONTADOR DE LIKES
  const botonCorazon = document.getElementById("contador-likes");
  const contadorDisplay = document.getElementById("numero-likes");
  const STORAGE_KEY = "likes-count";

  if (botonCorazon && contadorDisplay) {
    let likes = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
    contadorDisplay.textContent = likes;

    botonCorazon.addEventListener("click", () => {
      likes++;
      contadorDisplay.textContent = likes;
      localStorage.setItem(STORAGE_KEY, likes);
      botonCorazon.classList.add("clicado"); // opcional: para estilo
    });
  }
});
