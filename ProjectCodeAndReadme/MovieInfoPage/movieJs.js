
//reading the query which we sent on results.js file to this file 
let queryReader = new URLSearchParams(window.location.search);
let imdbID = queryReader.get("id");


async function dataRequest(){

    //fetching the details of the movie using this obmdb api 
    let request = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=5a13fef9`);
    let data = await request.json();

    console.log(data);

    //now we create the poster in the required place
    let posterPlace = document.getElementById("forPoster");

    let posterNotFound = "https://tse1.mm.bing.net/th/id/OIP.Lr_j_PgqTGzKxJTeIwajVwHaLH?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3";
    let posterSource = data.Poster !== "N/A" ? data.Poster : posterNotFound;
    
    //same thing as in result.js file we also put posterNotFound in case of an error 
    posterPlace.innerHTML = `
    
    <img  class = "poster" onerror = "this.onerror = null; this.src = '${posterNotFound}'"src = " ${posterSource}">
    `;

    let posterInfo = document.getElementById("infoMovie");


    //we place the movie details in the side of the poster 
    posterInfo.innerHTML = `
        <p class = "posterDetails"><strong class = "subHeading">Title: </strong>${data.Title}</p>

        <p class = "posterDetails"><strong class = "subHeading">Actors: </strong>${data.Actors}</p>

        <p class = "posterDetails"><strong class = "subHeading">Year: </strong> ${data.Year}</p>

        <p class = "posterDetails"><strong class = "subHeading">Genre: </strong> ${data.Genre}</p>
        
        <p class = "posterDetails"><strong class = "subHeading">Box-Office Collection: </strong> ${data.BoxOffice}</p>
        
        <p class = "posterDetails"><strong class = "subHeading">Director: </strong> ${data.Director}</p>
        
        <p class = "posterDetails"><strong class = "subHeading">IMDB Ratings: </strong> ${data.imdbRating}</p>
        
        <p class = "posterDetails"><strong class = "subHeading">Plot: </strong> ${data.Plot}</p>
        
        <p class = "posterDetails"><strong class = "subHeading">Language: </strong> ${data.Language}</p>
    `;
}
dataRequest();