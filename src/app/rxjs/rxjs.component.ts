import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TypedFormsComponent } from '../typed-forms/typed-forms.component';
import {
  Observable,
  Subject,
  Subscription,
  concatMap,
  debounceTime,
  exhaustMap,
  filter,
  from,
  fromEvent,
  interval,
  map,
  mergeMap,
  of,
  pipe,
  switchMap,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  throwError
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [TypedFormsComponent],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss'
})
export class RxjsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('button', { static: true }) button!: ElementRef;
  buttonSubscription$!: Subscription;
  notifier = new Subject();
  customOperator = pipe(
    // tap((item: any) => console.log(item)),
    filter((data: any) => data > 2),
    map((value) => value * 2)
  );
  count = 0;
  src = new Observable((observer) => {
    observer.next(1),
      observer.next(2),
      observer.next(3),
      observer.next(4),
      observer.next(5),
      // observer.error('Error Emitted'),
      observer.complete(),
      observer.next(6);
  }).pipe(this.customOperator);
  obs$!: Subscription;
  srcObservable = of(1, 2, 3, 4);
  innerObservable = of('A', 'B', 'C', 'D');
  ofObservable = from([1, 2, 3]).pipe(
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

  ngOnInit(): void {
    // this.ofObservable.subscribe({
    //   next: (res) => {
    //     console.log('Data Stream value', res);
    //   },
    //   error: (err) => {
    //     console.log('Error Occured');
    //   },
    //   complete: () => {
    //     console.log('Observable Completed');
    //   }
    // });
    /** takewhile */
    // of(1, 2, 3, 4, 3, 2, 5)
    //   .pipe(takeWhile((val) => val < 3, true))
    //   .subscribe({
    //     next: (val) => {
    //       console.log('takeWhile Value', val);
    //     }
    //   });
    of(1, 2, 3)
      .pipe(takeLast(2))
      .subscribe({
        next: (val) => {
          console.log('takeLast Value', val);
        }
      });
    /** Take operator */
    // this.srcObservable.pipe(take(5)).subscribe({
    //   next: (value) => {
    //     console.log('Val', value);
    //   }
    // });
    /** merge map */
    // this.mergeMapExample();
    /** switchMap*/
    // this.srcObservable
    //   .pipe(
    //     mergeMap((value) => {
    //       console.log('Src Value', value);
    //       console.log('new observable start');
    //       return this.innerObservable;
    //     })
    //   )
    //   .subscribe({
    //     next: (innerValue) => {
    //       console.log(innerValue);
    //     }
    //   });
    /** takeuntill */
    // interval(1000)
    //   .pipe(take(5), takeUntil(this.notifier))
    //   .subscribe({
    //     next: (value) => {
    //       console.log('Value', value);
    //     }
    //   });
  }

  ngAfterViewInit(): void {
    this.fromEventHandler();
  }

  delayedObs(count: number) {
    return new Observable((observer) => {
      // observer.next(count + ' A');
      // observer.next(count + ' B');

      setTimeout(() => {
        observer.next(count + ' A');
      }, 1000);
      setTimeout(() => {
        observer.next(count + ' B');
      }, 2000);
      setTimeout(() => {
        observer.next(count + ' C');
      }, 3000);
      setTimeout(() => {
        observer.next(count + ' D');
      }, 4000);
      setTimeout(() => {
        observer.next(count + ' E');
        observer.complete();
      }, 5000);
    });
  }

  stopObs() {
    this.notifier.next(true);
    this.notifier.complete();
  }

  mergeMapExample() {
    let obs = this.srcObservable
      .pipe(
        tap({
          next: (value) => {
            console.log('SOURCE', value);
          }
        }),
        exhaustMap(() => {
          this.count = this.count + 1;
          return this.delayedObs(this.count);
        })
      )
      .subscribe((val) => console.log(val));
  }

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

  ngOnDestroy(): void {
    this.obs$.unsubscribe();
    this.buttonSubscription$.unsubscribe();
  }
}
