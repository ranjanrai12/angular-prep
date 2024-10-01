### What is an Angular Service

Service is a piece of reusable code and that code we will use in many components across out application.

### What is Angular `Dependency Injection`(DI) ?

`Dependency Injection (DI)` is a software design pattern where the dependencies of a class are provided from the outside, rather than the class creating them itself.

#### Without DI class tends to be `tightly coupled` meaning that they heavly rely on each other, which makes code difficult to maintain, test, reuse.

Let's Create an example

```ts
class Engine {
  start() {
    console.log('Engine Start');
  }
}
class Car {
  private engine: Engine;
  constructor() {
    this.engine = new Engine();
  }

  start() {
    this.engine.start();
    console.log('Car Started');
  }
}
const car = new Car();
car.start();
```

In this above example, the `Car` class creates an instance of `Engine` inside its `constructor`. This means that `Car` is `tightly coupled` to `Engine`. If we want to change or upgrade the engine, we have to modify the Car class directly.

Now, let's say we want to introduce a new type of engine, `ElectricEngine`:

```ts
class ElectricEngine {
  start() {
    console.log('Electric engine started');
  }
}

class Car {
  private engine: ElectricEngine;

  constructor() {
    this.engine = new ElectricEngine(); // Now Car is tightly coupled to ElectricEngine
  }

  start() {
    this.engine.start();
    console.log('Car started');
  }
}

const car = new Car();
car.start();
```

Without DI, we've directly tied the Car class to the ElectricEngine. If we wanted to switch back to the regular Engine, or perhaps add more engine types, we would need to modify the Car class every time. This is a hallmark of tight coupling.

With `Dependency Injection`, however, the Car class doesn't need to know how to create an Engine or an ElectricEngine. Instead, it's provided with an engine from an external source. This makes the Car class more flexible, reusable, and easier to test since it can accept different types of engines without modification.

#### Now let's break the above example wih DI

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
class Engine {
  start() {
    console.log('Engine started');
  }
}

@Injectable({
  providedIn: 'root'
})
class Car {
  // Car depends on Engine
  constructor(private readonly engine: Engine) {
    // Engine is injected into Car
    this.engine = engine;
  }

  start() {
    this.engine.start(); // Car uses the engine to start
    console.log('Car started');
  }
}
```

Here, `Angular's DI` system manages the creation and injection of the Engine into the Car.

#### Let's understand the term which is used in DI

- `Consumer:` A consumer is typically a component, directive, or another service that needs to use another object.
- `Dependency`: A dependency is an object that a consumer needs to perform its function.
- `provider`: provider is an instruction that describes how an object for a certain token is created. providers is an array of such instraction. Each provider is uniquely identified by token in the providers array.

```ts
Example: providers: [ProductService];
```

the above example is shorthand proerty of `[{provide: ProductService, useClass(it is provider): ProductService}]`

Now in the above example there are two properties.

`Provide`: The first property is Provide holds the `Token` or `DI Token` to uniquely identify a `providers`.The Token can be either a type, a string or an instance of `InjectionToken`.
let's break it.

- `Type token`: When a token is a type, it refers to a class.

```ts
import { MyService } from './my.service';

// Using the MyService class as a token
providers: [{provide: MyService, useClass: MyService}]

The ProductService is then injected to the component by using the following code.

class MyComponent {
  constructor(private myService : MyService ) {}
}

```

- `String token`: This is useful in scenarios where the dependency is a value or object etc, which is not represented by a class.

```ts
// Using a string as a token
 {provide:'PRODUCT_SERVICE', useClass: myService },
 {provide:'USE_FAKE', useValue: true },
 {provide:'APIURL', useValue: 'http://SomeEndPoint.com/api' },

 You can then use the Inject the dependency using the @Inject method

 class myComponent {
   constructor(@Inject('PRODUCTSERVICE') private myService:myService,
@Inject('APIURL') private apiURL:string ) {
}
}

```

The Problem with the string tokens is that two developers can use the same string token at a different part of the app. You also do not have any control over the third-party modules, which may use the same token. If the token is reused, the last to register overwrites all previously registered tokens.

Let's break into an example:

```ts
// Developer A's Module
import { NgModule } from '@angular/core';
import { LoggerService } from './logger.service';

@NgModule({
  providers: [
    { provide: 'LoggerToken', useClass: LoggerService }
  ]
})
export class DeveloperAModule { }

// Developer B's Module
import { NgModule } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@NgModule({
  providers: [
    { provide: 'LoggerToken', useClass: AnalyticsService }
  ]
})
export class DeveloperBModule { }


// AppModule importing both DeveloperAModule and DeveloperBModule
import { NgModule } from '@angular/core';
import { DeveloperAModule } from './developer-a.module';
import { DeveloperBModule } from './developer-b.module';

@NgModule({
  imports: [
    DeveloperAModule,
    DeveloperBModule
  ]
})
export class AppModule { }

// Developer A's component
import { Component } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-component-a',
  template: `
    <div>Component A</div>
  `
})
export class ComponentA {
  constructor(private logger: any) {
    this.logger.log('Message from Component A');
  }
}

// Developer B's component
import { Component } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Component({
  selector: 'app-component-b',
  template: `
    <div>Component B</div>
  `
})
export class ComponentB {
  constructor(private logger: any) {
    this.logger.trackEvent('Component B Loaded');
  }
}

<!-- Main application template -->
<app-component-a></app-component-a>
<app-component-b></app-component-b>

```

When the application is loaded, ComponentA will be instantiated first. It expects to receive the LoggerService provided by Developer A, but due to the overwrite caused by DeveloperBModule, it will receive the AnalyticsService instead.

So, when ComponentA tries to call this.logger.log('Message from Component A'), it will likely encounter an error, as AnalyticsService may not have a log method.

- `Instance of InjectionToken`: is is commonly use when the value gets vary, and it ensure that the Unique tokens are created.

```ts
import { InjectionToken } from '@angular/core';

// Creating an InjectionToken instance
const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

// Using the InjectionToken as a token
providers: [{ provide: API_BASE_URL, useValue: 'https://api.example.com' }]

It is then injected using the @Inject in the constructor of the service/component.

constructor(@Inject(API_BASE_URL) private apiURL: string) {
}

```

`Provider`: It tells Angular how to create the instance of the dependency.
The Angular can create the instance of the dependency in four different ways.

- It can create a dependency from the existing service class (`useClass`).
- It can inject a value, array, or object (`useValue`).
- It can use a factory function, which returns the instance of service class or value (`useFactory`).
- It can return the instance from an already existing token (`useExisting`).

`Class Provider: useClass` when you want to provide an instance of the provided class.The useClass expects us to provide a type. The Injector creates a new instance from the type and injects it.

Example:
`providers :[{ provide: ProductService(type token), useClass: ProductService }]`

also we can provide a mock/Fake class for Testing purposes as shown below.

`providers :[{ provide: ProductService, useClass: fakeProductService }]`

The Angular Provides a shortcut in cases where both token & class name matches as follows

providers: [ProductService]

- `Value Provider: useValue` use the useValue Providers, when you want to provide a simple value. The Angular will injects whatever provided in the useValue as it is.

It is useful in scenarios like, where you want to provide API URL, application-wide configuration Option, etc

`providers: [{provide:'APIURL', useValue: 'http://SomeEndPoint.com/api' }]`

- `Factory Provider: useFactory` The Factory Provider `useFactory` expects us to provide a function. It invokes the function and injects the returned value. We can also add optional arguments to the factory function using the `deps` array. The `deps` array specifies how to inject the arguments.

We usually use the `useFactory` when we want to return an object based on a certain condition.

```ts
providers: [
  { provide: LoggerService, useClass: LoggerService },
  { provide: 'USE_FAKE', useValue: true },
  {
    provide: ProductService,
    useFactory: (USE_FAKE, LoggerService) => (USE_FAKE ? new FakeProductService() : new ProductService(LoggerService)),
    deps: ['USE_FAKE', LoggerService]
  }
];
```

Lets' break the above example
`Provider for ProductService:`

- This provider uses a factory function to conditionally create instances of ProductService based on the value of 'USE_FAKE'.

- `useFactory`: (USE_FAKE, LoggerService) => ...: This specifies the factory function to create instances of `ProductService`. It receives two parameters: `USE_FAKE` and `LoggerService`.

- `deps: ['USE_FAKE', LoggerService]`: This line specifies the dependencies of the factory function. Angular will inject the values corresponding to 'USE_FAKE' and LoggerService into the factory function.

  - If `USE_FAKE` is `true`, it creates an instance of `FakeProductService` (a fake implementation).
  - If `USE_FAKE` is `false`, it creates an instance of `ProductService` and passes `LoggerService` as a dependency.

- `Aliased Provider: useExisting`: when you want to ensure that two tokens resolve to the same instance of a service.

```ts
providers: [
  { provide: ProductService, useExisting: NewProductService },
  { provide: NewProductService, useClass: NewProductService }
];
```

in the above example, we map the `ProductService` to the `NewProductService` token using `useExisting` Provider. This will return the `NewProductService` whenever we use the `ProductService`.

## What is singelton Service

This means that there is only `one instance` of the service created, and all components, directives, and other services that inject the service receive a reference to the same instance.

For Example, consider a service configured in `@ngModule`. Component A asks for the service it will get a new instance of the service. Now if Component B Asks for the same service, the injector does not create a new instance of the service, but it will reuse the already created service.
