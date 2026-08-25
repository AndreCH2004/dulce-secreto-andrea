<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>El Dulce Secreto de Andrea | Pastelería Artesanal</title>
<meta name="description" content="Queques artesanales preparados a tu gusto. Elige tu sabor y arma tu pedido.">

<!-- ============================================================
     FUENTES
     - "Cormorant Garamond" = títulos (serif clásica)
     - "Jost" = texto general
     Si quieres cambiar de fuente, hazlo aquí y en --font-* abajo.
============================================================= -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">

<style>
  /* ============================================================
     1. VARIABLES DE MARCA
     Paleta inspirada en tu flyer (negro + dorado) pero más suave:
     fondo carbón oscuro en vez de negro puro, dorado como acento
     puntual, no como color dominante.
  ============================================================= */
  :root{
    --fondo:        #17140f;   /* carbón oscuro, no negro puro */
    --fondo-suave:  #1e1a14;
    --tarjeta:      #211d16;
    --texto:        #ece6d8;
    --texto-suave:  #a89e8c;
    --dorado:       #b6924f;
    --dorado-suave: #8c7343;
    --linea:        #3a3327;

    --font-display: 'Cormorant Garamond', serif;
    --font-body:    'Jost', sans-serif;

    --radio: 4px;
  }

  *{ box-sizing:border-box; margin:0; padding:0; }
  html{ scroll-behavior:smooth; }

  body{
    background: var(--fondo);
    color: var(--texto);
    font-family: var(--font-body);
    line-height: 1.65;
  }

  img{  display:block; }
  a{ color:inherit; text-decoration:none; }
  ::selection{ background: var(--dorado-suave); color:#fff; }

  a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible{
    outline: 1px solid var(--dorado);
    outline-offset: 3px;
  }

  .contenedor{
    width:100%;
    max-width: 1120px;
    margin-inline:auto;
    padding-inline: 24px;
  }

  .filete{
    display:flex; align-items:center; justify-content:center; gap:14px;
    color: var(--dorado);
    font-size: 0.7rem;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .filete::before, .filete::after{
    content:""; width:30px; height:1px; background: var(--linea);
  }

  /* ============================================================
     2. ENCABEZADO
  ============================================================= */
  header{
    position:sticky; top:0; z-index:100;
    background: rgba(23,20,15,0.94);
    border-bottom: 1px solid var(--linea);
  }

  .nav{ display:flex; align-items:center; justify-content:space-between; padding-block:16px; }
  .marca{ display:flex; align-items:center; gap:13px; }

  .marca-logo{
    width:44px; height:44px; border-radius:50%;
    border:1px solid var(--dorado);
    display:flex; align-items:center; justify-content:center;
    font-family: var(--font-display); font-style:italic; font-weight:600;
    font-size:1.3rem; color: var(--dorado);
    background: var(--fondo-suave);
    /* 👉 Reemplaza este círculo con tu logo real, por ejemplo:
       <img class="marca-logo" src="RUTA_O_LINK_DE_TU_LOGO" alt="El Dulce Secreto de Andrea"> */
  }

  .marca-texto p{ font-family: var(--font-display); font-weight:600; font-size:1.02rem; color:var(--texto); line-height:1.1; }
  .marca-texto span{ display:block; font-size:0.58rem; letter-spacing:2px; color:var(--dorado); text-transform:uppercase; margin-top:3px; }

  .nav-links{ display:flex; gap:30px; font-size:0.82rem; letter-spacing:0.3px; }
  .nav-links a{ color: var(--texto-suave); transition:color .2s; }
  .nav-links a:hover{ color:var(--dorado); }

  .nav-cta{
    background: transparent;
    border: 1px solid var(--dorado);
    color: var(--dorado);
    font-weight:500; font-size:0.78rem;
    padding:10px 20px; border-radius: var(--radio);
    letter-spacing:0.3px;
    transition: background .2s, color .2s;
  }
  .nav-cta:hover{ background: var(--dorado); color: var(--fondo); }

  /* Menú hamburguesa */
  .menu-toggle{
    display:none; flex-direction:column; justify-content:center; gap:5px;
    background:none; border:none; cursor:pointer; padding:6px;
  }
  .menu-toggle span{ width:22px; height:1px; background: var(--dorado); display:block; }

  /* ============================================================
     3. HERO
  ============================================================= */
  .hero{ padding: 76px 0 84px; text-align:center; }

  .hero h1{
    font-family: var(--font-display);
    font-weight:600;
    font-size: clamp(2rem, 5vw, 3rem);
    color: var(--texto);
    margin-top: 18px;
  }
  .hero h1 em{
    display:block;
    font-style:italic;
    font-weight:600;
    color: var(--dorado);
    font-size: clamp(2.3rem, 6vw, 3.6rem);
    line-height:1.15;
  }

  .hero p.sub{
    max-width: 500px; margin: 20px auto 32px;
    color: var(--texto-suave); font-size:0.98rem;
  }

  .hero-botones{ display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

  .btn{
    display:inline-block; padding:13px 28px; border-radius:var(--radio);
    font-weight:500; font-size:0.85rem; letter-spacing:0.3px;
    transition: background .2s, color .2s;
    cursor:pointer; border:1px solid var(--dorado);
    font-family: inherit;
  }
  .btn-dorado{ background: var(--dorado); color: var(--fondo); }
  .btn-dorado:hover{ background: var(--dorado-suave); }
  .btn-borde{ background: transparent; color: var(--dorado); }
  .btn-borde:hover{ background: var(--dorado); color: var(--fondo); }

  /* franja de datos simples, sin iconos vistosos */
  .franja{
    margin-top: 56px;
    display:grid; grid-template-columns: repeat(3,1fr);
    border-top:1px solid var(--linea); border-bottom:1px solid var(--linea);
  }
  .franja-item{ padding: 22px 14px; text-align:center; border-right:1px solid var(--linea); }
  .franja-item:last-child{ border-right:none; }
  .franja-item strong{ display:block; font-family:var(--font-display); font-size:1rem; color:var(--dorado); margin-bottom:3px; }
  .franja-item span{ font-size:0.74rem; color:var(--texto-suave); }

  /* ============================================================
     4. SECCIONES GENERALES
  ============================================================= */
  section{ padding: 80px 0; }

  .titulo-seccion{ text-align:center; margin-bottom:46px; }
  .titulo-seccion .filete{ justify-content:center; margin-bottom:12px; }
  .titulo-seccion h2{
    font-family: var(--font-display); font-weight:600;
    font-size: clamp(1.7rem, 3.5vw, 2.2rem); color: var(--texto);
  }
  .titulo-seccion p{ max-width:460px; margin:12px auto 0; color:var(--texto-suave); font-size:0.9rem; }

  /* ============================================================
     5. FILTRO DE CATEGORÍA (simple, sin animaciones vistosas)
     👉 Es un filtro básico con JavaScript: al hacer click en una
     categoría, se muestran/ocultan tarjetas según su atributo
     data-categoria. No es una función compleja, solo mostrar/ocultar.
  ============================================================= */
  .filtro{
    display:flex; flex-wrap:wrap; justify-content:center; gap:8px;
    margin-bottom: 40px;
  }
  .filtro-btn{
    border:1px solid var(--linea); background: transparent;
    color: var(--texto-suave);
    padding:8px 18px; font-size:0.78rem; border-radius:var(--radio);
    cursor:pointer; font-family:inherit; transition: border-color .2s, color .2s;
  }
  .filtro-btn.activo{ border-color: var(--dorado); color: var(--dorado); }

  /* ============================================================
     6. GRID DE PRODUCTOS (KEKES)
     ============================================================
     👉 PARA AGREGAR UN NUEVO KEKE:
     1. Copia un bloque completo <article class="producto">...</article>
     2. Pégalo dentro de <div class="grid-productos">, antes de la
        tarjeta "Espacio para más kekes" (o donde prefieras).
     3. Cambia:
        - data-categoria: usa una de las que ya existen (ver los
          botones de .filtro más abajo en el HTML) o crea una nueva
          categoría — si creas una nueva, agrega también su botón
          en la sección .filtro. Si el keke encaja en más de una
          categoría, escríbelas separadas por un espacio dentro de
          las mismas comillas, ej: data-categoria="frutal chocolate"
        - data-sabor: el texto exacto que se va a llenar solo en el
          campo "Sabor que deseas" del formulario cuando el cliente
          presione "Pedir" en esa tarjeta.
        - la imagen (src y alt)
        - el nombre del keke
        - la descripción corta
        - el precio

     👉 PARA LA IMAGEN:
     Coloca el link directo de tu foto (por ejemplo, súbela a la
     carpeta img/ del mismo repositorio y usa "img/nombre.jpg", o
     usa un link de un servicio como Imgur). Aquí dejo un texto de
     marcador de posición: RUTA_O_LINK_DE_LA_IMAGEN — reemplázalo.
  ============================================================= */
  .grid-productos{ display:grid; grid-template-columns: repeat(3,1fr); gap:28px; }

  .producto{
    background: var(--tarjeta);
    border:1px solid var(--linea);
    border-radius: var(--radio);
    overflow:hidden;
    transition: border-color .2s;
  }
  .producto:hover{ border-color: var(--dorado-suave); }

  .producto-img{ aspect-ratio:4/3; overflow:hidden; background: var(--fondo-suave); }
  .producto-img img{ width:100%; height:100%; object-fit:cover; }

  .producto-info{ padding: 22px 22px 24px; }
  .producto-info h3{ font-family:var(--font-display); font-weight:600; font-size:1.2rem; color:var(--texto); margin-bottom:7px; }
  .producto-info p{ font-size:0.83rem; color:var(--texto-suave); margin-bottom:16px; min-height:38px; }

  .producto-footer{ display:flex; align-items:center; justify-content:space-between; }
  .producto-precio{ font-family:var(--font-display); font-weight:600; font-size:1.1rem; color:var(--dorado); }
  .producto-precio span{ display:block; font-family:var(--font-body); font-size:0.62rem; color:var(--texto-suave); font-weight:400; }

  .btn-pedir{
    background:transparent; border:1px solid var(--dorado-suave); color:var(--dorado);
    font-size:0.76rem; padding:8px 16px; border-radius:var(--radio);
    transition: background .2s, color .2s; cursor:pointer; font-family:inherit;
  }
  .btn-pedir:hover{ background:var(--dorado); color:var(--fondo); }

  /* Tarjeta guía para agregar más kekes, se puede borrar cuando quieras */
  .producto.espacio-libre{
    display:flex; align-items:center; justify-content:center;
    min-height:280px;
    border:1px dashed var(--linea);
    background: transparent;
  }
  .producto.espacio-libre p{
    text-align:center; padding:26px; color: var(--texto-suave); font-size:0.8rem;
  }

  /* ============================================================
     7. ARMA TU PEDIDO
     👉 El cliente escribe libremente el sabor que quiere (no una
     lista cerrada), porque se pueden preparar distintas
     combinaciones según el gusto de cada quien.
  ============================================================= */
  .personalizado{ background: var(--fondo-suave); border-top:1px solid var(--linea); border-bottom:1px solid var(--linea); }

  .form-pedido{
    max-width: 680px; margin: 0 auto;
    background: var(--tarjeta);
    border:1px solid var(--linea);
    border-radius: var(--radio);
    padding: 40px 36px;
  }

  .campo{ margin-bottom: 22px; }
  .campo label{ display:block; font-size:0.8rem; font-weight:500; color:var(--texto); margin-bottom:9px; letter-spacing:0.2px; }
  .campo-ayuda{ font-size:0.72rem; color:var(--texto-suave); margin-top:6px; }

  .campo input[type="text"],
  .campo input[type="tel"],
  .campo select,
  .campo textarea{
    width:100%;
    border:1px solid var(--linea);
    background: var(--fondo-suave);
    border-radius: var(--radio);
    padding: 12px 14px;
    font-family: var(--font-body);
    font-size:0.88rem;
    color: var(--texto);
  }
  .campo textarea{ resize:vertical; min-height:80px; }

  .fila-dos{ display:grid; grid-template-columns:1fr 1fr; gap:18px; }

  .form-pedido .btn{ width:100%; text-align:center; margin-top:8px; }

  /* ============================================================
     8. SOBRE ANDREA
  ============================================================= */
  .sobre-grid{ display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
  .sobre-texto h2{ font-family:var(--font-display); font-weight:600; font-size:clamp(1.6rem,3vw,2.1rem); margin-bottom:16px; }
  .sobre-texto p{ color:var(--texto-suave); margin-bottom:22px; }

  .lista-valores{ display:flex; flex-direction:column; gap:16px; }
  .valor{ display:flex; gap:14px; align-items:flex-start; }
  .valor-marca{ width:5px; height:5px; border-radius:50%; background:var(--dorado); margin-top:9px; flex-shrink:0; }
  .valor h4{ font-family:var(--font-display); font-weight:600; color:var(--dorado); font-size:0.98rem; margin-bottom:2px; }
  .valor p{ font-size:0.83rem; color:var(--texto-suave); margin:0; }

  .sobre-imagen{
    border-radius: var(--radio); overflow:hidden; aspect-ratio:4/5;
  }
  .sobre-imagen img{ width:100%; height:100%; object-fit:cover; }

  /* ============================================================
     9. CONTACTO
  ============================================================= */
  .contacto{ text-align:center; background: var(--fondo-suave); border-top:1px solid var(--linea); }
  .contacto h2{ font-family:var(--font-display); font-weight:600; font-size:clamp(1.7rem,3.5vw,2.2rem); margin-bottom:14px; }
  .contacto p{ color:var(--texto-suave); max-width:460px; margin:0 auto 28px; }

  .contacto-medios{ display:flex; justify-content:center; gap:18px; flex-wrap:wrap; margin-top:28px; }
  .medio{
    background: var(--tarjeta); border:1px solid var(--linea); border-radius:var(--radio);
    padding:15px 22px; font-size:0.83rem;
  }

  /* ============================================================
     10. FOOTER
  ============================================================= */
  footer{ padding:36px 0; text-align:center; font-size:0.76rem; color: var(--texto-suave); border-top:1px solid var(--linea); }
  footer strong{ color: var(--dorado); }

  /* ============================================================
     11. RESPONSIVE
  ============================================================= */
  @media (max-width:900px){
    .grid-productos{ grid-template-columns: repeat(2,1fr); }
    .sobre-grid{ grid-template-columns:1fr; gap:32px; }
    .sobre-imagen{ order:-1; aspect-ratio:16/9; }
    .fila-dos{ grid-template-columns:1fr; }
  }

  @media (max-width:640px){
    .nav-links{
      position:fixed; top:69px; right:0;
      flex-direction:column;
      background: var(--fondo-suave);
      border-left:1px solid var(--linea); border-bottom:1px solid var(--linea);
      width:210px; padding:20px; gap:18px;
      transform: translateX(100%); transition: transform .25s ease;
    }
    .nav-links.abierto{ transform: translateX(0); }
    .nav-cta{ display:none; }
    .menu-toggle{ display:flex; }
    .franja{ grid-template-columns:1fr; }
    .franja-item{ border-right:none; border-bottom:1px solid var(--linea); }
    .franja-item:last-child{ border-bottom:none; }
    .grid-productos{ grid-template-columns:1fr; }
    .hero{ padding:52px 0 60px; }
    .form-pedido{ padding:30px 20px;}
  }

  @media (prefers-reduced-motion: reduce){
    *{ transition:none !important; }
    html{ scroll-behavior:auto; }
  }
  @media (min-width:900px){
    .sobre-imagen img{ width: 100%;max-width:800px; height:auto;display:block; margin: auto; padding-top: 150px; }
  }

</style>
</head>
<body>

<!-- =================== ENCABEZADO =================== -->
<header>
  <div class="contenedor nav">
    <div class="marca">
      <div class="marca-logo">A</div>
      <div class="marca-texto">
        <p>El Dulce Secreto</p>
        <span>de Andrea</span>
      </div>
    </div>

    <nav class="nav-links" id="navLinks">
      <a href="#productos">Kekes</a>
      <a href="#personalizado">Hacer pedido</a>
      <a href="#nosotros">Nosotros</a>
      <a href="#contacto">Contacto</a>
    </nav>

    <a href="#personalizado" class="nav-cta">Hacer pedido</a>

    <button class="menu-toggle" id="menuToggle" aria-label="Abrir menú">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<!-- =================== HERO =================== -->
<section class="hero">
  <div class="contenedor">
    <span class="filete">Pastelería artesanal</span>
    <h1>Kekes preparados<em>a tu gusto</em></h1>
    <p class="sub">Cada keke se prepara artesanalmente según lo que pidas. Elige un sabor de la lista o cuéntanos qué se te antoja.</p>

    <div class="hero-botones">
      <a href="#productos" class="btn btn-dorado">Ver kekes</a>
      <a href="#personalizado" class="btn btn-borde">Hacer pedido</a>
    </div>

    <div class="franja">
      <div class="franja-item"><strong>Variedad</strong><span>Distintos sabores disponibles</span></div>
      <div class="franja-item"><strong>A tu gusto</strong><span>Pedidos personalizados</span></div>
      <div class="franja-item"><strong>Artesanal</strong><span>Preparado por pedido</span></div>
    </div>
  </div>
</section>

<!-- =================== PRODUCTOS ===================
     👉 Catálogo de kekes. Lee los comentarios de la sección
     .grid-productos en el CSS de arriba para saber cómo agregar más.
================================================== -->
<section id="productos">
  <div class="contenedor">
    <div class="titulo-seccion">
      <span class="filete">Nuestros kekes</span>
      <h2>Algunos de nuestros sabores</h2>
      <p>Esta es una muestra de lo que preparamos. Si buscas otro sabor o una combinación distinta, puedes pedirlo en la siguiente sección.</p>
    </div>

    <!-- Filtro simple: botones que muestran/ocultan tarjetas según
         data-categoria. Para agregar una categoría nueva, agrega
         aquí un botón con su propio data-filtro y úsalo en el
         data-categoria de las tarjetas correspondientes. -->
    <div class="filtro" id="filtroCategorias">
      <button class="filtro-btn activo" data-filtro="todos">Todos</button>
      <button class="filtro-btn" data-filtro="chocolate">Chocolate</button>
      <button class="filtro-btn" data-filtro="frutal">Frutal</button>
      <button class="filtro-btn" data-filtro="clasico">Clásico</button>
      <button class="filtro-btn" data-filtro="fit">Fit</button>
      <button class="filtro-btn" data-filtro="muffins">Muffins</button>
    </div>

    <div class="grid-productos" id="gridProductos">

      <!-- ---------- KEKE 1 ---------- -->
      <article class="producto" data-categoria="frutal chocolate" data-sabor="Keke de Plátano con Chocolate">
        <div class="producto-img">
          <img src="RUTA_O_LINK_DE_LA_IMAGEN" alt="Keke de plátano con chocolate">
        </div>
        <div class="producto-info">
          <h3>Keke de Plátano con Chocolate</h3>
          <p>Plátano natural y trozos de chocolate.</p>
          <div class="producto-footer">
            <div class="producto-precio">S/ 25.00 <span>Tamaño familiar</span></div>
            <button type="button" class="btn-pedir">Pedir</button>
          </div>
        </div>
      </article>

      <!-- ---------- KEKE 2 ---------- -->
      <article class="producto" data-categoria="chocolate" data-sabor="Keke de Chocolate">
        <div class="producto-img">
          <img src="RUTA_O_LINK_DE_LA_IMAGEN" alt="Keke de chocolate">
        </div>
        <div class="producto-info">
          <h3>Keke de Chocolate</h3>
          <p>Bizcocho húmedo de chocolate, receta clásica.</p>
          <div class="producto-footer">
            <div class="producto-precio">S/ 22.00 <span>Tamaño familiar</span></div>
            <button type="button" class="btn-pedir">Pedir</button>
          </div>
        </div>
      </article>

      <!-- ---------- KEKE 3 ---------- -->
      <article class="producto" data-categoria="clasico" data-sabor="Keke de Naranja">
        <div class="producto-img">
          <img src="RUTA_O_LINK_DE_LA_IMAGEN" alt="Keke de naranja">
        </div>
        <div class="producto-info">
          <h3>Keke de Naranja</h3>
          <p>Aroma de naranja natural, esponjoso y ligero.</p>
          <div class="producto-footer">
            <div class="producto-precio">S/ 20.00 <span>Tamaño familiar</span></div>
            <button type="button" class="btn-pedir">Pedir</button>
          </div>
        </div>
      </article>

      <!-- ---------- KEKE 4 ---------- -->
      <article class="producto" data-categoria="frutal" data-sabor="Keke de Fresa">
        <div class="producto-img">
          <img src="RUTA_O_LINK_DE_LA_IMAGEN" alt="Keke de fresa">
        </div>
        <div class="producto-info">
          <h3>Keke de Fresa</h3>
          <p>Relleno y cubierto con fresa natural.</p>
          <div class="producto-footer">
            <div class="producto-precio">S/ 23.00 <span>Tamaño familiar</span></div>
            <button type="button" class="btn-pedir">Pedir</button>
          </div>
        </div>
      </article>

      <!-- ---------- KEKE 5 (categoría Fit) ---------- -->
      <article class="producto" data-categoria="fit" data-sabor="Keke Fit sin Azúcar">
        <div class="producto-img">
          <img src="RUTA_O_LINK_DE_LA_IMAGEN" alt="Keke fit sin azúcar">
        </div>
        <div class="producto-info">
          <h3>Keke Fit sin Azúcar</h3>
          <p>A base de avena, libre de azúcar añadido.</p>
          <div class="producto-footer">
            <div class="producto-precio">S/ 25.00 <span>Tamaño familiar</span></div>
            <button type="button" class="btn-pedir">Pedir</button>
          </div>
        </div>
      </article>

      <!-- ---------- KEKE 6 (categoría Muffins) ---------- -->
      <article class="producto" data-categoria="muffins" data-sabor="Muffins de Plátano y Chocolate">
        <div class="producto-img">
          <img src="RUTA_O_LINK_DE_LA_IMAGEN" alt="Muffins de plátano y chocolate">
        </div>
        <div class="producto-info">
          <h3>Muffins de Plátano y Chocolate</h3>
          <p>Formato individual, ideal para llevar.</p>
          <div class="producto-footer">
            <div class="producto-precio">S/ 6.00 <span>Unidad</span></div>
            <button type="button" class="btn-pedir">Pedir</button>
          </div>
        </div>
      </article>

      <!-- ---------- ESPACIO PARA MÁS KEKES ----------
           👉 Copia un bloque <article class="producto">...</article>
           de arriba y pégalo antes de esta tarjeta cada vez que
           agregues un keke nuevo. Borra este bloque cuando ya no
           lo necesites, o muévelo al final de tu catálogo. -->
      <article class="producto espacio-libre">
        <p>Espacio para agregar<br>más kekes al catálogo</p>
      </article>

    </div>
  </div>
</section>

<!-- =================== ARMA TU PEDIDO ===================
     👉 El cliente escribe el sabor con sus propias palabras (campo
     de texto libre), porque los kekes se preparan según el gusto
     de cada persona y no solo de una lista fija. Al enviar, arma
     un mensaje y abre WhatsApp — no requiere ningún servidor. -->
<section id="personalizado" class="personalizado">
  <div class="contenedor">
    <div class="titulo-seccion">
      <span class="filete">A tu manera</span>
      <h2>Haz tu pedido</h2>
      <p>Cuéntanos qué se te antoja y lo preparamos para ti.</p>
    </div>

    <form class="form-pedido" id="formPedido">
      <div class="campo">
        <label for="nombre">Tu nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Ej. María López" required>
      </div>

      <div class="fila-dos">
        <div class="campo">
          <label for="telefono">Tu teléfono</label>
          <input type="tel" id="telefono" name="telefono" placeholder="Ej. 999 999 999" required>
        </div>
        <div class="campo">
          <label for="tamano">Tamaño</label>
          <select id="tamano" name="tamano">
            <option value="Individual">Individual</option>
            <option value="Mediano">Mediano (6 porciones)</option>
            <option value="Familiar" selected>Familiar (10-12 porciones)</option>
          </select>
        </div>
      </div>

      <div class="campo">
        <label for="sabor">Sabor que deseas</label>
        <input type="text" id="sabor" name="sabor" placeholder="Ej. chocolate con naranja, o el sabor que se te antoje" required>
        <p class="campo-ayuda">Puedes pedir un sabor de la lista o describir la combinación que prefieras.</p>
      </div>

      <div class="campo">
        <label for="detalles">Detalles adicionales</label>
        <textarea id="detalles" name="detalles" placeholder="Ej. sin nueces, para cumpleaños, con dedicatoria, fecha en que lo necesitas..."></textarea>
      </div>

      <button type="submit" class="btn btn-dorado">Enviar pedido por WhatsApp</button>
    </form>
  </div>
</section>

<!-- =================== SOBRE ANDREA =================== -->
<section id="nosotros">
  <div class="contenedor sobre-grid">
    <div class="sobre-texto">
      <span class="filete" style="justify-content:flex-start">Nuestra historia</span>
      <h2>El secreto está en cada mordida</h2>
      <p>
        En El Dulce Secreto de Andrea preparamos cada keke de forma artesanal,
        con ingredientes frescos y a partir de lo que cada cliente prefiere.
      </p>

      <div class="lista-valores">
        <div class="valor">
          <div class="valor-marca"></div>
          <div><h4>Variedad de sabores</h4><p>Distintas combinaciones disponibles</p></div>
        </div>
        <div class="valor">
          <div class="valor-marca"></div>
          <div><h4>Pedidos a tu gusto</h4><p>Cada keke se prepara según lo que pidas</p></div>
        </div>
        <div class="valor">
          <div class="valor-marca"></div>
          <div><h4>Hecho artesanalmente</h4><p>Cada pedido preparado con dedicación</p></div>
        </div>
      </div>
    </div>

    <div class="sobre-imagen">
      <img src="img/logo-empresa.jpeg" alt="Preparación artesanal de los postres de El Dulce Secreto de Andrea">
    </div>
  </div>
</section>

<!-- =================== CONTACTO =================== -->
<section id="contacto" class="contacto">
  <div class="contenedor">
    <h2>Hagamos tu pedido</h2>
    <p>Escríbenos y cuéntanos qué keke tienes en mente.</p>

    <a href="#" id="linkWhatsapp" class="btn btn-dorado">Pedir por WhatsApp</a>
    <!-- 👉 Reemplaza el href="#" con tu link real, por ejemplo:
         href="https://wa.me/51999999999?text=Hola,%20quiero%20hacer%20un%20pedido" -->

    <div class="contacto-medios">
      <div class="medio">WhatsApp: 912 260 372</div>
      <div class="medio">Instagram: No existe</div>
      <!-- 👉 Reemplaza estos datos con tu información real -->
    </div>
  </div>
</section>

<!-- =================== FOOTER =================== -->
<footer>
  <div class="contenedor">
    © 2026 <strong>El Dulce Secreto de Andrea</strong> — Descubre el secreto en cada mordida.
  </div>
</footer>

<script>
  // ============================================================
  // MENÚ HAMBURGUESA (para pantallas pequeñas)
  // ============================================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('abierto'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('abierto'));
  });

  // ============================================================
  // FILTRO DE CATEGORÍAS (simple: solo muestra/oculta tarjetas)
  // ============================================================
  const filtroCategorias = document.getElementById('filtroCategorias');
  const gridProductos = document.getElementById('gridProductos');

  filtroCategorias.addEventListener('click', (e) => {
    const boton = e.target.closest('.filtro-btn');
    if (!boton) return;

    filtroCategorias.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('activo'));
    boton.classList.add('activo');

    const categoria = boton.dataset.filtro;
    gridProductos.querySelectorAll('.producto').forEach(tarjeta => {
      if (tarjeta.classList.contains('espacio-libre')) return;
      const categoriasDeTarjeta = tarjeta.dataset.categoria.split(' ');
      const coincide = categoria === 'todos' || categoriasDeTarjeta.includes(categoria);
      tarjeta.style.display = coincide ? '' : 'none';
    });
  });

  // ============================================================
  // BOTÓN "PEDIR" DE CADA KEKE
  // Al presionarlo, escribe el nombre del keke en el campo "Sabor
  // que deseas" del formulario y baja hasta esa sección, para que
  // el cliente solo tenga que completar el resto de sus datos.
  // ============================================================
  const campoSabor = document.getElementById('sabor');

  gridProductos.addEventListener('click', (e) => {
    const boton = e.target.closest('.btn-pedir');
    if (!boton) return;

    const tarjeta = boton.closest('.producto');
    const sabor = tarjeta.dataset.sabor;
    if (sabor) campoSabor.value = sabor;

    document.getElementById('personalizado').scrollIntoView({ behavior: 'smooth' });
  });

  // ============================================================
  // FORMULARIO "HAZ TU PEDIDO"
  // Junta los datos y abre WhatsApp con el mensaje ya armado.
  // No requiere servidor ni base de datos.
  // 👉 CAMBIA el número de abajo por el tuyo, con código de país,
  // sin "+" ni espacios (ejemplo Perú: 51999999999).
  // ============================================================
  const NUMERO_WHATSAPP = "NUMERO_DE_WHATSAPP_CON_CODIGO_DE_PAIS";

  const formPedido = document.getElementById('formPedido');

  formPedido.addEventListener('submit', function(e){
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const tamano = document.getElementById('tamano').value;
    const sabor = document.getElementById('sabor').value.trim();
    const detalles = document.getElementById('detalles').value.trim();

    let mensaje = `Hola, quiero hacer un pedido:%0A`;
    mensaje += `Nombre: ${nombre}%0A`;
    mensaje += `Teléfono: ${telefono}%0A`;
    mensaje += `Tamaño: ${tamano}%0A`;
    mensaje += `Sabor: ${sabor}%0A`;
    if (detalles) mensaje += `Detalles: ${detalles}%0A`;

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;
    window.open(url, '_blank');
  });
</script>

</body>
</html>
