/**
 * ==========================================================================
 * MOTOR DE VALIDACIÓN ESTRICTA DE FORMULARIOS (Huellas Felices)
 * ==========================================================================
 * Gestiona la captura, validación asíncrona y verificación semántica de los
 * datos del formulario de adopción, controlando las respuestas del DOM.
 */

document.addEventListener('DOMContentLoaded', () => {
    const adoptionForm = document.getElementById('adoption-form');

    // Salvaguarda: Detener ejecución si el formulario no está presente en la vista actual
    if (!adoptionForm) return;

    // Mapeo exhaustivo de los campos de entrada de datos (Inputs)
    const fields = {
        name: document.getElementById('adopt-name'),
        email: document.getElementById('adopt-email'),
        phone: document.getElementById('adopt-phone'),
        dog: document.getElementById('adopt-dog')
    };

    // Mapeo exhaustivo de los contenedores dinámicos de error en el DOM
    const errors = {
        name: document.getElementById('error-name'),
        email: document.getElementById('error-email'),
        phone: document.getElementById('error-phone'),
        dog: document.getElementById('error-dog')
    };

    const globalFeedback = document.getElementById('form-global-feedback');

    // --- 1. EXPRESIONES REGULARES DE CONTROL DE CALIDAD (REGEX) ---
    // Estándar oficial W3C para verificación estructural de correos electrónicos
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Valida únicamente dígitos numéricos (para evitar inyección de caracteres de texto en teléfonos)
    const PHONE_REGEX = /^\d+$/;

    // --- 2. ESCUCHADORES DE EVENTOS EN TIEMPO REAL (UX PROACTIVO) ---
    // Ejecuta validaciones al retirar el foco (blur) o al escribir (input) para limpiar errores velozmente
    fields.name.addEventListener('input', () => validateName());
    fields.email.addEventListener('input', () => validateEmail());
    fields.phone.addEventListener('input', () => validatePhone());
    fields.dog.addEventListener('change', () => validateDog());

    // --- 3. MANEJADOR CENTRAL DEL EVENTO SUBMIT ---
    adoptionForm.addEventListener('submit', (e) => {
        // Detener obligatoriamente el refresco de página nativo por defecto
        e.preventDefault();

        // Ejecutar batería completa de pruebas lógicas
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isDogValid = validateDog();

        // Evaluación del estado general del formulario
        if (isNameValid && isEmailValid && isPhoneValid && isDogValid) {
            // ÉXITO: Todos los campos cumplen las condiciones de seguridad
            executeSuccessSubmit();
        } else {
            // ERROR: Notificar al usuario mediante accesibilidad ARIA
            if (globalFeedback) {
                globalFeedback.className = 'form-feedback hidden'; // Asegurar reset visual
                alert('Por favor, corrija los errores marcados en rojo antes de enviar la solicitud.');
            }
        }
    });

    // --- 4. FUNCIONES DE VALIDACIÓN ESPECÍFICAS (LÓGICA DE NEGOCIO) ---

    /** Validar Nombre Completo (Obligatorio, mínimo 5 caracteres por coherencia de apellido) */
    function validateName() {
        const value = fields.name.value.trim();
        if (value === "") {
            setError(fields.name, errors.name, "El nombre completo es un campo obligatorio.");
            return false;
        }
        if (value.length < 5) {
            setError(fields.name, errors.name, "Introduce nombre y apellido (Mínimo 5 caracteres).");
            return false;
        }
        setValid(fields.name, errors.name);
        return true;
    }

    /** Validar Email (Obligatorio y estructurado bajo máscara Regex) */
    function validateEmail() {
        const value = fields.email.value.trim();
        if (value === "") {
            setError(fields.email, errors.email, "El correo electrónico es obligatorio.");
            return false;
        }
        if (!EMAIL_REGEX.test(value)) {
            setError(fields.email, errors.email, "El formato de correo no es válido (ejemplo@dominio.com).");
            return false;
        }
        setValid(fields.email, errors.email);
        return true;
    }

    /** Validar Teléfono Móvil (Obligatorio, numérico puro y longitud mínima de 8 dígitos) */
    function validatePhone() {
        const value = fields.phone.value.trim();
        if (value === "") {
            setError(fields.phone, errors.phone, "El teléfono de contacto es obligatorio.");
            return false;
        }
        if (!PHONE_REGEX.test(value)) {
            setError(fields.phone, errors.phone, "El teléfono solo debe contener números, sin espacios ni guiones.");
            return false;
        }
        if (value.length < 8) {
            setError(fields.phone, errors.phone, "Número incompleto (Debe tener al menos 8 dígitos).");
            return false;
        }
        setValid(fields.phone, errors.phone);
        return true;
    }

    /** Validar Selector de Perro (Obligatorio elegir una categoría del elemento <select>) */
    function validateDog() {
        const value = fields.dog.value;
        if (value === "") {
            setError(fields.dog, errors.dog, "Debes seleccionar una preferencia de edad.");
            return false;
        }
        setValid(fields.dog, errors.dog);
        return true;
    }

    // --- 5. ENRUTADORES AUXILIARES DE ESTADO DEL DOM ---

    /** Inyecta los estilos de error y el mensaje semántico correspondiente */
    function setError(inputElement, errorElement, message) {
        inputElement.classList.add('invalid');
        inputElement.classList.remove('valid');
        errorElement.textContent = message;
        inputElement.setAttribute('aria-invalid', 'true');
    }

    /** Limpia los errores e inyecta el estado conforme de validación */
    function setValid(inputElement, errorElement) {
        inputElement.classList.remove('invalid');
        inputElement.classList.add('valid');
        errorElement.textContent = ""; // Vacía el texto del contenedor
        inputElement.setAttribute('aria-invalid', 'false');
    }

    /** Procesa la simulación de persistencia tras un envío exitoso */
    function executeSuccessSubmit() {
        // Recolectar datos en un objeto limpio de JavaScript
        const adoptionData = {
            applicant: fields.name.value.trim(),
            email: fields.email.value.trim().toLowerCase(),
            phone: fields.phone.value.trim(),
            preference: fields.dog.value,
            message: document.getElementById('adopt-msg').value.trim(),
            timestamp: new Date().toISOString()
        };

        // Guardar solicitud en el LocalStorage simulando base de datos transaccional
        const existingApplications = JSON.parse(localStorage.getItem('adoption_applications')) || [];
        existingApplications.push(adoptionData);
        localStorage.setItem('adoption_applications', JSON.stringify(existingApplications));

        // Feedback visual gratificante en pantalla (UX)
        if (globalFeedback) {
            globalFeedback.textContent = "🐾 ¡Solicitud enviada con éxito! Nuestro equipo se pondrá en contacto contigo pronto.";
            globalFeedback.className = "form-feedback success";

            // Hacer scroll suave automático hacia el mensaje de éxito global
            globalFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Resetear por completo el formulario e histórico de clases de validación
        adoptionForm.reset();
        Object.values(fields).forEach(field => {
            field.classList.remove('valid', 'invalid');
            field.removeAttribute('aria-invalid');
        });
    }
});