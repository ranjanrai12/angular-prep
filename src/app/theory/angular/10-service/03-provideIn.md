### What is ProvidedIn root, any & platform in Angular

In Angular, the `providedIn` property in the `@Injectable()` decorator is used to specify the `provider's` scope.

- `providedIn: 'root'` The service is registered at the root level of the application. This means the service is available as a singleton throughout the entire application.
  `Key Points:`

  - `Singleton Scope`: A single instance of the service is shared across the entire application.
  - `Tree Shakable`: If the service is not used anywhere in the application, it will be removed from the production build, reducing the bundle size.

- `providedIn: 'any'`: This means each `lazy-loaded module` will get its own instance of the service, while `eagerly-loaded modules` will share a single instance.
  `Key Points:`

  - `Multiple Instances:` Eagerly-loaded modules share a single instance, but each lazy-loaded module gets its own instance.
  - `Useful for Lazy Loading:` This is beneficial when you want lazy-loaded modules to have their own instances of a service.

    ```
    import { Injectable } from '@angular/core';
    @Injectable({
    providedIn: 'any'
    })
    export class MyService {
    constructor() {}
    }

    ```

- `providedIn: 'platform'` The service is shared across multiple Angular applications running on the same platform. This is useful in scenarios where you have multiple Angular applications (e.g., micro frontends) running in the same browser window.
  `Key Points:`

  - `Platform-wide Singleton:` A single instance of the service is shared across all Angular applications running on the same platform.
  - `Advanced Use Cases:`Typically used in more advanced scenarios, like multi-app setups.

    ```
    import { Injectable } from '@angular/core';

    @Injectable({
    providedIn: 'platform'
    })
    export class MyService {
    constructor() {}
    }

    ```
