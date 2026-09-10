const dogButton = document.getElementById('dogButton');
const message = document.getElementById('message');
const dogContainer = document.getElementById('dogContainer');

async function getDog() {
    dogButton.disabled = true;
    message.className = '';
    message.textContent = 'Ищем мордатого...';
    dogContainer.innerHTML = '';

    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');

        if (!response.ok) {
            throw new Error('Ашибка сервера');
        }

        const data = await response.json();

        if (data.status !== 'success' || !data.message) {
            throw new Error('Фото не нашел');
        }

        const image = document.createElement('img');
        image.alt = 'Случайная собака';
        image.src = data.message;

        image.onload = function () {
            message.textContent = '';
            dogButton.disabled = false;
        };

        image.onerror = function () {
            message.className = 'error';
            message.textContent = 'Не удаётся загрузить фото.';
            dogButton.disabled = false;
        };

        dogContainer.appendChild(image);
    } catch (error) {
        message.className = 'error';
        message.textContent = 'Не удаётся загрузить фото. Попробуйте еще раз.';
        dogButton.disabled = false;
    }
}

dogButton.addEventListener('click', getDog);
