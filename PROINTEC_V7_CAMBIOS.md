# PROINTEC WEB V7 — Acabado UI/UX

## Carruseles
- Se eliminaron los puntos indicadores.
- Las flechas se movieron a los extremos izquierdo y derecho del carrusel.
- Flechas funcionales con estado deshabilitado cuando corresponde.
- Autoplay suave cada 5,5 s, pausa al pasar el cursor o enfocar.
- Navegación con teclado (← / →) y deslizamiento táctil / drag.
- Responsive: 3 tarjetas escritorio, 2 tablet, 1 móvil.

## Microinteracciones
- Tarjetas de texto: elevación, zoom leve, sombra y glow según posición del puntero.
- Números e iconos: microanimación al hover.
- Fotografías: zoom interno sutil.
- Secciones: entrada progresiva con IntersectionObserver.
- Tarjetas consecutivas: aparición escalonada para sensación de proceso.
- Navbar: versión compacta y con blur al hacer scroll.
- Botones: elevación y microdesplazamiento de iconos/flechas.
- WhatsApp: pulso discreto periódico.
- Hero: entrada inicial secuenciada.
- Respeto de prefers-reduced-motion para accesibilidad.

## Archivos principales modificados
- assets/css/prointec.css
- assets/css/prointec-carousel.css
- assets/js/main.js
- assets/js/prointec-carousel.js
- assets/js/prointec-ui.js
- Las 5 páginas de servicios para la nueva estructura del carrusel.
