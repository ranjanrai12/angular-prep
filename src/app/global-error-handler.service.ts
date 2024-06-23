import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  handleError(error: any): void {
    let router = this.injector.get(Router);
    console.log('URL:' + router.url);
    console.error('An Error Occured', error.message);
    console.error(error);
  }
}
