import { Directive, Input, Renderer2, TemplateRef, ViewContainerRef, input } from '@angular/core';

@Directive({
  selector: '[myNgIf]',
  standalone: true
})
export class MyNgIfDirective {
  constructor(private readonly templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
  @Input() set myNgIf(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
