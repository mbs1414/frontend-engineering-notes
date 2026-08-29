# Query Caching, Freshness, and Defaults

## Fresh vs stale

Cached data can exist while being considered stale. "Stale" does not mean deleted; it means the library may refetch it when an appropriate trigger occurs.

## `staleTime`

Controls how long successfully fetched data remains fresh.

## `gcTime`

Controls how long an **inactive** query remains in memory before garbage collection. In TanStack Query v5, this is named `gcTime` (older material often called the setting `cacheTime`).

## Refetch triggers

Depending on configuration, stale queries can refetch on mount, window focus, or network reconnect.

## Retry

Retries are useful for transient failure, but retry policy should distinguish temporary infrastructure failures from permanent validation/auth/business failures where retrying is pointless.

## Course notes: Configuring React Query

### Overview

React Query provides many configuration options that control **how queries behave**. These settings determine:

- How many times a failed request should retry.
- How long cached data should stay in memory.
- When data becomes stale.
- When data should be automatically refetched.

These defaults work well for most applications but can be customized to fit your needs.

---

## Retry

### What is Retry?

If a request fails due to a temporary issue (e.g., network interruption or server error), React Query can automatically retry it.

```tsx
useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  retry: 3,
})
```

This means React Query will attempt the request **up to 3 additional times** before reporting an error.

#### Disable Retries

```tsx
retry: false
```

Useful when:

- An error is expected (e.g., 404 Not Found).
- Retrying would not change the result.

---

## Cache Time (`gcTime` in TanStack Query v5)

### What is Cache Time?

When no component is using a query anymore, the query becomes **inactive**.

React Query **does not immediately delete** the cached data. Instead, it keeps it in memory for a period of time.

```tsx
gcTime: 1000 * 60 * 5 // 5 minutes
```

If another component requests the same query during this time, React Query can reuse the cached data without making another network request.

---

## What is Garbage Collection?

**Garbage Collection (GC)** is the process of removing unused data from memory.

In React Query:

1. A component unmounts.
2. No components are using the query.
3. The query becomes **inactive**.
4. React Query starts the **gcTime** countdown.
5. If no component uses the query before the timer expires, the cached data is removed from memory.

```
Component mounted
        │
        ▼
 Data fetched & cached
        │
        ▼
Component unmounted
        │
        ▼
 Query becomes inactive
        │
        ▼
 Wait for gcTime
        │
        ▼
 Cache removed (Garbage Collection)
```

Think of `gcTime` as **"How long should React Query keep unused cached data before deleting it?"**

---

## Stale Time

### What is Stale Data?

React Query classifies cached data into two states:

- **Fresh**
- **Stale**

#### Fresh Data

Fresh data is considered up-to-date.

While data is fresh:

- React Query serves it directly from the cache.
- No automatic background refetch occurs due to freshness checks.

Example:

```tsx
staleTime: 1000 * 60 * 5
```

The data stays **fresh for 5 minutes** after a successful fetch.

---

#### Stale Data

After the `staleTime` expires, the cached data becomes **stale**.

> **Important:** Stale data is **not deleted**.

It simply means:

> "This data may be outdated. If an appropriate event occurs, React Query should check the server for a newer version."

Users still see the stale cached data immediately, avoiding unnecessary loading spinners.

---

## Fresh vs Stale Timeline

Suppose:

```tsx
staleTime: 5 minutes
```

```
0 min
│
├── Fetch data from server
│
├── Cache created
│
├── Data is FRESH
│
│────────────── 5 minutes ──────────────►
│
└── Data becomes STALE
```

Notice:

- The data remains in the cache.
- It is still displayed to the user.
- React Query simply knows it may need to be refreshed.

---

## What is Refetching?

**Refetching** means making another request to the server to retrieve the latest version of the data.

```
Server
   │
   ▼
Initial Request
   │
   ▼
Cache
   │
   ▼
User sees cached data

Later...

React Query
   │
   ▼
Refetch
   │
   ▼
Updated Server Data
   │
   ▼
Cache Updated
   │
   ▼
UI Automatically Updates
```

Refetching keeps the UI synchronized with the server while providing a smooth user experience.

---

## Why Show Stale Data Instead of a Loading Spinner?

Imagine a user opens a Todo list.

React Query:

1. Displays the cached data immediately.
2. Checks if the data is stale.
3. If stale, starts a background refetch.
4. If new data arrives, updates the UI automatically.

```
User opens page
       │
       ▼
Show cached todos immediately
       │
       ▼
Data is stale
       │
       ▼
Background refetch
       │
       ▼
Cache updated
       │
       ▼
UI rerenders automatically
```

The user never experiences unnecessary loading states if usable cached data is already available.

---

## Automatic Refetching

React Query can automatically refetch stale data when certain events occur.

### 1. Refetch on Window Focus

```tsx
refetchOnWindowFocus: true
```

Scenario:

- User switches to another browser tab.
- Data changes on the server.
- User returns to the application.

React Query detects the window has regained focus and refetches stale data.

```
Leave tab
    │
    ▼
Server data changes
    │
    ▼
Return to tab
    │
    ▼
React Query refetches
```

---

### 2. Refetch on Reconnect

```tsx
refetchOnReconnect: true
```

Scenario:

- Internet connection is lost.
- Requests cannot be completed.
- Internet reconnects.

React Query automatically retries by fetching fresh data once the connection is restored.

```
Offline
   │
   ▼
Server updates
   │
   ▼
Internet restored
   │
   ▼
React Query refetches
```

---

### 3. Refetch on Mount

```tsx
refetchOnMount: true
```

Scenario:

- User leaves a page.
- Component unmounts.
- User returns later.
- Component mounts again.

If the cached data is stale, React Query automatically refetches it.

```
Component mounts
      │
      ▼
Cached data exists
      │
      ▼
Is it stale?
      │
 ┌────┴────┐
 │         │
No        Yes
 │         │
 │      Background Refetch
 │         │
 ▼         ▼
Show cache  Update cache
```

---

## Relationship Between Cache, Freshness, and Refetching

These concepts work together:

| Concept                           | Purpose                                                  |
| --------------------------------- | -------------------------------------------------------- |
| **Cache**                         | Stores previously fetched data.                          |
| **Fresh Data**                    | Considered up-to-date; no freshness-triggered refetches. |
| **Stale Data**                    | Still usable but may be outdated.                        |
| **Refetch**                       | Fetches the newest data from the server.                 |
| **Garbage Collection (`gcTime`)** | Removes inactive cached data after a period of time.     |

---

## Best Practices

- Increase `staleTime` for data that rarely changes.
- Use shorter `staleTime` for frequently changing data.
- Don't disable automatic refetching unless you have a specific reason.
- Remember that **stale data is still valid data**—React Query shows it while checking for updates.
- Keep `gcTime` long enough to benefit from caching without retaining unused data indefinitely.

---

## Key Takeaways

- `retry` controls how many times failed requests are automatically retried.
- `staleTime` determines how long fetched data is considered **fresh**.
- Once `staleTime` expires, data becomes **stale**, but it remains cached and visible.
- **Refetching** retrieves the latest data from the server and updates the cache.
- React Query can automatically refetch when:
  - The window regains focus.
  - The network reconnects.
  - A component mounts.
- `gcTime` controls how long inactive cached data stays in memory before being removed by garbage collection.
- React Query prioritizes showing cached data immediately, then synchronizing it with the server in the background for a fast and seamless user experience.

## Interview questions

1. Fresh vs stale vs inactive vs garbage-collected?
2. `staleTime` vs `gcTime`?
3. Why can cached stale data still improve UX?
4. When should retries be disabled or customized?
