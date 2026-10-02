# El Dulce Secreto de Andrea — Página web

Página estática de la pastelería: catálogo de kekes y muffins, carrito de
varios productos y pedido por WhatsApp. Hecha con HTML, CSS y JavaScript,
sin servidor ni base de datos.

## Estructura del proyecto

```
├── index.html          → Página principal
├── css/
│   └── styles.css      → Estilos y tema claro/oscuro
├── js/
│   ├── config.js       → ★ Número de WhatsApp, nombre del negocio, adicionales
│   ├── productos.js    → ★ Catálogo de productos y sabores especiales
│   ├── tema.js         → Modo claro/oscuro (se guarda la elección)
│   ├── filtros.js      → Botones de filtro del catálogo
│   ├── carrito.js      → Carrito con varios productos (se guarda en el navegador)
│   ├── pedido.js       → Validaciones y mensaje de WhatsApp
│   └── main.js         → Tarjetas, modal, animaciones y botones flotantes
├── img/
│   ├── productos/      → Fotos de los productos (1200x896, formato 4:3)
│   └── logo/           → Logo del negocio (825x1024, formato 4:5)
└── README.md           → Este archivo
```

## Cómo probarlo en tu computadora

Haz doble clic en `index.html` y se abrirá en tu navegador. Todo funciona
sin internet salvo las fuentes, Bootstrap y los íconos (se cargan de la nube).

## Cosas que puedes cambiar fácilmente

| Qué cambiar                       | Dónde                                                   |
|-----------------------------------|---------------------------------------------------------|
| Número de WhatsApp                | `js/config.js` → línea `whatsapp`                       |
| Nombre del negocio                | `js/config.js` → línea `nombreNegocio`                  |
| Horas de anticipación             | `js/config.js` → línea `horasAnticipacionKeke`          |
| Adicionales y sus precios         | `js/config.js` → lista `adicionales`                    |
| Precios de kekes y muffins        | `js/productos.js` → campo `precios` de cada uno         |
| Agregar un producto nuevo         | `js/productos.js` (hay una guía paso a paso arriba)     |
| Sabores de "Otros sabores"        | `js/productos.js` → arreglo `SABORES_ESPECIALES`        |
| Textos de la página               | `index.html`                                            |

## Antes de publicar en GitHub Pages (Open Graph)

En `index.html`, dentro del `<head>`, hay dos líneas marcadas como
`[EDITAR AQUÍ AL PUBLICAR]`:

- `<meta property="og:image" content="https://USUARIO.github.io/REPO/img/logo/logo-empresa.jpeg">`
- `<meta property="og:url"   content="https://USUARIO.github.io/REPO/">`

Reemplaza `USUARIO` por tu usuario de GitHub y `REPO` por el nombre del
repositorio. **WhatsApp solo muestra la vista previa si estas dos
direcciones son completas (empiezan con `https://`).**

## Cómo subirlo a GitHub Pages (paso a paso, para principiantes)

1. **Crea una cuenta en GitHub** (si no tienes): entra a
   [github.com](https://github.com) y regístrate gratis.

2. **Crea un repositorio nuevo**: en la página principal de GitHub, pulsa el
   botón verde **"New"** (o el "+" de arriba a la derecha → "New repository").
   - En **Repository name** escribe, por ejemplo: `dulce-secreto`
     (minúsculas, sin espacios).
   - Déjalo como **Public** y pulsa **Create repository**.

3. **Sube los archivos**: en la página del repositorio recién creado, haz clic
   en el enlace **"uploading an existing file"**.
   - Arrastra **TODOS los archivos y carpetas** de este proyecto
     (`index.html`, las carpetas `css`, `js`, `img` y `README.md`).
   - Espera a que termine de cargar y pulsa el botón verde **"Commit changes"**.

4. **Activa GitHub Pages**:
   - Dentro del repositorio, entra a **Settings** (arriba) → **Pages**
     (menú de la izquierda).
   - En **"Build and deployment"**, donde dice **Branch**, elige **main**
     y deja la carpeta como **/ (root)**. Pulsa **Save**.

5. **Espera 1 o 2 minutos** y recarga esa misma página de Settings → Pages:
   arriba aparecerá tu dirección, algo como:
   `https://tu-usuario.github.io/dulce-secreto/`

6. **Comparte ese enlace por WhatsApp** con tus clientes. ¡Listo!

> Si algún día cambias un archivo (por ejemplo, un precio), repite el paso 3
> subiendo solo ese archivo y los cambios aparecerán en un par de minutos.
