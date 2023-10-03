import { Observable, Observer, filter, from, map } from "rxjs";

/* Let' create a date source. It can be an from an api or a promise. But for simplicity,
   let's stick to arrays.
*/
let numbers = [1, 5, 10];

const source = new Observable((observer) => {
  let index = 0;

  const produceValue = () => {
    observer.next(numbers[index]);
    index++;

    if (index < numbers.length) {
      setTimeout(produceValue, 1000);
    } else {
      observer.complete();
    }
  };

  produceValue();
})
  .pipe(map((n: number) => n * 2)) // We're piping the observable data through the map operator
  .pipe(filter((n) => n > 4)); // Then, we're piping the observable data through the filter operator

source.subscribe({
  next: (value) => console.log(`Value: ${value}`),
  error: (error) => console.log(`Value: ${error}`),
  complete: () => console.log("Complete!"),
});
