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