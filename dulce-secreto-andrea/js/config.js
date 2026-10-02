/* ============================================================
   CONFIGURACIÓN GENERAL DEL NEGOCIO
   ------------------------------------------------------------
   Aquí se cambian los datos más importantes de la página.
   No hace falta tocar ningún otro archivo.
   ============================================================ */

const CONFIG = {

  /* Nombre del negocio (se usa en el mensaje de WhatsApp) */
  nombreNegocio: "El Dulce Secreto de Andrea",

  /* ------------------------------------------------------------
     NÚMERO DE WHATSAPP
     Formato: código de país + número, SIN espacios, SIN "+".
     Ejemplo Perú: "51" + "930371567"  →  "51930371567"
     >>> PARA CAMBIAR EL NÚMERO, EDITA SOLO ESTA LÍNEA <<<
     ------------------------------------------------------------ */
  whatsapp: "51930371567",

  /* Horas de anticipación mínima para pedir un KEKE
     (los muffins se hornean el mismo día) */
  horasAnticipacionKeke: 24,

  /* Símbolo de moneda que se muestra en los precios */
  moneda: "S/",

  /* ------------------------------------------------------------
     ADICIONALES (se eligen una sola vez por pedido)
     Para cambiar un precio, edita el número de "precio".
     Para agregar uno nuevo, copia una línea y cámbiale:
       - id:     un nombre corto en minúsculas, sin espacios
       - nombre: lo que verá el cliente
       - precio: el costo en soles
     Para quitar uno, borra su línea.
     ------------------------------------------------------------ */
  adicionales: [
    { id: "dedicatoria", nombre: "Dedicatoria escrita",                precio: 5 },
    { id: "vela",        nombre: "Vela decorativa",                    precio: 3 },
    { id: "topping",     nombre: "Topping extra (frutas o chispas)",   precio: 6 },
    { id: "empaque",     nombre: "Empaque de regalo",                  precio: 8 }
  ]
};
