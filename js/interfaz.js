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
