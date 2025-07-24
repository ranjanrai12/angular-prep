import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input() appTooltip: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private tooltipElement: HTMLElement | null = null;

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.tooltipElement) {
      this.createTooltip();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.destroyTooltip();
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onWindowChange() {
    if (this.tooltipElement) {
      this.setTooltipPosition();
    }
  }

  private createTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.appTooltip));

    this.setTooltipStyles();
    this.renderer.appendChild(document.body, this.tooltipElement);
    this.setTooltipPosition();
  }

  private setTooltipStyles() {
    if (!this.tooltipElement) return;

    const styles = {
      position: 'absolute',
      background: '#333',
      color: '#fff',
      padding: '6px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: '1000',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      transition: 'opacity 0.2s',
      opacity: '0'
    };

    for (const [key, value] of Object.entries(styles)) {
      this.renderer.setStyle(this.tooltipElement, key, value);
    }

    // Fade in (optional)
    requestAnimationFrame(() => {
      if (this.tooltipElement) {
        this.renderer.setStyle(this.tooltipElement, 'opacity', '1');
      }
    });
  }

  private setTooltipPosition() {
    if (!this.tooltipElement) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    let top = 0;
    let left = 0;

    switch (this.tooltipPosition) {
      case 'top':
        top = hostRect.top - tooltipRect.height - 6;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + 6;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - 6;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + 6;
        break;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }

  private destroyTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
