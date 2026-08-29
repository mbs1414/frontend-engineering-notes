# React Compiler & Modern APIs

## React Compiler

React Compiler analyzes React code and can automatically apply memoization-style optimizations where it can prove them safe.

It aims to reduce defensive/manual use of:

```text
React.memo
useMemo
useCallback
```

This does not remove the need to understand referential equality, render costs, stable identity, and profiling.

Compiler behavior depends on code following React rules and supported patterns.

Compiler-related directives include patterns such as:

```js
'use memo';
'use no memo';
```

Use them intentionally, not as ritual decoration.

## `use`

`use` can read supported resources such as promises/context in supported rendering patterns and integrates with Suspense/error boundaries.

## `useActionState`

Helps manage state produced by an action, commonly in form/action workflows.

## `useOptimistic`

Helps render an optimistic state while asynchronous work is pending.

Optimistic UI still needs failure/rollback behavior.

## `useFormStatus`

A React DOM hook for reading the status of a parent form/action, useful for pending submit UI without manually threading status through props.

## Server Components

Some component execution can remain on the server, reducing client JavaScript for server-only components and enabling server-side data composition patterns.

Important: Server Components are not universally the default in every React app. Framework/runtime architecture determines support and defaults.

## Interview questions

1. What problem does React Compiler target?
2. Why still understand manual memoization?
3. What is optimistic UI?
4. What happens if an optimistic mutation fails?
5. What are Server Components at a high level?
