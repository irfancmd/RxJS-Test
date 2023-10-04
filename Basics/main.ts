import { Observable, defer, from, fromEvent, mergeMap, retry } from "rxjs";

let outputDiv = document.getElementById("output");
let getMoviesBtn = document.getElementById("btn-get-movies");

const click = fromEvent(getMoviesBtn, "click");

/* In this section, we'll use Observables with promises. Promises and
   observable may seem to be similar as both of them are used for dealing with
   asynchronous operations. However, there's a core difference between them.
   Promises just return one value or object after a certain period of time.
   However, Observables keep returning a chain or sequence of objects. The
   Subscribers use Observable's "next" method to get the last updated object of the
   chain. Observables also allow us to utilize operators like map, retry, delay, filter etc.
 */
const load = (url: string) => {
  /* We can use the "from" method to create Observables from promises
     Note: Observabes created from promises don't exhibit "lazy" behaviour. So invoking this
     function without subscribing to it will still execute the fetch request. If we want the
     "load" function to exhibit lazy behaviour, we have to return a deffered observable from
     this function instead of directly returning an Observable created from a promise.
  */
  return defer(() => {
    return from(fetch(url).then((res) => res.json()));
  });
};

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
