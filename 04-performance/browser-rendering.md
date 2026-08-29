# Browser Rendering Performance

## Pipeline

```text
DOM + CSSOM
   ↓
Style calculation
   ↓
Layout
   ↓
Paint
   ↓
Composite
```

## Layout

Calculates geometry: sizes and positions.

## Paint

Produces visual drawing instructions/output for text, backgrounds, borders, shadows, and more.

## Composite

Combines layers into the final frame.

Animations using `transform` and `opacity` can often avoid layout and may be cheaper than animating geometry properties. Do not add `will-change` everywhere; extra layers cost memory/resources.

## Layout thrashing

Repeatedly mixing layout reads and writes can force synchronous layout work.

```js
for (const el of elements) {
  const width = el.offsetWidth;      // read
  el.style.width = `${width + 1}px`; // write
}
```

Batch reads and writes where possible.

## `requestAnimationFrame`

```js
requestAnimationFrame(() => {
  element.style.transform = 'translateX(20px)';
});
```

Useful for frame-aligned visual updates.

## Interview questions

1. Layout vs paint vs composite?
2. Why are transforms often cheaper for animation?
3. What is layout thrashing?
4. When use `requestAnimationFrame`?
