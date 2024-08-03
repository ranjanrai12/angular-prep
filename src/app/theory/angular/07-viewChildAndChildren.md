### ViewChild

The `ViewChild` query returns the first matching element from the DOM and updates the component variable on which we apply it.

Syntax: `ViewChild(selector: string | Function | Type<any>, opts: { read?: any; static: boolean; }): any`

`selector`: can be a `string`, a type or a function that returns a `string or type`.

`opts`: It has two options

- `static`: Determines when the query is resolved. `True` is when the view is initialized (before the first change detection) for the first time. `False` if you want it to be resolved after every change detection.
- `read`: Use it to read the `different` token from the queried elements rather than the `default` and is useful when the element is associated with `multiple` types.

Let's understand with Example:

```ts
<button (click)="onClick()">Toggle</button>

<div *ngIf="headerVisibility">
  <p #para>Some text</p>
</div>

// Ts File:
headerVisibility: boolean = false;
@ViewChild('para', { static: true }) para: ElementRef | undefined;

onClick() {
    this.headerVisibility = !this.headerVisibility;
    setTimeout(() => {
      if (this?.para?.nativeElement.innerHTML) {
        this.para.nativeElement.innerHTML = 'new text';
      }
    }, 0);
  }
```

Now in the above code static is `true`, here query(`para`) is resolved before first change detection at that time `para` reference variabe was `undefined`, becuase it was inside the `ngIf`, now on the click of Toggle button angular runs the `change detection` but it doesn't resolve the `para` reference variable.

so here output will be `Some text`, Now if the `static` is `false` then then it will become `new text`, because it `resolve` on each `change detection`.

### Injecting Component or Directive Reference

One of the use cases of ViewChild is to get the reference of the `Child Component` in the `Parent Component` and manipulate its properties.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'child-component',
  template: `<h2>Child Component</h2>
            current count is {{ count }}
    `
})
export class ChildComponent {
  count = 0;

  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
}

Parent Component:

<p> current count is {{child.count}} </p>
<button (click)="increment()">Increment</button>
<button (click)="decrement()">decrement</button>
<child-component></child-component>

@ViewChild(ChildComponent, {static:false}) child: ChildComponent;

increment() {
    this.child.increment();
}

decrement() {
    this.child.decrement();
}

```

In above example child component can be accessible via Template Reference variable

```ts
<child-component #child></child-component>
@ViewChild(child, {static:false}) child: ChildComponent;
```

### Using the Read Option in ViewChild

A Single element can be associated with multiple types.

For Example:

```ts
<input #nameInput [(ngModel)]="name">
```

If we want to get the instance of the ngModel, then we use the Read token and ask for the type.

```ts
@ViewChild('nameInput',{static:false, read: NgModel}) inRef;
@ViewChild('nameInput',{static:false, read: ElementRef}) elRef;
@ViewChild('nameInput', {static:false, read: ViewContainerRef }) vcRef;
```

Note: The `ViewChild` without `read` token always returns the `component instance` if it is a component. If not it returns the `elementRef`.

### Injecting a Provider from the Child Component

```ts
import { ViewChild, Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<h1>Child With Provider</h1>`,
  providers: [{ provide: 'Token', useValue: 'Value' }]
})
export class ChildComponent {}
```

```ts
import { ViewChild, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-child></app-child>`
})
export class AppComponent {
  @ViewChild(ChildComponent, { read: 'Token', static: false }) childToken: string;
}
```

`Note`: in the above example you will only get the token value from child component but you can't access the othere method and properties from child component.

### ViewChildren

ViewChildren decorator is used to getting the list of element references from the View, and returns the all the elements as a QueryList(`An unmodifiable list of items that Angular keeps up to date when the state of the application changes.`)

Syantax: `ViewChildren(selector: string | Function | Type<any>, opts: { read?: any; }): any`

Example:

```ts
<input name="firstName" [(ngModel)]="firstName">
<input name="midlleName" [(ngModel)]="middleName">
<input name="lastName" [(ngModel)]="lastName">

<button (click)="show()">Show</button>


@ViewChildren(NgModel) modelRefList: QueryList<NgModel>;

show() {
    this.modelRefList.forEach(element => {
        console.log(element)
        //console.log(element.value)
    });
}
```
