import { Route, Router, Routes, UrlSegment, UrlTree } from '@angular/router';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AppComponent } from './app.component';
import { AppTemplateComponent } from './app-template/app-template.component';
import { inject } from '@angular/core';
import { AppService } from './app-service.service';
import { Observable, map } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { unSavedGuard } from './guards/unsaved-guard';

const canMatchGuard = (route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const appService = inject(AppService);
  return appService.submitted$.pipe(
    map((isLogin) => {
      return isLogin || router.createUrlTree(['']);
    })
  );
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    // component: LoginComponent
    loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent),
    canDeactivate: [unSavedGuard]
  },
  {
    path: 'home',
    // component: AppTemplateComponent,
    loadComponent: () => import('./app-template/app-template.component').then((c) => c.AppTemplateComponent),
    canLoad: [canMatchGuard],
    title: 'home'
  },
  {
    path: 'rxjs',
    loadComponent: () => import('./rxjs/rxjs.component').then((m) => m.RxjsComponent),
    title: 'rxjs'
  },
  {
    path: 'parent',
    loadChildren: () => import('./parent/parent.route').then((m) => m.PARENT_ROUTE),
    title: 'parent',
    canMatch: [() => true]
  },
  {
    path: 'view-container',
    loadComponent: () => import('./view-container/view-container.component').then((m) => m.ViewContainerComponent),
    title: 'view-container'
  },
  {
    path: 'dependency-injection',
    loadComponent: () =>
      import('./dependency-injection/dependency-injection.component').then((m) => m.DependencyInjectionComponent),
    title: 'dependency-injection'
  },
  {
    path: 'typed-forms',
    loadComponent: () => import('./typed-forms/typed-forms.component').then((m) => m.TypedFormsComponent),
    title: 'typed-forms'
  },
  {
    path: 'content-projection',
    loadComponent: () =>
      import('./content-projection/content-projection.component').then((C) => C.ContentProjectionComponent)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
