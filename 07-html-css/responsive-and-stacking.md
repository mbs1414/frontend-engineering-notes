<div dir="rtl" align="right">

# صفحه باریک و <span dir="ltr">modal</span> پنهان — <span dir="ltr">Responsive</span> و <span dir="ltr">Stacking Context</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">CSS</span>](./css-core.md) و [چیدمان](./flexbox-and-grid.md).

## <span dir="ltr">Responsive</span> از محتوا شروع می‌شود

قرار نیست برای اسم هر مدل گوشی یک <span dir="ltr">breakpoint</span> بسازی. ببین چیدمان در چه عرضی نامناسب می‌شود و آنجا قانون را تغییر بده.

<div dir="ltr" align="left">

~~~css
.layout { display: grid; gap: 16px; }
@media (min-width: 800px) {
  .layout { grid-template-columns: 240px 1fr; }
}
~~~

</div>

اول یک ستون داریم و از عرض مناسب دو ستون می‌شود. واحدهای نسبی، <span dir="ltr">wrap</span> و اندازه منعطف کمک می‌کنند بین <span dir="ltr">breakpoint</span>ها هم طراحی سالم بماند. <span dir="ltr">Container Query</span> بر اساس ظرف <span dir="ltr">component</span> تصمیم می‌گیرد، نه فقط <span dir="ltr">viewport</span>.

## چرا <span dir="ltr">z-index</span> خیلی بزرگ هم کافی نیست؟

<div dir="ltr" align="left">

~~~css
.sidebar { position: relative; z-index: 1; }
.sidebar .modal { position: absolute; z-index: 9999; }
.content { position: relative; z-index: 2; }
~~~

</div>

اگر <span dir="ltr">sidebar</span> و <span dir="ltr">content</span> در <span dir="ltr">context</span> بیرونی هم‌سطح باشند، فرزند <span dir="ltr">sidebar</span> در <span dir="ltr">context</span> خودش گیر می‌ماند؛ ۹۹۹۹ محلی لزوماً از <span dir="ltr">content</span> با ۲ جلو نمی‌زند. بعضی ویژگی‌ها مثل <span dir="ltr">transform</span> و <span dir="ltr">opacity</span> کمتر از ۱ هم <span dir="ltr">stacking context</span> ایجاد می‌کنند.

<span dir="ltr">Portal</span> می‌تواند <span dir="ltr">modal</span> را از بعضی محدودیت‌های محل <span dir="ltr">DOM</span> بیرون ببرد، ولی خودش طراحی <span dir="ltr">focus</span> و دسترسی را حل نمی‌کند. <span dir="ltr">top layer</span> مرورگر هم مفهوم جداگانه‌ای است.

## پاسخ مصاحبه و تمرین

برای پیدا کردن علت پنهان بودن <span dir="ltr">modal</span>، فقط <span dir="ltr">z-index</span> خودش را نگاه کنیم؟

<details>
<summary>پاسخ</summary>

خیر. <span dir="ltr">context</span>های والد، <span dir="ltr">clipping</span>، <span dir="ltr">overflow</span> و محل قرارگیری <span dir="ltr">DOM</span> را هم بررسی کن. عددهای <span dir="ltr">z-index</span> در <span dir="ltr">context</span>های متفاوت مستقیم مقایسه نمی‌شوند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Responsive Design & Stacking Context

## Responsive design

Adapt layout/content to available space and user/device capabilities.

```css
.card {
  display: block;
}

@media (min-width: 768px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

Prefer fluid tools where possible:

- percentages
- Grid/Flexbox
- `min()` / `max()` / `clamp()`
- intrinsic sizing
- responsive images

## Container queries

Allow a component to adapt to its container rather than only the viewport. Useful for reusable components placed in different layout regions.

## Breakpoints

Choose breakpoints based on where content/layout breaks, not a sacred device-width list copied from a framework.

## Stacking context

A stacking context is a local layering environment. A child cannot always escape it merely by setting a gigantic `z-index`.

Stacking contexts can be created by conditions/properties including positioned elements with z-index, transforms, opacity, filters, isolation, and other rules.

## Why `z-index: 999999` can fail

If a modal is inside a lower ancestor stacking context, its huge local z-index cannot outrank a separate higher ancestor context.

React portals are commonly used for overlays to avoid some intermediate clipping/stacking constraints, while accessibility/focus still must be handled.

## Interview questions

1. Media query vs container query?
2. What makes a breakpoint good?
3. What is a stacking context?
4. Why can huge z-index still lose?
5. Why are portals useful for overlays?

</div>

</details>

</div>
