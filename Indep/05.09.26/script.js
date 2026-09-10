function processArray(array, callback) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i]));
    }

    return result;
}

function doubleElement(element) {
    return element * 2;
}

function reverseElement(element) {
    return element.split('').reverse().join('');
}

function filterArray(array, callback) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            result.push(array[i]);
        }
    }

    return result;
}

function isEven(number) {
    return number % 2 === 0;
}

function isShortWord(word) {
    return word.length <= 4;
}

function washDishes() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Посуд вимито');
        }, 2000);
    });
}

function cleanRoom() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Кімнату прибрано');
        }, 4000);
    });
}

function makeDinner() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Вечерю приготовано');
        }, 7000);
    });
}

function sortArray(array) {
    return new Promise((resolve, reject) => {
        if (array.length === 0) {
            reject('Масив порожній');
            return;
        }

        setTimeout(() => {
            resolve(array.sort((a, b) => a - b));
        }, 2000);
    });
}

function showResult(id, text) {
    document.getElementById(id).textContent = text;
}

document.querySelector('[data-task="1"]').addEventListener('click', () => {
    const numbers = processArray([1, 2, 3, 4, 5], doubleElement);
    const words = processArray(['hello', 'world', 'js'], reverseElement);

    showResult('result1', 'Подвоєні числа: ' + numbers.join(', ') +
        '\nСлова навпаки: ' + words.join(', '));
});

document.querySelector('[data-task="2"]').addEventListener('click', () => {
    const evenNumbers = filterArray([1, 2, 3, 4, 5], isEven);
    const shortWords = filterArray(['cat', 'elephant', 'dog', 'bird'], isShortWord);

    showResult('result2', 'Парні числа: ' + evenNumbers.join(', ') +
        '\nКороткі слова: ' + shortWords.join(', '));
});

document.querySelector('[data-task="3"]').addEventListener('click', () => {
    const button = document.querySelector('[data-task="3"]');
    const messages = [];

    button.disabled = true;
    showResult('result3', 'Виконується...');

    washDishes()
        .then((message) => {
            messages.push(message);
            showResult('result3', messages.join('\n'));
            return cleanRoom();
        })
        .then((message) => {
            messages.push(message);
            showResult('result3', messages.join('\n'));
            return makeDinner();
        })
        .then((message) => {
            messages.push(message);
            showResult('result3', messages.join('\n'));
            button.disabled = false;
        });
});

document.querySelector('[data-task="4"]').addEventListener('click', () => {
    showResult('result4', 'Сортування...');

    sortArray([5, 2, 8, 1, 3])
        .then((array) => {
            showResult('result4', 'Відсортований масив: ' + array.join(', '));
            return sortArray([]);
        })
        .catch((error) => {
            showResult('result4', document.getElementById('result4').textContent + '\nПомилка: ' + error);
        });
});
