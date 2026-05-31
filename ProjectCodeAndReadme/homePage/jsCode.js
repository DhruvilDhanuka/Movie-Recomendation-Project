
let searchF = document.getElementById('searchForm');

let submitField = document.getElementById('searchField');


//here we apply event listner so that it sends the query to results.html page 
searchF.addEventListener("submit",function(e){

    e.preventDefault();

    let userInput = submitField.value.trim();

    //check -> if don't type something then we dont proceed forward
    if(userInput == ""){
        alert("Please type something first");
        return;
    }   


    //redirecting the user to results.html page with the input value in search field 
    window.location.href =`../MoviePostersPage/results.html?query=${encodeURIComponent(userInput)}`;
})