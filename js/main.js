/**
 * ==========================================================================
 * ORQUESTADOR GLOBAL Y SCROLL REVEAL (Huellas Felices)
 * ==========================================================================
 * Este script coordina la inicialización de los componentes globales del sitio
 * y ejecuta la animación de revelado asíncrono utilizando la API nativa 
 * 'Intersection Observer', garantizando un rendimiento óptimo de la GPU.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Animaciones de Scroll (Intersection Observer)
    initScrollReveal();

    // 2. Optimizar Accesibilidad y Comportamiento de Enlaces de Anclaje (Smooth Scroll)
    initAnchorOptimization();

    // Mensaje de diagnóstico para consola (Práctica recomendada en desarrollo)
    console.log('🐾 Huellas Felices: Sistema central inicializado correctamente.');
});

/**
 * Configura y ejecuta el Intersection Observer para animar los elementos 
 * con la clase '.reveal-element' a medida que entran en la pantalla.
 */
function initScrollReveal() {
    const elementsToReveal = document.querySelectorAll('.reveal-element');

    // Si no existen elementos configurados, salimos prematuramente para evitar desperdicio de recursos
    if (elementsToReveal.length === 0) return;

    // Configuración del cuadrante de detección del Viewport
    const observerOptions = {
        root: null,             // Utiliza el viewport del navegador como área de referencia
        rootMargin: '0px 0px -80px 0px', // Activa la animación 80px antes de que el elemento toque el fondo
        threshold: 0.15         // Se dispara cuando el 15% del volumen del elemento es visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Validar si el elemento ha entrado en la zona de intersección
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Patrón de optimización Senior: Dejamos de observar el elemento ya animado 
                // para liberar memoria RAM y ciclos de procesamiento de la CPU.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Registrar de forma masiva todos los hooks de animación en el observador
    elementsToReveal.forEach(element => {
        revealObserver.observe(element);
    });
}

/**
 * Corrige y optimiza los saltos de anclaje internos (ej. de botones CTA al formulario)
 * asegurando la transferencia de foco del teclado, vital para cumplir normativas de accesibilidad.
 */
function initAnchorOptimization() {
    const structuralLinks = document.querySelectorAll('a[href^="#"]');

    structuralLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetSelector = this.getAttribute('href');

            // Salvaguarda por si el href está vacío o es un enlace muerto de retorno
            if (targetSelector === '#') return;

            const targetSection = document.querySelector(targetSelector);

            if (targetSection) {
                e.preventDefault();

                // Ejecución del desplazamiento suave controlado por hardware
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Gestión de accesibilidad (Mover el foco real para lectores de pantalla)
                setTimeout(() => {
                    targetSection.focus({ preventScroll: true });

                    // Si el elemento no es enfocable nativamente (como un <section>), le inyectamos dinámicamente un tabindex alterno
                    if (document.activeElement !== targetSection) {
                        targetSection.setAttribute('tabindex', '-1');
                        targetSection.focus({ preventScroll: true });
                    }
                }, 600); // Delay sincronizado con la inercia visual del scroll
            }
        });
    });
}