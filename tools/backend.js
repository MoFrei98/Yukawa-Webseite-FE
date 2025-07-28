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

function callBackend(method, url, body, auth) {
    const xmlHttp = new XMLHttpRequest();
    const fullURL = BACKEND_URL + url;

    xmlHttp.open(method, fullURL, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    if (auth) {
        const token = localStorage.getItem('authToken');
        //console.log('Using token: ', token);
        if (token) {
            xmlHttp.setRequestHeader('Authorization', 'Bearer ' + token);
        }
    }
    xmlHttp.send(JSON.stringify(body));

    if (!xmlHttp.responseText)
        return null;

    try {
        const jsonResponse = JSON.parse(xmlHttp.responseText);
        console.log('response for url ' + fullURL + ': ',  jsonResponse);
        return jsonResponse;
    } catch (e) {
        console.error('Fehler beim Parsen der Antwort von ' + fullURL, e);
        return null;
    }
}