### What is Components ?

The Component is the main building block of an Angular Application. A Component contains the definition of the View and the data that defines how the View looks and behaves.

Components are responsible for displaying data, handling user input, and communicating with other components and services.

`The Components consist of three main building blocks`

- Template
- Class
- MetaData

  ![alt text](image.png)

`Template (View)` The Template defines the layout and content of the View. Without the template, there is nothing for Angular to render to the DOM.

`Class` The Class provides the data & logic to the View.Class Contains the Properties & Methods. The Properties of a class can be bound to the view using Data Binding.

example:

```
export class AppComponent
{
    title : string ="app"
}

```

`Metadata` metadata in a component is used to define the characteristics and behavior of the component. We use the `@Component` decorator to provide the Metadata to the Component.

- `@Component decorator`
  A `decorator` is a function that adds metadata to a class, its methods & to its properties. The Components are defined with a @Component class decorator.

`Note`: A Decorator is always prefixed with @. We must place the Decorator immediately before the class definition. We can also build our own decorators.
