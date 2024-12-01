
// Declarar e inicializar el contenedor y el subcontenedor donde los productos serán insertados
let container = '';
let productHTML = '';
let envio = false;

//Configurar el input de tipo date con el minimo de hoy.
typeExp.min = new Date().toISOString().split("T")[0];

// Función para mostrar el carrito de compras
function displayCart() {

    // Carrito de compras almacenado en localStorage
    const products = JSON.parse(localStorage.getItem('cart')) || [];
  
    //Borrar el contenido de los productos (por defecto)
    container.innerHTML = '<h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">Mi pedido</h3><hr class="mb-4" style="height: 2px; background-color: #8B4513; opacity: 1;"/hr>';

    productHTML = '';

    container = document.querySelector('.col-lg-6.px-5.py-4');


    // Chequear si hay productos
    if (products.length === 0) {

        //Deshabilitar los inputs de la sección de tarjeta
        document.getElementById('typeText').value = '';
        $('#typeText').css("backgroundColor", "#EAECEF");
        cardIcon.innerHTML = '<img src =""/>';

        document.getElementById('typeText').disabled = true;

        document.getElementById('typeName').value = '';
        document.getElementById('typeName').disabled = true;

        document.getElementById('typeCVV').value = '';
        document.getElementById('typeCVV').disabled = true;


        $("input[type=date]").val("");

        document.getElementById('lblEnvio').style.visibility = "hidden";
        document.getElementById('flexRadioDefault1').style.visibility = "hidden";
        document.getElementById('tipoEnvio1').style.visibility = "hidden";
        document.getElementById('flexRadioDefault2').style.visibility = "hidden";
        document.getElementById('tipoEnvio2').style.visibility = "hidden";
        document.getElementById('btnComprar').style.visibility = "hidden";


        container.insertAdjacentHTML('beforeend', '<p>No hay productos en el carro.</p>');
        container.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-between px-x"><p class="fw-bold">Subtotal:</p><p class="fw-bold" <span id="subtotal">₡0</p></div>');
        container.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-between px-x"><p class="fw-bold">IVA (13%):</p><p class="fw-bold"><span id="iva">₡0</p></div>');
        container.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-between p-2 mb-2 bg-primarycarrito"><h5 class="fw-bold mb-0" style="color:white">Total:</h5><h5 class="fw-bold mb-0" style="color:white" <span id="total">₡0</h5> </div>');

        return;
    }

    else {

        //Habilitar los inputs de la sección de tarjeta
        document.getElementById('typeText').disabled = false;
        document.getElementById('typeName').disabled = false;
        document.getElementById('typeExp').disabled = false;
        document.getElementById('typeCVV').disabled = false;
        document.getElementById('lblEnvio').style.visibility = "visible";
        document.getElementById('flexRadioDefault1').style.visibility = "visible";
        document.getElementById('tipoEnvio1').style.visibility = "visible";
        document.getElementById('flexRadioDefault2').style.visibility = "visible";
        document.getElementById('btnComprar').style.visibility = "visible";
    }

    // Iterar cada producto y crear el div
    products.forEach(item => {

        productHTML = `
        <div class="d-flex align-items-center mb-5">
            <div class="flex-shrink-0">
                <img src="${item.imagen}" id ="imgProducto" class="img-fluid" style="width: 150px; border-radius: 15px;" alt="${item.nombre}">
            </div>
            <div class="flex-grow-1 ms-3">
                <h5 class="text-primarycarrito">${item.nombre}</h5>
                <div class="d-flex align-items-center">
                    <p class="fw-bold mb-0 me-5 pe-3"> &#8353 ${item.subtotal}</p>
                    <div class="def-number-input number-input safari_only" style="position:absolute;margin-left: 15%">
                        <button data-mdb-button-init
                            onclick="updateQuantity('${item.id}', -1)"
                            class="minus"></button>
                        <input class="quantity fw-bold bg-body-tertiary text-body" style="width:200px" min="0" name="quantity" 
                        value="${item.cantidad}" type="number" readonly>
                        <button data-mdb-button-init
                            onclick="updateQuantity('${item.id}', 1)"
                            class="plus"></button>
                        <button id = "eliminar" onclick="deleteProduct('${item.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" style ="margin-left:15%; vertical-align: text-top" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg></button>
     
                    </div>

                </div>
            </div>
        </div>
    `;
        container.insertAdjacentHTML('beforeend', productHTML);
    });

    container.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-between px-x"><p class="fw-bold">Subtotal:</p><p class="fw-bold" <span id="subtotal">₡0</p></div>');
    container.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-between px-x"><p class="fw-bold">IVA (13%):</p><p class="fw-bold"><span id="iva">₡0</p></div>');
    container.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-between p-2 mb-2 bg-primarycarrito"><h5 class="fw-bold mb-0" style="color:white">Total:</h5><h5 class="fw-bold mb-0" style="color:white" <span id="total">₡0</h5> </div>');

    //Recargar el subtotal y el total
    updateTotals(false);

};

// Función para actualizar la cantidad del producto (junto con el precio) en el carrito de compras

function updateQuantity(productId, change) {

    // Carrito de compras almacenado en localStorage
    const products = JSON.parse(localStorage.getItem('cart')) || [];

    // Encontrar el producto por ID
    const productIndex = products.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        // Actualizar la cantidad
        products[productIndex].cantidad += change;

        //Remover el producto si la cantidad es 0
        if (products[productIndex].cantidad <= 0) {
            products.splice(productIndex, 1);
        } else {
            // Actualizar el precio basado en la nueva cantidad
            products[productIndex].subtotal = products[productIndex].precio * products[productIndex].cantidad;
        }
    }

    //Guardar el carrito actualizado en el local storage del navegador
    localStorage.setItem('cart', JSON.stringify(products));

    //Cargar el carrito de nuevo
    applyResponsiveStyles();

};

//Función para calcular el subtotal y el total de la compra
function updateTotals(envioDomicilio) {


    // Cargar el carrito de compras almacenado en localStorage
    const products = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;


    // Calcular el subtotal
    products.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });

    //Chequear si el envio es a domicilio

    if (envioDomicilio === true) {
        subtotal += 500;
    }

    //Agregar el IVA del 13%
    const iva = subtotal * 0.13; // Example: 13% tax
    const total = subtotal + iva;



    //Actualizar el DOM
    document.getElementById('subtotal').textContent = `₡${subtotal.toFixed(2)}`;
    document.getElementById('iva').textContent = `₡${iva.toFixed(2)}`;
    document.getElementById('total').textContent = `₡${total.toFixed(2)}`;


};

// Función para manejar los cambios en las cantidades
document.addEventListener('change', (event) => {
    if (event.target.classList.contains('quantity')) {
        const productId = event.target.closest('.product').dataset.id;
        const newQuantity = parseInt(event.target.value, 10);

        // Cargar el carrito de compras almacenado en localStorage
        const products = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = products.findIndex(item => item.id === productId);

        if (productIndex !== -1) {
            products[productIndex].cantidad = newQuantity;

            // Remover el producto si la cantidad es 0
            if (newQuantity <= 0) {
                products.splice(productIndex, 1);
                event.target.closest('.product').remove();
            }
        }

        //Guardar el carrito actualizado en el local storage del navegador
        localStorage.setItem('cart', JSON.stringify(products));

        // Recalcular los totales
        updateTotals(false);
    }
});

//Funcion para borrar un elemento del carrito de compras
function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtrar el producto
    products = products.filter(item => item.id !== productId);


    // Guardar el carrito actualizado en local storage
    localStorage.setItem('cart', JSON.stringify(products));

    // Re-cargar el carro
    applyResponsiveStyles();
}

// Delegación de eventos para los clics de botones de borrar
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const productElement = event.target.closest('.product');
        const productId = productElement.getAttribute('data-id');

        // Call deleteProduct with the product ID
        deleteProduct(productId);
    }
});

//Función para verificar el número de tarjeta por medio de BInlist API

const cardInput = document.getElementById('typeText');

//contenedor del icono de la tarjeta
const cardIcon = document.getElementById('cardIcon');


cardInput.addEventListener('input', async function () {

    cardIcon.innerHTML = "";
    $('#typeText').css("backgroundColor", "white");
    const value = cardInput.value.trim();

    // Verificar que al menos 6 digitos son ingresados

    if (value.length >= 6) {
        //extrar el BIN (primeros 6 dígitos)
        const bin = value.substring(0.6);

        try {
            // Obtener datos de las tarjeta mediante BinList API
            const response = await fetch(`https://data.handyapi.com/bin/${bin}`);
            if (response.ok) {
                const data = await response.json();

                //Actualizar el icono y el tipo de tarjeta
                cardIcon.innerHTML = ""; //Limpiar el ícono anterior

                if (data.Scheme === "VISA") {
                    cardIcon.innerHTML = '<img src="./img/carrito/visa.png" alt="Visa" style="width: 30px;">';
                    $('#typeText').css("backgroundColor", "#D7FFE4");
                } else if (data.Scheme === "MASTERCARD") {
                    cardIcon.innerHTML = '<img src="./img/carrito/mastercard.svg" alt="Mastercard" style="width: 30px;">';
                    $('#typeText').css("backgroundColor", "#D7FFE4");
                } else {
                    cardIcon.innerHTML = '<span>Número de tarjeta incorrecto</span>';
                    $('#typeText').css("backgroundColor", "pink");
                }


            } else {
                console.log("El tipo de tarjeta no pudo ser determinado. La búsqueda de BIN falló.");
                $('#typeText').css("backgroundColor", "pink");
            }
        } catch (error) {
            console.error("Error fetching card data:", error);
            cardIcon.innerHTML = '<span>Error al verificar la tarjeta: </span>';
            $('#typeText').css("backgroundColor", "pink");
        }
    }


});

//Actualizar el subtotal si el radioButton de Envio a Domicilio está seleccionado
document.getElementById('flexRadioDefault1').addEventListener('change', function () {
    if (this.checked) {
        envio = true;
        updateTotals(true);

    } else {
        updateTotals(false);
        envio = true;
    }
});

//Actualizar el subtotal si el radioButton de recoger en tienda está seleccionado
document.getElementById('flexRadioDefault2').addEventListener('change', function () {
    if (this.checked) {
        updateTotals(false);
        envio = false;

    } else {
        updateTotals(true);
        envio = true;
    }
});

//Función para verificar los datos ingresados para la tarjeta
function ingresarDatosTarjeta() {

    //Campos para llenar la tarjeta
    const cardInput = document.getElementById('typeText').value.trim();
    const cvvInput = document.getElementById('typeCVV').value.trim();
    const nombre = document.getElementById('typeName').value.trim();
    const fechaExpiracion = document.getElementById('typeExp').value;

    //Expresión regular para validar los 16 dígitos
    const isValidCard = /^\d{16}$/.test(cardInput);

    //Expresión regular para validar los 3 dígitos del CCV
    const isValidCVV = /^\d{3}$/.test(cvvInput);

    // Validar los campos
    if (!isValidCard && $('#typeText').css("backgroundColor", "pink")) {
        alert("Por favor, introduce un número de tarjeta válido (16 dígitos).");
        return;
    }

    if (nombre === "") {
        alert("Por favor, introduce un nombre.");
        return;
    }


    if (isNaN(new Date(fechaExpiracion))) {
        alert("Por favor, entra un valor válido de fecha.");
        return;
    }

    if (!isValidCVV) {
        alert("Por favor, introduce un número de CVV válido (3 dígitos).");
        return;
    }

    //Desplegar la alerta
    Swal.fire({ title: "¡Éxito!", text: "Compra exitosa", icon: "success" });

    //generar archivo pdf
    generatePDF(envio);

    //vaciar el carrito de compras
    localStorage.setItem('cart', JSON.stringify([]));

    //Cargar el carrito de nuevo
    applyResponsiveStyles();

}

// Función para generar un PDF del contenido del carrito
function generatePDF(envioDomicilio) {

    const nombre = document.getElementById('typeName').value;
    const products = JSON.parse(localStorage.getItem('cart')) || [];

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Generar la fecha y hora actual en el formato especificado
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Asegurar que el mes tenga dos dígitos
    const day = String(now.getDate()).padStart(2, '0'); // Asegurar que el día tenga dos dígitos
    const hours = String(now.getHours()).padStart(2, '0'); // Asegurar que la hora tenga dos dígitos
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Asegurar que los minutos tengan dos dígitos
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Asegurar que los segundos tengan dos dígitos
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // Asegurar que los milisegundos tengan tres dígitos

    const invoiceNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0); // Color negro
    doc.setFont("arial", "bold"); // Establecer fuente en negrita
    doc.text("Factura de Compra", 105, 20, null, null, 'center'); // Centrado horizontalmente
    doc.addImage('./img/logo.png', 'PNG', 0, 0, 50, 50);
    doc.setTextColor(0, 0, 0); // Color negro
    doc.setFont("arial", "normal"); // Establecer fuente normal
    doc.setFontSize(12);

    // Agregar el número de factura
    doc.text(`Factura Número: ${invoiceNumber}`, 105, 30, null, null, 'center'); // Centrado horizontalmente
    // Verificar el nombre del cliente y asignar "Contado" si está vacío
    const customerNameDisplay = nombre.trim() === "" ? "Contado" : nombre;

    // Obtener el ancho de la página
    const pageWidth = doc.internal.pageSize.getWidth();

    // Calcular el ancho de la página
    const textWidth = doc.getTextWidth(`Nombre del cliente: ${customerNameDisplay}`);

    // Calcular la coordinada x para el texto centrado
    const x = (pageWidth - textWidth) / 2;

    // Agregar el texto centrado
    doc.text(`Nombre del cliente: ${customerNameDisplay}`, x, 40);

    let y = 45; // posición vertical inicial
    let total = 0;
    let envio = 500;
    const iva = 0.13;
    let subTotalProducto = 0;
    let subtotal = 0;


    // Definir el ancho de la tabla y la altura de las filas
    const tableWidth = 180;
    const rowHeight = 10;

    // Cabecera de la tabla
    doc.setFillColor(139, 69, 19); // Color café
    doc.rect(14, y, tableWidth, rowHeight, 'F'); // Fondo de la cabecera
    doc.setTextColor(255, 255, 255); // Texto blanco
    doc.text("Producto", 15, y + 7);
    doc.text("Precio", 80, y + 7);
    doc.text("Cantidad", 120, y + 7);
    doc.text("Subtotal", 150, y + 7);
    doc.setTextColor(0, 0, 0); // Restablecer el color del texto a negro
    y += rowHeight;

    // Detalles de los productos
    products.forEach(item => {
        subTotalProducto = item.precio * item.cantidad;
        doc.rect(14, y, tableWidth, rowHeight); // Bordes de la filamb-
        doc.text(item.nombre, 15, y + 7);
        doc.text(`CRC ${item.precio.toFixed(2)}`, 80, y + 7);
        doc.text(item.cantidad.toString(), 120, y + 7);
        doc.text(`CRC ${subTotalProducto.toFixed(2)}`, 150, y + 7);
        subtotal += subTotalProducto;
        y += rowHeight; // Incremento para la siguiente línea

    });

    // Envío
    doc.setFillColor(211, 211, 211); // Color gris
    doc.rect(14, y, tableWidth, rowHeight, 'F'); // Fondo del envío
    doc.setTextColor(0, 0, 0); // Texto negro

    //Chequear si el envío es por domicilio o recoger en tienda
    if (envioDomicilio === true) {
        doc.text("Envío: a dirección postal", 15, y + 7);
        doc.text(`CRC ${envio.toFixed(2)}`, 150, y + 7);
        subtotal += envio;

    }
    else {
        doc.text("Envío: recoger en tienda", 15, y + 7);
        envio = 0;
        doc.text(`CRC ${envio.toFixed(2)}`, 150, y + 7);
    }
    y += rowHeight; // Incremento para la siguiente línea

    total += subtotal + (subtotal * iva);
    // Total
    doc.setFillColor(211, 211, 211); // Color gris
    doc.setFont("arial", "bold"); // Establecer fuente en negrita
    doc.rect(14, y, tableWidth, rowHeight, 'F'); // Fondo del total
    doc.setTextColor(0, 0, 0); // Texto negro
    doc.text("Total (13% IVA incluido):", 15, y + 7);
    doc.text(`CRC ${total.toFixed(2)}`, 150, y + 7);

    y += rowHeight; // Incremento para la siguiente línea
    y += rowHeight; // Incremento para la siguiente línea

    // Medio de pago
    doc.setFillColor(255, 255, 255); // Color gris
    doc.rect(14, y, tableWidth, rowHeight, 'F'); // Fondo del medio de pago
    doc.setTextColor(0, 0, 0); // Texto negro
    doc.text("Medio de pago: tarjeta", 15, y + 7);

    // Agregar número de página
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i); // Establecer la página actual
        doc.text(`Página ${i} de ${pageCount}`, 190, 285, null, null, 'right'); // Añadir número de página
    }
    doc.save('factura_compra.pdf');
}

function applyResponsiveStyles() {
    // Carrito de compras almacenado en localStorage
    const products = JSON.parse(localStorage.getItem('cart')) || [];
    
    //Borrar el contenido de los productos (por defecto)
    container.innerHTML = '<h3 class="mb-5 pt-2 text-center fw-bold text-uppercase">Mi pedido</h3><hr class="mb-4" style="height: 2px; background-color: #8B4513; opacity: 1;"/hr>';
    productHTML = '';
    container = document.querySelector('.col-lg-6.px-5.py-4');
    let screen = window.innerWidth;
    const screen360 = 360;
    const screen480 = 480;
    // const isSmallScreen = window.matchMedia('(max-width: 360px)').matches;
    // const isSmallScreen2 = window.matchMedia('(max-width: 480px)').matches;

    if (screen <=screen360 || screen <= screen480) {


        // Iterar cada producto y crear el div
        products.forEach(item => {

            productHTML = `
        <h5 class="text-primarycarrito" style="text-align:center">${item.nombre}</h5>
        <div class="d-flex align-items-center mb-2">
            <div class="flex-shrink-0">
                <img src="${item.imagen}" id ="imgProducto" class="img-fluid" style=" width: 125px;border-radius: 15px; margin-left:40%; margin-right:-50%" alt="${item.nombre}">
            </div>
            

        </div>
                            <p class="fw-bold mb-0 me-5 pe-3" style="margin-left:35%"> &#8353 ${item.subtotal}</p>
                            <br>
                    <div class="flex-grow-1 ms-3" style="text-align:center">
                <div class="d-flex align-items-center">

                    <div class="def-number-input number-input safari_only" style="position:absolute;margin-left: 4%; font:40px">
                        <button data-mdb-button-init
                            onclick="updateQuantity('${item.id}', -1)"
                            class="minus"></button>
                        <input class="quantity fw-bold bg-body-tertiary text-body" style="width:100%" min="0" name="quantity" 
                        value="${item.cantidad}" type="number" readonly>
                        <button data-mdb-button-init
                            onclick="updateQuantity('${item.id}', 1)"
                            class="plus"></button>
     
                    </div>
                    

                </div>
            </div>
            <br>
                                    <button id = "eliminar" onclick="deleteProduct('${item.id}')" style="margin-left:41%">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" style ="margin-left:15%; vertical-align: text-top" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg></button>
                        <hr class="mb-4" style="height: 2px; background-color: #8B4513; opacity: 1;"/hr>
    `;
            container.insertAdjacentHTML('beforeend', productHTML);
        })
    }
    else {
        displayCart();
    }
}


//Evento de carga inicial

window.addEventListener('resize', applyResponsiveStyles);
document.addEventListener('DOMContentLoaded', applyResponsiveStyles);

