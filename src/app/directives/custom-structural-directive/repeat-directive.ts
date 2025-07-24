import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]',
  standalone: true
})
export class RepeatDirective {
  constructor(private readonly viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}

  @Input() set appRepeat(count: number) {
    this.viewContainerRef.clear();
    for (let i = 0; i < count; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {
        $implicit: i + 1, // Exposing the current index as $implicit
        index: i
      });
    }
  }
}
