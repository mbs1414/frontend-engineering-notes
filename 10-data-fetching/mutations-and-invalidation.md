# Mutations and Invalidation

Queries read server state. Mutations change server state.

```tsx
const queryClient = useQueryClient();

const createTodo = useMutation({
  mutationFn: addTodo,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

Current TanStack Query documentation recommends invalidating related queries after successful mutations when those cached results may now be out of date.

## Mutation lifecycle

Important concepts:

- `mutationFn`
- variables passed to `mutate` / `mutateAsync`
- pending/success/error states
- `onMutate`
- `onSuccess`
- `onError`
- `onSettled`

## Invalidation vs direct cache update

### Invalidate

Use when the server is the easiest/most reliable source for the new truth.

### `setQueryData`

Use when the mutation response already contains enough canonical data to update a cached query immediately.

The decision is about correctness and complexity, not winning a contest for fewest network requests.

## Interview questions

1. Query vs mutation?
2. Why invalidate after a mutation?
3. Invalidation vs `setQueryData`?
4. `mutate` vs `mutateAsync`?
