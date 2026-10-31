<div dir="rtl" align="right">

# داده‌ای که مالک اصلی‌اش سرور است — <span dir="ltr">Server State</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">State</span> در <span dir="ltr">React</span>](../03-react/state.md)، [<span dir="ltr">Fetch</span>](./fetch.md).

باز بودن <span dir="ltr">dropdown</span> را همین صفحه کنترل می‌کند؛ اما قیمت محصول می‌تواند در سرور و توسط کاربر دیگری تغییر کند. نسخه‌ای که در <span dir="ltr">client</span> داریم ممکن است قدیمی باشد. این فرق مهم **<span dir="ltr">Client State</span>** و **<span dir="ltr">Server State</span>** است.

## مثال اول: چهار نوع <span dir="ltr">state</span> در یک فروشگاه

| داده | مالک یا محل مناسب اولیه |
| --- | --- |
| باز بودن <span dir="ltr">modal</span> | <span dir="ltr">state</span> محلی |
| عبارت و صفحه جست‌وجوی قابل اشتراک | <span dir="ltr">URL</span> |
| نام تایپ‌شده و ارسال‌نشده فرم | <span dir="ltr">state</span> فرم |
| محصولات دریافت‌شده | <span dir="ltr">cache</span> لایه <span dir="ltr">server state</span> |

## مثال دوم: کپی اضافی

<div dir="ltr" align="left">

~~~jsx
// این الگو معمولاً منبع حقیقت اضافه می‌سازد:
// const query = useQuery(...);
// useEffect(() => setProducts(query.data), [query.data]);
~~~

</div>

اگر فقط می‌خواهی محصولات را نمایش بدهی، مستقیم از داده <span dir="ltr">query</span> استفاده کن. برای ویرایش فرم، ساختن <span dir="ltr">draft</span> محلی می‌تواند موجه باشد؛ باید بدانی چه زمانی از داده سرور جدا و چگونه دوباره هماهنگ می‌شود.

لایه <span dir="ltr">server state</span> معمولاً <span dir="ltr">freshness</span>، <span dir="ltr">refetch</span>، <span dir="ltr">retry</span>، <span dir="ltr">deduplication</span> و <span dir="ltr">invalidation</span> را مدیریت می‌کند. این مسئولیت‌ها با صرف داشتن یک <span dir="ltr">object</span> در <span dir="ltr">Context</span> خودکار حل نمی‌شوند.

## پاسخ مصاحبه و تمرین

آیا <span dir="ltr">cache</span> داشتن تضمین می‌کند قیمت همیشه آخرین نسخه سرور باشد؟

<details>
<summary>پاسخ</summary>

خیر. باید سیاست تازگی و <span dir="ltr">revalidation</span> داشته باشیم. عملیات حساس مثل پرداخت هم باید مقدار نهایی معتبر را در سرور بررسی کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Server State

## What it is

Server state is remote data whose source of truth lives outside the browser.

Characteristics:

- asynchronous
- shared remotely
- can become stale
- can change without local code causing it
- needs caching/revalidation/error handling

Examples: users, orders, products, notifications.

## Local vs server state

Local UI:

```text
modal open?
selected tab?
draft text?
```

Server state:

```text
what users exist now?
what is order #123's status?
```

## Server-state concerns

- cache identity
- stale/fresh timing
- retry
- background refetch
- deduplication
- invalidation
- optimistic updates
- pagination/infinite data

## Avoid unnecessary copies

Bad default architecture:

```text
Query cache
  ↓ copy
Redux/Zustand
  ↓ copy
component state
```

Every copy creates synchronization work. Duplicate only when you intentionally need a transformed independent snapshot.

## URL state

Page/sort/filter/search often belongs in URL search params when it should survive refresh, sharing, and back/forward navigation.

## Interview questions

1. Why is server state different from client state?
2. What does stale data mean?
3. Why can copying query data into another store cause bugs?

</div>

</details>

</div>
