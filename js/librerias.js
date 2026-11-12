// Efecto máquina de escribir (Typed.js)
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('texto-efecto')) {
        new Typed('#texto-efecto', {
            strings: [
                'Cada mañana preparamos\nbagels artesanos desde\ncero: masa natural,\nhervidos y horneados al\nmomento, listos para\nrellenar a tu gusto.'
            ],
            typeSpeed: 35,
            backSpeed: 0,
            startDelay: 300,
            loop: false,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // AOS.js configurado para que la torre esté bien centrada
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 500,
            easing: 'ease-out-back',
            once: true,
            offset: 200 // Margen de scroll mayor para obligar a ver la sección completa
        });
    }
});
