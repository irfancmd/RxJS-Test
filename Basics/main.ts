import { Observer, from } from "rxjs";

/* Let' create a date source. It can be an from an api or a promise. But for simplicity,
   let's stick to arrays.
*/
let numbers = [1, 5, 10];

// Now, we're creating an Observable that keeps track of our data source for changes.
let source = from(numbers);

/* This is an Observer that will respond to the changes in the Observable. There are multile
   ways of creating an Observer. Here, we're creating one by defining an class.
*/
class MyObserver implements Observer<number> {
  // This method is called whenever the observer sees a new data
  next(value: number) {
    console.log(`Value: ${value}`);
  }

  // This is called whenever an error occurs
  error(e: any) {
    console.log(`Value: ${e}`);
  }

  // This is called when the Observer is done reading all data from the Observable
  complete() {
    console.log("Complete!");
  }
}

/* Now, we're subscribing our Observable to the Observer so that it can respond to
   changes in the Observable.
*/
source.subscribe(new MyObserver());
