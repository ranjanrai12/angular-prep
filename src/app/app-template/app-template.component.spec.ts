import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTemplateComponent } from './app-template.component';

describe('AppTemplateComponent', () => {
  let component: AppTemplateComponent;
  let fixture: ComponentFixture<AppTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
