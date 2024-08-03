#### What is ng-container ?

Ans: The ng-container does not render in the DOM, but content inside it is rendered.

```html
<h1> ng-Container</h2>
<p>Hello  world! </p>
<ng-container>               //This is removed from the final HTML
 Container's content.
</ng-container>
```

#### What is ng-template ?

Ans: The <ng-template> is an Angular element, which contains the template. A template is an HTML snippet. The template does not render itself on DOM.

```html
<h2>Defining a Template using ng-Template</h2>

<ng-template>
  <p>Say Hello</p>
</ng-template>
```

It is our job to tell angular where & when to display it.

There are few ways you can display the template.

- Using the ngTemplateOutlet directive.
- Using the TemplateRef & ViewContainerRef

## Displaying the Template

### ngTemplateOutlet :

The ngTemplateOutlet, is a structural directive, which renders the template.

```ts
<ng-container *ngTemplateOutlet="sayHelloTemplate">
  This text is not displayed
</ng-container>

<ng-template #sayHelloTemplate>
  <p> Say Hello</p>
</ng-template>
```

The content inside the ngTemplateOutlet directive is not displayed. It replaces it with content it gets from the sayHelloTemplate.
