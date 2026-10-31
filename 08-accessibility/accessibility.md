<div dir="rtl" align="right">

# صفحه‌ای که با صفحه‌کلید هم کار کند — <span dir="ltr">Accessibility</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">HTML</span> معنی‌دار](../07-html-css/html.md).

دسترس‌پذیری یعنی کاربر با توانایی‌ها و ابزارهای مختلف بتواند محتوا را بفهمد و کارش را انجام دهد؛ <span dir="ltr">screen reader</span> تنها یکی از این ابزارهاست.

## مثال اول: اسم قابل فهم برای کنترل

<div dir="ltr" align="left">

~~~html
<label for="email">ایمیل</label>
<input id="email" type="email" autocomplete="email">
<button type="button" aria-label="بستن پنجره">×</button>
~~~

</div>

<span dir="ltr">label</span> نام قابل دسترس <span dir="ltr">input</span> را می‌سازد. دکمه ضربدر بدون متن روشن ممکن است نام مبهم داشته باشد؛ <span dir="ltr">aria-label</span> معنی عمل را می‌دهد. <span dir="ltr">placeholder</span> جای <span dir="ltr">label</span> دائمی را نمی‌گیرد.

## مثال دوم: خطای فرم

<div dir="ltr" align="left">

~~~html
<label for="password">رمز عبور</label>
<input id="password" type="password"
  aria-invalid="true" aria-describedby="password-error">
<p id="password-error">رمز باید دست‌کم ۸ نویسه باشد.</p>
~~~

</div>

این نمایش یک حالت خطاست؛ در حالت معتبر باید وضعیت را متناسب تغییر دهی. خطا را فقط با قرمز شدن <span dir="ltr">border</span> نشان نده.

## یک بررسی عملی

با <span dir="ltr">Tab</span> حرکت کن، با <span dir="ltr">Enter</span> یا <span dir="ltr">Space</span> کنترل مناسب را فعال کن، <span dir="ltr">focus</span> را ببین و برای <span dir="ltr">dialog</span> رفتار <span dir="ltr">Escape</span> و بازگشت <span dir="ltr">focus</span> را بررسی کن. ترتیب <span dir="ltr">heading</span>ها، <span dir="ltr">zoom</span>، کنتراست و کاهش حرکت هم مهم‌اند. <span dir="ltr">ARIA</span> رفتار کلیک یا صفحه‌کلید ایجاد نمی‌کند؛ تا جای ممکن عنصر بومی مناسب را انتخاب کن.

## پاسخ مصاحبه و تمرین

آیا افزودن <span dir="ltr">role</span>="<span dir="ltr">button</span>" به <span dir="ltr">div</span> آن را کاملاً معادل <span dir="ltr">button</span> می‌کند؟

<details>
<summary>پاسخ</summary>

خیر. <span dir="ltr">focusability</span>، کلیدهای فعال‌سازی، <span dir="ltr">disabled</span> و رفتارهای بومی خودکار اضافه نمی‌شوند. اگر عمل دکمه است، معمولاً <span dir="ltr">button</span> انتخاب درست‌تری است.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Accessibility Fundamentals

## Native semantics first

Prefer:

```html
<button>Save</button>
```

over:

```html
<div role="button" tabindex="0">Save</div>
```

Native controls already include keyboard behavior, semantics, focus behavior, and assistive-technology integration.

## Accessible name

Interactive elements need a meaningful accessible name from visible text, labels, or appropriate ARIA mechanisms.

## Forms

```html
<label for="email">Email</label>
<input id="email" name="email" />
```

Placeholder text is not a replacement for a label.

## Keyboard navigation

Users should be able to:

- reach interactive controls
- see focus
- activate controls correctly
- close overlays
- avoid keyboard traps

Do not remove focus outlines without a visible replacement.

## Focus management

For modal dialogs:

- move focus appropriately into the dialog
- keep keyboard interaction inside while modal
- allow expected close behavior
- return focus sensibly after close

Use proven accessible primitives when possible.

## ARIA

ARIA supplements native HTML when native semantics cannot express the required widget pattern.

> No ARIA is better than incorrect ARIA.

## Visual accessibility

Consider:

- contrast
- text zoom
- reduced motion
- color not being the only state indicator

## Interview questions

1. Why button instead of div+click?
2. What is an accessible name?
3. Placeholder vs label?
4. What is focus trapping?
5. When should ARIA be used?

</div>

</details>

</div>
