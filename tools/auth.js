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
    // Anfrage an das neue Backend-Endpoint
    const result = httpGet(`/users/has-role/${userUuid}/${roleName}`, null, true);
    return result === true;
}