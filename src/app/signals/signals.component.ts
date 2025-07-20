import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent implements OnInit {
  count = signal(0);

  user = signal({ name: 'Ranjan' });

  ngOnInit() {
    this.count.set(5);
  }

  incrementCount() {
    this.count.update((value) => value + 1);
  }

  updateUser() {}
}
