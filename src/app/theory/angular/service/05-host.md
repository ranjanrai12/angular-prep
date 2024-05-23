### @Host decorator

- The @Host property searches for the dependency inside the component’s template only.
- It starts with the current Injector and continues to search in the Injector hierarchy until it reaches the host element of the current component.
- It does not search for the dependency in the Providers of the host element.
- But it does search in the ViewProviders of the host element.
- Module injector is never searched in the case of @Host flag

`let's break into example`

```
@Component({
  selector: "my-child",
  providers: [],
  viewProviders: [],
  template: `
    <div class="box">
      <p>ChildComponent => {{ randomNo }}</p>

      <my-grandChild></my-grandChild>
    </div>
  `
})
export class ChildComponent {}
```

Now, go to the `GrandChildComponent` and add the `@Host decorator` on the `randomService`

```
export class GrandChildComponent {
randomNo;
    constructor(@Host() private randomService: RandomService) {
        this.randomNo = randomService?.RandomNo;
    }
}
```

`Error: No provider for RandomService found in NodeInjector`

The `GrandChildComponent` is part of the following template of `ChildComponent`. This Template is hosted inside the `ChildComponent`. Hence `ChildComponent` is the `host component`.

`@Host` first looks for the Dependency in the template. It starts with the Providers of the `GrandChildComponent`.

Next, it will move to `ChildComponent`, which is the `Host` Component. Here it will only look in the `ViewProviders` and not in `Providers` array.

`Hence there are two ways in which you can remove this error`

- Add the `RandomService` to the Providers of the `GrandChildComponent`. Because that is where DI looks `first` for `dependency`.

- The second option is to add `RandomService` to `viewProviders` array of the ChildComponent.
