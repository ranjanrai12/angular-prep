import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-child1',
  standalone: true,
  imports: [],
  templateUrl: './child1.component.html',
  styleUrl: './child1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child1Component {
  @Input() child1Value: any | undefined;
  @Input() chil1dObj: any | undefined;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  childListener() {
    setTimeout(() => {
      // this.cdr.detectChanges();
      this.cdr.markForCheck();
    }, 1000);
  }

  child1() {
    console.log('Child1 Method');
  }
}
