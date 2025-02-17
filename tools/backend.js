const BACKEND_URL = 'http://localhost:8090';

function httpGet(url) {
    return callBackend('GET', url, null);
}

function httpPut(url, body) {
    return callBackend('PUT', url, body);
}

function httpPost(url, body) {
    return callBackend('POST', url, body);
}

function httpDelete(url) {
    return callBackend('DELETE', url, null);
}

function callBackend(method, url, body) {
    var xmlHttp = new XMLHttpRequest();
    const fullURL = BACKEND_URL + url;

    xmlHttp.open(method, fullURL, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(body);

    var jsonResponse = JSON.parse(xmlHttp.responseText);
    console.log('response for url ' + fullURL + ': ',  jsonResponse);
    return jsonResponse;
}