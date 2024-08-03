#### What is AOT and JIT in angular ?

`AOT (Ahead-of-Time)` and `JIT (Just-In-Time)` are two different compilation modes used in Angular to convert your application’s TypeScript code and templates into executable JavaScript code. Each mode has its own characteristics and benefits:

`AOT (Ahead-of-Time) Compilation`:

- AOT compilation is a process in which your Angular application’s code is compiled and optimized before it’s delivered to the browser.
- During AOT compilation, Angular’s templates are also compiled ahead of time into JavaScript code.

Benefits of AOT:

- Faster Load Times: AOT-compiled applications tend to load faster because the browser doesn’t need to spend time compiling templates. Templates are already in JavaScript form.
- Smaller Bundle Sizes: AOT eliminates the Angular compiler and reduces the size of the final bundle, leading to smaller file sizes and improved performance.
- Template Type Checking: AOT includes enhanced template type checking, catching potential errors during compilation.
- Better Security: Since templates are precompiled, there’s a reduced risk of template-related security vulnerabilities.

`JIT (Just-In-Time) Compilation:`

- JIT compilation is a process where your Angular application’s code is compiled in the browser at runtime, just before it’s executed.
- During JIT compilation, the Angular templates are compiled in the browser, which can lead to slower initial loading times.

Benefits of JIT:

- Development Convenience: JIT compilation simplifies the development process, as you can make changes to your code and see them reflected immediately without needing to recompile.
- Dynamically Generated Templates: JIT allows the generation of dynamic templates, such as those created based on user input or data fetched from APIs.
- Better for Rapid Prototyping: In development or rapid prototyping scenarios, JIT’s quicker turnaround time can be advantageous.

In summary, AOT (Ahead-of-Time) and JIT (Just-In-Time) are two compilation modes in Angular that offer different trade-offs in terms of performance, bundle size, development convenience, and security.

AOT is often preferred for production environments because of its advantages in terms of load times, bundle size, and template type checking. It’s the default compilation mode for Angular applications.

JIT, on the other hand, is useful during development due to its rapid iteration capabilities. Developers can make code changes and immediately see the results without the need for a separate build step. However, JIT-compiled applications might have slightly slower initial load times and larger bundle sizes compared to AOT-compiled applications.

https://radheradhepawan.medium.com/what-is-aot-and-jit-ivy-and-v8-how-work-together-in-angular-f54f3efb8a5f#:~:text=In%20summary%2C%20AOT%20(Ahead%2D,%2C%20development%20convenience%2C%20and%20security.
