//JAVA SCRIPT PARA CARGAR PRODUCTOS POR CATEGORIA EN PAGINA MNU

// Cargar el archivo JSON
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
                    background-color: #f5f5dc; animation: animacionFadeIn ease 2s; border-style: none">
                                    
                                <div class="card-body" style = "background-color: #c6a664;
                                border-radius:10%; animation: animacionFadeIn ease 2s;">
                                        
                                    <h5 class="card-title">${producto.nombre}</h5>
                                        
                                        <img class = "card-img-top" style= "width:200px;
                                        height: 200px; background-size:cover;border-radius: 10%"
                                        src= ${producto.imagen} alt="imagen de comida" />
                                        
                                        <p class="card-text">${producto.descripcion}</p>
                                        
                                        <p class="card-text">Precio: &#8353 ${producto.precio} c/u</p>

                                        <button class="btn btn-success" onclick="addToCart('${producto.nombre}')">Agregar al carrito</button>
                
                                        <button class="btn btn-info" onclick="showDetails('${producto.id}')"
                                        style = "background-color: #8B4513; color: white; border-style:none" >Mostrar detalles</button>

                                    </div>
                                </div>
                            `;
                    productsContainer.appendChild(productCard);
                });
            }
        };

        // Función para agregar al carrito
        window.addToCart = function (productName) {
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado',
                text: `${productName} ha sido agregado al carrito.`,
                showConfirmButton: false,
                timer: 1500
            });
        };

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
                            margin-right: 50%;"/>
                            <p><strong>Precio:</strong> &#8353 ${producto.precio}</p>
                            <p><strong>Descripción:</strong> ${producto.descripcion}</p>
                            <p><strong>Categoría:</strong> ${producto.categoria}</p>
                        `;
                $('#productModal').modal('show');  // Mostrar el modal
            }
        };

        // Mostrar productos de "Categoria 1" al cargar la página, si existe
        if (categorias.includes('Categoria 1')) {
            showProducts('Categoria 1');
        }
    })
    .catch(error => {
        console.error('Error al cargar productos:', error);
        document.getElementById("categories").innerHTML = '<p class="col-12 text-center">No hay categorías disponibles</p>';
        document.getElementById("products").innerHTML = '<p class="col-12 text-center">No hay productos disponibles</p>';
    });