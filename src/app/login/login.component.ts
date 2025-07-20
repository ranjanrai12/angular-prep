import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { CanComponentDeactivate } from '../guards/unsaved-guard';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AppService],
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  loginForm!: FormGroup<any>;
  submitted = false;
  private readonly subscriptions$: Subscription = new Subscription();

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
    this.appService.submitted(true);
    this.subscriptions$.add(
      this.appService.submitted$.subscribe({
        next: (event) => {
          this.submitted = event;
          if (this.loginForm.valid) this.router.navigate(['home']);
        }
      })
    );
  }

  canDeactivate() {
    return this.loginForm.dirty && this.submitted ? false : this.loginForm.dirty;
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  get loginFormControls(): any {
    return this.loginForm.controls;
  }
}
