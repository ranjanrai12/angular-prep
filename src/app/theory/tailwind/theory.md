#### What is tailwind ?

Ans: Tailwind CSS is a `utility-first CSS` framework which means we can use utility classes to build custom designs without writing CSS as in the traditional approach, also tailwind remove unsused css classes from the production build which ensure that css file is small as much as possible.

#### What all are directive of tailwind ?

Ans:

- `@tailwind Directive`: The `@tailwind` directive is used to include Tailwind’s base styles, components, and utilities in your CSS file. It helps you bring in the necessary styles from Tailwind into your custom CSS.

```css
/* Import Tailwind's base styles */
@tailwind base;

/* Import Tailwind's utility classes */
@tailwind utilities;

/* Import Tailwind's components (if you use Tailwind UI or custom components) */
@tailwind components;
```

- `@apply Directive`: The `@apply` directive allows you to apply Tailwind utility classes to a custom CSS class. This is useful for creating reusable styles without having to repeat utility classes in your HTML or JSX.

```css
/* Custom button styles using @apply */
.btn-primary {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}
```

- `@variants Directive`: The @variants directive lets you generate responsive and state-based variants for your utility classes. This directive is typically used in your Tailwind configuration file to control which variants (e.g., hover, focus, active) are generated for a utility class.

```ts
// tailwind.config.js
module.exports = {
  extend: {
    variants: {
      extend: {
        backgroundColor: ['hover', 'focus', 'active']
        // Add more variants as needed
      }
    }
  }
};
```

- `@screen Directive`: The @screen directive is used for applying styles at different breakpoints (responsive design). It helps you apply styles conditionally based on screen size.

```css
/* Custom responsive design using @screen */
@screen md {
  .container {
    max-width: 768px;
  }
}

@screen lg {
  .container {
    max-width: 1024px;
  }
}
```

- `@layer Directive`: The @layer directive organizes your custom styles into different layers: base, components, and utilities. This helps Tailwind manage the order in which styles are applied, ensuring that your custom styles override Tailwind’s defaults as intended.

```css
/* Custom styles in the `components` layer */
@layer components {
  .card {
    @apply border border-gray-200 p-4 rounded-lg shadow-md;
  }
}

/* Custom styles in the `utilities` layer */
@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
}
```
