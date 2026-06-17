# Huellas Felices 🐾

Huellas Felices es una plataforma web moderna, interactiva y totalmente responsiva diseñada para la gestión de adopciones responsables de animales rescatados. El proyecto está construido bajo una arquitectura modular limpia utilizando HTML5 semántico, CSS3 personalizado (*Vanilla CSS*) con diseño adaptativo *mobile-first*, y lógica avanzada en *Vanilla JavaScript*. El desarrollo implementa patrones técnicos orientados a optimizar el rendimiento, mitigar fallos visuales y garantizar normativas estrictas de accesibilidad web (A11y).

---

## 🚀 Características Principales

* **Sistema de Autenticación por Roles Simulado:** Panel dinámico de inicio de sesión y registro que gestiona los flujos de interfaz de forma diferenciada para usuarios con rol de *Adoptante* o *Administrador* (*Admin*). Los estados de sesión persisten de manera transparente en el `localStorage`.
* **Orquestador Global y Animaciones de Revelado:** Uso eficiente de la API `IntersectionObserver` para ejecutar animaciones de entrada fluidas sobre los elementos de la interfaz (`.reveal-element`). Cuenta con desvinculación activa (`unobserve`) tras la activación para garantizar una gestión de memoria óptima en el navegador.
* **Controlador de Tema Visual (Claro / Oscuro) Antiflash:** Conmutador estético que mapea las preferencias nativas del sistema operativo (`prefers-color-scheme`) y elecciones del usuario. La lectura e inyección del atributo `data-theme` se ejecuta de forma inmediata e independiente para mitigar por completo el *Flash of Unstyled Content* (FOUC).
* **Motor de Validación Estricta y UX Proactiva:** Formulario de adopción protegido por expresiones regulares (Regex) para la verificación semántica de correos electrónicos y teléfonos numéricos puros. El motor valida en tiempo real (evento `input`) para limpiar indicadores de error velozmente, guardando las solicitudes validadas cronológicamente a través de un `timestamp` ISO en el cliente.
* **Optimización de Accesibilidad Semántica (A11y):** Gestión avanzada de la transferencia de foco del teclado en saltos de anclaje internos (`tabindex`), uso extensivo de atributos dinámicos `aria-invalid` y `aria-expanded`, junto con contenedores interactivos regulados por regiones `aria-live` (`polite` / `assertive`) para lectores de pantalla.
* **Carrusel Hero de Alto Rendimiento:** Slider de imágenes interactivo integrado en la página de aterrizaje, optimizado para transiciones fluidas mediante transformaciones de CSS aceleradas por hardware.

---

## 📁 Estructura del Proyecto

El proyecto está organizado de forma modular, aislando los componentes del marcado, la distribución de estilos en cascada y las responsabilidades de la lógica de negocio:

```text
├── index.html                 # Página de inicio con propuesta de valor y carrusel hero
├── perros.html                # Catálogo semántico de animales rescatados en grid adaptativo
├── ingresar.html              # Interfaz de acceso por pestañas con control de roles de usuario
├── adoptar.html               # Formulario técnico accesible para solicitudes de adopción
├── css/
│   ├── variables.css          # Centralización de tokens de diseño y paletas de colores dinámicas
│   ├── base.css               # Reseteos normativos, estilos globales y configuraciones tipográficas
│   ├── layout.css             # Arquitectura de contenedores, cabecera, pie de página y rejillas
│   └── components.css         # Estilos específicos de tarjetas, botones, formularios y carrusel
└── js/
    ├── main.js                # Coordinador global del DOM, scroll reveal y menú adaptativo móvil
    ├── theme.js               # Inyección inmediata de tema visual y sincronización de accesibilidad
    ├── auth.js                # Manejo de sesiones simuladas, vistas condicionales y control de accesos
    ├── carousel.js            # Motor de animación, transiciones y eventos del slider principal
    └── validation.js          # Lógica transaccional de validación, sanitización y guardado del formulario