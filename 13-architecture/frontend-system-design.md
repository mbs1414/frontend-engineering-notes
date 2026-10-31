<div dir="rtl" align="right">

# در مصاحبه یک سیستم را چطور طراحی کنیم؟ — <span dir="ltr">Frontend System Design</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** <span dir="ltr">React</span>، شبکه، داده، تست و دسترس‌پذیری. از گفتن نام ابزارها شروع نکن؛ اول نیاز و محدودیت را روشن کن.

## مثال کامل: <span dir="ltr">Autocomplete</span>

نیاز: کاربر تایپ کند، پیشنهاد ببیند و با کلیک یا صفحه‌کلید انتخاب کند. سؤال‌های اول: حداقل طول <span dir="ltr">query</span> چیست؟ داده چقدر زیاد است؟ پاسخ چقدر باید تازه باشد؟ آیا نتیجه باید در <span dir="ltr">URL</span> بماند؟

<div dir="ltr" align="left">

~~~text
Input فوری
 -> debounce برای محدود کردن شروع درخواست
 -> query key شامل عبارت و فیلتر
 -> دریافت با cancellation و محافظت از نتیجه قدیمی
 -> loading / error / empty / success
 -> انتخاب قابل استفاده با Arrow، Enter و Escape
~~~

</div>

مالک <span dir="ltr">query</span> ورودی، <span dir="ltr">state</span> نمایش پیشنهاد و داده سرور را مشخص کن. <span dir="ltr">debounce</span> جلوی <span dir="ltr">race</span> را به‌تنهایی نمی‌گیرد. هنگام انتخاب، رفتار <span dir="ltr">focus</span> و نام قابل دسترس کنترل باید معلوم باشد.

## <span dir="ltr">API</span> و حالت شکست

<div dir="ltr" align="left">

~~~json
{
  "items": [{ "id": "p7", "label": "React Book" }],
  "nextCursor": null
}
~~~

</div>

این قرارداد نمونه است. برای خطای شبکه پیام و <span dir="ltr">retry</span> تعریف کن؛ برای نتیجه خالی پیام جدا. <span dir="ltr">query</span>های تکراری را متناسب با <span dir="ltr">freshness cache</span> کن، ولی داده خصوصی را بین کاربران مخلوط نکن.

## مثال دوم: جدول داده

فیلتر، <span dir="ltr">sort</span> و <span dir="ltr">page</span> قابل اشتراک را می‌توان در <span dir="ltr">URL</span> نگه داشت. انتخاب ردیف‌ها با شناسه پایدار است. برای داده بزرگ، <span dir="ltr">pagination</span> سرور و شاید <span dir="ltr">virtualization</span> را بررسی کن؛ <span dir="ltr">virtualization</span> تعداد <span dir="ltr">DOM</span> را کم می‌کند و لزوماً تعداد داده دانلودشده را کم نمی‌کند.

## پاسخ مصاحبه و تمرین

بعد از طرح اولیه، درباره امنیت، تست، <span dir="ltr">observability</span> و <span dir="ltr">trade-off</span>ها صحبت کن. <span dir="ltr">latency</span> جست‌وجو، خطای <span dir="ltr">API</span> و انتخاب نتیجه از سنجه‌های قابل بررسی‌اند.

اگر زمان مصاحبه کم است، آیا باید اول <span dir="ltr">reducer</span> کامل بنویسی؟

<details>
<summary>پاسخ</summary>

خیر. ابتدا نیاز، مدل داده، مالکیت <span dir="ltr">state</span> و مسیر اصلی را روشن کن؛ سپس بخش پرریسک را با جزئیات طراحی کن. تصمیم‌ها را با دلیل و محدودیت بیان کن.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Frontend System Design

## Answering framework

For any system-design problem discuss:

1. requirements
2. component/module boundaries
3. state ownership
4. API/data model
5. caching
6. loading/error/empty states
7. performance
8. accessibility
9. security
10. testing
11. observability
12. failure/retry behavior

## Example: autocomplete

Requirements:

- type a query
- fast results
- keyboard support
- loading/error/empty states
- stale responses must not overwrite newer results

Possible flow:

```text
Input state
  ↓ debounce
Query/request
  ↓ cancellation/deduplication
Cache
  ↓
Accessible combobox/listbox
```

Discuss:

- minimum query length
- debounce delay
- AbortController
- query caching
- ArrowUp/ArrowDown/Enter/Escape
- focus/ARIA semantics
- virtualization only if result sets are genuinely large

## Example: data table

Consider:

- server vs client sorting
- pagination
- filtering
- selection
- row identity
- virtualization
- sticky headers
- column resizing
- URL synchronization
- query caching
- accessible table/sort semantics

## Practice prompts

- DevLens/API client
- chat
- file uploader
- admin dashboard
- notification system
- infinite feed
- authentication/session flow

## Interview questions

1. Server vs client pagination?
2. How prevent stale autocomplete results?
3. What table state belongs in the URL?
4. When virtualize?

</div>

</details>

</div>
