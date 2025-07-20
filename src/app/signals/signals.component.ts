import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { __values } from 'tslib';

@Component({
  selector: 'app-signals',
  standalone: true,
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent implements OnInit {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);
  user = signal({ name: 'Ranjan' });
  userNameLength = computed(() => this.user().name.length);
  constructor() {
    effect(() => {
      console.log(`Count changed to: ${this.count()}`);
    });
  }
  ngOnInit() {
    this.count.set(5);
  }

  incrementCount() {
    this.count.update((value) => value + 1);
  }

  decrementCount() {
    setTimeout(() => {
      this.count.update((value) => value - 1);
    }, 1000);
  }

  resetCount() {
    this.count.set(0);
  }

  updateUser() {
    this.user.update((value) => ({ ...value, name: 'Ranjan Kumar' }));
    // v > 17
    // this.user.mutate((value) => value.name = 'Ranjan Kumar' );
  }
}
