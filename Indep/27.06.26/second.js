document.getElementById("check").onclick = function(){

    let score = 0;

    const answers = document.querySelectorAll("input[type=radio]:checked");

    answers.forEach(function(answer){

        score += Number(answer.value);

    });

    document.getElementById("result").innerHTML =
        "Правильних відповідей: " + score + " із 3";

}