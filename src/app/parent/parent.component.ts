import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [RouterModule, Child1Component, Child2Component],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent implements DoCheck {
  child1Value = '';
  child2Value = '';
  chil1dObj = {} as { name: string };
  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // this.cdr.detach();
  }
  ngDoCheck(): void {
    // console.log('Parent DO check called');
  }

  parentListener() {
    // this.child1Value = 'Ranjan';
    // this.chil1dObj.name = 'Ranjan';
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 1000);
  }

  parent() {
    console.log('Parent Method');
  }

  // ngAfterViewChecked() {
  //   console.log('Parent View Checked');
  // }
}
