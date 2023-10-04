import {
  catchError,
  from,
  merge,
  of,
  onErrorResumeNext,
  throwError,
} from "rxjs";

/* In this example, we're handling errors using the catchError operator.
 * The merge function combines the output of multiple observables into
   one observable.
 */
const source = merge(
  of(1),
  from([2, 3, 4]),
  throwError(() => new Error("Stop!")),
  of(6)
).pipe(
  catchError((err, _) => {
    console.log(`Caught: ${err}`);

    return of(7);
  })
);

source.subscribe({
  next: (value) => console.log(`Value: ${value}`),
  error: (e) => console.log(`Error: ${e}`),
  complete: () => console.log("Complete!"),
});
