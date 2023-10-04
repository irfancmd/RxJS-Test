import { defer, from, fromEvent, mergeMap, retry } from "rxjs";

let outputDiv = document.getElementById("output");
let getMoviesBtn = document.getElementById("btn-get-movies");

const click = fromEvent(getMoviesBtn, "click");

const load = (url: string) => {
  return defer(() => {
    return from(
      fetch(url).then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          /* Note: Avoid throwing Errors in Observables as it will break the Observable chain.
             Instead, call Observable's error method or Promise.reject method (When using promises).
          */
          return Promise.reject(res);
        }
      })
    );
  }).pipe(retry({ count: 3, delay: 1500 }));
};

const renderMovies = (movies: { title: string }[]) => {
  movies.forEach((movie) => {
    let div = document.createElement("div");
    div.innerText = movie.title;

    outputDiv.appendChild(div);
  });
};

click.pipe(mergeMap(() => load("movies.json"))).subscribe({
  next: (movies: { title: string }[]) => renderMovies(movies),
  error: (e) => console.log(`ERROR: ${e}`),
  complete: () => console.log("Complete!"),
});
