import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { CanComponentDeactivate } from '../guards/unsaved-guard';
import { Subscription } from 'rxjs';
import { DoubleClickDirective } from '../directives/custom-attribute-directive/double-click-directive';
import { AutoFocusDirective } from '../directives/custom-attribute-directive/auto-focus-directive';
import { PermissionDirective } from '../directives/custom-structural-directive/permission-directive';
import { ClipboardDirective } from '../directives/custom-attribute-directive/copy-to-clipboard-directive';
import { TooltipDirective } from '../directives/custom-attribute-directive/tooltip-directive';
import { DraggableDirective } from '../directives/custom-attribute-directive/draggable-drictive';
import { RepeatDirective } from '../directives/custom-structural-directive/repeat-directive';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { DurationPipe } from '../pipes/duration.pipe';
import { HighLightPipe } from '../pipes/highlight.pip';
import { SafeHtmlPipe } from '../pipes/safehtml.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AppService],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DoubleClickDirective,
    AutoFocusDirective,
    PermissionDirective,
    ClipboardDirective,
    TooltipDirective,
    DraggableDirective,
    RepeatDirective,
    TruncatePipe,
    CapitalizePipe,
    DurationPipe,
    HighLightPipe,
    SafeHtmlPipe
  ],
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
  onDebounceClick(event: any) {
    console.log(event);
  }
}
