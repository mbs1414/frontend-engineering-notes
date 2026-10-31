<div dir="rtl" align="right">

# کارهای زمان‌بر بدون قفل کردن مسیر برنامه — <span dir="ltr">Async JavaScript</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Event Loop</span>](./event-loop.md).

## <span dir="ltr">Promise</span> چه مسئله‌ای را حل می‌کند؟

درخواست فهرست محصولات همین لحظه جواب ندارد. <span dir="ltr">Promise</span> نماینده نتیجه آینده است: ابتدا **<span dir="ltr">pending</span>**، سپس **<span dir="ltr">fulfilled</span>** با یک مقدار یا **<span dir="ltr">rejected</span>** با یک دلیل خطا. بعد از <span dir="ltr">settled</span> شدن، نتیجه نهایی آن عوض نمی‌شود.

<div dir="ltr" align="left">

~~~js
function getPrice() {
  return Promise.resolve(100);
}
getPrice().then(price => console.log(price)); // 100، بعد از اجرای فعلی
~~~

</div>

<span dir="ltr">`then`</span> خود یک <span dir="ltr">Promise</span> جدید می‌دهد. مقداری که از <span dir="ltr">callback</span> برمی‌گردانی ورودی مرحله بعد می‌شود:

<div dir="ltr" align="left">

~~~js
Promise.resolve(100)
  .then(price => price * 0.9)
  .then(finalPrice => console.log(finalPrice)); // 90
~~~

</div>

اگر در <span dir="ltr">callback</span> خطا <span dir="ltr">throw</span> شود، <span dir="ltr">Promise</span> برگشتی <span dir="ltr">rejected</span> می‌شود. فراموش کردن <span dir="ltr">return</span> در زنجیره ممکن است به مرحله بعد <span dir="ltr">undefined</span> برساند.

## <span dir="ltr">async/await</span> همان مسئله را خواناتر بیان می‌کند

<div dir="ltr" align="left">

~~~js
async function calculate() {
  try {
    const price = await getPrice();
    return price * 0.9;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
calculate().then(console.log); // 90
~~~

</div>

تابع <span dir="ltr">async</span> همیشه <span dir="ltr">Promise</span> برمی‌گرداند؛ حتی اگر داخلش <span dir="ltr">`return 90`</span> باشد. <span dir="ltr">await</span> نتیجه موفق را می‌دهد و در حالت <span dir="ltr">rejection</span> مثل <span dir="ltr">throw</span> در همان نقطه رفتار می‌کند. <span dir="ltr">try/catch</span> برای <span dir="ltr">Promise</span>ای که <span dir="ltr">await</span> نشده، لزوماً <span dir="ltr">rejection</span> آینده را نمی‌گیرد.

## ترتیبی یا هم‌پوشان؟

اگر گرفتن سفارش به شناسه کاربر نیاز دارد، دو مرحله وابسته‌اند:

<div dir="ltr" align="left">

~~~js
async function loadOrders() {
  const user = await fetch('/api/me').then(r => {
    if (!r.ok) throw new Error('User request failed');
    return r.json();
  });
  const response = await fetch('/api/orders?user=' + user.id);
  if (!response.ok) throw new Error('Orders request failed');
  return response.json();
}
~~~

</div>

ولی محصولات و دسته‌بندی‌ها مستقل‌اند و می‌توان زودتر هر دو را شروع کرد:

<div dir="ltr" align="left">

~~~js
async function loadCatalog() {
  const [productsResponse, categoriesResponse] = await Promise.all([
    fetch('/api/products'),
    fetch('/api/categories'),
  ]);
  if (!productsResponse.ok || !categoriesResponse.ok) {
    throw new Error('Catalog request failed');
  }
  return Promise.all([
    productsResponse.json(),
    categoriesResponse.json(),
  ]);
}
~~~

</div>

اگر دو کار مستقل تقریباً ۱ و ۲ ثانیه طول بکشند، اجرای پشت‌سرهم تقریباً ۳ ثانیه و شروع هم‌پوشان تقریباً ۲ ثانیه زمان می‌خواهد؛ عدد واقعی به محیط بستگی دارد.

## ابزار مناسب برای نتیجه‌های متعدد

| ابزار | چه زمانی تمام می‌شود؟ | کاربرد |
| --- | --- | --- |
| <span dir="ltr">Promise.all</span> | همه موفق شوند، یا یکی <span dir="ltr">reject</span> شود | صفحه‌ای که همه داده‌ها را نیاز دارد |
| <span dir="ltr">Promise.allSettled</span> | همه <span dir="ltr">settled</span> شوند | نمایش نتیجه مستقل چند آپلود |
| <span dir="ltr">Promise.race</span> | اولین <span dir="ltr">settlement</span> | رقابت چند نتیجه، با مدیریت جداگانه <span dir="ltr">cleanup</span> |
| <span dir="ltr">Promise.any</span> | اولین <span dir="ltr">fulfillment</span> | اولین جواب موفق از چند منبع |

<span dir="ltr">all</span> با اولین <span dir="ltr">rejection</span> منتظر خروجی موفق نهایی نمی‌ماند، ولی کارهای دیگر را خودکار <span dir="ltr">cancel</span> نمی‌کند. ترتیب آرایه خروجی <span dir="ltr">all</span>، ترتیب ورودی‌هاست، نه ترتیب تمام شدن.

## اشتباه رایج: <span dir="ltr">forEach</span> منتظر <span dir="ltr">await</span> نمی‌ماند

<div dir="ltr" align="left">

~~~js
// برای ترتیب:
for (const id of [1, 2, 3]) {
  // await save(id);
}
// برای کارهای مستقل:
// await Promise.all(ids.map(id => save(id)));
~~~

</div>

کد بالا الگوی استفاده است؛ <span dir="ltr">save</span> باید در برنامه خودت تعریف شود. لغو درخواست هم وظیفه <span dir="ltr">Promise</span> نیست؛ <span dir="ltr">fetch</span> را با <span dir="ltr">AbortController</span> مدیریت می‌کنیم.

## پاسخ مصاحبه

**<span dir="ltr">async</span> یعنی اجرای کد روی <span dir="ltr">thread</span> دیگر؟** خیر. <span dir="ltr">async</span> شیوه برگشت نتیجه و ادامه اجرای تابع را تغییر می‌دهد؛ محاسبه <span dir="ltr">synchronous</span> سنگین داخل آن همچنان <span dir="ltr">thread</span> فعلی را مشغول می‌کند.

## تمرین با پاسخ

سه آپلود مستقل داری و می‌خواهی نتیجه هر سه را حتی با شکست یکی نمایش بدهی. کدام ابزار مناسب‌تر است؟

<details>
<summary>پاسخ</summary>

<span dir="ltr">Promise.allSettled</span>؛ برای هر ورودی یک نتیجه با <span dir="ltr">status</span> برابر <span dir="ltr">fulfilled</span> یا <span dir="ltr">rejected</span> می‌گیری. می‌توانی موفقیت و خطای هر آپلود را جدا نشان بدهی.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Async JavaScript

## Promises

A Promise represents an eventual result.

States:

- pending
- fulfilled
- rejected

Once settled, it does not change to another state.

```js
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## `async/await`

```js
async function loadUsers() {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
```

Important: `fetch` does **not** reject merely because the HTTP status is 404/500. Check `response.ok` or `status`.

## Promise combinators

### `Promise.all`

Waits for all inputs and rejects on the first rejection.

```js
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(),
]);
```

### `Promise.allSettled`

Waits for all and reports each outcome.

### `Promise.race`

Settles when the first input settles.

### `Promise.any`

Fulfills when the first input fulfills; rejects if all reject.

## Sequential vs parallel

Potential waterfall:

```js
const user = await fetchUser();
const settings = await fetchSettings();
```

If independent:

```js
const [user, settings] = await Promise.all([
  fetchUser(),
  fetchSettings(),
]);
```

## Cancellation

Promises are not universally cancellable, but APIs such as `fetch` support `AbortSignal`.

```js
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort();
```

## Interview questions

1. Promise states?
2. `Promise.all` vs `allSettled`?
3. Why can sequential awaits create waterfalls?
4. Does fetch reject on HTTP 500?
5. How do you cancel fetch?

</div>

</details>

</div>
