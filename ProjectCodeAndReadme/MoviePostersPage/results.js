let queryReader = new URLSearchParams(window.location.search);

//reading the query here that we sent in js file of the home page
let query = queryReader.get("query");

let header = document.getElementById('heading');


header.innerText = `Showing results for: ${query}`;


let normalizedQuery = query.toLowerCase().trim();

async function getGeminiResponse(normalizedQuery){


    let  API_KEY = "API_KEY";

    let  prompt = `Now I am making movie search recomendation tool, Now I am going to 
        give you what user typed into the searchField you identify if it is a actor/actoress name 
        or a search with a mood or just a plain movie/series title 
        if it is a movie/series title only and only return only a string "False" 
        if the user types gibberish or some garbage just return only and only the same string "False"
        otherwise give me a list of the movie titles by those actors/actresses or on the basis of the mood that user types
        return ONLY a valid JSON array of movie titles. 
        ALSO DO NOT PUT ANY MARKDOWNS AUR BREAKLINE THINGS JUST GIVE ONLY AND ONLY A CLEARN JSON ARRAY  Do Not explain anything. now the user Query is 
        ${normalizedQuery}`;

    //api call to gemini to check if the user entered name of actor/actress ,mood or a plain movie title..
    let response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": API_KEY
               },
            body: JSON.stringify({
                contents: [
                        {
                    parts: [
                        { text: prompt }
                    ]
                }
            ]
        })
    }
);

    //fetching response for data 
    let data = await response.json();

    
    // console.log("full gemini response: ", data);

    var geminiText = data.candidates[0].content.parts[0].text;

    // console.log("geminiText: ",geminiText);


    //here returning the text or array obtained from gemini to the search Handler function
    if(geminiText != "False"){
        return JSON.parse(geminiText);
    }
    else{
        return geminiText;
    }


}



let resultMovies = document.getElementById("results-grid");

//this basically injects the movie cards in our grid that we created in results.html  and resultsStyling.css
function createMovieCard(movie){


    let moviePosterDiv = document.createElement("div");
    moviePosterDiv.classList.add("box");

    moviePosterDiv.classList.add("poster");

    //this is the posterSource the movie.Poster if there is no Poster for that movie we show image with poster not found
    let posterNotFound = "https://tse1.mm.bing.net/th/id/OIP.Lr_j_PgqTGzKxJTeIwajVwHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3";
    let posterSource = movie.Poster !== "N/A" ? movie.Poster :posterNotFound;

    //sometimes the posters is available but somehow it fails to load on the page so I also display posterNotFound Image in that case.
    moviePosterDiv.innerHTML = `
    <img class = "image" src = "${posterSource} " onerror = "this.onerror = null; this.src = '${posterNotFound}'"  alt = "" data-imdbid="${movie.imdbID}">
    
    `
    resultMovies.appendChild(moviePosterDiv);
}

//this function gives request to omdb acc to our query we modify the query if the user enters a mood or actor's name 
async function dataRequest(geminiResult){

    if(geminiResult === "False"){
        let request = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(normalizedQuery)}&apikey=5a13fef9`);
        let data = await request.json();


        //if no relevant results are found on the page
        if(data.Response === "False"){

            let noResponse = document.createElement("div");
            
            //now as the grid is being created so we are not able to center the the text properly so we will just remove the 
            //grid creation in this case 

            let resultGrid = document.getElementsByClassName("resultsMovieCards")[0];
            resultGrid.classList.remove("resultsMovieCards");
            

            let movieNoResult = document.getElementById("movieNotFound");
            noResponse.classList.add("noResults");
            noResponse.innerHTML = `<p class = "noResText">No Relevant Results Found :( </p>`;
            
            movieNoResult.appendChild(noResponse);
            return;
        }

        //creating cards for all the movies that ombd returned 
        for(let movie of data.Search){
            createMovieCard(movie);
        }
    }
    else{

        for(let title of geminiResult){
            let request = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=5a13fef9`);
            let data = await request.json();
            // console.log(data);
            createMovieCard(data);

        }
    }
}



    // let geminiResult = await getGeminiResponse(normalizedQuery);
    
    // await dataRequest(geminiResult);
           

    dataRequest("False");


//this  is event listener to redirect to the movie.html page 
resultMovies.addEventListener("click", function (e) {

    //we created a image class in img to differentiate between image and rest of the grid 
    if (!e.target.classList.contains("image")) return;


    const imdbID = e.target.getAttribute("data-imdbid");


    //redirecting the user to movie.html 
    window.location.href =
        `../MovieInfoPage/movie.html?id=${imdbID}`;
});