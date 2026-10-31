<div dir="rtl" align="right">

# رساندن داده به چند لایه پایین‌تر — <span dir="ltr">Context</span> و مدیریت <span dir="ltr">State</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [مالکیت <span dir="ltr">State</span>](./lifting-state-and-state-design.md).

## مسئله: <span dir="ltr">theme</span> از چند <span dir="ltr">component</span> عبور می‌کند

اگر <span dir="ltr">component</span>های میانی <span dir="ltr">theme</span> را فقط تحویل بدهند، به آن **<span dir="ltr">Prop Drilling</span>** می‌گوییم. <span dir="ltr">Context</span> به مصرف‌کننده اجازه می‌دهد مقدار نزدیک‌ترین <span dir="ltr">provider</span> را بخواند.

<div dir="ltr" align="left">

~~~jsx
import { createContext, useContext, useState } from 'react';
const ThemeContext = createContext('light');
function Label() {
  const theme = useContext(ThemeContext);
  return <p>Theme: {theme}</p>;
}
export default function App() {
  const [theme, setTheme] = useState('light');
  return <ThemeContext.Provider value={theme}>
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      تغییر
    </button>
    <Label />
  </ThemeContext.Provider>;
}
~~~

</div>

<span dir="ltr">Context</span> خودش جای <span dir="ltr">state</span> ذخیره‌شده را نمی‌گیرد؛ در این مثال <span dir="ltr">state</span> در <span dir="ltr">App</span> است و <span dir="ltr">Context</span> آن را توزیع می‌کند.

## مثال دوم: <span dir="ltr">object</span> تازه در هر <span dir="ltr">render</span>

<div dir="ltr" align="left">

~~~jsx
// هر بار یک ارجاع تازه:
// <AuthContext.Provider value={{ user, login }}>
~~~

</div>

تغییر <span dir="ltr">value</span> با مقایسه مربوط، مصرف‌کننده‌ها را به‌روزرسانی می‌کند. اگر <span dir="ltr">object</span> بی‌دلیل تازه ساخته شود، ممکن است <span dir="ltr">render</span>های بیشتری ایجاد کند. جدا کردن <span dir="ltr">context</span>ها یا تثبیت <span dir="ltr">value</span> در صورت نیاز می‌تواند کمک کند؛ اول هزینه واقعی را بررسی کن.

## کدام ابزار کجا؟

<span dir="ltr">state</span> محلی برای <span dir="ltr">UI</span> محدود؛ <span dir="ltr">lifting</span> برای هماهنگی نزدیک؛ <span dir="ltr">Context</span> برای توزیع داده؛ <span dir="ltr">reducer</span> برای <span dir="ltr">transition</span>های منسجم؛ <span dir="ltr">store</span> با <span dir="ltr">selector</span> برای نیازهای مشترک پیچیده‌تر؛ لایه <span dir="ltr">server state</span> برای <span dir="ltr">cache</span> داده <span dir="ltr">API</span>. لازم نیست همه را از روز اول وارد کنی.

## پاسخ مصاحبه و تمرین

**آیا <span dir="ltr">Context</span> همه برنامه را دوباره <span dir="ltr">render</span> می‌کند؟** مصرف‌کننده‌های مقدار تغییرکرده <span dir="ltr">context</span> تحت تأثیرند؛ <span dir="ltr">render</span> والد هم مسیر جداگانه‌ای است. این دو را یکی ندان.

برای باز و بسته شدن <span dir="ltr">dropdown</span> تنها یک کارت، <span dir="ltr">store</span> سراسری لازم است؟

<details>
<summary>پاسخ</summary>

معمولاً خیر. <span dir="ltr">state</span> محلی در همان کارت یا مالک نزدیک آن کافی و روشن‌تر است.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Context & State Management

## Classify the state first

```text
Local UI state
Global client state
Server state
URL state
Form state
Persistent state
Derived state
```

Many state-management problems begin by choosing a library before identifying the type of state. Naturally, humans then create architecture to solve the architecture they just created.

## Context

Good for values such as:

- theme
- locale
- session/current user
- dependency/configuration objects
- scoped shared state

Consumers re-render when the consumed context value changes. A huge frequently changing context can create broad render work.

Possible fixes:

- split contexts by concern
- stabilize values where useful
- use selector-based external stores for high-frequency global state

## Redux Toolkit

Useful for explicit complex global client-state flows, middleware, predictable updates, and strong debugging/devtools.

## Zustand

Useful for relatively lightweight selector-based external client state.

## TanStack Query is different

TanStack Query primarily manages server state: async, cached, staleable remote data.

Do not copy query data into Redux/Zustand/local state without a concrete reason.

## URL state

Filters, pagination, sorting, and shareable search state often belong in search params so refresh/back-forward/share behavior works naturally.

## Interview questions

1. Context vs Redux?
2. Why is server state different?
3. When is URL state preferable?
4. Why can one giant context hurt performance?

</div>

</details>

</div>
