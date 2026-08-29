# Query Keys and Query Options

## Query keys are cache identity

If a variable changes the returned data, it usually belongs in the key.

```tsx
useQuery({
  queryKey: ['projects', { page, status }],
  queryFn: () => fetchProjects({ page, status }),
});
```

A key such as `['projects']` while the query function silently depends on `page` is a cache-identity bug waiting to become an afternoon.

## Hierarchical keys

```text
['projects']
['projects', projectId]
['projects', 'list', filters]
```

Consistent structure makes targeted invalidation easier.

## `queryOptions()`

Current TanStack Query provides `queryOptions()` to co-locate a query key and query function while preserving strong TypeScript inference across hooks and QueryClient APIs.

```tsx
function projectOptions(id: number) {
  return queryOptions({
    queryKey: ['projects', id],
    queryFn: () => fetchProject(id),
    staleTime: 30_000,
  });
}
```

## `select`

Transform the observed data without changing the underlying query key/source identity.

```tsx
useQuery({
  ...projectOptions(id),
  select: project => project.name,
});
```

## Disabled/dependent queries

Use `enabled` or a type-safe disabling mechanism such as `skipToken` when a query cannot run until required input exists.

## Interview questions

1. What makes a good query key?
2. Why include filters/page/id in the key?
3. What problem does `queryOptions()` solve?
4. What is `select` for?
