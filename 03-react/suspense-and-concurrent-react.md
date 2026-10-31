<div dir="rtl" align="right">

# منتظر ماندن رابط کاربری — <span dir="ltr">Suspense</span> و <span dir="ltr">Transition</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Rendering</span>](./rendering.md) و [<span dir="ltr">Async JavaScript</span>](../01-javascript/async-javascript.md).

## <span dir="ltr">Suspense</span> چه چیزی را نشان می‌دهد؟

برای کد یا منبع داده‌ای که از سازوکار <span dir="ltr">Suspense</span> پشتیبانی کند، می‌توان تا آماده شدن بخش مربوط <span dir="ltr">fallback</span> نشان داد:

<div dir="ltr" align="left">

~~~jsx
import { lazy, Suspense } from 'react';
const Report = lazy(() => import('./Report.jsx'));
function Page() {
  return <Suspense fallback={<p>در حال آماده‌سازی گزارش…</p>}>
    <Report />
  </Suspense>;
}
~~~

</div>

<span dir="ltr">Report.jsx</span> باید <span dir="ltr">component</span> پیش‌فرض <span dir="ltr">export</span> کند. تا <span dir="ltr">chunk</span> آماده شود پیام انتظار دیده می‌شود. <span dir="ltr">fetch</span> عادی داخل <span dir="ltr">useEffect</span> خودکار این <span dir="ltr">boundary</span> را فعال نمی‌کند؛ داده باید با <span dir="ltr">integration</span> سازگار تهیه شود.

## <span dir="ltr">Transition</span>: بعضی تغییرها فوریت کمتری دارند

<div dir="ltr" align="left">

~~~jsx
const [query, setQuery] = useState('');
const [filter, setFilter] = useState('');
const [isPending, startTransition] = useTransition();
function handleChange(event) {
  const next = event.target.value;
  setQuery(next);
  startTransition(() => setFilter(next));
}
~~~

</div>

این قطعه داخل <span dir="ltr">component</span> و با <span dir="ltr">import Hook</span>هاست. <span dir="ltr">input</span> با <span dir="ltr">query</span> فوری به‌روز می‌شود؛ نتایج سنگین با <span dir="ltr">filter</span> می‌توانند اولویت پایین‌تری بگیرند. <span dir="ltr">transition</span> جای <span dir="ltr">debounce</span> شبکه یا <span dir="ltr">Web Worker</span> نیست و کار سنگین دلخواه را به <span dir="ltr">thread</span> دیگر نمی‌برد.

<span dir="ltr">Concurrent rendering</span> یعنی <span dir="ltr">React</span> می‌تواند بعضی محاسبات <span dir="ltr">render</span> را متوقف، دوباره شروع یا کنار بگذارد؛ به معنی چند <span dir="ltr">thread</span> شدن اجرای <span dir="ltr">component</span>ها نیست. <span dir="ltr">render</span> خالص برای این قابلیت ضروری است.

## پاسخ مصاحبه و تمرین

**<span dir="ltr">useDeferredValue</span> چه می‌کند؟** نسخه‌ای با اولویت کمتر برای مصرف در بخش کند فراهم می‌کند؛ تأخیر زمانی ثابت مثل <span dir="ltr">debounce</span> تعریف نمی‌کند.

آیا برای <span dir="ltr">input</span> کنترل‌شده باید خود <span dir="ltr">setQuery</span> را <span dir="ltr">transition</span> کنیم؟

<details>
<summary>پاسخ</summary>

خیر؛ مقدار کنترل‌کننده <span dir="ltr">input</span> باید فوری به‌روز شود. تغییر وابسته و کم‌فوریت‌تر، مثل نتایج سنگین، می‌تواند جدا مدیریت شود.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Suspense & Concurrent React

## Concurrent rendering mental model

Modern React can prioritize, pause, restart, or abandon some rendering work before commit.

This does **not** mean React rendering suddenly executes on multiple CPU threads.

## `useTransition`

Marks updates as non-urgent.

```tsx
const [isPending, startTransition] = useTransition();

function handleChange(value: string) {
  setInput(value); // urgent
  startTransition(() => {
    setFilter(value); // lower priority
  });
}
```

Useful when expensive rendering competes with urgent input.

## `useDeferredValue`

```tsx
const deferredQuery = useDeferredValue(query);
```

Mental distinction:

```text
useTransition
I control the update being marked as a transition.

useDeferredValue
I already have a value and want a deferred version for slower UI.
```

## Suspense

Suspense coordinates fallback UI for Suspense-enabled pending dependencies.

```tsx
<Suspense fallback={<Spinner />}>
  <LazyPage />
</Suspense>
```

Common uses include lazy-loaded components and supported framework/data/server-rendering integrations.

Suspense is not a magical universal wrapper around arbitrary client fetch code.

## `React.lazy`

```tsx
const Settings = lazy(() => import('./Settings'));
```

Creates a component-level lazy/code-splitting boundary.

## Interview questions

1. What does a transition solve?
2. Transition vs deferred value?
3. Does concurrent rendering mean multithreaded React?
4. What does Suspense coordinate?
5. What does `React.lazy` change about loading?

</div>

</details>

</div>
