// 1. CONTROL DE MODO OSCURO (PERSISTENTE)
const btnTheme = document.getElementById('toggle-theme');
const iconoTema = document.getElementById('icono-tema');
const htmlElement = document.documentElement;

// Cargar preferencia guardada en localStorage
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


// 2. MENÚ MÓVIL RESPONSIVE
const botonMenu = document.getElementById('boton-menu');
const menuNavegacion = document.getElementById('menu');
const enlacesMenu = document.querySelectorAll('.enlace-menu');

if (botonMenu && menuNavegacion) {
    // Función centralizada para cerrar el menú
    const cerrarMenu = () => {
        if (!menuNavegacion.classList.contains('hidden')) {
            menuNavegacion.classList.add('hidden');
            menuNavegacion.classList.remove('flex');
            botonMenu.setAttribute('aria-expanded', 'false');
            botonMenu.setAttribute('aria-label', 'Abrir menú');
        }
    };

    // Toggle al pulsar el botón hamburguesa
    botonMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        menuNavegacion.classList.toggle('hidden');
        menuNavegacion.classList.toggle('flex');
        const menuAbierto = !menuNavegacion.classList.contains('hidden');
        botonMenu.setAttribute('aria-expanded', String(menuAbierto));
        botonMenu.setAttribute('aria-label', menuAbierto ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cierre al pulsar cualquier enlace del menú
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', cerrarMenu);
    });

    // 1. Cierre al pulsar fuera
    document.addEventListener('click', (e) => {
        if (!menuNavegacion.contains(e.target) && !botonMenu.contains(e.target)) {
            cerrarMenu();
        }
    });

    // 2. Cierre al hacer scroll en la pantalla
    window.addEventListener('scroll', cerrarMenu, { passive: true });
}


// 3. RELLENOS: ACCESIBILIDAD Y TOQUE MÓVIL
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.bagel-card').forEach(card => {
        // En Móvil (táctil): El tap fija la tarjeta. En PC lo ignora por completo
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

    // Restaurar estado de todas las tarjetas
    document.querySelectorAll('.bagel-card').forEach(card => {
        card.classList.remove('active');
        card.setAttribute('aria-pressed', 'false');
        const img = card.querySelector('img');
        const overlay = card.querySelector('.bagel-overlay');
        if (img) img.style.filter = '';
        if (overlay) overlay.style.opacity = '';
    });

    // Activar tarjeta seleccionada solo en pantallas táctiles (móvil)
    if (!isAlreadyActive) {
        element.classList.add('active');
        element.setAttribute('aria-pressed', 'true');
        const img = element.querySelector('img');
        const overlay = element.querySelector('.bagel-overlay');
        if (img) img.style.filter = 'brightness(0.4)';
        if (overlay) overlay.style.opacity = '1';
    }
}


// 4. ARRASTRAR LOGO FLOTANTE (RATÓN Y TÁCTIL)
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

        // Restricciones de límites dentro del contenedor
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

    // Eventos para ratón (PC)
    badge.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('mouseup', stopDrag);

    // Eventos para toque (Móvil)
    badge.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', doDrag, { passive: false });
    window.addEventListener('touchend', stopDrag);
}


// 5. INICIALIZACIÓN DE LIBRERÍAS
document.addEventListener('DOMContentLoaded', () => {
    // Typed.js
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

// AOS.js configurado para que la torre esté bien centrada antes del primer PUM
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 500,
            easing: 'ease-out-back',
            once: true,
            offset: 200 // Margen de scroll mayor para obligar a ver la sección completa
        });
    }
});


// 6. EXPANSIÓN DE NOVEDADES Y BOTÓN FLOTANTE
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


// 7. APERTURA INFALIBLE DE MODALES (FOOTER)
document.addEventListener('DOMContentLoaded', () => {
    const modalPrivacidad = document.getElementById('modal-privacidad');
    const modalTerminos = document.getElementById('modal-terminos');

    const btnPrivDesktop = document.getElementById('btn-privacidad-desktop');
    const btnPrivMobile = document.getElementById('btn-privacidad-mobile');
    const btnTermDesktop = document.getElementById('btn-terminos-desktop');
    const btnTermMobile = document.getElementById('btn-terminos-mobile');

    const btnCerrarPriv = document.getElementById('btn-cerrar-privacidad');
    const btnCerrarTerm = document.getElementById('btn-cerrar-terminos');

    const abrirModal = (modal) => {
        if (modal) modal.classList.remove('hidden');
    };

    const cerrarModal = (modal) => {
        if (modal) modal.classList.add('hidden');
    };

    // Política de Privacidad (Soporta Click y Touchend táctil)
    [btnPrivDesktop, btnPrivMobile].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                abrirModal(modalPrivacidad);
            });
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                abrirModal(modalPrivacidad);
            });
        }
    });

    // Términos y Condiciones (Soporta Click y Touchend táctil)
    [btnTermDesktop, btnTermMobile].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                abrirModal(modalTerminos);
            });
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                abrirModal(modalTerminos);
            });
        }
    });

    // Eventos de Cierre
    if (btnCerrarPriv) {
        btnCerrarPriv.addEventListener('click', () => cerrarModal(modalPrivacidad));
        btnCerrarPriv.addEventListener('touchend', () => cerrarModal(modalPrivacidad));
    }
    if (btnCerrarTerm) {
        btnCerrarTerm.addEventListener('click', () => cerrarModal(modalTerminos));
        btnCerrarTerm.addEventListener('touchend', () => cerrarModal(modalTerminos));
    }

    // Cerrar al pulsar sobre el fondo oscuro
    [modalPrivacidad, modalTerminos].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) cerrarModal(modal);
            });
        }
    });
});


// 8. FORMULARIO DE NEWSLETTER
document.addEventListener('DOMContentLoaded', () => {
    const formNewsletter = document.getElementById('form-newsletter');
    const inputEmail = document.getElementById('email-newsletter');
    const mensajeNewsletter = document.getElementById('mensaje-newsletter');

    if (formNewsletter && inputEmail && mensajeNewsletter) {
        formNewsletter.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita la recarga de página

            if (inputEmail.value.trim() !== '') {
                formNewsletter.classList.add('hidden');
                mensajeNewsletter.classList.remove('hidden');
                inputEmail.value = '';
            }
        });
    }
});

// 9. CONTROL DE ANIMACIÓN DE LA TORRE DE BAGELS
document.addEventListener('DOMContentLoaded', () => {
    const torre = document.getElementById('torre-bagels');
    if (!torre) return;

    // Seleccionamos la base (Integral Bagel) para activar la animación cuando llegue la pantalla
    const basePanIntegral = torre.querySelector('.z-5'); 
    if (!basePanIntegral) return;

    // Invertimos la lista (.reverse()) para que empiece por la base
    const bagels = Array.from(torre.querySelectorAll('.anim-bagel')).reverse(); 
    const textos = Array.from(torre.querySelectorAll('.anim-texto')).reverse();
    const etiquetasMovil = Array.from(torre.querySelectorAll('.anim-etiqueta-movil')).reverse();

    // Inyectar curva de impacto con fuerza (caída rápida y rebote seco)
    const aplicarFuerzaImpacto = (el) => {
        el.style.transitionProperty = 'all';
        el.style.transitionDuration = '450ms'; 
        el.style.transitionTimingFunction = 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // Efecto PUM / Boing
    };

    bagels.forEach(aplicarFuerzaImpacto);
    textos.forEach(aplicarFuerzaImpacto);
    etiquetasMovil.forEach(aplicarFuerzaImpacto);

    const observerBase = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                bagels.forEach((bagel, index) => {
                    setTimeout(() => {
                        // Aparece el pan desde abajo hacia arriba con su PUM
                        bagel.classList.remove('opacity-0', 'translate-y-16');
                        bagel.classList.add('opacity-100', 'translate-y-0');

                        // Entran los textos/etiquetas a la vez
                        if (textos[index * 2]) {
                            textos[index * 2].classList.remove('opacity-0', '-translate-x-10');
                            textos[index * 2].classList.add('opacity-100', 'translate-x-0');
                        }
                        if (textos[index * 2 + 1]) {
                            textos[index * 2 + 1].classList.remove('opacity-0', '-translate-x-10');
                            textos[index * 2 + 1].classList.add('opacity-100', 'translate-x-0');
                        }
                        if (etiquetasMovil[index]) {
                            etiquetasMovil[index].classList.remove('opacity-0', 'translate-y-6');
                            etiquetasMovil[index].classList.add('opacity-100', 'translate-y-0');
                        }
                    }, index * 450); // 450ms de pausa entre pan y pan
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Se activa al llegar a la base de la torre
    });

    observerBase.observe(basePanIntegral);
});