<div dir="rtl" align="right">

# داده را مرحله‌ای بگیریم — <span dir="ltr">Pagination</span> و <span dir="ltr">Infinite Query</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Query Key</span>](./query-keys-and-options.md).

<span dir="ltr">Pagination</span> صفحه‌های مجزا دارد؛ <span dir="ltr">infinite query</span> چند صفحه را در یک جریان جمع می‌کند. در هر دو، قرارداد <span dir="ltr">API</span> درباره <span dir="ltr">page</span>، <span dir="ltr">cursor</span> و پایان داده باید روشن باشد.

## مثال اول: شماره صفحه

<div dir="ltr" align="left">

~~~jsx
useQuery({
  queryKey: ['products', page],
  queryFn: () => getProducts(page),
});
~~~

</div>

<span dir="ltr">page</span> بخشی از <span dir="ltr">key</span> است؛ با تغییر آن داده صفحه دیگری می‌خواهیم. در <span dir="ltr">v5</span> می‌توان با <span dir="ltr">placeholderData</span> مناسب مثل <span dir="ltr">keepPreviousData</span>، داده قبلی را هنگام تعویض صفحه موقت نگه داشت؛ باید در <span dir="ltr">UI</span> مشخص باشد که دریافت در جریان است.

## مثال دوم: <span dir="ltr">cursor</span>

<div dir="ltr" align="left">

~~~jsx
const query = useInfiniteQuery({
  queryKey: ['feed'],
  initialPageParam: null,
  queryFn: ({ pageParam, signal }) => getFeed(pageParam, signal),
  getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
});
const items = query.data?.pages.flatMap(page => page.items) ?? [];
// در handler، با کنترل hasNextPage و isFetchingNextPage:
// query.fetchNextPage();
~~~

</div>

<span dir="ltr">getFeed</span> باید صفحه‌ای با <span dir="ltr">items</span> و <span dir="ltr">nextCursor</span> بدهد. نبودن <span dir="ltr">cursor</span> با <span dir="ltr">undefined</span> در <span dir="ltr">getNextPageParam</span> پایان را اعلام می‌کند. از درخواست هم‌زمان و تکراری برای صفحه بعد جلوگیری کن.

## پاسخ مصاحبه و تمرین

**چرا <span dir="ltr">cursor</span> گاهی بهتر از <span dir="ltr">offset</span> است؟** در داده‌ای که وسط مرور درج و حذف می‌شود، <span dir="ltr">offset</span> می‌تواند تکرار یا جاافتادگی بسازد؛ <span dir="ltr">cursor</span> هم به ترتیب و قرارداد پایدار سرور نیاز دارد.

<span dir="ltr">Infinite scroll</span> الزاماً حافظه کمی مصرف می‌کند؟

<details>
<summary>پاسخ</summary>

خیر. تعداد صفحه‌های <span dir="ltr">cache</span> و <span dir="ltr">DOM</span> می‌تواند رشد کند. محدودیت صفحه‌ها، <span dir="ltr">virtualization</span> و تجربه ناوبری را بررسی کن.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Pagination and Infinite Queries

## Paginated queries

Put page/cursor inputs into the query key.

```tsx
useQuery({
  queryKey: ['projects', { page }],
  queryFn: () => fetchProjects(page),
});
```

For smoother transitions, use the library's placeholder/previous-data patterns rather than manually copying remote data into component state.

## Infinite queries

`useInfiniteQuery` models pages that are loaded incrementally.

Key concerns:

- initial page parameter
- `getNextPageParam`
- `fetchNextPage`
- `hasNextPage`
- flattening/rendering pages
- avoiding duplicate load triggers

## Infinite scrolling vs virtualization

They solve different problems:

- infinite query/scroll → how much data is fetched
- virtualization → how many rendered DOM items exist at once

Large feeds may need both.

## Interview questions

1. Page-number vs cursor pagination?
2. Infinite query vs normal query?
3. Why include pagination parameters in the key?
4. Infinite scrolling vs virtualization?

</div>

</details>

</div>
