#### what is viewProviders ?

Ans: `viewProviders` is a property that allows to define the scope of service that are available only to the view hierarchy of the component (`the template and its child components`). These services will not be available to the content children (i.e., components projected into the component via `<ng-content>`).

```ts
// logger service
import { Component, Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  log(message: string) {
    console.log('LoggerService:', message);
  }
}

// Parent component
@Component({
  selector: 'app-parent',
  template: `
    <h2>Parent Component</h2>
    <app-child></app-child>
    <ng-content></ng-content>
  `,
  viewProviders: [LoggerService] // LoggerService will only be available to view children
})
export class ParentComponent {}

// Child component
@Component({
  selector: 'app-child',
  template: `<h3>Child Component</h3>`
})
export class ChildComponent {
  constructor(private logger: LoggerService) {
    this.logger.log('Child component created.');
  }
}

// projected component
@Component({
  selector: 'app-projected',
  template: `<h3>Projected Component</h3>`
})
export class ProjectedComponent {
  constructor(private logger: LoggerService) {
    // This will throw an error since LoggerService is not available here.
  }
}

// app.component.html
<app-parent>
  <app-projected></app-projected> <!-- Projected content -->
</app-parent>
```
