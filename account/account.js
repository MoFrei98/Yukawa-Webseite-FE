// Account-Seite Logik

document.addEventListener('DOMContentLoaded', async () => {
    const accountInfoDiv = document.getElementById('account-info');
    const adminPanel = document.getElementById('admin-panel');
    const userListDiv = document.getElementById('user-list');

    // Token aus localStorage holen
    const token = localStorage.getItem('authToken');
    if (!token) {
        accountInfoDiv.innerHTML = '<b>Du bist nicht eingeloggt.</b>';
        return;
    }

    // Username aus Token extrahieren
    const payload = JSON.parse(atob(token.split('.')[1]));
    let username = payload.sub || payload.username;
    if (!username) {
        console.log('username not extractable from token.');
        username = localStorage.getItem('username');
    }

    // Accountdaten laden
    try {
        const user = await httpGet(`/users/get/username/${username}`);
        let isAdmin = false;
        if (typeof hasRole === 'function') {
            isAdmin = await hasRole('ADMIN');
        }
        accountInfoDiv.innerHTML = `
            <b>Benutzername:</b> ${user.username}<br>
            <b>Vorname:</b> ${user.firstName}<br>
            <b>Nachname:</b> ${user.lastName}<br>
            ${!isAdmin ? `<button onclick="openEditUserPage('${user.uuid}')">Edit</button>` : ''}
        `;
    } catch (e) {
        accountInfoDiv.innerHTML = 'Fehler beim Laden der Accountdaten: ' + e.message;
        return;
    }

    if (typeof hasRole === 'function') {
        if (hasRole('ADMIN')) {
            adminPanel.style.display = '';
            // Alle Nutzer laden
            try {
                const users = await httpGet('/users/get-all');
                // Verfügbare Rollen vom Backend laden
                const rolesAvailable = await httpGet('/users/roles/get-all');
                // Tabelle für User-Liste
                userListDiv.innerHTML = `
                <table class="user-table">
                  <thead>
                    <tr>
                      <th>Benutzername</th>
                      <th>Email</th>
                      <th>Vorname</th>
                      <th>Nachname</th>
                      <th>Rolle</th>
                      <th>Letzter Login</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    ${users.map(user => {
                        // Neue Struktur: user.role ist ein Objekt oder null
                        const mainRole = user.role ? user.role.name : '';
                        return `
                          <tr>
                            <td class="username">${user.username}</td>
                            <td>${user.email}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.role?.name}</td>
                            <td>${user.lastLogin}</td>
                            <td>
                                <button onclick="openEditUserPage('${user.uuid}')">Edit</button>
                            </td>
                          </tr>
                        `;
                    }).join('')}
                  </tbody>
                </table>
            `;
                // Event Listener für Buttons
                userListDiv.querySelectorAll('button').forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                        const username = btn.getAttribute('data-username');
                        const select = userListDiv.querySelector(`select[data-username='${username}']`);
                        const role = select.value;
                        try {
                            await callBackend(`/users/assign-role`, 'POST', { username, role }, true);
                            alert('Rolle aktualisiert!');
                            location.reload();
                        } catch (err) {
                            alert('Fehler beim Aktualisieren der Rolle.');
                        }
                    });
                });
            } catch (e) {
                userListDiv.innerHTML = 'Fehler beim Laden der Nutzer.';
            }
        }
    }
});

function openEditUserPage(uuid) {
    // Weiterleitung zur Bearbeitungsseite mit Übergabe der UUID als URL-Parameter
    window.location.href = `/account/user/edit-user.html?uuid=${encodeURIComponent(uuid)}`;
}
