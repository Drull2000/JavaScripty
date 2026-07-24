const form = document.getElementById("form");
const messages = document.getElementById("messages");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value;
    const text = document.getElementById("text").value;

    const today = new Date();

    const date =
        today.getDate() + "." +
        (today.getMonth()+1) + "." +
        today.getFullYear();

    const block = document.createElement("div");

    block.className = "message";

    block.innerHTML = `
        <div class="author">${name}</div>
        <div class="date">${date}</div>
        <p>${text}</p>
    `;

    messages.appendChild(block);

    form.reset();

});