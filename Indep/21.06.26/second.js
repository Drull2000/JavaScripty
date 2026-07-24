const modal = document.getElementById("modal");

const open = document.getElementById("open");

const close = document.getElementById("close");

open.onclick = function () {

    modal.style.display = "flex";

}

close.onclick = function () {

    modal.style.display = "none";

}