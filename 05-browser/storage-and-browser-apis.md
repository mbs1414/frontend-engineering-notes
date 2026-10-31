<div dir="rtl" align="right">

# داده را کجای مرورگر نگه داریم؟ — <span dir="ltr">Storage</span> و <span dir="ltr">API</span>های کاربردی

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** <span dir="ltr">object</span>، <span dir="ltr">JSON</span> و [<span dir="ltr">Browser</span>](./browser-architecture.md).

| ابزار | کاربرد نمونه | محدودیت مهم |
| --- | --- | --- |
| <span dir="ltr">localStorage</span> | ترجیح <span dir="ltr">theme</span> | <span dir="ltr">synchronous</span> و قابل خواندن با <span dir="ltr">JavaScript</span> |
| <span dir="ltr">sessionStorage</span> | داده موقت همان <span dir="ltr">session</span> تب | با <span dir="ltr">localStorage</span> یکسان نیست |
| <span dir="ltr">Cookie</span> | <span dir="ltr">session</span> و قراردادهای <span dir="ltr">HTTP</span> | قواعد ارسال و امنیت دارد |
| <span dir="ltr">IndexedDB</span> | داده ساختاریافته و آفلاین | <span dir="ltr">API</span> و طراحی پیچیده‌تر |
| <span dir="ltr">Cache Storage</span> | نگه داشتن <span dir="ltr">Request/Response</span> | با <span dir="ltr">HTTP cache</span> متفاوت است |

ظرفیت، <span dir="ltr">eviction</span> و حالت <span dir="ltr">private</span> با محیط فرق دارند؛ ذخیره در مرورگر تضمین ماندگاری همیشگی نیست.

## مثال اول: ذخیره <span dir="ltr">object</span>

<div dir="ltr" align="left">

~~~js
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark' }));
const raw = localStorage.getItem('preferences');
let preferences = { theme: 'light' };
try {
  if (raw) preferences = JSON.parse(raw);
} catch {
  localStorage.removeItem('preferences');
}
console.log(preferences.theme); // dark، در صورت موفق بودن ذخیره
~~~

</div>

<span dir="ltr">Storage</span> رشته نگه می‌دارد. خطای <span dir="ltr">parse</span> یا خطای دسترسی/ظرفیت <span dir="ltr">storage</span> در برنامه واقعی باید متناسب با نیاز مدیریت شود. داده ذخیره‌شده را قابل اعتماد فرض نکن.

## مثال دوم: <span dir="ltr">URL</span> قابل اشتراک

<div dir="ltr" align="left">

~~~js
const url = new URL(location.href);
url.searchParams.set('page', '2');
history.replaceState(null, '', url);
~~~

</div>

فیلتر و <span dir="ltr">pagination</span> اگر در <span dir="ltr">URL</span> باشند، <span dir="ltr">refresh</span> و اشتراک لینک آسان‌تر می‌شود. <span dir="ltr">API</span>های <span dir="ltr">Observer</span> هم کارهای متفاوت دارند: <span dir="ltr">IntersectionObserver</span> برای تقاطع با <span dir="ltr">viewport/root</span>، <span dir="ltr">ResizeObserver</span> برای تغییر اندازه، <span dir="ltr">MutationObserver</span> برای تغییر <span dir="ltr">DOM</span> و <span dir="ltr">PerformanceObserver</span> برای <span dir="ltr">entry</span>های عملکرد است.

## پاسخ مصاحبه و تمرین

آیا <span dir="ltr">localStorage</span> جای مناسبی برای <span dir="ltr">secret</span> خصوصی برنامه است؟

<details>
<summary>پاسخ</summary>

خیر. داده و کد در دسترس <span dir="ltr">JavaScript</span> و کاربر است. برای <span dir="ltr">token</span> هم باید مدل تهدید و معماری احراز هویت را جدا بررسی کرد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Storage & Browser APIs

## Storage choices

### `localStorage`

- string key/value
- synchronous
- persistent until cleared
- accessible to same-origin JavaScript

### `sessionStorage`

Similar but scoped to the tab/session lifetime.

### Cookies

Small values that can be automatically attached to requests and support `HttpOnly`, `Secure`, and `SameSite` attributes.

### IndexedDB

Asynchronous structured browser database, useful for larger/offline local datasets.

### Cache Storage

Stores Request/Response pairs, commonly used with Service Workers. It is not the same as browser HTTP cache or TanStack Query cache.

## Useful browser APIs

### `requestAnimationFrame`

Schedules frame-aligned visual work.

### `IntersectionObserver`

Observe element visibility/intersection. Useful for lazy loading and infinite-scroll sentinels.

### `ResizeObserver`

Observe element size changes.

### `MutationObserver`

Observe DOM mutations. Useful for integrations/tooling, not as a replacement for React state.

### `PerformanceObserver`

Observe performance entries for telemetry/measurement.

### History and URL

Client routers build on browser navigation/history mechanisms.

```js
const url = new URL(location.href);
url.searchParams.set('page', '2');
```

## Interview questions

1. localStorage vs cookies vs IndexedDB?
2. Cache Storage vs HTTP cache?
3. IntersectionObserver vs scroll listener?
4. What does a client router rely on in the browser?

</div>

</details>

</div>
