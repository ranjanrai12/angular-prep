### How many way component communication can be done in angular ?

- Input and Output Properties
  `Input Properties`: Use the `@Input()` decorator to pass data from a parent component to a child component.
  `Output Properties`: Use the `@Output()` decorator along with an `EventEmitter` to emit events from a child component to a parent component.

  ```
  // Parent Component Template
  <app-child [childInput]="parentData" (childOutput)="handleChildOutput($event)"></app-child>

  // Parent Component TS
  export class ParentComponent {
  parentData = 'Hello Child';

  handleChildOutput(event: any) {
      console.log('Received from child:', event);
  }
  }

  // Child Component TS
  import { Component, Input, Output, EventEmitter } from '@angular/core';

  @Component({
  selector: 'app-child',
  template: `<button (click)="sendToParent()">Send to Parent</button>`
  })
  export class ChildComponent {
  @Input() childInput: string;
  @Output() childOutput = new EventEmitter<string>();

  sendToParent() {
      this.childOutput.emit('Hello Parent');
  }
  }

  ```

- `ViewChild and ContentChild`:

  `ViewChild`: Access a child component, directive, or DOM element from the parent component class.

  ```
  parent component:
  <app-child></app-child>

  @ViewChild(ChildComponent) childComponent: ChildComponent;
  ngAfterViewInit() {
    console.log(this.childComponent.childMethod());
  }
  ```

  `ContentChild`: pass conent projected from parent to the child component

- `Service with Observable/Subject`:

  ```
  // Shared Service
  import { Injectable } from '@angular/core';
  import { Subject } from 'rxjs';

  @Injectable({
  providedIn: 'root'
  })
  export class CommunicationService {
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();

  sendMessage(message: string) {
      this.messageSource.next(message);
  }
  }

  // Sender Component TS
  import { Component } from '@angular/core';
  import { CommunicationService } from './communication.service';

  @Component({
  selector: 'app-sender',
  template: `<button (click)="sendMessage()">Send Message</button>`
  })
  export class SenderComponent {
  constructor(private communicationService: CommunicationService) {}

  sendMessage() {
      this.communicationService.sendMessage('Hello from Sender');
  }
  }

  // Receiver Component TS
  import { Component, OnInit } from '@angular/core';
  import { CommunicationService } from './communication.service';

  @Component({
  selector: 'app-receiver',
  template: `<p>{{ message }}</p>`
  })
  export class ReceiverComponent implements OnInit {
  message: string;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit() {
      this.communicationService.message$.subscribe(message => {
      this.message = message;
      });
  }
  }

  ```

- `With Template Reference Variable`:

```
// Parent Component Template
<app-child #childComp></app-child>
<button (click)="childComp.childMethod()">Call Child Method</button>

// Child Component TS
@Component({
  selector: 'app-child',
  template: `<p>Child Component</p>`
})
export class ChildComponent {
  childMethod() {
    console.log('Child Method Called');
  }
}

```

- `Using the Angular Router`

```
// Sender Component TS
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sender',
  template: `<button (click)="sendMessage()">Send Message</button>`
})
export class SenderComponent {
  constructor(private router: Router) {}

  sendMessage() {
    this.router.navigate(['/receiver'], { state: { message: 'Hello from Sender' } });
  }
}

// Receiver Component TS
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receiver',
  template: `<p>{{ message }}</p>`
})
export class ReceiverComponent implements OnInit {
  message: string;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.message = navigation?.extras.state?.message;
  }

  ngOnInit() {}
}

```

Note: The `getCurrentNavigation()` method should be accessed in the constructor because it is only available during the `navigation lifecycle`. Trying to access it in `ngOnInit` will typically result in null because the `navigation event` has already been completed by the time `ngOnInit` is called.
