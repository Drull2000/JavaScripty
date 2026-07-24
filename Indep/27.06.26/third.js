const button = document.getElementById("show");

button.onclick = function(){

    const result = document.getElementById("result");

    result.innerHTML = document.getElementById("text").value;

    result.style.fontSize =
        document.getElementById("size").value + "px";

    result.style.color =
        document.getElementById("color").value;

    result.style.fontWeight =
        document.getElementById("bold").checked ? "bold" : "normal";

    result.style.fontStyle =
        document.getElementById("italic").checked ? "italic" : "normal";

    result.style.textDecoration =
        document.getElementById("underline").checked ? "underline" : "none";

}