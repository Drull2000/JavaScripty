class figura {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    showInfo() {
        console.log(`Фігура: ${this.name}`);
    }

    getArea() {
        return 0;
    }

    getPerimeter() {
        return 0;
    }
}

class kvadrat extends figura {
    constructor(side) {
        super("Квадрат");
        this.side = side;
    }

    showInfo() {
        console.log(`${this.name}: сторона = ${this.side}`);
    }

    getArea() {
        return this.side ** 2;
    }

    getPerimeter() {
        return 4 * this.side;
    }
}
class pryamoygonik extends figura {
    constructor(width, height) {
        super("Прямокутник");
        this.width = width;
        this.height = height;
    }

    showInfo() {
        console.log(
            `${this.name}: ширина = ${this.width}, висота = ${this.height}`
        );
    }

    getArea() {
        return this.width * this.height;
    }

    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}
class treygolnik extends figura {
    constructor(a, b, c) {
        super("Трикутник");
        this.a = a;
        this.b = b;
        this.c = c;
    }

    showInfo() {
        console.log(
            `${this.name}: сторони = ${this.a}, ${this.b}, ${this.c}`
        );
    }

    getPerimeter() {
        return this.a + this.b + this.c;
    }

    getArea() {
        const p = this.getPerimeter() / 2;
        return Math.sqrt(
            p * (p - this.a) * (p - this.b) * (p - this.c)
        );
    }
}
const figurki = [
    new kvadrat(5),
    new pryamoygonik(4, 6),
    new treygolnik(3, 4, 5)
];
figurki.forEach(figure => {
    figure.showInfo();
    console.log("Площа:", figure.getArea());
    console.log("Периметр:", figure.getPerimeter());
    console.log("--------------------");
});