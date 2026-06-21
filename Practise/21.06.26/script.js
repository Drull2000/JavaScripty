const cells = document.querySelectorAll("td");

cells.forEach(cell => {

    cell.addEventListener("mouseenter", () => {
        cell.style.backgroundColor = "#f3a27d";
    });

    cell.addEventListener("mouseleave", () => {
        cell.style.backgroundColor = "";
    });

});

const task2 = document.getElementById("task2");

task2.addEventListener("selectstart", function(e){
    e.preventDefault();
});

task2.addEventListener("contextmenu", function(e){
    e.preventDefault();
});

let likes = 99;

document
.getElementById("likeBtn")
.addEventListener("click", function(){

    likes++;

    document.getElementById("likes").textContent = likes;

});

function appendValue(value){
    document.getElementById("display").value += value;
}

function clearDisplay(){
    document.getElementById("display").value = "";
}

function calculate(){

    try{

        document.getElementById("display").value =
        eval(document.getElementById("display").value);

    }
    catch{

        alert("Помилка");

    }

}

function toggleMenu(index){

    const menus =
    document.querySelectorAll(".submenu");

    if(menus[index].style.display === "block"){
        menus[index].style.display = "none";
    }
    else{
        menus[index].style.display = "block";
    }

}

const topBtn =
document.getElementById("topBtn");

window.addEventListener("scroll", function(){

    if(window.scrollY > 100){

        topBtn.style.display = "block";

    }
    else{

        topBtn.style.display = "none";

    }

});

const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" 
    });
});