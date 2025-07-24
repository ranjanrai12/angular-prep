import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true,
  host: {
    '[style.position]': '"absolute"',
    '[style.cursor]': '"grab"'
  }
})
export class DraggableDirective {
  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.offsetX = event.clientX - this.el.nativeElement.getBoundingClientRect().left;
    this.offsetY = event.clientY - this.el.nativeElement.getBoundingClientRect().top;
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.renderer.setStyle(this.el.nativeElement, 'left', `${event.clientX - this.offsetX}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${event.clientY - this.offsetY}px`);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }
}
