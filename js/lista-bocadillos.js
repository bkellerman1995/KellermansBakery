function detalleLibro(id) {
  window.location.href = `detalle-libro.html?id=${id}`;
}
function displayProducts(data) {
  $("#mnuBocadillosBOOTSTRAP").html('')
  data.forEach((product) => {
    const cardProduct = `<div class="col"><div class="card shadow-sm text-center">
      <div class="card-header">
          <h4 class="card-title">${product.name}</h4>
      </div>
      <img class="card-img-top" style="max-height:460px;" role="img" src="${product.thumbnailUrl ? book.thumbnailUrl : 'img/image-not-found.jpg'}"
          alt="Imagen" />
      <div class="card-body">
          <p class="card-title">ISBN:${product.isbn}</p>
          <h1 class="card-title">&cent;${product.price}</h1>
          <div class="d-grid gap-2">
              <button type="button" class="btn btn-lg btn-primary" onclick="detalleLibro(${book._id})">Detalle</button>
          </div>
      </div>
  </div></div>`
    $("#book-list").append(cardProduct)
  });
}
// Función para mostrar las opciones de filtro por categoría
function displayCategories() {
  var select = $('#filter');
  var categories = [];

}
$(document).ready(function () {
  //Listar Libros
  displayProducts(productos)
  //Listar Categorias
  //displayCategories()
  $('#filter').change(function () {
  });
});
