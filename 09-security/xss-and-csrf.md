<div dir="rtl" align="right">

# دو حمله با دو سازوکار متفاوت — <span dir="ltr">XSS</span> و <span dir="ltr">CSRF</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Cookie</span>](../06-network/cookies-and-auth.md)، [<span dir="ltr">DOM</span>](../05-browser/dom-and-events.md).

**<span dir="ltr">XSS</span>** یعنی داده مهاجم به کد قابل اجرا در <span dir="ltr">origin</span> برنامه تبدیل شود. **<span dir="ltr">CSRF</span>** یعنی مرورگر قربانی ناخواسته درخواست معتبر از نظر <span dir="ltr">credential</span> خودکار به سرویس بفرستد. راه دفاع هرکدام باید سازوکار همان حمله را هدف بگیرد.

## مثال اول: داده را متن قرار بده

<div dir="ltr" align="left">

~~~js
const comment = document.querySelector('#comment');
const userInput = '<b>سلام</b>';
comment.textContent = userInput;
~~~

</div>

با <span dir="ltr">textContent</span>، رشته به شکل متن نمایش داده می‌شود. <span dir="ltr">innerHTML</span> آن را به عنوان <span dir="ltr">markup</span> تفسیر می‌کند و برای ورودی غیرقابل اعتماد خطر دارد. اگر نمایش <span dir="ltr">HTML</span> واقعاً لازم است، <span dir="ltr">sanitization</span> معتبر و سیاست مناسب نیاز داری؛ <span dir="ltr">regex</span> ساده راه حل عمومی نیست. <span dir="ltr">JSX</span> برای متن عادی <span dir="ltr">escape</span> انجام می‌دهد، اما همه محل‌های مصرف <span dir="ltr">URL</span> و <span dir="ltr">HTML</span> را امن نمی‌کند.

## مثال دوم: درخواست تغییر حساس با <span dir="ltr">cookie</span>

<div dir="ltr" align="left">

~~~text
کاربر در بانک وارد شده است
 -> صفحه مهاجم مرورگر او را به ارسال درخواست وادار می‌کند
 -> cookie ممکن است خودکار همراه شود
 -> سرور باید مشروع بودن درخواست را هم بررسی کند
~~~

</div>

دفاع می‌تواند شامل <span dir="ltr">CSRF token</span>، بررسی <span dir="ltr">Origin</span> و تنظیم مناسب <span dir="ltr">SameSite</span> باشد. عملیات تغییر <span dir="ltr">state</span> را به <span dir="ltr">GET</span> نسپار. <span dir="ltr">CORS</span> به‌تنهایی دفاع کامل <span dir="ltr">CSRF</span> نیست؛ بعضی درخواست‌ها بدون اجازه خواندن پاسخ قابل ارسال‌اند. [مرجع <span dir="ltr">CSRF</span> در <span dir="ltr">MDN</span>](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF) جزئیات را توضیح می‌دهد.

<span dir="ltr">CSP</span> دفاع تکمیلی در برابر بعضی مسیرهای <span dir="ltr">XSS</span> است، نه جایگزین خروجی امن. <span dir="ltr">HttpOnly</span> جلوی خواندن <span dir="ltr">cookie</span> از <span dir="ltr">JavaScript</span> را می‌گیرد، اما کد <span dir="ltr">XSS</span> هنوز می‌تواند بعضی عملیات را در صفحه انجام دهد.

## پاسخ مصاحبه و تمرین

تبدیل <span dir="ltr">innerHTML</span> به <span dir="ltr">textContent</span> بیشتر کدام ریسک را هدف می‌گیرد؟

<details>
<summary>پاسخ</summary>

تزریق <span dir="ltr">markup</span> و مسیرهای <span dir="ltr">XSS</span> مربوط به همان محل مصرف. این تغییر به‌خودی‌خود دفاع <span dir="ltr">CSRF</span> برای <span dir="ltr">endpoint</span> سرور نیست.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# XSS & CSRF

## XSS

Cross-Site Scripting occurs when attacker-controlled content is interpreted/executed as dangerous markup/script in another user's browser under the application's origin.

Common categories:

- stored XSS
- reflected XSS
- DOM-based XSS

React escapes normal string rendering:

```tsx
<div>{userInput}</div>
```

Raw HTML is much riskier:

```tsx
<div dangerouslySetInnerHTML={{ __html: html }} />
```

Only use trusted/sanitized HTML with an understood threat model.

Dangerous sinks include `innerHTML`, `outerHTML`, `insertAdjacentHTML`, and unsafe dynamic script/URL handling.

### CSP

Content Security Policy can restrict script/resource execution and reduce impact of some injection attacks. It is defense in depth, not a substitute for safe output handling.

## CSRF

Cross-Site Request Forgery tricks a browser into sending an unwanted authenticated request, commonly relying on cookies that the browser attaches automatically.

Defenses may include:

- `SameSite` cookies
- CSRF tokens
- origin/referer checks where appropriate
- custom-header/CORS architecture
- reauthentication for sensitive operations

## Difference

**XSS:** attacker code executes in your application origin/context.

**CSRF:** attacker site causes an unwanted authenticated request.

Bearer tokens manually attached from JS change CSRF exposure but increase XSS token-theft exposure if stored in JavaScript-readable storage.

## Interview questions

1. Why is normal React string output safer than raw HTML?
2. What is stored XSS?
3. XSS vs CSRF?
4. How does SameSite help?
5. What does CSP do?

</div>

</details>

</div>
