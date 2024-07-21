#### What is HostListener and HostBinding ?

Ans:` @HostListener` and `@HostBinding` are `decorators` used within directives to interact with the host element of a component or directive.

`@HostListener`: The `@HostListener` decorator is use to listen the events from the host element (`the element to which the directive is applied`). It is used to declare a DOM event to listen for and the handler function to call when the event occurs.

Syntax: `@HostListener(eventName, args?)`

- eventName: A string representing the DOM event to listen for (e.g., 'click', 'mouseenter', 'keydown', etc.).

- args: Optional parameters specific to the event (e.g., $event to access event data).

```ts
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor() {}

  @HostListener('mouseenter') onMouseEnter() {
    // Logic to handle mouse enter event
    console.log('Mouse entered');
  }

  @HostListener('mouseleave') onMouseLeave() {
    // Logic to handle mouse leave event
    console.log('Mouse left');
  }
}
```

- `@HostBinding`: this decorator used to `set properties` on the host element of the directive/component programmatically.

Syntax: `@HostBinding(property)`

```ts
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class AppHighLightDirective {
  constructor(private readonly el: ElementRef, private render: Renderer2) {}

  @HostBinding('style.backgroundColor') backgroundColor1: string = 'yellow';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('red');
    this.backgroundColor1 = 'green';
  }

  @HostListener('mouseout') onMouseOut() {
    this.highlight(null);
    this.backgroundColor1 = 'yellow';
  }

  highlight(value: string | null) {
    this.render.setStyle(this.el.nativeElement, 'color', value);
  }
}
```
