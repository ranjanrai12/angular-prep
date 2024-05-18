import { Routes } from '@angular/router';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AppComponent } from './app.component';
import { AppTemplateComponent } from './app-template/app-template.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: AppTemplateComponent,
    title: 'home',
  },
  {
    path: 'rxjs',
    loadComponent: () =>
      import('./rxjs/rxjs.component').then((m) => m.RxjsComponent),
    title: 'rxjs',
  },
  {
    path: 'child',
    loadChildren: () =>
      import('./child/child.route').then((m) => m.CHILD_ROUTE),
    title: 'child',
  },
  {
    path: 'view-container',
    loadComponent: () =>
      import('./view-container/view-container.component').then(
        (m) => m.ViewContainerComponent
      ),
    title: 'view-container',
  },
  {
    path: 'dependency-injection',
    loadComponent: () =>
      import('./dependency-injection/dependency-injection.component').then(
        (m) => m.DependencyInjectionComponent
      ),
    title: 'dependency-injection',
  },
  {
    path: 'typed-forms',
    loadComponent: () =>
      import('./typed-forms/typed-forms.component').then(
        (m) => m.TypedFormsComponent
      ),
    title: 'typed-forms',
  },
];
