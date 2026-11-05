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
});