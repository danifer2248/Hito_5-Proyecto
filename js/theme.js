/**
 * ==========================================================================
 * CONTROLADOR DE TEMA VISUAL (Theme Switcher - Huellas Felices)
 * ==========================================================================
 * Administra el estado de la interfaz (Modo Claro / Modo Oscuro) mapeando
 * las preferencias en el LocalStorage y manipulando el árbol de atributos del DOM.
 */

// Ejecución inmediata al cargar el script para evitar el "Flash visual" de fondo blanco
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Determinar tema inicial: 1. Guardado por usuario, 2. Preferencia del sistema operativo, 3. Por defecto Claro
const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', initialTheme);

// Esperar a que los elementos del DOM estén accesibles para vincular los eventos interctivos
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (!themeToggleBtn) return;

    // Sincronizar el estado inicial del icono del botón según el tema activo
    updateToggleIcon(initialTheme, themeToggleBtn);

    // Escuchador de eventos para el click en el botón alternador
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        // Operador ternario para alternar el string de estado
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // 1. Aplicar el tema en tiempo real en la etiqueta raíz (<html>)
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // 2. Persistir de forma permanente la selección en el navegador del cliente
        localStorage.setItem('theme', newTheme);
        
        // 3. Actualizar la estética del icono vectorial
        updateToggleIcon(newTheme, themeToggleBtn);
    });
});

/**
 * Modifica las clases de FontAwesome dentro del botón para alternar el icono visualmente.
 * @param {string} theme - El tema actual ('light' o 'dark')
 * @param {HTMLElement} button - El nodo del botón del DOM
 */
function updateToggleIcon(theme, button) {
    const icon = button.querySelector('i');
    if (!icon) return;

    if (theme === 'dark') {
        // En modo oscuro, mostramos el sol para volver al claro
        icon.className = 'fa-solid fa-sun';
        button.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
        // En modo claro, mostramos la luna para ir al oscuro
        icon.className = 'fa-solid fa-moon';
        button.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
}