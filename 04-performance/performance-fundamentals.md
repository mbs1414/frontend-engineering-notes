<div dir="rtl" align="right">

# سرعت را از کجا بهتر کنیم؟ — <span dir="ltr">Performance Fundamentals</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Event Loop</span>](../01-javascript/event-loop.md). <span dir="ltr">Performance</span> یعنی تجربه سریع بارگذاری و پاسخ‌گویی، نه صرفاً کم بودن تعداد <span dir="ltr">render</span>.

## مسئله را دقیق کن

«صفحه کند است» قابل اندازه‌گیری نیست. بگو «روی موبایل، بعد از کلیک فیلتر، نتیجه دیر نمایش داده می‌شود». ابتدا سناریوی تکرارشدنی بساز، سپس با <span dir="ltr">DevTools Performance</span> ثبت بگیر و سهم شبکه، <span dir="ltr">JavaScript</span>، <span dir="ltr">layout</span> و <span dir="ltr">paint</span> را بررسی کن.

<div dir="ltr" align="left">

~~~text
فرض آموزشی:
دریافت داده: 800ms
محاسبه فیلتر: 15ms
نمایش: 10ms
~~~

</div>

اگر محاسبه ۱۵ میلی‌ثانیه‌ای را نصف کنی، انتظار شبکه هنوز باقی است. باید گلوگاه متناسب با مشکل کاربر را هدف بگیری.

## مثال: اندازه‌گیری یک محاسبه

<div dir="ltr" align="left">

~~~js
const items = Array.from({ length: 10000 }, (_, id) => ({ id }));
performance.mark('filter-start');
const result = items.filter(item => item.id % 2 === 0);
performance.mark('filter-end');
performance.measure('filter', 'filter-start', 'filter-end');
console.log(result.length); // 5000
console.log(performance.getEntriesByName('filter')[0].duration);
~~~

</div>

عدد <span dir="ltr">duration</span> روی دستگاه‌های مختلف متفاوت است. یک اجرا برای حکم کلی کافی نیست. برای <span dir="ltr">React</span> از <span dir="ltr">Profiler</span> و برای شبکه از <span dir="ltr">Network waterfall</span> هم کمک بگیر.

داده آزمایشگاهی (**<span dir="ltr">Lab</span>**) برای عیب‌یابی کنترل‌شده خوب است؛ داده کاربران واقعی (**<span dir="ltr">Field/RUM</span>**) تنوع شبکه و دستگاه را نشان می‌دهد. <span dir="ltr">Long Task</span> معمولاً <span dir="ltr">task</span> بیشتر از ۵۰ میلی‌ثانیه است و می‌تواند کارهای <span dir="ltr">main thread</span> را عقب بیندازد.

## پاسخ مصاحبه و تمرین

**اولین قدم <span dir="ltr">optimization</span> چیست؟** تعریف مشکل و اندازه‌گیری، سپس فرضیه، تغییر محدود و مقایسه دوباره در شرایط مشابه.

اگر عکس اصلی دیر می‌رسد ولی <span dir="ltr">component</span>ها سریع <span dir="ltr">render</span> می‌شوند، ابتدا کدام را بررسی می‌کنی؟

<details>
<summary>پاسخ</summary>

شروع درخواست تصویر، اندازه فایل، اولویت و پاسخ سرور. <span dir="ltr">memo</span> کردن <span dir="ltr">component</span> به‌تنهایی زمان دانلود عکس را حل نمی‌کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Performance Fundamentals

## Measure first

```text
Measure
 ↓
Find bottleneck
 ↓
Understand cause
 ↓
Optimize
 ↓
Measure again
```

Starting with `useMemo` is not a performance strategy.

## Performance layers

```text
Network
  ↓
HTML/CSS/JS download
  ↓
parse/compile JavaScript
  ↓
execute JavaScript
  ↓
application/React work
  ↓
style calculation
  ↓
layout
  ↓
paint
  ↓
composite
```

React is one layer, not the entire universe.

## Questions that matter

- How fast does meaningful content appear?
- How responsive are interactions?
- Does layout jump?
- Is navigation fast?
- Is scrolling smooth?

## Tools

- Chrome DevTools Performance
- Network panel
- Lighthouse
- React DevTools Profiler
- Web Vitals / RUM
- bundle analyzer
- coverage tools

## Long tasks

Long main-thread tasks can block input, rendering, timers, and other JavaScript work.

Solutions may include reducing work, splitting work, scheduling lower-priority work, moving suitable CPU-heavy tasks to Web Workers, or avoiding unnecessary computation.

## Lab vs real-user data

Lab tests are controlled and repeatable. Real User Monitoring shows what actual devices/networks experience. Use both.

## Interview questions

1. What is your performance-debugging workflow?
2. What is a long task?
3. Why isn't React memoization enough?
4. Lab vs field/RUM data?

</div>

</details>

</div>
