function renderLoginTask() {
    const root = document.getElementById('loginResult');

    root.innerHTML = `
        <div class="form-box">
            <div class="form-row">
                <label>Ваш логін:</label>
                <input type="text" value="admin">
            </div>

            <div class="form-row">
                <label>Ваш пароль:</label>
                <input type="password" value="123456">
            </div>

            <div class="checkbox-row">
                <label><input type="checkbox" checked> Запам'ятати мене</label>
            </div>

            <div style="margin-top: 12px;">
                <button class="btn" type="button">Увійти</button>
            </div>

            <div style="margin-top: 12px;">
                <a href="#">Забули пароль?</a>
            </div>
        </div>
    `;
}

function renderSignupTask() {
    const root = document.getElementById('signupResult');

    root.innerHTML = `
        <div class="form-box">
            <div class="form-grid">
                <div class="form-row">
                    <label>Ваш email:</label>
                    <input type="email" value="user@example.com">
                </div>
                <div class="form-row">
                    <label>Ваш логін:</label>
                    <input type="text" value="user123">
                </div>
                <div class="form-row">
                    <label>Ваш пароль:</label>
                    <input type="password" value="qwerty">
                </div>
                <div class="form-row">
                    <label>Повторіть пароль:</label>
                    <input type="password" value="qwerty">
                </div>
            </div>

            <div style="margin-top: 12px;">
                <button class="btn" type="button">Зареєструватися</button>
            </div>
        </div>
    `;
}

function renderProfileTask() {
    const root = document.getElementById('profileResult');

    root.innerHTML = `
        <div class="form-box">
            <div class="form-grid">
                <div class="form-row">
                    <label>Ім'я:</label>
                    <input type="text" value="Іван">
                </div>
                <div class="form-row">
                    <label>Прізвище:</label>
                    <input type="text" value="Петренко">
                </div>
                <div class="form-row">
                    <label>Дата народження:</label>
                    <input type="text" value="15/01/1991">
                </div>
                <div class="form-row">
                    <label>Стать:</label>
                    <div class="radio-row">
                        <label><input type="radio" name="gender" checked> Чоловік</label>
                        <label><input type="radio" name="gender"> Жінка</label>
                    </div>
                </div>
                <div class="form-row">
                    <label>Країна:</label>
                    <select>
                        <option selected>Україна</option>
                        <option>Польща</option>
                        <option>Німеччина</option>
                        <option>США</option>
                    </select>
                </div>
                <div class="form-row">
                    <label>Місто:</label>
                    <input type="text" value="Львів">
                </div>
            </div>

            <div class="form-row" style="margin-top: 16px;">
                <span class="text-label">Навички:</span>
                <div class="skill-row">
                    <label><input type="checkbox" checked> HTML</label>
                    <label><input type="checkbox" checked> CSS</label>
                    <label><input type="checkbox" checked> JS</label>
                    <label><input type="checkbox"> PHP</label>
                    <label><input type="checkbox"> C++</label>
                    <label><input type="checkbox"> Java</label>
                </div>
            </div>

            <div style="margin-top: 12px;">
                <button class="btn" type="button">Зберегти</button>
            </div>
        </div>
    `;
}

function renderProfileTable() {
    const root = document.getElementById('profileResult');

    root.innerHTML += `
        <table class="result-table" style="margin-top: 20px;">
            <tr>
                <th>Ім'я</th>
                <td>Іван</td>
            </tr>
            <tr>
                <th>Прізвище</th>
                <td>Петренко</td>
            </tr>
            <tr>
                <th>Дата народження</th>
                <td>15/01/1991</td>
            </tr>
            <tr>
                <th>Стать</th>
                <td>Чоловік</td>
            </tr>
            <tr>
                <th>Країна</th>
                <td>Україна</td>
            </tr>
            <tr>
                <th>Місто</th>
                <td>Львів</td>
            </tr>
            <tr>
                <th>Навички</th>
                <td>HTML, CSS, JS</td>
            </tr>
        </table>
    `;
}

function renderPaletteTask() {
    const root = document.getElementById('paletteResult');

    const colors = [
        [165, 42, 42],
        [138, 43, 226],
        [0, 139, 139],
        [100, 149, 237],
        [210, 105, 30],
        [0, 206, 209],
        [189, 183, 107],
        [255, 105, 180]
    ];

    const palette = colors.map(([r, g, b]) => `
        <div class="color-card">
            <span class="color-sample" style="background: rgb(${r}, ${g}, ${b});"></span>
            <span>RGB (${r}, ${g}, ${b})</span>
        </div>
    `).join('');

    root.innerHTML = `
        <div class="form-box">
            <div class="color-builder">
                <div class="color-mini"><span>R</span><input type="number" value="165"></div>
                <div class="color-mini"><span>G</span><input type="number" value="42"></div>
                <div class="color-mini"><span>B</span><input type="number" value="42"></div>
                <button class="btn" type="button">Додати колір</button>
            </div>

            <div class="color-grid">
                ${palette}
            </div>
        </div>
    `;
}

function renderQuestionsTask() {
    const root = document.getElementById('questionsResult');

    root.innerHTML = `
        <div class="form-box">
            <div class="text-label">Усі запитання:</div>
            <ul class="question-list">
                <li>Скільки літер у слові "Hello"?</li>
            </ul>

            <div class="text-label" style="margin-top: 16px;">Додати нове запитання:</div>
            <form class="question-form" id="questionForm">
                <div class="form-row">
                    <label>Питання:</label>
                    <input type="text" id="questionInput">
                </div>
                <div class="form-row">
                    <label>Правильна відповідь:</label>
                    <input type="text" id="correctInput">
                </div>
                <div class="form-row">
                    <label>Неправильна відповідь:</label>
                    <input type="text" id="wrongInput">
                </div>
                <button class="btn" type="submit">Додати</button>
            </form>
        </div>
    `;

    const form = document.getElementById('questionForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const question = document.getElementById('questionInput').value.trim();
        const correct = document.getElementById('correctInput').value.trim();
        const wrong = document.getElementById('wrongInput').value.trim();

        if (!question || !correct || !wrong) return;

        const list = document.querySelector('.question-list');
        const item = document.createElement('li');
        item.textContent = question;
        list.appendChild(item);

        form.reset();
    });
}

renderLoginTask();
renderSignupTask();
renderProfileTask();
renderProfileTable();
renderPaletteTask();
renderQuestionsTask();
