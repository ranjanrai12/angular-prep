import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppService } from './app-service.service';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { counterReducer } from './counter/counter/counter.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    AppService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    provideStore(),
    provideState({ name: 'counter', reducer: counterReducer }),
    provideHttpClient()
  ]
};
