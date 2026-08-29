# Flexbox & Grid

## Flexbox

Flexbox is primarily one-dimensional layout.

`flex-direction` defines the main axis.

- `justify-content`: main-axis distribution.
- `align-items`: cross-axis alignment.

```css
.container {
  display: flex;
  gap: 1rem;
  align-items: center;
}
```

Important item properties:

- `flex-grow`
- `flex-shrink`
- `flex-basis`

A common overflow surprise is flex items refusing to shrink below content size. `min-width: 0` is often needed on a child that must actually shrink.

## Grid

Grid is two-dimensional layout.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

Responsive pattern:

```css
grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
```

## Grid vs Flexbox

- Flexbox: one-dimensional flow/alignment.
- Grid: row/column structure.

They complement each other.

## Interview questions

1. Main vs cross axis?
2. `justify-content` vs `align-items`?
3. Grow/shrink/basis?
4. Grid vs Flexbox?
5. What does `1fr` mean conceptually?
