const lessons=[];

document.getElementById("save").onclick=function(){

    const present=[];

    document.querySelectorAll(".students input").forEach(function(student){

        if(student.checked){

            present.push(student.value);

        }

    });

    lessons.push({

        group:document.getElementById("group").value,

        lesson:document.getElementById("lesson").value,

        topic:document.getElementById("topic").value,

        students:present

    });

    alert("Збережено!");

}

document.getElementById("show").onclick=function(){

    let text="";

    lessons.forEach(function(item){

        text+="<hr>";

        text+="Група: "+item.group+"<br>";

        text+="Пара: "+item.lesson+"<br>";

        text+="Тема: "+item.topic+"<br>";

        text+="Присутні: "+item.students.join(", ")+"<br>";

    });

    document.getElementById("history").innerHTML=text;

}