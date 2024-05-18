import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-typed-forms',
  standalone: true,
  imports: [],
  templateUrl: './typed-forms.component.html',
  styleUrl: './typed-forms.component.scss',
})
export class TypedFormsComponent {
  form = this.fb.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  constructor(private readonly fb: NonNullableFormBuilder) {
    this.login();
  }

  login() {
    // this.form.patchValue({ email: 23 });
    this.form.reset();
    console.log('Form', this.form.value);
  }
}
