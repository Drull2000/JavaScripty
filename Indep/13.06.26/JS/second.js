class HtmlElement {
    
    constructor(tagName, selfClosing = false, text = "") {
        this.tagName = tagName;
        this.selfClosing = selfClosing;
        this.text = text;
        this.attributes = [];
        this.styles = [];
        this.children = [];
    }

    setAttribute(name, value) {
        this.attributes.push({ name, value });
    }

    setStyle(property, value) {
        this.styles.push({ property, value });
    }

    appendChild(element) {
        this.children.push(element);
    }

    prependChild(element) {
        this.children.unshift(element);
    }

    getHtml() {
        let attrs = "";

        if (this.styles.length > 0) {
            const styles = this.styles
                .map(style => `${style.property}: ${style.value}`)
                .join("; ");

            attrs += ` style="${styles}"`;
        }

        this.attributes.forEach(attr => {
            attrs += ` ${attr.name}="${attr.value}"`;
        });

        if (this.selfClosing) {
            return `<${this.tagName}${attrs}>`;
        }

        let html = `<${this.tagName}${attrs}>`;

        html += this.text;

        this.children.forEach(child => {
            html += child.getHtml();
        });

        html += `</${this.tagName}>`;

        return html;
    }

    
    
}

const wrapper = new HtmlElement("div");
wrapper.setAttribute("id", "wrapper");
wrapper.setStyle("display", "flex");

for (let i = 0; i < 2; i++) {

    const block = new HtmlElement("div");
    block.setStyle("width", "300px");
    block.setStyle("margin", "10px");

    const h3 = new HtmlElement("h3", false, "What is Lorem Ipsum?");

    const img = new HtmlElement("img", true);
    img.setAttribute("src", "https://deita.ru/images/articles/24052022_142843_718766_lg.jpg");
    img.setAttribute("alt", "Lorem Ipsum");
    img.setStyle("width", "100%");

    const p = new HtmlElement(
        "p",
        false,
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `
    );

    p.setStyle("text-align", "justify");

    const a = new HtmlElement("a", false, "More...");
    a.setAttribute("href", "https://www.lipsum.com/");
    a.setAttribute("target", "_blank");

    p.appendChild(a);

    block.appendChild(h3);
    block.appendChild(img);
    block.appendChild(p);

    wrapper.appendChild(block);
}

document.write(wrapper.getHtml());