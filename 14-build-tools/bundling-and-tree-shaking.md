<div dir="rtl" align="right">

# چه کدی در خروجی اولیه بماند؟ — <span dir="ltr">Bundling</span> و <span dir="ltr">Tree Shaking</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Build</span>](./build-process-and-vite.md)، [<span dir="ltr">ESM</span>](./esm-commonjs.md).

<span dir="ltr">Bundler</span> از <span dir="ltr">entry</span> شروع می‌کند و <span dir="ltr">import</span>ها را دنبال می‌کند؛ نتیجه یک **<span dir="ltr">Module Graph</span>** است. بعد می‌تواند خروجی را در یک یا چند <span dir="ltr">chunk</span> قرار دهد.

## مثال اول: <span dir="ltr">export</span> استفاده‌نشده

<div dir="ltr" align="left">

~~~js
// math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
// در فایل مصرف‌کننده:
// import { add } from './math.js';
~~~

</div>

با شرایط مناسب، کد <span dir="ltr">multiply</span> که استفاده نمی‌شود می‌تواند از خروجی حذف شود. این **<span dir="ltr">Tree Shaking</span>** است؛ نتیجه به تحلیل ابزار و <span dir="ltr">side effect</span>ها وابسته است.

## مثال دوم: زمان دریافت جدا

<div dir="ltr" align="left">

~~~js
async function exportReport() {
  const { createReport } = await import('./report.js');
  return createReport();
}
~~~

</div>

این **<span dir="ltr">Code Splitting</span>** است: بخش <span dir="ltr">report</span> می‌تواند بعداً دانلود شود. فایل <span dir="ltr">report</span> باید <span dir="ltr">export</span> مربوط را داشته باشد. <span dir="ltr">Tree shaking</span> حذف کد غیرلازم است؛ <span dir="ltr">splitting</span> تغییر تقسیم و زمان بارگذاری کد لازم.

اگر <span dir="ltr">module</span> هنگام <span dir="ltr">import</span> چیزی ثبت یا <span dir="ltr">CSS</span> اضافه کند، <span dir="ltr">side effect</span> دارد. اعلام اشتباه <span dir="ltr">sideEffects</span>: <span dir="ltr">false</span> می‌تواند حذف خطرناک ایجاد کند. حجم خام، فشرده و هزینه اجرا را با <span dir="ltr">bundle analyzer</span> و <span dir="ltr">Network</span> بررسی کن.

## پاسخ مصاحبه و تمرین

آیا <span dir="ltr">import</span> نکردن یک <span dir="ltr">export</span> تضمین می‌کند کل فایل آن حذف شود؟

<details>
<summary>پاسخ</summary>

خیر. فایل ممکن است <span dir="ltr">export</span> دیگری لازم یا <span dir="ltr">side effect</span> داشته باشد؛ <span dir="ltr">bundler</span> باید بتواند حذف را امن تشخیص دهد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Bundling & Tree Shaking

## Module graph

A bundler begins from entry points and follows imports to build a dependency graph.

Output can include:

- entry chunks
- shared/vendor chunks
- dynamic chunks
- CSS/assets

## Code splitting

```js
import('./analytics.js');
```

Dynamic imports create asynchronous loading boundaries in common bundlers.

## Tree shaking

Removes exports/code proven unused, especially with statically analyzable ES modules and correct side-effect metadata.

## Side effects

A module can perform work merely by being imported:

```js
registerGlobalStyles();
```

Bundlers must preserve real side effects. Incorrect package metadata can prevent optimization or break behavior.

## Dead-code elimination

More general removal of code proven unreachable/unneeded by static analysis/build-time constants.

## Analyze

Inspect:

- initial chunks
- duplicate dependency versions
- large libraries
- whether lazy boundaries actually split output

## Interview questions

1. What does a bundler do?
2. Tree shaking vs code splitting?
3. Why do side effects matter?
4. What does dynamic `import()` enable?

</div>

</details>

</div>
