// Google Maps API Initialization
function initMap() {
    // Opciones del mapa
    const mapOptions = {
        center: { lat: 10.027848096914072, lng: -84.17165563849521}, // Coordenadas de la UTN
        zoom: 15, // Nivel de zoom
    };

    // Crear el mapa
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Agregar un marcador al mapa
    const marker = new google.maps.Marker({
        position: { lat: 10.027848096914072, lng: -84.17165563849521},
        map: map,
        title: "Kellerman's Bakery", // Título del marcador
    });
}
