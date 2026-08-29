# Original Notes Migration & Corrections

This file records the most important corrections made while restructuring the original notes.

## `useMemo`

`useMemo` caches the **result of a calculation** between renders until dependencies change. It is useful when the calculation is meaningfully expensive or when stable reference identity matters downstream.

It is not automatically useful for cheap expressions.

## `useCallback`

`useCallback` caches a **function reference**, not the function's returned value.

## `useState` vs `useRef`

Both persist across renders.

- Updating state schedules a render.
- Updating `ref.current` does not schedule a render.
- A normal local variable is recreated during each render.

This corrects the original note that implied state is reinitialized every render.

## Derived state

Better rule:

> Do not store a second copy of information that can be calculated from current props/state unless you intentionally need an independent snapshot or lifecycle.

## Virtualization

These are different concepts:

- Pagination controls pages/data chunks.
- Infinite scroll controls when more data is fetched.
- Virtualization controls how many DOM nodes are rendered.

They can be combined.

## Effects

The original cleanup examples were correct and are preserved:

- WebSocket → unsubscribe/close
- request → AbortController
- timer → clear timer
- event listener → remove listener

The new notes also cover stale closures, dependency arrays, Strict Mode behavior, race conditions, and `useEffect` vs `useLayoutEffect`.

## Closure

Closure is not merely "a function inside another function."

A closure exists when a function retains access to its lexical environment even after execution has left that environment.

## BFF vs GraphQL

- BFF is an architectural pattern.
- GraphQL is an API/query technology.
- A BFF can expose REST, GraphQL, RPC, or another interface.

## Microfrontends

Module Federation is one possible implementation technique. It is not the definition of microfrontends.

## Server Components

React Server Components are not universally the default in every React application. Availability and default behavior depend on the framework/runtime architecture.

## Performance

The original notes focused mostly on React performance. The expanded notes add:

- browser rendering
- Core Web Vitals
- network performance
- bundle loading
- images/fonts/assets
- measurement and profiling

## Major areas added

1. Event loop and async JavaScript
2. Browser internals
3. Networking and HTTP caching
4. TypeScript
5. Algorithms/data structures
6. HTML/CSS foundations
7. Accessibility
8. Security
9. Server-state/data-fetching concepts
10. Frontend system design

# Second archive merge (2026-08-29)

A second Markdown archive was merged into this knowledge base. Its strongest material was JavaScript testing, React Testing Library, MSW, forms testing, custom hooks, TypeScript generics/index signatures, and introductory TanStack Query.

See [`MERGE-REPORT.md`](./MERGE-REPORT.md) for the exact source-to-destination mapping and corrections.
