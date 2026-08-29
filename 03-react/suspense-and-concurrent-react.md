# Suspense & Concurrent React

## Concurrent rendering mental model

Modern React can prioritize, pause, restart, or abandon some rendering work before commit.

This does **not** mean React rendering suddenly executes on multiple CPU threads.

## `useTransition`

Marks updates as non-urgent.

```tsx
const [isPending, startTransition] = useTransition();

function handleChange(value: string) {
  setInput(value); // urgent
  startTransition(() => {
    setFilter(value); // lower priority
  });
}
```

Useful when expensive rendering competes with urgent input.

## `useDeferredValue`

```tsx
const deferredQuery = useDeferredValue(query);
```

Mental distinction:

```text
useTransition
I control the update being marked as a transition.

useDeferredValue
I already have a value and want a deferred version for slower UI.
```

## Suspense

Suspense coordinates fallback UI for Suspense-enabled pending dependencies.

```tsx
<Suspense fallback={<Spinner />}>
  <LazyPage />
</Suspense>
```

Common uses include lazy-loaded components and supported framework/data/server-rendering integrations.

Suspense is not a magical universal wrapper around arbitrary client fetch code.

## `React.lazy`

```tsx
const Settings = lazy(() => import('./Settings'));
```

Creates a component-level lazy/code-splitting boundary.

## Interview questions

1. What does a transition solve?
2. Transition vs deferred value?
3. Does concurrent rendering mean multithreaded React?
4. What does Suspense coordinate?
5. What does `React.lazy` change about loading?
