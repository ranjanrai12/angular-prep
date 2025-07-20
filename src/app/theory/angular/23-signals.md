# What is signal ?

Ans:
Signals are **wrappers** around **values** that:

- Notify consumers when their value changes.
- Can hold any data type (primitives, objects, arrays).
- Come in two flavors: writable and computed (read-only)

## 1. Writable Signals

- **Creating a Signal**:

```ts
import { signal } from '@angular/core';

// Initialize with default value
const count = signal(0);
```

- **Reading Values**

```ts
console.log(count()); // Get current value
```

- **Updating Values**

```ts
// Set directly
count.set(5);

// Update based on previous value
count.update((current) => current + 1);

// Mutate objects/arrays
const user = signal({ name: 'Alice' });
user.mutate((u) => (u.name = 'Bob'));
```

## 2. Computed Signals (Derived State)

Derived values that update automatically when dependencies change:

```ts
import { computed } from '@angular/core';

const doubleCount = computed(() => count() * 2);
console.log(doubleCount()); // 10 (if count is 5)
```

**Key Properties:**

- **Lazy evaluation:** Only computes when first read
- **Memoization:** Caches results until dependencies change
- **Read-only:** Cannot be directly modified

## 3. Effects (Side Effects)

Run code when signals change:

```ts
import { effect } from '@angular/core';

effect(() => {
  console.log(`Count changed to: ${count()}`);
});
```

**When to Use Effects:**

- Logging changes
- Syncing with localStorage
- Custom DOM manipulations

**When NOT to Use Effects:**

- For propagating state changes (use computed signals instead)

**Example**

```ts
import { Component, signal, computed } from '@angular/core';

@Component({
  template: `
    <button (click)="increment()">Count: {{ count() }}</button>
    <p>Double: {{ doubleCount() }}</p>
  `
})
export class CounterComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update((c) => c + 1);
  }
}
```
