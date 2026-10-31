<div dir="rtl" align="right">

# چه زمانی متن نتیجه روی صفحه ظاهر می‌شود؟ — <span dir="ltr">Async React Testing</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">RTL</span>](./react-testing-library.md) و [<span dir="ltr">Async Testing</span>](./async-testing.md).

به‌روزرسانی ناشی از پاسخ شبکه همین لحظه کامل نیست. تست باید به حالت قابل مشاهده منتظر بماند، نه مدت تصادفی.

## مثال اول: نتیجه دریافت

<div dir="ltr" align="left">

~~~jsx
// الگوی تست componentی به نام Users با API کنترل‌شده:
render(<Users />);
expect(screen.getByText('در حال دریافت…')).toBeInTheDocument();
expect(await screen.findByText('Sara')).toBeInTheDocument();
~~~

</div>

<span dir="ltr">Users</span> باید <span dir="ltr">component</span> واقعی پروژه باشد و پاسخ <span dir="ltr">API</span> در تست کنترل شود. اگر عنصر از ابتدا موجود است <span dir="ltr">getBy</span>؛ اگر بعداً ظاهر می‌شود <span dir="ltr">findBy</span> مناسب است.

## مثال دوم: انتظار برای <span dir="ltr">assertion</span> دیگر

<div dir="ltr" align="left">

~~~jsx
await waitFor(() => {
  expect(onSaved).toHaveBeenCalledWith({ name: 'Sara' });
});
~~~

</div>

<span dir="ltr">waitFor</span> از <span dir="ltr">RTL import</span> می‌شود و <span dir="ltr">callback</span> را تا پاس شدن یا <span dir="ltr">timeout</span> تکرار می‌کند. برای ادامه <span dir="ltr">retry</span> معمولاً <span dir="ltr">assertion</span> باید <span dir="ltr">throw</span> کند؛ صرف <span dir="ltr">return false</span> کافی نیست. کلیک و ارسال را بیرون <span dir="ltr">callback</span> بگذار تا با هر <span dir="ltr">retry</span> دوباره اجرا نشوند.

برای ناپدید شدن عنصری که وجود دارد، <span dir="ltr">waitForElementToBeRemoved</span> یا <span dir="ltr">waitFor</span> با <span dir="ltr">query</span> مناسب کمک می‌کند. ابزارهای <span dir="ltr">RTL</span> معمولاً <span dir="ltr">act</span> را پوشش می‌دهند؛ هشدار <span dir="ltr">act</span> را با تأخیر تصادفی پنهان نکن، عملیات منتظرمانده یا <span dir="ltr">timer</span> را پیدا کن.

## پاسخ مصاحبه و تمرین

اگر دکمه فقط بعد از <span dir="ltr">fetch</span> ظاهر می‌شود، <span dir="ltr">getByRole</span> فوری مناسب است؟

<details>
<summary>پاسخ</summary>

خیر، اگر انتظار ظهور آینده داریم از <span dir="ltr">await screen.findByRole</span> استفاده کن. این انتظار باید نتیجه همان عمل تست باشد، نه پوشاندن یک مشکل مبهم.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Testing Async React UI

Async UI tests should assert the lifecycle users can observe: pending/loading, success, empty, and error states.

Prefer `findBy*` when waiting for an element to appear. Use `waitFor` when waiting for an assertion or condition rather than simply locating one element.

## Course notes: Components with Asynchronous Data

### Overview

When a React component depends on asynchronous data, it may initially render a **loading state** before displaying its actual UI.

Tests need to account for this asynchronous transition.

In this example, `ProductForm` fetches categories using the `useCategories` hook:

```tsx
const { data: categories, isLoading } = useCategories()

if (isLoading) return <div>Loading...</div>
```

Therefore, the form fields are not available immediately after rendering the component.

---

### The Testing Problem

A test like this can fail:

```tsx
render(<ProductForm onSubmit={vi.fn()} />)

expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument()
```

The reason is that `ProductForm` initially renders:

```text
Loading...
```

Only after the categories request finishes does the form get rendered.

Therefore, the test needs to wait for the loading state to disappear before checking the form fields.

---

## `waitForElementToBeRemoved`

React Testing Library provides:

```tsx
waitForElementToBeRemoved()
```

to wait until an element is removed from the DOM.

Example:

```tsx
await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
```

This means:

> Wait until the element containing "Loading" is no longer present in the DOM.

---

### Why Use `queryByText`?

The callback passed to `waitForElementToBeRemoved` needs to be able to return the element while it exists and `null` after it disappears.

That's exactly how `queryBy...` behaves.

```tsx
screen.queryByText(/loading/i)
```

While loading:

```text
<div>Loading...</div>
```

After loading:

```text
null
```

Once the element is removed, `waitForElementToBeRemoved` finishes.

---

## Complete Test

```tsx
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import ProductForm from "../../src/components/ProductForm"
import { Theme } from "@radix-ui/themes"
import AllProviders from "../AllProviders"

describe("ProductForm", () => {
  it("should render form fields", async () => {
    render(
      <Theme>
        <ProductForm onSubmit={vi.fn()} />
      </Theme>,
      { wrapper: AllProviders },
    )

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument()

    expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument()

    expect(
      screen.getByRole("combobox", {
        name: /category/i,
      }),
    ).toBeInTheDocument()
  })
})
```

---

## Why Is the Test `async`?

The test needs to wait for an asynchronous operation:

```tsx
await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
```

Therefore, the test callback must be asynchronous:

```tsx
it("should render form fields", async () => {
  // ...
})
```

The `await` ensures that the assertions below it run only after the loading element has disappeared.

---

## Testing the User-Visible Behavior

The important thing being tested is **not** whether `ProductForm` calls `useCategories`.

Instead, we're testing what the user experiences:

1. The component initially displays a loading state.
2. Categories are loaded.
3. The loading state disappears.
4. The form becomes available.
5. The user can see the form fields.

This follows an important React Testing Library principle:

> Test behavior and user-visible results rather than implementation details.

We don't care how `useCategories()` performs the request.

We care that the UI eventually becomes usable.

---

## `waitFor` vs `waitForElementToBeRemoved`

Both utilities are useful for asynchronous testing, but they solve different problems.

### `waitFor`

Use `waitFor` when you want to wait for an assertion to eventually pass.

```tsx
await waitFor(() => {
  expect(screen.getByText("Lipstick")).toBeInTheDocument()
})
```

The mental question is:

> "Will this condition eventually become true?"

---

### `waitForElementToBeRemoved`

Use `waitForElementToBeRemoved` when something is initially present and you expect it to disappear.

```tsx
await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
```

The mental question is:

> "Will this element eventually disappear?"

---

### Mental Model

```text
waitFor
    ↓
Wait for something to become true


waitForElementToBeRemoved
    ↓
Wait for something to disappear
```

---

## Why Not Use `getByText`?

This is not the preferred approach:

```tsx
await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
```

`getByText` throws an error when the element doesn't exist.

But when waiting for an element to disappear, we expect the element to eventually **not exist**.

`queryByText` returns `null` instead of throwing:

```tsx
screen.queryByText(/loading/i)
```

Therefore, it is appropriate for this situation.

---

## React Testing Library Query Types

| Query        | Element exists  | Element doesn't exist |
| ------------ | --------------- | --------------------- |
| `getBy...`   | Returns element | Throws error          |
| `queryBy...` | Returns element | Returns `null`        |
| `findBy...`  | Returns Promise | Rejects Promise       |

#### Important distinction

Use:

```tsx
getBy...
```

when the element should already exist.

Use:

```tsx
queryBy...
```

when you need to check whether an element exists without throwing.

Use:

```tsx
findBy...
```

when an element should eventually appear.

---

## Async Flow of `ProductForm`

The component's behavior can be visualized as:

```text
render ProductForm
       ↓
useCategories()
       ↓
isLoading === true
       ↓
"Loading..." rendered
       ↓
categories request completes
       ↓
isLoading === false
       ↓
Loading removed
       ↓
Product form rendered
```

The test mirrors this behavior:

```text
render ProductForm
       ↓
wait for Loading... to disappear
       ↓
query form fields
       ↓
assert fields exist
```

This makes the test easier to understand because the test follows the same sequence that the user experiences.

---

## Why We Don't Use `setTimeout`

Avoid tests like:

```tsx
await new Promise((resolve) => setTimeout(resolve, 1000))
```

This creates an arbitrary delay.

The request might finish in 100ms or 500ms, but the test always waits one second.

Instead, wait for a meaningful UI condition:

```tsx
await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
```

This makes the test:

- More reliable
- Faster
- More deterministic
- Better aligned with user behavior

---

## Testing with Providers

The test uses:

```tsx
{
  wrapper: AllProviders
}
```

because `ProductForm` indirectly depends on providers required by its hooks or application infrastructure.

For example, `useCategories` may depend on React Query's:

```tsx
QueryClientProvider
```

`AllProviders` allows these providers to be configured in one place.

Instead of repeatedly doing:

```tsx
render(
  <QueryClientProvider client={queryClient}>
    <ProductForm />
  </QueryClientProvider>,
)
```

tests can simply use:

```tsx
render(<ProductForm />, {
  wrapper: AllProviders,
})
```

This keeps individual tests cleaner.

---

## Testing Radix UI Components

The category field uses Radix UI:

```tsx
<Select.Trigger aria-label="Category" placeholder="Category" />
```

The test finds it using its accessible role and name:

```tsx
screen.getByRole("combobox", {
  name: /category/i,
})
```

This is better than relying on implementation-specific DOM selectors.

The test is essentially asking:

> Can the user find the Category combobox?

rather than:

> Did Radix render a particular HTML structure?

---

## Why `getByRole` Is Useful Here

The test checks:

```tsx
screen.getByRole("combobox", {
  name: /category/i,
})
```

This query uses the element's **accessible role** and **accessible name**.

This encourages tests to interact with the UI similarly to how a user or assistive technology would perceive it.

---

## Unused Imports

The original test imports:

```tsx
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react"
```

But `waitFor` isn't used.

The cleaner version is:

```tsx
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
```

Remove unused imports to keep tests clean and easier to read.

---

## Best Practices

### 1. Wait for UI conditions

Prefer:

```tsx
await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
```

instead of:

```tsx
await new Promise((resolve) => setTimeout(resolve, 1000))
```

---

### 2. Test user-visible behavior

Prefer:

```tsx
screen.getByRole("combobox", {
  name: /category/i,
})
```

rather than testing implementation details.

---

### 3. Use `queryBy...` for disappearance

When an element is expected to disappear:

```tsx
waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
```

---

### 4. Use `findBy...` for appearance

If an element isn't initially present but should eventually appear:

```tsx
const product = await screen.findByText("Lipstick")
```

This is different from waiting for something to disappear.

---

### 5. Don't test implementation details

Avoid tests such as:

```tsx
expect(useCategories).toHaveBeenCalled()
```

The component's internal implementation isn't the important part.

Instead, test the resulting behavior:

```tsx
expect(
  screen.getByRole("combobox", {
    name: /category/i,
  }),
).toBeInTheDocument()
```

---

## Quick Reference

| Situation                                    | Recommended approach          |
| -------------------------------------------- | ----------------------------- |
| Element should eventually appear             | `findBy...`                   |
| Assertion should eventually pass             | `waitFor()`                   |
| Existing element should disappear            | `waitForElementToBeRemoved()` |
| Check element without throwing               | `queryBy...`                  |
| Assert an element exists now                 | `getBy...`                    |
| Find an interactive element by accessibility | `getByRole()`                 |

---

## Key Takeaways

- Components that fetch data often render a **loading state first**.
- Tests must synchronize with asynchronous UI changes.
- `waitForElementToBeRemoved()` is useful when an element initially exists and should disappear.
- Use `queryBy...` when waiting for an element to disappear.
- Use `waitFor()` when waiting for an assertion to eventually pass.
- Use `findBy...` when waiting for an element to appear.
- Avoid arbitrary `setTimeout()` delays.
- Test **user-visible behavior**, not implementation details.
- Accessible queries such as `getByRole()` make tests more user-focused.
- Providers can be centralized through a reusable `AllProviders` wrapper.
- Remove unused imports from tests.

---

## Key Mental Model

```text
ASYNC COMPONENT TESTING

Component renders
       ↓
Loading state
       ↓
Wait for meaningful UI change
       ↓
Loading disappears
       ↓
Final UI appears
       ↓
Make assertions
```

The main idea:

> **Don't guess when the async operation will finish. Wait for the UI to tell you that it has finished.**

## Course notes: Async UI and `waitFor`

### Overview

Modern React applications frequently perform asynchronous operations such as:

- API requests
- Form submissions
- Loading states
- Delayed rendering
- Data fetching

React Testing Library provides utilities for testing asynchronous UI updates:

- `waitFor()`
- `findBy*()`
- `findAllBy*()`

Understanding when to use each is essential for writing reliable tests.

---

## The waitFor Function

### What is waitFor?

`waitFor()` repeatedly executes a callback until:

- The callback passes.
- The timeout is reached.

```tsx
await waitFor(() => {
  expect(screen.getByText("Done")).toBeInTheDocument()
})
```

Internally, React Testing Library keeps retrying the callback until the assertion succeeds.

---

### How waitFor Works

Conceptually:

```tsx
while (!success && !timeout) {
  try {
    callback()
    success = true
  } catch {
    retry()
  }
}
```

The callback may execute many times before succeeding.

---

### Important Rule

#### Avoid Side Effects Inside waitFor

❌ Bad

```tsx
await waitFor(() => {
  user.click(button)
})
```

Problem:

`waitFor()` may run the callback multiple times.

This can trigger:

```txt
click
click
click
click
...
```

leading to unpredictable test behavior.

---

#### Another Bad Example

```tsx
await waitFor(() => {
  fireEvent.click(button)
})
```

The click may occur repeatedly.

---

#### Good

```tsx
await user.click(button)

await waitFor(() => {
  expect(screen.getByText("Saved")).toBeInTheDocument()
})
```

Perform actions outside `waitFor()`.

Use `waitFor()` only for assertions.

---

### Best Practice

#### waitFor Should Contain Assertions

Recommended pattern:

```tsx
await waitFor(() => {
  expect(...)
})
```

Avoid:

```tsx
await waitFor(() => {
  user.click(...)
  fireEvent(...)
  render(...)
})
```

---

## findBy Queries

React Testing Library provides async versions of queries.

Example:

```tsx
await screen.findByRole("button")
```

These queries automatically wait for elements to appear.

---

### Example

Instead of:

```tsx
await waitFor(() => {
  expect(screen.getByRole("button")).toBeInTheDocument()
})
```

Use:

```tsx
const button = await screen.findByRole("button")

expect(button).toBeInTheDocument()
```

This is simpler and easier to read.

---

## findAllByRole

### What is findAllByRole?

Async version of:

```tsx
getAllByRole()
```

It waits for matching elements to appear before returning them.

```tsx
const items = await screen.findAllByRole("listitem")
```

Returns:

```tsx
HTMLElement[]
```

---

## getAllByRole vs findAllByRole

### getAllByRole

```tsx
const items = screen.getAllByRole("listitem")
```

#### Behavior

- Synchronous.
- Executes immediately.
- Throws if no matching elements exist.

Use when elements already exist.

---

### findAllByRole

```tsx
const items = await screen.findAllByRole("listitem")
```

#### Behavior

- Asynchronous.
- Waits for elements to appear.
- Rejects after timeout.

Use when elements appear later.

---

### Comparison

| Feature               | getAllByRole | findAllByRole |
| --------------------- | ------------ | ------------- |
| Async                 | ❌           | ✅            |
| Returns Promise       | ❌           | ✅            |
| Waits for elements    | ❌           | ✅            |
| Throws immediately    | ✅           | ❌            |
| Suitable for async UI | ❌           | ✅            |

---

## Example: Data Loaded Immediately

```tsx
render(<Users />)

const users = screen.getAllByRole("listitem")
```

Use:

```tsx
getAllByRole()
```

because the elements already exist.

---

## Example: Data Loaded From API

```tsx
render(<Users />)

const users = await screen.findAllByRole("listitem")
```

Use:

```tsx
findAllByRole()
```

because the elements appear after an asynchronous operation.

---

## findBy vs waitFor

Often these two approaches accomplish the same goal.

#### Using waitFor

```tsx
await waitFor(() => {
  expect(screen.getByRole("button")).toBeInTheDocument()
})
```

---

#### Using findByRole

```tsx
const button = await screen.findByRole("button")
```

Preferred because:

- Cleaner
- Shorter
- More readable

---

## When to Use Each

### Use getBy* / getAllBy*

When elements already exist.

```tsx
screen.getByRole("button")
```

---

### Use findBy* / findAllBy*

When elements appear asynchronously.

```tsx
await screen.findByRole("button")
```

---

### Use waitFor

When waiting for arbitrary assertions.

```tsx
await waitFor(() => {
  expect(mock).toHaveBeenCalled()
})
```

or

```tsx
await waitFor(() => {
  expect(button).toBeDisabled()
})
```

---

## Common Mistake

❌

```tsx
await waitFor(() => {
  user.click(button)
})
```

---

✅

```tsx
await user.click(button)

await waitFor(() => {
  expect(result).toBeInTheDocument()
})
```

Remember:

> waitFor retries assertions, not actions.

---

## Best Practices

- Prefer `findBy*()` over `waitFor()` when waiting for elements.
- Use `waitFor()` for assertions.
- Never perform side effects inside `waitFor()`.
- Use `getBy*()` for synchronous UI.
- Use `findBy*()` for asynchronous UI.
- Keep callbacks passed to `waitFor()` free of actions and state changes.

---

## Key Takeaways

- `waitFor()` repeatedly executes a callback until it succeeds or times out.
- Side effects inside `waitFor()` can run multiple times and cause unreliable tests.
- `findBy*()` and `findAllBy*()` automatically wait for elements to appear.
- `getAllByRole()` is synchronous.
- `findAllByRole()` is asynchronous and returns a promise.
- Prefer `findBy*()` queries when waiting for DOM elements.
- Use `waitFor()` when waiting for assertions that cannot be expressed with a `findBy*()` query.

## Course notes: Loading and Error States

### Overview

When testing components that fetch data, it's important to verify all possible states of the request lifecycle, not just the successful case.

Most data-fetching components have three primary UI states:

```text
           Request Starts
                 │
                 ▼
          Loading Indicator
                 │
        ┌────────┴────────┐
        ▼                 ▼
   Request Success   Request Failure
        │                 │
        ▼                 ▼
    Display Data     Display Error
```

A complete test suite should cover all three states.

---

## Request Lifecycle

```text
Component Mounts
       │
       ▼
Loading...
       │
       ▼
HTTP Request
       │
 ┌─────┴─────┐
 ▼           ▼
Success     Failure
 ▼           ▼
Data       Error Message
```

---

## Testing Error States

### Mocking a Failed Request

```tsx
server.use(http.get("/products", () => HttpResponse.error()))
```

`server.use()` overrides the default request handler **only for the current test**.

Instead of returning data, MSW simulates a network failure.

---

### Test

```tsx
it("should render an error message when there is an error", async () => {
  server.use(http.get("/products", () => HttpResponse.error()))

  render(<ProductList />)

  const error = await screen.findByText(/error/i)

  expect(error).toBeInTheDocument()
})
```

---

### Why use `findByText()`?

The error message isn't rendered immediately.

Sequence:

```text
Render Component
      ↓
Send HTTP Request
      ↓
Request Fails
      ↓
State Updates
      ↓
Render Error Message
```

Since the message appears asynchronously:

```tsx
await screen.findByText(...)
```

is the correct query.

---

## Simulating Slow Requests

Sometimes we need to verify what the user sees **while waiting** for a response.

MSW provides:

```tsx
delay()
```

---

### Example

```tsx
server.use(
  http.get("/products", async () => {
    await delay(100)

    return HttpResponse.json([])
  }),
)
```

This simulates a server responding after 100 milliseconds.

---

## Testing Loading Indicators

### Test

```tsx
it("should render a loading indicator when fetching data", async () => {
  server.use(
    http.get("/products", async () => {
      await delay(100)

      return HttpResponse.json([])
    }),
  )

  render(<ProductList />)

  const loading = await screen.findByText(/loading/i)

  expect(loading).toBeInTheDocument()
})
```

---

### What This Test Verifies

Immediately after rendering:

```text
Loading...
```

should appear.

The component correctly communicates that work is in progress.

---

## Waiting for Elements to Disappear

Sometimes we don't care when an element appears.

Instead, we want to verify that it eventually disappears.

React Testing Library provides:

```tsx
waitForElementToBeRemoved()
```

---

### Example

```tsx
await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
```

This repeatedly checks until the loading indicator is removed from the DOM.

---

## Testing Loading Completion (Success)

### Test

```tsx
it("should remove the loading indicator after data is fetched", async () => {
  render(<ProductList />)

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
})
```

#### Request Flow

```text
Loading
   │
   ▼
Request Succeeds
   │
   ▼
Loading disappears
   │
   ▼
Products appear
```

This confirms the loading state ends after a successful request.

---

## Testing Loading Completion (Failure)

### Test

```tsx
it("should remove the loading indicator after data fails", async () => {
  server.use(http.get("/products", () => HttpResponse.error()))

  render(<ProductList />)

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
})
```

#### Request Flow

```text
Loading
   │
   ▼
Request Fails
   │
   ▼
Loading disappears
   │
   ▼
Error message appears
```

Even when the request fails, the loading indicator should disappear.

Otherwise, users would think the request is still in progress.

---

## Why `queryByText()` Instead of `getByText()`?

Notice:

```tsx
screen.queryByText(/loading/i)
```

instead of:

```tsx
screen.getByText(/loading/i)
```

#### Reason

Eventually:

```text
Loading
```

should **not** exist.

`queryByText()` returns:

```tsx
HTMLElement | null
```

allowing `waitForElementToBeRemoved()` to keep checking until the element disappears.

Using:

```tsx
getByText()
```

would throw an error once the loading indicator is removed.

---

## waitForElementToBeRemoved()

### What Does It Do?

Conceptually:

```text
Loading exists?
      │
      ▼
     Yes
      │
      ▼
Wait...
      │
      ▼
Loading exists?
      │
      ▼
No
      │
      ▼
Continue Test
```

It repeatedly checks until the element no longer exists or the timeout is reached.

---

## waitFor vs waitForElementToBeRemoved

| waitFor                            | waitForElementToBeRemoved         |
| ---------------------------------- | --------------------------------- |
| Waits for an assertion to pass     | Waits for an element to disappear |
| More general-purpose               | Specifically for element removal  |
| Requires an assertion callback     | Takes a query callback            |
| Use for arbitrary async conditions | Use when UI elements are removed  |

---

## Complete Loading Lifecycle

A robust data-fetching component should be tested for:

```text
✓ Loading appears
✓ Loading disappears after success
✓ Loading disappears after failure
✓ Data appears after success
✓ Error appears after failure
```

Testing only the success case leaves important user experiences unverified.

---

## Best Practices

- Test loading, success, and error states separately.
- Use `server.use()` to override handlers for specific scenarios.
- Use `delay()` to simulate slow network responses.
- Use `findBy*()` for asynchronously rendered elements.
- Use `waitForElementToBeRemoved()` when waiting for loading indicators to disappear.
- Use `queryBy*()` when an element is expected to be removed.

---

## Key Takeaways

- Every asynchronous component should be tested for loading, success, and failure.
- `server.use()` allows per-test request handler overrides.
- `HttpResponse.error()` simulates network failures.
- `delay()` simulates slow servers.
- `findBy*()` waits for asynchronously rendered elements.
- `waitForElementToBeRemoved()` is the preferred utility for waiting until elements leave the DOM.
- Use `queryBy*()` instead of `getBy*()` when testing element removal.

## Course notes: API Responses and Not Found States

### Overview

Components that fetch data from an API often render different UI states depending on the server response.

For example, a `ProductDetail` component may render:

- Product information when the API returns a product
- A not-found message when the API returns no product
- A loading indicator while the request is in progress
- An error message when the request fails

These tests are **integration-style component tests** because they verify that multiple pieces work together:

- React component rendering
- `useEffect`
- API requests
- MSW request handlers
- API response data
- Conditional UI rendering

This topic builds directly on:

- [Mock Service Worker (MSW)](./msw.md)
- [Testing Loading and Error States](#course-notes-loading-and-error-states)

The main goal is to test the component's **observable behavior based on different API responses**.

---

### Testing an API-Dependent Component

Consider a `ProductDetail` component that requests a product from:

```text
GET /products/:productId
```

The component displays the product's name and price when the API returns a valid product.

A test can verify this behavior by rendering the component and waiting for the API-driven UI to appear.

#### Example Component

```tsx
import { useEffect, useState } from "react"
import { Product } from "../entities"

const ProductDetail = ({ productId }: { productId: number }) => {
  const [product, setProduct] = useState<Product | undefined>()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!productId) {
      setError("Invalid ProductId")
      return
    }

    setLoading(true)

    fetch("/products/" + productId)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false))
  }, [productId])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!product) {
    return <div>The given product was not found.</div>
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <p>Name: {product.name}</p>
      <p>Price: ${product.price}</p>
    </div>
  )
}

export default ProductDetail
```

The important part for testing is that the component's UI is determined by the API response.

---

### Testing a Successful API Response

The first test verifies that the component eventually displays the product name and price.

```tsx
import { render, screen } from "@testing-library/react"
import ProductDetail from "../../src/components/ProductDetail"

describe("ProductDetail", () => {
  it("renders the product name and price", async () => {
    render(<ProductDetail productId={1} />)

    const productName = await screen.findByText(/lipstick/i)
    const productPrice = await screen.findByText(/\$10/i)

    expect(productName).toBeInTheDocument()
    expect(productPrice).toBeInTheDocument()
  })
})
```

#### Why `findBy...`?

The product is not available immediately when the component is rendered.

The sequence is approximately:

```text
Render component
      ↓
useEffect runs
      ↓
fetch request is sent
      ↓
MSW intercepts request
      ↓
Mock response is returned
      ↓
React state is updated
      ↓
Component re-renders
      ↓
Product appears in the UI
```

Because the UI update is asynchronous, the test should use an asynchronous query such as:

```tsx
await screen.findByText(...)
```

This is preferable to immediately querying with `getByText`, which may execute before the API response has been processed.

#### Related Concept

This follows the same principle covered in **Testing Asynchronous UI and `waitFor`**:

> When UI changes asynchronously, the test should wait for the expected UI state rather than assuming it is available immediately.

In many cases, `findBy...` is the simplest choice when the test is waiting for a specific element to appear.

---

### Testing a Not-Found Response

The component also needs to handle the case where the requested product does not exist.

The test can override the default MSW handler for this specific test:

```tsx
import { render, screen } from "@testing-library/react"
import ProductDetail from "../../src/components/ProductDetail"
import { server } from "../mocks/server"
import { http, HttpResponse } from "msw"

describe("ProductDetail", () => {
  it("renders a not found message if the product is not found", async () => {
    server.use(
      http.get("/products/:productId", () => {
        return HttpResponse.json(null)
      }),
    )

    render(<ProductDetail productId={1} />)

    const message = await screen.findByText(/not found/i)

    expect(message).toBeInTheDocument()
  })
})
```

#### `server.use()`

`server.use()` allows a test to temporarily override an existing MSW handler.

This is useful when the default mock represents a successful request but a particular test needs to simulate a different API response.

For example:

```tsx
server.use(
  http.get("/products/:productId", () => {
    return HttpResponse.json(null)
  }),
)
```

The test can therefore control the API scenario without changing the global handler.

This makes individual tests more focused and predictable.

---

### Default Handler

The normal API handler can return a product when the product exists.

```ts
http.get("/products/:productId", ({ params }) => {
  const productId = Number(params.productId)

  const product = products.find((p) => p.id === productId)

  if (!product) {
    return HttpResponse.json(null, { status: 404 })
  }

  return HttpResponse.json(product)
})
```

The handler simulates two possible API responses.

#### Product Found

```text
GET /products/1
        ↓
Product exists
        ↓
200 OK
        ↓
Product data returned
```

#### Product Not Found

```text
GET /products/999
        ↓
Product does not exist
        ↓
404 Not Found
        ↓
null returned
```

This allows the test suite to verify how the component behaves for different API scenarios.

---

### Testing Behavior, Not Implementation

The test does not need to verify:

- That `fetch()` was called
- That `useEffect()` executed
- That `setProduct()` was called
- That MSW internally intercepted the request

Instead, it verifies the behavior visible to the user:

```tsx
expect(productName).toBeInTheDocument()
```

or:

```tsx
expect(message).toBeInTheDocument()
```

This follows the broader testing philosophy:

> Test what the user experiences, not how the component internally achieves it.

The implementation could later change from:

```tsx
fetch(...)
```

to:

```tsx
axios.get(...)
```

or to:

```tsx
React Query
```

The test should ideally continue to pass as long as the user-facing behavior remains the same.

---

### Testing API Variations with MSW

MSW makes it possible to simulate multiple server scenarios without calling a real backend.

Common scenarios include:

```text
Successful response
    ↓
Product is displayed

Empty / null response
    ↓
Not-found message is displayed

Error response
    ↓
Error message is displayed

Delayed response
    ↓
Loading indicator is displayed
```

This gives the component test coverage across different states of the API.

---

### Important Detail: HTTP Status Codes and `fetch`

One important detail in this example is how the native `fetch` API handles HTTP errors.

A response such as:

```ts
HttpResponse.json(null, { status: 404 })
```

does **not automatically cause `fetch()` to reject**.

The promise returned by `fetch()` normally rejects for network-level failures, not simply because the server returned a `4xx` or `5xx` status.

Therefore, this code:

```tsx
fetch("/products/" + productId)
  .then((res) => res.json())
  .then((data) => setProduct(data))
  .catch((err) => setError((err as Error).message))
```

may still continue through `.then()` when the server responds with `404`.

For this reason, production code often checks `response.ok` explicitly.

For example:

```tsx
fetch("/products/" + productId)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch product")
    }

    return res.json()
  })
  .then((data) => setProduct(data))
  .catch((err) => setError((err as Error).message))
  .finally(() => setLoading(false))
```

This creates a clearer separation between:

- A valid successful response
- A missing resource
- An actual API/server error

The exact handling depends on the API contract.

---

### `null` Response vs `404` Response

These two scenarios can be different from an API-design perspective.

#### `200 OK` with `null`

```ts
return HttpResponse.json(null)
```

This represents:

```text
Request succeeded
        ↓
No product data was returned
```

#### `404 Not Found` with `null`

```ts
return HttpResponse.json(null, { status: 404 })
```

This represents:

```text
Requested resource does not exist
```

The current component treats both responses similarly because it only receives `null` from:

```tsx
res.json()
```

and then checks:

```tsx
if (!product) {
  return <div>The given product was not found.</div>
}
```

Whether the application should distinguish between these cases depends on the API contract and the desired UX.

---

### Best Practices

#### 1. Render the Component with Realistic Props

Instead of:

```tsx
render()
```

render the component with the required prop:

```tsx
render(<ProductDetail productId={1} />)
```

This keeps the test representative of actual component usage.

---

#### 2. Prefer User-Facing Assertions

Prefer:

```tsx
expect(await screen.findByText(/not found/i)).toBeInTheDocument()
```

instead of testing internal state:

```tsx
expect(setProduct).toHaveBeenCalledWith(null)
```

The first approach verifies observable behavior.

---

#### 3. Use `findBy...` for Asynchronous Appearance

When the expected UI appears after an API request:

```tsx
const message = await screen.findByText(/not found/i)
```

is usually clearer than manually wrapping the same operation in `waitFor`.

---

#### 4. Override MSW Handlers Per Test

Use:

```tsx
server.use(...)
```

when a test needs a special API response.

This keeps the default handlers focused on the normal application flow while allowing individual tests to simulate edge cases.

---

#### 5. Reset Handlers Between Tests

When using temporary handler overrides, the test setup should reset them after each test:

```ts
afterEach(() => {
  server.resetHandlers()
})
```

Otherwise, an overridden handler could affect later tests and create unwanted test coupling.

---

#### 6. Cover Meaningful API States

An API-dependent component should generally be tested for the important states it can display:

```text
Success
Loading
Not Found
Error
```

Not every component needs every state, but important user-visible branches should be covered.

---

### Potential Component Improvements

The example also highlights a few implementation details worth keeping in mind.

#### Include `productId` in the Dependency Array

The effect should generally depend on `productId`:

```tsx
useEffect(() => {
  // fetch product
}, [productId])
```

Using:

```tsx
}, []);
```

means the effect only runs on the initial mount.

If `productId` changes while the component remains mounted, the component will not fetch the new product.

---

#### Handle HTTP Errors Explicitly

As discussed above, checking:

```tsx
if (!res.ok) {
  throw new Error("Failed to fetch product")
}
```

makes API error handling more predictable.

---

#### Consider a More Explicit State Model

As a component grows, separate states such as:

```tsx
const [product, setProduct] = useState<Product | undefined>()
const [isLoading, setLoading] = useState(false)
const [error, setError] = useState("")
```

can become harder to reason about.

A more explicit state model or a data-fetching library such as React Query/TanStack Query can simplify handling:

- Loading
- Success
- Error
- Refetching
- Cached data

This is especially relevant to the later API and React Query topics in the course.

---

### Key Takeaways

- API-dependent components should be tested against meaningful server responses.
- MSW allows tests to simulate realistic API scenarios without calling a real backend.
- `server.use()` is useful for overriding handlers for a specific test.
- Use `findBy...` when waiting for asynchronously rendered UI.
- Test user-visible behavior rather than internal implementation details.
- A successful API response and a not-found response should be tested separately.
- Native `fetch` does not reject automatically for HTTP `4xx` or `5xx` responses.
- Check `response.ok` when HTTP status codes should affect application error handling.
- Reset temporary MSW handlers between tests.
- API components commonly need coverage for success, loading, not-found, and error states.
- This topic connects closely with **MSW**, **Testing Loading and Error States**, and **Testing Asynchronous UI**.

</div>

</details>

</div>
