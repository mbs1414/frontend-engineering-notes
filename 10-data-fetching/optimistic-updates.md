<div dir="rtl" align="right">

# نتیجه را پیش از تأیید نشان بدهیم — <span dir="ltr">Optimistic Update</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Mutation</span>](./mutations-and-invalidation.md).

وقتی کاربر تیک کار را می‌زند، می‌توانیم <span dir="ltr">UI</span> را فوراً تغییر دهیم و منتظر شبکه نمانیم. این فرض خوش‌بینانه است؛ باید شکست و هم‌زمانی را هم طراحی کنیم.

## الگوی ساده برای یک تغییر در هر لحظه

<div dir="ltr" align="left">

~~~jsx
const client = useQueryClient();
const mutation = useMutation({
  mutationFn: saveTodos,
  onMutate: async nextTodos => {
    await client.cancelQueries({ queryKey: ['todos'] });
    const previous = client.getQueryData(['todos']);
    client.setQueryData(['todos'], nextTodos);
    return { previous };
  },
  onError: (_error, _variables, snapshot) => {
    if (snapshot) client.setQueryData(['todos'], snapshot.previous);
  },
  onSettled: () => client.invalidateQueries({ queryKey: ['todos'] }),
});
~~~

</div>

این قطعه <span dir="ltr">v5</span> داخل <span dir="ltr">component</span> است؛ <span dir="ltr">saveTodos</span> باید عملیات واقعی را انجام دهد و <span dir="ltr">Hook</span>ها <span dir="ltr">import</span> شوند. ابتدا <span dir="ltr">refetch</span> مرتبط متوقف می‌شود، <span dir="ltr">snapshot</span> می‌گیریم، مقدار موقت می‌نویسیم، در خطا برمی‌گردانیم و در پایان با سرور هماهنگ می‌شویم.

## مثال دوم: دو کلیک سریع

اگر تغییر <span dir="ltr">A</span> و بعد <span dir="ltr">B</span> شروع شوند، <span dir="ltr">rollback</span> ساده <span dir="ltr">A</span> ممکن است نتیجه جدیدتر <span dir="ltr">B</span> را پاک کند. نمونه بالا را برای چند <span dir="ltr">mutation</span> هم‌زمان بدون تغییر استفاده نکن؛ <span dir="ltr">serial</span> کردن عملیات، <span dir="ltr">rollback</span> محدود به مورد یا نمایش <span dir="ltr">optimistic</span> در <span dir="ltr">UI</span> گزینه‌هایی برای طراحی‌اند.

## پاسخ مصاحبه و تمرین

برای انتقال وجه، نمایش قطعی «انجام شد» قبل از تأیید سرور مناسب است؟

<details>
<summary>پاسخ</summary>

معمولاً وضعیت «در حال پردازش» روشن‌تر است. <span dir="ltr">optimistic UI</span> باید با ریسک عملیات، امکان برگشت و معنای تأیید واقعی سازگار باشد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Optimistic Updates

An optimistic update changes the UI/cache before the server confirms success.

Typical lifecycle:

```text
snapshot current cache
       ↓
cancel conflicting refetches
       ↓
apply optimistic cache change
       ↓
server mutation
   ↙         ↘
error       success
 ↓             ↓
rollback     reconcile/invalidate
```

## Why rollback matters

Without a snapshot/rollback strategy, a failed mutation can leave the UI showing data the server never accepted.

## When not to use optimism

Avoid it when:

- failure is common
- server rules are complex/unpredictable
- the server substantially transforms the result
- a wrong temporary state would be dangerous or confusing

## Interview questions

1. What makes an update optimistic?
2. What must happen on failure?
3. Why cancel or coordinate in-flight refetches?
4. When is pessimistic UX safer?

</div>

</details>

</div>
