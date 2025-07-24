import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClipboard]',
  standalone: true
})
export class ClipboardDirective {
  @Input() appCopyToClipboard!: string;
  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {}

  @HostListener('click') onClick() {
    navigator.clipboard
      .writeText(this.appCopyToClipboard)
      .then(() => {
        console.log('TEST COPIED');
      })
      .catch(() => {
        console.log('Error copying text to clipboard');
      });
  }
}
