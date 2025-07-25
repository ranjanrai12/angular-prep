#### What is angular and what are it's advantages ?

Angular is an open-source JavaScript framework written in TypeScript. Google controls this, and its main purpose is to develop single-page applications. Angular is a popular framework for building dynamic, responsive web applications. It provides several added functionalities, such as routing, HTTP requests, and form handling, saving developers much time and effort.

As a framework, Angular has distinct advantages, providing a standard structure for developers to work with. It allows users to build large-scale applications in a maintainable manner. Some of the common advantages of Angular are -

- It provides a firm opinion on how the application should be structured. It also offers bi-directional data flow and updates the real DOM.
- It consists of components, directives, pipes, and services, which help create applications smoother.
- Components dependent on other components can be easily worked around using Angular
- Other generic advantages include clean and maintainable code, unit testing, reusable components, data binding, and excellent responsive experience.

#### What is TypeScript? Why is it used in Angular?

TypeScript is a statically-typed superset of JavaScript developed and maintained by Microsoft. Its primary goal is to enhance the maintainability, scalability, and reliability of JavaScript applications by adding optional types, classes, interfaces, and modules which helps in detecting potential issues during development time rather than at runtime. The core features of TypeScript include Static Typing, Classes and Interfaces, Decorators, TypeScript Compiler and Namespaces and Modules.

TypeScript is used in Angular because it provides better tooling support, improved type checking, and additional features like decorators, interfaces, etc.

#### What is difference between library and framework ?

Ans: libraries and frameworks lies in the **inversion of control** - who is calling whom and who is in charge of the application flow.

- **Library → You control it.**:
  - We decide when and where to use it.
  - We use a calculator (library) when you need to do math.
  ```ts
  import { sort } from 'lodash';
  const sortedList = sort([3, 1, 2]); // You call the library
  ```
- **Framework → It controls you**:
  - It sets rules, and your code fits inside it.
  ```ts
  @Component({ template: 'Hello!' })
  class MyComponent {} // Angular decides when to render this
  ```
  |              | Library (e.g., React, Lodash) | Framework (e.g., Angular, Django) |
  | ------------ | ----------------------------- | --------------------------------- |
  | **Control**  | You call it when needed       | It calls your code                |
  | **Size**     | Small, does one thing well    | Big, provides everything          |
  | **Best For** | Adding features to your code  | Building full apps with rules     |
  | **Learning** | Easier to start               | Needs more time to learn          |

#### Why we should use Angular ?

Ans: Because it provides -> Full feature framework, typescript support, two way binding, component based architecture, dependency injection, powerful cli, strong community.

#### What are Single Page Applications ?

Single page application (SPA) is a web application that retrives all html, css, js with a single page load, And navigation between pages performed without refreshing the whole page

Pros:

- No page refresh
- Better user experience
- Ability to work offline

Cons:

- More complex to build
- SEO
- Initial load is slow
- Client should have javascript enabled

#### What is Server Side rendering ?

In server side rendering involves rendering web pages on the server and sending fully rendered HTML to the client's browser.

Benifits:

- improved SEO
- faster initial page loads
- better support for user with slow internet connection

#### If i want to deploy my angular project to prod what are the things need to do with the project.

- code review and cleanup
- ng build --prod (tree shaking, minification, uglification)
- Use https in api call
- Authentication and authorization

#### What is CORS ? - `completed`

Ans: It's a security feature in browser, It Happen when your website tries to get data from a different domain, and that domain doesn't allow it.

#### If asked to design a new project what are steps need to take. How do we organise the module.

Ans:

- Requirements Gathering
- Project Planning
- Set Up the Development Environment
- Define the Project Structure

  Organizing Modules

  - Core Module
  - Shared Module
  - Feature Modules
  - Routing Module

#### What are data binding ? - `completed`

#### How angular bootstraping works - `completed`

#### What is viewChild and viewChildren - `completed`

#### What is contentChild and contentChildren - `completed`

#### What are angular life cycle hooks - `completed`

#### What are decorators and how many types of decorators are there in angular ? - `Not clear`(https://netbasal.com/create-and-test-decorators-in-javascript-85e8d5cf879c)

#### What is NPM ? - `completed`

#### What is git and github ? - `completed`

#### What is package.json & package-lock.json ? - `completed`

#### What is ^(Caret) and ~(Tilde) ? - `completed`

#### Whats is difference between dependencies and dev dependencies ? - `completed`

#### What is Tree Shaking ? - `completed`

#### What is ViewEncapsulation ? - `completed`

Ans: for more details - https://eisenbergeffect.medium.com/using-global-styles-in-shadow-dom-5b80e802e89d#:~:text=This%20is%20simply%20not%20true.&text=Shadow%20DOM%2C%20by%20design%2C%20provides,out%20will%20affect%20external%20DOM.

#### What is change detection ? - `completed`

#### What is zone.js ? - `completed`

#### How error handling will do in angular ? - `completed`

#### What are router guards? - `completed`

#### What is forRoot and forChild? - `completed`

https://medium.com/@hish.abdelshafouk/forroot-vs-forchild-angular-68ad5d39a481

#### What is directive and how many type of directives are there, create your own custom directive? - `completed`

#### What are new changes in angular ? - `completed`

#### What is hostlistener and hostbinding ? - `completed`

#### What is pipe and how many type of pipe are there, create your own custome pipe? - `completed`

#### Difference between pure pipe and impure pipe ? - `completed`

#### What is difference between pipe and directive ? - `completed`

#### What is viewContainer ? - `completed`

#### What is service ? - `completed`

#### What is dependency injection ? - `completed`

#### What is injectable in service ? - `completed`

#### How Angular DI Framework Resolves Dependencies ? - `completed`

#### What is @Self(), @SkipSelf(), and @Optional() ? - `completed`

#### What is viewProviders ? - `completed`

#### What is HTTP interceptor ? - `completed`

#### What is ng-template, ng-container and ngTemplateOutlet ? - `completed`

#### What is AOT and JIT ? - `completed`

#### What is IVY ? - `completed`

#### What is Signal ? - `only definition complted`

#### What is composition pattern ? - `completed`

#### What is Observable ? - `completed`

#### What is observable and observer ? - `completed`

#### What are difference between observable and promise ? - `completed`

#### what is pipe, map in rxjs ? - `completed`

#### What is switchmap, mergemap, concatmap, exhaustmap ? - `completed`

#### What is sharereplay ? - `completed`

#### What is Take, TakeUntil, TakeWhile & TakeLast ? - `completed`

#### What is subject, behaviour subject, replay subject, async subject ? - `completed`

#### What is hot observable and cold observable ? - `completed`

#### Whats is forkjoin and combineLatest ? - `completed`

#### How many way we can unsubscribe the observable ? - `completed`

#### Difference between Subject and BehaviourSubject ? - `completed`

#### What is ngRx ? - `only definition`

#### What is CDK(component development kit) ?

#### What is control value accessor ?

Ans: it allow us to create custom form controls that can interact with angular reactive forms or template driven form, it allows us to make the bidge between custom component and angular forms.

`Key Methods in ControlValueAccessor`

- `writeValue(obj: any): void:`
  - This method writes a new value to the component.
  - Angular calls this method when the form control's value is updated in the model.
- `registerOnChange(fn: any): void:`
  - This method registers a function that Angular will call whenever the component’s value changes.
  - You typically store the function reference and call it when the component's value changes.
- `registerOnTouched(fn: any): void:`
- `setDisabledState(isDisabled: boolean): void:`

#### What is forwardRef ?

Ans: `forwardRef` is a utility function provided by Angular that allows you to refer to references that are not yet defined or initialized.

#### How to handle web security in angular

Ans: `authentication`, `authoriazarion in route`, `avoid direct access to DOM`
https://medium.com/@rakesh.mr.0341/understanding-security-in-angular-applications-best-practices-and-implementation-edc773863d8a

#### How to handle authentication and authorization in angular ?

#### can we read jwt token ?

Ans: yes we can with the secret key

#### What is angular schematics ?

Ans: Angular schematic is way to automate the code generation ot updating code to fix the breaking changes.
https://blog.angular.dev/schematics-an-introduction-dc1dfbc2a2b2

#### What is webcomponent ?

Ans: It is way to create custom HTML elements with their own functionality and styles, so that it can be reusable across different projects.

#### How to publish a library

Ans: https://medium.com/angular-in-depth/step-by-step-guide-to-creating-your-first-library-in-angular-6827276bfc9f

#### Dynamic way to load stylesheet in angular

Ans:

```ts
<button (click)="onChange()">Change Style</button>
<button (click)="revertStyle()">Revert Style</button>

onChange() {
  const link = this.render.createElement('link');
  link.href = 'assets/style1.scss'; // path of scss
  link.rel = 'stylesheet';
  this.render.appendChild(document.head, link);
  this.dynamicLink = link;
}
revertStyle() {
  if (this.dynamicLink) {
    this.render.removeChild(document.head, this.dynamicLink);
    this.dynamicLink = null;
  }
}
```
