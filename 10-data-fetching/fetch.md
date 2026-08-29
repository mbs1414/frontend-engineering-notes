# Fetch Fundamentals

## Basic request

```ts
const response = await fetch('/api/users');

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const users = await response.json();
```

`fetch()` rejects for network-level failures and aborts. It does **not** automatically reject just because the HTTP status is 404 or 500, so check `response.ok`/`status` yourself.

## Request lifecycle concerns

A production data layer must usually deal with more than "call endpoint":

- request parameters and serialization
- HTTP errors and business errors
- cancellation
- race conditions
- retries
- authentication
- parsing/validation
- caching and deduplication

A generic `useData<T>()` hook is useful for learning the mechanics, but once caching, refetching, mutation invalidation, and deduplication appear, a server-state abstraction such as TanStack Query is usually more appropriate.

## Generic hook example

The original Movie Hub `useData<T>` example is preserved in [Generics & Advanced Types](../02-typescript/generics-and-advanced-types.md#generics-in-reusable-data-fetching-code). Keep it there as a TypeScript/custom-hook learning exercise; this section focuses on the request lifecycle and why server-state libraries become useful as requirements grow.
