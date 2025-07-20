import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  private readonly http = inject(HttpClient);
  private submittedSource = new BehaviorSubject<boolean>(false);

  submitted$ = this.submittedSource.asObservable();

  subject$ = new Subject();

  constructor() {}

  submitted(event: boolean) {
    this.submittedSource.next(event);
  }

  searchUser(user: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${user}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
  }
}
