class knopka {
    constructor(width, height, text) {
        this.width = width;
        this.height = height;
        this.text = text;
    }

    knopka() {
        document.write(`
            <button style="width:${this.width}px; height:${this.height}px;">
                ${this.text}
            </button>
        `);
    }
}

class BootstrapButton extends knopka {
    constructor(width, height, text, color) {
        super(width, height, text);
        this.color = color;
    }

    knopka() {
        document.write(`
            <button 
                style="
                    width:${this.width}px;
                    height:${this.height}px;
                    background-color:${this.color};
                    color:white;
                    border:none;
                    border-radius:5px;
                    cursor:pointer;
                ">
                ${this.text}
            </button>
        `);
    }
}

const btn1 = new knopka(120, 40, "Звичайна кнопка");
btn1.knopka();

document.write("<br><br>");

const btn2 = new BootstrapButton(150, 50, "Bootstrap Button", "blue");
btn2.knopka();