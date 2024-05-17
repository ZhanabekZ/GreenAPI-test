document.addEventListener('DOMContentLoaded', () => {
    const getIdInstance = () => document.querySelector('.userId').value.trim();
    const getApiTokenInstance = () => document.querySelector('.userApiToken').value.trim();
    const getPhoneNumber1 = () => document.querySelector('.userPhoneNumber1').value.trim();
    const getPhoneNumber2 = () => document.querySelector('.userPhoneNumber2').value.trim();
    const getMessage = () => document.getElementById('multilineInput').value.trim();
    const getFileUrl = () => document.querySelector('.userFileUrlAddress').value.trim();

    const displayError = (message) => {
        document.getElementById('apiResponse').value = `Error: ${message}`;
    };

    const validateCommonFields = () => {
        const idInstance = getIdInstance();
        const apiTokenInstance = getApiTokenInstance();
        if (!idInstance || !apiTokenInstance) {
            displayError('idInstance and apiTokenInstance cannot be empty.');
            return false;
        }
        return true;
    };

    document.querySelector('.getSettings').addEventListener('click', () => {
        if (!validateCommonFields()) return;

        const idInstance = getIdInstance();
        const apiTokenInstance = getApiTokenInstance();

        fetch(`php/getSettings.php?idInstance=${idInstance}&apiTokenInstance=${apiTokenInstance}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('apiResponse').value = data;
            })
            .catch(error => {
                console.error('Error:', error);
                displayError(error.message);
            });
    });

    document.querySelector('.getStateInstance').addEventListener('click', () => {
        if (!validateCommonFields()) return;

        const idInstance = getIdInstance();
        const apiTokenInstance = getApiTokenInstance();

        fetch(`php/getStateInstance.php?idInstance=${idInstance}&apiTokenInstance=${apiTokenInstance}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('apiResponse').value = data;
            })
            .catch(error => {
                console.error('Error:', error);
                displayError(error.message);
            });
    });

    document.querySelector('.large-button.sendMessage').addEventListener('click', () => {
        if (!validateCommonFields()) return;

        const chatId = getPhoneNumber1() + '@c.us';
        const message = getMessage();

        if (!getPhoneNumber1() || !message) {
            displayError('Phone number and message cannot be empty.');
            return;
        }

        const idInstance = getIdInstance();
        const apiTokenInstance = getApiTokenInstance();

        fetch(`php/sendMessage.php?idInstance=${idInstance}&apiTokenInstance=${apiTokenInstance}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chatId: chatId, message: message })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('apiResponse').value = data;
            })
            .catch(error => {
                console.error('Error:', error);
                displayError(error.message);
            });
    });

    document.querySelector('.large-button.sendFileByUrl').addEventListener('click', () => {
        if (!validateCommonFields()) return;

        const chatId = getPhoneNumber2() + '@c.us';
        const fileUrl = getFileUrl();

        if (!getPhoneNumber2() || !fileUrl) {
            displayError('Phone number and file URL cannot be empty.');
            return;
        }

        const idInstance = getIdInstance();
        const apiTokenInstance = getApiTokenInstance();

        fetch(`php/sendFileByUrl.php?idInstance=${idInstance}&apiTokenInstance=${apiTokenInstance}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chatId: chatId, fileUrl: fileUrl })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('apiResponse').value = data;
            })
            .catch(error => {
                console.error('Error:', error);
                displayError(error.message);
            });
    });
});