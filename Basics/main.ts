import { Observable, flatMap, fromEvent, mergeMap, retry } from "rxjs";

let outputDiv = document.getElementById("output");
let getMoviesBtn = document.getElementById("btn-get-movies");

const click = fromEvent(getMoviesBtn, "click");

const load = (url: string) => {
  /* This function will also return an observer for the json response object.
     Note that we're not doing any heavy lifting, like DOM manipulation in the obsrvable.
     In RxJS, Obsrvables should be lightweight. Keeping the observable only for loading data
     will increase it's reusability. Any sort of heavy lifting should be done by the subscriber.
  */
  return new Observable((observer) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        observer.next(data);
      } else {
        observer.error(xhr.statusText);
      }
    });

    xhr.open("GET", url);
    xhr.send();
  }).pipe(retry(3)); // If error occurs, we can retry an the operation using "retry" operator.
};

/* Note: Returning Observable makes a method "lazy". So, no matter how many times we invoke
   that method, its operations won't run until someone subscribes to the Observable that the
   method is returning.
*/

// This method is called by the subscriber for doing DOM manipulation
const renderMovies = (movies: { title: string }[]) => {
  movies.forEach((movie) => {
    let div = document.createElement("div");
    div.innerText = movie.title;

    outputDiv.appendChild(div);
  });
};

/* Since we have a nested observable, we can subscribe to the nested
   observable using the "mergeMap" operator. Using mergeMap is better than
   chaining subscribe functions like subscribe().subscribe()
*/
click.pipe(mergeMap(() => load("movies.json"))).subscribe({
  next: (movies: { title: string }[]) => renderMovies(movies),
  error: (e) => console.error(`ERROR: ${e}`),
  complete: () => console.log("Complete!"),
});
