<div dir="rtl" align="right">

# نقشه مطالعه برای فهمیدن و آمادگی مصاحبه

[فهرست کامل](./README.md) · [واژه‌نامه](./GLOSSARY.md)

لازم نیست تمام مخزن را پشت‌سرهم بخوانی. معیار عبور از یک موضوع این است که بتوانی رفتارش را توضیح بدهی، خروجی مثال را پیش‌بینی کنی و تغییر کوچکی در آن بدهی.

## هر درس را چطور بخوانیم؟

<ol dir="rtl" align="right">
<li dir="rtl">مسئله را بخوان؛ بگو چرا این مفهوم لازم است.</li>
<li dir="rtl">پیش از اجرا، خروجی مثال و دلیل حدست را بنویس.</li>
<li dir="rtl">اجرا کن؛ اگر فرق داشت، مسیر را خط‌به‌خط دنبال کن.</li>
<li dir="rtl">ورودی، ترتیب خط‌ها یا شرطی را عوض کن و دوباره حدس بزن.</li>
<li dir="rtl">پاسخ مصاحبه را با صدای بلند و با مثال خودت بگو.</li>
<li dir="rtl">تمرین را حل کن؛ سپس پاسخ جمع‌شده را باز کن.</li>
</ol>

برای شروع یک درس در هر نوبت و حدود ۳۰ تا ۴۵ دقیقه مناسب است؛ درس سخت ممکن است چند نوبت بخواهد. روز بعد چند دقیقه مثال قبلی را بدون نگاه کردن بازسازی کن. جلو رفتن فقط بر اساس تعداد صفحه معیار خوبی نیست.

## مرحله ۱: <span dir="ltr">JavaScript</span>

به این ترتیب بخوان:

<ol dir="rtl" align="right">
<li dir="rtl"><a href="./01-javascript/fundamentals.md">مقدار، نوع و کپی</a></li>
<li dir="rtl"><a href="./01-javascript/scope-closure-hoisting.md"><span dir="ltr">Scope</span>، <span dir="ltr">Hoisting</span> و <span dir="ltr">Closure</span></a></li>
<li dir="rtl"><a href="./01-javascript/execution-context.md"><span dir="ltr">Execution Context</span></a></li>
<li dir="rtl"><a href="./01-javascript/this-and-functions.md"><span dir="ltr">this</span> و تابع‌ها</a></li>
<li dir="rtl"><a href="./01-javascript/prototype-and-classes.md"><span dir="ltr">Prototype</span></a></li>
<li dir="rtl"><a href="./01-javascript/event-loop.md"><span dir="ltr">Event Loop</span></a></li>
<li dir="rtl"><a href="./01-javascript/async-javascript.md"><span dir="ltr">Async</span></a></li>
<li dir="rtl"><a href="./01-javascript/memory-and-garbage-collection.md">حافظه</a></li>
</ol>

**معیار عبور:** <span dir="ltr">shallow copy</span> را نشان بده، <span dir="ltr">counter</span> با <span dir="ltr">closure</span> بساز و ترتیب <span dir="ltr">Promise</span> و <span dir="ltr">timer</span> را با دلیل توضیح بده. اگر تابع، <span dir="ltr">return</span>، حلقه یا آرایه هنوز سخت‌اند، قبل از <span dir="ltr">React</span> همان‌ها را با مثال‌های کوچک تمرین کن.

## مرحله ۲: <span dir="ltr">HTML</span>، <span dir="ltr">CSS</span> و <span dir="ltr">Browser</span>

[<span dir="ltr">HTML</span>](./07-html-css/html.md) ← [<span dir="ltr">CSS</span> پایه](./07-html-css/css-core.md) ← [<span dir="ltr">Flex/Grid</span>](./07-html-css/flexbox-and-grid.md) ← [<span dir="ltr">Responsive</span> و لایه‌ها](./07-html-css/responsive-and-stacking.md).

سپس [ساختار مرورگر](./05-browser/browser-architecture.md)، [<span dir="ltr">DOM</span> و <span dir="ltr">Event</span>](./05-browser/dom-and-events.md)، [<span dir="ltr">Rendering Pipeline</span>](./05-browser/rendering-pipeline.md) و [<span dir="ltr">Storage</span>](./05-browser/storage-and-browser-apis.md).

**تمرین و معیار عبور:** یک فرم با <span dir="ltr">label</span> و <span dir="ltr">button</span> درست بساز، با صفحه‌کلید استفاده کن و <span dir="ltr">target</span> کلیک را بررسی کن. فرق <span dir="ltr">DOM</span>، <span dir="ltr">layout</span>، <span dir="ltr">paint</span>، <span dir="ltr">capture</span> و <span dir="ltr">bubble</span> را توضیح بده.

## مرحله ۳: <span dir="ltr">React</span>

[<span dir="ltr">Rendering</span>](./03-react/rendering.md) ← [<span dir="ltr">State</span>](./03-react/state.md) ← [مالکیت <span dir="ltr">state</span>](./03-react/lifting-state-and-state-design.md) ← [<span dir="ltr">Key</span>](./03-react/reconciliation-and-keys.md) ← [<span dir="ltr">Effect</span>](./03-react/effects.md) ← [<span dir="ltr">Ref</span>](./03-react/refs.md) ← [<span dir="ltr">Hook</span>ها](./03-react/hooks.md) ← [<span dir="ltr">Custom Hook</span>](./03-react/custom-hooks.md) ← [<span dir="ltr">Context</span>](./03-react/context-and-state-management.md).

**تمرین:** لیست کار با افزودن، حذف و ویرایش بساز. شناسه پایدار بده و تعداد باقی‌مانده را محاسبه کن، نه اینکه <span dir="ltr">state</span> تکراری بسازی.

**معیار عبور:** توضیح بده چرا <span dir="ltr">setter</span> مقدار <span dir="ltr">render</span> فعلی را عوض نمی‌کند، <span dir="ltr">ref</span> کجا مناسب است و <span dir="ltr">cleanup</span> چه چیزی را تمام می‌کند.

[<span dir="ltr">Suspense</span>](./03-react/suspense-and-concurrent-react.md) و [<span dir="ltr">API</span>های جدید](./03-react/react-compiler-and-modern-apis.md) را بعد از این پایه‌ها بخوان.

## مرحله ۴: <span dir="ltr">TypeScript</span>

[مبانی](./02-typescript/fundamentals.md) ← [<span dir="ltr">Narrowing</span>](./02-typescript/narrowing-and-type-guards.md) ← [<span dir="ltr">Record</span>](./02-typescript/index-signatures-and-record.md) ← [<span dir="ltr">Generics</span>](./02-typescript/generics-and-advanced-types.md).

**تمرین و معیار عبور:** مدل کار و <span dir="ltr">loading/success/error</span> را <span dir="ltr">type</span> کن. <span dir="ltr">unknown</span> را بدون <span dir="ltr">any</span> بررسی کن و تفاوت ادعای نوع با اعتبارسنجی واقعی <span dir="ltr">API</span> را توضیح بده.

## مرحله ۵: شبکه و داده

اول [<span dir="ltr">HTTP</span>](./06-network/http.md)، [<span dir="ltr">Cache</span>](./06-network/http-caching.md)، [<span dir="ltr">CORS</span>](./06-network/cors.md) و [<span dir="ltr">Cookie</span>](./06-network/cookies-and-auth.md). سپس [<span dir="ltr">Fetch</span>](./10-data-fetching/fetch.md)، [<span dir="ltr">Abort</span>](./10-data-fetching/abort-controller.md)، [<span dir="ltr">Race</span>](./10-data-fetching/race-conditions-and-cancellation.md) و [<span dir="ltr">Server State</span>](./10-data-fetching/server-state.md).

مسیر <span dir="ltr">Query</span>: [مبانی](./10-data-fetching/tanstack-query-fundamentals.md) ← [<span dir="ltr">Key</span>](./10-data-fetching/query-keys-and-options.md) ← [<span dir="ltr">Freshness</span>](./10-data-fetching/query-caching-and-defaults.md) ← [<span dir="ltr">Mutation</span>](./10-data-fetching/mutations-and-invalidation.md) ← [<span dir="ltr">Pagination</span>](./10-data-fetching/pagination-and-infinite-queries.md) ← [<span dir="ltr">Optimistic</span>](./10-data-fetching/optimistic-updates.md) ← [<span dir="ltr">Prefetch</span>](./10-data-fetching/prefetching-and-router-integration.md).

**تمرین:** جست‌وجو با <span dir="ltr">loading/error/empty</span> بساز. عمداً پاسخ قدیمی را دیرتر برگردان و از خراب شدن نتیجه جدید جلوگیری کن.

**معیار عبور:** <span dir="ltr">staleTime</span> و <span dir="ltr">gcTime</span> را با خط زمانی توضیح بده و بگو <span dir="ltr">HTTP 500</span> را کجا خطا می‌کنی. بعد [ارتباط زنده](./06-network/realtime-and-network-basics.md) را بخوان.

## مرحله ۶: تست

[مبانی](./11-testing/testing-fundamentals.md) ← [استراتژی](./11-testing/testing-strategy-and-pyramid.md) ← [محیط تمرین](./11-testing/practice-setup.md) ← [<span dir="ltr">Vitest</span>](./11-testing/vitest.md) ← [<span dir="ltr">RTL</span>](./11-testing/react-testing-library.md).

سپس <span dir="ltr">mocking</span>، <span dir="ltr">spy</span>، <span dir="ltr">timer</span> و تست <span dir="ltr">async</span> را بخوان؛ بعد <span dir="ltr">userEvent</span>، <span dir="ltr">MSW</span>، فرم و <span dir="ltr">Query</span>. <span dir="ltr">helper</span>های <span dir="ltr">render</span>، دسترس‌پذیری و <span dir="ltr">E2E</span> مرحله بعدند.

**تمرین و معیار عبور:** یک موفقیت، خطای ورودی، خطای سرور و <span dir="ltr">pending</span> را تست کن. <span dir="ltr">get/query/find</span> را درست انتخاب کن و <span dir="ltr">cache</span> یا <span dir="ltr">timer</span> تست قبلی را باقی نگذار.

## مرحله ۷: الگوریتم

[<span dir="ltr">Big O</span>](./12-algorithms/big-o.md) ← [<span dir="ltr">Map/Set/Array</span>](./12-algorithms/arrays-strings-map-set.md) ← [<span dir="ltr">Stack/Queue/Recursion</span>](./12-algorithms/stack-queue-recursion.md) ← [<span dir="ltr">Search Patterns</span>](./12-algorithms/searching-sorting-patterns.md) ← [<span dir="ltr">Tree/Graph</span>](./12-algorithms/trees-and-graphs.md) ← [تمرین <span dir="ltr">frontend</span>](./12-algorithms/frontend-coding-exercises.md).

**معیار عبور:** <span dir="ltr">Two Sum</span>، <span dir="ltr">Binary Search</span> و پرانتز معتبر را با ورودی مرزی و تحلیل زمان و حافظه توضیح بده.

## مرحله ۸: کیفیت محصول

از [<span dir="ltr">Performance</span>](./04-performance/performance-fundamentals.md) شروع کن و ابزار، <span dir="ltr">React</span>، شبکه و <span dir="ltr">asset</span>ها را بررسی کن. [<span dir="ltr">Accessibility</span>](./08-accessibility/accessibility.md) و [<span dir="ltr">Security</span>](./09-security/frontend-security.md) را هم روی پروژه تمرینی اعمال کن.

**تمرین:** یک کندی مشخص را اندازه بگیر، اصلاح کن و در شرایط مشابه مقایسه کن. فرم را فقط با صفحه‌کلید استفاده کن.

## مرحله ۹: ابزار و معماری

[<span dir="ltr">ESM</span>](./14-build-tools/esm-commonjs.md)، [<span dir="ltr">Build</span>](./14-build-tools/build-process-and-vite.md) و [<span dir="ltr">Tree Shaking</span>](./14-build-tools/bundling-and-tree-shaking.md)؛ سپس [معماری](./13-architecture/frontend-architecture.md)، [روش‌های <span dir="ltr">rendering</span>](./13-architecture/rendering-strategies.md)، [<span dir="ltr">BFF</span>](./13-architecture/bff.md)، [<span dir="ltr">Microfrontends</span>](./13-architecture/microfrontends.md) و [<span dir="ltr">System Design</span>](./13-architecture/frontend-system-design.md).

**معیار عبور:** برای <span dir="ltr">autocomplete</span> نیاز، <span dir="ltr">state</span>، <span dir="ltr">API</span>، <span dir="ltr">cache</span>، خطا، امنیت، دسترس‌پذیری و تست را با سود و هزینه تصمیم‌ها توضیح بده.

## تمرین مصاحبه در تمام مسیر

بعد از هر مرحله از [بانک مصاحبه](./README.md#interview) چند سؤال مرتبط انتخاب کن. پاسخ خوب چهار بخش دارد: تعریف ساده، دلیل، مثال و محدودیت.

اگر فقط با نگاه به متن می‌توانی جواب بدهی، همان بخش را مرور کن. اگر می‌توانی مثال تازه بسازی و تغییرش را پیش‌بینی کنی، آماده‌تر شده‌ای.

</div>
