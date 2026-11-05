// Menú móvil
const botonMenu = document.getElementById('boton-menu');
const menuNavegacion = document.getElementById('menu');

if (botonMenu && menuNavegacion) {
    botonMenu.addEventListener('click', () => {
        menuNavegacion.classList.toggle('hidden');
        menuNavegacion.classList.toggle('flex');
    });
}
