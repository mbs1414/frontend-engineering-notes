# Pagination and Infinite Queries

## Paginated queries

Put page/cursor inputs into the query key.

```tsx
useQuery({
  queryKey: ['projects', { page }],
  queryFn: () => fetchProjects(page),
});
```

For smoother transitions, use the library's placeholder/previous-data patterns rather than manually copying remote data into component state.

## Infinite queries

`useInfiniteQuery` models pages that are loaded incrementally.

Key concerns:

- initial page parameter
- `getNextPageParam`
- `fetchNextPage`
- `hasNextPage`
- flattening/rendering pages
- avoiding duplicate load triggers

## Infinite scrolling vs virtualization

They solve different problems:

- infinite query/scroll → how much data is fetched
- virtualization → how many rendered DOM items exist at once

Large feeds may need both.

## Interview questions

1. Page-number vs cursor pagination?
2. Infinite query vs normal query?
3. Why include pagination parameters in the key?
4. Infinite scrolling vs virtualization?
