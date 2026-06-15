/**
 * ==========================================================================
 * ORQUESTADOR GLOBAL, RESPONSIVE Y SCROLL REVEAL (Huellas Felices)
 * ==========================================================================
 * Este script coordina la inicialización de los componentes globales del sitio,
 * controla el menú de navegación adaptativo y ejecuta la animación de revelado.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Animaciones de Scroll (Intersection Observer)
    initScrollReveal();

    // 2. Optimizar Accesibilidad y Comportamiento de Enlaces de Anclaje (Smooth Scroll)
    initAnchorOptimization();

    // 3. Inicializar Menú Hamburguesa Adaptativo para Móviles
    initResponsiveMenu();

    // Mensaje de diagnóstico para consola (Práctica recomendada en desarrollo)
    console.log('🐾 Huellas Felices: Sistema central inicializado correctamente.');
});

/**
 * Configura y ejecuta el Intersection Observer para animar los elementos 
 * con la clase '.reveal-element' a medida que entran en la pantalla.
 */
function initScrollReveal() {
    const elementsToReveal = document.querySelectorAll('.reveal-element');

    if (elementsToReveal.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

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

            if (targetSelector === '#') return;

            const targetSection = document.querySelector(targetSelector);

            if (targetSection) {
                e.preventDefault();

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                setTimeout(() => {
                    targetSection.focus({ preventScroll: true });

                    if (document.activeElement !== targetSection) {
                        targetSection.setAttribute('tabindex', '-1');
                        targetSection.focus({ preventScroll: true });
                    }
                }, 600);
            }
        });
    });
}

/**
 * Controla el despliegue del menú hamburguesa en dispositivos móviles
 * y la accesibilidad ARIA del botón interactivo.
 */
function initResponsiveMenu() {
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mainNav = document.getElementById('main-nav');

    if (!menuToggleBtn || !mainNav) return;

    // Escuchador para abrir y cerrar el menú
    menuToggleBtn.addEventListener('click', () => {
        mainNav.classList.toggle('nav-open');

        const isOpen = mainNav.classList.contains('nav-open');
        menuToggleBtn.setAttribute('aria-expanded', isOpen);

        // Mutar el icono dinámicamente (Barras <=> Equis)
        const icon = menuToggleBtn.querySelector('i');
        if (icon) {
            if (isOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Resetear el estado si la pantalla se agranda más allá del punto de ruptura móvil
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mainNav.classList.contains('nav-open')) {
            mainNav.classList.remove('nav-open');
            menuToggleBtn.setAttribute('aria-expanded', 'false');
            const icon = menuToggleBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });
}