# Responsive Design & Stacking Context

## Responsive design

Adapt layout/content to available space and user/device capabilities.

```css
.card {
  display: block;
}

@media (min-width: 768px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

Prefer fluid tools where possible:

- percentages
- Grid/Flexbox
- `min()` / `max()` / `clamp()`
- intrinsic sizing
- responsive images

## Container queries

Allow a component to adapt to its container rather than only the viewport. Useful for reusable components placed in different layout regions.

## Breakpoints

Choose breakpoints based on where content/layout breaks, not a sacred device-width list copied from a framework.

## Stacking context

A stacking context is a local layering environment. A child cannot always escape it merely by setting a gigantic `z-index`.

Stacking contexts can be created by conditions/properties including positioned elements with z-index, transforms, opacity, filters, isolation, and other rules.

## Why `z-index: 999999` can fail

If a modal is inside a lower ancestor stacking context, its huge local z-index cannot outrank a separate higher ancestor context.

React portals are commonly used for overlays to avoid some intermediate clipping/stacking constraints, while accessibility/focus still must be handled.

## Interview questions

1. Media query vs container query?
2. What makes a breakpoint good?
3. What is a stacking context?
4. Why can huge z-index still lose?
5. Why are portals useful for overlays?
