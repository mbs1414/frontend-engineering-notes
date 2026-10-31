<div dir="rtl" align="right">

# چه زمانی <span dir="ltr">useEffect</span> لازم داریم؟ — هماهنگی با بیرون <span dir="ltr">React</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Render</span>](./rendering.md)، [<span dir="ltr">State</span>](./state.md) و [<span dir="ltr">Closure</span>](../01-javascript/scope-closure-hoisting.md).

## از یک نیاز واقعی شروع کن

<span dir="ltr">component</span> ساعت روی صفحه است و باید هر ثانیه به‌روز شود. <span dir="ltr">timer</span> یک سیستم بیرونی است؛ طول عمر آن را باید با حضور <span dir="ltr">component</span> هماهنگ کنیم. <span dir="ltr">Effect</span> برای چنین <span dir="ltr">synchronization</span>هایی کاربرد دارد. اگر فقط نام کامل را از نام و نام خانوادگی می‌سازی، همان محاسبه داخل <span dir="ltr">render</span> کافی است. [راهنمای رسمی <span dir="ltr">Effect</span>های غیرضروری](https://react.dev/learn/you-might-not-need-an-effect) این تمایز را توضیح می‌دهد.

<div dir="ltr" align="left">

~~~jsx
import { useEffect, useState } from 'react';
export default function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <time>{now.toLocaleTimeString()}</time>;
}
~~~

</div>

۱. <span dir="ltr">React</span> خروجی را <span dir="ltr">commit</span> می‌کند.
۲. <span dir="ltr">setup</span>، <span dir="ltr">timer</span> را ثبت می‌کند.
۳. <span dir="ltr">timer state</span> را به‌روز می‌کند.
۴. هنگام حذف <span dir="ltr">component</span>، <span dir="ltr">cleanup</span> تایمر را پاک می‌کند.

در توسعه، <span dir="ltr">Strict Mode</span> می‌تواند چرخه <span dir="ltr">setup</span> و <span dir="ltr">cleanup</span> اضافی اجرا کند تا نقص <span dir="ltr">cleanup</span> دیده شود؛ این رفتار را با باگ تایمر حل‌نشده اشتباه نگیر.

## <span dir="ltr">dependency</span> یعنی <span dir="ltr">Effect</span> به چه مقدارهایی وابسته است؟

<div dir="ltr" align="left">

~~~jsx
useEffect(() => {
  function onResize() {
    console.log(prefix, window.innerWidth);
  }
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, [prefix]);
~~~

</div>

این قطعه داخل <span dir="ltr">component</span>ی است که <span dir="ltr">prefix</span> را دریافت می‌کند. وقتی <span dir="ltr">prefix</span> تغییر کند، <span dir="ltr">cleanup</span> قبلی اجرا می‌شود و <span dir="ltr">setup</span> جدید با <span dir="ltr">prefix</span> تازه ساخته می‌شود. مقدارهای <span dir="ltr">reactive</span> مصرف‌شده باید در <span dir="ltr">dependency</span>ها لحاظ شوند؛ حذف <span dir="ltr">dependency</span> برای ساکت کردن هشدار، مشکل <span dir="ltr">stale closure</span> می‌سازد.

بدون آرایه، <span dir="ltr">Effect</span> بعد از هر <span dir="ltr">commit</span> مربوط اجرا می‌شود؛ با آرایه خالی به مقدار <span dir="ltr">reactive</span> متغیری وابسته نیست. «آرایه خالی یعنی دقیقاً یک بار در کل عمر برنامه» تعبیر مطمئنی نیست.

## مثال دوم: درخواست لغوشونده

<div dir="ltr" align="left">

~~~jsx
useEffect(() => {
  const controller = new AbortController();
  let active = true;
  async function load() {
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      if (active) setData(result);
    } catch (error) {
      if (active) setError(error);
    }
  }
  load();
  return () => { active = false; controller.abort(); };
}, [url]);
~~~

</div>

این الگو داخل <span dir="ltr">component</span> با <span dir="ltr">url</span>، <span dir="ltr">setData</span> و <span dir="ltr">setError</span> است و برای نمایش <span dir="ltr">lifecycle</span> نوشته شده؛ <span dir="ltr">UI</span> کامل <span dir="ltr">loading/error</span> در درس <span dir="ltr">fetch</span> آمده است. <span dir="ltr">active</span> جلوی نوشتن نتیجه منسوخ را می‌گیرد و <span dir="ltr">abort</span> درخواست مرورگر را لغو می‌کند. برای <span dir="ltr">cache</span>، <span dir="ltr">retry</span> و هماهنگی چند مصرف‌کننده معمولاً لایه داده جدا لازم داریم.

## <span dir="ltr">useLayoutEffect</span> چه فرقی دارد؟

برای اندازه‌گیری یا تغییر <span dir="ltr">DOM</span> که باید قبل از <span dir="ltr">paint</span> انجام شود کاربرد دارد و می‌تواند نمایش را عقب بیندازد. <span dir="ltr">useEffect</span> انتخاب معمول <span dir="ltr">synchronization</span> است؛ زمان اجرای آن را همیشه «حتماً بعد از <span dir="ltr">paint</span>» فرض نکن.

## پاسخ مصاحبه و تمرین

**<span dir="ltr">cleanup</span> چه زمانی اجرا می‌شود؟** پیش از <span dir="ltr">setup</span> بعدی برای <span dir="ltr">dependency</span>های تغییرکرده، هنگام <span dir="ltr">unmount</span> و در چرخه‌های بررسی توسعه مربوط.

برای محاسبه تعداد محصولات فیلترشده به <span dir="ltr">Effect</span> نیاز داریم؟

<details>
<summary>پاسخ</summary>

معمولاً خیر. <span dir="ltr">`const count = products.filter(matches).length`</span> داخل <span dir="ltr">render</span> کافی است. اگر محاسبه واقعاً سنگین بود، پس از اندازه‌گیری سراغ <span dir="ltr">memoization</span> برو.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# React Effects

## What an Effect is for

An Effect synchronizes React with an external system after commit.

Examples:

- WebSocket
- network subscription/request lifecycle
- timers
- DOM/browser APIs
- event listeners
- third-party widgets

## Cleanup

The original note had the right pattern:

```text
WebSocket → close/unsubscribe
request   → AbortController
timer     → clearTimeout/clearInterval
listener  → removeEventListener
```

Example:

```tsx
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  return () => controller.abort();
}, [url]);
```

## Do not use effects for simple derivation

Bad:

```tsx
useEffect(() => {
  setFiltered(items.filter(matches));
}, [items, query]);
```

Usually better:

```tsx
const filtered = items.filter(matches);
```

Use `useMemo` only if the calculation is expensive or stable identity matters.

## Dependencies

Dependencies should describe reactive values used by the effect.

```tsx
useEffect(() => {
  subscribe(roomId);
  return () => unsubscribe(roomId);
}, [roomId]);
```

Do not delete dependencies merely to satisfy your preferred outcome. Refactor the effect instead.

## Stale closures

Effects capture values from the render where they were created. Missing dependencies can leave callbacks using old values.

## `useEffect` vs `useLayoutEffect`

- `useEffect`: most external synchronization.
- `useLayoutEffect`: DOM measurement/mutation that must happen before paint. It can block painting, so use sparingly.

## Strict Mode

Development can run setup/cleanup extra times to expose missing cleanup and impure logic.

## Race conditions

Multiple requests can finish out of order. Cancellation or request identity checks prevent older results from overwriting newer state.

## Interview questions

1. What problem should an effect solve?
2. Why return cleanup?
3. What is a stale closure?
4. Why is derived state in an effect often unnecessary?
5. `useEffect` vs `useLayoutEffect`?

</div>

</details>

</div>
