/* ============================================================
   MODO CLARO / OSCURO
   - Cambia el tema al pulsar el botón de sol/luna.
   - Guarda la elección en el navegador (localStorage) para la
     próxima visita. La lectura inicial se hace en un pequeño
     script dentro del <head> del index.html (para que la página
     cargue directamente con el tema elegido, sin parpadeo).
   ============================================================ */

const CLAVE_TEMA = "dulceSecretoTema";

function actualizarIconosTema(tema) {
  const claseActual  = tema === "dark" ? "bi-moon-stars-fill" : "bi-sun-fill";
  const claseOpuesta = tema === "dark" ? "bi-sun-fill" : "bi-moon-stars-fill";
  ["iconMobile", "iconDesktop"].forEach((id) => {
    const icono = document.getElementById(id);
    if (!icono) return;
    icono.classList.remove(claseOpuesta);
    icono.classList.add(claseActual);
  });
}

function alternarTema() {
  const html = document.documentElement;
  const temaActual = html.getAttribute("data-bs-theme");
  const temaNuevo = temaActual === "dark" ? "light" : "dark";
  html.setAttribute("data-bs-theme", temaNuevo);
  /* try/catch para que la página no se rompa si el navegador bloquea
     el almacenamiento local (modo privado, políticas estrictas, etc.) */
  try {
    localStorage.setItem(CLAVE_TEMA, temaNuevo);
  } catch (e) {
    /* El cambio funciona igual durante la visita; solo no se recuerda. */
  }
  actualizarIconosTema(temaNuevo);
}

/* Conecta los dos botones de tema (móvil y escritorio) */
["themeToggleMobile", "themeToggleDesktop"].forEach((id) => {
  const boton = document.getElementById(id);
  if (boton) boton.addEventListener("click", alternarTema);
});

/* Estado inicial de los íconos según el tema activo */
actualizarIconosTema(document.documentElement.getAttribute("data-bs-theme"));
