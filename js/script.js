/* =============================================================
   SCRIPT PRINCIPAL DEL SITIO — LA FE DISTRIBUCIONES MÉDICAS
   =============================================================

   Este archivo lo usan las tres páginas (index, nosotros, pqrsf) y se
   encarga de cuatro cosas:

     1. Menú móvil ......... abre y cierra el menú en pantallas pequeñas
     2. Efecto reveal ...... los bloques aparecen al hacer scroll
     3. Formulario de contacto
     4. Formulario de PQRSF

   CÓMO FUNCIONAN LOS FORMULARIOS — IMPORTANTE
   No envían correos ni guardan nada en una base de datos. Lo que hacen es
   recoger los datos, armar un mensaje de texto y abrir WhatsApp con ese
   mensaje ya escrito, para que la persona solo pulse enviar.

   Consecuencia práctica: si nadie pulsa enviar en WhatsApp, esa solicitud
   se pierde: no queda registro en ningún sitio. Si en algún momento
   necesitas guardarlas, habría que añadir un PHP que las reciba.

   Cada bloque va envuelto en un `if` que comprueba que el elemento exista,
   porque no todas las páginas tienen todos los formularios.
   ============================================================= */


/* =========================================================
   CONFIGURACIÓN GENERAL

   Número de WhatsApp al que llegan los mensajes de los formularios y de
   los botones "Hablar por WhatsApp".

   PARA CAMBIARLO: pon aquí el número real en formato internacional, sin
   espacios, sin signo + y sin guiones. Colombia = 57 + número.
   Ejemplo: 573001234567

   OJO: este número también está escrito directamente en los HTML (en los
   enlaces wa.me y en el botón flotante verde). Si lo cambias aquí, busca
   "573000000000" en index.html, nosotros.html y pqrsf.html y cámbialo
   también allí, o esos botones seguirán apuntando al número viejo.
   ========================================================= */
const numeroWhatsapp = '573164079888';

/* =========================================================
   MENÚ MÓVIL
   Este bloque abre y cierra el menú cuando estamos en pantallas pequeñas.
   ========================================================= */
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Cierra el menú al hacer clic en cualquiera de los enlaces.
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  });
}

/* =========================================================
   EFECTO REVEAL — ENTRADA AL HACER SCROLL

   Hace que los bloques aparezcan al entrar en pantalla.

   CÓMO FUNCIONA
   Todo elemento con class="reveal" empieza invisible (lo define el CSS).
   IntersectionObserver avisa cuando entra en la pantalla, y entonces se
   le añade la clase "visible", que dispara la transición.

   La animación se REPITE: al salir de pantalla se le quita "visible" y
   vuelve a su posición inicial, así se ve otra vez al subir o al volver
   a bajar. Si prefieres que ocurra una sola vez, borra el bloque `else`
   de más abajo (el que hace classList.remove).

   La DIRECCIÓN de entrada se controla desde el HTML, no desde aquí:
     reveal-left   entra desde la izquierda
     reveal-right  entra desde la derecha
     reveal-zoom   entra creciendo
   (sin ninguna de esas clases, entra desde abajo)

   PARA AJUSTAR CUÁNDO SE DISPARA: cambia `threshold` más abajo.
     0.15 → salta cuando se ve el 15% del elemento (lo actual)
     0.5  → espera a que se vea la mitad; la entrada se nota más tarde
     0    → salta en cuanto asoma un píxel

   La velocidad de la animación NO se toca aquí, sino en css/styles.css,
   en la regla .reveal (busca "ANIMACIÓN DE ENTRADA AL HACER SCROLL").
   ========================================================= */
const revealItems = document.querySelectorAll('.reveal');

if (revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Entra en pantalla: se muestra.
        entry.target.classList.add('visible');
      } else {
        // Sale de pantalla: se devuelve a su posición inicial para que la
        // animación vuelva a verse la próxima vez que aparezca, tanto
        // bajando como subiendo.
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.15,
    // Margen negativo arriba y abajo por igual: la animación arranca cuando
    // el elemento ha entrado 60px en pantalla, no justo al asomar. Al ir en
    // ambos lados, el comportamiento es simétrico bajando y subiendo.
    rootMargin: '-60px 0px -60px 0px'
  });

  revealItems.forEach(item => observer.observe(item));
}

/* =========================================================
   FORMULARIO DE CONTACTO COMERCIAL
   Este formulario toma los datos, los valida y arma un mensaje
   para abrir WhatsApp con el texto listo.
   ========================================================= */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtenemos los valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validación básica
    if (!nombre || !telefono || !correo || !servicio || !mensaje) {
      if (formStatus) {
        formStatus.textContent = 'Por favor completa todos los campos.';
        formStatus.className = 'form-status error';
      }
      return;
    }

    // Armamos el mensaje que se enviará a WhatsApp
    const texto = `
*Nuevo contacto comercial - LA FE*
Nombre: ${nombre}
Teléfono: ${telefono}
Correo: ${correo}
Tipo de solicitud: ${servicio}
Mensaje: ${mensaje}
    `.trim();

    // Construimos el enlace final a WhatsApp
    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(texto)}`;

    if (formStatus) {
      formStatus.textContent = 'Todo listo. Te estamos redirigiendo a WhatsApp...';
      formStatus.className = 'form-status success';
    }

    // Abrimos WhatsApp en una nueva pestaña
    window.open(url, '_blank');
    contactForm.reset();
  });
}

/* =========================================================
   FORMULARIO PQRSF
   Similar al formulario comercial, pero con campos enfocados
   a peticiones, quejas, reclamos, sugerencias y felicitaciones.
   ========================================================= */
const pqrsfForm = document.getElementById('pqrsfForm');
const pqrsfStatus = document.getElementById('pqrsfStatus');

if (pqrsfForm) {
  pqrsfForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Capturamos todos los campos del formulario PQRSF
    const tipo = document.getElementById('pqrsfTipo').value;
    const asunto = document.getElementById('pqrsfAsunto').value.trim();
    const nombre = document.getElementById('pqrsfNombre').value.trim();
    const documento = document.getElementById('pqrsfDocumento').value.trim();
    const telefono = document.getElementById('pqrsfTelefono').value.trim();
    const correo = document.getElementById('pqrsfCorreo').value.trim();
    const mensaje = document.getElementById('pqrsfMensaje').value.trim();
    const acepto = document.getElementById('pqrsfAcepto').checked;

    // Validación
    if (!tipo || !asunto || !nombre || !telefono || !correo || !mensaje || !acepto) {
      if (pqrsfStatus) {
        pqrsfStatus.textContent = 'Por favor completa los campos obligatorios y acepta el tratamiento de datos.';
        pqrsfStatus.className = 'form-status error';
      }
      return;
    }

    // Mensaje para WhatsApp
    const texto = `
*Nuevo PQRSF - LA FE*
Tipo: ${tipo}
Asunto: ${asunto}
Nombre: ${nombre}
Documento: ${documento || 'No suministrado'}
Teléfono: ${telefono}
Correo: ${correo}
Descripción: ${mensaje}
    `.trim();

    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(texto)}`;

    if (pqrsfStatus) {
      pqrsfStatus.textContent = 'Solicitud lista. Te estamos redirigiendo a WhatsApp...';
      pqrsfStatus.className = 'form-status success';
    }

    window.open(url, '_blank');
    pqrsfForm.reset();
  });
}
