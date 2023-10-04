import { from, merge, of, onErrorResumeNext, throwError } from "rxjs";

/* The "of" method creates an Observable with a single value. We can merge
   the output of multiple Observables using the "onErrorResumeNext" function which will
   ignore thrown errors and move on. The error function in the subscriber won't be called.
*/
const source = onErrorResumeNext(
  of(1),
  from([2, 3, 4]),
  throwError(() => new Error("Stop!")),
  of(6)
);

source.subscribe({
  next: (value) => console.log(`Value: ${value}`),
  error: (e) => console.log(`Error: ${e}`),
  complete: () => console.log("Complete!"),
});
