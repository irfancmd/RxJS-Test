import { Observable, Observer, from } from "rxjs";

/* Let' create a date source. It can be an from an api or a promise. But for simplicity,
   let's stick to arrays.
*/
let numbers = [1, 5, 10];

// We will now look an example of an asynchronous Observable
const source = new Observable((observer) => {
  let index = 0;

  const produceValue = () => {
    observer.next(numbers[index]);
    index++;

    if (index < numbers.length) {
      setTimeout(produceValue, 2000);
    } else {
      observer.complete();
    }
  };

  produceValue();
});

source.subscribe({
  next: (value) => console.log(`Value: ${value}`),
  error: (error) => console.log(`Value: ${error}`),
  complete: () => console.log("Complete!"),
});
