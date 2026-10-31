<div dir="rtl" align="right">

# یک واسطه مخصوص نیاز <span dir="ltr">frontend</span> — <span dir="ltr">Backend for Frontend</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">HTTP</span>](../06-network/http.md)، [<span dir="ltr">Auth</span>](../09-security/authentication-security.md).

<span dir="ltr">BFF</span> یک لایه <span dir="ltr">backend</span> متناسب با نیاز یک <span dir="ltr">client</span> یا گروهی از <span dir="ltr">client</span>هاست. می‌تواند پاسخ چند سرویس را ترکیب کند، شکل داده را ساده کند یا <span dir="ltr">credential</span>های حساس سرویس را خارج مرورگر نگه دارد.

## مثال اول: صفحه محصول

<div dir="ltr" align="left">

~~~text
بدون تجمیع:
مرورگر -> سرویس محصول
مرورگر -> سرویس موجودی
مرورگر -> سرویس پیشنهادها

با BFF:
مرورگر -> BFF -> سرویس‌های لازم -> پاسخ مناسب همان صفحه
~~~

</div>

این الزاماً یک درخواست سریع‌تر تضمین نمی‌کند؛ <span dir="ltr">BFF</span> هم باید ارتباط‌های مستقل را مناسب شروع کند و <span dir="ltr">timeout</span> و خطای جزئی را مدیریت کند.

## مثال دوم: <span dir="ltr">session</span>

<span dir="ltr">BFF</span> می‌تواند با <span dir="ltr">cookie session</span> با مرورگر ارتباط داشته باشد و <span dir="ltr">token</span> سرویس‌های پشت‌صحنه را <span dir="ltr">server-side</span> نگه دارد. هنوز <span dir="ltr">CSRF</span>، بررسی مجوز، ثبت رویداد و مدیریت <span dir="ltr">session</span> لازم‌اند.

هزینه آن یک سرویس دیگر، عملیات نگهداری، <span dir="ltr">latency</span> و مرز <span dir="ltr">ownership</span> تازه است. برای <span dir="ltr">API</span> ساده‌ای که همین حالا نیاز <span dir="ltr">client</span> را خوب پاسخ می‌دهد، افزودنش ممکن است ارزش نداشته باشد.

## پاسخ مصاحبه و تمرین

اگر سرویس پیشنهادها خراب شود، آیا کل صفحه محصول باید شکست بخورد؟

<details>
<summary>پاسخ</summary>

به نیاز محصول بستگی دارد. می‌توان اطلاعات اصلی را نمایش داد و بخش پیشنهاد را با حالت خطای مستقل یا حذف موقت مدیریت کرد؛ قرارداد خطای جزئی باید روشن باشد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Backend For Frontend (BFF)

## Definition

A BFF is a backend/API layer designed around the needs of a particular frontend/client.

```text
Web App ───── Web BFF ────┐
                          ├── internal services
Mobile App ── Mobile BFF ─┘
```

## Benefits

A BFF can:

- aggregate multiple services
- adapt response shapes
- hide internal service topology
- handle client-specific auth/session logic
- reduce frontend request waterfalls
- protect server-only secrets/integrations

## BFF vs GraphQL

- BFF = architectural pattern
- GraphQL = API/query technology

A BFF can expose REST, GraphQL, RPC, or another interface.

## Costs

- another service to deploy/observe
- possible duplicated logic
- versioning/ownership complexity

Business-critical domain rules should usually live in appropriate backend/domain services rather than being copied into every BFF.

## Interview questions

1. What is a BFF?
2. How can it improve frontend performance?
3. Is GraphQL the same thing?
4. What should not be duplicated into each BFF?

</div>

</details>

</div>
