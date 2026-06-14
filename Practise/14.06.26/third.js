class ExtendedArray extends Array {

    getString(separator = ", ") {
        return this.join(separator);
    }

    getHtml(tagName) {

        if (tagName.toLowerCase() === "li") {
            let html = "<ul>\n";

            this.forEach(item => {
                html += `  <li>${item}</li>\n`;
            });

            html += "</ul>";
            return html;
        }

        return this.map(item => `<${tagName}>${item}</${tagName}>`).join("\n");
    }
}

const arr = new ExtendedArray(
    "JavaScript",
    "HTML",
    "CSS",
    "React"
);

console.log(arr.getString(", "));
console.log(arr.getString(" - "));
console.log(arr.getString(" "));

console.log("\nHTML з тегом p:");
console.log(arr.getHtml("p"));

console.log("\nHTML з тегом li:");
console.log(arr.getHtml("li"));