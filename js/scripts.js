/*Código JS para abrir el menú aside en la página blog del sitio a través del 
botón de hamburguesa */

document.getElementById('hamburguesa').addEventListener('click', function () {
    var asideMenu = document.getElementById('menuAside');
    asideMenu.classList.toggle('open');
});

document.getElementById('btnCerrar').addEventListener('click', function () {
    const menu = document.getElementById('menuAside');
    menu.classList.remove('open');
});

/*Código JS para manejar la apertura y cierre de popups en la página blog */
// Obtener los elementos para ambos popups y el overlay

const overlay = document.getElementById('overlay');
const popup1 = document.getElementById('popup1');
const popup2 = document.getElementById('popup2');

// Función para abrir el popup

function openPopup(popup) {
    popup.style.display = 'grid';
    overlay.style.display = 'block';
}

// Función para cerrar el popup
function closePopup(popup) {
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

// Event listeners para cada uno de los links (links de popUp1)
document.querySelectorAll('.abrirPopUp1').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        openPopup(popup1);
    });
});

// Event listeners para cada uno de los links (links de popUp2)
document.querySelectorAll('.abrirPopUp2').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        openPopup(popup2);
    });
});

//Event listeners para los botones de cierre
document.querySelectorAll('.btnCerrar').forEach(button => {
    button.addEventListener('click', function() {
        const popupId = this.getAttribute('data-popup');
        const popupToClose = document.getElementById(popupId);
        closePopup(popupToClose);
    });
});

// Cerrar el popup cuando se de click fuera de él (en el overlay)
overlay.addEventListener('click', function () {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});