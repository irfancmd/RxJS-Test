import { Observer, from } from "rxjs";

/* Let' create a date source. It can be an from an api or a promise. But for simplicity,
   let's stick to arrays.
*/
let numbers = [1, 5, 10];

// Now, we're creating an Observable that keeps track of our data source for changes.
let source = from(numbers);

/* Rather than creating classes, we can also pass observer functons direcly in the
   subscribe method by putting them inside an object.
*/
source.subscribe({
  next: (value) => console.log(`Value: ${value}`),
  error: (error) => console.log(`Value: ${error}`),
  complete: () => console.log("Complete!"),
});
