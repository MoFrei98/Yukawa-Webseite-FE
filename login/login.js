document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('login-message');

    try {
        const data = httpPost('/users/login', JSON.stringify({ username, password }));
        if (data.token) {
            message.style.color = 'green';
            message.textContent = 'Login erfolgreich! Token: ' + data.token;
            // Token speichern oder Weiterleitung hier
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

// Registrierung absenden
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const firstName = document.getElementById('reg-firstname').value;
    const lastName = document.getElementById('reg-lastname').value;
    const message = document.getElementById('register-message');

    try {
        const data = httpPost('/users/register', JSON.stringify({
            username,
            password,
            firstName,
            lastName
        }));
        message.style.color = 'green';
        message.textContent = 'Registrierung erfolgreich!';
    } catch (error) {
        message.style.color = '#d8000c';
        message.textContent = 'Fehler bei der Registrierung: ' + error.message;
    }
});
