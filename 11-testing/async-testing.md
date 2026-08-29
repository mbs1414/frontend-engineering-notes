# Testing Asynchronous JavaScript

Async tests should wait for the actual promise/observable behavior, not arbitrary sleeps.

## Course notes: Testing Asynchronous Code

Modern JavaScript applications frequently perform operations that don't complete immediately.

Examples include:

- API calls
- Database queries
- Reading files
- Timers
- Authentication requests

These operations are asynchronous.

Testing asynchronous code requires special handling because the result is not available immediately.

---

## Synchronous vs Asynchronous Code

### Synchronous Code

Runs from top to bottom.

```js
function add(a, b) {
  return a + b
}

const result = add(2, 3)

expect(result).toBe(5)
```

Execution waits until the function finishes.

---

### Asynchronous Code

Returns a Promise and completes later.

```js
async function fetchUser() {
  return {
    id: 1,
    name: "John",
  }
}
```

The result isn't available immediately.

Instead, we get:

```js
Promise<User>
```

---

## Why Async Testing Is Different

Consider:

```js
async function fetchUser() {
  return {
    id: 1,
    name: "John",
  }
}
```

Incorrect test:

```js
it("should return a user", () => {
  const user = fetchUser()

  expect(user.name).toBe("John")
})
```

Problem:

```js
user
```

contains:

```js
Promise
```

not:

```js
User
```

The assertion runs before the Promise resolves.

---

## Testing Async Functions

The most common solution is:

```js
async / await
```

---

## Example Function

```js
async function fetchUser() {
  return {
    id: 1,
    name: "John",
  }
}
```

---

## Correct Test

```js
it("should return a user", async () => {
  const user = await fetchUser()

  expect(user.name).toBe("John")
})
```

---

## What Happens?

```text
Call Function
      ↓
Wait for Promise
      ↓
Receive Result
      ↓
Assert
```

The test waits until the Promise resolves.

---

## AAA Pattern with Async Tests

The AAA pattern still applies.

---

### Example

```js
it("should return a user", async () => {
  // Arrange
  const userId = 1

  // Act
  const user = await fetchUser(userId)

  // Assert
  expect(user.id).toBe(1)
})
```

The only difference is the use of:

```js
await
```

during the Act phase.

---

## Returning Promises Directly

Instead of using async/await:

```js
it("should return a user", () => {
  return fetchUser().then((user) => {
    expect(user.name).toBe("John")
  })
})
```

This works because Vitest waits for the returned Promise.

---

## Preferred Approach

Most modern code uses:

```js
async / await
```

because it's easier to read.

---

#### Prefer

```js
it("should return a user", async () => {
  const user = await fetchUser()

  expect(user.name).toBe("John")
})
```

---

#### Over

```js
it("should return a user", () => {
  return fetchUser().then((user) => {
    expect(user.name).toBe("John")
  })
})
```

---

## Testing Rejected Promises

Many async functions reject when something goes wrong.

---

### Example Function

```js
async function fetchUser(id) {
  if (id <= 0) throw new Error("Invalid ID")

  return {
    id,
  }
}
```

---

## Testing Errors

Incorrect:

```js
expect(() => fetchUser(-1)).toThrowError()
```

This works for synchronous errors, not Promise rejections.

---

## Correct

Vitest provides:

```js
rejects
```

---

### Example

```js
await expect(fetchUser(-1)).rejects.toThrowError()
```

---

## Full Test

```js
it("should reject for invalid ids", async () => {
  await expect(fetchUser(-1)).rejects.toThrowError()
})
```

---

## Testing Resolved Promises

Vitest also provides:

```js
resolves
```

---

### Example

```js
await expect(fetchUser(1)).resolves.toMatchObject({
  id: 1,
})
```

---

## Why Use `resolves`?

Instead of:

```js
const user = await fetchUser(1)

expect(user.id).toBe(1)
```

You can write:

```js
await expect(fetchUser(1)).resolves.toMatchObject({
  id: 1,
})
```

Both approaches are valid.

---

## Testing Delayed Operations

Example:

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
```

---

## Test

```js
it("should resolve after delay", async () => {
  await delay(100)

  expect(true).toBe(true)
})
```

Vitest waits for the Promise.

---

## Common Mistake #1

Forgetting `await`

Bad:

```js
it("should return a user", () => {
  const user = fetchUser()

  expect(user.name).toBe("John")
})
```

`user` is a Promise.

---

Good:

```js
const user = await fetchUser()
```

---

## Common Mistake #2

Forgetting `async`

Bad:

```js
it("should return a user", () => {
  const user =
    await fetchUser();
});
```

This causes a syntax error.

---

Good:

```js
it("should return a user", async () => {
  const user = await fetchUser()
})
```

---

## Common Mistake #3

Using `toThrowError` for Async Functions

Bad:

```js
expect(() => fetchUser(-1)).toThrowError()
```

---

Good:

```js
await expect(fetchUser(-1)).rejects.toThrowError()
```

---

## Common Mistake #4

Not Returning the Promise

Bad:

```js
it("should return user", () => {
  fetchUser().then((user) => {
    expect(user).toBeDefined()
  })
})
```

Vitest may finish the test before the Promise resolves.

---

Good:

```js
return fetchUser().then((user) => {
  expect(user).toBeDefined()
})
```

or

```js
await fetchUser()
```

---

## Async Testing Cheat Sheet

### Await Result

```js
const result = await asyncFunction()
```

---

### Test Promise Resolution

```js
await expect(asyncFunction()).resolves.toEqual(value)
```

---

### Test Promise Rejection

```js
await expect(asyncFunction()).rejects.toThrowError()
```

---

## Real-World Example

Function:

```js
async function login(username, password) {
  if (!username) throw new Error("Username required")

  return {
    token: "abc123",
  }
}
```

---

### Positive Test

```js
it("should return a token", async () => {
  const result = await login("mosh", "1234")

  expect(result).toHaveProperty("token")
})
```

---

### Negative Test

```js
it("should reject when username is missing", async () => {
  await expect(login("", "1234")).rejects.toThrowError()
})
```

---

## Key Takeaways

- Asynchronous code returns Promises.
- Async tests usually use:
  - `async`
  - `await`

- AAA pattern still applies.

- To test successful Promises:

```js
await expect(
  promise
).resolves...
```

- To test rejected Promises:

```js
await expect(
  promise
).rejects...
```

- Common mistakes:
  - Forgetting `await`
  - Forgetting `async`
  - Using `toThrowError()` for Promise rejections
  - Not returning a Promise

- The safest and most readable approach is usually:

```js
it("should do something",
  async () => {
    const result =
      await someAsyncFunction();

    expect(result)
      .toBe(...);
  });
```

This pattern appears constantly when testing APIs, databases, authentication, and other real-world JavaScript applications.

## Common failure mode

Forgetting to `await` or return a promise can let a test finish before the assertion runs, producing false confidence.
