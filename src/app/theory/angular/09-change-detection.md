### What is Change Detection ?

It is a process to `synchronize` the model/state changes to the view.

There are Two types of change detection.

- `Default Change detection`: It checks for changes in all components and their templates on every change detection cycle.

  `How It Works:`

  `Change Detection`

  &#8595;

  `Process 1`: View Checking(Synchronization of the component view with the data model).

  &#8595;&#8593;

  `Process2` Re-run Process1(Automatically re-execute the view checking when application state might changed).

  Second Process(`Process2`) can be disabled in main.ts file

  ```
  import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
  import { AppModule } from './app/app.module';

  platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: 'noop' })
  .catch(err => console.error(err));

  ```

  so Here by using `ngZone: 'noop'`, it stops automatically re-execution of view checking.

  ![alt text](image-1.png)

### What is Zone.Js

Zone.js is a library that shipped with angular. `Zone` creates a wrapper around all asynchronous operations in the browser such as user interactions,setTimeOut, setInterval, Promise and any other changes that can cause `changes in state`, If it's find the changes in state then angular run the change detection from top to down view tree.

- But How exactly `zonejs` notify to angular of` async operation completion`, So Zone.js use the technique called `monkey patching` to patch the browser's native APi and bring some additional behaviour to it.

`Note:` Zone js doesn't know that from which component state has changed and only it knows that some state from some component has been changed and it informs to angular to start the change detection, then angular starts checking from whole view tree from top-to-bottom, that the main issue with zonejs.

This problem can be solved by onPush strategy but the real solution would be solved by `Signal`(introduced in Angular 16).

TODO: // Create the app without zone and hanle the manually change detection

- `onPush change detection strategy`
  In onPush angular reduce the number of check by this by this way it can improve the performance optimization

\* `markForCheck`: It doesn't trigger change detection instatnly, Only it mark the current compoent and it's ancestors component as dirty, and in the next change detection cycle the change detection will run for every dirty component.

```js
setTimeOut(() => {
  this.cdr.markForCheck();
}, 1000);
```

In the above component markForCheck makes the component dirty and after asyc operation change detction runs, in that cycle component will be check

\* `detectChanges`: It is a method used to` manually trigger` change detection for a specific component or view.

`Note: There are use case where angular marks the component as Dirty automatically`

- When the state is changed inside the component like with event listener then angular marks the component and it's ancestors as dirty.

- When component of `input` property is changed then in that case angular marks the child component as dirty. Suppose in parent component child component input property got changed then child component marks as dirty.

Note: When angular tries to figure out if the input binding has been changed it compares value by reference

```
const obj = {}
const obj2 = obj
obj.name = 'test' // state is mutated
obj === obj2 // True because reference still points rhe same object, So angular treats as the same value
```

- While using `async` pipe, under the hood `async` pipe uses `markForCheck`
