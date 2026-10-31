<div dir="rtl" align="right">

# توکن را کجا نگه داریم؟ — <span dir="ltr">Authentication Security</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Cookie</span> و <span dir="ltr">Auth</span>](../06-network/cookies-and-auth.md)، [<span dir="ltr">XSS</span> و <span dir="ltr">CSRF</span>](./xss-and-csrf.md).

## نسخه جادویی برای همه برنامه‌ها نداریم

<span dir="ltr">Authentication</span> هویت را تعیین می‌کند و <span dir="ltr">Authorization</span> مجوز را. انتخاب <span dir="ltr">session cookie</span> یا <span dir="ltr">bearer token</span> به معماری، مدل تهدید و قرارداد <span dir="ltr">backend</span> وابسته است.

| محل نگهداری | نکته مهم |
| --- | --- |
| <span dir="ltr">cookie</span> با <span dir="ltr">HttpOnly</span> | <span dir="ltr">JavaScript</span> مستقیماً مقدار را نمی‌خواند؛ دفاع <span dir="ltr">CSRF</span> همچنان لازم است |
| <span dir="ltr">localStorage</span> | پایدار و <span dir="ltr">JavaScript-readable</span>؛ <span dir="ltr">XSS</span> می‌تواند مقدار را بخواند |
| حافظه برنامه | با <span dir="ltr">reload</span> از بین می‌رود؛ در برابر کد مخرب فعال مصون نیست |

## مثال اول: <span dir="ltr">bearer</span> در درخواست

<div dir="ltr" align="left">

~~~js
async function loadProfile(accessToken) {
  const response = await fetch('/api/me', {
    headers: { Authorization: 'Bearer ' + accessToken },
  });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return response.json();
}
~~~

</div>

این نمونه فقط نحوه ارسال را نشان می‌دهد؛ صدور، انقضا و نگهداری <span dir="ltr">token</span> را حل نمی‌کند. سرور باید <span dir="ltr">signature</span>، اعتبار، <span dir="ltr">scope</span> و مجوز عملیات را طبق معماری بررسی کند.

## مثال دوم: <span dir="ltr">logout</span> واقعی

<div dir="ltr" align="left">

~~~text
ارسال درخواست logout
 -> بی‌اعتبار کردن session یا refresh credential در سرور
 -> پاک کردن credential قابل پاک شدن طبق قرارداد
 -> پاک کردن cache خصوصی و نمایش حالت خارج‌شده
~~~

</div>

صرف مخفی کردن نام کاربر یا پاک کردن یک <span dir="ltr">state</span>، <span dir="ltr">session</span> معتبر سرور را لغو نمی‌کند. <span dir="ltr">Refresh token</span> هم نیاز به سیاست انقضا، <span dir="ltr">rotation</span> و مقابله با استفاده مجدد متناسب دارد.

## پاسخ مصاحبه و تمرین

آیا خواندن <span dir="ltr">role</span> از <span dir="ltr">payload</span> یک <span dir="ltr">JWT</span> در <span dir="ltr">frontend</span> برای اجازه حذف کافی است؟

<details>
<summary>پاسخ</summary>

خیر. <span dir="ltr">frontend</span> می‌تواند <span dir="ltr">UI</span> را تنظیم کند، ولی سرور باید اعتبار <span dir="ltr">token</span> و مجوز همان منبع را بررسی کند. <span dir="ltr">decode</span> کردن، معادل <span dir="ltr">verify</span> کردن نیست.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Authentication & Token Storage

## Authentication vs authorization

- Authentication: identity.
- Authorization: permission.

The server must enforce authorization.

## HttpOnly cookie session/token

Advantages:

- JavaScript cannot directly read an HttpOnly cookie.
- browser integrates cookie sending automatically.

Concerns:

- CSRF-aware design
- cookie scope/configuration
- session lifecycle

## Bearer tokens in JavaScript-readable storage

Advantages:

- explicit attachment to API requests
- simple client patterns

Concerns:

- successful XSS can read/exfiltrate the token
- refresh/revocation/storage lifecycle

## In-memory tokens

Reduce persistence but disappear on reload and are still usable by active XSS during compromise.

## Refresh tokens

Long-lived credentials need stronger handling. Rotation, reuse detection, revocation, and secure cookie architecture can matter.

## Logout

Deleting local state may not invalidate a server session/token. Proper logout can require server-side invalidation/revocation.

## Interview questions

1. Authentication vs authorization?
2. Why use HttpOnly?
3. Why isn't localStorage automatically the single answer to token storage?
4. Why can server-side logout invalidation matter?

</div>

</details>

</div>
