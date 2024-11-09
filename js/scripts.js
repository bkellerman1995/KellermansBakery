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
const popup3 = document.getElementById('popup3');
const popup4 = document.getElementById('popup4');

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
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        openPopup(popup1);
    });
});

// Event listeners para cada uno de los links (links de popUp2)
document.querySelectorAll('.abrirPopUp2').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        openPopup(popup2);
    });
});

// Event listeners para cada uno de los links (popUp3)
document.querySelectorAll('.abrirPopUp3').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        openPopup(popup3);
    });
});

// Event listeners para cada uno de los links (popUp4)
document.querySelectorAll('.abrirPopUp4').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        openPopup(popup4);
    });
});

//Event listeners para los botones de cierre
document.querySelectorAll('.btnCerrar').forEach(button => {
    button.addEventListener('click', function () {
        const popupId = this.getAttribute('data-popup');
        const popupToClose = document.getElementById(popupId);
        closePopup(popupToClose);
    });
});

// Cerrar el popup cuando se de click fuera de él (en el overlay)
overlay.addEventListener('click', function () {
    closePopup(popup1);
    closePopup(popup2);
    closePopup(popup3);
    closePopup(popup4);
});

//////////////////////////////////////////////////////////////////////////////
////////////////CODIGO PARA GUARDAR CORREOS PARA SUBSCRIBIR///////////////////
//////////////////////////////////////////////////////////////////////////////

let dataToSave = []; // Array para almacenar los datos ingresados

// Expresión regular para validar el formato del correo electrónico
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function guardarCorreo() {
    // Captura el valor del input
    const inputValue = document.getElementById("email").value;

    // Validar el correo electrónico
    if (!emailRegex.test(inputValue)) {
        alert("Por favor, introduce un correo electrónico válido.");
        return;
    }

    // Verifica si hay datos existentes en el localStorage
    let data = JSON.parse(localStorage.getItem("myData")) || [];

    // Agrega el nuevo dato al array
    data.push({ value: inputValue });

    // Guarda el array actualizado en localStorage como JSON
    localStorage.setItem("myData", JSON.stringify(data));

    alert("Correo guardado exitosamente");

    // Cierra el contenedor
    document.getElementById("popup4").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Función para descargar el JSON
function downloadData() {
    if (dataToSave.length === 0) {
        alert("No hay datos para descargar.");
        return;
    }

    const jsonString = JSON.stringify(dataToSave, null, 2); // Convierte el array a JSON
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Crear un enlace de descarga
    const a = document.createElement("a");
    a.href = url;
    a.download = "datos.json"; // Nombre del archivo que se descargará
    document.body.appendChild(a); // Agrega el enlace al DOM
    a.click(); // Simula un clic en el enlace
    document.body.removeChild(a); // Elimina el enlace del DOM
    URL.revokeObjectURL(url); // Revoca el objeto URL
}

function enviarInfo() {
    // Captura los valores de los campos
    const phoneRegex = /^\d{8}$/; // Validar que el teléfono tenga entre 8 y 15 dígitos
    const telefono = document.getElementById("telefonoUsuario").value.trim();
    const nombre = document.getElementById("nombreUsuario").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const correo = document.getElementById("email").value.trim();
    const comentarios = document.getElementById("textArea").value.trim();

    // Validar los campos
    if (!phoneRegex.test(telefono)) {
        alert("Por favor, introduce un número de teléfono válido (8 dígitos).");
        return;
    }
    if (nombre === "") {
        alert("Por favor, introduce un nombre.");
        return;
    }
    if (!emailRegex.test(correo)) {
        alert("Por favor, introduce un correo electrónico válido.");
        return;
    }

    // Verifica si hay datos existentes en el localStorage
    let data = JSON.parse(localStorage.getItem("myData")) || [];

    // Verificar si el correo ya existe en los datos almacenados
    if (data.some(entry => entry.correo === correo)) {
        alert("El correo ya está registrado.");
        return;
    }

    // Agrega el nuevo dato al array
    data.push({
        telefono: telefono,
        nombre: nombre,
        correo: correo,
        comentarios: comentarios
    });

    // Guarda el array actualizado en localStorage como JSON
    localStorage.setItem("myData", JSON.stringify(data));

    alert("Gracias por tu información. Nos contactactaremos de vuelta contigo lo más pronto posible");

    // Limpiar los campos del formulario
    document.getElementById("telefonoUsuario").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("comentarios").value = "";

    // Actualizar la lista de información en la interfaz
    mostrarInformacion();
}

function mostrarInformacion() {
    // Obtener la lista de datos almacenados
    const data = JSON.parse(localStorage.getItem("myData")) || [];
    const infoList = document.getElementById("infoList");

    // Limpiar la lista actual
    infoList.innerHTML = "";

    // Crear los elementos de la lista
    data.forEach(entry => {
        const listItem = document.createElement("li");
        listItem.textContent = `Teléfono: ${entry.telefono}, Nombre: ${entry.nombre}, Correo: ${entry.correo}, Comentarios: ${entry.comentarios}`;
        infoList.appendChild(listItem);
    });
}

// Inicializar la lista al cargar la página
document.addEventListener("DOMContentLoaded", mostrarInformacion);







