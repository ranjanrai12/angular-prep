import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<any>;
  // submitted = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    public readonly appService: AppService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.appService.submitted(false);
    this.appService.submitted$.subscribe({
      next: (event) => {
        if (this.loginForm.valid) this.router.navigate(['home']);
      }
    });
  }

  get loginFormControls(): any {
    return this.loginForm.controls;
  }
}
