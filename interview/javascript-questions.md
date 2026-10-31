<div dir="rtl" align="right">

# تمرین مصاحبه <span dir="ltr">JavaScript</span> — سؤال همراه با پاسخ و مثال

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [درس‌های <span dir="ltr">JavaScript</span>](../README.md#javascript). ابتدا سؤال را با صدای بلند جواب بده، بعد پاسخ را بخوان. این جواب‌ها نقطه شروع‌اند؛ دلیل و مثال را هم توضیح بده.

## اجرای تابع و محدوده

1. **<span dir="ltr">Execution Context</span> و <span dir="ltr">Call Stack</span> چیست؟** <span dir="ltr">Context</span> اطلاعات هر اجرای تابع است؛ <span dir="ltr">Stack</span> ترتیب فراخوانی‌ها و محل برگشت را نگه می‌دارد. اگر <span dir="ltr">a</span>، تابع <span dir="ltr">b</span> را صدا بزند، <span dir="ltr">b</span> معمولاً پیش از بازگشت <span dir="ltr">a</span> تمام می‌شود.
2. **<span dir="ltr">Lexical Scope</span> و <span dir="ltr">Scope Chain</span> چیست؟** دسترسی متغیر از محل تعریف تابع تعیین می‌شود. جست‌وجو از محیط فعلی به محیط‌های بیرونی می‌رود؛ محل صدا زدن تابع، این زنجیره را عوض نمی‌کند.
3. **<span dir="ltr">Hoisting</span> چیست؟** نام آموزشی رفتار آماده شدن <span dir="ltr">binding</span>ها پیش از اجرای معمول خط‌هاست؛ <span dir="ltr">source</span> واقعاً جابه‌جا نمی‌شود. مقداردهی بعدی را هم نباید با اعلان یکی گرفت.
4. **<span dir="ltr">var</span>، <span dir="ltr">let</span> و <span dir="ltr">const</span> قبل از اعلان چه رفتاری دارند؟** <span dir="ltr">var</span> از قبل <span dir="ltr">undefined</span> می‌گیرد؛ <span dir="ltr">let</span> و <span dir="ltr">const</span> پیش از <span dir="ltr">initialization</span> قابل دسترسی نیستند و <span dir="ltr">ReferenceError</span> می‌دهند.
5. **<span dir="ltr">TDZ</span> چیست؟** بازه‌ای که <span dir="ltr">binding</span> وجود دارد ولی هنوز <span dir="ltr">initialize</span> نشده است؛ دسترسی در این بازه خطاست، حتی اگر در محیط بیرونی متغیر هم‌نام باشد.
6. **<span dir="ltr">Closure</span> چیست و کجا استفاده می‌شود؟** تابع همراه با دسترسی به محیط <span dir="ltr">lexical</span> محل ساختش. <span dir="ltr">factory</span>، <span dir="ltr">callback</span> و <span dir="ltr">state</span> خصوصی از کاربردها هستند.
7. **<span dir="ltr">Stale Closure</span> چیست؟** <span dir="ltr">callback</span> هنوز به محیط قدیمی مرتبط است، در حالی که برنامه انتظار داده جدید دارد. در <span dir="ltr">React</span> هر <span dir="ltr">render</span> محیط تازه‌ای دارد؛ <span dir="ltr">dependency</span> ناقص می‌تواند <span dir="ltr">callback</span> را روی <span dir="ltr">render</span> قدیمی نگه دارد.

## تابع و شیء

8. **<span dir="ltr">this</span> چگونه تعیین می‌شود؟** در تابع معمولی عمدتاً به شکل فراخوانی بستگی دارد؛ فراخوانی متدی، مستقل، <span dir="ltr">call/bind</span> و <span dir="ltr">new</span> رفتارهای متفاوتی دارند. در <span dir="ltr">strict mode</span>، <span dir="ltr">this</span> فراخوانی مستقل <span dir="ltr">undefined</span> است.
9. **<span dir="ltr">Arrow</span> با <span dir="ltr">function</span> چه فرقی دارد؟** <span dir="ltr">arrow</span>، <span dir="ltr">this</span> و <span dir="ltr">arguments</span> مستقل ندارد و <span dir="ltr">constructor</span> نیست؛ <span dir="ltr">this</span> را از بیرون می‌گیرد. <span dir="ltr">syntax</span> کوتاه تنها تفاوتش نیست.
10. **<span dir="ltr">call</span>، <span dir="ltr">apply</span> و <span dir="ltr">bind</span>؟** دو مورد اول فوراً اجرا می‌کنند؛ <span dir="ltr">call</span> آرگومان‌های جدا و <span dir="ltr">apply</span> آرایه‌مانند می‌گیرد. <span dir="ltr">bind</span> تابع تازه با <span dir="ltr">this</span> تثبیت‌شده می‌سازد.
11. **<span dir="ltr">Prototype Chain</span> چیست؟** وقتی <span dir="ltr">property</span> روی خود شیء پیدا نشود، جست‌وجو در <span dir="ltr">prototype</span> ادامه دارد. محتوای والد در هر دسترسی کپی نمی‌شود.
12. **<span dir="ltr">new</span> چه می‌کند؟** شیء تازه با ارتباط <span dir="ltr">prototype</span> مناسب می‌سازد، <span dir="ltr">constructor</span> را با <span dir="ltr">this</span> آن اجرا می‌کند و معمولاً همان شیء را نتیجه می‌دهد؛ <span dir="ltr">object</span> برگشتی صریح <span dir="ltr">constructor</span> استثناست.
13. **<span dir="ltr">Primitive</span> و <span dir="ltr">object</span> در کپی چه فرقی دارند؟** مقدار <span dir="ltr">primitive</span> مستقل کپی می‌شود؛ در <span dir="ltr">object</span>، مقدار ارجاع کپی می‌شود و دو متغیر می‌توانند به یک شیء برسند. آرگومان‌ها در هر دو حالت <span dir="ltr">by value</span> منتقل می‌شوند.
14. **<span dir="ltr">Shallow</span> و <span dir="ltr">Deep Copy</span>؟** <span dir="ltr">shallow</span> فقط لایه بیرونی تازه می‌سازد؛ <span dir="ltr">object</span>های داخلی ممکن است مشترک بمانند. <span dir="ltr">deep copy</span> باید ساختارهای پشتیبانی‌شده و محدودیت‌های ابزار مثل <span dir="ltr">structuredClone</span> را در نظر بگیرد.
15. **==، === و <span dir="ltr">Object.is</span>؟** == می‌تواند <span dir="ltr">coercion</span> کند؛ === بدون آن مقایسه می‌کند. <span dir="ltr">Object.is</span> برای <span dir="ltr">NaN</span> و <span dir="ltr">signed zero</span> تفاوت دارد؛ برابر بودن محتوای دو <span dir="ltr">object</span> را خودکار بررسی نمی‌کند.

## اجرای غیرهم‌زمان

16. **<span dir="ltr">Event Loop</span> چیست؟** سازوکار هماهنگ کردن نوبت اجرای کارهای صف‌شده و فرصت‌های دیگر مرورگر است؛ <span dir="ltr">callback</span> نمی‌تواند وسط اجرای <span dir="ltr">synchronous</span> فعلی دلخواه وارد شود.
17. **<span dir="ltr">Task</span> و <span dir="ltr">Microtask</span>؟** <span dir="ltr">timer</span> و بعضی رویدادها <span dir="ltr">task</span> می‌سازند؛ واکنش <span dir="ltr">Promise</span> و <span dir="ltr">queueMicrotask</span> از <span dir="ltr">microtask</span> استفاده می‌کنند. در <span dir="ltr">checkpoint</span>، <span dir="ltr">microtask</span>ها تا خالی شدن پردازش می‌شوند.
18. **چرا <span dir="ltr">then</span> معمولاً پیش از <span dir="ltr">timer</span> صفر دیده می‌شود؟** اگر <span dir="ltr">Promise</span> آماده باشد، <span dir="ltr">callback</span> آن در <span dir="ltr">microtask</span> قرار می‌گیرد و پیش از <span dir="ltr">task</span> تایمر فرصت اجرا دارد. <span dir="ltr">Promise</span> شبکه کند الزاماً زودتر آماده نیست.
19. **<span dir="ltr">await</span> چه می‌کند؟** ادامه همان تابع <span dir="ltr">async</span> را معلق می‌کند تا از مسیر <span dir="ltr">Promise</span> ادامه پیدا کند؛ بقیه برنامه و <span dir="ltr">thread</span> را برای انتظار شبکه متوقف نمی‌کند.
20. **<span dir="ltr">all</span> و <span dir="ltr">allSettled</span>؟** <span dir="ltr">all</span> با اولین <span dir="ltr">rejection</span> رد می‌شود و برای موفقیت همه را می‌خواهد؛ <span dir="ltr">allSettled</span> منتظر نتیجه همه می‌ماند. هیچ‌کدام کارهای دیگر را خودکار <span dir="ltr">cancel</span> نمی‌کنند.
21. **کار ترتیبی و هم‌پوشان را چگونه انتخاب کنیم؟** اگر ورودی کار دوم به خروجی اول وابسته است، ترتیب لازم است. برای کارهای مستقل می‌توان اول همه را شروع کرد و سپس منتظر نتیجه‌ها ماند.
22. **<span dir="ltr">fetch</span> را چطور لغو کنیم؟** <span dir="ltr">AbortController</span> بساز، <span dir="ltr">signal</span> را به <span dir="ltr">fetch</span> بده و در پایان نیاز <span dir="ltr">abort</span> کن. این تضمین <span dir="ltr">rollback</span> کار سرور نیست.
23. **آیا <span dir="ltr">HTTP 500</span> باعث <span dir="ltr">rejection</span> خودکار <span dir="ltr">fetch</span> است؟** خیر؛ <span dir="ltr">response.ok/status</span> را بررسی و طبق قرارداد <span dir="ltr">throw</span> کن.

## حافظه و پاسخ‌گویی

24. **<span dir="ltr">Memory Leak</span> چیست؟** رشد یا نگهداری ناخواسته داده‌ای که دیگر لازم نیست ولی همچنان از ریشه‌های زنده قابل دسترسی است.
25. **چرا <span dir="ltr">listener</span> می‌تواند حافظه نگه دارد؟** <span dir="ltr">callback</span> ثبت‌شده ممکن است به <span dir="ltr">DOM</span> یا داده بزرگ دسترسی داشته باشد و تا حذف <span dir="ltr">subscription</span> زنده بماند. هر <span dir="ltr">listener</span> الزاماً <span dir="ltr">leak</span> نیست.
26. **<span dir="ltr">WeakMap</span> به چه درد می‌خورد؟** <span dir="ltr">metadata</span> مرتبط با <span dir="ltr">key</span> شیئی را بدون نگه داشتن قوی آن <span dir="ltr">key</span> ذخیره می‌کند؛ زمان <span dir="ltr">GC</span> تضمین‌شده و قابل مشاهده مستقیم نیست.
27. **<span dir="ltr">Long Task</span> چرا <span dir="ltr">UI</span> را کند می‌کند؟** <span dir="ltr">main thread</span> را مشغول نگه می‌دارد و اجرای <span dir="ltr">input handler</span> و کارهای نمایش را عقب می‌اندازد. <span dir="ltr">async</span> نام‌گذاری کردن تابع، محاسبه سنگین را <span dir="ltr">worker</span> نمی‌کند.

## دو نمونه سؤال خروجی

<div dir="ltr" align="left">

~~~js
const original = { info: { score: 1 } };
const copy = { ...original };
copy.info.score = 2;
console.log(original.info.score); // 2
~~~

</div>

دلیل: <span dir="ltr">info</span> هنوز همان <span dir="ltr">object</span> است. برای توضیح بیشتر [کپی و هویت](../01-javascript/fundamentals.md) را مرور کن.

<div dir="ltr" align="left">

~~~js
console.log('start');
Promise.resolve().then(() => console.log('promise'));
setTimeout(() => console.log('timer'), 0);
console.log('end');
~~~

</div>

ترتیب <span dir="ltr">start</span>، <span dir="ltr">end</span>، <span dir="ltr">promise</span>، <span dir="ltr">timer</span> است. برای پاسخ خوب، جای ثبت <span dir="ltr">callback</span> و زمان اجرای آن را جدا کن.

## تمرین با پاسخ

یک <span dir="ltr">counter</span> با <span dir="ltr">closure</span> بساز و توضیح بده چرا دو <span dir="ltr">counter</span> مستقل مقدار مشترک ندارند.

<details>
<summary>پاسخ</summary>

<span dir="ltr">`function makeCounter() { let n = 0; return () => ++n; }`</span>. هر فراخوانی <span dir="ltr">makeCounter</span> محیط تازه‌ای با <span dir="ltr">n</span> جدا می‌سازد؛ تابع برگشتی به همان محیط دسترسی دارد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# JavaScript Interview Questions

Use these as explanation prompts, not one-line flashcards.

1. Explain execution context and call stack.
2. Explain lexical scope and scope chain.
3. What is hoisting?
4. `var` vs `let` vs `const` before declaration?
5. What is TDZ?
6. Define closure and give a real use.
7. What is a stale closure?
8. How is `this` determined?
9. Arrow vs normal function?
10. `call` vs `apply` vs `bind`?
11. Explain prototypes and prototype chain.
12. What does `new` do?
13. Primitive vs object behavior?
14. Shallow vs deep copy?
15. `==` vs `===` vs `Object.is`?
16. Explain the event loop.
17. Task vs microtask?
18. Why do Promise callbacks usually run before timers?
19. What does `await` do?
20. `Promise.all` vs `allSettled`?
21. Sequential vs parallel async work?
22. How do you cancel fetch?
23. Does fetch reject on HTTP 500?
24. What is a memory leak?
25. Why can listeners leak memory?
26. What is WeakMap useful for?
27. Why do long tasks hurt UI responsiveness?

</div>

</details>

</div>
