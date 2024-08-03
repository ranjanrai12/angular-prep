#### What is Ivy.

It’s responsible for transforming your TypeScript code and templates into optimized JavaScript code that can be executed by browsers.

- `Smaller bundle size`, with tree shaking process(remove unused code).
- `Faster Compilation`: The Angular compiler in Ivy is faster, making development and build processes quicker. It uses incremental compilation, which means it only compiles changed parts of your application when you make code edits.
- `Improved Debugging`: Ivy provides better error messages and improved debugging capabilities, making it easier to identify and fix issues in your code.
- `Localized Scope Checking`: Ivy performs scope checking at the template level, which means that Angular can detect template binding issues more accurately and provide better error messages.
- `Improved Ahead-of-Time (AOT) Compilation:` Ivy enhances AOT compilation, resulting in faster startup performance for production-ready applications.

- `Better Template Type Checking`: Ivy enables stronger type checking for templates using TypeScript. This helps catch type-related errors at compile time, reducing runtime errors.
- `Tree Shakable Services`: With Ivy, services can be marked as “tree-shakable,” allowing you to include only the services your application actually uses in the final bundle.

Reference: https://venuvudu.medium.com/ivy-rendering-in-angular-56f06c3739e1
