<div dir="rtl" align="right">

# چرا دانلود کم هم گاهی دیر شروع می‌شود؟ — <span dir="ltr">Network</span> و <span dir="ltr">Bundle</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">HTTP</span>](../06-network/http.md) و [مبانی <span dir="ltr">Performance</span>](./performance-fundamentals.md).

## مسئله: زنجیره انتظار

<div dir="ltr" align="left">

~~~text
HTML -> فایل JavaScript -> fetch تنظیمات -> fetch محصولات
~~~

</div>

اگر درخواست بعدی فقط پس از قبلی شروع شود، **<span dir="ltr">Waterfall</span>** داریم. کوچک کردن یکی از فایل‌ها همیشه وابستگی‌های این زنجیره را حذف نمی‌کند. در <span dir="ltr">Network</span> ببین هر درخواست چه زمانی و به درخواست چه چیزی شروع شده است.

## مثال اول: شروع کارهای مستقل

<div dir="ltr" align="left">

~~~js
const requests = [
  fetch('/api/products'),
  fetch('/api/categories'),
];
const responses = await Promise.all(requests);
if (responses.some(response => !response.ok)) {
  throw new Error('Request failed');
}
~~~

</div>

این کد داخل <span dir="ltr">async function</span> یا محیط دارای <span dir="ltr">top-level await</span> اجرا می‌شود. اگر دو داده مستقل باشند، هم‌پوشانی زمان انتظار می‌تواند کمک کند.

## مثال دوم: جدا کردن کد صفحه غیرضروری

<div dir="ltr" align="left">

~~~js
async function openReport() {
  const module = await import('./report.js');
  module.showReport();
}
~~~

</div>

<span dir="ltr">report.js</span> باید <span dir="ltr">showReport</span> را <span dir="ltr">export</span> کند. این **<span dir="ltr">Code Splitting</span>** می‌تواند <span dir="ltr">JavaScript</span> اولیه را کم کند؛ درخواست <span dir="ltr">chunk</span> جدید هم هزینه دارد. حجم دانلود، حجم بازشده و هزینه <span dir="ltr">parse/execute</span> را جدا بسنج.

<span dir="ltr">Brotli</span> یا <span dir="ltr">gzip</span> انتقال متن را فشرده می‌کند؛ <span dir="ltr">CDN</span> فاصله و <span dir="ltr">cache</span> لبه را هدف می‌گیرد. <span dir="ltr">preload</span> برای منبع مهمِ همین صفحه و <span dir="ltr">prefetch</span> برای نیاز احتمالی آینده است؛ زیاده‌روی در هر دو با درخواست‌های مهم رقابت می‌کند.

## پاسخ مصاحبه و تمرین

آیا شکستن <span dir="ltr">bundle</span> به صد <span dir="ltr">chunk</span> همیشه سریع‌تر است؟

<details>
<summary>پاسخ</summary>

خیر. <span dir="ltr">chunk</span>های زیاد می‌توانند <span dir="ltr">scheduling</span>، وابستگی و درخواست‌های بیشتر بسازند. اثر روی مسیر اصلی کاربر را اندازه بگیر.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Network & Bundle Performance

## Network goals

- send fewer bytes
- send critical bytes earlier
- cache reusable resources
- avoid request waterfalls
- compress responses
- reduce unnecessary round trips
- serve static assets via CDN where useful

## Compression

Distinguish:

```text
raw source size
minified size
compressed transfer size (gzip/Brotli)
```

## Preload vs prefetch

**Preload:** important resource for the current navigation.

**Prefetch:** speculative lower-priority resource likely needed later.

Preloading everything just creates a traffic jam earlier.

## Request waterfalls

Bad when independent work waits unnecessarily:

```text
HTML
 ↓
JS
 ↓
API A
 ↓
API B
```

Run independent requests in parallel.

## Bundle optimization

Important techniques:

- tree shaking / dead-code elimination
- route-level code splitting
- component-level dynamic imports
- removing/replacing heavy dependencies
- duplicate-version analysis
- content hashing
- minimizing initial critical chunks

```js
const module = await import('./heavy-feature.js');
```

## Initial vs total bundle

A smaller total application is good, but reducing the initial critical JavaScript often matters more for first load.

## Analyze, don't guess

Use a bundle analyzer to inspect large modules, duplicate packages, and whether lazy boundaries actually created separate chunks.

## Interview questions

1. Tree shaking vs code splitting?
2. Preload vs prefetch?
3. What is a request waterfall?
4. Why are content-hashed assets useful?
5. Why does initial bundle size matter?

</div>

</details>

</div>
