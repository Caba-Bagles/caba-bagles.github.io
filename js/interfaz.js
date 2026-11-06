document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. CONTROL DE MODO OSCURO (PERSISTENTE)
    // ==========================================
    const btnTheme = document.getElementById('toggle-theme');
    const iconoTema = document.getElementById('icono-tema');
    const htmlElement = document.documentElement;

    // Cargar preferencia guardada
    if (localStorage.getItem('tema') === 'dark') {
        htmlElement.classList.add('dark');
        if (iconoTema) iconoTema.classList.replace('fa-moon', 'fa-sun');
    }

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const esOscuro = htmlElement.classList.contains('dark');
            
            if (iconoTema) {
                if (esOscuro) {
                    iconoTema.classList.replace('fa-moon', 'fa-sun');
                    localStorage.setItem('tema', 'dark');
                } else {
                    iconoTema.classList.replace('fa-sun', 'fa-moon');
                    localStorage.setItem('tema', 'light');
                }
            }
        });
    }

// Menú móvil
const botonMenu = document.getElementById('boton-menu');
const menuNavegacion = document.getElementById('menu');
const enlacesMenu = document.querySelectorAll('.enlace-menu');

if (botonMenu && menuNavegacion) {
    botonMenu.addEventListener('click', () => {
        menuNavegacion.classList.toggle('hidden');
        menuNavegacion.classList.toggle('flex');
    });

enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', () => {
            menuNavegacion.classList.add('hidden');
            menuNavegacion.classList.remove('flex');
        });
    });
}

// Arrastrar Logo Flotante (Ratón y Táctil)
const badge = document.getElementById('badge-caba');
const contenedorHero = document.getElementById('contenedor-hero-img');

if (badge && contenedorHero) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const startDrag = (e) => {
        isDragging = true;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const badgeRect = badge.getBoundingClientRect();
        offsetX = clientX - badgeRect.left;
        offsetY = clientY - badgeRect.top;

        badge.classList.remove('transition-transform'); // Quitar transición para movimiento fluido
    };

    const doDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const heroRect = contenedorHero.getBoundingClientRect();
        const badgeWidth = badge.offsetWidth;
        const badgeHeight = badge.offsetHeight;

        let newLeft = clientX - heroRect.left - offsetX;
        let newTop = clientY - heroRect.top - offsetY;

        // Restricción límite Izquierda y Derecha
        newLeft = Math.max(0, Math.min(newLeft, heroRect.width - badgeWidth));
        
        // Restricción límite Arriba y Abajo
        newTop = Math.max(0, Math.min(newTop, heroRect.height - badgeHeight));

        // Aplicar la posición relativa al contenedor
        badge.style.left = `${newLeft}px`;
        badge.style.top = `${newTop}px`;
        badge.style.bottom = 'auto';
        badge.style.right = 'auto';
    };

    const stopDrag = () => {
        isDragging = false;
        badge.classList.add('transition-transform');
    };

    // Eventos para ratón (Escritorio)
    badge.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDrag);

    // Eventos para toque (Móvil)
    badge.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', doDrag, { passive: false });
    window.addEventListener('touchend', stopDrag);
}

    
    // 1. Inicializar Typed.js
    const typedElement = document.getElementById('typed-hero');
    if (typedElement) {
        new Typed('#typed-hero', {
            strings: [
                'Cada mañana preparamos bagels artesanos desde cero: masa natural, hervidos y horneados al momento, listos para rellenar a tu gusto.'
            ],
            typeSpeed: 20,
            showCursor: true,
            cursorChar: '|',
            loop: false
        });
    }

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }

});

// 3. Función global para alternar la novedad
function toggleNovedad() {
    const card = document.getElementById('card-novedad');
    const btn = document.getElementById('btn-novedad');
    
    if (!card || !btn) return;
    
    card.classList.toggle('hidden');
    
    if (!card.classList.contains('hidden')) {
        btn.classList.add('opacity-0', 'pointer-events-none');
    } else {
        btn.classList.remove('opacity-0', 'pointer-events-none');
    }
}


function toggleBagel(element) {
  const isAlreadyActive = element.classList.contains('active');

  // 1. Ocultar el texto y restaurar el brillo de TODOS los bagels
  document.querySelectorAll('.bagel-card').forEach(card => {
    card.classList.remove('active');
    const img = card.querySelector('img');
    const overlay = card.querySelector('.bagel-overlay');
    if (img) img.style.filter = '';
    if (overlay) overlay.style.opacity = '0';
  });

  // 2. Si el bagel tocado no estaba activo, forzar visualmente la opacidad y el brillo
  if (!isAlreadyActive) {
    element.classList.add('active');
    const img = element.querySelector('img');
    const overlay = element.querySelector('.bagel-overlay');
    if (img) img.style.filter = 'brightness(0.4)';
    if (overlay) overlay.style.opacity = '1';
  }
}