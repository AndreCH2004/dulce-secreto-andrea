/* ============================================================
   CATÁLOGO DE PRODUCTOS — El Dulce Secreto de Andrea
   ------------------------------------------------------------
   TODO el catálogo vive en ESTE archivo: las tarjetas, los
   filtros, el modal de detalle y los precios del pedido se
   generan automáticamente desde el arreglo PRODUCTOS.

   ╔══════════════════════════════════════════════════════════╗
   ║        CÓMO AGREGAR UN PRODUCTO NUEVO (paso a paso)      ║
   ╠══════════════════════════════════════════════════════════╣
   ║ 1. Copia la foto del producto a la carpeta:              ║
   ║       img/productos/                                     ║
   ║    Recomendado: 1200 x 896 píxeles (formato 4:3).        ║
   ║    Nombre del archivo: minúsculas, sin espacios ni       ║
   ║    tildes. Ejemplo: keke-lucuma.jpg                      ║
   ║                                                          ║
   ║ 2. Copia uno de los bloques { ... } de abajo, pégalo     ║
   ║    al final de la lista (antes del corchete de cierre    ║
   ║    ] ) y edita sus datos. No olvides la coma "," al      ║
   ║    final del bloque anterior.                            ║
   ║                                                          ║
   ║ 3. Campos de cada producto:                              ║
   ║    id          → nombre corto único, en minúsculas       ║
   ║                  y sin espacios (ej. "keke-lucuma").     ║
   ║    tipo        → "keke" (se vende por tamaño) o          ║
   ║                  "muffin" (se vende por caja x6).        ║
   ║    nombre      → nombre que verá el cliente.             ║
   ║    descripcion → frase corta de la tarjeta.              ║
   ║    categorias  → lista para los filtros. Valores ya      ║
   ║                  usados: "chocolate", "frutal",          ║
   ║                  "clasico", "muffins". Puedes usar       ║
   ║                  varios: ["frutal", "chocolate"].        ║
   ║    imagen      → ruta de la foto (paso 1).               ║
   ║    alt         → texto alternativo que describe la foto  ║
   ║                  (importante para accesibilidad y SEO).  ║
   ║    detalles    → lista de puntos con ícono. Puedes       ║
   ║                  cambiar el ícono por cualquiera de      ║
   ║                  Bootstrap Icons (bi-...).               ║
   ║    precios     → PARA KEKE:  { Mediano: 18, Familiar: 25 }║
   ║                  PARA MUFFIN: { caja: 15 }  (caja x6)    ║
   ║                  >>> PARA CAMBIAR PRECIOS, EDITA ESTOS   ║
   ║                      NÚMEROS Y LISTO <<<                 ║
   ║                                                          ║
   ║ 4. Guarda el archivo y recarga la página. ¡Listo!        ║
   ╚══════════════════════════════════════════════════════════╝

   EJEMPLO COMENTADO (quítale las barras "//" para activarlo):

   {
     id: "keke-lucuma",
     tipo: "keke",
     nombre: "Keke de Lúcuma",
     descripcion: "Bizcocho suave con lúcuma fresca.",
     categorias: ["frutal", "clasico"],
     imagen: "img/productos/keke-lucuma.jpg",
     alt: "Keke de lúcuma recién horneado, dorado por fuera",
     detalles: [
       { icono: "bi-egg-fried",      texto: "Hecho con lúcuma fresca" },
       { icono: "bi-clock-history",  texto: "Preparado bajo pedido, con 24h de anticipación" }
     ],
     precios: { Mediano: 17, Familiar: 24 }
   },
   ============================================================ */

const PRODUCTOS = [

  {
    id: "keke-platano-choc",
    tipo: "keke",
    nombre: "Keke de Plátano con Chocolate",
    descripcion: "Plátano natural y trozos de chocolate.",
    categorias: ["frutal", "chocolate"],
    imagen: "img/productos/platano-choc.jpg",
    alt: "Keke artesanal de plátano con trozos de chocolate, dorado y recién horneado",
    detalles: [
      { icono: "bi-egg-fried",     texto: "Hecho con plátano fresco de estación" },
      { icono: "bi-clock-history", texto: "Preparado bajo pedido, con 24h de anticipación" }
    ],
    precios: { Mediano: 18.00, Familiar: 25.00 }
  },

  {
    id: "keke-chocolate",
    tipo: "keke",
    nombre: "Keke de Chocolate",
    descripcion: "Bizcocho húmedo de chocolate, receta clásica.",
    categorias: ["chocolate"],
    imagen: "img/productos/chocolate.jpg",
    alt: "Keke de chocolate húmedo con baño de chocolate por encima",
    detalles: [
      { icono: "bi-egg-fried",     texto: "Cacao de buena calidad y baño de chocolate" },
      { icono: "bi-clock-history", texto: "Preparado bajo pedido, con 24h de anticipación" }
    ],
    precios: { Mediano: 16.00, Familiar: 22.00 }
  },

  {
    id: "keke-naranja",
    tipo: "keke",
    nombre: "Keke de Naranja",
    descripcion: "Aroma de naranja natural, esponjoso y ligero.",
    categorias: ["clasico"],
    imagen: "img/productos/naranja.jpg",
    alt: "Keke de naranja esponjoso decorado con ralladura y rodajas de naranja natural",
    detalles: [
      { icono: "bi-egg-fried",     texto: "Ralladura y jugo de naranja natural" },
      { icono: "bi-clock-history", texto: "Preparado bajo pedido, con 24h de anticipación" }
    ],
    precios: { Mediano: 15.00, Familiar: 20.00 }
  },

  {
    id: "muffins-chocolate",
    tipo: "muffin",
    nombre: "Muffins de Chocolate",
    descripcion: "Muffins individuales bien esponjosos, con chispas de chocolate.",
    categorias: ["muffins", "chocolate"],
    imagen: "img/productos/muffins-chocolate.jpg",
    alt: "Caja con seis muffins de chocolate esponjosos con chispas de chocolate",
    detalles: [
      { icono: "bi-box-seam",      texto: "Se venden por caja, mínimo 6 unidades" },
      { icono: "bi-clock-history", texto: "Horneados el mismo día de tu pedido" }
    ],
    /* Para muffins, "caja" es el precio de la caja x6 unidades */
    precios: { caja: 15.00 }
  },

  {
    id: "muffins-arandanos",
    tipo: "muffin",
    nombre: "Muffins de Arándanos",
    descripcion: "Con arándanos naturales, ideales para acompañar tu café.",
    categorias: ["muffins", "frutal"],
    imagen: "img/productos/muffins-arandanos.jpg",
    alt: "Caja con seis muffins de arándanos naturales recién horneados",
    detalles: [
      { icono: "bi-box-seam",      texto: "Se venden por caja, mínimo 6 unidades" },
      { icono: "bi-clock-history", texto: "Horneados el mismo día de tu pedido" }
    ],
    precios: { caja: 15.00 }
  },

  /* ------------------------------------------------------------
     OPCIÓN ESPECIAL: "OTROS SABORES"
     No es un producto con foto: permite pedir un keke de otro
     sabor. La lista desplegable sale del arreglo
     SABORES_ESPECIALES (más abajo). El precio se confirma por
     WhatsApp.
     ------------------------------------------------------------ */
  {
    id: "keke-otros-sabores",
    tipo: "keke",
    nombre: "Otros sabores",
    descripcion: "¿Se te antoja algo distinto? Elige uno de nuestros sabores especiales o cuéntanos el tuyo.",
    categorias: ["clasico"],
    imagen: "",                       /* sin foto: se muestra un ícono */
    alt: "",
    detalles: [
      { icono: "bi-chat-heart", texto: "Tú eliges el sabor o la combinación" },
      { icono: "bi-whatsapp",   texto: "El precio se confirma por WhatsApp" }
    ],
    precios: { Mediano: null, Familiar: null },
    precioAConfirmar: true            /* marca que el precio no está fijado */
  }

  /* Pega aquí tu producto nuevo (mira el ejemplo comentado de arriba) */
];

/* ============================================================
   SABORES ESPECIALES — Lista editable
   ------------------------------------------------------------
   Se muestran en:
     1) El menú desplegable "Sabor" de la tarjeta "Otros sabores".
     2) Las etiquetas pequeñas que aparecen en esa tarjeta.

   CÓMO AGREGAR UN SABOR:
     - Copia una línea y edita el texto entre comillas.
     - Mantén las comas al final de cada línea.

   CÓMO QUITAR UN SABOR:
     - Borra la línea completa (incluida su coma).

   CÓMO RENOMBRAR UN SABOR:
     - Solo cambia el texto entre comillas.

   NO borres ni cambies la última opción "Otro (escribir mi sabor)",
   porque es la que activa el campo libre para que el cliente
   escriba un sabor nuevo. Si decides quitarla, los clientes solo
   podrán elegir sabores de esta lista.
   ============================================================ */
const SABORES_ESPECIALES = [
  "Keke de Zanahoria",
  "Keke de Zapallo",
  "Keke de Piña",
  "Keke de Maracuyá",
  "Otro (escribir mi sabor)"   /* <- opción que activa el campo libre */
];

/* ------------------------------------------------------------
   FILTROS DEL CATÁLOGO
   Cada filtro es:  clave interna : texto del botón.
   La clave debe coincidir con las "categorias" de los productos.
   Si agregas una categoría nueva a un producto, añade aquí su
   botón copiando una línea.
   ------------------------------------------------------------ */
const CATEGORIAS = {
  todos:     "Todos",
  chocolate: "Chocolate",
  frutal:    "Frutal",
  clasico:   "Clásico",
  muffins:   "Muffins"
};
