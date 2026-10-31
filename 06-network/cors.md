<div dir="rtl" align="right">

# چرا درخواست در <span dir="ltr">Postman</span> کار می‌کند ولی در مرورگر نه؟ — <span dir="ltr">CORS</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">HTTP</span>](./http.md).

<span dir="ltr">Origin</span> از <span dir="ltr">scheme</span>، <span dir="ltr">host</span> و <span dir="ltr">port</span> تشکیل می‌شود. <span dir="ltr">`https://shop.example`</span> و <span dir="ltr">`https://api.example`</span> دو <span dir="ltr">origin</span> متفاوت‌اند. مرورگر برای دسترسی کد یک <span dir="ltr">origin</span> به بعضی پاسخ‌های <span dir="ltr">origin</span> دیگر محدودیت **<span dir="ltr">Same-Origin Policy</span>** دارد.

## <span dir="ltr">CORS</span> اجازه را از کجا می‌گیرد؟

سرور مقصد با <span dir="ltr">header</span>های <span dir="ltr">CORS</span> اعلام می‌کند کدام <span dir="ltr">origin</span> اجازه خواندن پاسخ را دارد. افزودن <span dir="ltr">Access-Control-Allow-Origin</span> به درخواست <span dir="ltr">frontend</span> جای پاسخ سرور را نمی‌گیرد.

<div dir="ltr" align="left">

~~~http
Access-Control-Allow-Origin: https://shop.example
Access-Control-Allow-Credentials: true
~~~

</div>

برای درخواست <span dir="ltr">credentialed</span>، <span dir="ltr">origin</span> مجاز نباید صرفاً * باشد. ارسال <span dir="ltr">cookie</span> در <span dir="ltr">fetch</span> هم می‌تواند به <span dir="ltr">credentials</span> و قواعد خود <span dir="ltr">cookie</span> و سیاست مرورگر وابسته باشد.

## مثال دوم: <span dir="ltr">Preflight</span>

<div dir="ltr" align="left">

~~~js
fetch('https://api.example/products/7', {
  method: 'DELETE',
  headers: { Authorization: 'Bearer example-token' },
});
~~~

</div>

این <span dir="ltr">endpoint</span> فرضی است. مرورگر معمولاً پیش از چنین درخواست <span dir="ltr">cross-origin</span> یک <span dir="ltr">OPTIONS</span> می‌فرستد تا مجوز <span dir="ltr">method</span> و <span dir="ltr">header</span>ها را بررسی کند. همه درخواست‌ها <span dir="ltr">preflight</span> ندارند؛ بعضی درخواست‌ها ارسال می‌شوند ولی خواندن پاسخ برای <span dir="ltr">JavaScript</span> مسدود می‌شود. [مرجع <span dir="ltr">CORS</span>](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) این شرایط را تفکیک می‌کند.

## پاسخ مصاحبه و تمرین

**<span dir="ltr">mode</span>: '<span dir="ltr">no-cors</span>' مشکل <span dir="ltr">API</span> را حل می‌کند؟** پاسخ <span dir="ltr">opaque</span> می‌دهد که <span dir="ltr">body</span> و <span dir="ltr">status</span> قابل استفاده معمول در <span dir="ltr">JavaScript</span> نیست؛ راه حل خواندن <span dir="ltr">JSON</span> یک <span dir="ltr">API</span> نیست. <span dir="ltr">CORS</span> هم جای <span dir="ltr">authentication</span> یا دفاع <span dir="ltr">CSRF</span> نیست.

چرا <span dir="ltr">Postman</span> محدودیت مشابهی ندارد؟

<details>
<summary>پاسخ</summary>

محدودیت مورد بحث توسط مرورگر برای کد صفحات وب اعمال می‌شود. موفق بودن درخواست در ابزار دیگر، صحت <span dir="ltr">header</span>های <span dir="ltr">CORS</span> سرور را اثبات نمی‌کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# CORS & Same-Origin Policy

## Origin

Origin is based on scheme, host, and port.

```text
https://example.com
https://api.example.com   ← different host
http://example.com        ← different scheme
https://example.com:444   ← different port
```

## Same-Origin Policy

Browsers restrict certain cross-origin interactions for security.

## CORS

Cross-Origin Resource Sharing lets a server tell browsers which cross-origin responses may be exposed to frontend code.

Important:

> CORS is primarily a browser security mechanism. Server-to-server tools are not restricted in the same way.

That is why an API can work in curl/Postman and fail in browser JavaScript.

## Preflight

Requests that do not meet "simple request" conditions may trigger an `OPTIONS` preflight.

```http
OPTIONS /api/users
Origin: https://app.example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: authorization
```

The server must respond with appropriate allowed-origin/method/header information.

## Credentials

Cross-origin cookies/credentials require compatible browser request settings and server CORS headers. Wildcard origins have restrictions when credentials are involved.

## CORS is not authentication

Allowing an origin does not identify or authorize a user.

## Interview questions

1. What is an origin?
2. Why can Postman work while browser fetch fails?
3. What is preflight?
4. Is CORS authentication?
5. Why does `OPTIONS` appear?

</div>

</details>

</div>
