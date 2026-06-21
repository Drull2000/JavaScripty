function increase() {
    const input = document.querySelector('#number');
    input.value = Number(input.value) + 1;
}

function decrease() {
    const input = document.querySelector('#number');
    input.value = Number(input.value) - 1;
}

const colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'orange',
    'pink',
    'cyan'
];

function addBlock() {

    const div = document.createElement('div');

    div.classList.add('block');

    div.style.background =
        colors[Math.floor(Math.random() * colors.length)];

    div.addEventListener('click', () => {
        div.remove();
    });

    document.querySelector('#blocks').append(div);
}

const palette = document.querySelectorAll('.color');

palette.forEach(item => {

    item.addEventListener('click', () => {

        const color = item.dataset.color;

        document.querySelector('#text').style.color = color;
    });

});

function addComment() {

    const name =
        document.querySelector('#userName').value;

    const text =
        document.querySelector('#commentText').value;

    if (name === '' || text === '') return;

    const comment = document.createElement('div');

    comment.classList.add('comment');

    const date = new Date().toLocaleDateString();

    comment.innerHTML = `
        <strong>${name}</strong><br>
        <small>${date}</small>
        <p>${text}</p>
    `;

    document.querySelector('#comments').append(comment);

    document.querySelector('#userName').value = '';
    document.querySelector('#commentText').value = '';
}

const countries = [
    'Ukraine',
    'Poland',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Portugal',
    'Belgium',
    'Netherlands',
    'Sweden',
    'Norway',
    'Finland',
    'Denmark',
    'Canada',
    'USA',
    'Mexico',
    'Brazil',
    'Argentina'
];

const input =
    document.querySelector('#countryInput');

input.addEventListener('input', () => {

    const value = input.value.toLowerCase();

    const suggestions =
        document.querySelector('#suggestions');

    suggestions.innerHTML = '';

    const result = countries
        .filter(country =>
            country.toLowerCase().startsWith(value))
        .slice(0, 10);

    result.forEach(country => {

        const div = document.createElement('div');

        div.classList.add('suggestion');

        div.textContent = country;

        div.addEventListener('click', () => {

            input.value = country;

            suggestions.innerHTML = '';
        });

        suggestions.append(div);
    });

});