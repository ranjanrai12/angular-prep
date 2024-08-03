### @Self, @SkipSelf & @Optional Decorators Angular

- `How Angular DI Framework Resolves Dependencies`

  When a component asks for `Dependency`, the DI Framework resolves it in two phases.

  In the first phase, it starts to look for the Dependency in the current component’s `ElementInjector`. If it does not provide the Dependency, it will look in the `Parent` Components `ElementInjector`. The Request bubbles up until it finds an injector that provides the service or reaches the root `ElementInjector`.

  If `ElementInjector` does not satisfy the request, Angular looks for the Dependency in the `ModuleInjector` hierarchy. If Angular still doesn’t find the `provider`, it throws an error.

  `Note`: `ElementInjector` for elements (components, directives & pipes etc) and the other one is `ModuleInjector` for Angular Modules.

  #### In Angular, the @Self(), @SkipSelf(), and @Optional() decorators are used to control dependency resolution behavior when injecting services

- `@Self()`: The `@Self()` decorator ensures that Angular looks for the dependency only in the local injector (the injector of the component or directive where the dependency is being requested) and not in any ancestor injectors. If the service is not found in the local injector, Angular throws an error.

```ts
@Component({
  selector: 'my-component',
  template: ` <div class="box">MyComponent => {{ randomNo }}</div> `,
  providers: [RandomService]
})
export class MyComponent {
  randomNo;
  constructor(@Self() private randomService: RandomService) {
    this.randomNo = randomService.RandomNo;
  }
}
```

- `@SkipSelf`: The `@SkipSelf()` decorator tells Angular to skip the local injector and look for the dependency in the parent or ancestor injectors.

```ts
import { Component, SkipSelf, Optional } from '@angular/core';
import { ParentService } from './parent.service';

@Component({
  selector: 'app-skipself-example',
  template: `...`
})
export class SkipSelfExampleComponent {
  constructor(@SkipSelf() @Optional() private parentService: ParentService) {
    // parentService must be provided by a parent injector
  }
}
```

In this example, @SkipSelf() ensures that ParentService is not provided by the local injector but by a parent injector. If no parent provides it, Angular will not throw an error because `@Optional()` is also used.

- `@Optional()`: The `@Optional()` decorator tells Angular that the dependency is optional. If the dependency is not found, Angular will inject `null` instead of throwing an error.

```ts
import { Component, Optional } from '@angular/core';
import { OptionalService } from './optional.service';

@Component({
  selector: 'app-optional-example',
  template: `...`
})
export class OptionalExampleComponent {
  constructor(@Optional() private optionalService: OptionalService) {
    if (this.optionalService) {
      // optionalService is available
    } else {
      // optionalService is not available
    }
  }
}
```
