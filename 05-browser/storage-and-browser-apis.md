# Storage & Browser APIs

## Storage choices

### `localStorage`

- string key/value
- synchronous
- persistent until cleared
- accessible to same-origin JavaScript

### `sessionStorage`

Similar but scoped to the tab/session lifetime.

### Cookies

Small values that can be automatically attached to requests and support `HttpOnly`, `Secure`, and `SameSite` attributes.

### IndexedDB

Asynchronous structured browser database, useful for larger/offline local datasets.

### Cache Storage

Stores Request/Response pairs, commonly used with Service Workers. It is not the same as browser HTTP cache or TanStack Query cache.

## Useful browser APIs

### `requestAnimationFrame`

Schedules frame-aligned visual work.

### `IntersectionObserver`

Observe element visibility/intersection. Useful for lazy loading and infinite-scroll sentinels.

### `ResizeObserver`

Observe element size changes.

### `MutationObserver`

Observe DOM mutations. Useful for integrations/tooling, not as a replacement for React state.

### `PerformanceObserver`

Observe performance entries for telemetry/measurement.

### History and URL

Client routers build on browser navigation/history mechanisms.

```js
const url = new URL(location.href);
url.searchParams.set('page', '2');
```

## Interview questions

1. localStorage vs cookies vs IndexedDB?
2. Cache Storage vs HTTP cache?
3. IntersectionObserver vs scroll listener?
4. What does a client router rely on in the browser?
