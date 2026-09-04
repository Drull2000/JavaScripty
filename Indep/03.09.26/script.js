const result = document.getElementById('jsonResult');

const jsonExample = {
    missionId: 'ARES-2026',
    missionName: 'Марсіанський світланок',
    launchYear: 2026,
    isManned: true,
    status: 'У польоті',
    budgetBillion: 2.5,
    commander: {
        firstName: 'Катерина',
        lastName: 'Джара',
        rank: 'Капітан'
    },
    crewRoles: ['Пілот', 'Бортінженер', 'Астро-біолог', 'Медик'],
    telemetry: {
        speedKmh: 27500,
        distanceTravelledKm: 15000000,
        systemsCheck: 'OK'
    },
    criticalErrors: null,
    communicationActive: true
};

function formatValue(value) {
    if (value === null) return 'null';
    if (typeof value === 'string') return '"' + value + '"';
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);

    if (Array.isArray(value)) {
        return '[' + value.map(item => formatValue(item)).join(', ') + ']';
    }

    if (typeof value === 'object') {
        const items = Object.entries(value).map(([key, item]) => '"' + key + '": ' + formatValue(item));
        return '{ ' + items.join(', ') + ' }';
    }

    return String(value);
}

function renderJson(data) {
    const rows = Object.entries(data).map(([key, value]) => `
        <tr>
            <th>${key}</th>
            <td>${formatValue(value)}</td>
        </tr>
    `).join('');

    result.innerHTML = `
        <div class="json-panel">
            <div class="file-picker">
                <label for="jsonFile">Вибрати файл</label>
                <input id="jsonFile" type="file" accept=".json,application/json">
            </div>

            <div class="table-wrap">
                <table class="json-table">
                    <thead>
                        <tr>
                            <th>Поле (Ключ)</th>
                            <th>Значення</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById('jsonFile').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith('.json')) {
            alert('Виберіть JSON файл');
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            try {
                const data = JSON.parse(reader.result);
                renderJson(data);
            } catch (error) {
                alert('Некоректний JSON файл');
            }
        };
        reader.readAsText(file);
    });
}

renderJson(jsonExample);
