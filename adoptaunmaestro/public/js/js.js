document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const loginContainer = document.querySelector(".login-container");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita recargar
    loginContainer.style.display = "none"; // oculta el lightbox
    document.body.style.overflow = "auto"; // vuelve a permitir scroll
  });
});