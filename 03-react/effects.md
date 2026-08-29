# React Effects

## What an Effect is for

An Effect synchronizes React with an external system after commit.

Examples:

- WebSocket
- network subscription/request lifecycle
- timers
- DOM/browser APIs
- event listeners
- third-party widgets

## Cleanup

The original note had the right pattern:

```text
WebSocket → close/unsubscribe
request   → AbortController
timer     → clearTimeout/clearInterval
listener  → removeEventListener
```

Example:

```tsx
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  return () => controller.abort();
}, [url]);
```

## Do not use effects for simple derivation

Bad:

```tsx
useEffect(() => {
  setFiltered(items.filter(matches));
}, [items, query]);
```

Usually better:

```tsx
const filtered = items.filter(matches);
```

Use `useMemo` only if the calculation is expensive or stable identity matters.

## Dependencies

Dependencies should describe reactive values used by the effect.

```tsx
useEffect(() => {
  subscribe(roomId);
  return () => unsubscribe(roomId);
}, [roomId]);
```

Do not delete dependencies merely to satisfy your preferred outcome. Refactor the effect instead.

## Stale closures

Effects capture values from the render where they were created. Missing dependencies can leave callbacks using old values.

## `useEffect` vs `useLayoutEffect`

- `useEffect`: most external synchronization.
- `useLayoutEffect`: DOM measurement/mutation that must happen before paint. It can block painting, so use sparingly.

## Strict Mode

Development can run setup/cleanup extra times to expose missing cleanup and impure logic.

## Race conditions

Multiple requests can finish out of order. Cancellation or request identity checks prevent older results from overwriting newer state.

## Interview questions

1. What problem should an effect solve?
2. Why return cleanup?
3. What is a stale closure?
4. Why is derived state in an effect often unnecessary?
5. `useEffect` vs `useLayoutEffect`?
