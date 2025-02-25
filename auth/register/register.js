document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('register-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confpassword').value;
        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;

        const errorMessage = document.getElementById('error-message');

        if (!username || !email || !password) {
            errorMessage.textContent = 'All fields are required.';
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = 'Passwords do not match.';
            return;
        }

        try {
            const userData = { username, email, password, firstName, lastName };
            const newUser = await httpPost('/users/register', JSON.stringify(userData));

            if (newUser) {
                alert('Registration successful!');
                console.log('User registered:', userData);
                document.getElementById('register-form').reset();
                errorMessage.textContent = '';
            } else {
                errorMessage.textContent = 'Username or email already exists.';
            }
        } catch (error) {
            console.error('Error during registration:', error);
            errorMessage.textContent = 'An error occurred. Please try again.';
        }
    });
});