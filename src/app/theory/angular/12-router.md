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

```
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
export class AppRoutingModule { }
```

```
App.module.ts

imports: [
    BrowserModule,
    AppRoutingModule
  ],
```

After ng 15 version:

`Register the Routes` with non-modular structure

```
export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // default route
  { path: '**', component: ErrorComponent } // wild card route
];


Main.ts
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes)
  ]
});

```

Another benefit of the `provideRouter` API is that it’s tree-shakable! `Bundlers` can remove unused features of the `router` at `build-time`

### multiple router-outlet
