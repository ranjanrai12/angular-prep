### What is a data stream ?

A `data stream` is the data that arrives over some time. The stream of data can be anything. Like variables, user inputs, properties, caches, data structures, and even failures, etc

At any point in time, the stream may emit the following three things.

- `Value`: i.e., the next value in the stream
- `Complete`: The stream has ended
- `Error`: The error has stopped the stream.

### Reactive Programming

`Reactive programming` is about creating the stream, emitting value, error, or complete signals, manipulating, transferring, or doing something useful with the data streams.

### What is RxJS

The RxJS (Reactive Extensions Library for JavaScript) is a Javascript library that allows us to work with asynchronous data streams.

The RxJs has two main players

- Observable
- Observers ( Subscribers)

### What is an Observable in Angular

Observable is a function that converts the `ordinary data stream(ordinary data stream typically refers to a sequence of data elements that are transmitted or processed sequentially)` into an observable one.You can think of Observable as a wrapper around the ordinary data stream.

An observable stream or simple Observable emits the value from the stream asynchronously. It emits the complete signals when the stream completes or an error signal if the stream errors out.

The observable starts to emit values only when `someone subscribes to it.`

### What is `observers` (subscribers)

The `observers` communicate with the `Observable` using `callbacks`.

The observer must subscribe to the observable to receive the value from the observable. While subscribing, it optionally passes the three callbacks. `next()`, `error()` & `complete()`.

The observable invokes the `next()` callback whenever the `value arrives` in the stream. It passes the value as the argument to the next callback. If the error occurs, then the `error()` callback is invoked. It invokes the `complete()` callback when the stream completes.

```ts
 src = new Observable((observer) => {
    observer.next(1),
      observer.next(2),
      observer.next(3),
      observer.next(4),
      observer.next(5),
      // observer.error('Error Emitted'),
      observer.complete(),
      observer.next(6); // This will not emit
  });
  obs$!: Subscription;

  ngOnInit(): void {
    this.obs$ = this.src.subscribe({
      next: (res) => {
        console.log('Data Stream value', res);
      },
      error: (err) => {
        console.log('Error Occured');
      },
      complete: () => {
        console.log('Observable Completed');
      }
    });
  }
```

### Create observable from a string, array & object in angular

- `Of Operator`: Of creates the observable from the arguments that we pass into it.we can pass any number of arguments. Each argument emitted separately and one after the other. It sends the `Complete` signal in the end.

![alt text](image.png)

```ts
ngOnInit() {
  const array=[1,2,3,4,5,6,7]
  const obsof1=of(array);
  obsof1.subscribe({
      next: (res) => {
        console.log('Data Stream value', res);
      },
      error: (err) => {
        console.log('Error Occured');
      },
      complete: () => {
        console.log('Observable Completed');
      }
    })
}

**** Output ***
Data Stream value [1, 2, 3, 4, 5, 6, 7]
Observable Completed
```

- `From Operator`: `From` Operator takes only one argument that can be iterated and converts it into an observable.

```ts
ngOnInit() {
  const array=[1,2,3,4,5,6,7]
  const obsfrom2=from(array);
  obsfrom2.subscribe({
      next: (res) => {
        console.log('Data Stream value', res);
      },
      error: (err) => {
        console.log('Error Occured');
      },
      complete: () => {
        console.log('Observable Completed');
      }
    })
}

**** Output ***
Data Stream value 1
Data Stream value 2
Data Stream value 3
Data Stream value 4
Data Stream value 5
Data Stream value 6
Data Stream value 7
Observable Completed
```

### Of Vs From

| Of                                                     | from                                            |
| ------------------------------------------------------ | ----------------------------------------------- |
| Accepts variable no of arguments                       | Accepts only one argument                       |
| emits each argument as it is without changing anything | iterates over the argument and emits each value |

### Create Observable from Event

FromEvent method to create an `observable` from `DOM events directly`.

Syntax:

```ts
fromEvent<T>(target: FromEventTarget<T>,
             eventName: string,
             options: EventListenerOptions,
             resultSelector: (...args: any[]) => T): Observable<T>
```

FromEventTarget is the first argument to `fromevent`. It can be a DOM EventTarget, Node.js EventEmitter, JQuery-like event target, NodeList or HTMLCollection. The target must have a method to register/unregister the event handler. (`addEventListener`/ `removeEventListener` in case of DOM Event target)

eventName is the second argument, which is a type of event we want to listen to.

Options are the additional argument that we want to pass to , when registering the event handler i.e `addEventListener`

```ts
<button #btn>Button</button>

@ViewChild('btn', { static: true }) button: ElementRef;

ngAfterViewInit() {
    this.buttonClick();
}

buttonClick() {
    this.buttonSubscription =  fromEvent(this.button.nativeElement, 'click')
        .subscribe(res => console.log(res));
}
```

### Pipe Operator

Pipe is used to `chain` multiple operators together.The pipe method accepts operators as `arguments`. Each argument must be separated by a `comma`. The order of the operators is important because when a user subscribes to an observable, the pipe executes the operators in a sequence in which they are added.

There are two ways we can use the pipe.

- As an instance of observable
- As standalone method

`As an instance of observable`:

```ts
src = new Observable((observer) => {
    observer.next(1),
      observer.next(2),
      observer.next(3),
      observer.next(4),
      observer.next(5),
      observer.complete(),
  }).pipe(
    filter((data: any) => data > 2),
    map((value) => value * 2)
  );

// Note: first operator value will passed to next operator

ngOnInit(): void {
    this.src.subscribe({
      next: (res) => {
        console.log('Data Stream value', res);
      },
      error: (err) => {
        console.log('Error Occured');
      },
      complete: () => {
        console.log('Observable Completed');
      }
    });
  }

  -----Output-----
  Data Stream value 6
  Data Stream value 8
  Data Stream value 10
```

`As standalone method`:

```ts
customOperator = pipe(
  // tap((item: any) => console.log(item)),
  filter((data: any) => data > 2),
  map((value) => value * 2)
);

src = new Observable((observer) => {
  observer.next(1),
    observer.next(2),
    observer.next(3),
    observer.next(4),
    observer.next(5),
    observer.complete(),
    observer.next(6);
}).pipe(this.customOperator);
```

### Map Operator

Map operator takes an observable source as input. It applies a `project function` to each of the values emitted by the source observable and transforms them into a new value.

Syantax:

map<T, R>(project: (value: T, index: number) => R, thisArg?: any): OperatorFunction<T, R>

```ts
srcArray = from([1, 2, 3, 4]);

 multiplyBy2() {
    this.srcArray
    .pipe(map(val => { return val * 2}))
    .subscribe(val => { console.log(val)})
  }

  --- output ---
  2
  4
  6
  8
```

### filter operator

`filter` operator filters the items emitted by the source Observable using a `condition`. It emits only those values that `satisfy the condition` and ignores the rest.

Syntax:

filter<T>(predicate: (value: T, index: number) => boolean, thisArg?: any): MonoTypeOperatorFunction<T>

```ts
ngOnInit() {
of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .pipe(
    filter((val) => {
        return val % 2 == 0;
    })
    )
    .subscribe({
    next: (val) => console.log(val),
    });
  }
---output---
2
4
6
8
10
```

### tap operator

tap operator returns an observable identical to the source. It does not modify the stream.The tap operator is useful for logging the value.

Syntax:

tap(nextOrObserver: function, error: function, complete: function): Observable

```ts
fromObservable = from([1, 2, 3]).pipe(
    tap({
      next: (value) => console.log('before', value),
      error: (err) => console.log(err),
      complete: () => {}
    }),
    map((item: number) => {
      return item * 2;
    }),
    tap({
      next: (value) => console.log('after', value),
      error: (err) => console.log(err),
      complete: () => {}
    })
  );

 --- output ---
 before 1
 after 2
 before 2
 after 4
 before 3
 after 6
```

### SwitchMap

**Behavior:** Cancels previous inner Observable when new outer value arrives.

**Use Case:** Search inputs, autocomplete (where only latest matters)

**Syntax**:

```ts
switchMap(project: (value: T, index: number) => O): OperatorFunction<T, ObservedValueOf<O>>

```

```ts
import { fromEvent, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Example: Search functionality
searchInput.valueChanges.pipe(switchMap((searchTerm) => this.api.search(searchTerm))).subscribe((results) => {
  // Only shows results from latest search
});

// Visual example:
// Outer: 1-----2-----3-----4
// Inner: -a-b- -c-d-e- -f- -g-h-i
// Result: -a-b---c-d-e---f---g-h-i
// (Cancels previous inner when new outer arrives)
```

`project`: is a function that we use to manipulate the values emitted by the source observable.The project can accept two arguments. one is value i.e. the value emitted by the source observable. The second argument is index number.

Note: `The project function must return an observable`.

`Example1:`

```ts
srcObservable = of(1, 2, 3, 4);
innerObservable = of('A', 'B', 'C', 'D');

this.srcObservable
  .pipe(
    switchMap((value) => {
      console.log('Src Value', value);
      console.log('new observable start');
      return this.innerObservable;
    })
  )
  .subscribe({
    next: (innerValue) => {
      console.log(innerValue);
    }
  });
/*Output
  Source value 1
  starting new observable
  Recd A
  Recd B
  Recd C
  Recd D
  Source value 2
  starting new observable
  Recd A
  Recd B
  Recd C
  Recd D
  Source value 3
  starting new observable
  Recd A
  Recd B
  Recd C
  Recd D
  Source value 4
  starting new observable
  Recd A
  Recd B
  Recd C
  Recd D
*/
```

`Example2:`

```ts
 fromEventHandler() {
    this.buttonSubscription$ = fromEvent(this.button.nativeElement, 'click')
      .pipe(
        debounceTime(500),
        switchMap(() => of(1, 2, 3))
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        }
      });
  }
```

`useCase`: Autocomplete Search Feature

### MergeMap

**Behavior:** Runs all inner Observables concurrently.

**Use Case:** When order doesn't matter and you want parallel execution.

Unlike SwitchMap, MergeMap does not cancel any of its inner observables.

**Syantax**: mergeMap(project: (value: T, index: number) => O): OperatorFunction<T, ObservedValueOf<O>>

`useCase`: Consider a scenario where to receive data from an observable (outer observable). For each of those values, we want to call another observable (inner observable) to get more data. The scenario like this is an ideal use case for MergeMap

Example 1:

```ts
of('hound', 'mastiff', 'retriever') //outer observable
  .pipe(
    mergeMap((breed) => {
      const url = 'https://dog.ceo/api/breed/' + breed + '/list';
      return this.http.get<any>(url); //inner observable
    })
  )
  .subscribe((data) => {
    console.log(data);
  });
```

Example 2:

```ts
 delayedObs(count: number) {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(count + ' A');
      }, 1000);
      setTimeout(() => {
        observer.next(count + ' B');
      }, 2000);
      setTimeout(() => {
        observer.next(count + ' C');
        observer.complete();
      }, 3000);
    });
  }

  mergeMapExample() {
    this.srcObservable
      .pipe(
        mergeMap(() => {
          this.count = this.count + 1;
          return this.delayedObs(this.count);
        })
      )
      .subscribe((val) => console.log(val));
  }

  ---output ---
    1 A
    2 A
    3 A
    1 B
    2 B
    3 B
    1 C
    2 C
    3 C
```

### Using ForkJoin with MergeMap

The MergeMap create a one inner observable for each value of outer observable. To Create more than one inner observable, we can make use of the ForkJoin Operator.

Example:

```ts
function fetchShipmentData(shipmentId: number): Observable<any> {
  return ShipmentService.getShipmentDetails(shipmentId).pipe(
    mergeMap((shipmentDetails: any) => {
      // Use forkJoin to fetch customer details and shipment status concurrently
      return forkJoin({
        shipment: of(shipmentDetails),
        customer: CustomerService.getCustomerDetails(shipmentDetails.customerId),
        status: StatusService.getShipmentStatus(shipmentDetails.statusId)
      });
    })
  );
}
```

### ConcatMap

**Behavior:** Runs inner Observables sequentially (queues them)

**Use Case:** When order matters (e.g., sequential saves)

It merges the values from all of its inner observables `in the order in which they are subscribed` and emits the values back into the stream.

It is Similar to `MergeMap` except for one difference that it `maintains the order` of its inner observables.

`Syntax:`
concatMap(project: (value: T, index: number) => O): OperatorFunction<T, ObservedValueOf<O>>

Example

```ts
 delayedObs(count: number) {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(count + ' A');
      }, 1000);
      setTimeout(() => {
        observer.next(count + ' B');
      }, 2000);
      setTimeout(() => {
        observer.next(count + ' C');
        observer.complete();
      }, 3000);
    });
  }

  mergeMapExample() {
    this.srcObservable
      .pipe(
        concatMap(() => {
          this.count = this.count + 1;
          return this.delayedObs(this.count);
        })
      )
      .subscribe((val) => console.log(val));
  }

  ---output ---
    1 A
    1 B
    1 C
    2 A
    2 B
    2 C
    3 A
    3 B
    3 C
```

Example 2:

```ts
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

const ids = [1, 2, 3]; // Array of IDs to fetch data for

from(ids)
  .pipe(
    concatMap((id) => {
      // For each ID, you make an HTTP call, but the next call will wait for the previous one to finish
      return this.http.get(`https://api.example.com/data/${id}`);
    })
  )
  .subscribe(
    (response) => {
      console.log(response); // Each response is logged after the previous one completes
    },
    (error) => {
      console.error(error); // Handle errors
    }
  );
```

#### ExhaustMap

**use case**: It waits for the inner observable to finish. If it receives any new values from outer observable before the completion of the inner observable then it ignores it.

**Use Case:** Prevent duplicate submissions (e.g., payment buttons)

Example 1:

```ts
 delayedObs(count: number) {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(count + ' A');
      }, 1000);
      setTimeout(() => {
        observer.next(count + ' B');
      }, 2000);
      setTimeout(() => {
        observer.next(count + ' C');
        observer.complete();
      }, 3000);
    });
  }

  mergeMapExample() {
    this.srcObservable
      .pipe(
        exhaustMap(() => {
          this.count = this.count + 1;
          return this.delayedObs(this.count);
        })
      )
      .subscribe((val) => console.log(val));
  }

  ---output---
  1 A
  1 B
  1 C
```

Example 2:

```ts
import { fromEvent } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

// Example: Payment button
fromEvent(paymentButton, 'click')
  .pipe(exhaustMap(() => this.api.processPayment()))
  .subscribe((result) => {
    // Subsequent clicks during processing are ignored
  });

// Visual example:
// Outer: 1-----2-----3-----4
// Inner: -a-b- -c-d-
// Result: -a-b-----c-d-
// (2 is ignored because processing 1 was ongoing)
```

#### What is shareReplay ?

Ans: shareReplay is used to share same result to many subscriber.it also `caches` its values and replays them to each new subscriber.

```ts
const source = of(1, 2, 3).pipe(
  tap(val => console.log(`Source emitted ${val}`)),
  shareReplay(1)
);

source.subscribe(val => console.log(`Subscriber 1 received ${val}`));

// We delay second observable
setTimeout(() => {
  source.subscribe(val => console.log(`Subscriber 2 received ${val}`));
}, 1000);

// Results
Source emitted '1'
'Subscriber 1' received '1'
Source emitted '2'
'Subscriber 1' received '2'
Source emitted '3'
'Subscriber 1' received '3'

'Subscriber 2' received '3'
```

#### Take, TakeUntil, TakeWhile & TakeLast

- `Take`: The take operator in RxJS is used to limit the number of emissions from an observable stream. It emits only the first n values emitted by the source observable and then completes, ignoring any subsequent values.

`Syntax:` take(n)

- Where n is the maximum number of values to emit.
- If the source emits more than n values, then take emits only n values and completes.
- If the source emits less than n number of values, then take emits all of them before completing.

```ts
  obs = of(1, 2, 3, 4, 5).pipe(take(2));

  ngOnInit() {
    this.obs.subscribe(val => console.log(val));
  }

  --output--
  1
  2
```

- `TakeUntil`: The `takeUntil` operator returns an Observable that emits value from the source Observable until the `notifier` Observable emits a value.

`Syntax`: TakeUntil(notifier: Observable): Observable

- We must pass a notifier observable as the argument to the TakeUntil Operator.
- TakeUntil emits the values from the Source Observable as long as it does not receive any value from the notifier observable.
- When the notifier emits a value, the TakeUntil completes the Source observable.
- If the notifier completes without emitting any value, then the TakeUntil keeps emitting values from the source and completes when the source completes.

```ts
<button (click)="stopObs()">Stop</button>

notifier = new Subject();

ngOninit() {
interval(1000)
  .pipe(take(5), takeUntil(this.notifier))
  .subscribe({
    next: (value) => {
      console.log('Value', value);
    }
  });
}

stopObs() {
  this.notifier.next(true)
  this.notifier.complete()
}

```

### TakeWhile

TakeWhile operator will keep emitting the value from the source observable as long as they pass the given condition (predicate). When it receives a value that does not satisfy the condition it completes the observable. No further values are emitted even if they satisfy the condition.

Syntax:

```ts
takeWhile(predicate: function(value, index): boolean,
inclusive?: boolean): Observable
```

- `predicate` is the condition.
- If `inclusive` is true, then the emits the value, which does not pass the condition before terminating the observable.

```ts
of(1, 2, 3, 4, 3, 2, 5)
  .pipe(takeWhile((val) => val < 3, true))
  .subscribe({
    next: (val) => {
      console.log('takeWhile Value', val);
    }
  });

--output--
1
2
3
```

If the second argument will be false then output will be only 1,2

### TakeLast

TakeLast operator emits the last n number of values from the source observable.

`Syntax`: takeLast<T>(n: number)

- Where `n` is the maximum number of values to emit.

- To know the last n number of values, the TakeLast needs to wait for the source to complete. Hence if the source never completes, then TakeLast will never emit a value.

- if the source emits less than the n number of values then it emits all of them

```ts
  .pipe(takeLast(2))
  .subscribe({
    next: (val) => {
      console.log('takeLast Value', val);
    }
  });

  --output--
  2
  3
```

#### What are difference between observable and promise ?

Ans:
1:

- Promise is use to handle the asynchronous call
- observable is used to handle both synchronous and asynchronous call

2:

- promise cann't be cancelled once it's started
- observable can be cancel at any time by using unsubscribe

3:

- promise can settled(either pass/fail) the data only one time
- where observable can emit data multiple times

4:

- promise error can handle in cath block
- where observale comes under erro block

#### What is `catchError` ?

Ans: `catchError` is used to intercept an error that occurs in the observable stream and handle it. This prevents the error from propagating further down the stream.

```ts
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Customize your error handling logic here
    console.error('An error occurred:', error.message);
    // Return an observable with a user-facing error message
    return throwError('Something went wrong; please try again later.');
  }
```

#### What is `finalize` ?

Ans: `finalize` is an operator used to execute a specified function when the observable completes or errors out. it's kind of `finally` statement in try/catch.

```ts
getData(): Observable<any> {
    this.loading = true; // Start loading

    return this.http.get<any>(this.apiUrl).pipe(
      finalize(() => {
        this.loading = false; // Stop loading when request completes or errors
        console.log('Request completed or errored');
      })
    );
  }
```

#### What is combinelatest ?

Ans: It waits until all **input Observables** have emitted at least one value and then emits a new value whenever any of the input Observables emit.

```ts
combineLatestObs() {
    const ob1 = new Observable((observer) => {
      setTimeout(() => {
        observer.next('1');
      }, 3000);
      setTimeout(() => {
        observer.next('11');
      }, 6000);
    });
    const ob2 = new Observable((observer) => {
      observer.next('2');
    });
    combineLatest([ob1, ob2]).subscribe({
      next: ([v1, v2]) => {
        console.log('v1', v1);
        console.log('v2', v2);
      }
    });
  }
  // output
  /**
   * v1 1
   * v2 2
   * v1 11
   * v2 2
   */
```

**withLatestFrom**

It emits only when the primary observable emits, but each emission includes the latest values from the secondary observables.

The withLatestFrom operator is a versatile tool in RxJS for combining the latest data from multiple observables. It’s especially handy when you need to trigger actions based on the latest state of one or more observables whenever a primary observable emits.

```ts
// RxJS v6+
import { withLatestFrom, map } from 'rxjs/operators';
import { interval } from 'rxjs';

//emit every 5s
const source = interval(5000);
//emit every 1s
const secondSource = interval(1000);
const example = source.pipe(
  withLatestFrom(secondSource),
  map(([first, second]) => {
    return `First Source (5s): ${first} Second Source (1s): ${second}`;
  })
);
/*
  "First Source (5s): 0 Second Source (1s): 4"
  "First Source (5s): 1 Second Source (1s): 9"
  "First Source (5s): 2 Second Source (1s): 14"
  ...
*/
const subscribe = example.subscribe(val => console.log(val));
```

**Common Use Case**

```ts
combineLatest([this.form.get('email').valueChanges, this.form.get('password').valueChanges]).subscribe(
  ([email, password]) => {
    this.isValid = email.includes('@') && password.length >= 8;
  }
);
```

#### What is Zip ?

**Behavior:** Combines Observables in strict sequence, emitting only when all sources have emitted a corresponding value.

**Emits every time all input Observables have a new corresponding value**

Note: Only it emits the value when all the source observable emitted the value else it will not emit.

```ts
import { zip, of } from 'rxjs';

const age$ = of(27, 25, 29); // Emits 3 values
const name$ = of('John', 'Doe'); // Emits 2 values

zip(age$, name$).subscribe(console.log);
// Output:
// [27, 'John']
// [25, 'Doe']
// (Never emits the 29 because name$ doesn't have a 3rd value)
```

#### forkJoin

Waits for all input Observables to complete, Returns only the **last** values from each Observable in array

```ts
import { forkJoin, of } from 'rxjs';

const user$ = this.http.get('/api/user/1');
const posts$ = this.http.get('/api/posts?userId=1');
const comments$ = this.http.get('/api/comments?userId=1');

forkJoin([user$, posts$, comments$]).subscribe(([user, posts, comments]) => {
  console.log('User:', user);
  console.log('Posts:', posts.length);
  console.log('Comments:', comments.length);
});

// Output (when all requests complete):
// User: {id: 1, name: "John"}
// Posts: 5
// Comments: 12
```

#### Create Custom Observable and use it

```ts
type Observer<T> = {
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
};

class MySubject<T> {
  private observers: Observer<T>[] = [];

  // Subscribe method
  subscribe(observer: Observer<T>) {
    this.observers.push(observer);

    // Return an unsubscribe function
    return {
      unsubscribe: () => {
        this.observers = this.observers.filter(obs => obs !== observer);
      },
    };
  }

  // Emit a value to all subscribers
  next(value: T) {
    this.observers.forEach(observer => observer.next(value));
  }

  // Notify all subscribers of an error
  error(err: any) {
    this.observers.forEach(observer => observer.error?.(err));
  }

  // Notify all subscribers of completion
  complete() {
    this.observers.forEach(observer => observer.complete?.());
    this.observers = []; // Clear subscribers after complete
  }
}

```
- `Using the Custom Subject`
  ```ts
    const subject = new MySubject<string>();
  
    const sub1 = subject.subscribe({
      next: val => console.log('Subscriber 1:', val),
      complete: () => console.log('Subscriber 1 completed'),
    });
    
    const sub2 = subject.subscribe({
      next: val => console.log('Subscriber 2:', val),
      complete: () => console.log('Subscriber 2 completed'),
    });
    
    // Emit values
    subject.next('Hello');
    subject.next('World');
    
    // Complete
    subject.complete();
    
    // Unsubscribe example (optional, but handled above)
    sub1.unsubscribe();
  ```
