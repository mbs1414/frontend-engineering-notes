# Core Web Vitals

## LCP — Largest Contentful Paint

Represents loading speed of the main/largest relevant viewport content.

Common causes of poor LCP:

- slow server/TTFB
- render-blocking resources
- oversized hero image
- late-discovered critical resource
- heavy client-rendering delay

## INP — Interaction to Next Paint

Represents responsiveness across user interactions.

Common causes:

- long JavaScript tasks
- expensive handlers
- large synchronous React renders
- costly layout/paint after input

Improve by reducing/splitting work, preventing unnecessary renders, and deprioritizing non-urgent work.

## CLS — Cumulative Layout Shift

Represents unexpected layout movement.

Common causes:

- images without reserved dimensions/aspect ratio
- injected content above existing content
- ads/embeds without reserved space
- font swaps/layout changes

## Other useful metrics

- **FCP**: first content appears.
- **TTFB**: response timing until first byte.
- **TBT**: lab metric related to main-thread blocking.

## Rule

Metrics identify symptom categories. They do not identify the root cause by themselves. Use traces, network timing, and profiling.

## Interview questions

1. What do LCP, INP, and CLS measure?
2. Three causes of poor LCP?
3. How can JS hurt INP?
4. Why do image dimensions help CLS?
