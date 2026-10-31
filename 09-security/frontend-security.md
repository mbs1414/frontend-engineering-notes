<div dir="rtl" align="right">

# چه چیزهایی را نمی‌توان به مرورگر اعتماد کرد؟ — <span dir="ltr">Frontend Security</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">HTTP</span>](../06-network/http.md) و [احراز هویت](../06-network/cookies-and-auth.md).

کد و درخواست‌های <span dir="ltr">frontend</span> در کنترل کاربر قابل بررسی و تغییرند. به همین دلیل <span dir="ltr">frontend</span> برای تجربه کاربر <span dir="ltr">validation</span> می‌کند، ولی مرز نهایی مجوز و اعتبار داده باید روی سرور باشد.

## مثال اول: پنهان کردن دکمه کافی نیست

<div dir="ltr" align="left">

~~~jsx
// الگوی UI:
// {user.role === 'admin' && <button>حذف کاربر</button>}
~~~

</div>

این فقط نمایش را محدود می‌کند. کسی می‌تواند درخواست <span dir="ltr">DELETE</span> را مستقیم بفرستد؛ سرور باید هم هویت و هم مجوز حذف همان منبع را بررسی کند.

## مثال دوم: ورودی قیمت

<div dir="ltr" align="left">

~~~js
// داده سمت کاربر:
const order = { productId: 7, quantity: 2, displayedPrice: 100 };
~~~

</div>

سرور نباید قیمت قابل پرداخت را صرفاً از <span dir="ltr">displayedPrice</span> بپذیرد؛ قیمت معتبر و قواعد سفارش را از منابع مورد اعتماد خودش محاسبه می‌کند. <span dir="ltr">validation client</span> فقط بازخورد را سریع‌تر می‌کند.

کلید خصوصی سرویس را در <span dir="ltr">bundle</span> یا متغیر محیطی منتشرشده به <span dir="ltr">client</span> نگذار. نام <span dir="ltr">environment variable</span> به‌تنهایی آن را مخفی نمی‌کند. وابستگی‌ها، تزریق <span dir="ltr">HTML</span>، <span dir="ltr">URL</span>های ورودی و سیاست‌های امنیتی مرورگر هم بخشی از بررسی‌اند.

## پاسخ مصاحبه و تمرین

آیا <span dir="ltr">min</span>="1" در <span dir="ltr">input</span> عدد، خرید با <span dir="ltr">quantity</span> منفی را در <span dir="ltr">API</span> غیرممکن می‌کند؟

<details>
<summary>پاسخ</summary>

خیر. درخواست را می‌توان خارج فرم ساخت. سرور باید نوع، بازه و قواعد کسب‌وکار را بررسی کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Frontend Security

## Core areas

- XSS
- CSRF
- Content Security Policy
- authentication/session handling
- CORS understanding
- clickjacking defenses
- dependency/supply-chain risk
- safe handling of URLs, HTML, and files

## Client-side authorization is not security

```js
if (user.role === 'admin') {
  showDeleteButton();
}
```

Hiding a button is UX. The backend must authorize the delete request.

## Client validation vs server validation

Client validation improves UX. Server validation protects data integrity/security. A user can bypass frontend code entirely.

## Frontend secrets

Anything shipped into browser JavaScript is visible to users. Do not embed private API secrets in frontend bundles.

A Vite environment variable exposed to client code is configuration, not a secret vault wearing an uppercase name.

## Dependency risk

Keep dependencies intentional, updated, and monitored. Every package adds maintenance and supply-chain surface.

## Interview questions

1. Why can't frontend role checks enforce authorization?
2. Can a browser bundle contain a truly private API secret?
3. Client vs server validation?

</div>

</details>

</div>
