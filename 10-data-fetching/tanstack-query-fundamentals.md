# TanStack Query Fundamentals

TanStack Query manages **server state**: asynchronous data whose source of truth lives outside the client application.

It handles concerns such as caching, request deduplication, freshness, background refetching, retries, invalidation, mutations, and query lifecycle.

It is not a replacement for every local UI state value.

## QueryClientProvider

```tsx
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

## `useQuery`

```tsx
const todosQuery = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});
```

Prefer letting the query function's return type drive inference when possible instead of manually specifying generic arguments everywhere.

## Custom query hooks

A domain hook keeps query details out of presentational components:

```tsx
export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
}
```

## Course notes: Fetching Data with `useQuery`

### Overview

`useQuery` is the primary hook provided by **TanStack Query (React Query)** for fetching and managing server state.

It handles:

- Fetching data
- Loading state
- Error state
- Caching
- Background refetching
- Automatic retries

This eliminates much of the boilerplate required when using `useEffect` and `useState`.

---

## Defining the Data Type

When fetching data in TypeScript, define an interface representing the API response.

```tsx
interface Todo {
  id: number
  title: string
  userId: number
  completed: boolean
}
```

This provides:

- Type safety
- IntelliSense
- Compile-time error checking

---

## Creating the Query Function

The **query function** is responsible for fetching and returning data.

```tsx
const fetchTodos = () => {
  return axios
    .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.data)
}
```

#### Why return `res.data`?

Axios returns an `AxiosResponse` object:

```ts
{
  data,
  status,
  headers,
  ...
}
```

React Query should receive only the actual data, so return:

```tsx
res.data
```

instead of the full response.

---

## Generic Type Arguments

`useQuery` accepts generic type arguments to specify the types of the returned data and possible errors.

```tsx
useQuery<Todo[], Error>()
```

#### First Generic Argument

```tsx
Todo[]
```

Represents the type of the successful response.

As a result:

```tsx
data
```

is inferred as:

```tsx
Todo[] | undefined
```

---

#### Second Generic Argument

```tsx
Error
```

Represents the type of the error object.

Therefore:

```tsx
error.message
```

is fully type-safe.

---

## Using `useQuery`

```tsx
const { data, isLoading, error } = useQuery<Todo[], Error>({
  queryKey: ["todos"],
  queryFn: fetchTodos,
})
```

---

## `queryKey`

Every query needs a unique key.

```tsx
queryKey: ["todos"]
```

React Query uses this key to:

- Cache data
- Identify queries
- Refetch data
- Invalidate cached data
- Share cached data across components

Think of the query key as the unique identifier for a query.

---

## `queryFn`

```tsx
queryFn: fetchTodos
```

The function responsible for fetching data.

It should:

- Return a Promise
- Return the actual data (`res.data`)
- Throw an error if the request fails

---

## Returned Values

### `data`

```tsx
data
```

Contains the fetched data.

Initially:

```tsx
undefined
```

After the request succeeds:

```tsx
Todo[]
```

Example:

```tsx
data?.map((todo) => <li key={todo.id}>{todo.title}</li>)
```

---

### `isLoading`

```tsx
isLoading
```

A boolean indicating whether the query is loading for the first time.

Example:

```tsx
if (isLoading) return <p>Loading...</p>
```

---

### `error`

```tsx
error
```

Contains the error object if the request fails.

Example:

```tsx
if (error) return <p>{error.message}</p>
```

---

## Complete Example

```tsx
interface Todo {
  id: number
  title: string
  userId: number
  completed: boolean
}

const fetchTodos = () => {
  return axios
    .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.data)
}

const TodoList = () => {
  const { data, isLoading, error } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  })

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>{error.message}</p>

  return (
    <ul>
      {data?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

---

## Best Practices

- Always define interfaces for API responses.
- Return `res.data` instead of the entire Axios response.
- Give every query a unique and descriptive `queryKey`.
- Keep the query function separate from the component for better reusability.
- Specify generic types to get full TypeScript support.
- Handle loading and error states before rendering the data.

---

## Key Takeaways

- `useQuery` is the core hook for fetching server data with React Query.
- The first generic type specifies the shape of the returned data.
- The second generic type specifies the error type.
- `queryFn` performs the data fetching and returns a Promise.
- `queryKey` uniquely identifies and caches a query.
- `data`, `isLoading`, and `error` provide everything needed to render the UI based on the query state.

## Course notes: Creating Custom Query Hooks

### Overview

One of the core principles of React development is **Separation of Concerns**.

When using React Query, **components should focus on rendering UI**, while **custom hooks should handle data-fetching logic**.

Instead of placing `useQuery` directly inside a component, extract it into a reusable custom hook.

---

## What is Separation of Concerns?

**Separation of Concerns (SoC)** is a design principle that encourages dividing an application into distinct sections, where each section has a single responsibility.

For example:

- **Components** → Render the UI.
- **Custom Hooks** → Fetch and manage server data.
- **Services/API Clients** → Make HTTP requests.

Keeping these responsibilities separate makes code easier to understand, maintain, and reuse.

---

## The Problem: Query Logic Leaks into the Component

Consider the following component:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
})
```

Although this works, the component now knows about:

- How data is fetched
- Which endpoint is called
- The query key
- The query function

This means the **querying logic has leaked into the UI layer**.

As the application grows, components become cluttered with implementation details instead of focusing solely on rendering.

---

## Solution: Extract the Query into a Custom Hook

Move the querying logic into a dedicated hook.

```tsx
const useTodos = () => {
  const fetchTodos = () => {
    return axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data)
  }

  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  })
}
```

Now the component only consumes the hook:

```tsx
const { data, isLoading, error } = useTodos()
```

The component no longer needs to know **how** the data is fetched—it simply uses the data.

---

## Benefits of Custom Query Hooks

### Cleaner Components

Components become focused on displaying data rather than fetching it.

```tsx
const TodoList = () => {
  const { data, isLoading, error } = useTodos()

  // Render UI...
}
```

---

### Reusability

The same hook can be used in multiple components.

```tsx
const todos = useTodos()
```

No need to duplicate query logic.

---

### Better Maintainability

If the API endpoint changes:

```tsx
"/todos"
```

Only the custom hook needs to be updated.

Every component using the hook benefits automatically.

---

### Encapsulation

Implementation details remain hidden.

Consumers only care about the returned query state:

```tsx
const { data, error, isLoading } = useTodos()
```

They don't need to know:

- Which HTTP client is used
- Which endpoint is called
- How caching is configured
- Which query key is used

---

### Easier Testing

Custom hooks can be tested independently of UI components.

Components can focus on rendering behavior while hooks handle server interactions.

---

## Folder Structure Example

```
src/
│
├── hooks/
│   └── useTodos.ts
│
├── services/
│   └── api-client.ts
│
└── components/
    └── TodoList.tsx
```

This organization keeps responsibilities clearly separated.

---

## Best Practices

- Create one custom hook for each resource (e.g., `useTodos`, `useUsers`, `useGames`).
- Keep components focused on rendering.
- Hide React Query configuration inside custom hooks.
- Reuse hooks across multiple components instead of duplicating queries.
- Keep API request logic separate from UI logic.

---

## Key Takeaways

- **Separation of Concerns** improves code organization by giving each part of the application a single responsibility.
- Query logic should **not** live inside UI components.
- Extract `useQuery` into reusable custom hooks.
- Components become simpler, cleaner, and easier to maintain.
- Custom query hooks improve reusability, encapsulation, and testability.

## TanStack Query v5 status flags

The older course examples emphasize `isLoading`. In v5, know the distinction:

- `isPending` means the query has no successful data yet (`status === "pending"`).
- `isFetching` means the query function is currently executing, including background refetches.
- `isLoading` is the first-fetch condition and is derived from `isPending && isFetching`.
- `isRefetching` represents a fetch that is not the initial pending fetch.

For the common initial-screen branch, current examples often use `isPending`. For a disabled/lazy query, `isLoading` can be more precise because a disabled query may be pending without actually fetching.

## What was missing from the original course folder

The original `Why-React-Query.md` was empty. The key reason is not merely "less `useEffect`". The library gives server state a lifecycle model: identity, freshness, cache retention, invalidation, background synchronization, mutation handling, and reusable async state.

## Interview questions

1. Client state vs server state?
2. What does `useQuery` own that plain `fetch` does not?
3. Why extract a domain-specific query hook?
4. Why should a query function return/throw predictably?
