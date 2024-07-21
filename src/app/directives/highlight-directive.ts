import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

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
