/* ============================================================
   FILTROS DEL CATÁLOGO
   Los botones se generan solos desde el objeto CATEGORIAS
   (definido en js/productos.js). Al hacer clic, se muestran
   solo las tarjetas que tengan esa categoría.
   ============================================================ */

function renderizarFiltros() {
  const contenedor = document.getElementById("filtroCategorias");
  if (!contenedor) return;

  /* Escapa las claves/textos de categorías para evitar inyección HTML
     (escaparHTML se define en js/carrito.js, que se carga antes) */
  contenedor.innerHTML = Object.entries(CATEGORIAS)
    .map(([clave, texto], indice) => `
      <button type="button" class="btn btn-outline-dorado filtro-btn px-3 py-1 ${indice === 0 ? "activo" : ""}"
              data-filtro="${escaparHTML(clave)}" aria-pressed="${indice === 0 ? "true" : "false"}">${escaparHTML(texto)}</button>
    `)
    .join("");

  contenedor.addEventListener("click", (e) => {
    const boton = e.target.closest(".filtro-btn");
    if (!boton) return;

    contenedor.querySelectorAll(".filtro-btn").forEach(b => {
      b.classList.remove("activo");
      b.setAttribute("aria-pressed", "false");
    });
    boton.classList.add("activo");
    boton.setAttribute("aria-pressed", "true");

    const categoria = boton.dataset.filtro;
    document.querySelectorAll("#gridProductos .producto").forEach(tarjeta => {
      const categoriasDeTarjeta = (tarjeta.dataset.categoria || "").split(" ");
      const coincide = categoria === "todos" || categoriasDeTarjeta.includes(categoria);
      tarjeta.style.display = coincide ? "" : "none";
    });
  });
}
