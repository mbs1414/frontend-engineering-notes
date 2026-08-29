# Context & State Management

## Classify the state first

```text
Local UI state
Global client state
Server state
URL state
Form state
Persistent state
Derived state
```

Many state-management problems begin by choosing a library before identifying the type of state. Naturally, humans then create architecture to solve the architecture they just created.

## Context

Good for values such as:

- theme
- locale
- session/current user
- dependency/configuration objects
- scoped shared state

Consumers re-render when the consumed context value changes. A huge frequently changing context can create broad render work.

Possible fixes:

- split contexts by concern
- stabilize values where useful
- use selector-based external stores for high-frequency global state

## Redux Toolkit

Useful for explicit complex global client-state flows, middleware, predictable updates, and strong debugging/devtools.

## Zustand

Useful for relatively lightweight selector-based external client state.

## TanStack Query is different

TanStack Query primarily manages server state: async, cached, staleable remote data.

Do not copy query data into Redux/Zustand/local state without a concrete reason.

## URL state

Filters, pagination, sorting, and shareable search state often belong in search params so refresh/back-forward/share behavior works naturally.

## Interview questions

1. Context vs Redux?
2. Why is server state different?
3. When is URL state preferable?
4. Why can one giant context hurt performance?
