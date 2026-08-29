# Study Roadmap

## Phase 1 — JavaScript

Study execution context, scope, hoisting, TDZ, closure, `this`, prototypes, event loop, promises, and async/await.

**Checkpoint:** explain asynchronous execution order without guessing.

## Phase 2 — React Core

Study render vs commit, state snapshots, batching, reconciliation, keys, effects, refs, context, Suspense, transitions, and memoization.

**Checkpoint:** explain why a component rendered and how to prove an optimization helped.

## Phase 3 — Browser & Network

Study DOM/CSSOM, layout/paint/composite, browser events, HTTP, caching, CORS, cookies, WebSocket/SSE, DNS/TLS.

**Checkpoint:** explain what happens from entering a URL to seeing an interactive page.

## Phase 4 — Performance

Study measurement tools, LCP/INP/CLS, bundle analysis, request waterfalls, image/font optimization, virtualization, and React Profiler.

## Phase 5 — TypeScript & Data Fetching

Study narrowing, generics, utility types, server state, cancellation, retry, invalidation, caching, and optimistic updates.

## Phase 6 — Algorithms

Study Big O, arrays/strings, Map/Set, stack/queue, recursion, binary search, two pointers, sliding window, trees, BFS and DFS.

Do not spend months on obscure competitive-programming topics unless a target company actually tests them. Humans already invented enough suffering.

## Phase 7 — Testing, HTML/CSS, Accessibility & Security

These areas distinguish production-level frontend work from merely making components render.

## Phase 8 — Architecture & System Design

Practice designing autocomplete, data tables, API clients, chat, uploaders, dashboards, authentication, and real-time interfaces.

## Added after second archive merge

### Testing deep dive

1. Testing fundamentals + AAA/boundaries
2. Test strategy and coverage
3. Vitest matchers/setup
4. Mocks/spies/timers/async
5. RTL semantic queries
6. userEvent + state transitions
7. MSW + API states
8. Form testing (React Hook Form/Zod mental model)
9. TanStack Query testing
10. Accessibility and browser E2E with Playwright

### TanStack Query deep dive

1. server-state mental model
2. query keys and query options
3. staleTime/gcTime/refetch defaults
4. mutations and invalidation
5. optimistic updates
6. pagination/infinite queries
7. prefetching and router integration
8. test query-driven UI through MSW and isolated QueryClients
