function vichislit(a, b, naUspih, naPomylku) {
    if (b === 0) {
        naPomylku('Ділення на нуль заборонено');
        return;
    }

    naUspih(a / b);
}

function obrobitiMasiv(array, callback) {
    const result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i]));
    }

    return result;
}

function vivestiElement(element) {
    console.log(element);
    return element;
}

function kvadratElement(element) {
    return element * element;
}

function sdelatZakaz(orderId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Замовлення створено: ' + orderId);
        }, 1000);
    });
}

function obrobitiZakaz(orderId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Замовлення оброблено: ' + orderId);
        }, 1000);
    });
}

function dostavitiZakaz(orderId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Замовлення доставлено: ' + orderId);
        }, 1000);
    });
}

function pereviritiParnist(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (number % 2 === 0) {
                resolve('Парне число: ' + number);
            } else {
                reject('Непарне число: ' + number);
            }
        }, 1000);
    });
}

function pokazatRezultat(id, text) {
    const result = document.getElementById(id);
    result.textContent = text;
}

document.querySelector('[data-task="1"]').addEventListener('click', () => {
    vichislit(10, 2, function (result) {
        pokazatRezultat('result1', 'Результат: ' + result);
    }, function (error) {
        pokazatRezultat('result1', 'Помилка: ' + error);
    });

    vichislit(10, 0, function (result) {
        pokazatRezultat('result1', 'Результат: ' + result);
    }, function (error) {
        pokazatRezultat('result1', 'Помилка: ' + error);
    });
});

document.querySelector('[data-task="2"]').addEventListener('click', () => {
    const array = [1, 2, 3, 4, 5];
    const result = obrobitiMasiv(array, kvadratElement);
    obrobitiMasiv(array, vivestiElement);
    pokazatRezultat('result2', 'Масив: ' + array.join(', ') + '\nКвадрати: ' + result.join(', '));
});

document.querySelector('[data-task="3"]').addEventListener('click', () => {
    const orderId = 'A-101';

    sdelatZakaz(orderId)
        .then((message) => {
            pokazatRezultat('result3', message);
            return obrobitiZakaz(orderId);
        })
        .then((message) => {
            pokazatRezultat('result3', pokazatTekst('result3', message));
            return dostavitiZakaz(orderId);
        })
        .then((message) => {
            pokazatRezultat('result3', pokazatTekst('result3', message));
        });
});

function pokazatTekst(id, text) {
    const element = document.getElementById(id);
    return element.textContent + '\n' + text;
}

document.querySelector('[data-task="4"]').addEventListener('click', () => {
    pereviritiParnist(8)
        .then((message) => {
            pokazatRezultat('result4', message);
        })
        .catch((error) => {
            pokazatRezultat('result4', error);
        });

    pereviritiParnist(7)
        .then((message) => {
            pokazatRezultat('result4', message);
        })
        .catch((error) => {
            pokazatRezultat('result4', error);
        });
});
