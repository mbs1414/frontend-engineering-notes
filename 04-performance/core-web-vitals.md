<div dir="rtl" align="right">

# کیفیت تجربه کاربر را با چه عددهایی بسنجیم؟ — <span dir="ltr">Core Web Vitals</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [مبانی <span dir="ltr">Performance</span>](./performance-fundamentals.md).

سه شاخص اصلی به سه سؤال متفاوت جواب می‌دهند:

| شاخص | سؤال | آستانه خوب |
| --- | --- | --- |
| <span dir="ltr">LCP</span> | محتوای بزرگ اصلی چه زمانی دیده می‌شود؟ | حداکثر ۲٫۵ ثانیه |
| <span dir="ltr">INP</span> | تعامل‌های کاربر چقدر پاسخ‌گو هستند؟ | حداکثر ۲۰۰ میلی‌ثانیه |
| <span dir="ltr">CLS</span> | صفحه چقدر جابه‌جایی غیرمنتظره دارد؟ | حداکثر ۰٫۱ |

این حدود برای ارزیابی داده واقعی معمولاً در صدک ۷۵ بررسی می‌شوند؛ نمره یک اجرای <span dir="ltr">Lighthouse</span> معادل تجربه همه کاربران نیست. تعریف‌ها و آستانه‌ها در [مرجع رسمی <span dir="ltr">Web Vitals</span>](https://web.dev/articles/vitals) آمده‌اند.

## مثال اول: عکس بدون اندازه

<div dir="ltr" align="left">

~~~html
<img src="/hero.jpg" width="1200" height="600" alt="نمای فروشگاه">
~~~

</div>

عرض و ارتفاع به مرورگر نسبت تصویر را زودتر می‌گویند تا جای مناسب رزرو شود. بدون رزرو فضا، رسیدن عکس می‌تواند متن پایین را ناگهان جابه‌جا کند و <span dir="ltr">CLS</span> را بدتر کند.

## مثال دوم: کلیک با محاسبه طولانی

<div dir="ltr" align="left">

~~~text
کلیک -> انتظار برای main thread -> اجرای handler -> نمایش frame بعدی
~~~

</div>

<span dir="ltr">INP</span> فقط مدت اجرای <span dir="ltr">handler</span> نیست؛ تأخیر پیش از آن و تا نمایش بعدی هم مهم‌اند. شکستن کار سنگین یا کاهش <span dir="ltr">DOM</span> می‌تواند کمک کند. برای <span dir="ltr">LCP</span> باید مسیر رسیدن عنصر اصلی، شبکه، پاسخ سرور و <span dir="ltr">rendering</span> آن بررسی شود.

## پاسخ مصاحبه و تمرین

**آیا بهبود <span dir="ltr">LCP</span> حتماً <span dir="ltr">INP</span> را بهتر می‌کند؟** خیر؛ یکی بیشتر بارگذاری محتوای اصلی را می‌سنجد و دیگری پاسخ‌گویی تعامل را.

اگر دکمه خرید هنگام رسیدن تبلیغ پایین می‌رود، اول کدام شاخص را بررسی می‌کنی؟

<details>
<summary>پاسخ</summary>

<span dir="ltr">CLS</span>. برای تبلیغ فضای مناسب رزرو کن و بررسی کن جابه‌جایی در داده واقعی چگونه ثبت می‌شود.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Core Web Vitals

## LCP — Largest Contentful Paint

Represents loading speed of the main/largest relevant viewport content.

Common causes of poor LCP:

- slow server/TTFB
- render-blocking resources
- oversized hero image
- late-discovered critical resource
- heavy client-rendering delay

## INP — Interaction to Next Paint

Represents responsiveness across user interactions.

Common causes:

- long JavaScript tasks
- expensive handlers
- large synchronous React renders
- costly layout/paint after input

Improve by reducing/splitting work, preventing unnecessary renders, and deprioritizing non-urgent work.

## CLS — Cumulative Layout Shift

Represents unexpected layout movement.

Common causes:

- images without reserved dimensions/aspect ratio
- injected content above existing content
- ads/embeds without reserved space
- font swaps/layout changes

## Other useful metrics

- **FCP**: first content appears.
- **TTFB**: response timing until first byte.
- **TBT**: lab metric related to main-thread blocking.

## Rule

Metrics identify symptom categories. They do not identify the root cause by themselves. Use traces, network timing, and profiling.

## Interview questions

1. What do LCP, INP, and CLS measure?
2. Three causes of poor LCP?
3. How can JS hurt INP?
4. Why do image dimensions help CLS?

</div>

</details>

</div>
