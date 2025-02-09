const BACKEND_URL = 'http://localhost:8090';

function httpGet(theUrl) {
    return callBackend('GET', theUrl, null);
}

function httpUpdate(theUrl, body) {
    return callBackend('UPDATE', theUrl, body);
}

function httpPost(theUrl, body) {
    return callBackend('POST', theUrl, body);
}

function httpDelete(theUrl) {
    return callBackend('DELETE', theUrl, null);
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