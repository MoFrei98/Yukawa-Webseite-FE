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

function getUsernameFromToken() {
    let username = localStorage.getItem('username');
    if (!username) {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                username = payload.username || payload.sub;
                if (username) localStorage.setItem('username', username);
            } catch (e) { username = null; }
        }
    }
    return username;
}

function hasRole(userNameOrNull, roleName) {
    // Username aus Token extrahieren, falls nicht übergeben
    const username = userNameOrNull || getUsernameFromToken();
    if (!username) return false;
    const result = httpGet(`/users/has-role/${username}/${roleName}`, null, true);
    return result === true;
}