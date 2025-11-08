document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const loginContainer = document.querySelector(".login-container");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita recargar
    //loginContainer.style.display = "none"; // oculta el lightbox
    //document.body.style.overflow = "auto"; // vuelve a permitir scroll
  });
});
//FORMULARIO DE LOGIN
//CORREO ELECTRÓNICO
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje");

  // Expresión regular básica para validar formato de correo
  const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    mensaje.textContent = "Por favor, introduce tu correo electrónico.";
    mensaje.style.color = "red";
  } else if (!patronEmail.test(email)) {
    mensaje.textContent = "El formato del correo electrónico no es válido.";
    mensaje.style.color = "red";
  } else {
    mensaje.textContent = "Correo electrónico válido ✅";
    mensaje.style.color = "green";
  }
});

//CONTADOR DE VISITAS
let visitasPerfil = localStorage.getItem("visitas-perfil") || 0;
let visitasPubli = localStorage.getItem("visitas-publi") || 0;


// CONTADOR DE LIKES --> ESTO NO FUFa
//TODO: Arreglar contador de likes
(function () {
  const STORAGE_KEY = 'likes-count';
  const botonCorazon = document.getElementById('contador-likes');
  const contadorDisplay = document.getElementById('numero-likes');

  // Cargar likes guardados
  let likes = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
  contadorDisplay.textContent = likes;

  // Manejar clic en el botón
  botonCorazon.addEventListener('click', function () {
    likes++;
    contadorDisplay.textContent = likes;
    localStorage.setItem(STORAGE_KEY, likes);
    botonCorazon.classList.add('clicado'); // opcional: para cambiar estilo si quieres
  });
})();
