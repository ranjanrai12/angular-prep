import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent implements AfterViewInit {
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {}
}
