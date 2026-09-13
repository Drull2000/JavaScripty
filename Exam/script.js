const STORAGE_KEY = "coinGuardTransactions";
const transactionForm = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const currencySelect = document.getElementById("currencySelect");
const loading = document.getElementById("loading");
const converted = document.getElementById("converted");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

let transactions = loadTransactions();

function loadTransactions() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return [
            { id: "1", text: "Продаж продукту", amount: 1500, type: "income", date: "2026-09-01" },
            { id: "2", text: "Кавоварка", amount: 320, type: "expense", date: "2026-09-02" }
        ];
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        console.error("Помилка читання localStorage:", error);
        return [];
    }
}

function saveTransactions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function calculateSummary() {
    const totalIncome = transactions
        .filter(item => item.type === "income")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    const totalExpense = transactions
        .filter(item => item.type === "expense")
        .reduce((sum, item) => sum + Number(item.amount), 0);

    const balance = totalIncome - totalExpense;

    balanceEl.textContent = `${balance.toFixed(2)} грн`;
    incomeEl.textContent = `${totalIncome.toFixed(2)} грн`;
    expenseEl.textContent = `${totalExpense.toFixed(2)} грн`;

    return { totalIncome, totalExpense, balance };
}

function renderTransactions() {
    if (!transactions.length) {
        transactionList.innerHTML = "<li>Транзакцій немає</li>";
        return;
    }

    transactionList.innerHTML = transactions
        .map(item => {
            const isIncome = item.type === "income";
            const sign = isIncome ? "+" : "-";
            const amountClass = isIncome ? "income-color" : "expense-color";

            return `
                <li class="transaction-item">
                    <div class="transaction-main">
                        <strong>${item.text}</strong>
                        <span>${item.date}</span>
                    </div>

                    <div class="transaction-amount ${amountClass}">
                        ${sign}${Number(item.amount).toFixed(2)} грн
                    </div>

                    <button class="btn-delete" data-id="${item.id}">Видалити</button>
                </li>
            `;
        })
        .join("");
}

function renderAll() {
    calculateSummary();
    renderTransactions();
}

transactionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("id").value.trim();
    const text = document.getElementById("text").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;

    if (!id || !text || !amount || !date || amount <= 0) {
        alert("Всі поля повинні бути заповнені коректно.");
        return;
    }

    const newTransaction = {
        id,
        text,
        amount,
        type,
        date
    };

    transactions.push(newTransaction);
    saveTransactions();
    renderAll();

    transactionForm.reset();
    document.getElementById("date").value = new Date().toISOString().split("T")[0];
});

transactionList.addEventListener("click", function (event) {
    if (!event.target.classList.contains("btn-delete")) return;

    const id = event.target.dataset.id;
    transactions = transactions.filter(item => item.id !== id);
    saveTransactions();
    renderAll();
});

async function fetchExchangeRates() {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");

    if (!response.ok) {
        throw new Error("Не вдалося завантажити курси валют");
    }

    const data = await response.json();
    return data.rates;
}

async function convertBalance() {
    try {
        loading.style.display = "inline";

        const { balance } = calculateSummary();
        const rates = await fetchExchangeRates();
        const selectedCurrency = currencySelect.value;

        let convertedValue = balance;

        if (selectedCurrency === "USD") {
            convertedValue = balance / rates.USD;
        } else if (selectedCurrency === "EUR") {
            convertedValue = balance / rates.EUR;
        } else if (selectedCurrency === "UAH") {
            convertedValue = balance * rates.UAH;
        }

        converted.textContent = `Баланс: ${convertedValue.toFixed(2)} ${selectedCurrency}`;
    } catch (error) {
        console.error(error);
        converted.textContent = "Помилка завантаження курсу валют";
        alert("Помилка завантаження курсу валют. Спробуйте пізніше.");
    } finally {
        loading.style.display = "none";
    }
}

document.getElementById("convertBtn").addEventListener("click", convertBalance);

document.getElementById("date").value = new Date().toISOString().split("T")[0];
renderAll();