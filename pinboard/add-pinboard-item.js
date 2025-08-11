// add-pinboard-item.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-pinboard-item-form');
    const errorMsg = document.getElementById('error-msg');
    const addAttachmentBtn = document.getElementById('add-attachment-btn');
    const attachmentForm = document.getElementById('attachment-form');
    const fileTypeSelect = document.getElementById('file-type');
    const pathTypeSelect = document.getElementById('path-type');

    // Show/hide attachment form
    addAttachmentBtn.addEventListener('click', () => {
        attachmentForm.style.display = attachmentForm.style.display === 'none' ? 'block' : 'none';
    });

    // Populate select options - you might need to fetch these from your backend
    const fileTypes = ['IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT'];
    const pathTypes = ['URL', 'FILE_SYSTEM'];

    fileTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        fileTypeSelect.appendChild(option);
    });

    pathTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        pathTypeSelect.appendChild(option);
    });


    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        errorMsg.textContent = '';

        const title = document.getElementById('title').value;
        const text = document.getElementById('text').value;
        const fileInput = document.getElementById('attachment');
        const file = fileInput.files[0];

        // This is the final JSON object we will send to the backend.
        const pinboardItemData = {
            title: title,
            text: text,
            attachments: [] // Start with an empty attachments list
        };

        try {
            // Step 1: If a file is selected, upload it first to get its path.
            if (file) {
                console.log("File selected, starting upload...");
                const filePath = await uploadFile(file);
                console.log("File uploaded, path received:", filePath);

                const attachmentData = {
                    fileType: fileTypeSelect.value,
                    pathType: pathTypeSelect.value,
                    path: filePath
                };
                pinboardItemData.attachments.push(attachmentData);
            }

            // Step 2: Post the complete JSON object to the backend.
            console.log("Preparing to post pinboard item:", JSON.stringify(pinboardItemData, null, 2));
            const result = await httpPost('/pinboard-items/create', pinboardItemData);

            if (result) {
                console.log("Successfully created pinboard item:", result);
                window.location.href = '../index.html';
            } else {
                throw new Error("Failed to create pinboard item. Server returned an error or no result. Check browser console for details.");
            }

        } catch (err) {
            console.error("Error during form submission:", err);
            errorMsg.textContent = err.message || 'An unknown error occurred.';
        }
    });
});
