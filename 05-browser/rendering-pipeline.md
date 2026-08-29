# Browser Rendering Pipeline

## Parsing

HTML becomes a DOM. CSS contributes to a CSSOM/style representation.

Simplified path:

```text
HTML → DOM
CSS  → CSSOM
        ↓
style calculation
        ↓
layout
        ↓
paint
        ↓
composite
```

## Script loading

For classic external scripts:

- `defer`: downloads in parallel, runs after parsing, preserves deferred order.
- `async`: downloads in parallel and runs as soon as ready; order is not guaranteed.

Module scripts have their own semantics and behave as deferred by default in normal document loading.

## Rendering-blocking work

CSS can delay first rendering because the browser needs style information. JavaScript can block parsing/rendering depending on how it is loaded and how long it executes.

## Reflow/repaint language

"Reflow" generally refers to layout recalculation. "Repaint" refers to paint work. Prefer precise terms: style, layout, paint, composite.

## Interview questions

1. DOM vs CSSOM?
2. Why can CSS block rendering?
3. `async` vs `defer`?
4. What comes after layout?
