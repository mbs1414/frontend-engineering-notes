<div dir="rtl" align="right">

# بعد از ذخیره، لیست چرا قدیمی است؟ — <span dir="ltr">Mutation</span> و <span dir="ltr">Invalidation</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Query</span> و <span dir="ltr">cache</span>](./tanstack-query-fundamentals.md).

<span dir="ltr">Query</span> معمولاً داده را می‌خواند. <span dir="ltr">Mutation</span> عملیاتی مثل ساخت، حذف یا ویرایش را اجرا می‌کند. موفق شدن <span dir="ltr">POST</span> خودکار تضمین نمی‌کند همه <span dir="ltr">query</span>های مرتبط <span dir="ltr">cache</span> به نتیجه جدید تبدیل شوند.

## مثال اول: ایجاد و سپس تازه‌سازی

<div dir="ltr" align="left">

~~~jsx
const client = useQueryClient();
const createUser = useMutation({
  mutationFn: async name => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Save failed');
    return response.json();
  },
  onSuccess: () => client.invalidateQueries({ queryKey: ['users'] }),
});
// در handler:
// createUser.mutate('Sara');
~~~

</div>

<span dir="ltr">Hook</span>ها از @<span dir="ltr">tanstack/react-query</span> وارد می‌شوند و داخل <span dir="ltr">component</span> دارای <span dir="ltr">Provider</span> قرار می‌گیرند. <span dir="ltr">invalidation query</span>های منطبق را <span dir="ltr">stale</span> می‌کند و <span dir="ltr">query</span>های فعال معمولاً دوباره دریافت می‌شوند.

## مثال دوم: پاسخ کامل سرور

<div dir="ltr" align="left">

~~~js
// اگر savedUser پاسخ معتبر و کامل endpoint باشد:
// client.setQueryData(['users', savedUser.id], savedUser);
~~~

</div>

<span dir="ltr">setQueryData</span> به <span dir="ltr">cache</span> داده مشخص می‌دهد؛ <span dir="ltr">invalidate</span> می‌گوید دوباره بررسی کن. برای لیست دارای فیلتر و ترتیب پیچیده، تازه‌سازی از سرور ممکن است قابل اعتمادتر باشد.

## پاسخ مصاحبه و تمرین

**<span dir="ltr">mutate</span> و <span dir="ltr">mutateAsync</span>؟** <span dir="ltr">mutate</span> برای فراخوانی با <span dir="ltr">callback</span>های <span dir="ltr">lifecycle</span> مناسب است؛ <span dir="ltr">mutateAsync Promise</span> می‌دهد تا بتوانی <span dir="ltr">await</span> و <span dir="ltr">catch</span> کنی. خطا را متناسب رسیدگی کن.

بعد از تغییر نام کاربر، فقط <span dir="ltr">query</span> جزئیات مهم است؟

<details>
<summary>پاسخ</summary>

ممکن است لیست، جست‌وجو و <span dir="ltr">header</span> هم همان داده را نشان دهند. <span dir="ltr">query</span>های مرتبط را بر اساس قرارداد و <span dir="ltr">key</span>ها هماهنگ کن.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Mutations and Invalidation

Queries read server state. Mutations change server state.

```tsx
const queryClient = useQueryClient();

const createTodo = useMutation({
  mutationFn: addTodo,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

Current TanStack Query documentation recommends invalidating related queries after successful mutations when those cached results may now be out of date.

## Mutation lifecycle

Important concepts:

- `mutationFn`
- variables passed to `mutate` / `mutateAsync`
- pending/success/error states
- `onMutate`
- `onSuccess`
- `onError`
- `onSettled`

## Invalidation vs direct cache update

### Invalidate

Use when the server is the easiest/most reliable source for the new truth.

### `setQueryData`

Use when the mutation response already contains enough canonical data to update a cached query immediately.

The decision is about correctness and complexity, not winning a contest for fewest network requests.

## Interview questions

1. Query vs mutation?
2. Why invalidate after a mutation?
3. Invalidation vs `setQueryData`?
4. `mutate` vs `mutateAsync`?

</div>

</details>

</div>
