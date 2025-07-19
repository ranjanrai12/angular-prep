# Angular Design Patterns

![alt text](image-5.png)

## 1. Creational Design Patterns

- **Singleton Pattern**:

  **Purpose:** Ensures only one instance of a class exists in the application.

  **Use Case**: Logging, caching, database connections.

  ```ts
  @Injectable({ providedIn: 'root' }) // Singleton in Angular
  export class LoggerService {
    logs: string[] = [];

    log(message: string) {
      this.logs.push(message);
    }
  }
  ```

  **Why Use It?**

  - Centralizes state (e.g., authentication status).
  - Prevents multiple instances from consuming extra memory.

- **(2) Factory Pattern:**

  **Purpose:** Creates objects without exposing instantiation logic.

  **Use Case:** Dynamic component creation, logger types (file/console).

  ```ts
  interface Logger {
    log(message: string): void;
  }

  @Injectable({ providedIn: 'root' })
  export class LoggerFactory {
    createLogger(type: 'console' | 'file'): Logger {
      return type === 'console' ? new ConsoleLogger() : new FileLogger();
    }
  }
  ```

  **Why Use It?**

  - Decouples object creation from usage.
  - Easy to extend (e.g., add a DatabaseLogger later).

- **(3) Prototype Pattern**:

  **Purpose:** Clones objects instead of re-creating them.

  **Use Case:** Costly object initialization (e.g., complex configurations).

  ```ts
  class UserProfile implements Cloneable {
    constructor(public name: string, public permissions: string[]) {}

    clone(): UserProfile {
      return new UserProfile(this.name, [...this.permissions]);
    }
  }
  const adminProfile = new UserProfile('Admin', ['read', 'write']);
  const userProfile = adminProfile.clone(); // Deep copy
  ```

  **Why Use It?**

  - Saves resources when duplicating objects.
  - Preserves original state.

## 2. Structural Design Patterns

- **(1) Adapter Pattern:**

  **Purpose:** Makes incompatible interfaces work together.

  **Use Case:** Integrating third-party libraries.

  ```ts
  // Old API
  class OldLogger {
    logToConsole(msg: string) {
      console.log(msg);
    }
  }

  // New API (Adapter)
  @Injectable()
  export class LoggerAdapter implements NewLogger {
    constructor(private oldLogger: OldLogger) {}

    log(message: string) {
      this.oldLogger.logToConsole(`[ADAPTER] ${message}`);
    }
  }
  ```

  **Why Use It?**

  - Bridges gaps between old and new systems.
  - No need to rewrite existing code.

- **(2) Decorator Pattern:**

  **Purpose:** Adds new behaviors to objects dynamically.

  **Use Case:** Feature toggles, UI enhancements.

  ```ts
  @Directive({ selector: '[appTooltip]' })
  export class TooltipDirective {
    @HostListener('mouseenter') showTooltip() {
      // Display tooltip logic
    }
  }
  <button appTooltip="Delete item">Delete</button>;
  ```

  **Why Use It?**

  - Extends functionality without modifying original class.
  - Used in Angular directives (@Directive).

## 3. Behavioral Design Patterns

- **(1) Iterator Pattern**

  **Purpose:** Traverses collections without exposing internal structure.

  **Use Case:** Pagination, custom data loops.

  ```ts
  export class PaginatedList<T> {
    private data: T[] = [];

    getIterator(): Iterator<T> {
      let index = 0;
      return {
        next: () => ({
          value: this.data[index++],
          done: index > this.data.length
        })
      };
    }
  }
  ```

  **Why Use It?**

  - Unified way to access different data structures (arrays, trees).

- **(2) State Pattern**

  **Purpose:** Changes object behavior based on state.

  **Use Case:** UI states (loading/success/error), workflows.

  ```ts
  interface AppState {
    save(data: string): void;
  }

  class DraftState implements AppState {
    save(data: string) {
      console.log('Saving as draft...');
    }
  }

  class PublishedState implements AppState {
    save(data: string) {
      console.log('Publishing...');
    }
  }

  @Injectable()
  export class DocumentService {
    private state: AppState = new DraftState();

    setState(state: AppState) {
      this.state = state;
    }

    saveDocument(data: string) {
      this.state.save(data);
    }
  }
  ```

  **Why Use It?**

  - Clean state management (alternative to NgRx for simple cases).

Reference: https://www.geeksforgeeks.org/system-design/design-patterns-in-angular/
