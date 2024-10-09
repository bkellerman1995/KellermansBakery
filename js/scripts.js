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

