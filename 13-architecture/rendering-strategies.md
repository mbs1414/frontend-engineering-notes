<div dir="rtl" align="right">

# <span dir="ltr">HTML</span> کجا و چه زمانی ساخته شود؟ — <span dir="ltr">CSR</span>، <span dir="ltr">SSR</span>، <span dir="ltr">SSG</span> و <span dir="ltr">RSC</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Rendering</span> مرورگر](../05-browser/rendering-pipeline.md) و [<span dir="ltr">React</span>](../03-react/rendering.md).

## انتخاب را با نوع صفحه بفهم

| روش | زمان/محل تولید اصلی | مثال |
| --- | --- | --- |
| <span dir="ltr">CSR</span> | بیشتر در مرورگر | پنل داخلی تعاملی |
| <span dir="ltr">SSR</span> | برای درخواست در سرور | صفحه شخصی‌سازی‌شده |
| <span dir="ltr">SSG</span> | هنگام <span dir="ltr">build</span> | مقاله نسبتاً ثابت |
| <span dir="ltr">ISR</span> یا بازتولید افزایشی | الگوی وابسته به <span dir="ltr">framework</span> برای تازه‌سازی خروجی ایستا | کاتالوگ با سیاست <span dir="ltr">refresh</span> |

این‌ها می‌توانند ترکیب شوند و انتخابشان به <span dir="ltr">SEO</span>، تازگی، هزینه و تعامل وابسته است.

## مثال اول: <span dir="ltr">HTML</span> دیده می‌شود ولی هنوز <span dir="ltr">handler</span> آماده نیست

<div dir="ltr" align="left">

~~~text
سرور HTML می‌فرستد -> مرورگر محتوا را نشان می‌دهد
 -> JavaScript لازم می‌رسد -> React به ساختار موجود متصل می‌شود
~~~

</div>

این اتصال را **<span dir="ltr">Hydration</span>** می‌نامیم. خروجی اولیه <span dir="ltr">client</span> باید با خروجی سرور سازگار باشد؛ <span dir="ltr">Date.now</span> یا <span dir="ltr">random</span> متفاوت در <span dir="ltr">render</span> می‌تواند <span dir="ltr">mismatch</span> بسازد.

## مثال دوم: <span dir="ltr">RSC</span> و <span dir="ltr">SSR</span>

<span dir="ltr">Server Component</span> تعیین می‌کند کدام <span dir="ltr">component</span> در محیط جدا از <span dir="ltr">client</span> اجرا شود و کدش برای اجرای همان <span dir="ltr">component</span> به مرورگر نرود. <span dir="ltr">SSR</span> درباره ساخت <span dir="ltr">HTML</span> سمت سرور است؛ یک مفهوم یکسان نیستند و می‌توانند با هم استفاده شوند. اجرا می‌تواند در <span dir="ltr">build</span> یا هنگام درخواست باشد. [مرجع <span dir="ltr">Server Components</span>](https://react.dev/reference/rsc/server-components) این تمایز را توضیح می‌دهد.

<span dir="ltr">Streaming</span> امکان ارسال مرحله‌ای خروجی را می‌دهد؛ کل داده صفحه لازم نیست همیشه قبل از اولین <span dir="ltr">byte</span> آماده باشد.

## پاسخ مصاحبه و تمرین

آیا <span dir="ltr">SSR</span> تمام <span dir="ltr">JavaScript client</span> را حذف می‌کند؟

<details>
<summary>پاسخ</summary>

خیر. بخش‌های تعاملی هنوز ممکن است <span dir="ltr">JavaScript</span> و <span dir="ltr">hydration</span> لازم داشته باشند. مقدار کد به معماری و مرز <span dir="ltr">component</span>ها وابسته است.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Rendering Strategies: CSR, SSR, SSG, ISR, RSC

## CSR

Client-Side Rendering means browser JavaScript creates most application UI after initial resources load.

Advantages:

- rich client interactions
- straightforward SPA model
- static hosting options

Costs:

- more client JavaScript
- first-content delays on weak devices/networks if poorly designed
- SEO/social metadata can need more care

## SSR

Server-Side Rendering produces HTML per request.

Advantages:

- earlier HTML/content
- can improve first-load/SEO behavior

Costs:

- server compute
- hydration/data/cache complexity

## SSG

Static Site Generation produces HTML ahead of requests, commonly at build time.

## ISR

Incremental Static Regeneration is a framework pattern where static output can be regenerated/revalidated after deployment instead of rebuilding everything.

Exact semantics are framework-specific.

## Hydration

Server-rendered HTML becomes connected to client React behavior.

```text
server HTML
+
client JS/React
→ interactive UI
```

A hydration mismatch happens when server and client output disagree.

## Streaming

The server can progressively send page output rather than wait for the whole tree before sending anything.

## React Server Components

Some component execution stays on the server, reducing client JavaScript for server-only components and enabling server-side data composition.

Important: Server Components are not automatically the default in every React application. Framework/runtime architecture determines support and defaults.

## Interview questions

1. CSR vs SSR?
2. SSG vs ISR?
3. What is hydration?
4. What causes hydration mismatch?
5. What can Server Components reduce?

</div>

</details>

</div>
