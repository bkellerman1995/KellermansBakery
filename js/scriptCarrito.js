
// Declarar e inicializar el contenedor y el subcontenedor donde los productos serán insertados
let container = '';
let productHTML = '';


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
        container.insertAdjacentHTML('beforeend', '<p>No hay productos en el carro.</p>');
        container.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-between px-x"><p class="fw-bold">Subtotal:</p><p class="fw-bold" <span id="subtotal">₡0</p></div>');
        container.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-between px-x"><p class="fw-bold">Descuento:</p><p class="fw-bold">₡0</p></div>');
        container.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-between p-2 mb-2 bg-primarycarrito"><h5 class="fw-bold mb-0" style="color:white">Total:</h5><h5 class="fw-bold mb-0" style="color:white" <span id="total">₡0</h5> </div>');

        return;
    }

    // Iterar cada producto y crear el div
    products.forEach(item => {

        productHTML = `
        <div class="d-flex align-items-center mb-5">
            <div class="flex-shrink-0">
                <img src="${item.imagen}" class="img-fluid" style="width: 150px; border-radius: 15px;" alt="${item.nombre}">
            </div>
            <div class="flex-grow-1 ms-3">
                <a href="#!" class="float-end"><i class="fas fa-times"></i></a>
                <h5 class="text-primarycarrito">${item.nombre}</h5>
                <div class="d-flex align-items-center">
                    <p class="fw-bold mb-0 me-5 pe-3"> &#8353 ${item.subtotal}</p>
                    <div class="def-number-input number-input safari_only">
                        <button data-mdb-button-init
                            onclick="updateQuantity('${item.id}', -1)"
                            class="minus"></button>
                        <input class="quantity fw-bold bg-body-tertiary text-body" min="0" name="quantity" 
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
    container.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-between px-x"><p class="fw-bold">Descuento:</p><p class="fw-bold">₡0</p></div>');
    container.insertAdjacentHTML('beforeend', '<div class="d-flex justify-content-between p-2 mb-2 bg-primarycarrito"><h5 class="fw-bold mb-0" style="color:white">Total:</h5><h5 class="fw-bold mb-0" style="color:white" <span id="total">₡0</h5> </div>');

    //Recargar el subtotal y el total
    updateTotals();

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
    displayCart();

};

//Función para calcular el subtotal y el total de la compra
function updateTotals() {

    // Cargar el carrito de compras almacenado en localStorage
    const products = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    // Calcular el subtotal
    products.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });

    //Agregar el IVA del 13%
    const iva = subtotal * 0.13; // Example: 13% tax
    const total = subtotal + iva;

    //Actualizar el DOM
    document.getElementById('subtotal').textContent = `₡${subtotal.toFixed(2)}`;
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
        updateTotals();
    }
});

//Funcion para borrar un elemento del carrito de compras
function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtrar el producto
    products = products.filter(item => item.id !== productId);
    

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(products));

    // Re-render the cart
    displayCart();
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
//Expresion regular para validar los 16 dígitos
const cardInput = document.getElementById('typeText');

const isValidCard = /^\d{16}$/.test(cardInput);

const cardIcon = document.getElementById('cardIcon'); //contenedor del icono de la tarjeta

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
            const response = await fetch(`http://localhost:3001/handyapi/${bin}`);
            // const response = await fetch(`https://cors-anywhere.herokuapp.com/https://lookup.binlist.net/${bin}`);
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
            // cardResult.textContent = "An error occurred while validating the card.";
            $('#typeText').css("backgroundColor", "red");
        }
    }


});

//Evento de carga inicial

document.addEventListener('DOMContentLoaded', displayCart);