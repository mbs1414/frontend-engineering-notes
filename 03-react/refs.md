<div dir="rtl" align="right">

# چیزی را نگه داریم بدون درخواست <span dir="ltr">render</span> — <span dir="ltr">Ref</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">State</span>](./state.md) و [<span dir="ltr">Effect</span>](./effects.md).

## <span dir="ltr">state</span> برای نمایش، <span dir="ltr">ref</span> برای نگهداری مقدار غیرنمایشی

<span dir="ltr">useRef</span> یک <span dir="ltr">object</span> پایدار می‌دهد که <span dir="ltr">property</span> آن <span dir="ltr">current</span> است. تغییر <span dir="ltr">current</span> درخواست <span dir="ltr">render</span> نمی‌دهد. برای شناسه تایمر یا دسترسی به <span dir="ltr">DOM</span> مناسب است؛ اگر کاربر باید تغییر مقدار را ببیند، معمولاً <span dir="ltr">state</span> می‌خواهیم.

<div dir="ltr" align="left">

~~~jsx
import { useRef } from 'react';
export default function Search() {
  const inputRef = useRef(null);
  return <>
    <input ref={inputRef} aria-label="جست‌وجو" />
    <button onClick={() => inputRef.current?.focus()}>
      رفتن به جست‌وجو
    </button>
  </>;
}
~~~

</div>

پس از <span dir="ltr">commit</span>، <span dir="ltr">React node</span> مربوط به <span dir="ltr">input</span> را در <span dir="ltr">current</span> قرار می‌دهد. با کلیک، متد <span dir="ltr">focus</span> روی همان <span dir="ltr">node</span> اجرا می‌شود. پیش از اتصال یا پس از جداسازی، <span dir="ltr">current</span> می‌تواند <span dir="ltr">null</span> باشد.

## مثال دوم: نگه داشتن شناسه تایمر

<div dir="ltr" align="left">

~~~jsx
const timerRef = useRef(null);
function start() {
  clearTimeout(timerRef.current);
  timerRef.current = setTimeout(() => console.log('done'), 1000);
}
function cancel() {
  clearTimeout(timerRef.current);
}
~~~

</div>

این بخش داخل <span dir="ltr">component</span> است؛ در یک <span dir="ltr">component</span> واقعی <span dir="ltr">cleanup</span> هنگام <span dir="ltr">unmount</span> را هم با <span dir="ltr">Effect</span> اضافه کن. تغییر <span dir="ltr">id</span> تایمر خودش لازم نیست متن صفحه را عوض کند، پس <span dir="ltr">ref</span> مناسب است.

## اشتباه رایج و پاسخ مصاحبه

نوشتن <span dir="ltr">countRef.current</span> در <span dir="ltr">JSX</span> و تغییر آن در کلیک تضمین نمی‌کند عدد روی صفحه به‌روز شود. <span dir="ltr">render</span> لازم است. همچنین خواندن و نوشتن دلخواه <span dir="ltr">ref</span> در <span dir="ltr">render</span> می‌تواند با خلوص و قابلیت‌های زمان‌بندی <span dir="ltr">React</span> ناسازگار باشد؛ معمولاً <span dir="ltr">handler</span> و <span dir="ltr">Effect</span> جای مناسب‌اند.

**آیا <span dir="ltr">ref</span> جای <span dir="ltr">state</span> سریع‌تر است؟** این‌ها مسئولیت متفاوت دارند؛ نیاز به نمایش، معیار انتخاب است.

## تمرین با پاسخ

تعداد آیتم‌های سبد که در <span dir="ltr">Header</span> نمایش داده می‌شود باید <span dir="ltr">ref</span> باشد یا <span dir="ltr">state</span>؟

<details>
<summary>پاسخ</summary>

<span dir="ltr">state</span> یا داده <span dir="ltr">derived</span> از یک منبع <span dir="ltr">reactive</span>. <span dir="ltr">ref</span> به‌تنهایی تغییر <span dir="ltr">UI</span> را درخواست نمی‌کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# React Refs

## Ref basics

```tsx
const inputRef = useRef<HTMLInputElement>(null);
```

A ref object persists across renders and exposes mutable `.current`.

## State vs ref

| Behavior | `useState` | `useRef` |
|---|---|---|
| Persists across renders | Yes | Yes |
| Update triggers render | Yes | No |
| Intended for visible UI state | Yes | Usually no |
| DOM handle | No | Yes |

This corrects the original misconception: state does **not** reset on every render.

## DOM refs

```tsx
function Search() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>
        Focus
      </button>
    </>
  );
}
```

## Good non-UI ref uses

- timer ID
- request sequence ID
- DOM node
- imperative third-party instance
- mutable value that should not cause a render

If the UI depends on a value, state is usually the correct tool.

## Interview questions

1. Ref vs state?
2. Why does ref mutation not re-render?
3. Common ref use cases?
4. When is using a ref instead of state a bug?

</div>

</details>

</div>
