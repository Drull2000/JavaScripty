//Ладно джс приколльний ахах
// 1
{
    let name = prompt("Введіть ваше ім'я:");
    alert("Привіт, " + name + "!");
}
// 2
{
    let number = Number(prompt("Введіть число:"));
    alert("Число у квадраті: " + (number ** 2));
}
// 3
{
    let num1 = Number(prompt("Введіть перше число:"));
    let num2 = Number(prompt("Введіть друге число:"));
    alert("Середнє арифметичне: " + ((num1 + num2) / 2));
}
// 4
{
    let side = Number(prompt("Введіть довжину сторони квадрата:"));
    alert("Площа квадрата: " + (side * side));
}
// 5
{
    const KM_TO_MILES = 0.621371;
    let kilometers = Number(prompt("Введіть кількість кілометрів:"));
    let miles = kilometers * KM_TO_MILES;
    alert("У милях: " + miles);
}
// 6
{
    let a = Number(prompt("Введіть перше число:"));
    let b = Number(prompt("Введіть друге число:"));
    alert(
        "Сума: " + (a + b) + "\n" +
        "Різниця: " + (a - b) + "\n" +
        "Добуток: " + (a * b) + "\n" +
        "Частка: " + (a / b)
    );
}
// 7
{
    let a = Number(prompt("Введіть a:"));
    let b = Number(prompt("Введіть b:"));
    let x = -b / a;
    alert("x = " + x);
}
// 8
{
    let hours = Number(prompt("Введіть поточну годину:"));
    let minutes = Number(prompt("Введіть поточну хвилину:"));
    let totalMinutesNow = hours * 60 + minutes;
    let remainingMinutes = 1440 - totalMinutesNow;
    let remainingHours = parseInt(remainingMinutes / 60);
    let remainingMins = remainingMinutes % 60;
    alert(
        "До наступного дня залишилось: " +
        remainingHours + " год. " +
        remainingMins + " хв."
    );
}
// 9
{
    let number = Number(prompt("Введіть тризначне число:"));
    let secondDigit = (number % 100 - number % 10) / 10;
    alert("Друга цифра: " + secondDigit);
}
// 10
{
    let fiveDigitNumber = Number(prompt("Введіть п'ятизначне число:"));

    let lastDigit = fiveDigitNumber % 10;
    let firstPart = parseInt(fiveDigitNumber / 10);

    let result = Number("" + lastDigit + firstPart);

    alert("Результат: " + result);
}
// 11
{
    const BASE_SALARY = 250;
    let sales = Number(prompt("Введіть суму продажів за місяць:"));
    let salary = BASE_SALARY + sales * 0.1;
    alert("Зарплата працівника: $" + salary);
}