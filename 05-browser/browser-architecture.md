<div dir="rtl" align="right">

# وقتی <span dir="ltr">URL</span> می‌زنیم چه اتفاقی می‌افتد؟ — <span dir="ltr">Browser Architecture</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** آشنایی ابتدایی با <span dir="ltr">HTML</span>، <span dir="ltr">CSS</span> و <span dir="ltr">JavaScript</span>.

مرورگر یک برنامه ساده با یک حلقه تنها نیست. کارهای رابط مرورگر، شبکه، <span dir="ltr">renderer</span> و بخش‌های گرافیکی می‌توانند بین <span dir="ltr">process</span>ها و <span dir="ltr">thread</span>های مختلف تقسیم شوند؛ جزئیات با مرورگر و سیاست جداسازی فرق دارد.

## یک درخواست از ابتدا تا صفحه

<div dir="ltr" align="left">

~~~text
URL
 -> بررسی مسیرهای cache و Service Worker در صورت وجود
 -> پیدا کردن مقصد و ایجاد یا استفاده مجدد از اتصال
 -> دریافت پاسخ HTML
 -> ساخت DOM و دریافت منابع لازم
 -> style، layout، paint و نمایش
 -> اجرای کد و پاسخ به تعامل
~~~

</div>

این مسیر ساده‌شده است و بخش‌ها می‌توانند هم‌پوشان باشند. <span dir="ltr">DNS</span> نام دامنه را به مقصد شبکه مرتبط می‌کند. <span dir="ltr">TLS</span> برای اتصال امن نقش دارد. همه بازدیدها نیاز به اتصال تازه ندارند.

## مثال اول: <span dir="ltr">HTML</span> زودتر از پایان همه فایل‌ها

<div dir="ltr" align="left">

~~~html
<h1>فروشگاه</h1>
<img src="/large-photo.jpg" width="800" height="400" alt="ویترین">
~~~

</div>

مرورگر می‌تواند <span dir="ltr">HTML</span> را تدریجی پردازش کند؛ لازم نیست همه تصاویر دانلود شوند تا اصل ساخت درخت شروع شود. نمایش دقیق به <span dir="ltr">CSS</span> و منابع مسدودکننده هم وابسته است.

## مثال دوم: <span dir="ltr">worker</span>

<div dir="ltr" align="left">

~~~js
// الگوی استفاده در مرورگر:
const worker = new Worker('/worker.js');
worker.postMessage({ values: [1, 2, 3] });
worker.onmessage = event => console.log(event.data);
// پس از پایان نیاز: worker.terminate();
~~~

</div>

<span dir="ltr">worker.js</span> باید جدا پیاده‌سازی شود. <span dir="ltr">Worker</span> می‌تواند محاسبه مناسب را خارج <span dir="ltr">main thread</span> انجام دهد، ولی مستقیم <span dir="ltr">DOM</span> صفحه را تغییر نمی‌دهد. انتقال پیام و داده هم هزینه دارد.

## پاسخ مصاحبه و تمرین

**چرا دانلود شبکه ادامه دارد ولی صفحه به کلیک جواب نمی‌دهد؟** شبکه می‌تواند بیرون اجرای <span dir="ltr">JavaScript main thread</span> پیش برود، ولی <span dir="ltr">handler</span> کلیک برای اجرا منتظر آزاد شدن مسیر مربوط می‌ماند.

<span dir="ltr">async</span> کردن یک حلقه سنگین، آن را <span dir="ltr">worker</span> می‌کند؟

<details>
<summary>پاسخ</summary>

خیر. <span dir="ltr">async</span> به‌تنهایی محل اجرای محاسبه را عوض نمی‌کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Browser Architecture

Modern browsers separate work across processes/threads for security, rendering, networking, GPU/compositing, and workers. Exact implementations differ, but the concepts matter.

## Main-thread responsibilities

A page's main thread commonly handles much of:

- JavaScript execution
- DOM work
- style/layout
- event dispatch
- rendering coordination

Heavy JavaScript can therefore delay interaction and rendering.

## Browser APIs vs JavaScript language

These are platform/browser APIs, not ECMAScript language features:

- DOM
- `fetch`
- timers
- WebSocket
- Storage
- History
- URL
- Observers
- Workers

## Web Workers

Workers run JavaScript away from the main UI thread for suitable CPU-heavy tasks.

They do not directly manipulate the normal DOM. Communication occurs through messages/shared mechanisms.

## Interview questions

1. Why can heavy JS block rendering?
2. Is `setTimeout` part of the JS language itself?
3. What can a Web Worker help with?
4. Can a worker directly update the DOM?

</div>

</details>

</div>
