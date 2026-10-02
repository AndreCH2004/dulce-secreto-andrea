/* ============================================================
   LÓGICA GENERAL DE LA PÁGINA
   - Genera las tarjetas del catálogo desde js/productos.js.
   - Modal unificado para elegir tamaño/cajas y, en "Otros
     sabores", el sabor.
   - Animaciones de scroll, botón "volver arriba", cierre del
     menú móvil y enlace de WhatsApp del contacto.
   No es necesario editar este archivo.
   ============================================================ */

/* ---------- Tarjetas de producto ---------- */
function bloquePreciosTarjeta(producto) {
  if (producto.precioAConfirmar) {
    return `<div class="border-top border-linea pt-2 mb-3" style="font-size:0.85rem;">
              <span class="text-suave">Precio a confirmar por WhatsApp</span>
            </div>`;
  }
  if (producto.tipo === "muffin") {
    return `<div class="d-flex justify-content-between align-items-center border-top border-linea pt-2 mb-3">
              <span class="d-block font-display text-dorado fs-5 fw-bold">Caja x6:
                <small class="fs-6 fw-normal text-suave">${formatoPrecio(producto.precios.caja)}</small>
              </span>
            </div>`;
  }
  return Object.entries(producto.precios).map(([tamano, precio], i) => `
    <div class="d-flex justify-content-between ${i === 0 ? "border-top border-linea pt-2 mb-1" : "mb-3"}" style="font-size:0.85rem;">
      <span class="text-suave">${escaparHTML(tamano)}</span>
      <span class="fw-bold text-dorado">${formatoPrecio(precio)}</span>
    </div>`).join("");
}

function listaDetalles(producto) {
  return producto.detalles.map((d, i) => `
    <li class="${i < producto.detalles.length - 1 ? "mb-1" : ""}">
      <i class="bi ${escaparHTML(d.icono)} me-1 text-dorado"></i>${escaparHTML(d.texto)}
    </li>`).join("");
}

/* Chips con los sabores disponibles (solo para "Otros sabores") */
function chipsSaboresEspeciales() {
  /* No se muestra la opción "Otro (escribir mi sabor)" como chip */
  const visibles = SABORES_ESPECIALES.filter(s => !/^otro/i.test(s));
  if (visibles.length === 0) return "";
  return `<div class="chip-sabores">
    ${visibles.map(s => `<span class="chip-sabor">${escaparHTML(s)}</span>`).join("")}
  </div>`;
}

function renderizarProductos() {
  const grid = document.getElementById("gridProductos");
  if (!grid) return;

  grid.innerHTML = PRODUCTOS.map(p => {
    const idSeguro = escaparHTML(p.id);
    /* Foto o ícono (para "Otros sabores"). Clic en la imagen abre el modal. */
    const portada = p.imagen
      ? `<img src="${escaparHTML(p.imagen)}" class="card-img-top producto-img" alt="${escaparHTML(p.alt)}" loading="lazy"
              data-producto="${idSeguro}" data-accion="detalle">`
      : `<div class="producto-sin-foto" role="img" aria-label="${escaparHTML(p.nombre)}"
              data-producto="${idSeguro}" data-accion="detalle">
           <i class="bi bi-cake2"></i>
         </div>`;

    const chips = p.precioAConfirmar ? chipsSaboresEspeciales() : "";

    return `
      <div class="col-12 col-md-6 col-lg-4 producto reveal" data-tipo="${escaparHTML(p.tipo)}" data-categoria="${escaparHTML(p.categorias.join(" "))}">
        <div class="card h-100 bg-tarjeta border-linea producto-card shadow-sm">
          ${portada}
          <div class="card-body d-flex flex-column p-4">
            <h4 class="card-title font-display fw-bold" style="color: var(--text-principal);">${escaparHTML(p.nombre)}</h4>
            <p class="card-text text-suave mb-2" style="font-size:0.9rem;">${escaparHTML(p.descripcion)}</p>
            <ul class="list-unstyled text-suave mb-3" style="font-size:0.78rem;">${listaDetalles(p)}</ul>
            ${chips}
            <div class="mt-auto">
              ${bloquePreciosTarjeta(p)}
              <div class="d-flex gap-2">
                <button type="button" class="btn btn-outline-dorado btn-sm w-100"
                        data-producto="${idSeguro}" data-accion="detalle">Ver detalle</button>
                <button type="button" class="btn btn-dorado btn-sm w-100"
                        data-producto="${idSeguro}" data-accion="agregar">
                  Agregar al pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }).join("");
}

/* ============================================================
   MODAL DE PRODUCTO
   Un único modal para "Ver detalle" y "Agregar al pedido".
   Cambia qué muestra según el tipo de producto:
     - keke normal   → botones Mediano / Familiar (sin preselección)
     - muffin        → contador +/- de cajas (mínimo 1)
     - otros sabores → selector de sabor + tamaño + campo libre
   El botón "Agregar" queda deshabilitado hasta que el cliente
   complete lo necesario.
   ============================================================ */

/* Estado interno del modal (lo que el cliente eligió sin confirmar) */
let modalEstado = {
  productoId: null,
  tamano: null,          // "Mediano" | "Familiar" | null
  cajas: 1,              // muffins
  saborSeleccionado: "", // "Otros sabores"
  saborPersonalizado: "" // texto libre cuando elige "Otro"
};

function elementosModal() {
  return {
    titulo:        document.getElementById("modalTitulo"),
    descripcion:   document.getElementById("modalDescripcion"),
    detalles:      document.getElementById("modalDetalles"),
    imagen:        document.getElementById("modalImagen"),
    opciones:      document.getElementById("modalOpciones"),
    bloqueSabor:   document.getElementById("modalBloqueSabor"),
    selectorSabor: document.getElementById("modalSelectorSabor"),
    bloqueOtro:    document.getElementById("modalBloqueOtro"),
    campoOtro:     document.getElementById("modalSaborOtro"),
    btnAgregar:    document.getElementById("modalAgregar"),
    mensajeAyuda:  document.getElementById("modalMensajeAyuda")
  };
}

/* Pinta las opciones de tamaño como botones (sin preselección) */
function pintarBotonesTamano(contenedor, producto) {
  const tamanos = Object.entries(producto.precios);
  contenedor.innerHTML = `
    <label class="form-label fw-medium" style="font-size:0.9rem;">Tamaño</label>
    <div class="tamano-grupo" role="group" aria-label="Elige un tamaño">
      ${tamanos.map(([t, precio]) => `
        <button type="button" class="btn-tamano" data-tamano="${escaparHTML(t)}">
          <strong>${escaparHTML(t)}</strong>
          <span class="precio">${producto.precioAConfirmar ? "Precio a confirmar" : formatoPrecio(precio)}</span>
        </button>
      `).join("")}
    </div>
  `;
  /* Conecta la selección */
  contenedor.querySelectorAll(".btn-tamano").forEach(btn => {
    btn.addEventListener("click", () => {
      contenedor.querySelectorAll(".btn-tamano").forEach(b => b.classList.remove("seleccionado"));
      btn.classList.add("seleccionado");
      modalEstado.tamano = btn.dataset.tamano;
      actualizarBotonAgregar();
    });
  });
}

/* Pinta el contador +/- para muffins */
function pintarContadorCajas(contenedor) {
  contenedor.innerHTML = `
    <label class="form-label fw-medium" style="font-size:0.9rem;">Cantidad de cajas (x6 unidades)</label>
    <div class="contador-cajas" role="group" aria-label="Cantidad de cajas">
      <button type="button" class="btn btn-outline-dorado" id="modalCajasMenos" aria-label="Disminuir cajas">−</button>
      <span class="valor" id="modalCajasValor" aria-live="polite">1</span>
      <button type="button" class="btn btn-outline-dorado" id="modalCajasMas" aria-label="Aumentar cajas">+</button>
    </div>
    <div class="form-text text-suave mt-1">Los muffins solo se venden por caja de 6 unidades. Mínimo 1 caja.</div>
  `;
  const valorEl = document.getElementById("modalCajasValor");
  document.getElementById("modalCajasMenos").addEventListener("click", () => {
    modalEstado.cajas = Math.max(1, modalEstado.cajas - 1);
    valorEl.textContent = modalEstado.cajas;
  });
  document.getElementById("modalCajasMas").addEventListener("click", () => {
    modalEstado.cajas += 1;
    valorEl.textContent = modalEstado.cajas;
  });
}

/* Habilita/deshabilita el botón "Agregar" según el estado */
function actualizarBotonAgregar() {
  const { btnAgregar, mensajeAyuda } = elementosModal();
  const p = buscarProducto(modalEstado.productoId);
  if (!p) return;

  let habilitar = true;
  let mensaje = "";

  if (p.tipo === "muffin") {
    habilitar = modalEstado.cajas >= 1;
  } else if (p.precioAConfirmar) {
    /* Otros sabores: necesita elegir un sabor y un tamaño */
    if (!modalEstado.saborSeleccionado) {
      habilitar = false;
      mensaje = "Elige un sabor";
    } else if (/^otro/i.test(modalEstado.saborSeleccionado) && !modalEstado.saborPersonalizado.trim()) {
      habilitar = false;
      mensaje = "Escribe el sabor que deseas";
    } else if (!modalEstado.tamano) {
      habilitar = false;
      mensaje = "Elige un tamaño";
    }
  } else {
    /* Keke normal: necesita elegir un tamaño */
    if (!modalEstado.tamano) {
      habilitar = false;
      mensaje = "Elige un tamaño";
    }
  }

  btnAgregar.disabled = !habilitar;
  btnAgregar.setAttribute("aria-disabled", String(!habilitar));
  if (mensaje) {
    mensajeAyuda.textContent = mensaje;
    mensajeAyuda.classList.remove("d-none");
  } else {
    mensajeAyuda.textContent = "";
    mensajeAyuda.classList.add("d-none");
  }
}

/* Prepara el modal para un producto dado */
function prepararModal(idProducto) {
  const p = buscarProducto(idProducto);
  if (!p) return;
  const el = elementosModal();

  /* Reset del estado */
  modalEstado = {
    productoId: p.id,
    tamano: null,
    cajas: 1,
    saborSeleccionado: "",
    saborPersonalizado: ""
  };

  el.titulo.textContent = p.nombre;
  el.descripcion.textContent = p.descripcion;
  el.detalles.innerHTML = listaDetalles(p);

  el.imagen.innerHTML = p.imagen
    ? `<img src="${escaparHTML(p.imagen)}" alt="${escaparHTML(p.alt)}" class="w-100 rounded" style="aspect-ratio:4/3;object-fit:cover;" loading="lazy">`
    : `<div class="producto-sin-foto rounded"><i class="bi bi-cake2"></i></div>`;

  /* Bloque de sabor solo para "Otros sabores" */
  if (p.precioAConfirmar) {
    el.bloqueSabor.classList.remove("d-none");
    el.selectorSabor.innerHTML = `<option value="">Elige un sabor...</option>` +
      SABORES_ESPECIALES.map(s => `<option value="${escaparHTML(s)}">${escaparHTML(s)}</option>`).join("");
    el.selectorSabor.value = "";
    el.bloqueOtro.classList.add("d-none");
    el.campoOtro.value = "";
    el.campoOtro.classList.remove("is-invalid");
  } else {
    el.bloqueSabor.classList.add("d-none");
  }

  /* Opciones de tamaño / cajas */
  if (p.tipo === "muffin") {
    pintarContadorCajas(el.opciones);
  } else {
    pintarBotonesTamano(el.opciones, p);
  }

  actualizarBotonAgregar();
}

/* Cuando se agrega desde el modal */
function agregarDesdeModal() {
  const p = buscarProducto(modalEstado.productoId);
  if (!p) return;
  const el = elementosModal();

  let opcion;
  let cantidad = 1;
  let saborPersonalizado = "";

  if (p.tipo === "muffin") {
    opcion = "caja";
    cantidad = Math.max(1, modalEstado.cajas);
  } else {
    opcion = modalEstado.tamano;
    if (!opcion) { actualizarBotonAgregar(); return; }

    if (p.precioAConfirmar) {
      /* Guardamos el sabor elegido como "saborPersonalizado" para que
         aparezca en el carrito y en el mensaje de WhatsApp */
      const elegido = modalEstado.saborSeleccionado;
      if (!elegido) { actualizarBotonAgregar(); return; }
      if (/^otro/i.test(elegido)) {
        saborPersonalizado = modalEstado.saborPersonalizado.trim().slice(0, 60);
        if (!saborPersonalizado) {
          el.campoOtro.classList.add("is-invalid");
          el.campoOtro.focus();
          return;
        }
      } else {
        saborPersonalizado = elegido;
      }
      /* El sabor incluye el tamaño entre paréntesis para que se vea claro */
      saborPersonalizado = `${saborPersonalizado} (${opcion}) — precio a confirmar`;
    }
  }

  agregarAlCarrito(p.id, opcion, cantidad, saborPersonalizado);

  /* Cerramos el modal y mostramos el toast "Agregado al pedido".
     NO abrimos el panel automáticamente: así el cliente puede seguir
     agregando productos sin interrupciones. */
  const modalEl = document.getElementById("modalProducto");
  bootstrap.Modal.getInstance(modalEl).hide();
  mostrarToast("Agregado al pedido", true);
}

/* ============================================================
   Botón "Agregar al pedido" directo de la tarjeta:
   SIEMPRE abre el modal para que el cliente elija.
   ============================================================ */
function clicAgregarDirecto(id) {
  const modalEl = document.getElementById("modalProducto");
  prepararModal(id);
  bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

/* ---------- Animaciones de scroll ---------- */
function iniciarAnimaciones() {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observador.observe(el));
}

/* ---------- Botón "volver arriba" ---------- */
function iniciarBotonArriba() {
  const boton = document.getElementById("btnArriba");
  window.addEventListener("scroll", () => {
    boton.classList.toggle("d-none", window.scrollY < 400);
  }, { passive: true });
  boton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Cierre del menú móvil al tocar un enlace ---------- */
function iniciarCierreMenu() {
  const navbarNavEl = document.getElementById("navbarNav");
  navbarNavEl.querySelectorAll(".nav-link-cierra").forEach(enlace => {
    enlace.addEventListener("click", () => {
      const instancia = bootstrap.Collapse.getInstance(navbarNavEl);
      if (instancia) instancia.hide();
    });
  });
}

/* ---------- Enlace de WhatsApp de la sección Contacto ---------- */
function configurarEnlaceContacto() {
  const enlace = document.getElementById("enlaceWhatsAppContacto");
  if (!enlace) return;
  const texto = encodeURIComponent("¡Hola! Quiero hacer una consulta sobre un keke.");
  enlace.href = `https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=${texto}`;
}

/* ============================================================
   PANEL DEL CARRITO:
   - Oculta el botón flotante mientras el panel está abierto.
   - Botón "Completar mis datos y enviar": cierra el panel, hace
     scroll suave a #personalizado y enfoca el campo "Tu nombre".
   - Botón "Vaciar pedido": pide confirmación y luego vacía.
   ============================================================ */
function iniciarPanelCarrito() {
  const panel = document.getElementById("panelCarrito");
  const flotantes = document.getElementById("botonesFlotantes");

  panel.addEventListener("show.bs.offcanvas", () => {
    /* Oculta los botones flotantes para que no tapen el pie del panel */
    if (flotantes) flotantes.classList.add("oculto");
  });
  panel.addEventListener("hidden.bs.offcanvas", () => {
    if (flotantes) flotantes.classList.remove("oculto");
  });

  /* "Completar mis datos y enviar" */
  const btnIr = document.getElementById("btnIrAFormulario");
  if (btnIr) {
    btnIr.addEventListener("click", () => {
      /* Esperamos a que el panel termine de cerrarse para evitar que
         Bootstrap deje bloqueado el scroll o el foco en otro elemento. */
      const handler = () => {
        panel.removeEventListener("hidden.bs.offcanvas", handler);
        const destino = document.getElementById("personalizado");
        const campo   = document.getElementById("nombre");
        if (destino) {
          destino.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        /* Pequeño retraso para que el scroll suave no interrumpa el foco */
        setTimeout(() => { if (campo) campo.focus({ preventScroll: true }); }, 350);
      };
      panel.addEventListener("hidden.bs.offcanvas", handler);
      bootstrap.Offcanvas.getOrCreateInstance(panel).hide();
    });
  }

  /* "Vaciar pedido" con confirmación */
  const btnVaciar = document.getElementById("btnVaciarPedido");
  const modalConfirmarEl = document.getElementById("modalConfirmarVaciar");
  const btnConfirmar = document.getElementById("btnConfirmarVaciar");
  if (btnVaciar && modalConfirmarEl && btnConfirmar) {
    btnVaciar.addEventListener("click", () => {
      bootstrap.Modal.getOrCreateInstance(modalConfirmarEl).show();
    });
    btnConfirmar.addEventListener("click", () => {
      vaciarCarrito();
      bootstrap.Modal.getInstance(modalConfirmarEl).hide();
      mostrarToast("Tu pedido quedó vacío");
    });
  }
}

/* ============================================================
   TOAST "Ver mi pedido": al pulsarlo abre el panel del carrito
   ============================================================ */
function iniciarToastVerPedido() {
  const btn = document.getElementById("toastVerPedido");
  const toastEl = document.getElementById("toastCarrito");
  if (!btn || !toastEl) return;
  btn.addEventListener("click", () => {
    /* Primero cerramos el toast y luego, cuando termine de ocultarse,
       abrimos el panel para no mezclar foco/scroll. */
    const inst = bootstrap.Toast.getOrCreateInstance(toastEl);
    const handler = () => {
      toastEl.removeEventListener("hidden.bs.toast", handler);
      bootstrap.Offcanvas.getOrCreateInstance(document.getElementById("panelCarrito")).show();
    };
    toastEl.addEventListener("hidden.bs.toast", handler);
    inst.hide();
  });
}

/* ---------- Arranque ---------- */
renderizarFiltros();
renderizarProductos();
renderizarCarrito();
actualizarFechaMinima();
iniciarAnimaciones();
iniciarBotonArriba();
iniciarCierreMenu();
configurarEnlaceContacto();
iniciarPanelCarrito();
iniciarToastVerPedido();

/* ---- Clics en las tarjetas (ver detalle o agregar) ---- */
document.getElementById("gridProductos").addEventListener("click", (e) => {
  const disparador = e.target.closest("[data-producto]");
  if (!disparador) return;
  const accion = disparador.dataset.accion;
  if (accion === "detalle" || accion === "agregar") {
    clicAgregarDirecto(disparador.dataset.producto);
  }
});

/* ---- Eventos del modal ---- */
const modalProductoEl = document.getElementById("modalProducto");

/* Al abrirse el modal, resetea el botón "Agregar" (quedó deshabilitado
   si así corresponde). No hace falta buscar relatedTarget: el modal
   se abre siempre desde clicAgregarDirecto, que ya prepara el estado. */
modalProductoEl.addEventListener("shown.bs.modal", () => {
  actualizarBotonAgregar();
});

/* Botón "Agregar al pedido" del modal */
document.getElementById("modalAgregar").addEventListener("click", agregarDesdeModal);

/* Selector de sabor (solo visible para "Otros sabores") */
document.getElementById("modalSelectorSabor").addEventListener("change", (e) => {
  modalEstado.saborSeleccionado = e.target.value || "";
  const bloqueOtro = document.getElementById("modalBloqueOtro");
  const esOtro = /^otro/i.test(modalEstado.saborSeleccionado);
  bloqueOtro.classList.toggle("d-none", !esOtro);
  if (!esOtro) {
    document.getElementById("modalSaborOtro").classList.remove("is-invalid");
  }
  actualizarBotonAgregar();
});

/* Campo libre "Otro sabor" */
document.getElementById("modalSaborOtro").addEventListener("input", (e) => {
  /* Recorte extra de seguridad por si el navegador no respeta maxlength */
  if (e.target.value.length > 60) {
    e.target.value = e.target.value.slice(0, 60);
  }
  modalEstado.saborPersonalizado = e.target.value;
  e.target.classList.remove("is-invalid");
  actualizarBotonAgregar();
});
