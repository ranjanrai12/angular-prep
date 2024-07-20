import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  signal
} from '@angular/core';
import { TypedFormsComponent } from '../typed-forms/typed-forms.component';
import {
  AsyncSubject,
  BehaviorSubject,
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
import { AppService } from '../app-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [TypedFormsComponent, CommonModule],
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
  arr = [1, 2, 3];
  protected name = signal('Angular');
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
  valueChange = Output();
  carouselItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'];
  currentIndex = 0;
  itemsPerPage = 3;
  displayItems: string[] = [];
  obs = new Observable((observer) => {
    observer.next(Math.floor(Math.random() * 200) + 1);
    observer.next(Math.floor(Math.random() * 200) + 1);
  });
  // behaviourSubject$ = new BehaviorSubject('0');
  subject$ = new AsyncSubject();
  constructor(private readonly appService: AppService) {}
  ngOnInit(): void {
    this.updateDisplayItems();

    // this.appService.subject$.next('test');
    // this.appService.subject$.next('test');
    // this.obs.subscribe({
    //   next: (value) => {
    //     console.log('cold observable1', value);
    //   }
    // });
    // this.obs.subscribe({
    //   next: (value) => {
    //     console.log('cold observable2', value);
    //   }
    // });
    // this.appService.subject$.subscribe({
    //   next: (val) => {
    //     console.log('cliked1', val, 'rxjsComponent');
    //   }
    // });
    // this.appService.subject$.subscribe({
    //   next: (val) => {
    //     console.log('cliked1', val, 'rxjsComponent');
    //   }
    // });
    // this.appService.subject$.next(Math.floor(Math.random() * 200) + 1);
    // this.appService.subject$.next('test');

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
    // of(1, 2, 3)
    //   .pipe(takeLast(2))
    //   .subscribe({
    //     next: (val) => {
    //       console.log('takeLast Value', val);
    //     }
    //   });
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

    this.subject$.next('1');
    this.subject$.next('2');
    this.subject$.subscribe({
      next: (val) => {
        console.log('Sub1 ' + val);
      },
      error: (err: any) => console.error('Sub1 ' + err),
      complete: () => console.log('Sub1 Complete')
    });

    this.subject$.next('3');
    this.subject$.next('4');

    this.subject$.subscribe((val) => {
      console.log('sub2 ' + val);
    });

    this.subject$.next('5');
    this.subject$.complete();

    this.subject$.error('err');

    this.subject$.next('6');

    this.subject$.subscribe(
      (val) => console.log('Sub3 ' + val),
      (err) => console.error('sub3 ' + err),
      () => console.log('Sub3 Complete')
    );
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
  outer(callback: any) {
    let count = 0;
    callback(console.log('Count', ++count));
  }

  handleClick() {
    this.name.set('Zoneless Angular');
    this.outer(() => {});
  }

  ngOnDestroy(): void {
    // this.obs$.unsubscribe();
    this.buttonSubscription$.unsubscribe();
  }

  updateDisplayItems(): void {
    this.displayItems = this.carouselItems.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  onNext(): void {
    if (this.currentIndex + 1 <= this.carouselItems.length - this.itemsPerPage) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Wrap around to the beginning
    }
    this.updateDisplayItems();
  }

  onPrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.carouselItems.length - this.itemsPerPage; // Wrap around to the end
    }
    this.updateDisplayItems();
  }

  onItemClick(index: number): void {
    // Calculate the absolute index in carouselItems
    const absoluteIndex = this.currentIndex + index;

    // Check if the item is within bounds of carouselItems
    if (absoluteIndex < this.carouselItems.length) {
      // Update currentIndex to show clicked item
      this.currentIndex = absoluteIndex;
      this.updateDisplayItems();
    }
  }

  isHighlighted(index: number): boolean {
    // Calculate the absolute index in carouselItems
    const absoluteIndex = this.currentIndex + index;

    // Ensure absoluteIndex is within carouselItems length
    const adjustedIndex = absoluteIndex % this.carouselItems.length;

    // Check if the adjusted index matches currentIndex
    return adjustedIndex === this.currentIndex % this.carouselItems.length;
  }
}
