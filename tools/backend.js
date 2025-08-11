const BACKEND_URL = 'http://localhost:8090';

function httpGet(url, body = null, auth = true) {
    return callBackend('GET', url, body, auth);
}

function httpPut(url, body, auth = true) {
    return callBackend('PUT', url, body, auth);
}

function httpPost(url, body, auth = true) {
    return callBackend('POST', url, body, auth);
}

function httpDelete(url, auth = true) {
    return callBackend('DELETE', url, null, auth);
}

async function callBackend(method, url, body, auth) {
    const fullURL = BACKEND_URL + url;
    const headers = {
        'Content-Type': 'application/json'
    };

    if (auth) {
        const token = localStorage.getItem('authToken');
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }
    }

    // Add CSRF token for state-changing methods (POST, PUT, DELETE)
    if (['POST', 'PUT', 'DELETE'].includes(method)) {
        const csrfToken = getCookie('XSRF-TOKEN');
        if (csrfToken) {
            headers['X-XSRF-TOKEN'] = csrfToken;
        }
    }

    try {
        const options = {
            method: method,
            headers: headers,
            credentials: 'include' // Send cookies with the request
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(fullURL, options);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error from ${fullURL}: ${response.status} ${errorText}`);
            // Return null or throw an error to indicate failure
            return null;
        }

        // Handle cases with no response body (e.g., for DELETE or some PUT requests)
        const responseText = await response.text();
        if (!responseText) {
            return null;
        }

        const jsonResponse = JSON.parse(responseText);
        console.log('response for url ' + fullURL + ': ', jsonResponse);
        return jsonResponse;

    } catch (e) {
        console.error('Fehler bei der Anfrage an ' + fullURL, e);
        return null;
    }
}

// Helper function to read a cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Return null if cookie not found
}


/**
 * Uploads a file to the backend using modern fetch API.
 * @param {File} file The file to upload.
 * @returns {Promise<string>} A promise that resolves with the path of the uploaded file.
 */
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('authToken');
    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // --- DIAGNOSE-SCHRITT ---
    const csrfToken = getCookie('XSRF-TOKEN');
    console.log('CSRF Token found in cookie for uploadFile:', csrfToken); // Zeigt, ob das Cookie gefunden wurde
    if (csrfToken) {
        headers['X-XSRF-TOKEN'] = csrfToken;
    }

    const response = await fetch(`${BACKEND_URL}/files/upload`, {
        method: 'POST',
        headers: headers,
        body: formData,
        credentials: 'include' // Send cookies with the request
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`File upload failed: ${errorText}`);
    }

    // The backend should return the path of the stored file as plain text
    return await response.text();
}
