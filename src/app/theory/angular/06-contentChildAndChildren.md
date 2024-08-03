### ContentChild and ContentChildren

The ContentChild & ContentChildren are decorators, which we use to Query and get the reference to the `Projected Content` in the DOM.

Let's understand with example:

```ts
// Card component (child component)
<div class="card">
      <ng-content select="header"></ng-content>
      <ng-content select="content"></ng-content>
      <ng-content select="footer"></ng-content>
</div>
// TS file
@ContentChild("header") cardContentHeader: ElementRef;

ngAfterContentInit() {
    this.renderor.setStyle(this.cardContentHeader.nativeElement,"font-size","20px")
}

// Parent Component
<card>
    <header><h1 #header>Angular</h1></header>
    <content>One framework. Mobile & desktop.</content>
    <footer><b>Super-powered by Google </b></footer>
</card>
```

In the above example used ContentChild and ContentChildren to access projected content element

Syantax: `ContentChild(selector: string | Function | Type<any>, opts: { read?: any; static: boolean; }): any`

`selector or Query Selector`: The `change detector` looks for the first element that matches the selector and updates the component property with the reference to the element.

There are `two` type selector

- //Using a Template Reference Variable
  @ContentChild("header") cardContentHeader: ElementRef;

- //Using component/directive as type
  @ContentChild(childComponent) cardChildComponent: childComponent;

`Static`: Determines when the query is resolved. `True` is when the view is initialized (before the first change detection) for the first time. `False` if you want it to be resolved after every change detection. `Defaults` to false.

`Read Token`: Use it to read the different token from the queried elements.

Example:

```ts
Parent Component
<input #nameInput [(ngModel)]="name">

Child Component
@ContentChild('nameInput',{static:false, read: NgModel}) nameVarAsNgModel;
@ContentChild('nameInput',{static:false, read: ElementRef}) nameVarAsElementRef;
@ContentChild('nameInput', {static:false, read: ViewContainerRef }) nameVarAsViewContainerRef;
```

### ContentChildren

it is very much similar to the syntax of contentChild. It does not have the `static` option but has the `descendants` option.

`descendants True` to include all descendants, otherwise include only direct children. by default it is `false`

Example:

```ts
Direct children:
<card>
    <header #header><h1 >Angular</h1></header> // Direct Children
    <content>One framework. Mobile & desktop.</content>
    <footer><b>Super-powered by Google </b></footer>
</card>
@ContentChildren('item') items: QueryList<ElementRef> | undefined;

Decendants Children:
  <ul>
    <li #item>Item 1</li>
    <li #item>Item 2</li>
    <li #item>Item 3</li>
  </ul>

  @ContentChildren('item', {descendants: true}) items: QueryList<ElementRef> | undefined;

```

### ViewChild Vs ContentChild

`ViewChild` or `ViewChildren` can access any DOM element, component, or directive. But it cannot be used to access the `projected content`. While `ContentChild` or `ContentChildren` can access only the `projected content`, but cannot be used to access any other content.
