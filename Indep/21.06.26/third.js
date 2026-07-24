const field = document.getElementById("field");

const ball = document.getElementById("ball");

field.addEventListener("click", function(e){

    let x = e.clientX - 50;
    let y = e.clientY - 50;

    if(x < 0)
        x = 0;

    if(y < 0)
        y = 0;

    if(x > field.clientWidth - 100)
        x = field.clientWidth - 100;

    if(y > field.clientHeight - 100)
        y = field.clientHeight - 100;

    ball.style.left = x + "px";

    ball.style.top = y + "px";

});