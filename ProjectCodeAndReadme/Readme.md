This file contains info about how every thing works and how can you run the file in your editor 



##### **->To run the file** 

* **Extract the zip folder and open the folder in your code editor**
* **open code.html file in homepage folder** 
* **then open it with a live server and you are good to go** 



**\*\*The results page may take a couple of seconds to load** 

##### 

##### 

##### **->Now How everything works and also about optimisations made to run the code a bit smoother** 





## **##Home page**



--->code.html file just has the basic structure of the headings ,about me and about this website .

&nbsp;  a background image is attached (fixed) to the headings to make a movie-ish theme 



--->jsCode.js file just reads the input entered by the user and redirects user to results.html along with a query



--->homePageStyling.css have the stylings. I used  flexbox to display all the text to center and used flex direction as column to assign main axis as vertical 

&nbsp;  to make the text glowy I used the opacity in its shadow property 







## **##MoviePosters**





--->results.html file it only contains the div elements to show the movie posters and also the showing results for: thing we inject those elements using the js file as we sent the query in jsCode.js file 





--->results.js file is the main part of logic in this webApp we have the following functions which handles the logic and connecting pages to each other 

&nbsp;   Almost all are async await functions because slow network requests is happening we have to wait for the API to respond then proceed further



&nbsp;	->**getGeminiResponse** it basically helps us to differentiate b/w a plain movie title and a mood based search we give the prompt to just return a "False" in case of plain movie title 			    query or JSON array of movie titles



&nbsp;	->**createMovieCard** it basically fetches the poster and create img tag and puts the poster in that  and then injects files into our results.html page 



&nbsp;	->**dataRequest** firstly I was again and again creating requests to omdb API using a loop with that JSON array that gemini send and then again in the DataRequest function even in case                      	              of that moodbased search so I optimised it to make only request for only one title 

&nbsp;		      this helped in making the UI smoother and remove the flickering that was happening 



&nbsp;	->Event Listener: We added a event to listener to all the movies such that on click is sends the query with imdb id so movie.html page 



--->resultStylings.css ->file this files handles about the result not found stylings and also created a grid to add the posters i created background colour of both poster and container as 			 same  because posters are of different sizes so we don't want any extra colored borders around some posters .







## \##**Movie Details**



--->movie.html -> just like results.html it just contains the place where I inject the details and poster using js



--->movieJs.js -> it basically receives the imdb id of the movie sent by our result js file and we just fetch the movie details from API using this imdb-id and put the poster and all its details also 



--->movieStyling.css -> this basically makes the grid of two columns one for poster and one for the details I also added media queries in both the results page and movie info page 

&nbsp;			to make the UI responsive.


NOTE: As the Gemini API only allow some limited requests so you can uncomment the line number 151 
      and comment the two lines above it This will allow you to make only the requests based on the movie titles.[NO AI ASSITANCE :( ] 
      Put Gemini API key in line number 19 of result.js to make gemini respond.
