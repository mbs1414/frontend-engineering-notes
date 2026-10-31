<div dir="rtl" align="right">

# داده صفحه بعد را زودتر آماده کنیم — <span dir="ltr">Prefetch</span> و <span dir="ltr">Router</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Query Options</span>](./query-keys-and-options.md)، [<span dir="ltr">Freshness</span>](./query-caching-and-defaults.md).

اگر فقط بعد از <span dir="ltr">mount</span> صفحه جدید <span dir="ltr">fetch</span> کنیم، کاربر باید منتظر شود. <span dir="ltr">prefetch</span> تلاش می‌کند پیش از مصرف، <span dir="ltr">cache</span> را آماده کند؛ مثلاً وقتی قصد رفتن به لینک مشخص می‌شود.

## مثال اول: نشانه قصد کاربر

<div dir="ltr" align="left">

~~~jsx
function UserLink({ id }) {
  const client = useQueryClient();
  const warm = () => client.prefetchQuery(userOptions(id));
  return <a href={'/users/' + id}
    onMouseEnter={warm} onFocus={warm}>
    مشاهده کاربر
  </a>;
}
~~~

</div>

<span dir="ltr">userOptions</span> همان <span dir="ltr">factory</span> درس <span dir="ltr">Query Options</span> است. در برنامه <span dir="ltr">SPA</span> واقعی باید لینک <span dir="ltr">router</span> و عمر <span dir="ltr">QueryClient</span> هماهنگ باشد؛ <span dir="ltr">navigation</span> کامل سند ممکن است <span dir="ltr">cache</span> صرفاً حافظه‌ای فعلی را از دست بدهد. <span dir="ltr">hover</span> هم برای همه دستگاه‌ها وجود ندارد؛ <span dir="ltr">focus</span> و <span dir="ltr">loader</span> مسیر گزینه‌های دیگرند.

## مثال دوم: هماهنگی <span dir="ltr">loader</span> و <span dir="ltr">component</span>

<div dir="ltr" align="left">

~~~js
// الگوی loader با client مشترک:
async function loadUser(client, id) {
  return client.ensureQueryData(userOptions(id));
}
~~~

</div>

<span dir="ltr">component</span> مقصد باید همان <span dir="ltr">key</span> را بخواند. <span dir="ltr">ensureQueryData</span> و <span dir="ltr">prefetchQuery</span> از نظر قرارداد انتظار و خطا یکسان نیستند؛ روش را با نیاز <span dir="ltr">router</span> انتخاب کن. <span dir="ltr">staleTime</span> هم تعیین می‌کند داده آماده‌شده هنگام مصرف چه وضعیتی دارد.

## پاسخ مصاحبه و تمرین

<span dir="ltr">Prefetch</span> کردن همه لینک‌های یک جدول هزارردیفی ایده خوبی است؟

<details>
<summary>پاسخ</summary>

معمولاً خیر. هزینه شبکه، سرور و <span dir="ltr">cache</span> دارد. براساس احتمال استفاده و نشانه قصد کاربر محدودش کن.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Prefetching and Router Integration

## Prefetching

Prefetch likely-needed server data before the user reaches the destination.

Examples:

- hover/focus a link
- route loader knows the next screen's dependencies
- prefetch the next page of a list

Prefetching should be intentional. Fetching the entire internet "just in case" is not latency optimization.

## Router loaders vs TanStack Query

A router loader coordinates **navigation**: what must be ready for a route, redirects, route-level errors, URL inputs, and pending navigation.

TanStack Query coordinates **server-state cache lifecycle**.

They can work together. A route loader can call QueryClient APIs to ensure/prefetch query data, while components consume the same cached query definition.

## Avoid request waterfalls

If child data requirements are predictable at route level, starting them earlier can reduce sequential waits.

## Interview questions

1. What is prefetching?
2. What is a request waterfall?
3. Router loader vs query cache responsibility?
4. What are the costs of aggressive prefetching?

</div>

</details>

</div>
