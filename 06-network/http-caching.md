<div dir="rtl" align="right">

# آیا لازم است همان فایل را دوباره دانلود کنیم؟ — <span dir="ltr">HTTP Cache</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">HTTP</span>](./http.md).

<span dir="ltr">Cache</span> یک نسخه پاسخ را نگه می‌دارد تا درخواست بعدی ارزان‌تر شود. دو سؤال جدا داریم: «می‌توان ذخیره کرد؟» و «تا چه زمانی بدون پرسیدن دوباره قابل استفاده است؟»

## مثال اول: فایل با نام نسخه‌دار

<div dir="ltr" align="left">

~~~http
Cache-Control: public, max-age=31536000, immutable
~~~

</div>

برای <span dir="ltr">asset</span>ی مثل <span dir="ltr">app.a1b2.js</span> که با تغییر محتوا نامش هم عوض می‌شود، <span dir="ltr">cache</span> طولانی می‌تواند مناسب باشد. این سیاست را برای <span dir="ltr">HTML</span> یا داده خصوصی، بدون بررسی قرارداد استفاده نکن.

## مثال دوم: اعتبارسنجی دوباره

<div dir="ltr" align="left">

~~~http
Cache-Control: no-cache
ETag: "version-7"
~~~

</div>

در استفاده بعدی، <span dir="ltr">client</span> می‌تواند <span dir="ltr">`If-None-Match: "version-7"`</span> بفرستد. اگر محتوا عوض نشده باشد، سرور 304 می‌دهد و بدنه قبلی استفاده می‌شود.

| <span dir="ltr">directive</span> | معنی |
| --- | --- |
| <span dir="ltr">no-cache</span> | ذخیره ممکن است، ولی پیش از استفاده مجدد اعتبارسنجی لازم است |
| <span dir="ltr">no-store</span> | پاسخ را ذخیره نکن |
| <span dir="ltr">private</span> | <span dir="ltr">cache</span> اشتراکی نباید ذخیره کند |
| <span dir="ltr">max-age</span> | مدت <span dir="ltr">freshness</span> برحسب ثانیه |

<span dir="ltr">Last-Modified</span> و <span dir="ltr">If-Modified-Since</span> هم سازوکار <span dir="ltr">validator</span> دیگری‌اند. <span dir="ltr">Vary</span> می‌تواند مشخص کند چه <span dir="ltr">header</span>های درخواست در انتخاب نسخه <span dir="ltr">cache</span> اثر دارند. جزئیات در [راهنمای <span dir="ltr">HTTP caching</span>](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) آمده است.

## پاسخ مصاحبه و تمرین

**آیا <span dir="ltr">cache</span> مرورگر با <span dir="ltr">cache TanStack</span> یکی است؟** خیر. یکی پاسخ <span dir="ltr">HTTP</span> را مدیریت می‌کند و دیگری داده و <span dir="ltr">lifecycle</span> برنامه را؛ <span dir="ltr">CDN</span> و <span dir="ltr">Service Worker</span> هم لایه‌های دیگری‌اند.

برای داده‌ای که اصلاً نباید ذخیره شود، <span dir="ltr">no-cache</span> کافی است؟

<details>
<summary>پاسخ</summary>

خیر؛ <span dir="ltr">no-store</span> دستور مربوط به جلوگیری از ذخیره است. <span dir="ltr">no-cache</span> به معنی منع ذخیره نیست.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# HTTP Caching

## `Cache-Control`

```http
Cache-Control: no-store
```

Do not store the response.

```http
Cache-Control: no-cache
```

May store it, but revalidate before reuse.

```http
Cache-Control: public, max-age=31536000, immutable
```

Useful for content-hashed immutable static assets.

## Validators

### ETag

Server:

```http
ETag: "abc123"
```

Client revalidation:

```http
If-None-Match: "abc123"
```

If unchanged, server can respond:

```http
304 Not Modified
```

### Last-Modified

Time-based validator used with `If-Modified-Since`.

## Cache layers are different

- browser HTTP cache
- CDN cache
- Service Worker Cache Storage
- TanStack Query/server-state cache
- in-memory memoization

Do not use the word "cache" as though these are one storage bucket with multiple branding departments.

## Content hashing

```text
app.8b13f3.js
```

A changed file gets a new URL, allowing long-lived caching for unchanged assets.

## Interview questions

1. `no-cache` vs `no-store`?
2. What is ETag?
3. Why is 304 useful?
4. Why content-hash filenames?
5. HTTP cache vs TanStack Query cache?

</div>

</details>

</div>
