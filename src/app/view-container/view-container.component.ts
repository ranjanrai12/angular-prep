import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ChildContainerComponent } from './child-container/child-container.component';
import { ViewContainerDirective } from './directive/view-container-directive';

@Component({
  selector: 'app-view-container',
  standalone: true,
  imports: [ChildContainerComponent, ViewContainerDirective],
  templateUrl: './view-container.component.html',
  styleUrl: './view-container.component.scss',
})
export class ViewContainerComponent implements OnInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  @ViewChild('templateRef', { read: TemplateRef, static: true })
  templateRef!: TemplateRef<any>;

  constructor() {}

  allStudents = [
    { name: 'Mohit', age: 25 },
    { name: 'Krishn', age: 30 },
  ];

  ngOnInit(): void {}

  onAdd() {
    // Clear: Destroys all views in this container.
    this.viewContainerRef.clear();
    /**
     * initializting embedded view(templateRef) with createEmbeddedView method to viewContainerRef
     */
    this.viewContainerRef.createEmbeddedView(
      this.templateRef,
      { book: 'Ramayan', writer: 'Valmiki', $implicit: 'Prayag' },
      {
        index: 0,
        injector: Injector.create({
          providers: [{ provide: 'students', useValue: this.allStudents }],
        }),
      }
    );
    /**
     * adding the component dynamically with createComponent method to viewContainerRef
     * */
    this.viewContainerRef.createComponent(ChildContainerComponent, {
      injector: Injector.create({
        providers: [{ provide: 'students', useValue: this.allStudents }],
      }),
    });
  }

  onDelete() {
    /**
     * We can optionally pass a 0-based index of the view we want to destroy.
     * If we don't pass anything, then the last view is removed.
     */
    this.viewContainerRef.remove();
  }
}
