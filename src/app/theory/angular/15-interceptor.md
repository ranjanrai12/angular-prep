### HTTP Interceptors

The Angular Interceptor helps us to modify the HTTP Request by intercepting it before the Request is sent to the back end. It can also modify the incoming Response from the back end. The Interceptor globally catches every outgoing and in coming request at a single place.

To Implement the `Interceptor`, we need to create an injectable service, which implements the `HttpInterceptorinterface`.

`HttpInterceptor Interface`: The interface contains a single method Intercept with the following signature

```ts
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>

```

`HttpRequest`: The `HttpRequest` is an outgoing HTTP request which is being intercepted. It contains URL, method, headers, body, and other request configuration.

The HttpRequest is a immutable class. Which means that we can’t modify the original request. To make changes we need to clone the Original request using the HttpRequest.clone method

`HttpHandler`: The `HttpHandler` dispatches the `HttpRequest` to the next `Handler` using the method `HttpHandler.handle`. The next handler could be another `Interceptor` in the chain or the `Http Backend`.

Creation of interceptor:

```ts
providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AppHttpInterceptor,
        multi: true
    }
],

```

```ts
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AppHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({ headers: req.headers.set('userid', '18726') });
    return next.handle(request);
  }
}
```
