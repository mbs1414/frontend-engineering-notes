<div dir="rtl" align="right">

# از <span dir="ltr">JSX</span> تا فایل قابل اجرای مرورگر — <span dir="ltr">Build</span> و <span dir="ltr">Vite</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** <span dir="ltr">JavaScript</span>، <span dir="ltr">React</span> و [ماژول‌ها](./esm-commonjs.md).

مرورگر <span dir="ltr">source</span> پروژه را با همه <span dir="ltr">syntax</span>ها و <span dir="ltr">import</span>های مخصوص ابزارها عیناً اجرا نمی‌کند. مسیر <span dir="ltr">build</span> می‌تواند تبدیل <span dir="ltr">syntax</span>، ساخت گراف ماژول‌ها، تقسیم <span dir="ltr">chunk</span>، فشرده‌سازی و تولید <span dir="ltr">asset</span> داشته باشد.

## مثال اول: سه مسئولیت متفاوت

<div dir="ltr" align="left">

~~~text
Type checking: آیا نوع‌ها با قرارداد سازگارند؟
Transpilation: تبدیل syntax مثل JSX/TypeScript
Bundling: دنبال کردن importها و ساخت خروجی
~~~

</div>

موفق شدن تبدیل <span dir="ltr">TypeScript</span> به <span dir="ltr">JavaScript</span> الزاماً یعنی <span dir="ltr">type check</span> کامل پاس شده نیست. در بسیاری پروژه‌ها <span dir="ltr">`tsc --noEmit`</span> جدا اجرا می‌شود.

## مثال دوم: توسعه با <span dir="ltr">Vite</span>

<div dir="ltr" align="left">

~~~sh
npm create vite@latest frontend-practice -- --template react
cd frontend-practice
npm install
npm run dev
~~~

</div>

این دستورها برای ساخت پروژه تمرینی جدا هستند. <span dir="ltr">Vite dev server</span> بر ماژول‌های <span dir="ltr">native</span> و <span dir="ltr">HMR</span> تکیه دارد تا تغییرها سریع‌تر دیده شوند؛ مسیر <span dir="ltr">production build</span> جداست. موتورهای داخلی ابزار بین نسخه‌ها تغییر می‌کنند؛ طبق [راهنمای فعلی <span dir="ltr">Vite</span>](https://vite.dev/guide/) نسخه نصب‌شده را مبنا بگیر.

<span dir="ltr">Source map</span> کد خروجی را به <span dir="ltr">source</span> مرتبط می‌کند تا <span dir="ltr">debugging</span> آسان شود. متغیری مثل <span dir="ltr">import.meta.env.VITE_API_URL</span> به <span dir="ltr">client</span> می‌رسد و <span dir="ltr">secret</span> نیست.

## پاسخ مصاحبه و تمرین

اگر <span dir="ltr">npm run build</span> پاس شد، آیا حتماً <span dir="ltr">TypeScript</span> بی‌خطاست؟

<details>
<summary>پاسخ</summary>

به <span dir="ltr">script</span> و <span dir="ltr">pipeline</span> بستگی دارد. بررسی کن <span dir="ltr">build</span> شامل <span dir="ltr">type checking</span> هست یا فقط <span dir="ltr">transpilation</span> و <span dir="ltr">bundling</span>.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Build Process & Vite

## Source to browser

A modern build may involve:

```text
TypeScript/JSX
    ↓
type checking (often separate)
    ↓
transformation/transpilation
    ↓
module graph
    ↓
bundling/chunking
    ↓
minification
    ↓
assets/source maps
    ↓
deployment
```

## Transpilation

Transforms source syntax/features into another JavaScript target. Tools in this ecosystem include Babel, SWC, and esbuild.

## Bundling

Builds a module graph and produces optimized output chunks/assets.

## Type checking

TypeScript checking is logically distinct from bundling. Some fast pipelines transpile TS and run `tsc --noEmit` separately.

## Source maps

Map generated/minified code back to source for debugging/monitoring.

## Vite development

Vite uses native ES module behavior and fast transforms so it does not need to eagerly bundle the entire app before development serving in the traditional way. Dependencies may be optimized/pre-bundled.

## HMR

Hot Module Replacement updates changed modules without always requiring a full reload.

## Vite environment variables

Client-exposed variables are bundled into browser code and are not secret.

```ts
import.meta.env.VITE_API_URL
```

## Interview questions

1. Bundler vs transpiler?
2. Is type checking the same as bundling?
3. What are source maps?
4. Why is Vite fast in development?
5. Are client env variables secret?

</div>

</details>

</div>
