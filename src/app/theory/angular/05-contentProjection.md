### What is Content Projection

`Content projection` is a way to pass the HTML element, css etc, from the parent component to the child component.The child component will display the template in a designated spot for that we use `ng-content` element.We can also define different slots using the `selector attribute`.

The `ng-content` also allows us to create multiple slots using the selector attribute. The parent can send different content to each slot.

### What is ng-content

The ng-content tag acts as a placeholder for inserting external or dynamic content.

Example:

```
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
 selector: 'app-fancybtn',
 template: `
     <button>
       <ng-content></ng-content>
     </button> `
})
export class FancyBtnComponent {
}

<!-- Parent Component -->
<app-fancybtn>Click Me</app-fancybtn>
<app-fancybtn><b>Submit</b></app-fancybtn>
```

Events:
The events like click, input, etc bubble up. Hence can be captured in the parent.

```
<app-fancybtn (click)="btnClicked($event)"><b>Submit</b></app-fancybtn>
```

If it has more button then in that case create custom event

```
<!-- Fancy Button -->
<button (click)="raiseSomeEvent()">
       <ng-content></ng-content>
</button>

@Output() someEvent:EventEmitter =new EventEmitter();
raiseSomeEvent() {
 this.someEvent.emit(args);
}

Parent Component
<app-fancybtn (someEvent)=”DoSomething($event)”><b>Submit</b></app-fancybtn>
```

`Multiple Projections using ng-content`

In the parent component we can create different contents and each of those contents can be projected into any of those slots depending on their selector.

Example of ng-content select attribute

```
import { Component } from '@angular/core';


@Component({
  selector: 'app-card',
  template: `
    <div class="card">
    <div class="header">
      <ng-content select="header" ></ng-content>
    </div>
    <div class="content">
      <ng-content select="content" ></ng-content>
    </div>
    <div class="footer">
      <ng-content select="footer" ></ng-content>
    </div>
    </div>
  `,
  styles: [
    ` .card { min- width: 280px;  margin: 5px;  float:left  }
      .header { color: blue}
    `
  ]
})
export class CardComponent {
}

Now in the parent component
<app-card>
 <header><h1>Angular</h1></header>
 <content>One framework. Mobile & desktop.</content>
 <footer><b>Super-powered by Google </b></footer>
</app-card>

<app-card>
 <header><h1 style="color:red;">React</h1></header>
 <content>A JavaScript library for building user interfaces</content>
 <footer><b>Facebook Open Source </b></footer>
</app-card>
```

`Note`: ng-content without selector catches all
