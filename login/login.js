document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('login-message');

    try {
        const data = httpPost('/users/login', { username, password }, false);
        if (data && data.token) {
            // Token für 1 Stunde speichern
            const expiry = new Date().getTime() + 60 * 60 * 1000;
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('authTokenExpiry', expiry);
            localStorage.setItem('username', username); // Username speichern
            // Weiterleitung auf index.html
            window.location.href = '../index.html';
        } else {
            message.style.color = '#d8000c';
            message.textContent = 'Login fehlgeschlagen!';
        }
    } catch (error) {
        message.style.color = '#d8000c';
        message.textContent = 'Fehler beim Login: ' + error.message;
    }
});

// Registrierung anzeigen/ausblenden
const showRegisterBtn = document.getElementById('show-register');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

showRegisterBtn.addEventListener('click', function() {
    if (registerForm.style.display === 'none') {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
        showRegisterBtn.textContent = 'Zurück zum Login';
    } else {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        showRegisterBtn.textContent = 'Registrieren';
    }
});

// register
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const firstName = document.getElementById('reg-firstname').value;
    const lastName = document.getElementById('reg-lastname').value;
    const message = document.getElementById('register-message');

    try {
        const data = {
            username,
            password,
            firstName,
            lastName
        };
        httpPost( '/users/register', data, false);
        message.style.color = 'green';
        message.textContent = 'Registrierung erfolgreich!';
    } catch (error) {
        message.style.color = '#d8000c';
        message.textContent = 'Fehler bei der Registrierung: ' + error.message;
    }
});
