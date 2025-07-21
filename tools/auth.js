(function checkToken() {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('authTokenExpiry');

    if (!token || !expiry || new Date().getTime() > parseInt(expiry)) {
        // Token abgelaufen oder fehlt
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiry');
        window.location.href = 'login.html'; // oder dein Pfad zur Login-Seite
    }
})();

function hasRole(userUuid, roleName) {
    const user = httpGet('/get/' + userUuid, null);
    const role = httpGet('/role/' + roleName, null);
    // ... hier die Logik, um zu prüfen, ob der Benutzer die Rolle hat
}