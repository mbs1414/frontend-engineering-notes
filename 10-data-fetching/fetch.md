<div dir="rtl" align="right">

# اولین درخواست شبکه را بفهمیم — <span dir="ltr">Fetch</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">async/await</span>](../01-javascript/async-javascript.md) و [<span dir="ltr">HTTP</span>](../06-network/http.md).

## دو مرحله انتظار داریم

<span dir="ltr">fetch</span> ابتدا یک <span dir="ltr">Response</span> می‌دهد. برای خواندن <span dir="ltr">body</span> به عنوان <span dir="ltr">JSON</span>، مرحله <span dir="ltr">asynchronous</span> دیگری داریم. هیچ‌کدام تضمین نمی‌کنند ساختار <span dir="ltr">JSON</span> همان چیزی باشد که برنامه انتظار دارد.

<div dir="ltr" align="left">

~~~js
async function getUsers() {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }
  const users = await response.json();
  if (!Array.isArray(users)) {
    throw new Error('Expected an array');
  }
  return users;
}
~~~

</div>

مسیر /<span dir="ltr">api/users</span> فرضی است و باید در پروژه مصرف‌کننده وجود داشته باشد. بررسی آرایه فقط یک <span dir="ltr">validation</span> حداقلی است؛ شکل اعضا را بررسی نکرده‌ایم. پاسخ ۴۰۴ یا ۵۰۰ خودکار <span dir="ltr">rejection</span> نیست؛ شکست شبکه یا لغو مسیر خطای <span dir="ltr">fetch</span> است. [راهنمای رسمی <span dir="ltr">fetch</span>](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) این تفاوت را توضیح می‌دهد.

## مثال دوم: یک <span dir="ltr">UI</span> با چهار وضعیت

<div dir="ltr" align="left">

~~~jsx
import { useEffect, useState } from 'react';
function Users() {
  const [result, setResult] = useState({ status: 'loading' });
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch('/api/users', {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const users = await response.json();
        if (!Array.isArray(users)) throw new Error('Invalid response');
        if (active) setResult({ status: 'success', users });
      } catch (error) {
        if (active) setResult({ status: 'error' });
      }
    }
    load();
    return () => { active = false; controller.abort(); };
  }, []);
  if (result.status === 'loading') return <p>در حال دریافت…</p>;
  if (result.status === 'error') return <p role="alert">دریافت ناموفق بود</p>;
  if (result.users.length === 0) return <p>کاربری وجود ندارد</p>;
  return <ul>{result.users.map(user =>
    <li key={user.id}>{user.name}</li>
  )}</ul>;
}
~~~

</div>

در این مثال فرض کرده‌ایم اعضا <span dir="ltr">id</span> یکتا و <span dir="ltr">name</span> دارند. موفق بودن درخواست با خالی نبودن نتیجه یکی نیست؛ <span dir="ltr">empty state</span> را جدا نشان می‌دهیم. <span dir="ltr">cleanup</span> جلوی استفاده از نتیجه پس از پایان نیاز را می‌گیرد.

## وقتی نیازها زیاد می‌شوند

اگر <span dir="ltr">cache</span>، <span dir="ltr">retry</span>، اشتراک درخواست و <span dir="ltr">invalidation</span> اضافه شوند، فقط نوشتن یک <span dir="ltr">fetch</span> کافی نیست. [<span dir="ltr">Server State</span>](./server-state.md) توضیح می‌دهد چرا یک لایه مدیریت داده می‌تواند مفید باشد.

## پاسخ مصاحبه و تمرین

پاسخ ۲۰۴ بدون <span dir="ltr">body</span> است. آیا باید همیشه <span dir="ltr">response.json</span>() صدا بزنیم؟

<details>
<summary>پاسخ</summary>

خیر. قالب و وجود <span dir="ltr">body</span> تابع قرارداد <span dir="ltr">endpoint</span> است. <span dir="ltr">parse</span> کردن <span dir="ltr">JSON</span> برای <span dir="ltr">body</span> خالی می‌تواند خطا بدهد؛ موفقیت <span dir="ltr">HTTP</span> با وجود <span dir="ltr">JSON</span> یکسان نیست.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Fetch Fundamentals

## Basic request

```ts
const response = await fetch('/api/users');

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const users = await response.json();
```

`fetch()` rejects for network-level failures and aborts. It does **not** automatically reject just because the HTTP status is 404 or 500, so check `response.ok`/`status` yourself.

## Request lifecycle concerns

A production data layer must usually deal with more than "call endpoint":

- request parameters and serialization
- HTTP errors and business errors
- cancellation
- race conditions
- retries
- authentication
- parsing/validation
- caching and deduplication

A generic `useData<T>()` hook is useful for learning the mechanics, but once caching, refetching, mutation invalidation, and deduplication appear, a server-state abstraction such as TanStack Query is usually more appropriate.

## Generic hook example

The original Movie Hub `useData<T>` example is preserved in [Generics & Advanced Types](../02-typescript/generics-and-advanced-types.md#generics-in-reusable-data-fetching-code). Keep it there as a TypeScript/custom-hook learning exercise; this section focuses on the request lifecycle and why server-state libraries become useful as requirements grow.

</div>

</details>

</div>
