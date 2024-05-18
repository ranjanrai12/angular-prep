import { Component } from '@angular/core';
import { TypedFormsComponent } from '../typed-forms/typed-forms.component';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [TypedFormsComponent],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
})
export class RxjsComponent {}
