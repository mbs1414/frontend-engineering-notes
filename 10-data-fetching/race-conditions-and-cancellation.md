<div dir="rtl" align="right">

# چرا نتیجه جست‌وجوی قبلی جای جدید را می‌گیرد؟ — <span dir="ltr">Race Condition</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Fetch</span>](./fetch.md)، [لغو](./abort-controller.md).

## مسئله را با زمان ببین

<div dir="ltr" align="left">

~~~text
شروع جست‌وجوی "r"     -> پاسخ بعد از 900ms
شروع جست‌وجوی "react" -> پاسخ بعد از 200ms
~~~

</div>

دومی زودتر می‌رسد. اگر هر پاسخی را در <span dir="ltr">state</span> بگذاری، نتیجه قدیمی <span dir="ltr">r</span> در پایان جای <span dir="ltr">react</span> را می‌گیرد. ترتیب شروع درخواست، ترتیب پایان را تضمین نمی‌کند.

## مثال: فقط آخرین درخواست حق نوشتن داشته باشد

<div dir="ltr" align="left">

~~~js
let latestRequest = 0;
async function search(query) {
  const requestId = ++latestRequest;
  try {
    const response = await fetch('/api/search?q=' + encodeURIComponent(query));
    if (!response.ok) throw new Error('Search failed');
    const data = await response.json();
    if (requestId !== latestRequest) return;
    console.log('Current results:', data);
  } catch (error) {
    if (requestId === latestRequest) console.error(error);
  }
}
~~~

</div>

این نمونه برای یک جریان جست‌وجوی مستقل است. در <span dir="ltr">React</span> شناسه باید متناسب با <span dir="ltr">instance</span>، مثلاً در <span dir="ltr">ref</span>، نگه داشته شود؛ متغیر عمومی برای همه <span dir="ltr">component</span>ها نگذار.

## مثال دوم: <span dir="ltr">debounce</span> کافی نیست

<span dir="ltr">Debounce</span> تعداد شروع درخواست را کم می‌کند؛ ولی اگر دو درخواست واقعاً شروع شده باشند، هنوز ممکن است ترتیب پایان جابه‌جا شود. <span dir="ltr">abort</span> مصرف غیرضروری را کم می‌کند و بررسی هویت یا <span dir="ltr">active</span> بودن، جلوی <span dir="ltr">commit</span> نتیجه منسوخ را می‌گیرد.

در <span dir="ltr">Effect</span> می‌توان برای هر اجرا یک <span dir="ltr">active</span> محلی داشت و در <span dir="ltr">cleanup</span> آن را <span dir="ltr">false</span> کرد؛ نمونه‌اش در [<span dir="ltr">Effect</span>ها](../03-react/effects.md) هست. خطا و <span dir="ltr">loading</span> هم باید به درخواست معتبر تعلق داشته باشند.

## پاسخ مصاحبه و تمرین

چرا فقط بررسی موفق بودن <span dir="ltr">HTTP</span> برای صحت نتیجه جست‌وجو کافی نیست؟

<details>
<summary>پاسخ</summary>

پاسخ می‌تواند از نظر <span dir="ltr">HTTP</span> صحیح باشد ولی متعلق به <span dir="ltr">query</span> قدیمی باشد. صحت داده و مرتبط بودن نتیجه با وضعیت فعلی دو مسئله‌اند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Race Conditions and Cancellation

## The classic search race

```text
a   → request A
ab  → request B
abc → request C
```

Networks do not promise response order. C can finish first, then A, then B. If every response blindly calls `setData`, an older result can overwrite the newest one.

## Solutions

### Abort obsolete requests

Abort the previous request when the input/query changes.

### Request identity / sequence number

Only accept the response that belongs to the latest request.

```ts
let latestRequest = 0;

async function search(query: string) {
  const requestId = ++latestRequest;
  const result = await searchApi(query);

  if (requestId === latestRequest) {
    render(result);
  }
}
```

### Let a server-state library manage query identity

TanStack Query associates results with query keys and supplies cancellation signals to query functions. You still need to model the query key correctly.

## Debounce is not cancellation

Debouncing reduces how often a function starts. It does not guarantee that responses arrive in the same order as requests.

## Interview questions

1. Why can search results appear out of order?
2. Debounce vs cancellation?
3. What does an `AbortSignal` represent?
4. How can request identity solve stale-response bugs?

</div>

</details>

</div>
