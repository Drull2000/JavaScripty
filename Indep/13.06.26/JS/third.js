class CssClass {
    constructor(className) {
        this.className = className;
        this.styles = [];
    }

    setStyle(property, value) {
        this.styles.push({ property, value });
    }

    removeStyle(property) {
        this.styles = this.styles.filter(
            style => style.property !== property
        );
    }

    getCss() {
        let css = `.${this.className} {\n`;

        this.styles.forEach(style => {
            css += `    ${style.property}: ${style.value};\n`;
        });

        css += "}\n";

        return css;
    }
}