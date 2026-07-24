const wrappers = document.querySelectorAll(".wrapper");

wrappers.forEach(function(wrapper){

    const button = wrapper.querySelector("button");
    const tooltip = wrapper.querySelector(".tooltip");

    button.addEventListener("mouseenter", function(){

        tooltip.innerText = button.dataset.text;

        tooltip.style.display = "block";

        tooltip.style.left = "50%";
        tooltip.style.transform = "translateX(-50%)";

        const topPosition = -tooltip.offsetHeight - 10;

        if(button.getBoundingClientRect().top > tooltip.offsetHeight + 20){

            tooltip.style.top = topPosition + "px";

        }else{

            tooltip.style.top = button.offsetHeight + 10 + "px";

        }

    });

    button.addEventListener("mouseleave", function(){

        tooltip.style.display = "none";

    });

});