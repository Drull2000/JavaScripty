const input = document.getElementById("name");

input.addEventListener("input", function () {

    this.value = this.value.replace(/[0-9]/g, "");

});