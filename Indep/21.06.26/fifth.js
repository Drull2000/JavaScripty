const books = document.querySelectorAll("li");

books.forEach(function(book){

    book.onclick = function(){

        books.forEach(function(item){

            item.classList.remove("selected");

        });

        this.classList.add("selected");

    }

});