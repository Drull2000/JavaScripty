document.getElementById("order").onclick=function(){

    const name=document.getElementById("name").value;

    const book=document.getElementById("book").value;

    const count=document.getElementById("count").value;

    const date=document.getElementById("date").value;

    const address=document.getElementById("address").value;

    document.getElementById("answer").innerHTML=
    name+
    ", дякуємо за замовлення.<br><br>"+
    count+
    " шт. книги <b>"+book+
    "</b> буде доставлено "+
    date+
    " за адресою:<br>"+address;

}