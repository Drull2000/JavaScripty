class Marker {

    constructor(color, inkLevel){
        this.color = color;
        this.inkLevel = inkLevel;
    }

    print(text){

        let result = "";

        for(let char of text){

            if(this.inkLevel <= 0) break;

            result += char;

            if(char !== " "){
                this.inkLevel -= 0.5;
            }
        }

        return `
        <span style="color:${this.color}">
            ${result}
        </span>
        <br>
        Залишок чорнил: ${this.inkLevel.toFixed(1)}%
        `;
    }
}

class RefillableMarker extends Marker{

    refill(percent){

        this.inkLevel += percent;

        if(this.inkLevel > 100){
            this.inkLevel = 100;
        }
    }
}

const marker = new RefillableMarker("blue", 10);

let markerOutput =
marker.print("Це текст, надрукований синім маркером.");

marker.refill(30);

markerOutput +=
"<br><br>Після заправки:<br>" +
marker.print("Маркер знову працює.");

document.getElementById("markerResult").innerHTML =
markerOutput;


class ExtendedDate extends Date{

    getTextDate(){

        const months = [
            "січня",
            "лютого",
            "березня",
            "квітня",
            "травня",
            "червня",
            "липня",
            "серпня",
            "вересня",
            "жовтня",
            "листопада",
            "грудня"
        ];

        return `${this.getDate()} ${months[this.getMonth()]}`;
    }

    isFutureOrToday(){

        const today = new Date();

        return this >= new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
    }

    isLeapYear(){

        const year = this.getFullYear();

        return (
            (year % 4 === 0 && year % 100 !== 0)
            || year % 400 === 0
        );
    }

    getNextDate(){

        const nextDate = new Date(this);

        nextDate.setDate(nextDate.getDate() + 1);

        return nextDate;
    }
}

const exDate = new ExtendedDate();

document.getElementById("dateResult").innerHTML = `
<p><b>Дата текстом:</b> ${exDate.getTextDate()}</p>

<p><b>Майбутня або поточна:</b>
${exDate.isFutureOrToday()}</p>

<p><b>Високосний рік:</b>
${exDate.isLeapYear()}</p>

<p><b>Наступна дата:</b>
${exDate.getNextDate().toLocaleDateString()}</p>
`;

class Employee{

    constructor(id, name, position, salary){

        this.id = id;
        this.name = name;
        this.position = position;
        this.salary = salary;
    }
}

const employees = [

    new Employee(
        1,
        "Іван Петренко",
        "Менеджер",
        25000
    ),

    new Employee(
        2,
        "Марія Коваль",
        "Бухгалтер",
        22000
    ),

    new Employee(
        3,
        "Олег Сидоренко",
        "Касир",
        18000
    )
];

class EmpTable{

    constructor(employees){
        this.employees = employees;
    }

    getHtml(){

        let html = `
        <table class="employee-table">

            <tr>
                <th>ID</th>
                <th>Ім'я</th>
                <th>Посада</th>
                <th>Зарплата</th>
            </tr>
        `;

        this.employees.forEach(emp => {

            html += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.position}</td>
                <td>${emp.salary}</td>
            </tr>
            `;
        });

        html += "</table>";

        return html;
    }
}

const empTable = new EmpTable(employees);

document.getElementById("empTableResult").innerHTML =
empTable.getHtml();

class StyledEmpTable extends EmpTable{

    getStyles(){

        return `
        <style>
            .styled-table{
                border-collapse: collapse;
                width: 100%;
            }

            .styled-table th{
                background: #4CAF50;
                color: white;
            }

            .styled-table td,
            .styled-table th{
                border: 1px solid black;
                padding: 10px;
                text-align: center;
            }
        </style>
        `;
    }

    getHtml(){

        let html = `
        <table class="styled-table">

            <tr>
                <th>ID</th>
                <th>Ім'я</th>
                <th>Посада</th>
                <th>Зарплата</th>
            </tr>
        `;

        this.employees.forEach(emp => {

            html += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.position}</td>
                <td>${emp.salary}</td>
            </tr>
            `;
        });

        html += "</table>";

        return html;
    }
}

const styledTable =
new StyledEmpTable(employees);

document.getElementById("styledEmpTableResult").innerHTML =
styledTable.getHtml();