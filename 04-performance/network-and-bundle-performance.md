# Network & Bundle Performance

## Network goals

- send fewer bytes
- send critical bytes earlier
- cache reusable resources
- avoid request waterfalls
- compress responses
- reduce unnecessary round trips
- serve static assets via CDN where useful

## Compression

Distinguish:

```text
raw source size
minified size
compressed transfer size (gzip/Brotli)
```

## Preload vs prefetch

**Preload:** important resource for the current navigation.

**Prefetch:** speculative lower-priority resource likely needed later.

Preloading everything just creates a traffic jam earlier.

## Request waterfalls

Bad when independent work waits unnecessarily:

```text
HTML
 ↓
JS
 ↓
API A
 ↓
API B
```

Run independent requests in parallel.

## Bundle optimization

Important techniques:

- tree shaking / dead-code elimination
- route-level code splitting
- component-level dynamic imports
- removing/replacing heavy dependencies
- duplicate-version analysis
- content hashing
- minimizing initial critical chunks

```js
const module = await import('./heavy-feature.js');
```

## Initial vs total bundle

A smaller total application is good, but reducing the initial critical JavaScript often matters more for first load.

## Analyze, don't guess

Use a bundle analyzer to inspect large modules, duplicate packages, and whether lazy boundaries actually created separate chunks.

## Interview questions

1. Tree shaking vs code splitting?
2. Preload vs prefetch?
3. What is a request waterfall?
4. Why are content-hashed assets useful?
5. Why does initial bundle size matter?
