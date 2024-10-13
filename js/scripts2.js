//Código JavaScript para hacer funcionar los carruseles de la página menú
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carrusel').forEach((carousel) => {
        let slideIndex = 0;
        const slides = carousel.querySelectorAll('.carrusel-imgs img');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });

            // Desplaza el contenedor de imágenes a la posición correcta
            console.log(`Mostrando imagen ${index}`);
        }

        function moveSlide(direction) {
            slideIndex += direction;
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            } else if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            showSlide(slideIndex);
        }

        // Muestra la primera imagen al cargar la página para este carrusel
        showSlide(slideIndex);

        // Agrega los eventos de clic para los botones prev y next de este carrusel
        carousel.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
        carousel.querySelector('.next').addEventListener('click', () => moveSlide(1));
    });
});