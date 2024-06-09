import { inject } from '@angular/core';
import { CanDeactivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app-service.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const unSavedGuard: CanDeactivateFn<CanComponentDeactivate> = (component: CanComponentDeactivate) => {
  const appService = inject(AppService);
  const router = inject(Router);

  console.log('Guard works');
  //   return component.canDeactivate ? component.canDeactivate() : true;
  if (component.canDeactivate()) {
    if (confirm('Are you sure want to navigate ?')) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};
