document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const uuid = params.get('uuid');
    const form = document.getElementById('edit-user-form');
    const errorMsg = document.getElementById('error-msg');
    const roleSelectContainer = document.getElementById('role-select-container');
    const roles = await httpGet('/users/roles/get-all');
    const roleSelect = document.getElementById('role');

    if (!uuid) {
        errorMsg.textContent = 'Keine UUID übergeben.';
        form.style.display = 'none';
        return;
    }

    // Token aus localStorage holen
    const token = localStorage.getItem('authToken');
    if (!token) {
        errorMsg.textContent = 'Nicht eingeloggt.';
        form.style.display = 'none';
        return;
    }

    // Nutzer laden
    try {
        const user = await httpGet(`/users/get/id/${uuid}`);
        document.getElementById('username').value = user.username || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('firstName').value = user.firstName || '';
        document.getElementById('lastName').value = user.lastName || '';
        document.getElementById('password').value = user.password || '';

        // Prüfe Admin-Rechte
        let isAdmin = false;
        if (typeof hasRole === 'function') {
            isAdmin = await hasRole('ADMIN');
        }
        if (isAdmin) {
            roleSelectContainer.style.display = '';
            // Rollen vom Backend laden
            roleSelect.innerHTML = roles.map(role => `<option value="${role.name}">${role.name}</option>`).join('');
            if (user.role && user.role.name) {
                roleSelect.value = user.role.name;
            }
        }
    } catch (e) {
        console.error('Fehler beim Laden des Nutzers:', e);
        errorMsg.textContent = 'Fehler beim Laden des Nutzers: ' + (e.message || e);
        form.style.display = 'none';
        return;
    }

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        errorMsg.textContent = '';
        const updatedUser = {
            uuid,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            password: document.getElementById('password').value
        };
        if (roleSelectContainer.style.display !== 'none') {
            // Finde das vollständige Rollenobjekt
            const selectedRoleName = roleSelect.value;
            updatedUser.role = roles.find(r => r.name === selectedRoleName);
        }
        try {
            console.log('saving user:', updatedUser);
            await httpPut('/users/update', updatedUser);
            window.location.href = '../account.html';
        } catch (e) {
            errorMsg.textContent = 'Fehler beim Speichern.';
        }
    });
});