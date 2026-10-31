<div dir="rtl" align="right">

# چرا حافظه آزاد نمی‌شود؟ — <span dir="ltr">Memory</span> و <span dir="ltr">Garbage Collection</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [ارجاع به شیء](./fundamentals.md) و [<span dir="ltr">Closure</span>](./scope-closure-hoisting.md).

## مسئله را از یک <span dir="ltr">modal</span> تصور کن

هر بار <span dir="ltr">modal</span> باز می‌شود یک <span dir="ltr">listener</span> ثبت می‌کنی. <span dir="ltr">modal</span> بسته می‌شود ولی <span dir="ltr">listener</span> حذف نمی‌شود. بعد از چند بار باز و بسته شدن، چند <span dir="ltr">listener</span> و داده‌های مرتبطشان در حافظه می‌مانند.

<span dir="ltr">Garbage Collector</span> معمولاً اشیائی را که دیگر از ریشه‌های زنده قابل دسترسی نیستند جمع‌آوری می‌کند. «دیگر روی صفحه نیست» لزوماً به معنی «غیرقابل دسترسی است» نیست.

## مثال اول: از دست رفتن آخرین ارجاع

<div dir="ltr" align="left">

~~~js
let user = { name: 'Sara' };
let selected = user;
user = null;
console.log(selected.name); // Sara
selected = null;
~~~

</div>

بعد از <span dir="ltr">null</span> کردن <span dir="ltr">user</span>، <span dir="ltr">selected</span> هنوز شیء را نگه داشته است. بعد از <span dir="ltr">null</span> کردن <span dir="ltr">selected</span>، اگر ارجاع دیگری نباشد، شیء می‌تواند جمع‌آوری شود. زمان دقیق جمع‌آوری تضمین‌شده نیست.

## مثال دوم: <span dir="ltr">cleanup</span> برای <span dir="ltr">listener</span>

<div dir="ltr" align="left">

~~~js
function watchResize() {
  const onResize = () => console.log(window.innerWidth);
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}
const stop = watchResize();
stop();
~~~

</div>

باید همان تابع ثبت‌شده را حذف کنی. نوشتن یک <span dir="ltr">arrow</span> تازه در <span dir="ltr">removeEventListener</span> تابع قبلی را حذف نمی‌کند. گزینه <span dir="ltr">capture</span> هم باید با ثبت اولیه سازگار باشد.

<span dir="ltr">Closure</span> ذاتاً <span dir="ltr">leak</span> نیست؛ وقتی داده‌ای را بیشتر از مدت لازم زنده نگه دارد، می‌تواند در رشد ناخواسته حافظه نقش داشته باشد. <span dir="ltr">cache</span> بدون سقف و <span dir="ltr">timer</span>های فراموش‌شده هم نمونه‌های دیگرند.

## <span dir="ltr">WeakMap</span> چه کمکی می‌کند؟

<div dir="ltr" align="left">

~~~js
const metadata = new WeakMap();
let element = document.createElement('button');
metadata.set(element, { clicked: false });
element = null;
~~~

</div>

<span dir="ltr">WeakMap</span> صرفاً به خاطر <span dir="ltr">key</span> خود، شیء <span dir="ltr">key</span> را زنده نگه نمی‌دارد. اگر هیچ ارجاع قوی دیگری به <span dir="ltr">element</span> نباشد، امکان جمع‌آوری وجود دارد. زمان آن قابل پیش‌بینی نیست؛ <span dir="ltr">WeakMap</span> را هم نمی‌توان مثل <span dir="ltr">Map</span> پیمایش کرد یا <span dir="ltr">size</span> آن را خواند.

## چگونه مشکل را پیدا کنیم؟

یک رفتار را چند بار تکرار کن: باز کردن صفحه، باز و بسته کردن <span dir="ltr">modal</span>، رفتن به صفحه دیگر. در <span dir="ltr">Memory</span> ابزارهای <span dir="ltr">DevTools snapshot</span> بگیر و ببین چه <span dir="ltr">object</span>هایی همچنان نگه داشته شده‌اند و **<span dir="ltr">Retaining Path</span>** آن‌ها چیست. صرف زیاد شدن موقت حافظه اثبات <span dir="ltr">leak</span> نیست؛ مصرف باید در طول استفاده بررسی شود.

## پاسخ مصاحبه و تمرین

**چرخه ارجاع همیشه <span dir="ltr">leak</span> می‌سازد؟** در <span dir="ltr">GC</span>های مدرن مبتنی بر <span dir="ltr">reachability</span>، دو شیء که فقط به هم اشاره می‌کنند و از ریشه‌ای قابل دسترسی نیستند قابل جمع‌آوری‌اند.

چرا حذف یک <span dir="ltr">DOM node</span> از صفحه ممکن است برای آزاد شدنش کافی نباشد؟

<details>
<summary>پاسخ</summary>

چون ممکن است آرایه، <span dir="ltr">cache</span> یا <span dir="ltr">callback</span> زنده هنوز به آن ارجاع داشته باشد. باید مسیر نگه داشتن شیء را پیدا کرد؛ نه اینکه فقط دستور حذف <span dir="ltr">DOM</span> را تکرار کرد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Memory & Garbage Collection

## Reachability

JavaScript engines reclaim memory for objects that are no longer reachable from live roots.

Garbage collection does not mean memory leaks are impossible. You can accidentally keep objects reachable forever.

## Common frontend leaks

- listeners never removed
- intervals/timeouts never cleared
- subscriptions never unsubscribed
- WebSockets left open
- closures retaining large objects
- unbounded global caches
- detached DOM nodes still referenced

## Example

```js
function mount() {
  const largeData = new Array(100000).fill('x');
  window.addEventListener('resize', () => {
    console.log(largeData.length);
  });
}
```

Repeated mounts without cleanup can retain old closures and old `largeData` values.

## WeakMap / WeakSet

Weak collections do not strongly keep object keys alive.

```js
const metadata = new WeakMap();
metadata.set(element, { measured: true });
```

## React cleanup

```tsx
useEffect(() => {
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, []);
```

## Interview questions

1. What causes a JS memory leak?
2. Why can listeners leak memory?
3. Why can a garbage-collected language still leak?
4. When is WeakMap useful?

</div>

</details>

</div>
