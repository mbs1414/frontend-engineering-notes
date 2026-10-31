<div dir="rtl" align="right">

# پاسخ سرور را در مرز شبکه کنترل کنیم — <span dir="ltr">MSW</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Fetch</span>](../10-data-fetching/fetch.md)، [<span dir="ltr">Mocking</span>](./mocking.md).

به‌جای <span dir="ltr">mock</span> کردن <span dir="ltr">useQuery</span> یا کل <span dir="ltr">component</span>، <span dir="ltr">MSW</span> درخواست شبکه را <span dir="ltr">intercept</span> می‌کند و پاسخ کنترل‌شده می‌دهد. کد دریافت داده و مدیریت خطای برنامه همچنان مسیر واقعی خودش را طی می‌کند.

## مثال اول: سرور تست

<div dir="ltr" align="left">

~~~js
import { http, HttpResponse } from 'msw/http';
import { setupServer } from 'msw/node';

export const server = setupServer(
  http.get('https://api.example.test/users', () =>
    HttpResponse.json([{ id: 1, name: 'Sara' }]),
  ),
);
~~~

</div>

<span dir="ltr">import</span> این مثال مطابق [<span dir="ltr">Quick Start</span> فعلی <span dir="ltr">MSW</span>](https://mswjs.io/docs/quick-start) است؛ در یادداشت انگلیسی یا نسخه نصب‌شده قدیمی ممکن است <span dir="ltr">export</span>ها فرق کنند. برنامه تست باید همین <span dir="ltr">URL</span> را درخواست کند؛ آدرس نسبی هم به <span dir="ltr">base URL</span> محیط وابسته است.

## مثال دوم: <span dir="ltr">lifecycle</span> و خطا

<div dir="ltr" align="left">

~~~js
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// در تست مسیر خطا:
server.use(
  http.get('https://api.example.test/users', () =>
    new HttpResponse(null, { status: 500 }),
  ),
);
~~~

</div>

<span dir="ltr">Hook</span>های تست از <span dir="ltr">Vitest</span> وارد می‌شوند. <span dir="ltr">server.use</span> در تست مربوط قرار می‌گیرد. <span dir="ltr">resetHandlers</span> تغییرهای همان تست را پاک می‌کند تا تست بعدی آلوده نشود.

## پاسخ مصاحبه و تمرین

برای حالت «لیست خالی» باید <span dir="ltr">component</span> را <span dir="ltr">mock</span> کنیم؟

<details>
<summary>پاسخ</summary>

خیر. <span dir="ltr">handler</span> پاسخ آرایه خالی بدهد و <span dir="ltr">component</span> واقعی را <span dir="ltr">render</span> کن؛ سپس <span dir="ltr">empty state</span> را از <span dir="ltr">DOM</span> بررسی کن.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Mock Service Worker (MSW)

MSW intercepts requests at the network boundary, letting application code use its normal `fetch`/client path while tests control responses.

This often produces higher-confidence integration tests than mocking the HTTP client function directly.

## Course notes: Mock Service Worker

### Overview

When testing React applications, components often communicate with a backend using:

- `fetch()`
- `axios`
- React Query
- SWR

Running tests against a real backend is a bad practice because it makes tests slower and less reliable.

Instead, we mock API requests.

One of the best tools for this is **Mock Service Worker (MSW)**.

---

## Why Not Test Against a Live Backend?

Testing against a real backend introduces several problems.

### 1. Network Requests Are Slow

Every HTTP request requires:

```text
Component
      ↓
Network
      ↓
Server
      ↓
Database
      ↓
Response
```

Even on a local network, this adds unnecessary delay to every test.

Result:

- Slower test suite
- Slower feedback
- Reduced developer productivity

---

### 2. Tests Depend on the Backend

If the backend is:

- Down
- Not running
- Returning errors
- Under maintenance

your frontend tests will fail even though the frontend code is correct.

Good unit tests should be:

- Fast
- Reliable
- Independent

---

### 3. Test Results Become Unpredictable

Real APIs change over time.

Example:

Today:

```json
[{ "id": 1, "name": "Mosh" }]
```

Tomorrow:

```json
[{ "id": 1, "name": "John" }]
```

Your tests now fail because the backend data changed.

Mocked responses remain consistent.

---

## Why Not Simply Mock axios.get() or fetch()?

A common question is:

> Why not just mock `axios.get()` or the browser's `fetch()` API?

You can, but it has several drawbacks.

---

### Mocking axios Directly

Example:

```tsx
vi.mock("axios")

axios.get.mockResolvedValue({
  data: [{ id: 1, name: "Mosh" }],
})
```

Although this works, it tightly couples your tests to the implementation.

Your test now assumes the component uses:

```tsx
axios.get(...)
```

---

### The Problem

Suppose you refactor:

Before:

```tsx
axios.get(...)
```

After:

```tsx
fetch(...)
```

The component's behavior is unchanged, but your tests break because they depend on the implementation.

This violates an important testing principle:

> Test behavior, not implementation.

---

## How MSW Works

MSW intercepts HTTP requests before they reach the network.

```text
Component
      ↓
axios / fetch
      ↓
MSW intercepts request
      ↓
Returns mocked response
```

The component doesn't know the response is mocked.

From the component's perspective, it is communicating with a real server.

---

## Benefits of MSW

- No real network requests.
- Fast tests.
- Reliable tests.
- Mock at the network level.
- Works with both `fetch()` and `axios`.
- Tests remain valid even if the HTTP client changes.

---

## Simple Example

### Component

```tsx
import axios from "axios"
import { useEffect, useState } from "react"

function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("/users").then((res) => setUsers(res.data))
  }, [])

  return (
    <ul>
      {users.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

---

### MSW Handler

```tsx
import { http, HttpResponse } from "msw"

export const handlers = [
  http.get("/users", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "Mosh",
      },
      {
        id: 2,
        name: "John",
      },
    ])
  }),
]
```

Instead of calling a real backend, MSW intercepts:

```http
GET /users
```

and returns:

```json
[
  {
    "id": 1,
    "name": "Mosh"
  },
  {
    "id": 2,
    "name": "John"
  }
]
```

---

### Test

```tsx
it("should render users", async () => {
  render(<UserList />)

  const users = await screen.findAllByRole("listitem")

  expect(users).toHaveLength(2)

  expect(users[0]).toHaveTextContent("Mosh")
  expect(users[1]).toHaveTextContent("John")
})
```

Notice that the test never mocks:

- `axios`
- `fetch`

It only verifies what the user sees.

---

## axios Mock vs MSW

| axios Mock                           | MSW                                              |
| ------------------------------------ | ------------------------------------------------ |
| Mocks implementation                 | Mocks network                                    |
| Knows component uses axios           | Doesn't care whether the app uses axios or fetch |
| Breaks after HTTP client refactoring | Continues to work                                |
| Less realistic                       | More realistic                                   |
| Good for isolated unit tests         | Excellent for integration and component tests    |

---

## When to Use MSW

MSW is ideal when testing:

- Components that fetch data
- React Query hooks
- SWR hooks
- Forms that submit data
- CRUD operations
- Integration tests

---

## Best Practices

- Never rely on a live backend for frontend tests.
- Mock requests at the network layer instead of the HTTP client.
- Test the rendered UI rather than implementation details.
- Use `findBy*()` or `findAllBy*()` for asynchronously rendered data.
- Keep mocked responses predictable and focused on the scenario being tested.

---

## Key Takeaways

- Live backend tests are slow and unreliable.
- Mocking `axios` or `fetch` couples tests to implementation details.
- MSW intercepts network requests and returns mocked responses.
- Components behave as if they are communicating with a real server.
- MSW works regardless of whether the application uses `fetch`, `axios`, or another HTTP client.
- MSW enables fast, reliable, and maintainable component and integration tests.

## Data-backed mocks: important 2026 update

The older course note uses `@mswjs/data`. That package is deprecated. The maintained successor is **`@msw/data`**, which uses Standard Schema-compatible schemas and can be used with MSW.

Do not copy the old `factory()` / `toHandlers("rest")` examples from the deprecated package into new code without checking the current `@msw/data` API.

Current project: https://github.com/mswjs/data

### Current `@msw/data` shape

The maintained package uses collections plus a Standard Schema-compatible schema library such as Zod:

```ts
import { Collection } from '@msw/data';
import { z } from 'zod';

const users = new Collection({
  schema: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

await users.create({ id: 1, name: 'Ada' });
const ada = users.findFirst(q => q.where({ name: 'Ada' }));
```

That is conceptually similar to the old course goal, an in-memory/queryable data layer for tests, but the API is different from deprecated `@mswjs/data`.

## Faker and determinism

Faker is useful for generating realistic fixtures, but tests should remain deterministic. Seed Faker or use explicit fixtures when random values would make failures hard to reproduce.

## Isolation

Reset request handlers and test data between tests so one test cannot alter another's environment.

</div>

</details>

</div>
