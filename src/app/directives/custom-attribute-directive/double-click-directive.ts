import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { debounce, timer } from 'rxjs';

@Directive({
  selector: '[appDoubleClick]',
  standalone: true
})
export class DoubleClickDirective {
  private debounceTime = 3000; // Adjust the debounce time as needed
  @Output() debounceClick = new EventEmitter();
  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: MouseEvent) {
    event.preventDefault(); // Prevent default double-click behavior
    timer(this.debounceTime)
      .pipe(debounce(() => timer(this.debounceTime)))
      .subscribe(() => {
        this.debounceClick.emit(event); // Emit the event after the debounce time
      });
  }
}
