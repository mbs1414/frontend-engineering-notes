<div dir="rtl" align="right">

# فایل‌ها چطور به هم وصل می‌شوند؟ — <span dir="ltr">ESM</span> و <span dir="ltr">CommonJS</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** تابع و <span dir="ltr">object</span> در <span dir="ltr">JavaScript</span>.

ماژول مرز کد و قرارداد <span dir="ltr">export/import</span> را مشخص می‌کند. <span dir="ltr">ESM</span> استاندارد ماژول‌های <span dir="ltr">JavaScript</span> است؛ <span dir="ltr">CommonJS</span> الگوی رایج تاریخی <span dir="ltr">Node.js</span> است. انتخاب فرمت روی ابزار و <span dir="ltr">runtime</span> اثر دارد.

## مثال اول: <span dir="ltr">ESM</span> در دو فایل

<div dir="ltr" align="left">

~~~js
// math.js
export function add(a, b) { return a + b; }
// app.js:
// import { add } from './math.js';
// console.log(add(2, 3)); // 5
~~~

</div>

در مرورگر، <span dir="ltr">script</span> باید <span dir="ltr">type</span>="<span dir="ltr">module</span>" داشته باشد و مسیرها از یک سرور مناسب ارائه شوند. در <span dir="ltr">Node</span> هم پسوند و تنظیم <span dir="ltr">type</span> در <span dir="ltr">package.json</span> بر تفسیر فایل اثر دارد.

## مثال دوم: <span dir="ltr">CommonJS</span>

<div dir="ltr" align="left">

~~~js
// math.cjs
module.exports = { add: (a, b) => a + b };
// app.cjs:
// const { add } = require('./math.cjs');
// console.log(add(2, 3)); // 5
~~~

</div>

<span dir="ltr">require</span> مستقیماً <span dir="ltr">API</span> بومی مرورگر نیست. ابزار <span dir="ltr">build</span> می‌تواند بعضی وابستگی‌های <span dir="ltr">CommonJS</span> را تبدیل کند؛ <span dir="ltr">interop</span> با <span dir="ltr">default</span> و <span dir="ltr">named export</span> همیشه کاملاً یکسان نیست.

<span dir="ltr">import</span> استاتیک ساختار قابل تحلیل‌تری می‌دهد؛ <span dir="ltr">import</span>() پویا <span dir="ltr">Promise</span> برمی‌گرداند و برای بارگذاری مرحله‌ای مناسب است. <span dir="ltr">binding</span>های <span dir="ltr">import</span> در <span dir="ltr">ESM</span> زنده‌اند، یعنی صرفاً کپی مقدار در لحظه <span dir="ltr">import</span> نیستند.

## پاسخ مصاحبه و تمرین

آیا می‌توان هر فایل <span dir="ltr">CommonJS</span> را بدون تبدیل با <span dir="ltr">script type</span>="<span dir="ltr">module</span>" در مرورگر اجرا کرد؟

<details>
<summary>پاسخ</summary>

خیر. <span dir="ltr">module.exports</span> و <span dir="ltr">require</span> قرارداد دیگری دارند. باید خروجی و <span dir="ltr">dependency</span>ها با محیط مقصد سازگار شوند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# ESM vs CommonJS

## ES Modules

```js
export function add() {}
import { add } from './math.js';
```

ESM has statically analyzable import/export structure, which helps bundlers build dependency graphs and tree shake code.

## CommonJS

```js
module.exports = { add };
const { add } = require('./math');
```

Historically common in Node.js ecosystems.

## Dynamic import

```js
const module = await import('./feature.js');
```

Useful for lazy loading/code splitting.

## Interop

Real projects often consume both ESM and CommonJS packages. Toolchains handle interop, sometimes with caveats.

## Interview questions

1. ESM vs CommonJS syntax?
2. Why is ESM tree-shaking-friendly?
3. What does dynamic import enable?

</div>

</details>

</div>
