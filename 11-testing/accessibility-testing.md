<div dir="rtl" align="right">

# دسترس‌پذیری را چطور بررسی کنیم؟

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Accessibility</span>](../08-accessibility/accessibility.md)، [<span dir="ltr">RTL</span>](./react-testing-library.md).

تست خودکار بخشی از خطاها را پیدا می‌کند، ولی تجربه کامل صفحه‌کلید و <span dir="ltr">screen reader</span> را اثبات نمی‌کند. <span dir="ltr">semantic query</span>ها، تحلیلگر خودکار و بررسی دستی نقش مکمل دارند.

## مثال اول: نام قابل دسترس

<div dir="ltr" align="left">

~~~jsx
render(<button aria-label="بستن پنجره">×</button>);
expect(screen.getByRole('button', { name: 'بستن پنجره' }))
  .toBeInTheDocument();
~~~

</div>

اگر نام مناسب حذف شود، این <span dir="ltr">assertion</span> می‌تواند نقص قرارداد را نشان دهد. صرف وجود <span dir="ltr">role</span> مناسب، کیفیت تمام تعامل را اثبات نمی‌کند.

## مثال دوم: <span dir="ltr">focus</span>

<div dir="ltr" align="left">

~~~jsx
const user = userEvent.setup();
render(<><a href="/home">خانه</a><button>ذخیره</button></>);
await user.tab();
expect(screen.getByRole('link', { name: 'خانه' })).toHaveFocus();
~~~

</div>

این تست با <span dir="ltr">setup RTL</span> و <span dir="ltr">matcher</span>های <span dir="ltr">jest-dom</span> اجرا می‌شود. <span dir="ltr">dialog</span> واقعی علاوه بر نام، به ورود و بازگشت <span dir="ltr">focus</span>، محدود کردن تعامل بیرون و کلید <span dir="ltr">Escape</span> طبق قرارداد نیاز دارد.

## پاسخ مصاحبه و تمرین

اگر ابزار خودکار صفر خطا گزارش کند، آیا صفحه کاملاً دسترس‌پذیر است؟

<details>
<summary>پاسخ</summary>

خیر. معنی متن‌ها، ترتیب منطقی حرکت، رفتار پیچیده و تجربه ابزار کمکی همچنان بررسی انسانی و تست مرورگر می‌خواهند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Accessibility Testing

Accessibility tests are not a separate universe from UI tests. Semantic queries already reward accessible markup.

## High-value checks

- controls have accessible names
- labels are associated with inputs
- keyboard navigation works
- focus moves intentionally for dialogs/menus/forms
- disabled state is represented semantically
- dialogs have appropriate roles/names
- dynamic status/errors are announced when required

```tsx
expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
```

## Focus flow

```tsx
const user = userEvent.setup();
await user.tab();
expect(screen.getByRole('textbox', { name: /name/i })).toHaveFocus();
```

Component tests cannot replace manual screen-reader testing or browser-level accessibility audits, but they can prevent many semantic regressions cheaply.

</div>

</details>

</div>
