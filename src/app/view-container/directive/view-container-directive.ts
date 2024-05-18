import {
  Directive,
  Injector,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[vcd]',
  standalone: true,
})
export class ViewContainerDirective implements OnInit {
  allStudents = [
    { name: 'Jai', age: 30 },
    { name: 'Arjun', age: 35 },
  ];

  constructor(
    private readonly vcrRef: ViewContainerRef,
    private readonly tmpRef: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    this.vcrRef.createEmbeddedView(
      this.tmpRef,
      {},
      {
        injector: Injector.create({
          providers: [{ provide: 'students', useValue: this.allStudents }],
        }),
      }
    );
  }
}
