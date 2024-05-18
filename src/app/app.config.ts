import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppService } from './app-service.service';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(RouterModule.forRoot(routes)), AppService],
};
