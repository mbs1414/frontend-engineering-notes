# CSS Core

## Cascade

The cascade decides which declaration wins using factors such as origin/importance, cascade layers, specificity, and source order.

"Highest specificity wins" is incomplete.

## Specificity

Conceptually:

- IDs have high selector specificity.
- classes/attributes/pseudo-classes outrank element selectors.
- inline styles have high author precedence.
- `!important` changes normal precedence rules and should be deliberate.

## Inheritance

Some properties inherit naturally, especially many text-related properties. Others do not.

## Box model

```text
margin
 border
  padding
   content
```

With:

```css
box-sizing: border-box;
```

specified width/height include padding and border.

## Positioning

- `static`
- `relative`
- `absolute`
- `fixed`
- `sticky`

Absolutely positioned elements use a containing block determined by layout rules, often influenced by positioned ancestors.

## Overflow

`overflow` affects clipping/scrolling and can change sticky positioning/scroll-container behavior.

## CSS variables

```css
:root {
  --space-md: 1rem;
}

.card {
  padding: var(--space-md);
}
```

They participate in the cascade and are useful for design tokens/themes.

## Interview questions

1. Explain the box model.
2. What decides which CSS rule wins?
3. Absolute positioning is relative to what?
4. Why use `border-box`?
