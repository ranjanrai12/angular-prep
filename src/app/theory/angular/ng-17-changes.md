- `updated styleurl in Component decorator`: Prior we are passing as `array` in `styleUrls`, now we can pass as path in string in `styleUrl`

```js
@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
```

- `Angular Standalone Components:` From `Angular 17`, standalone components are default. So basically, you don’t need the ngModule and other modules to import something.You can directly import things like FormsModule into components. Components can be converted to non-standalone by setting standalone to false.

```js
@Component({
  selector: 'profile-photo',
  templateUrl: 'profilePhoto.html',
  styleUrl: 'styles.css',
  Standalone: true  // this line can be used to set component as standalone or non-standalone
})
```

- `Lazy loading of components in Angular?`: Now with the new Angular 17 feature, we can lazy load components directly.

You can perform lazy loading for a component using the following code:

Keep in mind that the component should be a standalone component to use lazy loading on a component.

```js
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then((item) => item.HomeComponent)
  }
];
```

- `Improved Server-Side Rendering`: Really good for SEO

- `Angular Declarative Control Flow`: The new declarative control flow adds the functionality of `*NgIf`, `*NgFor`, and `*NgSwitch` into the framework itself.

`*ngIf changes`:

```js
    @if(condition) {
        <div>Condition Statisfied</div>
    } @else if() {

    } @else {

    }
    // ts
    condition = true

```

`*ngFor Changes`:

```ts
@for(item of items; track $index) {
  <div>{{item}}</div>
} @empty {
    <div>There is no Item </div>
}
//ts
items = [1,2,3]
```

`[ngSwitch] Changes`:

```ts
@switch(equipment) {
    @case('container') {

    }
    @case('chassis') {

    }
    @default {

    }
}

//ts
equipment = 'container'
```

- `Change in Angular defer`: Angular `@defer` allows templates to `load content lazily`, in response to one or more configurable trigger conditions.

`@defer on Interaction`: Angular renders the “on interaction” block when the user interacts with its @placeholder block. method of interaction can be a click or any input events, like keypress or keyup

```ts
<button type="button" #loadButton>Click Me</button>
@defer (on interaction(loadButton)) {
<span>button is clicked</span>
}@placeholder { <span>Placeholder (click on it!)</span>
}
```

`@defer on Hover`: Angular displays the “on hover” block when the user hovers over its placeholder block or content.

```ts
@defer(on hover) {
<span>Hovered</span>

}@placeholder {
<span>Placeholder (hover it!)</span>
}
```

`@defer on idle`: Angular shows the “on idle” block content, when the browser reaches an idle state once the page has been loaded:

```ts
@defer (on idle) {
  <span>Browser has reached an idle state</span>
}
@placeholder {
  <span>Placeholder</span>
}
```

`@defer on timer`: Angular displays the “on timer” block, when the specified time is completed. this is something like “setTimeout” which you have used in JS.

```ts
@defer(on timer(5s)) {
<span>Visible after 5s</span>
}@placeholder {
<span>Placeholder</span>
}
```

`@defer on viewport`: Angular renders the “on viewport” block content, when the placeholder enters the browser’s viewport.

```ts
@defer (on viewport) {
  <app-c2 text="The block entered the viewport"/>
}
@placeholder {
  <span>Placeholder</span>
}
```

- []`signal stability`: Signal was released as a developer preview with Angular 16. With Angular 17, Signal is stable and can be used.
