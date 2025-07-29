#### What is CSS ? - `completed`

#### How many way we can write the CSS ? - `completed`

#### What is Box model ? - `completed`

#### What are best design pattern ?

- **`BEM` (Block element modifier)**: create reusable and maintainable code by following a clear naming convention.
- **Block:** Represents a high-level component (e.g., nav, header).
- **Element:** A part of a block that performs a specific function (e.g., nav**link, header**title).
- **Modifier:** A flag on a block or element that changes its appearance or behavior (e.g., **nav\_\_link--active**).

```css
/* Block */
.nav {
}
/* Element */
.nav__link {
}
/* Modifier */
.nav__link--active {
}
```

- **Utility-First CSS (Tailwind Approach)**

```css
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  Click Me
</button>
```

- `OOCSS`(object oriented CSS)
- `SMACSS` (scalable and modular architecture)
  - `Base:` Defaults and reset styles.
  - `Layout`: Major layout components.
  - `Module`: Reusable components.
  - `State`: Styles that show changes in a component.
  - `Theme`: Variations for different themes.
- `Atomic css`: **Atomic CSS** is a utility-first approach where each class applies a single style

```css
.p-4 {
    padding: 1rem;
}
.bg-blue {
    background-color: blue;
}
/* Usage */
<div class="p-4 bg-blue">Content</div>
```

- `flex pattern`
- `grid pattern`
  Ans: https://bytegoblin.io/blog/css-design-patterns-for-web-developers

#### What are different type of selector in CSS ? - `completed`

#### What is combinators ? - `completed`

#### What do you understand by the universal sector? - `completed`

#### Define z-index. - `completed`

#### What is a CSS Preprocessor? What are Sass, Less, and Stylus? Why do people use them ? - `completed`

#### What is viewport ? - `completed`

Ans: the area of a computer screen or web page that's currently visible to the use.

#### What is VH/VW (viewport height/ viewport width) in CSS ? - `completed`

#### What are the benefits of CSS Sprites ? - `completed`

#### What are Pseudo classes ? - `completed`

#### what is sudo element ? - `completed`

#### Explain the positioning in css ? - `completed`

#### Differentiate between absolute and relative in CSS. - `completed`

#### How does Calc work? - `completed`

#### Difference between CSS grid vs flexbox - `completed`

#### Tell us about the property used for image scroll controlling? - `completed`

#### What is specificity ? `completed`

#### What is mixin and placeholder ? - `completed`

#### How to keep inner element in the center of parent element - `completed using flex`

#### What is block, inline, inline-block element ? - `completed`

#### What are css attcks ?

#### what are all screen size ?

- **320px — 480px:** Mobile devices
- **481px — 768px:** iPads, Tablets
- **769px — 1024px:** Small screens, laptops
- **1025px — 1200px:** Desktops, large screens
- **1201px and more:** Extra large screens, TV

https://www.simplilearn.com/tutorials/css-tutorial/css-interview-questions

#### what is box-sizing ?

Ans: `box-sizing` defines how the width and height of element to be calculated.

`box-sizing: border-box`: It include the padding and border in an element's total width and height.

```css
* {
  box-sizing: border-box;
}
```

`content-box`: `Default`. The width and height properties (and min/max properties) includes only the content. `Border and padding are not included`.
