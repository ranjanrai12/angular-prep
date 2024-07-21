### What is Directives ?

Directive is use to change a DOM element’s appearance, behavior, or layout.

`Directives are classified into three categories.`

- `Component`: component directive is a special directive in angular, which contain a template(View).

- `Structural`: `Structural directives` can change the DOM layout by adding and removing DOM elements.

  Example: `ngFor`, `ngSwitch`, `ngIf`

- `Attribute`: An `Attribute` or `style` directive can change the appearance or behavior of an element.

  Commonly used Attribute directives

  - `ngModel`: The ngModel directive is used the achieve the two-way data binding.
  - `ngClass`:The ngClass is used to add or remove the CSS classes from an HTML element.
  - `ngStyle`: ngStyle is used to change the multiple style properties of our HTML elements.

### How to create custom directive?

custom directive is a way to create reusable functionalities that can be applied to elements in our application.

`Custom directives in Angular can be categorized into two main types:`

- `Attribute Directives`: Used to change the appearance or behavior of an element.

```ts
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}

<p appHighlight>Hover over this text to see the highlight.</p>;
```

- `Structural Directives`: Used to change the DOM layout by adding or removing elements.
  `Note`: For understanding of below code Prior knowledge of [viewContainerRef](./ViewContainerRef.md) is required.

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIf]'
})
export class IfDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appIf(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}

<div *appIf="condition">This will only display if the condition is true.</div>

```

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[customForOf]'
})
export class CustomForDirective {
  private items: any[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set customForOf(items: any[]) {
    this.items = items;
    this.updateView();
  }

  private updateView() {
    this.viewContainer.clear();
    for (let item of this.items) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: item
        // $implicit allow directive to pass data to the template without requiring a named variable.
      });
    }
  }
}

<ul>
  <li *customFor="let item of items">{{ item }}</li>
</ul>
```
