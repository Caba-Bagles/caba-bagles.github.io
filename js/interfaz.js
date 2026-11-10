// ==========================================
// 1. CONTROL DE MODO OSCURO (PERSISTENTE)
// ==========================================
const btnTheme = document.getElementById('toggle-theme');
const iconoTema = document.getElementById('icono-tema');
const htmlElement = document.documentElement;

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

// ==========================================
// 2. MENÚ MÓVIL RESPONSIVE
// ==========================================
const botonMenu = document.getElementById('boton-menu');
const menuNavegacion = document.getElementById('menu');
const enlacesMenu = document.querySelectorAll('.enlace-menu');

if (botonMenu && menuNavegacion) {
    botonMenu.addEventListener('click', () => {
        menuNavegacion.classList.toggle('hidden');
        menuNavegacion.classList.toggle('flex');
        const menuAbierto = !menuNavegacion.classList.contains('hidden');
        botonMenu.setAttribute('aria-expanded', String(menuAbierto));
        botonMenu.setAttribute('aria-label', menuAbierto ? 'Cerrar menú' : 'Abrir menú');
    });

    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', () => {
            menuNavegacion.classList.add('hidden');
            menuNavegacion.classList.remove('flex');
            botonMenu.setAttribute('aria-expanded', 'false');
            botonMenu.setAttribute('aria-label', 'Abrir menú');
        });
    });
}

// ==========================================
// 3. RELLENOS: ACCESIBILIDAD Y TOQUE MÓVIL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.bagel-card').forEach(card => {
        // En Móvil (táctil): El tap fija la tarjeta. En PC lo ignora
        card.addEventListener('click', (e) => {
            const esOrdenador = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
            if (esOrdenador) return; 
            
            toggleBagel(card);
        });

        // Accesibilidad por teclado
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleBagel(card);
            }
        });
    });
});

function toggleBagel(element) {
    const isAlreadyActive = element.classList.contains('active');

    document.querySelectorAll('.bagel-card').forEach(card => {
        card.classList.remove('active');
        card.setAttribute('aria-pressed', 'false');
        const img = card.querySelector('img');
        const overlay = card.querySelector('.bagel-overlay');
        if (img) img.style.filter = '';
        if (overlay) overlay.style.opacity = '';
    });

    if (!isAlreadyActive) {
        element.classList.add('active');
        element.setAttribute('aria-pressed', 'true');
        const img = element.querySelector('img');
        const overlay = element.querySelector('.bagel-overlay');
        if (img) img.style.filter = 'brightness(0.4)';
        if (overlay) overlay.style.opacity = '1';
    }
}

// ==========================================
// 4. ARRASTRAR LOGO FLOTANTE (RATÓN Y TÁCTIL)
// ==========================================
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

        badge.classList.remove('transition-transform');
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

        newLeft = Math.max(0, Math.min(newLeft, heroRect.width - badgeWidth));
        newTop = Math.max(0, Math.min(newTop, heroRect.height - badgeHeight));

        badge.style.left = `${newLeft}px`;
        badge.style.top = `${newTop}px`;
        badge.style.bottom = 'auto';
        badge.style.right = 'auto';
    };

    const stopDrag = () => {
        isDragging = false;
        badge.classList.add('transition-transform');
    };

    badge.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDrag);

    badge.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', doDrag, { passive: false });
    window.addEventListener('touchend', stopDrag);
}

// ==========================================
// 5. INICIALIZACIÓN DE LIBRERÍAS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const typedElement = document.getElementById('typed-hero');
    if (typedElement && typeof Typed !== 'undefined') {
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

// ==========================================
// 6. EXPANSIÓN DE NOVEDADES Y BOTÓN FLOTANTE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const tarjetaNovedad = document.getElementById('tarjeta-novedad-expandible');
    const bloqueNovedad = document.getElementById('bloque-novedad');
    const btnFlotante = document.getElementById('btn-novedad-flotante');

    if (tarjetaNovedad && bloqueNovedad) {
        const observerNovedad = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tarjetaNovedad.classList.remove('scale-90', 'opacity-40');
                    tarjetaNovedad.classList.add('scale-100', 'opacity-100', 'shadow-2xl');

                    if (btnFlotante) btnFlotante.classList.add('opacity-0', 'pointer-events-none');
                } else {
                    tarjetaNovedad.classList.remove('scale-100', 'opacity-100', 'shadow-2xl');
                    tarjetaNovedad.classList.add('scale-90', 'opacity-40');

                    if (btnFlotante) btnFlotante.classList.remove('opacity-0', 'pointer-events-none');
                }
            });
        }, { threshold: 0.3 });

        observerNovedad.observe(bloqueNovedad);
    }
});

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