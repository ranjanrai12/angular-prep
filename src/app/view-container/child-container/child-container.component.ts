import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-child-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child-container.component.html',
  styleUrl: './child-container.component.scss',
})
export class ChildContainerComponent {
  constructor(
    @Inject('students') public students: { name: string; age: number }[]
  ) {}
}
