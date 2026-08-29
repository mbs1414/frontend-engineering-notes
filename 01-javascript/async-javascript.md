# Async JavaScript

## Promises

A Promise represents an eventual result.

States:

- pending
- fulfilled
- rejected

Once settled, it does not change to another state.

```js
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## `async/await`

```js
async function loadUsers() {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
```

Important: `fetch` does **not** reject merely because the HTTP status is 404/500. Check `response.ok` or `status`.

## Promise combinators

### `Promise.all`

Waits for all inputs and rejects on the first rejection.

```js
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(),
]);
```

### `Promise.allSettled`

Waits for all and reports each outcome.

### `Promise.race`

Settles when the first input settles.

### `Promise.any`

Fulfills when the first input fulfills; rejects if all reject.

## Sequential vs parallel

Potential waterfall:

```js
const user = await fetchUser();
const settings = await fetchSettings();
```

If independent:

```js
const [user, settings] = await Promise.all([
  fetchUser(),
  fetchSettings(),
]);
```

## Cancellation

Promises are not universally cancellable, but APIs such as `fetch` support `AbortSignal`.

```js
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort();
```

## Interview questions

1. Promise states?
2. `Promise.all` vs `allSettled`?
3. Why can sequential awaits create waterfalls?
4. Does fetch reject on HTTP 500?
5. How do you cancel fetch?
