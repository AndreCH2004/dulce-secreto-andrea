/* ============================================================
   ENVÍO DEL PEDIDO POR WHATSAPP
   - Valida nombre, teléfono y fecha.
   - Respeta la anticipación mínima para kekes (configurada en
     js/config.js con "horasAnticipacionKeke").
   - Arma un mensaje ordenado con todos los productos y abre
     WhatsApp. No es necesario editar este archivo.
   ============================================================ */

/* Convierte una fecha "AAAA-MM-DD" a texto amigable: "viernes 3 de octubre de 2026" */
function fechaLegible(valor) {
  const [anio, mes, dia] = valor.split("-").map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.toLocaleDateString("es-PE", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
}

function fechaACadena(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

/* ¿El carrito tiene al menos un keke? */
function carritoTieneKeke() {
  return carrito.items.some(item => {
    const producto = buscarProducto(item.productoId);
    return producto && producto.tipo === "keke";
  });
}

/* Los kekes necesitan 24 h de anticipación: la fecha mínima es mañana.
   Si el carrito solo tiene muffins (se hornean el mismo día),
   la fecha mínima es hoy. */
function actualizarFechaMinima() {
  const inputFecha = document.getElementById("fechaPedido");
  const ayudaFecha = document.getElementById("ayudaFecha");
  if (!inputFecha) return;

  const hoy = new Date();
  const minima = new Date(hoy);
  if (carritoTieneKeke()) {
    minima.setDate(minima.getDate() + 1); // +24 horas
    ayudaFecha.textContent = `Los kekes se preparan con ${CONFIG.horasAnticipacionKeke} h de anticipación: la fecha más próxima es mañana.`;
  } else {
    ayudaFecha.textContent = "Los muffins se hornean el mismo día: puedes pedirlos para hoy.";
  }
  inputFecha.min = fechaACadena(minima);

  /* Si la fecha elegida quedó antes del mínimo, se corrige sola */
  if (inputFecha.value && inputFecha.value < inputFecha.min) {
    inputFecha.value = inputFecha.min;
  }
}

/* ---------- Armar y enviar el mensaje ---------- */
function enviarPedido(e) {
  e.preventDefault();

  if (carrito.items.length === 0) {
    /* Aviso claro: no hay productos para enviar */
    mostrarToast("Tu pedido está vacío: agrega al menos un producto 🍰", true);
    return;
  }

  const formulario = document.getElementById("formPedido");
  if (!formulario.checkValidity()) {
    formulario.reportValidity();
    return;
  }

  const nombre   = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const fecha    = document.getElementById("fechaPedido").value;
  const detalles = document.getElementById("detalles").value.trim();

  /* Encabezado con los datos del cliente (mismo formato de siempre) */
  let mensaje = `¡Hola! Quiero hacer un pedido 🍰\n\n`;
  mensaje += `*Nombre:* ${nombre}\n`;
  mensaje += `*Teléfono:* ${telefono}\n`;
  mensaje += `*Fecha en que lo necesito:* ${fechaLegible(fecha)}\n\n`;

  /* Lista de productos */
  mensaje += `*Mi pedido:*\n`;
  carrito.items.forEach(item => {
    const info = descripcionItem(item);
    if (!info) return;
    const { nombreMostrado, opcionTexto, precio } = info;
    const precioTexto = precio === null
      ? "precio a confirmar"
      : formatoPrecio(precio * item.cantidad);
    mensaje += `  - ${item.cantidad} x ${nombreMostrado} (${opcionTexto}) — ${precioTexto}\n`;
  });

  /* Adicionales (una sola vez por pedido) */
  const adicionalesMarcados = CONFIG.adicionales.filter(a => carrito.adicionales.includes(a.id));
  if (adicionalesMarcados.length > 0) {
    mensaje += `\n*Adicionales:*\n`;
    adicionalesMarcados.forEach(a => {
      mensaje += `  - ${a.nombre} (${formatoPrecio(a.precio)})\n`;
    });
  }

  if (detalles) {
    mensaje += `\n*Detalles:* ${detalles}\n`;
  }

  /* Total (con aviso si hay precios por confirmar) */
  const t = calcularTotales();
  mensaje += `\n*Total estimado: ${formatoPrecio(t.total)}*`;
  if (t.hayPrecioPorConfirmar) {
    mensaje += `\n_El pedido incluye un producto con precio por confirmar: me lo confirmas por aquí, por favor._`;
  } else {
    mensaje += `\n_(precio referencial, puede variar según el sabor final)_`;
  }

  const link = `https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=${encodeURIComponent(mensaje)}`;
  /* Si el navegador bloquea las ventanas emergentes (window.open devuelve
     null), navegamos en la misma pestaña como alternativa. */
  const ventana = window.open(link, "_blank");
  if (!ventana) {
    window.location.href = link;
  }
  /* No se vacía el carrito automáticamente: el cliente puede necesitar
     volver a WhatsApp o ajustar algo. El botón "Vaciar pedido" del panel
     está ahí si quiere empezar de cero. */
}

document.getElementById("formPedido").addEventListener("submit", enviarPedido);
