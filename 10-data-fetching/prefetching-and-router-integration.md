# Prefetching and Router Integration

## Prefetching

Prefetch likely-needed server data before the user reaches the destination.

Examples:

- hover/focus a link
- route loader knows the next screen's dependencies
- prefetch the next page of a list

Prefetching should be intentional. Fetching the entire internet "just in case" is not latency optimization.

## Router loaders vs TanStack Query

A router loader coordinates **navigation**: what must be ready for a route, redirects, route-level errors, URL inputs, and pending navigation.

TanStack Query coordinates **server-state cache lifecycle**.

They can work together. A route loader can call QueryClient APIs to ensure/prefetch query data, while components consume the same cached query definition.

## Avoid request waterfalls

If child data requirements are predictable at route level, starting them earlier can reduce sequential waits.

## Interview questions

1. What is prefetching?
2. What is a request waterfall?
3. Router loader vs query cache responsibility?
4. What are the costs of aggressive prefetching?
