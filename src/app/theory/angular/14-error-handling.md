## Handling Errors in Angular

There are two types of error handling mechanism in Angular. One catches all the `client side errors` and the other one catches the `HTTP Errors`.

### `Client side Error Handling`

By default client errors are are handled by the `ErrorHandler` class, which is the default error handler for Angular.This is `global error handler` class which catches all exception occurring in the App.

This class has a method `handleError`(error), Whenever the app throws an `unhandled` exception, It then invokes the method `handleError`(error) which writes the error messages to `browser console`.

Example:

```ts
<button (click)="throwError1()">Error 1</button>
<button (click)="throwError2()">Error 2</button>

  obj = {} as any;

  throwError1() {
    this.obj.test()
  }

  throwError2() {
    try {
      this.obj.test();
    } catch (err) {
      throw err;
    }
  }
```

In the above example throwError1 is handle by default handler class `ErrorHandler` and it prints the error in browser.

In `throwError2` used try catch block if will remove `throw` then it will not print anything in browser, `throw` basically sends error back to `Errohandler` class.

#### Global Error Handler

It advisable to create our own global error handler class

- We can show a simple error page to the user, with a option to retry the operation
- We can log the errors back to the back end server, where we can read all the errors.

create a GlobalErrorHandlerService which `implements` the `ErrorHandler` Then, override the `handleError(error)` method and handle the error.

```ts
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor() {}

  handleError(error) {
    console.error('An error occurred:', error.message);
  }
}
```

Open the app.module.ts

```ts
import { ErrorHandler } from '@angular/core';

 providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
```

#### Injecting other services to the global error handler

The Angular creates the error handler service before the `providers`. Otherwise, it won’t be able catch errors that occur very early in the application. It also means that the angular `providers` won’t be available to the `ErrorHandler`.

What if we wanted to use another service in the error handler. Then, we need to use the `Injector` instance to directly to inject the dependency and not depend on the Dependency injection framework.

```ts
    constructor(private readonly injector: Injector) {}

    handleError(error: any): void {
        let router = this.injector.get(Router);
        console.log('URL:' + router.url);
        console.error('An Error Occured', error.message);
        console.error(error);
    }
```

### `Http Error Handling`

The `HttpClient` captures the `errors` and wraps it in the generic `HttpErrorResponse`, before passing it to our app.The `error` property of the `HttpErrorResponse` contains the underlying error object. It also provides additional context about the state of the `HTTP` layer when the error occurred.

The `HTTP` errors fall into two categories. The back end server may generate the error and send the error response. Or the client-side code may fail to generate the request and throw the error (`ErrorEvent` objects, common scenario like Network Issues, CORS Policy Violations, JavaScript Errors etc).

In both the cases, the generic `HttpErrorResponse` is returned by the HTTP Module. We will inspect the error property to find out the type of Error and handle accordingly.

`We can catch the HTTP Errors at three different places:`

- Component
- Service
- Globally

`Component`:

- `next` handles each value emitted by the observable.
- `error` handles any error that occurs during the observable's execution.
- `complete` is called when the observable completes its emission sequence and no more values will be emitted.

```ts
this.service.getReposCatchError(this.userName).subscribe({
  next: (res) => {
    // Handle the response here
  },
  error: (err) => {
    console.error('error caught in component', err);
    throw err; // You can also throw the error to a global error handler
  },
  complete: () => {
    console.log('Observable completed');
    // Perform any final actions here
  }
});
```

`Service`

```ts
 getRepos(userName: string): Observable<repos[]> {
    return this.http.get<repos[]>(this.baseURL + 'usersY/' + userName + '/repos')
      .pipe(
        catchError((err) => {
          console.log('error caught in service');
          console.error(err);

          //Handle the error here

          return throwError(err);    //Rethrow it back to component
        })
      )
  }
```

`Globally`:
We can use `interceptor`, The `HTTP Interceptor` is a service, which we create and register it globally at the root module using the Angular Providers. Once defined, it will intercept all the `HTTP requests` passing through the app. It intercepts when we make the HTTP request and also intercepts when the `response arrives`. This makes it an ideal place to catch all the common errors and handle it

```ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(public router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error is intercept');
        console.error(error);
        return throwError(error.message);
      })
    );
  }
}
```

`Note` that you can provide more than one Interceptor (multi: true).

```ts
providers: [{ provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true }];
```
