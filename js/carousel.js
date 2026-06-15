/**
 * ==========================================================================
 * CONTROLADOR DEL CARRUSEL HERO (Fade Slider - Huellas Felices)
 * ==========================================================================
 * Gestiona el estado interactivo del slider superior, controlando la rotación
 * automática y manual de los testimonios visuales de los perros rescatados.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Selección de nodos principales del DOM
    const carouselSection = document.getElementById('hero');
    const slides = document.querySelectorAll('.carousel-slide');
    const btnNext = document.querySelector('.btn-next');
    const btnPrev = document.querySelector('.btn-prev');

    // Salvaguarda: Si el componente no está en el DOM actual, abortamos la ejecución
    if (!carouselSection || slides.length === 0 || !btnNext || !btnPrev) return;

    let currentSlideIndex = 0;
    let autoPlayInterval = null;
    const AUTO_PLAY_DELAY = 6000; // Rotación automática cada 6 segundos

    /**
     * Cambia la diapositiva activa basándose en un índice absoluto.
     * @param {number} newIndex - Índice de la diapositiva a mostrar.
     */
    function changeSlide(newIndex) {
        // 1. Quitar la clase activa de la diapositiva que está visible actualmente
        slides[currentSlideIndex].classList.remove('active');

        // 2. Actualizar el índice global asegurando el comportamiento cíclico (infinito)
        if (newIndex >= slides.length) {
            currentSlideIndex = 0; // Vuelve al inicio
        } else if (newIndex < 0) {
            currentSlideIndex = slides.length - 1; // Salta al final
        } else {
            currentSlideIndex = newIndex;
        }

        // 3. Inyectar la clase activa a la nueva diapositiva (CSS maneja el fade-in)
        slides[currentSlideIndex].classList.add('active');
    }

    /**
     * Inicializa o reajusta el temporizador de reproducción automática.
     */
    function startAutoPlay() {
        // Limpiar cualquier intervalo previo para evitar duplicaciones de procesos en segundo plano
        if (autoPlayInterval) clearInterval(autoPlayInterval);

        autoPlayInterval = setInterval(() => {
            changeSlide(currentSlideIndex + 1);
        }, AUTO_PLAY_DELAY);
    }

    // --- ESCUCHADORES DE EVENTOS (INTERACCIONES) ---

    // Avanzar a la siguiente diapositiva de forma manual
    btnNext.addEventListener('click', () => {
        changeSlide(currentSlideIndex + 1);
        startAutoPlay(); // Resetear el temporizador para mejorar la experiencia de usuario
    });

    // Retroceder a la diapositiva anterior de forma manual
    btnPrev.addEventListener('click', () => {
        changeSlide(currentSlideIndex - 1);
        startAutoPlay(); // Resetear el temporizador
    });

    // Soporte de accesibilidad para teclado (Flecha izquierda y derecha)
    carouselSection.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            changeSlide(currentSlideIndex + 1);
            startAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            changeSlide(currentSlideIndex - 1);
            startAutoPlay();
        }
    });

    // Iniciar el ciclo de vida automático del carrusel en el primer renderizado
    startAutoPlay();
});