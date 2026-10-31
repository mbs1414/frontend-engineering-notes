<div dir="rtl" align="right">

# <span dir="ltr">HTML</span> معنی‌دار — <span dir="ltr">Semantics</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** آشنایی با <span dir="ltr">tag</span>های ابتدایی <span dir="ltr">HTML</span>.

<span dir="ltr">HTML</span> فقط ظرفی برای <span dir="ltr">CSS</span> نیست؛ معنی و رفتار پیش‌فرض اجزای صفحه را مشخص می‌کند. <span dir="ltr">button</span> برای عمل، <span dir="ltr">a</span> با <span dir="ltr">href</span> برای رفتن به مقصد، <span dir="ltr">nav</span> برای ناوبری و <span dir="ltr">main</span> برای محتوای اصلی است.

## مثال اول: عمل یا جابه‌جایی؟

<div dir="ltr" align="left">

~~~html
<a href="/products">دیدن محصولات</a>
<button type="button">افزودن به سبد</button>
~~~

</div>

لینک قابلیت‌هایی مثل باز کردن در تب جدید دارد. دکمه با صفحه‌کلید و ابزار کمکی رفتار استاندارد دارد. <span dir="ltr">div</span> با <span dir="ltr">onClick</span> به‌تنهایی این قراردادها را نمی‌سازد.

## مثال دوم: فرم قابل فهم

<div dir="ltr" align="left">

~~~html
<form action="/search" method="get">
  <label for="query">نام محصول</label>
  <input id="query" name="q" type="search" required>
  <button type="submit">جست‌وجو</button>
</form>
~~~

</div>

<span dir="ltr">for</span> و <span dir="ltr">id</span> برچسب را به <span dir="ltr">input</span> وصل می‌کنند. <span dir="ltr">name</span> کلید داده ارسالی فرم است؛ <span dir="ltr">id</span> به‌تنهایی جای آن را نمی‌گیرد. <span dir="ltr">required</span> اعتبارسنجی مرورگر است و جای اعتبارسنجی سرور را ندارد.

تصویر معنادار <span dir="ltr">alt</span> توضیحی می‌خواهد؛ تصویر صرفاً تزئینی معمولاً <span dir="ltr">alt</span> خالی می‌گیرد. <span dir="ltr">title</span> صفحه، <span dir="ltr">lang</span> و <span dir="ltr">viewport</span> هم روی فهم، نمایش و دسترسی اثر دارند.

## پاسخ مصاحبه و تمرین

**چرا <span dir="ltr">semantic HTML</span> مهم است؟** رفتار پیش‌فرض درست، ساختار قابل فهم برای ابزار کمکی و نگهداری آسان‌تر می‌دهد؛ ظاهر را همچنان <span dir="ltr">CSS</span> تعیین می‌کند.

دکمه «حذف» داخل فرم، اگر نباید <span dir="ltr">submit</span> کند چه ویژگی‌ای لازم دارد؟

<details>
<summary>پاسخ</summary>

<span dir="ltr">`type="button"`</span>. رفتار پیش‌فرض <span dir="ltr">button</span> در فرم می‌تواند <span dir="ltr">submit</span> باشد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# HTML & Semantics

## Semantic HTML

Choose elements based on meaning and behavior, not appearance.

Useful elements:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `aside`
- `footer`
- `button`
- `a`
- `form`
- `label`

## Button vs link

- `<button>` performs an action.
- `<a href>` navigates.

A clickable `<div>` is usually a sign that native HTML has been politely ignored and now keyboard/accessibility behavior must be rebuilt manually.

## Forms

```html
<label for="email">Email</label>
<input id="email" name="email" type="email" autocomplete="email" />
```

Important concepts:

- label association
- `name`
- input type
- native validation
- autocomplete
- submit semantics
- button type

Inside forms, `<button>` defaults to submit behavior unless its type says otherwise.

## Images

Meaningful images need useful alt text. Decorative images can use empty alt:

```html
<img src="decoration.svg" alt="" />
```

## Scripts and metadata

Understand `async`, `defer`, module scripts, page title, viewport metadata, language, and description/social metadata where needed.

## Interview questions

1. Button vs anchor?
2. Why are labels important?
3. What happens when a form button has no explicit type?
4. Why does semantic HTML matter?

</div>

</details>

</div>
