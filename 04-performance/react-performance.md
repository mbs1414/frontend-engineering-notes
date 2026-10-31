<div dir="rtl" align="right">

# بهینه‌سازی <span dir="ltr">React</span> با دلیل — <span dir="ltr">Memoization</span> و <span dir="ltr">Virtualization</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Rendering</span>](../03-react/rendering.md) و [اندازه‌گیری](./performance-fundamentals.md).

## سه ابزار را از هم جدا کن

| ابزار | چه چیزی را می‌تواند نگه دارد؟ |
| --- | --- |
| <span dir="ltr">React.memo</span> | امکان رد کردن <span dir="ltr">render</span> ناشی از <span dir="ltr">props</span> بدون تغییر |
| <span dir="ltr">useMemo</span> | نتیجه محاسبه بین <span dir="ltr">render</span>ها با <span dir="ltr">dependency</span> مشابه |
| <span dir="ltr">useCallback</span> | هویت تابع بین <span dir="ltr">render</span>ها با <span dir="ltr">dependency</span> مشابه |

این‌ها تضمین <span dir="ltr">correctness</span> یا جایگزین طراحی <span dir="ltr">state</span> نیستند. <span dir="ltr">useCallback</span> خود تابع را اجرا نمی‌کند و کار داخل آن را سریع‌تر نمی‌کند.

<div dir="ltr" align="left">

~~~jsx
const visible = useMemo(
  () => products.filter(product => product.title.includes(query)),
  [products, query],
);
~~~

</div>

این قطعه داخل <span dir="ltr">component</span> است و <span dir="ltr">useMemo</span> باید <span dir="ltr">import</span> شود. اگر <span dir="ltr">query</span> در هر تایپ تغییر کند، محاسبه دوباره لازم است. اگر فیلتر ارزان باشد، هزینه و پیچیدگی <span dir="ltr">memoization</span> شاید ارزش نداشته باشد.

## مثال دوم: هویت <span dir="ltr">props</span>

<div dir="ltr" align="left">

~~~jsx
// حتی اگر List با memo پوشیده شده باشد، آرایه اینجا تازه است:
// <List items={products.filter(matches)} />
~~~

</div>

مقایسه سطحی <span dir="ltr">props</span>، محتوای عمیق آرایه را نمی‌سنجد؛ ارجاع تازه می‌تواند باعث اجرای دوباره شود. ابتدا <span dir="ltr">Profiler</span> نشان دهد این <span dir="ltr">render</span> واقعاً مشکل دارد.

برای ده‌هزار ردیف، **<span dir="ltr">Virtualization</span>** فقط محدوده قابل مشاهده و کمی اطرافش را <span dir="ltr">render</span> می‌کند. **<span dir="ltr">Debounce</span>** منتظر مکث می‌ماند؛ **<span dir="ltr">Throttle</span>** تعداد اجرا در بازه را محدود می‌کند. <span dir="ltr">Lazy loading</span> کد بخش‌های غیرضروری را به بعد می‌سپارد.

## پاسخ مصاحبه و تمرین

**آیا <span dir="ltr">memo</span> جلوی تغییر <span dir="ltr">state</span> خود <span dir="ltr">component</span> را می‌گیرد؟** خیر. <span dir="ltr">context</span> مصرف‌شده هم مسیر مستقلی برای به‌روزرسانی دارد.

برای جدولی با ۵۰هزار ردیف که اسکرولش کند است، فقط <span dir="ltr">useCallback</span> کافی است؟

<details>
<summary>پاسخ</summary>

بعید است. تعداد <span dir="ltr">node</span>ها، هزینه ردیف‌ها و <span dir="ltr">layout</span> را اندازه بگیر؛ <span dir="ltr">virtualization</span> و <span dir="ltr">pagination</span> ممکن است اثر بیشتری داشته باشند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# React Performance

## Start with architecture

Before memoization ask:

- Is rapidly changing state too high in the tree?
- Is one context invalidating too many consumers?
- Are huge lists fully rendered?
- Are effects causing redundant updates?
- Is expensive work repeated?
- Are memoized children receiving new references every render?

## `React.memo`

```tsx
const UserCard = memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});
```

New object props defeat reference equality:

```tsx
<UserCard user={{ name: 'A' }} />
```

## `useMemo`

Caches a calculation result until dependencies change.

```tsx
const filtered = useMemo(
  () => expensiveFilter(items, query),
  [items, query],
);
```

Useful when computation is expensive or stable identity matters.

Usually pointless:

```tsx
const fullName = useMemo(
  () => `${firstName} ${lastName}`,
  [firstName, lastName],
);
```

The bookkeeping can cost more than trivial work.

## `useCallback`

Caches a function reference.

```tsx
const onSelect = useCallback((id: number) => {
  setSelectedId(id);
}, []);
```

Useful when stable identity matters downstream, often with memoized children or dependencies.

## Debounce vs throttle

**Debounce:** wait until calls stop for a duration.

Good for search, autosave, delayed validation.

**Throttle:** allow at most one execution per interval.

Good for scroll, pointer movement, resize.

Know leading/trailing behavior and cancellation.

## Virtualization

With 100,000 rows, render only the visible window plus overscan.

Concepts:

- viewport
- overscan
- fixed vs dynamic height
- measurement
- scroll position

Pagination controls data pages. Infinite scroll controls fetching. Virtualization controls DOM size.

## Lazy loading

```tsx
const Reports = lazy(() => import('./Reports'));
```

Avoid shipping code before the user needs it.

## Profiler

Use React Profiler to answer:

- which components rendered?
- how expensive was the commit?
- why did they render?
- did the optimization improve anything?

## Interview questions

1. `memo` vs `useMemo` vs `useCallback`?
2. When can memoization be useless?
3. How would you optimize a huge table?
4. Debounce vs throttle?
5. Pagination vs virtualization?
6. How would you prove an optimization worked?

</div>

</details>

</div>
