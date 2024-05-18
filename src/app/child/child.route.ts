import { Route } from '@angular/router';
import { Child1Component } from './child1/child1.component';
import { ChildComponent } from './child.component';

export const CHILD_ROUTE: Route[] = [
  //   {
  //     path: '',
  //     pathMatch: 'full',
  //     redirectTo: 'child',
  //   },
  {
    path: '',
    component: ChildComponent,
    children: [
      {
        path: 'child1',
        component: Child1Component,
      },
    ],
  },
];
