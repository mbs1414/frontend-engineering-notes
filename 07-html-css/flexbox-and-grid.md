<div dir="rtl" align="right">

# ردیف می‌خواهیم یا شبکه؟ — <span dir="ltr">Flexbox</span> و <span dir="ltr">Grid</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Box Model</span>](./css-core.md).

<span dir="ltr">Flexbox</span> برای چیدمان در یک محور اصلی مناسب است؛ <span dir="ltr">Grid</span> برای هماهنگی ردیف‌ها و ستون‌ها. هر دو می‌توانند در یک صفحه کنار هم استفاده شوند.

## مثال اول: نوار ابزار

<div dir="ltr" align="left">

~~~css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.toolbar input { min-width: 0; }
~~~

</div>

در حالت <span dir="ltr">flex-direction</span>: <span dir="ltr">row</span>، محور اصلی در امتداد ردیف است. <span dir="ltr">justify-content</span> روی محور اصلی و <span dir="ltr">align-items</span> روی محور عمود عمل می‌کند. اگر <span dir="ltr">direction</span> را <span dir="ltr">column</span> کنی، تفسیر محور‌ها عوض می‌شود؛ «<span dir="ltr">justify</span> همیشه افقی است» را حفظ نکن.

## مثال دوم: کارت‌های واکنش‌گرا

<div dir="ltr" align="left">

~~~css
.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 16px;
}
~~~

</div>

<span dir="ltr">grid</span> به اندازه فضای موجود ستون می‌سازد. <span dir="ltr">minmax</span> حداقل و حداکثر را تعیین می‌کند؛ <span dir="ltr">min</span> داخل آن کمک می‌کند حداقل ستون از ظرف باریک‌تر بزرگ‌تر نشود. <span dir="ltr">fr</span> سهم فضای قابل تقسیم است.

<span dir="ltr">flex</span>: 1 را با «عرض دقیق برابر در همه شرایط» اشتباه نگیر؛ اندازه محتوا و <span dir="ltr">min-width</span> می‌توانند اثر داشته باشند. <span dir="ltr">DevTools</span> ابزار مشاهده محورهای <span dir="ltr">flex</span> و خطوط <span dir="ltr">grid</span> دارد.

## پاسخ مصاحبه و تمرین

برای جدولی از کارت‌ها که ستون‌های ردیف‌های مختلف باید هم‌راستا باشند، کدام شروع مناسب‌تری است؟

<details>
<summary>پاسخ</summary>

معمولاً <span dir="ltr">Grid</span>. برای یک ردیف دکمه با فاصله مناسب، <span dir="ltr">Flexbox</span> اغلب ساده‌تر است. معیار، ساختار مورد نیاز است.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Flexbox & Grid

## Flexbox

Flexbox is primarily one-dimensional layout.

`flex-direction` defines the main axis.

- `justify-content`: main-axis distribution.
- `align-items`: cross-axis alignment.

```css
.container {
  display: flex;
  gap: 1rem;
  align-items: center;
}
```

Important item properties:

- `flex-grow`
- `flex-shrink`
- `flex-basis`

A common overflow surprise is flex items refusing to shrink below content size. `min-width: 0` is often needed on a child that must actually shrink.

## Grid

Grid is two-dimensional layout.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

Responsive pattern:

```css
grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
```

## Grid vs Flexbox

- Flexbox: one-dimensional flow/alignment.
- Grid: row/column structure.

They complement each other.

## Interview questions

1. Main vs cross axis?
2. `justify-content` vs `align-items`?
3. Grow/shrink/basis?
4. Grid vs Flexbox?
5. What does `1fr` mean conceptually?

</div>

</details>

</div>
