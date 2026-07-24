const lights = [
    document.getElementById("red"),
    document.getElementById("yellow"),
    document.getElementById("green")
];

const classes = [
    "activeRed",
    "activeYellow",
    "activeGreen"
];

let current = 0;

document.getElementById("next").onclick = function () {

    lights[current].classList.remove(classes[current]);

    current++;

    if(current > 2){
        current = 0;
    }

    lights[current].classList.add(classes[current]);

}