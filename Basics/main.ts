import {
  Observable,
  flatMap,
  fromEvent,
  mergeMap,
  retry,
  retryWhen,
} from "rxjs";

let outputDiv = document.getElementById("output");
let getMoviesBtn = document.getElementById("btn-get-movies");

const click = fromEvent(getMoviesBtn, "click");

const load = (url: string) => {
  /* In the last section, we used retry operator for retrying failed
     requests. However retry doesn't give us enough control. For instance,
     we cannot set the delay between each retry. To achieve this, we can use
     the configure the retry operator.
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
  }).pipe(retry({ count: 3, delay: 1500 }));
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
