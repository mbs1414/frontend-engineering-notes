<div dir="rtl" align="right">

# وقتی دیگر نتیجه را نمی‌خواهیم — <span dir="ltr">AbortController</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Fetch</span>](./fetch.md).

## مسئله: کاربر صفحه را ترک کرده

اگر درخواست هنوز لازم نیست، می‌توان از مرورگر خواست آن را لغو کند. <span dir="ltr">AbortController</span> فرمان لغو دارد و <span dir="ltr">signal</span> به عملیات پشتیبانی‌کننده داده می‌شود.

<div dir="ltr" align="left">

~~~js
const controller = new AbortController();
fetch('/api/users', { signal: controller.signal })
  .then(response => {
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return response.json();
  })
  .then(console.log)
  .catch(error => {
    if (error.name !== 'AbortError') console.error(error);
  });
controller.abort();
~~~

</div>

با لغو، معمولاً <span dir="ltr">rejection</span> مربوط به <span dir="ltr">abort</span> می‌گیریم. این مثال از <span dir="ltr">abort</span> بدون <span dir="ltr">reason</span> سفارشی استفاده می‌کند. <span dir="ltr">signal</span> لغوشده را برای درخواست تازه دوباره استفاده نکن؛ <span dir="ltr">controller</span> تازه بساز.

## مثال دوم: <span dir="ltr">lifecycle</span> در <span dir="ltr">React</span>

<div dir="ltr" align="left">

~~~jsx
useEffect(() => {
  const controller = new AbortController();
  // load باید signal را تا fetch منتقل کند و rejection را رسیدگی کند.
  load(url, controller.signal);
  return () => controller.abort();
}, [url]);
~~~

</div>

این الگوی اتصال است و <span dir="ltr">load</span> در آن باید تعریف شود؛ نمونه کامل در درس <span dir="ltr">fetch</span> آمده. با عوض شدن <span dir="ltr">url</span> یا <span dir="ltr">unmount</span>، عملیات قبلی لغو می‌شود.

لغو <span dir="ltr">client</span> تضمین نمی‌کند سرور کار را انجام نداده باشد. اگر درخواست پرداخت به سرور رسیده، <span dir="ltr">abort</span> معادل <span dir="ltr">rollback</span> تراکنش نیست.

## پاسخ مصاحبه و تمرین

آیا <span dir="ltr">AbortController</span> هر <span dir="ltr">Promise</span> دلخواهی را متوقف می‌کند؟

<details>
<summary>پاسخ</summary>

خیر. عملیات باید <span dir="ltr">signal</span> را پشتیبانی و رعایت کند. صرف ساختن <span dir="ltr">controller</span> بدون رساندن <span dir="ltr">signal</span> به عملیات اثری ندارد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# AbortController and Request Cancellation

`AbortController` is a browser API for signaling cancellation to operations that support `AbortSignal`, including `fetch` and many HTTP clients.

```ts
const controller = new AbortController();

fetch(url, { signal: controller.signal });
controller.abort();
```

## React effect cleanup

```tsx
useEffect(() => {
  const controller = new AbortController();

  loadUser(userId, controller.signal).catch(error => {
    if (error.name !== 'AbortError') throw error;
  });

  return () => controller.abort();
}, [userId]);
```

Cleanup runs before an effect reruns and when the component unmounts.

## Important correction to the older course note

React 18 removed the old warning about setting state on an unmounted component because the warning was frequently misleading. Aborting requests is still useful, but not because every late promise resolution is automatically a memory leak.

Use cancellation to:

- stop work that is no longer needed
- prevent obsolete requests from continuing
- reduce wasted bandwidth/CPU
- help prevent stale responses from winning races
- clean up long-lived subscriptions/operations when appropriate

Source reference: React 18 upgrade guide, "No warning about setState on unmounted components".

## Original course note (read with the correction above)

### Updated Hook

```tsx
useEffect(() => {
  const controller = new AbortController();

  apiClient
    .get<Movie[]>("data", {
      signal: controller.signal,
    })
    .then((res) => {
      setMovies(res.data);
    })
    .catch((error) => {
      if (error instanceof CanceledError) return;
      setError(error.message);
    });

  return () => controller.abort();
}, []);
```

---

## Why Do We Need AbortController?

Imagine this sequence:

1. User opens Movie Hub.
2. API request starts.
3. User quickly navigates away.
4. Component unmounts.
5. API response arrives later.
6. React tries to execute:

```tsx
setMovies(res.data);
```

But the component no longer exists.

In React versions before React 18, this scenario could produce the warning:

```text
Can't perform a React state update on an unmounted component.
```

React 18 removed that warning. A late Promise resolution by itself is not evidence of a memory leak, although continuing obsolete requests can still waste work and create stale-response problems.

---

## What Is AbortController?

`AbortController` is a browser API that allows us to cancel asynchronous operations.

Think of it as a remote control for a request.

```text
Start Request
      ↓
AbortController
      ↓
Cancel Request
```

---

## Creating the Controller

```tsx
const controller = new AbortController();
```

This creates a controller object.

The controller contains:

```tsx
controller.signal;
```

and

```tsx
controller.abort();
```

---

## The Signal

```tsx
signal: controller.signal;
```

Axios listens to this signal.

```tsx
apiClient.get<Movie[]>("data", {
  signal: controller.signal,
});
```

Meaning:

```text
"If this signal gets aborted,
cancel the request immediately."
```

---

## Cleanup Function

```tsx
return () => controller.abort();
```

React executes the cleanup function when:

- Component unmounts
- Effect reruns (if dependencies change)

In our case:

```tsx
[];
```

means the effect runs once, so cleanup happens only when the component unmounts.

---

## Lifecycle Example

### Component Mounts

```text
MovieGrid renders
        ↓
useEffect runs
        ↓
Request starts
```

---

### User Leaves Page

```text
Component unmounts
        ↓
Cleanup function runs
        ↓
controller.abort()
        ↓
Request canceled
```

---

### Result

The API response is ignored.

No state updates occur.

```tsx
setMovies(...)
```

never executes.

---

## Why Handle CanceledError?

When a request is aborted, Axios throws an error.

Without this code:

```tsx
.catch((error) => {
  setError(error.message);
})
```

you would see an error message every time a request is intentionally canceled.

Example:

```text
canceled
```

or

```text
Request aborted
```

But cancellation is not a real failure.

That's why we write:

```tsx
if (error instanceof CanceledError) return;
```

Meaning:

```text
Ignore request cancellation.
Only handle actual errors.
```

---

## Visual Flow

```text
Component Mounts
        ↓
Create AbortController
        ↓
Send API Request
        ↓
Response Arrives
        ↓
Update State
```

OR

```text
Component Mounts
        ↓
Create AbortController
        ↓
Send API Request
        ↓
Component Unmounts
        ↓
controller.abort()
        ↓
Axios Throws CanceledError
        ↓
Ignore Error
```

---

## Benefits

### Cleans Up Obsolete Work

Requests can be canceled when their results are no longer needed. This saves work and bandwidth. A late Promise by itself is not automatically a memory leak.

### Avoids Stale Request Effects

Modern React no longer emits the old unmounted-state warning, but cancellation still helps prevent obsolete responses from participating in application logic.

### Better Performance

Cancels network requests that are no longer needed.

### Cleaner User Experience

Users don't see fake error messages caused by intentional cancellation.

---

## Key Takeaway

```tsx
const controller = new AbortController();
```

creates a cancellation controller.

```tsx
signal: controller.signal;
```

connects the request to the controller.

```tsx
controller.abort();
```

cancels the request.

```tsx
if (error instanceof CanceledError) return;
```

ignores expected cancellation errors.

This pattern is commonly used in React applications whenever data is fetched inside `useEffect`.

</div>

</details>

</div>
