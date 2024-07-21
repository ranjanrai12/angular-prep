import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../counter/app.state';
import { Observable } from 'rxjs';
import { selectCount } from '../counter/counter/counter.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { decrement, increment, reset } from '../counter/counter/counter-action';
import { AppHighLightDirective } from '../directives/highlight-directive';
import { MyNgIfDirective } from '../directives/my-ng-if.directive';
import { CustomForOfDirective } from '../directives/my-ng-for.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomPipe } from '../pipes/custom.pipe';

@Component({
  selector: 'app-ngrx',
  standalone: true,
  imports: [AsyncPipe, AppHighLightDirective, CustomPipe, MyNgIfDirective, CustomForOfDirective, CommonModule],
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss'
})
export class NgrxComponent implements OnInit {
  count$: Observable<number> | undefined;
  arrs = [1, 2, 3];
  visibility = true;
  constructor(private store: Store<AppState>) {
    this.count$ = this.store.select(selectCount);
  }
  equipment = '';
  ngOnInit(): void {
    setTimeout(() => {
      this.visibility = false;
    }, 1000);
  }

  increment() {
    this.store.dispatch(increment());
  }
  decrement() {
    this.store.dispatch(decrement());
  }
  reset() {
    this.store.dispatch(reset());
  }
}
