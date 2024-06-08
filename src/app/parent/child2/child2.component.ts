import { ChangeDetectionStrategy, Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-child2',
  standalone: true,
  imports: [],
  templateUrl: './child2.component.html',
  styleUrl: './child2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child2Component implements DoCheck {
  @Input() child2Value: any | undefined;

  ngDoCheck(): void {
    // console.log('Child 2 DO check called');
  }

  child2Listener() {}
  child2() {
    console.log('Child 2 method');
  }
}
