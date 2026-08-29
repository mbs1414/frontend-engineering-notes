# Race Conditions and Cancellation

## The classic search race

```text
a   → request A
ab  → request B
abc → request C
```

Networks do not promise response order. C can finish first, then A, then B. If every response blindly calls `setData`, an older result can overwrite the newest one.

## Solutions

### Abort obsolete requests

Abort the previous request when the input/query changes.

### Request identity / sequence number

Only accept the response that belongs to the latest request.

```ts
let latestRequest = 0;

async function search(query: string) {
  const requestId = ++latestRequest;
  const result = await searchApi(query);

  if (requestId === latestRequest) {
    render(result);
  }
}
```

### Let a server-state library manage query identity

TanStack Query associates results with query keys and supplies cancellation signals to query functions. You still need to model the query key correctly.

## Debounce is not cancellation

Debouncing reduces how often a function starts. It does not guarantee that responses arrive in the same order as requests.

## Interview questions

1. Why can search results appear out of order?
2. Debounce vs cancellation?
3. What does an `AbortSignal` represent?
4. How can request identity solve stale-response bugs?
