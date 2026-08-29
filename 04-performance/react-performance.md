# React Performance

## Start with architecture

Before memoization ask:

- Is rapidly changing state too high in the tree?
- Is one context invalidating too many consumers?
- Are huge lists fully rendered?
- Are effects causing redundant updates?
- Is expensive work repeated?
- Are memoized children receiving new references every render?

## `React.memo`

```tsx
const UserCard = memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});
```

New object props defeat reference equality:

```tsx
<UserCard user={{ name: 'A' }} />
```

## `useMemo`

Caches a calculation result until dependencies change.

```tsx
const filtered = useMemo(
  () => expensiveFilter(items, query),
  [items, query],
);
```

Useful when computation is expensive or stable identity matters.

Usually pointless:

```tsx
const fullName = useMemo(
  () => `${firstName} ${lastName}`,
  [firstName, lastName],
);
```

The bookkeeping can cost more than trivial work.

## `useCallback`

Caches a function reference.

```tsx
const onSelect = useCallback((id: number) => {
  setSelectedId(id);
}, []);
```

Useful when stable identity matters downstream, often with memoized children or dependencies.

## Debounce vs throttle

**Debounce:** wait until calls stop for a duration.

Good for search, autosave, delayed validation.

**Throttle:** allow at most one execution per interval.

Good for scroll, pointer movement, resize.

Know leading/trailing behavior and cancellation.

## Virtualization

With 100,000 rows, render only the visible window plus overscan.

Concepts:

- viewport
- overscan
- fixed vs dynamic height
- measurement
- scroll position

Pagination controls data pages. Infinite scroll controls fetching. Virtualization controls DOM size.

## Lazy loading

```tsx
const Reports = lazy(() => import('./Reports'));
```

Avoid shipping code before the user needs it.

## Profiler

Use React Profiler to answer:

- which components rendered?
- how expensive was the commit?
- why did they render?
- did the optimization improve anything?

## Interview questions

1. `memo` vs `useMemo` vs `useCallback`?
2. When can memoization be useless?
3. How would you optimize a huge table?
4. Debounce vs throttle?
5. Pagination vs virtualization?
6. How would you prove an optimization worked?
