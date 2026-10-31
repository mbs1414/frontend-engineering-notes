<div dir="rtl" align="right">

# آدرس داده در <span dir="ltr">cache</span> — <span dir="ltr">Query Key</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [اولین <span dir="ltr">Query</span>](./tanstack-query-fundamentals.md).

## مسئله: نتایج دو صفحه با هم قاطی شده‌اند

اگر صفحه ۱ و ۲ هر دو <span dir="ltr">key</span> برابر ['<span dir="ltr">products</span>'] داشته باشند، <span dir="ltr">cache</span> نمی‌فهمد این‌ها داده متفاوت‌اند. هر ورودی مؤثر در هویت داده باید در <span dir="ltr">key</span> لحاظ شود.

<div dir="ltr" align="left">

~~~jsx
useQuery({
  queryKey: ['products', { page, category }],
  queryFn: async ({ signal }) => {
    const params = new URLSearchParams({
      page: String(page),
      category,
    });
    const response = await fetch('/api/products?' + params, { signal });
    if (!response.ok) throw new Error('Products failed');
    return response.json();
  },
});
~~~

</div>

این قطعه داخل <span dir="ltr">component</span> با <span dir="ltr">page</span> و <span dir="ltr">category</span> است. <span dir="ltr">key</span> یک آرایه <span dir="ltr">serializable</span> است. <span dir="ltr">object</span> تازه با همان محتوای <span dir="ltr">key</span> الزاماً <span dir="ltr">key</span> متفاوت نمی‌سازد؛ <span dir="ltr">hash</span> کلیدها با مقایسه صرف ارجاع <span dir="ltr">props</span> در <span dir="ltr">React</span> فرق دارد.

## مثال دوم: تعریف گزینه‌های مشترک

<div dir="ltr" align="left">

~~~js
import { queryOptions } from '@tanstack/react-query';
const userOptions = id => queryOptions({
  queryKey: ['users', id],
  queryFn: async ({ signal }) => {
    const response = await fetch('/api/users/' + id, { signal });
    if (!response.ok) throw new Error('User failed');
    return response.json();
  },
});
~~~

</div>

همین <span dir="ltr">options</span> را می‌توان در <span dir="ltr">useQuery</span> و <span dir="ltr">prefetch</span> استفاده کرد تا <span dir="ltr">key</span> و تابع از هم جدا و ناسازگار نشوند.

## پاسخ مصاحبه و تمرین

برای جزئیات کاربر ۷ و ۸ یک <span dir="ltr">key</span> می‌گذاریم؟

<details>
<summary>پاسخ</summary>

خیر. مثلاً ['<span dir="ltr">users</span>', 7] و ['<span dir="ltr">users</span>', 8]. یک <span dir="ltr">key</span> برای دو قرارداد داده متفاوت، منبع خطا و نمایش اشتباه است.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Query Keys and Query Options

## Query keys are cache identity

If a variable changes the returned data, it usually belongs in the key.

```tsx
useQuery({
  queryKey: ['projects', { page, status }],
  queryFn: () => fetchProjects({ page, status }),
});
```

A key such as `['projects']` while the query function silently depends on `page` is a cache-identity bug waiting to become an afternoon.

## Hierarchical keys

```text
['projects']
['projects', projectId]
['projects', 'list', filters]
```

Consistent structure makes targeted invalidation easier.

## `queryOptions()`

Current TanStack Query provides `queryOptions()` to co-locate a query key and query function while preserving strong TypeScript inference across hooks and QueryClient APIs.

```tsx
function projectOptions(id: number) {
  return queryOptions({
    queryKey: ['projects', id],
    queryFn: () => fetchProject(id),
    staleTime: 30_000,
  });
}
```

## `select`

Transform the observed data without changing the underlying query key/source identity.

```tsx
useQuery({
  ...projectOptions(id),
  select: project => project.name,
});
```

## Disabled/dependent queries

Use `enabled` or a type-safe disabling mechanism such as `skipToken` when a query cannot run until required input exists.

## Interview questions

1. What makes a good query key?
2. Why include filters/page/id in the key?
3. What problem does `queryOptions()` solve?
4. What is `select` for?

</div>

</details>

</div>
