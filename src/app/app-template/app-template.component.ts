import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app-template.component.html',
  styleUrl: './app-template.component.scss'
})
export class AppTemplateComponent {

}
