# Server State

## What it is

Server state is remote data whose source of truth lives outside the browser.

Characteristics:

- asynchronous
- shared remotely
- can become stale
- can change without local code causing it
- needs caching/revalidation/error handling

Examples: users, orders, products, notifications.

## Local vs server state

Local UI:

```text
modal open?
selected tab?
draft text?
```

Server state:

```text
what users exist now?
what is order #123's status?
```

## Server-state concerns

- cache identity
- stale/fresh timing
- retry
- background refetch
- deduplication
- invalidation
- optimistic updates
- pagination/infinite data

## Avoid unnecessary copies

Bad default architecture:

```text
Query cache
  ↓ copy
Redux/Zustand
  ↓ copy
component state
```

Every copy creates synchronization work. Duplicate only when you intentionally need a transformed independent snapshot.

## URL state

Page/sort/filter/search often belongs in URL search params when it should survive refresh, sharing, and back/forward navigation.

## Interview questions

1. Why is server state different from client state?
2. What does stale data mean?
3. Why can copying query data into another store cause bugs?
