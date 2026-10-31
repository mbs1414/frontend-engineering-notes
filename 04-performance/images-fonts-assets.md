<div dir="rtl" align="right">

# تصویر و فونت سبک‌تر، با نمایش پایدار

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Core Web Vitals</span>](./core-web-vitals.md) و <span dir="ltr">HTML</span> ابتدایی.

یک تصویر ۴۰۰۰ پیکسلی برای کارت ۳۰۰ پیکسلی می‌تواند دانلود و <span dir="ltr">decode</span> غیرضروری ایجاد کند. اندازه مناسب، فرمت، <span dir="ltr">cache</span> و زمان کشف منبع را با هم بررسی کن.

## مثال اول: تصویر واکنش‌گرا

<div dir="ltr" align="left">

~~~html
<img
  src="/card-640.webp"
  srcset="/card-320.webp 320w, /card-640.webp 640w"
  sizes="(max-width: 600px) 100vw, 320px"
  width="640" height="400"
  alt="کتاب جاوااسکریپت"
  loading="lazy">
~~~

</div>

<span dir="ltr">srcset</span> گزینه‌های اندازه را می‌دهد؛ <span dir="ltr">sizes</span> عرض تقریبی نمایش را اعلام می‌کند تا مرورگر انتخاب کند. این فایل‌ها باید واقعاً روی سرور موجود باشند. <span dir="ltr">lazy</span> برای تصویر پایین صفحه مناسب است؛ تصویر اصلی بالای صفحه را بی‌دلیل <span dir="ltr">lazy</span> نکن.

## مثال دوم: رفتار فونت

<div dir="ltr" align="left">

~~~css
@font-face {
  font-family: Vazirmatn;
  src: url('/fonts/vazirmatn.woff2') format('woff2');
  font-display: swap;
}
~~~

</div>

<span dir="ltr">swap</span> اجازه نمایش زودتر متن با فونت جایگزین را می‌دهد، ولی تغییر فونت ممکن است اندازه متن را عوض کند. فونت <span dir="ltr">fallback</span>، وزن‌های لازم و <span dir="ltr">subset</span> مناسب زبان را بررسی کن. فایل فونت این مثال باید در پروژه مصرف‌کننده فراهم شود.

## پاسخ مصاحبه و تمرین

**چرا فقط فشرده‌سازی کافی نیست؟** شاید فایل دیر کشف شود، اندازه نامناسب باشد یا <span dir="ltr">decode</span> و نمایش گلوگاه باشد.

برای <span dir="ltr">thumbnail</span> پایین صفحه و تصویر <span dir="ltr">hero</span> یک سیاست <span dir="ltr">loading</span> می‌گذاری؟

<details>
<summary>پاسخ</summary>

معمولاً خیر. <span dir="ltr">thumbnail</span> می‌تواند <span dir="ltr">lazy</span> باشد؛ <span dir="ltr">hero</span> باید زود کشف شود و در صورت تأیید با اندازه‌گیری اولویت مناسب بگیرد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Images, Fonts & Assets

## Responsive images

Use appropriately sized assets.

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  width="800"
  height="600"
  alt="..."
/>
```

Useful features:

- `srcset`
- `<picture>`
- modern formats where appropriate
- explicit width/height or aspect ratio
- `loading="lazy"` for offscreen images

## Do not lazy-load the LCP image blindly

The main above-the-fold image often needs early discovery. Lazy loading can delay it and worsen LCP.

## Fonts

Consider:

- file size
- unnecessary weights/styles
- subset strategy
- `font-display`
- fallback metrics/layout shift
- preload only critical files

Shipping twelve font weights is a charming way to make typography arrive after the user has navigated elsewhere.

## Icons

Avoid importing an entire icon library for two icons when tree-shakeable or targeted imports are available.

## Interview questions

1. Why set image dimensions?
2. Why can lazy loading hurt LCP?
3. What does `srcset` solve?
4. How can fonts contribute to layout shift?

</div>

</details>

</div>
