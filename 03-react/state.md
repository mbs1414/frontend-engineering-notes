<div dir="rtl" align="right">

# چرا بعد از <span dir="ltr">setState</span> مقدار قدیمی را می‌بینم؟ — <span dir="ltr">State</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Render</span> و <span dir="ltr">Commit</span>](./rendering.md)، [<span dir="ltr">Closure</span>](../01-javascript/scope-closure-hoisting.md).

## <span dir="ltr">state</span> چه فرقی با متغیر معمولی دارد؟

متغیر محلی با اجرای دوباره تابع از نو ساخته می‌شود. <span dir="ltr">React</span> مقدار <span dir="ltr">state</span> را با هویت <span dir="ltr">component</span> نگه می‌دارد و هنگام <span dir="ltr">render</span> بعدی در اختیار تابع قرار می‌دهد.

<div dir="ltr" align="left">

~~~jsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  function increment() {
    setCount(count + 1);
    console.log(count);
  }
  return <button onClick={increment}>Count: {count}</button>;
}
~~~

</div>

در اولین کلیک، <span dir="ltr">log</span> برابر صفر است، ولی دکمه در <span dir="ltr">render</span> بعدی ۱ نشان می‌دهد. <span dir="ltr">setCount</span> متغیر <span dir="ltr">count</span> همین اجرای تابع را تغییر نمی‌دهد؛ به <span dir="ltr">React</span> درخواست <span dir="ltr">state</span> بعدی می‌دهد. هر <span dir="ltr">render</span> یک **<span dir="ltr">Snapshot</span>** از <span dir="ltr">state</span> دارد. این مدل در [توضیح رسمی <span dir="ltr">State</span>](https://react.dev/learn/state-as-a-snapshot) هم مبناست.

## سه بار افزایش؛ چرا گاهی فقط یکی اضافه می‌شود؟

در <span dir="ltr">handler</span> یک <span dir="ltr">render</span> که <span dir="ltr">count</span> برابر صفر است:

<div dir="ltr" align="left">

~~~jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
~~~

</div>

هر سه خط، جایگزینی با عدد ۱ را درخواست می‌کنند. برای محاسبه مرحله‌به‌مرحله از مقدار صف‌شده قبلی، **<span dir="ltr">Functional Update</span>** بنویس:

<div dir="ltr" align="left">

~~~jsx
setCount(current => current + 1);
setCount(current => current + 1);
setCount(current => current + 1);
~~~

</div>

اینجا مسیر ۰ به ۱، ۱ به ۲ و ۲ به ۳ است. این <span dir="ltr">updater</span>ها باید خالص باشند؛ ارسال درخواست را داخلشان نگذار.

## <span dir="ltr">Batching</span>

<span dir="ltr">React</span> می‌تواند چند <span dir="ltr">update</span> را گروه‌بندی کند تا برای هر <span dir="ltr">setter</span> یک <span dir="ltr">commit</span> جدا نداشته باشیم. این به معنی یکی شدن متغیرهای <span dir="ltr">render</span> فعلی با <span dir="ltr">state</span> آینده نیست. درباره زمان‌بندی از جمله مبهم «<span dir="ltr">setter</span> همیشه یک <span dir="ltr">Promise</span> است» استفاده نکن؛ <span dir="ltr">setter</span> معمول <span dir="ltr">state Promise</span> برنمی‌گرداند.

## داده تکراری نساز

<div dir="ltr" align="left">

~~~jsx
const [firstName, setFirstName] = useState('Sara');
const [lastName, setLastName] = useState('Ahmadi');
const fullName = firstName + ' ' + lastName;
~~~

</div>

<span dir="ltr">fullName</span> از دو مقدار دیگر محاسبه می‌شود؛ معمولاً <span dir="ltr">state</span> و <span dir="ltr">Effect</span> جدا نمی‌خواهد. به آن **<span dir="ltr">Derived Data</span>** می‌گوییم.

## <span dir="ltr">object</span> و <span dir="ltr">input</span>

<div dir="ltr" align="left">

~~~jsx
// داخل component:
const [user, setUser] = useState({ name: 'Sara', age: 24 });
const birthday = () => setUser(u => ({ ...u, age: u.age + 1 }));
~~~

</div>

نسخه جدید می‌سازیم تا مقدار قبلی را دستکاری نکنیم. ورودی با <span dir="ltr">value</span> و <span dir="ltr">onChange</span> تحت کنترل <span dir="ltr">state</span>، **<span dir="ltr">Controlled</span>** است:

<div dir="ltr" align="left">

~~~jsx
const [name, setName] = useState('');
// در JSX:
// <input value={name} onChange={e => setName(e.target.value)} />
~~~

</div>

در ورودی <span dir="ltr">uncontrolled</span>، مرورگر مقدار جاری را نگه می‌دارد و می‌توان از <span dir="ltr">defaultValue</span> و <span dir="ltr">ref</span> استفاده کرد.

## پاسخ مصاحبه و تمرین

**کجا <span dir="ltr">state</span> قرار بگیرد؟** نزدیک‌ترین مالک مشترکی که باید آن را هماهنگ کند. داده سرور، <span dir="ltr">URL</span> و فرم هم الزاماً نباید در یک <span dir="ltr">store</span> عمومی کپی شوند.

از <span dir="ltr">count</span> صفر شروع می‌کنیم: <span dir="ltr">`setCount(5)`</span> و سپس <span dir="ltr">`setCount(c => c + 1)`</span>. مقدار بعدی؟

<details>
<summary>پاسخ</summary>

۶. ابتدا جایگزینی با ۵، سپس اجرای <span dir="ltr">updater</span> روی نتیجه صف‌شده. اگر هر دو خط از <span dir="ltr">count</span> همان <span dir="ltr">render</span> بخوانند، تحلیل فرق می‌کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# React State

## State persists across renders

```tsx
const [count, setCount] = useState(0);
```

React associates state with component identity and remembers it across renders.

## State updates schedule renders

```tsx
setCount(1);
```

The current render's `count` variable does not mutate in place.

## Functional updates

Use when the next state depends on previous state:

```tsx
setCount(current => current + 1);
```

This works safely with queued/batched updates.

## Batching

React can group multiple updates to avoid unnecessary separate renders.

```tsx
setFirstName('A');
setLastName('B');
```

## Derived state

Avoid duplicating information that can be calculated.

Bad:

```tsx
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

Better:

```tsx
const fullName = `${firstName} ${lastName}`;
```

This removes synchronization bugs and an effect-driven extra update.

## State ownership

Use the lowest owner that needs to coordinate the value.

- local UI → component state
- sibling coordination → lifted state
- broad client state → context/store if justified
- server data → server-state solution
- navigation/filter state → often URL
- form data → form state

## Controlled vs uncontrolled

Controlled:

```tsx
<input value={name} onChange={e => setName(e.target.value)} />
```

Uncontrolled:

```tsx
<input defaultValue="A" ref={inputRef} />
```

Neither is universally better.

## Interview questions

1. What is batching?
2. Why use functional updates?
3. What is derived state?
4. Controlled vs uncontrolled?
5. Where should state live?

</div>

</details>

</div>
