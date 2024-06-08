import { Route } from '@angular/router';
import { Child1Component } from './child1/child1.component';
import { ParentComponent } from './parent.component';

export const CHILD_ROUTE: Route[] = [
  //   {
  //     path: '',
  //     pathMatch: 'full',
  //     redirectTo: 'child',
  //   },
  {
    path: '',
    component: ParentComponent
    // children: [
    //   {
    //     path: 'child1',
    //     component: Child1Component,
    //   },
    // ],
  }
];
