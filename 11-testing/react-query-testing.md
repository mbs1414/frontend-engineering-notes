<div dir="rtl" align="right">

# تست <span dir="ltr">UI</span> وابسته به <span dir="ltr">Query</span> — <span dir="ltr">cache</span> مستقل، شبکه کنترل‌شده

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">TanStack Query</span>](../10-data-fetching/tanstack-query-fundamentals.md)، [<span dir="ltr">MSW</span>](./msw.md).

اگر <span dir="ltr">cache</span> مشترک بین تست‌ها باقی بماند، تست دوم ممکن است به جای درخواست مورد انتظار، داده تست اول را ببیند. برای هر تست <span dir="ltr">QueryClient</span> تازه بساز.

## مثال اول: <span dir="ltr">wrapper</span>

<div dir="ltr" align="left">

~~~jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
function renderWithQuery(ui) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return {
    client,
    ...render(
      <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
    ),
  };
}
~~~

</div>

<span dir="ltr">retry</span> در تست مسیر خطا خاموش است تا چند تلاش پنهان، زمان و انتظار تست را عوض نکنند. این انتخاب تست است؛ تنظیم <span dir="ltr">production</span> را خودکار تغییر نمی‌دهیم.

## مثال دوم: رفتار کاربر

<div dir="ltr" align="left">

~~~jsx
// با Users واقعی و handler موفق MSW:
renderWithQuery(<Users />);
expect(await screen.findByText('Sara')).toBeInTheDocument();
~~~

</div>

<span dir="ltr">screen</span> و <span dir="ltr">matcher</span>ها نیازمند <span dir="ltr">setup</span> درس <span dir="ltr">RTL</span> هستند. برای <span dir="ltr">mutation</span>، کلیک واقعی، پاسخ کنترل‌شده و نتیجه نهایی <span dir="ltr">UI</span> را بررسی کن. اگر <span dir="ltr">invalidate</span> را <span dir="ltr">mock</span> کنی ولی درخواست و تغییر <span dir="ltr">UI</span> را نبینی، اطمینان محدودتری داری.

## پاسخ مصاحبه و تمرین

چرا تست ۵۰۰ ممکن است دیر به پیام خطا برسد؟

<details>
<summary>پاسخ</summary>

<span dir="ltr">retry</span> و تأخیرهای آن را بررسی کن. همچنین <span dir="ltr">query function</span> باید پاسخ ۵۰۰ را <span dir="ltr">throw</span> کند؛ <span dir="ltr">fetch</span> به‌تنهایی این کار را نمی‌کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Testing TanStack Query Components

Use a fresh `QueryClient` per test/helper to avoid cache pollution between tests. Disable or reduce retries in tests when retries would unnecessarily slow expected failure scenarios.

## Course notes: React Query Components

### Overview

React Query (now called **TanStack Query**) dramatically simplifies data fetching in React.

Instead of manually managing:

- Loading state
- Error state
- Data state
- Caching
- Background refetching
- Retries

React Query handles these concerns automatically.

Because of this, our tests become simpler as well.

---

## Before React Query

Without React Query, the component is responsible for managing several pieces of state.

```tsx
const [products, setProducts] = useState<Product[]>([])
const [isLoading, setLoading] = useState(false)
const [error, setError] = useState("")
```

The component also performs the request manually.

```tsx
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true)

      const { data } =
        await axios.get("/products")

      setProducts(data)

      setLoading(false)
    } catch (error) {
      setLoading(false)

      ...
    }
  }

  fetchProducts()
}, [])
```

#### Responsibilities

The component is responsible for:

- Starting the request.
- Managing loading state.
- Handling success.
- Handling errors.
- Updating state.
- Triggering re-renders.

This leads to repetitive boilerplate.

---

## After React Query

```tsx
const {
  data: products,
  isLoading,
  error,
} = useQuery<Product[], AxiosError>({
  queryKey: ["/products"],

  queryFn: async () => {
    const { data } = await axios.get<Product[]>("/products")

    return data
  },
})
```

The component no longer manages state manually.

React Query provides:

- `data`
- `isLoading`
- `error`

automatically.

---

## Benefits

Without React Query:

```text
Component
    ↓
Request
    ↓
Loading
    ↓
Success/Error
    ↓
Caching
    ↓
Retry
```

Everything is implemented manually.

---

With React Query:

```text
Component
      ↓
useQuery()
      ↓
React Query
      ↓
Loading
Caching
Retries
Refetching
Errors
```

Much less application code is required.

---

## queryKey

```tsx
queryKey: ["/products"]
```

The query key uniquely identifies cached data.

React Query stores:

```text
"/products"
      ↓
Cached Response
```

Whenever another component requests the same key, React Query can reuse the cached data.

---

## queryFn

```tsx
queryFn: async () => {
  const { data } = await axios.get<Product[]>("/products")

  return data
}
```

The query function tells React Query how to fetch the data.

React Query calls this function whenever the query needs to run.

---

## React Query Requires a Provider

Unlike components using plain `useEffect`, components using `useQuery` **must** be wrapped in a `QueryClientProvider`.

```tsx
<QueryClientProvider client={client}>
  <ProductList />
</QueryClientProvider>
```

Without this provider, React Query throws an error because no query client is available.

---

## Creating a QueryClient

```tsx
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
```

Every test creates its own isolated query client.

This prevents:

- Shared cache
- Shared state
- Cross-test interference

---

## Why Disable Retries?

By default, React Query retries failed requests.

```text
Request
   ↓
Fail
   ↓
Retry
   ↓
Retry
   ↓
Retry
```

This is useful in production because temporary network failures may resolve themselves.

---

### Problem During Testing

Suppose the server intentionally returns an error.

```tsx
server.use(http.get("/products", () => HttpResponse.error()))
```

React Query will retry several times before reporting the failure.

Consequences:

- Slower tests.
- Longer waits.
- Unexpected timeouts.

---

### Solution

Disable retries.

```tsx
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
```

Now the request fails immediately.

Tests become:

- Faster.
- More deterministic.
- Easier to understand.

---

## Creating a renderComponent Helper

Instead of repeating:

```tsx
const client = new QueryClient(...)

render(
  <QueryClientProvider client={client}>
    <ProductList />
  </QueryClientProvider>
)
```

inside every test, extract it.

```tsx
const renderComponent = () => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  render(
    <QueryClientProvider client={client}>
      <ProductList />
    </QueryClientProvider>,
  )
}
```

---

## Why Use a Helper?

Benefits:

- Removes duplication.
- Easier maintenance.
- Every test gets a fresh client.
- Improves readability.

---

## Existing Tests Still Work

Notice that most tests remain unchanged.

Example:

```tsx
const items = await screen.findAllByRole("listitem")

expect(items.length).toBeGreaterThan(0)
```

The only difference is how the component is rendered.

---

## Error Test

```tsx
server.use(http.get("/products", () => HttpResponse.error()))

renderComponent()

const error = await screen.findByText(/error/i)

expect(error).toBeInTheDocument()
```

React Query exposes the error through:

```tsx
error.message
```

The UI behaves exactly as before.

---

## Loading Test

```tsx
server.use(
  http.get("/products", async () => {
    await delay(100)

    return HttpResponse.json([])
  }),
)

renderComponent()

const loading = await screen.findByText(/loading/i)

expect(loading).toBeInTheDocument()
```

The behavior remains identical.

---

## Removing the Loading Indicator

```tsx
await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
```

Works exactly the same because the UI behavior hasn't changed.

---

## Testing Philosophy

Notice that none of the tests check:

- React Query cache
- Internal query state
- Retry logic
- React Query internals

Instead, they verify what users observe:

- Products
- Loading indicator
- Error message
- Empty state

This follows the core principle:

> Test behavior, not implementation.

Changing from:

```tsx
useEffect()
```

to:

```tsx
useQuery()
```

required almost no changes to the tests because the component's behavior stayed the same.

---

## Why Is This Important?

A well-written test should survive internal refactoring.

Before:

```text
useEffect
```

↓

After:

```text
React Query
```

↓

Tests still pass ✅

This demonstrates that the tests are focused on behavior rather than implementation details.

---

## Best Practices

- Wrap components using React Query with `QueryClientProvider`.
- Create a new `QueryClient` for every test.
- Disable retries during testing.
- Use a `renderComponent()` helper to avoid duplication.
- Continue using MSW to mock network requests.
- Test the UI, not React Query internals.
- Ensure each test is isolated from cached query data.

---

## Key Takeaways

- React Query eliminates much of the boilerplate required for data fetching.
- Components using `useQuery()` must be wrapped in a `QueryClientProvider`.
- Each test should create its own `QueryClient` to avoid shared cache.
- Disable retries (`retry: false`) to make tests faster and more predictable.
- Existing UI tests usually require minimal changes when migrating from `useEffect` to React Query.
- Good tests focus on user-visible behavior, making them resilient to implementation refactoring.

## Recommended helper shape

```tsx
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}
```

Then render through a provider created for that test.

## What to test

Prefer UI behavior driven by query state. For query/mutation integration, MSW can model real request/response behavior without mocking TanStack Query itself.

</div>

</details>

</div>
