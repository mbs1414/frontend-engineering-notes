<div dir="rtl" align="right">

# از <span dir="ltr">HTML</span> تا پیکسل — <span dir="ltr">Rendering Pipeline</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [ساختار مرورگر](./browser-architecture.md).

<span dir="ltr">HTML</span> به <span dir="ltr">DOM</span> تبدیل می‌شود و <span dir="ltr">CSS</span> برای محاسبه <span dir="ltr">style</span>ها پردازش می‌شود. سپس مرورگر مشخص می‌کند چه چیزهایی باید نمایش داده شوند، اندازه و موقعیت را حساب می‌کند، ظاهر را <span dir="ltr">paint</span> می‌کند و خروجی را برای نمایش ترکیب می‌کند.

<div dir="ltr" align="left">

~~~text
HTML -> DOM
CSS  -> قواعد style / CSSOM
          -> محاسبه style
          -> layout
          -> paint
          -> composite
~~~

</div>

این مراحل در استفاده واقعی <span dir="ltr">incremental</span> و بهینه‌شده‌اند؛ همه تغییرها مسیر کامل را طی نمی‌کنند.

## مثال اول: چیزی در <span dir="ltr">DOM</span> هست ولی دیده نمی‌شود

<div dir="ltr" align="left">

~~~html
<p style="display: none">Hidden</p>
~~~

</div>

این <span dir="ltr">node</span> در <span dir="ltr">DOM</span> وجود دارد، ولی جعبه <span dir="ltr">layout</span> معمولی برای آن ساخته نمی‌شود. پس <span dir="ltr">DOM</span> با مجموعه عناصر قابل نمایش یکسان نیست.

## مثال دوم: بارگذاری <span dir="ltr">script</span>

<div dir="ltr" align="left">

~~~html
<script src="/classic.js"></script>
<script defer src="/app.js"></script>
<script async src="/analytics.js"></script>
<script type="module" src="/main.js"></script>
~~~

</div>

<span dir="ltr">script</span> کلاسیک معمول می‌تواند <span dir="ltr">parsing</span> را متوقف کند. <span dir="ltr">defer</span> دانلود را هم‌پوشان می‌کند و اجرای <span dir="ltr">script</span> کلاسیک خارجی را تا بعد از <span dir="ltr">parse</span> عقب می‌اندازد و ترتیب <span dir="ltr">defer</span>ها را حفظ می‌کند. <span dir="ltr">async</span> پس از آماده شدن اجرا می‌شود و ترتیب سند را تضمین نمی‌کند. <span dir="ltr">module</span> به‌طور پیش‌فرض رفتار <span dir="ltr">deferred</span> دارد.

<span dir="ltr">CSS</span> می‌تواند <span dir="ltr">rendering</span> را متوقف کند و در بعضی شرایط روی زمان اجرای <span dir="ltr">script</span> هم اثر بگذارد. «شبکه تمام شد» الزاماً یعنی «صفحه آماده تعامل شد» نیست.

## پاسخ مصاحبه و تمرین

**<span dir="ltr">Reflow</span> و <span dir="ltr">Repaint</span> چیست؟** در گفت‌وگو معمولاً به محاسبه مجدد <span dir="ltr">layout</span> و <span dir="ltr">paint</span> اشاره دارند؛ باید علت تغییر و مرحله واقعی در ابزار را بررسی کرد.

برای <span dir="ltr">script</span> وابسته به آماده بودن <span dir="ltr">DOM</span> و ترتیب فایل‌ها، <span dir="ltr">async</span> بهتر است یا <span dir="ltr">defer</span>؟

<details>
<summary>پاسخ</summary>

برای <span dir="ltr">script</span>های کلاسیک خارجی با چنین وابستگی‌ای، <span dir="ltr">defer</span> معمولاً مناسب‌تر است. <span dir="ltr">async</span> ترتیب وابستگی‌ها را تضمین نمی‌کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Browser Rendering Pipeline

## Parsing

HTML becomes a DOM. CSS contributes to a CSSOM/style representation.

Simplified path:

```text
HTML → DOM
CSS  → CSSOM
        ↓
style calculation
        ↓
layout
        ↓
paint
        ↓
composite
```

## Script loading

For classic external scripts:

- `defer`: downloads in parallel, runs after parsing, preserves deferred order.
- `async`: downloads in parallel and runs as soon as ready; order is not guaranteed.

Module scripts have their own semantics and behave as deferred by default in normal document loading.

## Rendering-blocking work

CSS can delay first rendering because the browser needs style information. JavaScript can block parsing/rendering depending on how it is loaded and how long it executes.

## Reflow/repaint language

"Reflow" generally refers to layout recalculation. "Repaint" refers to paint work. Prefer precise terms: style, layout, paint, composite.

## Interview questions

1. DOM vs CSSOM?
2. Why can CSS block rendering?
3. `async` vs `defer`?
4. What comes after layout?

</div>

</details>

</div>
