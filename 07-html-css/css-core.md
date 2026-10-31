<div dir="rtl" align="right">

# چرا این <span dir="ltr">CSS</span> اعمال نمی‌شود؟ — <span dir="ltr">Cascade</span> و <span dir="ltr">Box Model</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">HTML</span>](./html.md).

## <span dir="ltr">Cascade</span> یعنی انتخاب قانون برنده

وقتی چند قانون روی یک ویژگی اثر دارند، مرورگر فقط «آخرین خط» را انتخاب نمی‌کند. <span dir="ltr">origin</span>، <span dir="ltr">importance</span>، <span dir="ltr">layer</span>، <span dir="ltr">specificity</span> و ترتیب نوشتن، طبق قواعد <span dir="ltr">cascade</span> نقش دارند. <span dir="ltr">specificity</span> بعد از مراحل بالاتر مقایسه می‌شود.

<div dir="ltr" align="left">

~~~html
<p class="message" id="notice">سلام</p>
~~~

</div>

<div dir="ltr" align="left">

~~~css
.message { color: blue; }
#notice { color: red; }
~~~

</div>

در شرایط یکسان این مثال، <span dir="ltr">selector</span> شناسه <span dir="ltr">specificity</span> بیشتری دارد و متن قرمز می‌شود. اضافه کردن !<span dir="ltr">important</span> بدون فهم علت معمولاً نگهداری را سخت می‌کند.

## مثال دوم: عرض واقعی جعبه

<div dir="ltr" align="left">

~~~css
.card {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 2px solid;
}
~~~

</div>

با <span dir="ltr">border-box</span> عرض اعلام‌شده شامل <span dir="ltr">content</span>، <span dir="ltr">padding</span> و <span dir="ltr">border</span> است. با <span dir="ltr">content-box</span> پیش‌فرض، در این مثال عرض بیرونی بدون <span dir="ltr">margin</span> برابر ۲۴۴ پیکسل می‌شود. <span dir="ltr">margin</span> فضای بیرون <span dir="ltr">border</span> است.

بعضی ویژگی‌ها مثل <span dir="ltr">color</span> معمولاً ارث می‌رسند؛ <span dir="ltr">width</span> معمولاً این‌طور نیست. <span dir="ltr">display</span> تعیین می‌کند جعبه چطور در <span dir="ltr">layout</span> شرکت کند. <span dir="ltr">position</span>: <span dir="ltr">absolute</span> عنصر را از جریان عادی خارج می‌کند و محل آن به <span dir="ltr">containing block</span> وابسته است؛ الزاماً همیشه صفحه نیست.

## پاسخ مصاحبه و تمرین

دو <span dir="ltr">selector</span> کاملاً هم‌شرایط و هم‌وزن داریم؛ کدام <span dir="ltr">color</span> می‌برد؟

<details>
<summary>پاسخ</summary>

در حالت معمول، قانونی که در ترتیب منابع بعدتر آمده است. قبل از این نتیجه باید مطمئن شویم اهمیت، <span dir="ltr">layer</span> و <span dir="ltr">specificity</span> متفاوت نیستند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# CSS Core

## Cascade

The cascade decides which declaration wins using factors such as origin/importance, cascade layers, specificity, and source order.

"Highest specificity wins" is incomplete.

## Specificity

Conceptually:

- IDs have high selector specificity.
- classes/attributes/pseudo-classes outrank element selectors.
- inline styles have high author precedence.
- `!important` changes normal precedence rules and should be deliberate.

## Inheritance

Some properties inherit naturally, especially many text-related properties. Others do not.

## Box model

```text
margin
 border
  padding
   content
```

With:

```css
box-sizing: border-box;
```

specified width/height include padding and border.

## Positioning

- `static`
- `relative`
- `absolute`
- `fixed`
- `sticky`

Absolutely positioned elements use a containing block determined by layout rules, often influenced by positioned ancestors.

## Overflow

`overflow` affects clipping/scrolling and can change sticky positioning/scroll-container behavior.

## CSS variables

```css
:root {
  --space-md: 1rem;
}

.card {
  padding: var(--space-md);
}
```

They participate in the cascade and are useful for design tokens/themes.

## Interview questions

1. Explain the box model.
2. What decides which CSS rule wins?
3. Absolute positioning is relative to what?
4. Why use `border-box`?

</div>

</details>

</div>
