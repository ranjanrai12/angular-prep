### What is Angular Injector?

The Angular Injector is responsible for `instantiating` the dependency and `injecting` it into the component or service.

- When is Angular Injector is created
  The Angular creates two Injector trees when the Application bootstraps. One is the ModuleInjector tree for the Modules and the other one is the ElementInjector tree which is for the Elements (Components & Directives etc).

### What is @Injectable ?

The `Injectable` is a decorator, which you need to add to the `consumer(component, directive, service) of the dependency`.

Let's understand with example:

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  log(message: any) {
    console.log(message);
  }
}
```

```ts
import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable()
export class ProductService {
  constructor(private loggerService: LoggerService) {
    this.loggerService.log('Product Service Constructed');
  }

  public getProducts() {
    this.loggerService.log('getProducts called');
  }
}
```

The ProductService has a dependency on the LoggerService. Hence it is decorated with the `@Injectable` decorator. Remove `@Injectable()` from ProductService and you will get the following error.

`Uncaught Error: Can’t resolve all parameters for ProductService: (?)`

That is because without DI Angular will not know how to inject LoggerService into ProductService.

Remove @Injectable() from LoggerService will not result in any error as the LoggerService do not have any dependency.

The Components & Directives are already decorated with `@Component` & `@Directive` decorators. These decorators also tell Angular to use `DI`, hence you do not need to add the `@Injectable()`.

The injectable decorator also has the [provideIn](./provideIn.md) property using which you can specify how Angular should provide the dependency.

### What is @Inject

The `@Inject()` is a constructor parameter `decorator`, which tells angular to Inject the parameter with the dependency provided in the given token. It is a manual way of injecting the dependency.

In the previous example, when we removed the `@Injectable` decorator from the `ProductService` we got an error.

We can manually inject the `LoggerService` by using the `@Inject` decorator applied to the parameter `loggerService` as shown below.

The `@Inject` takes the `Injector` token as the parameter. The token is used to locate the dependency in the Providers.

```ts
export class ProductService {
  constructor(@Inject(LoggerService) private loggerService) {
    this.loggerService.log('Product Service Constructed');
  }
}
```
