import { Observable, Observer, from } from "rxjs";

/* Let' create a date source. It can be an from an api or a promise. But for simplicity,
   let's stick to arrays.
*/
let numbers = [1, 5, 10];

// Now, we'll create an observer manually using the low level "create" function
const source = new Observable((observer) => {
  for (const num of numbers) {
    if (num === 5) {
      /* If stop the observer like this, it will not read next values of the observable
         and it will not call the complete method either.
      */
      observer.error("An error occurred.");
    }

    observer.next(num);
  }

  observer.complete();
});

source.subscribe({
  next: (value) => console.log(`Value: ${value}`),
  error: (error) => console.log(`Value: ${error}`),
  complete: () => console.log("Complete!"),
});
