import { delay, filter, fromEvent, map } from "rxjs";

/* We can also create Observables from events. Here, we're creating
   an observable that listens to the "mousemove" event of the document
   object. We have also applied some operator functions to this Observable.
 */
const source = fromEvent(document, "mousemove")
  .pipe(
    map((e: MouseEvent) => {
      return {
        x: e.clientX,
        y: e.clientY,
      };
    })
  )
  .pipe(filter((value) => value.x > 500))
  .pipe(delay(300));

let circle = document.getElementById("circle");

const onNext = (value: { x: number; y: number }): void => {
  circle.style.left = `${value.x}px`;
  circle.style.top = `${value.y}px`;
};

source.subscribe({
  next: (value) => onNext(value),
  error: (error) => console.log(error),
  complete: () => console.log("Complete!"),
});
