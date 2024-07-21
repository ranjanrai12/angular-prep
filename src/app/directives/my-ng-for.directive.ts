import { Directive, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[customeForOf]',
  standalone: true
})
export class CustomForOfDirective {
  constructor(private readonly templateRef: TemplateRef<any>, private readonly viewContainer: ViewContainerRef) {}

  @Input() set customeFor(items: []) {
    this.viewContainer.clear();
    items.forEach((item, index) => {
      this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: item, index });
    });
  }
}
