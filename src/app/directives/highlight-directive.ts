import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class AppHighLightDirective {
  constructor(private readonly el: ElementRef, private render: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('red');
  }

  @HostListener('mouseout') onMouseOut() {
    this.highlight(null);
  }

  highlight(value: string | null) {
    this.render.setStyle(this.el.nativeElement, 'color', value);
  }
}
