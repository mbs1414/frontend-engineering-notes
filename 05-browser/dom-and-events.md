<div dir="rtl" align="right">

# کلیک از کجا عبور می‌کند؟ — <span dir="ltr">DOM</span> و <span dir="ltr">Event</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** <span dir="ltr">HTML</span> و تابع‌های <span dir="ltr">JavaScript</span>.

<span dir="ltr">DOM</span> نمایش درختی سند است و <span dir="ltr">API</span> تغییر آن را می‌دهد. در رویدادهای مناسب مثل <span dir="ltr">click</span>، مسیر انتشار شامل مرحله <span dir="ltr">capture</span> به سمت هدف، خود <span dir="ltr">target</span> و مرحله <span dir="ltr">bubble</span> به سمت بالاست.

## مثال اول: <span dir="ltr">target</span> و <span dir="ltr">currentTarget</span>

<div dir="ltr" align="left">

~~~html
<button id="save"><span>ذخیره</span></button>
<script>
document.querySelector('#save').addEventListener('click', event => {
  console.log(event.target.tagName);
  console.log(event.currentTarget.tagName);
});
</script>
~~~

</div>

اگر روی <span dir="ltr">span</span> کلیک کنی، <span dir="ltr">target</span> معمولاً <span dir="ltr">SPAN</span> و <span dir="ltr">currentTarget</span> برابر <span dir="ltr">BUTTON</span> است. اولی محل آغاز رویداد و دومی عنصری است که <span dir="ltr">listener</span> فعلی روی آن اجرا می‌شود.

## مثال دوم: یک <span dir="ltr">listener</span> برای چند ردیف

<div dir="ltr" align="left">

~~~js
const list = document.querySelector('#products');
list.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest('button[data-id]');
  if (!button || !list.contains(button)) return;
  console.log(button.dataset.id);
});
~~~

</div>

فرض این قطعه وجود لیست <span dir="ltr">products</span> و دکمه‌های <span dir="ltr">data-id</span> است. **<span dir="ltr">Event Delegation</span>** از <span dir="ltr">bubbling</span> کمک می‌گیرد و برای ردیف‌های اضافه‌شده بعدی هم کار می‌کند. همه <span dir="ltr">event</span>ها یکسان <span dir="ltr">bubble</span> نمی‌شوند.

## دو کار متفاوت

<span dir="ltr">preventDefault</span> رفتار پیش‌فرض قابل لغو، مثل ارسال فرم را متوقف می‌کند. <span dir="ltr">stopPropagation</span> انتشار به عناصر دیگر را متوقف می‌کند؛ به‌تنهایی ارسال فرم را لغو نمی‌کند. <span dir="ltr">listener</span> دارای <span dir="ltr">passive</span>: <span dir="ltr">true</span> نباید <span dir="ltr">preventDefault</span> مؤثر انجام دهد.

## پاسخ مصاحبه و تمرین

برای جلوگیری از <span dir="ltr">reload</span> فرم، کدام روش را می‌خواهی؟

<details>
<summary>پاسخ</summary>

در <span dir="ltr">handler</span> مربوط به <span dir="ltr">submit</span> از <span dir="ltr">event.preventDefault</span> استفاده می‌کنیم. متوقف کردن <span dir="ltr">bubbling</span> جای آن نیست.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# DOM & Browser Events

## DOM

The DOM is the browser's object representation of a document.

```js
const button = document.querySelector('button');
```

## Event propagation

Simplified:

```text
Capture
  ↓
Target
  ↓
Bubble
```

## Event delegation

Attach a listener to an ancestor and use bubbling:

```js
list.addEventListener('click', event => {
  const item = event.target.closest('[data-item-id]');
  if (!item) return;
  console.log(item.dataset.itemId);
});
```

Useful for dynamic/large lists.

## `preventDefault` vs `stopPropagation`

- `preventDefault()` stops a browser default action when cancelable.
- `stopPropagation()` stops the event traveling further through propagation.

They solve different problems.

## Passive listeners

For some scroll/touch scenarios, passive listeners tell the browser the handler will not cancel scrolling, enabling optimizations.

## Interview questions

1. Capture vs bubble?
2. What is event delegation?
3. `preventDefault` vs `stopPropagation`?
4. Why is event delegation useful?

</div>

</details>

</div>
