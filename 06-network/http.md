<div dir="rtl" align="right">

# مرورگر و سرور چطور حرف می‌زنند؟ — <span dir="ltr">HTTP</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** آشنایی با <span dir="ltr">URL</span>. <span dir="ltr">HTTP</span> قرارداد درخواست و پاسخ است؛ ظاهر صفحه می‌تواند با پاسخ‌های <span dir="ltr">HTML</span>، <span dir="ltr">JSON</span>، تصویر و فایل ساخته شود.

## یک مکالمه نمونه

<div dir="ltr" align="left">

~~~http
GET /api/products/7 HTTP/1.1
Host: shop.example
Accept: application/json
~~~

</div>

<div dir="ltr" align="left">

~~~http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":7,"title":"Book"}
~~~

</div>

خط اول درخواست <span dir="ltr">method</span> و مسیر را مشخص می‌کند. <span dir="ltr">header</span>ها اطلاعات جانبی‌اند؛ <span dir="ltr">body</span> می‌تواند داده اصلی را حمل کند. این نمایش متنی برای فهم پیام است؛ <span dir="ltr">HTTP/2</span> و <span dir="ltr">HTTP/3 framing</span> متفاوتی دارند.

## <span dir="ltr">method</span> و <span dir="ltr">status</span> را با کاربرد بفهم

| مورد | کاربرد معمول |
| --- | --- |
| <span dir="ltr">GET</span> | خواندن داده، بدون درخواست تغییر <span dir="ltr">state</span> سرور |
| <span dir="ltr">POST</span> | ارسال عملیات یا ایجاد منبع |
| <span dir="ltr">PUT</span> | جایگزینی <span dir="ltr">representation</span> در قرارداد <span dir="ltr">API</span> |
| <span dir="ltr">PATCH</span> | تغییر بخشی از داده |
| <span dir="ltr">DELETE</span> | حذف منبع طبق قرارداد |
| 201 / 204 | ایجاد شد / موفق بدون محتوای پاسخ |
| 400 / 401 / 403 / 404 | ورودی بد / نیاز به احراز / منع دسترسی / پیدا نشد |
| 429 / 500 | محدودیت درخواست / خطای سرور |

**<span dir="ltr">Idempotent</span>** یعنی تکرار درخواست، اثر مورد انتظار نهایی را بیشتر نمی‌کند؛ نه اینکه <span dir="ltr">status</span> و <span dir="ltr">body</span> همه پاسخ‌ها یکی باشد. <span dir="ltr">DELETE</span> می‌تواند بار اول موفق و بار بعد 404 بدهد و همچنان از نظر معنا <span dir="ltr">idempotent</span> باشد.

## مثال دوم: <span dir="ltr">Content-Type</span>

<div dir="ltr" align="left">

~~~js
const response = await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Book' }),
});
if (!response.ok) throw new Error('HTTP ' + response.status);
~~~

</div>

داخل <span dir="ltr">async</span> اجرا می‌شود و به <span dir="ltr">endpoint</span> واقعی نیاز دارد. <span dir="ltr">header</span> می‌گوید <span dir="ltr">body</span> ارسالی چه قالبی دارد؛ تضمین نمی‌کند سرور آن را قبول کند.

## پاسخ مصاحبه و تمرین

آیا <span dir="ltr">fetch</span> برای پاسخ 500 خودکار <span dir="ltr">reject</span> می‌شود؟

<details>
<summary>پاسخ</summary>

خیر. پاسخ <span dir="ltr">HTTP</span> رسیده است؛ باید <span dir="ltr">response.ok</span> یا <span dir="ltr">status</span> را بررسی کنیم. خطای شبکه و بعضی شکست‌های سطح <span dir="ltr">fetch</span> مسیر دیگری دارند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# HTTP

## Request/response

A request includes method, URL, headers, and optional body. A response includes status, headers, and body.

## Common methods

- `GET` — retrieve
- `POST` — submit/create/process
- `PUT` — replace/update semantics depending on API
- `PATCH` — partial update
- `DELETE` — delete
- `OPTIONS` — communication options/CORS preflight
- `HEAD` — headers without normal response body

Understand idempotency conceptually rather than memorizing REST slogans as if badly designed APIs do not exist.

## Status codes

Important examples:

- 200 OK
- 201 Created
- 204 No Content
- 304 Not Modified
- 400 Bad Request
- 401 Unauthorized, usually unauthenticated
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 422 Unprocessable Content/Entity depending on API terminology
- 429 Too Many Requests
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable

## Headers

Frontend-relevant headers include:

- `Content-Type`
- `Accept`
- `Authorization`
- `Cache-Control`
- `ETag`
- `Last-Modified`
- `Set-Cookie`
- CORS headers

## HTTP versions

- HTTP/1.1: traditional connection/request model.
- HTTP/2: multiplexed streams over a connection and header compression.
- HTTP/3: QUIC-based transport with different connection/loss characteristics.

## Interview questions

1. 401 vs 403?
2. PUT vs PATCH?
3. What is idempotency?
4. What does HTTP/2 multiplexing improve?

</div>

</details>

</div>
