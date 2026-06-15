/**
 * ==========================================================================
 * SISTEMA DE AUTENTICACIÓN Y GESTIÓN DE ROLES (Huellas Felices)
 * ==========================================================================
 * Simula el ciclo de vida de una sesión de usuario (Persistencia, Login, 
 * Registro y Roles) utilizando la API de LocalStorage en Vanilla JavaScript.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Componentes del DOM - Tabs
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    // Componentes del DOM - Vistas de Sesión
    const viewLoggedOut = document.getElementById('auth-logged-out');
    const viewLoggedIn = document.getElementById('auth-logged-in');

    // Componentes del DOM - Perfil en Header
    const userProfileHeader = document.getElementById('user-profile');
    const userDisplayName = document.getElementById('user-display-name');
    const btnLogout = document.getElementById('btn-logout');
    const navAuthLink = document.getElementById('nav-auth-link');
    const sessionRoleDisplay = document.getElementById('session-role-display');

    // Inicializar base de datos simulada local si no existe
    if (!localStorage.getItem('mock_users')) {
        localStorage.setItem('mock_users', JSON.stringify([
            // Usuario administrador semilla para pruebas del docente
            { name: "Admin Refugio", email: "admin@huellas.com", role: "Admin" }
        ]));
    }

    // Evaluar estado de sesión inmediato al renderizar la página
    evaluateSession();

    // --- 1. LÓGICA DE CONMUTACIÓN DE PESTAÑAS (TABS) ---
    if (tabLogin && tabRegister && formLogin && formRegister) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            formLogin.classList.add('active-form');
            formRegister.classList.remove('active-form');
        });

        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            formRegister.classList.add('active-form');
            formLogin.classList.remove('active-form');
        });
    }

    // --- 2. LOGICA DEL FORMULARIO DE REGISTRO ---
    if (formRegister) {
        formRegister.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim().toLowerCase();
            const role = document.getElementById('reg-role').value;

            // Validación interna veloz (la validación avanzada se asila en validation.js)
            if (!name || !email) {
                alert('Por favor, rellene todos los campos de registro.');
                return;
            }

            const mockUsers = JSON.parse(localStorage.getItem('mock_users'));

            // Verificar duplicados
            if (mockUsers.some(u => u.email === email)) {
                alert('Este correo ya se encuentra registrado.');
                return;
            }

            // Crear y almacenar nuevo usuario
            const newUser = { name, email, role };
            mockUsers.push(newUser);
            localStorage.setItem('mock_users', JSON.stringify(mockUsers));

            // Loguear automáticamente al registrar con éxito (Patrón UX Moderno)
            loginUser(newUser);
            formRegister.reset();
        });
    }

    // --- 3. LÓGICA DEL FORMULARIO DE LOGIN ---
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value.trim().toLowerCase();
            const pass = document.getElementById('login-password').value; // En simulación académica no evaluamos fuerza

            if (!email || !pass) {
                alert('Por favor, complete sus credenciales.');
                return;
            }

            const mockUsers = JSON.parse(localStorage.getItem('mock_users'));
            const userFound = mockUsers.find(u => u.email === email);

            if (userFound) {
                loginUser(userFound);
                formLogin.reset();
            } else {
                alert('Credenciales inválidas. Intente con el usuario semilla: admin@huellas.com');
            }
        });
    }

    // --- 4. LÓGICA DE CIERRE DE SESIÓN ---
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('active_session');
            evaluateSession();
            window.location.hash = '#hero'; // Retornar visualmente al inicio
        });
    }

    /**
     * Establece el token de sesión y dispara la actualización de la interfaz.
     * @param {Object} user - Objeto con datos del usuario logueado.
     */
    function loginUser(user) {
        localStorage.setItem('active_session', JSON.stringify(user));
        evaluateSession();
    }

    /**
     * Examina el LocalStorage para pintar condicionalmente el DOM 
     * según el estado de la sesión activa y su rol asignado.
     */
    function evaluateSession() {
        const session = JSON.parse(localStorage.getItem('active_session'));

        if (session) {
            // CONTROL DE INTERFAZ: USUARIO LOGUEADO

            // Ocultar formularios de ingreso y mostrar mensaje de bienvenida
            if (viewLoggedOut) viewLoggedOut.classList.add('hidden');
            if (viewLoggedIn) viewLoggedIn.classList.remove('hidden');
            if (sessionRoleDisplay) sessionRoleDisplay.textContent = session.role;

            // Actualizar elementos de la barra de navegación (Header)
            if (navAuthLink) navAuthLink.classList.add('hidden');
            if (userProfileHeader) userProfileHeader.classList.remove('hidden');
            if (userDisplayName) userDisplayName.textContent = `${session.name} (${session.role})`;

            // Rellenar automáticamente campos del formulario de adopción si es un Adoptante
            const adoptNameInput = document.getElementById('adopt-name');
            const adoptEmailInput = document.getElementById('adopt-email');
            if (adoptNameInput && !adoptNameInput.value) adoptNameInput.value = session.name;
            if (adoptEmailInput && !adoptEmailInput.value) adoptEmailInput.value = session.email;

            // Decoración condicional académica (Cambio de color estético si eres Admin)
            if (session.role === 'Admin' && viewLoggedIn) {
                viewLoggedIn.style.borderTop = "4px solid var(--accent-color)";
            } else if (viewLoggedIn) {
                viewLoggedIn.style.borderTop = "none";
            }

        } else {
            // CONTROL DE INTERFAZ: INVITADO (NO LOGUEADO)

            // Mostrar formularios, ocultar panel de sesión activa
            if (viewLoggedOut) viewLoggedOut.classList.remove('hidden');
            if (viewLoggedIn) viewLoggedIn.classList.add('hidden');

            // Reestablecer Header
            if (navAuthLink) navAuthLink.classList.remove('hidden');
            if (userProfileHeader) userProfileHeader.classList.add('hidden');
            if (userDisplayName) userDisplayName.textContent = '';
        }
    }
});