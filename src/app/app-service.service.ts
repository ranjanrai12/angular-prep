import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AppService {
  private submittedSource = new BehaviorSubject<boolean>(false);

  submitted$ = this.submittedSource.asObservable();

  subject$ = new Subject();

  constructor() {}

  submitted(event: boolean) {
    this.submittedSource.next(event);
  }
}
