const BACKEND_URL = 'http://localhost:8090';

async function httpGet(theUrl) {
    return await callBackend('GET', theUrl);
}

async function httpUpdate(theUrl, body) {
    return await callBackend('PUT', theUrl, body);
}

async function httpPost(theUrl, body) {
    return await callBackend('POST', theUrl, body);
}

async function httpDelete(theUrl) {
    return await callBackend('DELETE', theUrl);
}

async function callBackend(method, url, body = null) {
    const fullURL = BACKEND_URL + url;

    try {
        const response = await fetch(fullURL, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
            throw new Error(`Fehler ${response.status}: ${await response.text()}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Fehler bei ${method} ${fullURL}:`, error);
        return null;
    }
}