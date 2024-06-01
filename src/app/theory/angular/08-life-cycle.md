### Explain Component lifecycle hooks

The life cycle hooks are the `methods` which angular invokes on directives and components as it creates, changes and destory them.

The life cycle hooks are nothing but callback functions, which angular invokes when a specific event occurs during the component’s life cycle.

For Example: When a component’s `input property` change, Angular invokes `ngOnChanges`.

- ngOnChanges
- ngOnInit
- ngDoCheck
- ngAfterContentInit
- ngAfterContentChecked
- ngAfterViewInit
- ngAfterViewChecked
- ngOnDestroy

- `ngOnChanges`: The Angular invokes the `ngOnChanges` life cycle hook whenever any data-bound input property of the component or directive changes.

```
Child Component:

@Input() message:string

ngOnChanges() {
    console.log(this.message)
}

Parent Component:
<app-child [message]="message">
</app-child>
```

The change detector checks if the parent component changes such input properties of a component. If it is, then it raises the ngOnChanges hook.

- `ngOnInit`: Angular calls `ngOnInit` after component creation, if there is inbound communication between component then it calls after `ngOnChanges`, if it's not there then first order of exection lifecycle is `ngOnInit`.

```
ngOnInit() {
  console.log('Component initialized');
}

```

- `ngDoCheck`: ngDoCheck calls on every change detection cycle.

```
ngDoCheck() {
  console.log('ngDoCHeck triggered');
}
```

- `ngAfterContentInit`:ngAfterContentInit Life cycle hook is called after the Component’s [`projected content`](./05-contentProjection.md) has been fully initialized.Angular also updates the properties decorated with the `ContentChild` and `ContentChildren` before raising this hook. This hook is also raised, even if there is `no content` to project.

```
Child Component:

<h2>Child Component</h2>
<ng-content></ng-content>   <!-- placehodler for content from parent -->

Parent Component:
<h1>Parent Component</h1>
<app-child> This <b>content</b> is injected from parent</app-child>
```

- `ngAfterContentChecked`: ngAfterContentChecked hook is called after Angular finishes checking of component’s projected content.This event is fired after `ngAfterContentInit` and after that it calls during everly change detection cycle.Angular also updates the properties decorated with the `ContentChild` and `ContentChildren` before raising this hook. Angular calls this hook even if there is no projected content in the component.

```
ngAfterContentChecked() {
  console.log('Content checked');
}
```

- `ngAfterViewInit`: ngAfterViewInit hook is called after the Component’s View & all its child views are fully initialized. Angular also updates the properties decorated with the `ViewChild` & `ViewChildren` properties before raising this hook.

This hook is called during the `first` change detection cycle, where angular initializes the view for the `first time.`

At this point, all the `lifecycle` hook methods & change detection of all `child components & directives` are processed & Component is entirely ready.

- `ngAfterViewChecked`: The Angular fires this hook after it checks & updates the component’s views and child views. This event is fired after the ngAfterViewInit and after that, during every change detection cycle.

- `ngOnDestroy`: This hook is called just before the Component/Directive instance is destroyed by Angular

```
ngOnDestroy() {
  console.log('Component destroyed');
}

```
