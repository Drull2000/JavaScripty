let colors = [];

function setCookie(name, value, hours) {

    const date = new Date();

    date.setTime(date.getTime() + hours * 60 * 60 * 1000);

    document.cookie =
        name + "=" +
        encodeURIComponent(value) +
        "; expires=" +
        date.toUTCString() +
        "; path=/";

}

function getCookie(name) {

    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {

        cookie = cookie.trim();

        if (cookie.startsWith(name + "=")) {

            return decodeURIComponent(
                cookie.substring(name.length + 1)
            );

        }

    }

    return null;

}

const saved = getCookie("colors");

if (saved) {

    colors = JSON.parse(saved);

}

renderColors();

function saveColors() {

    setCookie(
        "colors",
        JSON.stringify(colors),
        3
    );

}

function renderColors() {

    const block = document.getElementById("colors");

    block.innerHTML = "";

    colors.forEach(function(color){

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <div
                class="preview"
                style="background:${color.code}">
            </div>

            <div class="info">

                <p><b>${color.name}</b></p>

                <p>${color.type}</p>

                <p>${color.code}</p>

            </div>

        `;

        block.appendChild(card);

    });

}

function checkName(name){

    if(name === "")
        return "Введіть назву";

    if(!/^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/.test(name))
        return "Тільки літери";

    const exist = colors.find(function(item){

        return item.name.toLowerCase() ==
               name.toLowerCase();

    });

    if(exist)
        return "Назва вже існує";

    return "";

}

function checkCode(type, code){

    if(code.trim() === "")
        return "Введіть код кольору";

    if(type === "RGB"){

        const rgb =
        /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/;

        if(!rgb.test(code))
            return "Некоректний RGB";

        const numbers = code.split(",");

        for(let number of numbers){

            if(Number(number) < 0 || Number(number) > 255){

                return "RGB повинен бути від 0 до 255";

            }

        }

    }

    if(type === "RGBA"){

        const rgba =
        /^(\d{1,3}),(\d{1,3}),(\d{1,3}),(0|0?\.\d+|1)$/;

        if(!rgba.test(code))
            return "Некоректний RGBA";

        const numbers = code.split(",");

        for(let i=0;i<3;i++){

            if(Number(numbers[i]) < 0 ||
               Number(numbers[i]) > 255){

                return "RGB повинен бути від 0 до 255";

            }

        }

        if(Number(numbers[3]) < 0 ||
           Number(numbers[3]) > 1){

            return "Alpha від 0 до 1";

        }

    }

    if(type === "HEX"){

        const hex =
        /^#[0-9A-Fa-f]{6}$/;

        if(!hex.test(code))
            return "Некоректний HEX";

    }

    return "";

}

document.getElementById("save").onclick = function(){

    const name =
    document.getElementById("name").value.trim();

    const type =
    document.getElementById("type").value;

    const code =
    document.getElementById("code").value.trim();

    document.getElementById("nameError").innerHTML = "";

    document.getElementById("codeError").innerHTML = "";
        const nameError = checkName(name);
    const codeError = checkCode(type, code);

    document.getElementById("nameError").innerHTML = nameError;
    document.getElementById("codeError").innerHTML = codeError;

    if(nameError !== "" || codeError !== ""){
        return;
    }

    let cssColor = code;

    if(type === "RGB"){
        cssColor = "rgb(" + code + ")";
    }

    if(type === "RGBA"){
        cssColor = "rgba(" + code + ")";
    }

    colors.push({

        name: name,
        type: type,
        code: cssColor

    });

    saveColors();

    renderColors();

    document.getElementById("name").value = "";
    document.getElementById("code").value = "";

}