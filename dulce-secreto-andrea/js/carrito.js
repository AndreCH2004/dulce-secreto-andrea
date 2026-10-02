/* ============================================================
   CARRITO DE COMPRAS
   - Permite agregar varios productos (kekes por tamaño y
     muffins por cajas x6).
   - Se guarda en el navegador (localStorage) para no perderse
     al recargar la página.
   - Los adicionales se eligen una sola vez por pedido y también
     se guardan.
   No es necesario editar este archivo: los precios y productos
   salen de js/productos.js y js/config.js.
   ============================================================ */

const CLAVE_CARRITO = "dulceSecretoCarrito";

/* Estado del carrito: lista de ítems + adicionales marcados */
let carrito = { items: [], adicionales: [] };

/* ============================================================
   ESCAPAR TEXTO DEL USUARIO
   Convierte cualquier texto en una versión segura para insertar
   dentro del HTML (p. ej. el sabor personalizado que escribe el
   cliente). Evita que etiquetas <script> o similares se ejecuten.
   ============================================================ */
function escaparHTML(valor) {
  if (valor === null || valor === undefined) return "";
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ---------- Guardar y cargar en el navegador ---------- */
function guardarCarrito() {
  /* try/catch: algunos navegadores (modo privado, políticas estrictas)
     lanzan error al escribir en localStorage. No debe romper la página. */
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  } catch (e) {
    /* El carrito seguirá funcionando en memoria durante la visita. */
  }
}

/* Valida que un ítem guardado siga teniendo sentido: su producto debe
   existir en PRODUCTOS y su opción (tamaño o caja) debe existir en los
   precios de ese producto. Si no, se descarta en silencio. */
function itemEsValido(item) {
  if (!item || typeof item !== "object") return false;
  const producto = buscarProducto(item.productoId);
  if (!producto) return false;
  if (producto.tipo === "muffin") {
    return item.opcion === "caja";
  }
  /* Para kekes, la opción debe existir en el objeto de precios. */
  return Object.prototype.hasOwnProperty.call(producto.precios, item.opcion);
}

function cargarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
    if (guardado && Array.isArray(guardado.items)) {
      carrito = {
        items: guardado.items.filter(itemEsValido).map(it => ({
          productoId: it.productoId,
          opcion: it.opcion,
          cantidad: Math.max(1, parseInt(it.cantidad, 10) || 1),
          saborPersonalizado: typeof it.saborPersonalizado === "string"
            ? it.saborPersonalizado.slice(0, 60)
            : ""
        })),
        adicionales: Array.isArray(guardado.adicionales) ? guardado.adicionales : []
      };
    }
  } catch (e) {
    carrito = { items: [], adicionales: [] };
  }
}

/* ---------- Utilidades ---------- */
function formatoPrecio(valor) {
  return `${CONFIG.moneda} ${valor.toFixed(2)}`;
}

function buscarProducto(id) {
  return PRODUCTOS.find(p => p.id === id);
}

/* Precio unitario de un ítem según su opción (tamaño o caja).
   Devuelve null cuando el precio se confirma por WhatsApp. */
function precioDeItem(item) {
  const producto = buscarProducto(item.productoId);
  if (!producto || producto.precioAConfirmar) return null;
  if (producto.tipo === "muffin") return producto.precios.caja;
  return producto.precios[item.opcion] ?? null;
}

/* ---------- Acciones del carrito ---------- */
function agregarAlCarrito(productoId, opcion, cantidad, saborPersonalizado = "") {
  const producto = buscarProducto(productoId);
  if (!producto) return;

  cantidad = Math.max(1, parseInt(cantidad, 10) || 1);
  /* Nos aseguramos de recortar el sabor personalizado a 60 caracteres
     por si llega desde fuera (consistencia con el maxlength del input). */
  if (typeof saborPersonalizado === "string") {
    saborPersonalizado = saborPersonalizado.slice(0, 60);
  } else {
    saborPersonalizado = "";
  }

  /* Si ya existe el mismo producto con la misma opción (y el mismo
     sabor personalizado), solo se suma la cantidad */
  const existente = carrito.items.find(it =>
    it.productoId === productoId &&
    it.opcion === opcion &&
    (it.saborPersonalizado || "") === saborPersonalizado
  );

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.items.push({ productoId, opcion, cantidad, saborPersonalizado });
  }

  guardarCarrito();
  renderizarCarrito();
}

function quitarDelCarrito(indice) {
  carrito.items.splice(indice, 1);
  guardarCarrito();
  renderizarCarrito();
}

function cambiarCantidad(indice, delta) {
  const item = carrito.items[indice];
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad < 1) item.cantidad = 1; // mínimo 1 (caja o unidad)
  guardarCarrito();
  renderizarCarrito();
}

function alternarAdicional(idAdicional, marcado) {
  if (marcado && !carrito.adicionales.includes(idAdicional)) {
    carrito.adicionales.push(idAdicional);
  } else if (!marcado) {
    carrito.adicionales = carrito.adicionales.filter(id => id !== idAdicional);
  }
  guardarCarrito();
  renderizarTotales();
}

/* Vacía por completo el carrito (lo invoca el botón "Vaciar pedido"
   después de la confirmación del cliente). */
function vaciarCarrito() {
  carrito = { items: [], adicionales: [] };
  guardarCarrito();
  renderizarCarrito();
}

/* ---------- Totales ---------- */
function calcularTotales() {
  let subtotal = 0;
  let hayPrecioPorConfirmar = false;

  carrito.items.forEach(item => {
    const precio = precioDeItem(item);
    if (precio === null) {
      hayPrecioPorConfirmar = true;
    } else {
      subtotal += precio * item.cantidad;
    }
  });

  const totalAdicionales = carrito.adicionales.reduce((suma, id) => {
    const adicional = CONFIG.adicionales.find(a => a.id === id);
    return suma + (adicional ? adicional.precio : 0);
  }, 0);

  return {
    subtotal,
    totalAdicionales,
    total: subtotal + totalAdicionales,
    hayPrecioPorConfirmar
  };
}

/* ---------- Pintado del panel del carrito ---------- */
function descripcionItem(item) {
  const producto = buscarProducto(item.productoId);
  if (!producto) return null;
  let nombreMostrado = producto.nombre;
  if (producto.precioAConfirmar && item.saborPersonalizado) {
    /* El sabor viene del usuario: SIEMPRE se guarda como texto plano
       y se escapa al pintar en HTML. */
    nombreMostrado = item.saborPersonalizado;
  }
  const opcionTexto = producto.tipo === "muffin" ? "Caja x6 unidades" : item.opcion;
  const precio = precioDeItem(item);
  return { producto, nombreMostrado, opcionTexto, precio };
}

function renderizarCarrito() {
  const lista = document.getElementById("listaCarrito");
  const vacio = document.getElementById("carritoVacio");
  const pieCarrito = document.getElementById("pieCarrito");
  if (!lista) return;

  /* Marcar los checks de adicionales según lo guardado */
  document.querySelectorAll(".adicional-check").forEach(chk => {
    chk.checked = carrito.adicionales.includes(chk.dataset.idAdicional);
  });

  if (carrito.items.length === 0) {
    lista.innerHTML = "";
    vacio.classList.remove("d-none");
    pieCarrito.classList.add("d-none");
  } else {
    vacio.classList.add("d-none");
    pieCarrito.classList.remove("d-none");

    lista.innerHTML = carrito.items.map((item, indice) => {
      const info = descripcionItem(item);
      if (!info) return "";
      const { producto, nombreMostrado, opcionTexto, precio } = info;
      const precioTexto = precio === null
        ? `<span class="text-suave" style="font-size:0.8rem;">Precio a confirmar por WhatsApp</span>`
        : `<span class="text-dorado fw-bold">${formatoPrecio(precio * item.cantidad)}</span>`;
      const miniatura = producto.imagen
        ? `<img src="${escaparHTML(producto.imagen)}" alt="" width="56" height="56" class="rounded" style="object-fit:cover;">`
        : `<span class="rounded d-flex align-items-center justify-content-center" style="width:56px;height:56px;background:var(--form-bg);color:var(--dorado);"><i class="bi bi-cake2 fs-4"></i></span>`;

      /* ⚠️ Todo texto del usuario (nombreMostrado) y de productos se escapa */
      return `
        <div class="d-flex gap-3 align-items-start py-3 border-bottom border-linea">
          ${miniatura}
          <div class="flex-grow-1" style="min-width:0;">
            <div class="d-flex justify-content-between align-items-start gap-2">
              <strong style="font-size:0.92rem; overflow-wrap: anywhere;">${escaparHTML(nombreMostrado)}</strong>
              <button type="button" class="btn btn-sm text-suave p-0 flex-shrink-0" aria-label="Quitar ${escaparHTML(producto.nombre)}"
                      onclick="quitarDelCarrito(${indice})"><i class="bi bi-trash3"></i></button>
            </div>
            <div class="text-suave" style="font-size:0.8rem;">${escaparHTML(opcionTexto)}</div>
            <div class="d-flex justify-content-between align-items-center mt-2 gap-2 flex-wrap">
              <div class="d-flex align-items-center gap-2">
                <button type="button" class="btn btn-outline-dorado stepper-btn" aria-label="Disminuir cantidad"
                        onclick="cambiarCantidad(${indice}, -1)">−</button>
                <span class="fw-medium">${item.cantidad}</span>
                <button type="button" class="btn btn-outline-dorado stepper-btn" aria-label="Aumentar cantidad"
                        onclick="cambiarCantidad(${indice}, 1)">+</button>
              </div>
              ${precioTexto}
            </div>
          </div>
        </div>`;
    }).join("");
  }

  renderizarTotales();
  actualizarContadores();
  renderizarResumenFormulario();
}

function renderizarTotales() {
  const t = calcularTotales();
  const elSubtotal = document.getElementById("subtotalCarrito");
  const elAdicionales = document.getElementById("totalAdicionalesCarrito");
  const elTotal = document.getElementById("totalCarrito");
  const aviso = document.getElementById("avisoPrecioConfirmar");
  if (!elTotal) return;

  elSubtotal.textContent = formatoPrecio(t.subtotal);
  elAdicionales.textContent = formatoPrecio(t.totalAdicionales);
  elTotal.textContent = formatoPrecio(t.total);
  aviso.classList.toggle("d-none", !t.hayPrecioPorConfirmar);

  /* La fecha mínima depende de si hay kekes en el carrito (24 h) */
  if (typeof actualizarFechaMinima === "function") actualizarFechaMinima();

  renderizarResumenFormulario();
}

/* ============================================================
   RESUMEN EN VIVO DENTRO DEL FORMULARIO
   Pinta una pequeña lista con los ítems del carrito y el total
   estimado, encima del botón "Enviar pedido por WhatsApp".
   ============================================================ */
function renderizarResumenFormulario() {
  const lista = document.getElementById("resumenListaForm");
  const totalEl = document.getElementById("resumenTotalForm");
  const avisoEl = document.getElementById("resumenAvisoForm");
  if (!lista || !totalEl) return;

  if (carrito.items.length === 0) {
    lista.innerHTML = `<li class="text-suave">Tu pedido está vacío. Agrega productos desde el catálogo.</li>`;
  } else {
    lista.innerHTML = carrito.items.map(item => {
      const info = descripcionItem(item);
      if (!info) return "";
      const { nombreMostrado, opcionTexto, precio } = info;
      const precioTxt = precio === null
        ? `<span class="text-suave">a confirmar</span>`
        : `<span class="text-dorado fw-bold">${formatoPrecio(precio * item.cantidad)}</span>`;
      return `<li class="d-flex justify-content-between gap-2 mb-1">
                <span style="overflow-wrap:anywhere;">${item.cantidad} × ${escaparHTML(nombreMostrado)} <span class="text-suave">(${escaparHTML(opcionTexto)})</span></span>
                ${precioTxt}
              </li>`;
    }).join("");
  }

  const t = calcularTotales();
  totalEl.textContent = formatoPrecio(t.total);
  avisoEl.classList.toggle("d-none", !t.hayPrecioPorConfirmar);
}

/* Contador del botón flotante y del menú */
function actualizarContadores() {
  const cantidadTotal = carrito.items.reduce((suma, it) => suma + it.cantidad, 0);
  ["contadorCarritoFlotante", "contadorCarritoMenu"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = cantidadTotal;
    el.classList.toggle("d-none", cantidadTotal === 0);
  });
}

/* ---------- Aviso flotante (toast) ----------
   Puede mostrar un botón "Ver mi pedido" opcional, que al pulsarse
   abre el panel del carrito. */
function mostrarToast(mensaje, mostrarVerPedido = false) {
  const cuerpo = document.getElementById("toastMensaje");
  const toastEl = document.getElementById("toastCarrito");
  const btnVer = document.getElementById("toastVerPedido");
  if (!toastEl || !cuerpo) return;
  cuerpo.textContent = mensaje;
  if (btnVer) {
    btnVer.classList.toggle("d-none", !mostrarVerPedido);
  }
  bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3200 }).show();
}

/* ---------- Inicio ---------- */
cargarCarrito();

document.querySelectorAll(".adicional-check").forEach(chk => {
  chk.addEventListener("change", () => alternarAdicional(chk.dataset.idAdicional, chk.checked));
});
