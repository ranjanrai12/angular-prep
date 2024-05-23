### What is data binding?

Data binding is a technique, where the data stays in sync between the component and the view.

`There are two types of data binding in angular`

- One way binding
- two-way binding

#### `One way binding:`

In one way binding data flows from one direction. Either from view to component or from component to view.

- ##### `From Component to View`

  - `Interpolation`: It is used to bind data from the component to the view (HTML template) in a readable format.

  `synatax:`

  ```
  <h1>{{ title }}</h1>
  ```

  Angular evaluates these expressions and inserts the resulting values into the DOM.

  - `Property binding:` It allow us to bind `HTML element property` to a property in the `component`.Whenever the value of the component property changes, the Angular updates the element property in the View.

  `Example:`

  ```
  <h1 [innerText]="title"></h1>
  <h2>Example 1</h2>
  <button [disabled]="isDisabled">I am disabled</button>
  ```

  - `style binding:` With this can set the inline style of a HTML element using `style binding`.

  ```
  <p [ngStyle]="{'color': 'purple','font-size': '20px','font-weight': 'bold'}">
      Multiple styles
  </p>
  ```

- #### `From Component to View `

  - `Event Binding`: Event binding allows us to bind events such as keystrokes, clicks, hover, touch, etc to a method in component. It is one way from view to component.

    `Example`:

    ```
    <button (click)="onSave()">Save</button>
    ```

#### `Two way binding`

In two way data binding data flows from component to view and view to component based on the changes.

```
<input type="text" name="value" [(ngModel)]="value">

```

Here angular using `ngModel` directive, behind the scene it sets up property binding & event binding. It binds to the `value` property of the element using `property binding`. It then uses the `ngModelChange` event to sets up the `event binding` to listen to the changes to the value.
