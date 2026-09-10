const input = document.getElementById('jsonInput');
const output = document.getElementById('jsonOutput');
const button = document.getElementById('formatButton');

function formatJson() {
    try {
        const data = JSON.parse(input.value);
        output.className = '';
        output.textContent = JSON.stringify(data, null, 4);
    } catch (error) {
        output.className = 'error';
        output.textContent = 'Format error: введені дані не є правильним JSON';
    }
}

button.addEventListener('click', formatJson);
formatJson();
