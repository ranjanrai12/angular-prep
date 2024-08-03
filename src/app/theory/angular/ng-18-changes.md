#### What’s New in Angular 18?

- `Zoneless Applications:`

```ts
bootstrapApplication(App, {
  providers: [provideExperimentalZonelessChangeDetection()]
});
```

- `Route Redirects with Functions`

```ts
const routes = [
  {
    path: 'old-user-page',
    redirectTo: ({ queryParams }) => {
      const errorHandler = inject(ErrorHandler);
      const userIdParam = queryParams['userId'];
      if (userIdParam !== undefined) {
        return `/user/${userIdParam}`;
      } else {
        errorHandler.handleError(new Error('Attempted navigation to user page without user ID.'));
        return `/not-found`;
      }
    }
  }
];
```

- `Typescript 5.4`

- `Input function`

```ts
productName = Input<string>();
```

- `Output function`

```ts
nameUpdated = new Output();
```

- `Fallback content for ng-content`

```ts
@Component({
  selector: ‘app-custom-widget’,
  template: `
    <ng-content select=".header">Default Header</ng-content>
    <ng-content>Default Content</ng-content>
  `,
})
export class CustomWidgetComponent {}
```

- `Form’s new control state change events`

```ts
const nameControl = (new FormControl() < string) | (null > ('name', Validators.required));
nameControl.events.subscribe((event) => {
  if (event.type === 'valueChange') {
    console.log('Value changed to:', event.value);
  } else if (event.type === 'statusChange') {
    console.log('Control status changed to:', event.Status);
  }
});
```

- `Event replay in preview`

```ts
bootstrapApplication(App, {
  providers: [provideClientHydration(withEventReplay())]
});
```
