class Circle {
    constructor(radius) {
        this._radius = radius;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        if (value > 0) {
            this._radius = value;
        }
    }

    get diameter() {
        return this._radius * 2;
    }

    getArea() {
        return Math.PI * this._radius ** 2;
    }

    getCircumference() {
        return 2 * Math.PI * this._radius;
    }
}

const circle = new Circle(10);

console.log("Радіус:", circle.radius);
console.log("Діаметр:", circle.diameter);
console.log("Площа:", circle.getArea().toFixed(2));
console.log("Довжина кола:", circle.getCircumference().toFixed(2));

circle.radius = 15;

console.log("Новий радіус:", circle.radius);
console.log("Новий діаметр:", circle.diameter);