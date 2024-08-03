### What is Routing

Angular routing allow us to navigate between different views or component of the application.

- `Features of Routing:`

  - Navigate to a specific view by typing a URL in the address bar
  - Pass optional parameters (query parameters) to the View
  - Bind the clickable elements to the View and load the view when the user performs application tasks
  - Handles back and forward buttons of the browser
  - Allows you to load the view dynamically
  - Protect the routes from unauthorized users using Route Guards

`Key Concepts of Angular Routing`

`Router`: An Angular Router is a service (Angular Router API) that enables navigation from one component to the next component as users perform application tasks like clicking on menus links, and buttons, or clicking on the back/forward button on the browser.

We can access the router object and use its methods like navigate() or navigateByUrl(), to navigate to a route

`Route`: `Route` tells the Angular `Router` which view to display when a user clicks a link or pastes a URL into the browser address bar.

Every Route consists of a path and a component it is mapped to.

`Routes`: `Routes` is an array of Route objects our application supports

`RouterOutlet`: The outerOutlet is a directive `<router-outlet>` that serves as a placeholder, where the `Router` should display the view.

`RouterLink`: The RouterLink is a `directive` that binds the `HTML element` to a `Route`. so when clicking on the `HTML element`, will result in navigation to the `Route`.

`RouterLinkActive`: `RouterLinkActive` is a directive for `adding or removing classes` from an HTML element that is bound to a `RouterLink`.

`ActivatedRoute`: The `ActivatedRoute` is an object that represents the currently activated route associated with the `loaded Component`.

Example:
Rgistering route prior ng 15 version

```ts
export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // default route
  { path: '**', component: ErrorComponent } // wild card route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

```ts
// App.module.ts

imports: [
    BrowserModule,
    AppRoutingModule
  ],
```

After ng 15 version:

`Register the Routes` with non-modular structure

```ts
export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // default route
  { path: '**', component: ErrorComponent } // wild card route
];

Main.ts;
bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)]
});
```

Another benefit of the `provideRouter` API is that it’s tree-shakable! `Bundlers` can remove unused features of the `router` at `build-time`

### multiple router-outlet

### What is Difference between forRoot and forChild?

Ans: `forRoot` and `forChild` these are primarly used in Routing module to setup routes and services.

- `forRoot`: `forRoot` method is used in root module of the application to configure service, routes and other setting that are shared across the application. it is responsible for providing service and routes globally. This method is called only once in root module.

```ts
// Root Module (app.module.ts)
@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
```

`Features`:

- Global Configuration: forRoot allows configuration settings to be applied globally across an Angular application.
- Singleton Services: Services provided with forRoot are instantiated as singletons, ensuring consistency and preventing duplication.
- Router Initialization: forRoot sets up initial routes and router configurations at the root level of the application.
- Avoids Multiple Instances: By using forRoot, you prevent the creation of multiple instances of services and configurations throughout the application.
- Library Module Convention: forRoot provides a convention for configuring and initializing library modules at the root level of an application.

`forChild`:
The `forChild` method is used in feature modules to configure routes and other settings that are specific to that module. It allows feature modules to contribute their own routes without interfering with the global configuration set up by forRoot.

This method is used in the feature modules or child modules, especially when lazy loading is getting used. It confgures routes and services specific to that particular feature module. This method can be called multiple times in various feature modules.

`Features of forChild Method`

- `Module-specific Configuration`: forChild allows configuring routes and settings specific to feature modules.
- `Lazy Loading Support`: Enables lazy-loaded feature modules to define their own routes without interfering with the global router configuration.
- `Multiple Invocations`: Unlike forRoot, forChild can be called multiple times within different modules to configure routes and settings.
- `Encapsulation`: Helps in encapsulating module-specific functionality and settings, promoting a modular architecture.
- `Scalability`: Supports scalable application development by allowing feature modules to manage their own routes and settings independently.
