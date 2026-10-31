<div dir="rtl" align="right">

# <span dir="ltr">React Compiler</span> و <span dir="ltr">API</span>های جدید؛ هرکدام چه مسئله‌ای حل می‌کنند؟

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Hook</span>ها](./hooks.md)، [<span dir="ltr">Suspense</span>](./suspense-and-concurrent-react.md). این درس را بعد از مفاهیم پایه بخوان.

## <span dir="ltr">Compiler</span> را با خود <span dir="ltr">React</span> یکی نگیر

<span dir="ltr">React Compiler</span> ابزاری در زمان <span dir="ltr">build</span> است که در کد سازگار می‌تواند بعضی بهینه‌سازی‌های <span dir="ltr">memoization</span> را خودکار انجام دهد. فعال بودن آن به تنظیم ابزار پروژه وابسته است؛ صرف استفاده از <span dir="ltr">React</span> به معنی پیکربندی شدن <span dir="ltr">Compiler</span> نیست. [مستندات رسمی <span dir="ltr">Compiler</span>](https://react.dev/learn/react-compiler/introduction) مبنای بررسی تنظیم پروژه است.

<div dir="ltr" align="left">

~~~jsx
function Total({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <p>{total}</p>;
}
~~~

</div>

این <span dir="ltr">component</span> اول باید درست و خالص باشد. سپس با اندازه‌گیری و ابزار پروژه تصمیم می‌گیریم چه بهینه‌سازی لازم است؛ افزودن <span dir="ltr">useMemo</span> به همه محاسبه‌ها قاعده عمومی نیست.

## نقشه <span dir="ltr">API</span>ها

| <span dir="ltr">API</span> | مسئله |
| --- | --- |
| <span dir="ltr">use</span> | خواندن منبع پشتیبانی‌شده مثل <span dir="ltr">Promise</span> یا <span dir="ltr">Context</span> |
| <span dir="ltr">useActionState</span> | نگه داشتن <span dir="ltr">state</span> حاصل از اجرای <span dir="ltr">Action</span> |
| <span dir="ltr">useOptimistic</span> | نمایش موقت نتیجه خوش‌بینانه هنگام عملیات |
| <span dir="ltr">useFormStatus</span> از <span dir="ltr">react-dom</span> | خواندن وضعیت فرم <span dir="ltr">Action</span> والد |

## مثال ساده <span dir="ltr">useActionState</span>

<div dir="ltr" align="left">

~~~jsx
import { useActionState } from 'react';
async function greet(previousState, formData) {
  return 'سلام ' + formData.get('name');
}
function Form() {
  const [message, action, pending] = useActionState(greet, '');
  return <form action={action}>
    <input name="name" aria-label="نام" />
    <button disabled={pending}>ارسال</button>
    <p>{message}</p>
  </form>;
}
~~~

</div>

تابع <span dir="ltr">Action</span>، <span dir="ltr">state</span> قبلی و داده فرم را می‌گیرد و <span dir="ltr">state</span> بعدی را برمی‌گرداند. این مثال محلی است؛ ذخیره روی سرور و اعتبارسنجی واقعی در آن انجام نمی‌شود. <span dir="ltr">useFormStatus</span> باید از <span dir="ltr">component</span> داخل فرم مربوط خوانده شود.

<span dir="ltr">Server Component</span> بخشی از <span dir="ltr">component tree</span> است که در محیط سرور اجرا می‌شود؛ پشتیبانی‌اش به <span dir="ltr">framework</span> و معماری وابسته است و با <span dir="ltr">SSR</span> یک مفهوم یکسان نیست.

## پاسخ مصاحبه و تمرین

**آیا <span dir="ltr">optimistic UI</span> نیاز به رسیدگی به خطا ندارد؟** دارد؛ باید شکست، بازگشت یا <span dir="ltr">reconcile</span> با نتیجه واقعی و پیام مناسب طراحی شود.

قبل از مطالعه این <span dir="ltr">API</span>ها، فهم کدام مباحث مهم‌تر است؟

<details>
<summary>پاسخ</summary>

<span dir="ltr">state snapshot</span>، خلوص <span dir="ltr">render</span>، <span dir="ltr">closure</span>، <span dir="ltr">Effect</span> و مدیریت درخواست. <span dir="ltr">API</span> جدید جای این پایه‌ها را نمی‌گیرد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# React Compiler & Modern APIs

## React Compiler

React Compiler analyzes React code and can automatically apply memoization-style optimizations where it can prove them safe.

It aims to reduce defensive/manual use of:

```text
React.memo
useMemo
useCallback
```

This does not remove the need to understand referential equality, render costs, stable identity, and profiling.

Compiler behavior depends on code following React rules and supported patterns.

Compiler-related directives include patterns such as:

```js
'use memo';
'use no memo';
```

Use them intentionally, not as ritual decoration.

## `use`

`use` can read supported resources such as promises/context in supported rendering patterns and integrates with Suspense/error boundaries.

## `useActionState`

Helps manage state produced by an action, commonly in form/action workflows.

## `useOptimistic`

Helps render an optimistic state while asynchronous work is pending.

Optimistic UI still needs failure/rollback behavior.

## `useFormStatus`

A React DOM hook for reading the status of a parent form/action, useful for pending submit UI without manually threading status through props.

## Server Components

Some component execution can remain on the server, reducing client JavaScript for server-only components and enabling server-side data composition patterns.

Important: Server Components are not universally the default in every React app. Framework/runtime architecture determines support and defaults.

## Interview questions

1. What problem does React Compiler target?
2. Why still understand manual memoization?
3. What is optimistic UI?
4. What happens if an optimistic mutation fails?
5. What are Server Components at a high level?

</div>

</details>

</div>
