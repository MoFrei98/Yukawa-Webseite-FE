from flask import Flask, send_from_directory, render_template_string
import os

app = Flask(__name__, static_folder='.', static_url_path='')

# Root-Route: index.html oder login.html, falls vorhanden
def get_start_file():
    if os.path.exists('index.html'):
        return 'index.html'
    elif os.path.exists('login/login.html'):
        return 'login/login.html'
    else:
        return None

@app.route('/')
def root():
    start_file = get_start_file()
    if start_file:
        folder, file = os.path.split(start_file)
        return send_from_directory(folder or '.', file)
    return 'Keine Startdatei gefunden', 404

# Statische Dateien (HTML, JS, CSS, Bilder, etc.)
@app.route('/<path:path>')
def static_proxy(path):
    if os.path.exists(path):
        folder, file = os.path.split(path)
        return send_from_directory(folder or '.', file)
    return 'Datei nicht gefunden', 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

