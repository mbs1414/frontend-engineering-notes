<div dir="rtl" align="right">

# تغییر <span dir="ltr">CSS</span> چه هزینه‌ای دارد؟ — <span dir="ltr">Layout</span>، <span dir="ltr">Paint</span> و <span dir="ltr">Composite</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [مسیر <span dir="ltr">rendering</span> مرورگر](../05-browser/rendering-pipeline.md).

مرورگر ابتدا موقعیت و اندازه‌ها را محاسبه می‌کند (**<span dir="ltr">Layout</span>**)، ظاهر بخش‌ها را می‌سازد (**<span dir="ltr">Paint</span>**) و لایه‌ها را برای نمایش ترکیب می‌کند (**<span dir="ltr">Composite</span>**). هر تغییر الزاماً همه مراحل را از صفر اجرا نمی‌کند.

## مثال اول: تغییر اندازه در برابر جابه‌جایی بصری

<div dir="ltr" align="left">

~~~css
.box { width: 100px; }
.box.expanded { width: 200px; }
.box.shifted { transform: translateX(100px); }
~~~

</div>

تغییر <span dir="ltr">width</span> می‌تواند جای همسایه‌ها را هم تغییر دهد و <span dir="ltr">layout</span> بخواهد. <span dir="ltr">transform</span> اغلب برای انیمیشن مناسب‌تر است، چون می‌تواند از مسیر ترکیب لایه‌ها انجام شود؛ این تضمین «رایگان بودن» یا <span dir="ltr">GPU</span> شدن همه شرایط نیست.

## مثال دوم: خواندن و نوشتن در حلقه

<div dir="ltr" align="left">

~~~js
// فرض: elements فهرست چند DOM element است
// بهتر است اندازه مشترک را یک بار بخوانیم:
const width = document.body.offsetWidth;
for (const element of elements) {
  element.style.width = width + 'px';
}
~~~

</div>

اگر داخل هر <span dir="ltr">iteration</span> ابتدا <span dir="ltr">style</span> را تغییر بدهی و سپس اندازه وابسته به <span dir="ltr">layout</span> بخوانی، ممکن است مرورگر مجبور به محاسبه مکرر <span dir="ltr">layout</span> شود؛ به این الگو **<span dir="ltr">Layout Thrashing</span>** می‌گویند. قطعه بالا الگوی استفاده است و <span dir="ltr">elements</span> باید از <span dir="ltr">DOM</span> انتخاب شود.

<span dir="ltr">requestAnimationFrame</span> زمان <span dir="ltr">callback</span> را نزدیک فرصت نمایش هماهنگ می‌کند؛ محاسبه سنگین را خودکار سبک یا خارج <span dir="ltr">main thread</span> نمی‌کند.

## پاسخ مصاحبه و تمرین

**آیا <span dir="ltr">will-change</span> را به همه عناصر بدهیم؟** خیر؛ ایجاد و نگهداری لایه‌ها حافظه و هزینه دارد. با اندازه‌گیری و محدود به نیاز استفاده کن.

برای انیمیشن حرکت کارت، ابتدا <span dir="ltr">left</span> را امتحان می‌کنی یا <span dir="ltr">transform</span>؟

<details>
<summary>پاسخ</summary>

معمولاً <span dir="ltr">transform</span> انتخاب شروع بهتری است؛ سپس با <span dir="ltr">Performance</span> و نمایش لایه‌ها نتیجه واقعی را بررسی می‌کنیم.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Browser Rendering Performance

## Pipeline

```text
DOM + CSSOM
   ↓
Style calculation
   ↓
Layout
   ↓
Paint
   ↓
Composite
```

## Layout

Calculates geometry: sizes and positions.

## Paint

Produces visual drawing instructions/output for text, backgrounds, borders, shadows, and more.

## Composite

Combines layers into the final frame.

Animations using `transform` and `opacity` can often avoid layout and may be cheaper than animating geometry properties. Do not add `will-change` everywhere; extra layers cost memory/resources.

## Layout thrashing

Repeatedly mixing layout reads and writes can force synchronous layout work.

```js
for (const el of elements) {
  const width = el.offsetWidth;      // read
  el.style.width = `${width + 1}px`; // write
}
```

Batch reads and writes where possible.

## `requestAnimationFrame`

```js
requestAnimationFrame(() => {
  element.style.transform = 'translateX(20px)';
});
```

Useful for frame-aligned visual updates.

## Interview questions

1. Layout vs paint vs composite?
2. Why are transforms often cheaper for animation?
3. What is layout thrashing?
4. When use `requestAnimationFrame`?

</div>

</details>

</div>
