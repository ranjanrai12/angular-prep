### What is subject

The Subjects are special observable which acts as both observer & observable. This way, data can be pushed into a subject, and the subject’s subscribers will, in turn, receive that pushed data.

```js
// service
subject$ = new Subject();

ngOninit() {
    this.subject$.subscribe(({next: (val: string) => {
        console.log(val);
    }}))
    this.subject$.next('test')
}
```

`Note:`

- Subject is multicast, means that every subscriber of subject will receive the same value which subject sends
- Subject is hot observable

`Cold observable`: The cold observable does not activate `producer` untill there is a subscriber. This is the usually the case when Observable it self produces the data.

Example:

```js
obs1$ = of(1, 2, 3, 4);
obs$ = new Observable((observer) => {
  console.log('Observable starts');
  observer.next('1'); // producer
  observer.next('2'); // producer
  observer.next('3'); // producer
  observer.next('4'); // producer
  observer.next('5'); // producer
});
```

The producer produces the value only when a subscriber subscribes to it.

`Hot observable`: In the `hot observable` that emits data regardless there is any subscribers. it can start emitting value right away.This happens when the producer is outside the observable.

```js
 subject$ = new Subject();

  ngOnInit() {
    this.subject$.next("1");
    this.subject$.next("2");

    this.subject$.subscribe(val => {
      console.log(val);
    });

    this.subject$.next("3");
    this.subject$.complete();
  }
  // output: 3
```

Difference between Multicast and unicast

- `multicast` -> It create a single instance with producer so that every subscriber will get the same value
- `unicast` -> It creates the separate instance with producer so every subscriber will get the different value

#### What is BehaviourSubject

`BehaviourSubject` requires the initial value and stores the current value and emits to the new `subscriber`.

```js
behaviourSubject$ = new BehaviorSubject('0');

this.behaviourSubject$.subscribe((val) => {
  console.log('Sub1 ' + val);
});

this.behaviourSubject$.next('1');
this.behaviourSubject$.next('2');

this.behaviourSubject$.subscribe((val) => {
  console.log('sub2 ' + val);
});

this.behaviourSubject$.next('3');
this.behaviourSubject$.complete();

//Output: sub1 0, sub1 1, sub1 2, sub2 2, sub1 3, sub2 3
```

#### ReplaySubject:

ReplaySubject replays old values to new subscribers when they first subscribe.The ReplaySubject will store every value it emits in a buffer. It will emit them to the new subscribers in the order it received them.

```js
 subject$ = new ReplaySubject();

  ngOnInit() {
    this.subject$.next("1");
    this.subject$.next("2");

    this.subject$.subscribe(
      val => console.log("Sub1 " + val),
      err => console.error("Sub1 " + err),
      () => console.log("Sub1 Complete")
    );

    this.subject$.next("3");
    this.subject$.next("4");

    this.subject$.subscribe(val => {
      console.log("sub2 " + val);
    });

    this.subject$.next("5");
    this.subject$.complete();

    this.subject$.error("err");
    this.subject$.next("6");

    this.subject$.subscribe(
      val => {
        console.log("sub3 " + val);
      },
      err => console.error("sub3 " + err),
      () => console.log("Complete")
    );
  }
***Result***
Sub1 1
Sub1 2
Sub1 3
Sub1 4
sub2 1
sub2 2
sub2 3
sub2 4
Sub1 5
sub2 5
Sub1 Complete
 //now fire an error notification and a value. None of the previous subscribers will  receive this as they are already closed. Now, we subscribe again. The subscriber will receive all the values up to Complete. But will not receive the Complete notification, instead, it will receive the Error notification.
sub3 1
sub3 2
sub3 3
sub3 4
sub3 5
sub3 err

```

#### What is AsyncSubject

`AsyncSubject` waits until the source Observable completes, and then it emits only the last value emitted by the source

```js
asyncSubject.next(1);
asyncSubject.next(2);
asyncSubject.next(3);

// Complete the AsyncSubject
asyncSubject.complete();

// Subscribe to the AsyncSubject
asyncSubject.subscribe({
  next: (value) => console.log('Subscriber 1 received:', value),
  complete: () => console.log('Subscriber 1 completed')
});

// Output:
// Subscriber 1 received: 3
// Subscriber 1 completed
```
