//JAVA SCRIPT PARA CARGAR PRODUCTOS POR CATEGORIA EN PAGINA MNU


// Cargar el archivo JSON

// Eventos de carga inicial
$(document).ready(() => {

    animateCartIcon();

    // $("#view-products").on("click", function () {
    //     displayProductTable(); // Mostrar la tabla de productos al hacer clic
    // });

    // updateCartIndicator();
});

fetch('../json/productos.json')
    .then(response => {
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
        return response.json();
    })
    .then(data => {
        const categoriesContainer = document.getElementById("categories");
        const productsContainer = document.getElementById("products");

        // Obtener categorías únicas
        const categorias = [...new Set(data.map(producto => producto.categoria))];

        // Verificar si hay categorías
        if (categorias.length === 0) {
            categoriesContainer.innerHTML = '<p class="col-12 text-center">No hay categorías disponibles</p>';
            productsContainer.innerHTML = '<p class="col-12 text-center">No hay productos disponibles</p>';
            return;
        }

        // Crear tarjetas para cada categoría
        categorias.forEach(categoria => {
            const card = document.createElement("div");
            card.className = "col-md-4";
            card.style.borderRadius = "20px";
            card.innerHTML = `
                        <div class="card mb-4">
                            <div class="card-body text-center" 
                            style="background-color: #c6a664;">
                                <h5 class="card-title">${categoria}</h5>
                                <button class="btn btn-primary" 
                                style="background-color: #8B4513; border-style:none"
                                onclick="showProducts('${categoria}')">Ver Productos
                                </button>
                            </div>
                        </div>
                    `;
            categoriesContainer.appendChild(card);
        });

        // Mostrar productos de la categoría seleccionada
        window.showProducts = function (categoriaSeleccionada) {
            productsContainer.innerHTML = ""; // Limpiar productos anteriores

            // Filtrar y mostrar productos de la categoría
            const productosFiltrados = data.filter(producto => producto.categoria === categoriaSeleccionada);

            if (productosFiltrados.length === 0) {
                productsContainer.innerHTML = '<p class="col-12 text-center">No hay productos disponibles</p>';
            } else {
                productosFiltrados.forEach(producto => {
                    const productCard = document.createElement("div");
                    productCard.className = "col-md-4";
                    productCard.innerHTML = `
                                
                   
                    <div class="card mb-4" style= "text-align: center ; border-radius:10%; 
                    background-color: #f5f5dc; animation: animacionFadeIn ease 2s; border-style: none; position: relative">
                                    
                                <div class="card-body" style = "background-color: #c6a664;
                                border-radius:10%; animation: animacionFadeIn ease 2s;">
                                        
                                    <h5 class="card-title">${producto.nombre}</h5>
                                        
                                        <img class = "card-img-top" style= "width:200px;
                                        height: 200px; background-size:cover;border-radius: 10%;"
                                        src= ${producto.imagen} alt="imagen de comida" />
                                        
                                        <p class="card-text">${producto.descripcion}</p>
                                        
                                        <p class="card-text">Precio: &#8353 ${producto.precio} c/u</p>
                                        <br>

                                                                    <div class="def-number-input number-input safari_only"
                                                                    style= "position: relative; left: 50%;
                                                                    transform: translate(-50%, -50%);
                                                                        border: 1px solid #ced4da; background-color: #8B4513;color: white;width: 10rem;border-radius: .25rem;">
                              <button data-mdb-button-init onclick="this.parentNode.querySelector('input[type=number]').stepDown(); updateButtonState()"
                                class="minus" id="botonMenosMenu"></button>
                              <input class="quantity fw-bold bg-body-tertiary text-body" min="0" name="quantity" value="1"
                                type="number">
                              <button data-mdb-button-init onclick="this.parentNode.querySelector('input[type=number]').stepUp(); updateButtonState()"
                                class="plus" id="botonMasMenu"></button>
                            </div>

                                        <button class="btn btn-success" onclick="addToCart('${producto.id}')">Agregar al carrito</button>
                
                                        <button class="btn btn-info" onclick="showDetails('${producto.id}')"
                                        style = "background-color: #8B4513; color: white; border-style:none" >Mostrar detalles</button>

                                    </div>
                                </div>
                            `;
                    productsContainer.appendChild(productCard);
                });
            }
        };

        //Función para cerrar el modal 
        window.cerrarModal = function () {
        }

        // Función para agregar productos al carrito
        window.addToCart = function (id) {

            const producto = data.find(item => item.id === id)
            //Parsear la cantidad de producto desde el campo input
            const quantity = parseInt(document.querySelector('.quantity').value);
            if (quantity <= 0) {
                alert("La cantidad debe ser mayor a 0.");
                return;
            }

            //Obtener el carrito del almacenamiento local del navegador o inicializarlo
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Buscar si el producto ya existe en el carrito
            const existeProducto = cart.findIndex(item => item.id === id);

            if (existeProducto !== -1) {
                // Si el producto ya existe, actualiza su cantidad y precio
                cart[existeProducto].cantidad += quantity;
                cart[existeProducto].subtotal = producto.precio * cart[existeProducto].cantidad;

            } else {

                //Si el producto no existe, prepara los datos del producto para agregarlo
                const cartItem = {
                    id: producto.id,
                    nombre: producto.nombre,
                    cantidad: quantity,
                    precio: producto.precio,
                    subtotal: producto.precio * quantity,
                    categoria: producto.categoria,
                    descripcion: producto.descripcion,
                    imagen: producto.imagen
                };

                //Agregar el item al carrito
                cart.push(cartItem);
            }

                //Salvar el carrito actualizado al almacenamiento local
                localStorage.setItem('cart', JSON.stringify(cart));

                //Desplegar la alarta
                Swal.fire('Producto agregado', `${producto.nombre} ha sido agregado al carrito`, 'success');

                //Chequear si el carrito tiene items para animarlo

                animateCartIcon();
            }

            // Función para mostrar detalles en el modal
            window.showDetails = function (id) {
                const producto = data.find(item => item.id === id);
                if (producto) {
                    const modalContent = document.getElementById("modalContent");
                    modalContent.innerHTML = `
                            <p><strong>Código:</strong> ${producto.id}</p>
                            <p><strong>Nombre:</strong> ${producto.nombre}</p>
                            <img src = ${producto.imagen} alt="imagen de comida" 
                            "card-img-top" style= "width:200px;
                            height: 200px; background-size:cover;border-radius: 10%;
                            margin-left: 30%;"/>
                            <p style = "text-align: center;"><strong>Precio:</strong> &#8353 ${producto.precio}</p>
                            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
                            <p><strong>Categoría:</strong> ${producto.categoria}</p>
                        `;
                    $('#productModal').modal('show');  // Mostrar el modal
                }
            }

            // Mostrar productos de "Categoria 1" al cargar la página, si existe
            if (categorias.includes('Categoria 1')) {
                showProducts('Categoria 1');
            };


        })
    .catch(error => {
        console.error('Error al cargar productos:', error);
        document.getElementById("categories").innerHTML = '<p class="col-12 text-center">No hay categorías disponibles</p>';
        document.getElementById("products").innerHTML = '<p class="col-12 text-center">No hay productos disponibles</p>';
    });

//Función para chequear y actualizar el estado del botón "Agregar al carrito"
function updateButtonState() {
    //Seleccionar el input de número (clase quantity) y el botón de agregar al carrito (clase btn-success)
    const quantityInput = document.querySelector('.quantity');
    const addToCartButton = document.querySelector('.btn-success');

    if (quantityInput.value <= 0) {
        addToCartButton.disabled = true; // Deshabilita el botón
    } else {
        addToCartButton.disabled = false; // Habilita el botón
    }

    //Agregar los listeners al input y a los botones "-" y "+" (.minus y .plus)
    quantityInput.addEventListener('input', updateButtonState); // Lanzar el evento cuando hay un cambio en el input
    document.querySelector('.minus').addEventListener('click', updateButtonState); // Lanzar el evento cuando se hace clic en "-"
    document.querySelector('.plus').addEventListener('click', updateButtonState); // Lanzar el evento cuando se hace clic en "+"

};

// Función para chequear si existen artículos en el carrito
function hasCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.length > 0;
}

// Función para animar el carrito de compras
function animateCartIcon() {
    const cartIcon = document.querySelector('.fa.fa-shopping-cart');

    if (hasCartItems() > 0) {
        cartIcon.classList.add('animate');
    }
    else {
        cartIcon.classList.remove('animate');
    }
}

//Llamado de la función siempre que el carro se actualice
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn.btn-success');
    if (button) {
        button.addEventListener('click', () => {
            animateCartIcon();
        });
    }
});
