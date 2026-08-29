# Images, Fonts & Assets

## Responsive images

Use appropriately sized assets.

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  width="800"
  height="600"
  alt="..."
/>
```

Useful features:

- `srcset`
- `<picture>`
- modern formats where appropriate
- explicit width/height or aspect ratio
- `loading="lazy"` for offscreen images

## Do not lazy-load the LCP image blindly

The main above-the-fold image often needs early discovery. Lazy loading can delay it and worsen LCP.

## Fonts

Consider:

- file size
- unnecessary weights/styles
- subset strategy
- `font-display`
- fallback metrics/layout shift
- preload only critical files

Shipping twelve font weights is a charming way to make typography arrive after the user has navigated elsewhere.

## Icons

Avoid importing an entire icon library for two icons when tree-shakeable or targeted imports are available.

## Interview questions

1. Why set image dimensions?
2. Why can lazy loading hurt LCP?
3. What does `srcset` solve?
4. How can fonts contribute to layout shift?
