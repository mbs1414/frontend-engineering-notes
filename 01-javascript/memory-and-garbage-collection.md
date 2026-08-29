# Memory & Garbage Collection

## Reachability

JavaScript engines reclaim memory for objects that are no longer reachable from live roots.

Garbage collection does not mean memory leaks are impossible. You can accidentally keep objects reachable forever.

## Common frontend leaks

- listeners never removed
- intervals/timeouts never cleared
- subscriptions never unsubscribed
- WebSockets left open
- closures retaining large objects
- unbounded global caches
- detached DOM nodes still referenced

## Example

```js
function mount() {
  const largeData = new Array(100000).fill('x');
  window.addEventListener('resize', () => {
    console.log(largeData.length);
  });
}
```

Repeated mounts without cleanup can retain old closures and old `largeData` values.

## WeakMap / WeakSet

Weak collections do not strongly keep object keys alive.

```js
const metadata = new WeakMap();
metadata.set(element, { measured: true });
```

## React cleanup

```tsx
useEffect(() => {
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, []);
```

## Interview questions

1. What causes a JS memory leak?
2. Why can listeners leak memory?
3. Why can a garbage-collected language still leak?
4. When is WeakMap useful?
