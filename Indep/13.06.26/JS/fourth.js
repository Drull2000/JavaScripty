class HtmlBlock {
    constructor(rootElement) {
        this.styles = [];
        this.rootElement = rootElement;
    }

    addCssClass(cssClass) {
        this.styles.push(cssClass);
    }

    getCode() {
        let result = "<style>\n";

        this.styles.forEach(style => {
            result += style.getCss();
        });

        result += "</style>\n";

        result += this.rootElement.getHtml();

        return result;
    }
}
const wrap = new CssClass("wrap");
wrap.setStyle("display", "flex");

const block = new CssClass("block");
block.setStyle("width", "300px");
block.setStyle("margin", "10px");

const imgClass = new CssClass("img");
imgClass.setStyle("width", "100%");

const text = new CssClass("text");
text.setStyle("text-align", "justify");

const wrapper2 = new HtmlElement("div");
wrapper2.setAttribute("id", "wrapper");
wrapper2.setAttribute("class", "wrap");

for (let i = 0; i < 2; i++) {

    const div = new HtmlElement("div");
    div.setAttribute("class", "block");

    const h3 = new HtmlElement("h3", false, "What is Lorem Ipsum?");

    const img = new HtmlElement("img", true);
    img.setAttribute("class", "img");
    img.setAttribute("src", "https://deita.ru/images/articles/24052022_142843_718766_lg.jpg");
    img.setAttribute("alt", "Lorem Ipsum");

    const p = new HtmlElement(
        "p",
        false,
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `
    );

    p.setAttribute("class", "text");

    const a = new HtmlElement("a", false, "More...");
    a.setAttribute("href", "https://lipsum.com");
    a.setAttribute("target", "_blank");

    p.appendChild(a);

    div.appendChild(h3);
    div.appendChild(img);
    div.appendChild(p);

    wrapper2.appendChild(div);
}

const htmlBlock = new HtmlBlock(wrapper2);

htmlBlock.addCssClass(wrap);
htmlBlock.addCssClass(block);
htmlBlock.addCssClass(imgClass);
htmlBlock.addCssClass(text);

document.write(htmlBlock.getCode());