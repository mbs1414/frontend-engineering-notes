<div dir="rtl" align="right">

# مرورگر چگونه <span dir="ltr">session</span> را همراه درخواست می‌فرستد؟ — <span dir="ltr">Cookie</span> و <span dir="ltr">Auth</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">HTTP</span>](./http.md)، [<span dir="ltr">CORS</span>](./cors.md).

سرور می‌تواند با <span dir="ltr">Set-Cookie</span> از مرورگر بخواهد مقداری ذخیره کند. مرورگر در درخواست‌های منطبق با قواعد <span dir="ltr">cookie</span> آن را همراه می‌فرستد. این رفتار با گذاشتن دستی <span dir="ltr">Bearer token</span> در <span dir="ltr">header</span> متفاوت است.

## مثال اول: <span dir="ltr">cookie</span> پاسخ سرور

<div dir="ltr" align="left">

~~~http
Set-Cookie: session=opaque-value; Path=/; HttpOnly; Secure; SameSite=Lax
~~~

</div>

<span dir="ltr">HttpOnly</span> خواندن <span dir="ltr">cookie</span> با <span dir="ltr">JavaScript</span> صفحه را محدود می‌کند؛ <span dir="ltr">Secure</span> ارسال را به ارتباط امن محدود می‌کند؛ <span dir="ltr">SameSite</span> روی ارسال در موقعیت‌های <span dir="ltr">cross-site</span> اثر دارد. <span dir="ltr">Path</span> و <span dir="ltr">Domain</span> هم محدوده ارسال را تعیین می‌کنند. <span dir="ltr">HttpOnly</span> به‌تنهایی جلوی همه اثرهای <span dir="ltr">XSS</span> یا <span dir="ltr">CSRF</span> را نمی‌گیرد.

## مثال دوم: درخواست دارای <span dir="ltr">credential</span> به <span dir="ltr">origin</span> دیگر

<div dir="ltr" align="left">

~~~js
async function loadMe() {
  const response = await fetch('https://api.example/me', {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.json();
}
~~~

</div>

<span dir="ltr">API</span> فرضی است. <span dir="ltr">credentials</span>: <span dir="ltr">include</span> کافی نیست؛ تنظیم <span dir="ltr">CORS</span> سرور، <span dir="ltr">SameSite</span>، دامنه و سیاست‌های <span dir="ltr">cookie</span> مرورگر هم باید اجازه بدهند.

**<span dir="ltr">Authentication</span>** یعنی تشخیص هویت. **<span dir="ltr">Authorization</span>** یعنی تعیین مجوز همان هویت برای عملیات. پنهان کردن دکمه مدیر در <span dir="ltr">frontend</span> جای بررسی مجوز سرور را نمی‌گیرد.

## پاسخ مصاحبه و تمرین

چرا ذخیره همه‌چیز در <span dir="ltr">localStorage</span> راه حل عمومی <span dir="ltr">auth</span> نیست؟

<details>
<summary>پاسخ</summary>

<span dir="ltr">JavaScript</span> صفحه می‌تواند آن را بخواند، پس <span dir="ltr">XSS</span> می‌تواند <span dir="ltr">token</span> را افشا کند. انتخاب روش باید با معماری، نیاز <span dir="ltr">session</span> و مدل تهدید انجام شود؛ <span dir="ltr">cookie</span> هم نیازمند دفاع‌های متناسب است.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Cookies & Authentication

## Cookie attributes

### `HttpOnly`

Prevents normal JavaScript access through `document.cookie`. Helps reduce direct credential theft via XSS.

### `Secure`

Restricts cookie transmission to secure HTTPS contexts.

### `SameSite`

Controls cross-site cookie sending and is important in CSRF defense.

Common values:

- `Strict`
- `Lax`
- `None` (used with secure requirements in modern browsers)

## Cookie vs localStorage for auth

There is no honest one-line winner.

**HttpOnly cookie:**

- JavaScript cannot directly read it.
- browser sends it automatically when rules match.
- requires CSRF-aware design.

**localStorage bearer token:**

- easy for JS to attach explicitly.
- successful XSS can read/exfiltrate it.

Security depends on architecture and threat model.

## Authentication vs authorization

- Authentication: who are you?
- Authorization: are you allowed to do this?

Authorization must be enforced by the server. Hiding an admin button is UX, not a security boundary.

## Interview questions

1. What does HttpOnly help protect?
2. Why does SameSite matter?
3. Why can cookie sessions face CSRF?
4. Auth vs authorization?
5. Cookie vs localStorage tradeoffs?

</div>

</details>

</div>
