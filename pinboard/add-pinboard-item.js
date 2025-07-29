// add-pinboard-item.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-pinboard-item-form');
    const errorMsg = document.getElementById('error-msg');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        errorMsg.textContent = '';

        const title = document.getElementById('title').value;
        const text = document.getElementById('text').value;
        const fileInput = document.getElementById('attachment');
        const file = fileInput.files[0];

        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        if (file) {
            formData.append('attachment', file);
        }

        try {
            const response = await fetch('/pinboard-items/create', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + (localStorage.getItem('authToken') || '')
                }
            });
            if (!response.ok) {
                throw new Error('Fehler beim Hochladen!');
            }
            window.location.href = '../index.html';
        } catch (err) {
            errorMsg.textContent = err.message || 'Unbekannter Fehler.';
        }
    });
});

