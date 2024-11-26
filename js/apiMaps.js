// Google Maps API Initialization
function initMap() {
    // Opciones del mapa
    const mapOptions = {
        center: { lat: 10.00714128347572, lng: -84.21642988116847 }, // Coordenadas de la UTN
        zoom: 15, // Nivel de zoom
    };

    // Crear el mapa
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Agregar un marcador al mapa
    const marker = new google.maps.Marker({
        position: { lat: 10.00714128347572, lng: -84.21642988116847 },
        map: map,
        title: "Universidad Técnica Nacional", // Título del marcador
    });
}
