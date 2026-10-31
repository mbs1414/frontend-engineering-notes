<div dir="rtl" align="right">

# یادگیری فرانت‌اند برای آمادگی مصاحبه

این مجموعه را مثل یک دوره مرحله‌به‌مرحله بخوان. هدف این است که بفهمی کد چرا این رفتار را دارد و بتوانی آن را در مصاحبه با مثال توضیح بدهی.

متن اصلی مطالعه در هر ۹۲ درس قبلی، اکنون یک توضیح آموزشی فارسی دارد: مسئله، توضیح مفهوم، مثال، نکته مصاحبه و تمرین با پاسخ. اصطلاح انگلیسی کنار مفهوم می‌ماند تا در مستندات، کد و مصاحبه هم آن را بشناسی.

<ul dir="rtl" align="right">
<li dir="rtl"><strong>از اینجا شروع کن:</strong> <a href="./01-javascript/fundamentals.md">مقدار، نوع و کپی در <span dir="ltr">JavaScript</span></a></li>
<li dir="rtl"><strong>ترتیب خواندن و معیار پیشرفت:</strong> <a href="./ROADMAP.md">نقشه مطالعه</a></li>
<li dir="rtl"><strong>وقتی معنی اصطلاحی یادت نیست:</strong> <a href="./GLOSSARY.md">واژه‌نامه</a></li>
<li dir="rtl"><strong>برای اجرای تست‌های <span dir="ltr">React</span>:</strong> <a href="./11-testing/practice-setup.md">محیط تمرین تست</a></li>
</ul>

## چطور از درس‌ها استفاده کنم؟

اول متن فارسی را بخوان و پیش از اجرای هر مثال خروجی را حدس بزن. بعد کد را تغییر بده و سعی کن نتیجه تازه را توضیح بدهی. تمرین آخر هر درس پاسخ جمع‌شده دارد؛ بعد از تلاش خودت آن را باز کن.

متن انگلیسی قبلی به‌صورت آرشیو اختیاری در انتهای هر درس حفظ شده است؛ آن بخش ترجمه خط‌به‌خط نشده و ممکن است مثال‌های ناقص آموزشی یا <span dir="ltr">API</span>های نسخه‌های قبلی داشته باشد. برای شروع، توضیح فارسی جدید را مبنا قرار بده.

## مثال‌ها را کجا اجرا کنم؟

| نوع مثال | محیط |
| --- | --- |
| <span dir="ltr">JavaScript</span> ساده | <span dir="ltr">Console</span> مرورگر یا <span dir="ltr">Node.js</span>؛ مثال‌های <span dir="ltr">window</span> و <span dir="ltr">document</span> در مرورگر |
| <span dir="ltr">TypeScript</span> | <span dir="ltr">TypeScript Playground</span> یا پروژه با <span dir="ltr">type checker</span> |
| <span dir="ltr">React</span> و <span dir="ltr">JSX</span> | پروژه <span dir="ltr">React</span>، مثلاً پروژه تمرینی <span dir="ltr">Vite</span> |
| تست <span dir="ltr">component</span> | محیط تنظیم‌شده طبق راهنمای تست |
| <span dir="ltr">HTTP</span> و پاسخ <span dir="ltr">JSON</span> | نمایش قرارداد؛ <span dir="ltr">endpoint</span>های /<span dir="ltr">api</span> باید در پروژه واقعی وجود داشته باشند |
| قطعه با عنوان «الگو» | بخشی از برنامه؛ نام‌ها و وابستگی‌های فرضی را باید فراهم کنی |

این مخزن خودِ برنامه اجرایی یا <span dir="ltr">API</span> سرور نیست. مثال‌های ساده را جدا اجرا کن تا اعلان مجدد <span dir="ltr">const/let</span> در <span dir="ltr">Console</span> با مثال قبلی تداخل نکند. مثال خطادار عمدی هم جدا از بقیه اجرا می‌شود.

## نمایش فارسی و کد در <span dir="ltr">GitHub</span> و <span dir="ltr">VS Code</span>

فایل‌ها جهت فارسی و کد را جدا مشخص می‌کنند: متن آموزشی راست‌به‌چپ و کدها و مرجع انگلیسی چپ‌به‌راست هستند. عبارت‌های انگلیسی داخل جمله هم جهت مستقل دارند.

در <span dir="ltr">VS Code</span> پوشه کامل پروژه را باز کن و برای خواندن فایل از پیش‌نمایش <span dir="ltr">Markdown</span> با کلیدهای <span dir="ltr">Ctrl+Shift+V</span> استفاده کن. تنظیم محلی پروژه، فایل <span dir="ltr">CSS</span> همراه را به پیش‌نمایش داخلی اضافه می‌کند. متن خام <span dir="ltr">Markdown</span> همچنان کد و نشانه‌های قالب‌بندی را نشان می‌دهد.

<span dir="ltr">GitHub</span> جهت‌ها را از داخل خود فایل می‌خواند و به <span dir="ltr">CSS</span> مخصوص <span dir="ltr">VS Code</span> وابسته نیست. تغییرهای محلی بعد از <span dir="ltr">commit</span> و <span dir="ltr">push</span> در نسخه <span dir="ltr">GitHub</span> هم دیده می‌شوند.

برای حفظ همین قالب در درس‌های تازه یا ویرایش‌شده، از ریشه مخزن اجرا کن:

<div dir="ltr" align="left">

~~~sh
node scripts/format-notes.mjs
node scripts/check-notes.mjs
~~~

</div>

## ترتیب پیشنهادی مطالعه

<span dir="ltr">JavaScript</span> ← <span dir="ltr">HTML/CSS</span> و <span dir="ltr">Browser</span> ← <span dir="ltr">React</span> ← <span dir="ltr">TypeScript</span> ← <span dir="ltr">Network</span> و <span dir="ltr">Data Fetching</span> ← <span dir="ltr">Testing</span> ← <span dir="ltr">Algorithms</span> ← <span dir="ltr">Performance</span>، <span dir="ltr">Accessibility</span> و <span dir="ltr">Security</span> ← <span dir="ltr">Build</span> و <span dir="ltr">Architecture</span>.

شماره پوشه‌ها فقط برای دسته‌بندی حفظ شده‌اند؛ مسیر آموزشی دقیق در [<span dir="ltr">ROADMAP</span>](./ROADMAP.md) آمده است. لازم نیست پیش از اولین مصاحبه همه مباحث پیشرفته را تمام کنی؛ اول پایه‌ها را با مثال مسلط شو.

## فهرست کامل درس‌ها

<a id="javascript"></a>
<a id="01-javascript"></a>

### جاوااسکریپت — <span dir="ltr">JavaScript</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./01-javascript/fundamentals.md">مبانی جاوااسکریپت — مقدار، نوع و کپی کردن (<span dir="ltr">JavaScript Fundamentals</span>)</a></li>
<li dir="rtl"><a href="./01-javascript/scope-closure-hoisting.md">محدوده متغیر و حافظه تابع — <span dir="ltr">Scope</span>، <span dir="ltr">Hoisting</span> و <span dir="ltr">Closure</span></a></li>
<li dir="rtl"><a href="./01-javascript/execution-context.md">اجرای تابع‌ها را دنبال کنیم — <span dir="ltr">Execution Context</span> و <span dir="ltr">Call Stack</span></a></li>
<li dir="rtl"><a href="./01-javascript/event-loop.md">چرا <span dir="ltr">Promise</span> قبل از تایمر اجرا می‌شود؟ — <span dir="ltr">Event Loop</span></a></li>
<li dir="rtl"><a href="./01-javascript/async-javascript.md">کارهای زمان‌بر بدون قفل کردن مسیر برنامه — <span dir="ltr">Async JavaScript</span></a></li>
<li dir="rtl"><a href="./01-javascript/this-and-functions.md"><span dir="ltr">this</span> به چه کسی اشاره می‌کند؟ — تابع معمولی و <span dir="ltr">Arrow Function</span></a></li>
<li dir="rtl"><a href="./01-javascript/prototype-and-classes.md">اشتراک رفتار بین شیءها — <span dir="ltr">Prototype</span> و <span dir="ltr">Class</span></a></li>
<li dir="rtl"><a href="./01-javascript/memory-and-garbage-collection.md">چرا حافظه آزاد نمی‌شود؟ — <span dir="ltr">Memory</span> و <span dir="ltr">Garbage Collection</span></a></li>
</ul>

<a id="typescript"></a>
<a id="02-typescript"></a>

### تایپ‌اسکریپت — <span dir="ltr">TypeScript</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./02-typescript/fundamentals.md">تایپ‌اسکریپت از صفر — <span dir="ltr">TypeScript Fundamentals</span></a></li>
<li dir="rtl"><a href="./02-typescript/narrowing-and-type-guards.md">محدود کردن نوع با بررسی واقعی — <span dir="ltr">Narrowing</span> و <span dir="ltr">Type Guard</span></a></li>
<li dir="rtl"><a href="./02-typescript/generics-and-advanced-types.md">یک تابع برای چند نوع، با حفظ ارتباط — <span dir="ltr">Generics</span></a></li>
<li dir="rtl"><a href="./02-typescript/index-signatures-and-record.md">وقتی کلیدهای <span dir="ltr">object</span> ثابت نیستند — <span dir="ltr">Index Signature</span> و <span dir="ltr">Record</span></a></li>
</ul>

<a id="react"></a>
<a id="03-react"></a>

### ری‌اکت — <span dir="ltr">React</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./03-react/rendering.md"><span dir="ltr">React</span> چطور صفحه را به‌روز می‌کند؟ — <span dir="ltr">Render</span> و <span dir="ltr">Commit</span></a></li>
<li dir="rtl"><a href="./03-react/state.md">چرا بعد از <span dir="ltr">setState</span> مقدار قدیمی را می‌بینم؟ — <span dir="ltr">State</span></a></li>
<li dir="rtl"><a href="./03-react/lifting-state-and-state-design.md">دو <span dir="ltr">component</span> چطور یک مقدار مشترک داشته باشند؟ — <span dir="ltr">Lifting State</span></a></li>
<li dir="rtl"><a href="./03-react/reconciliation-and-keys.md"><span dir="ltr">React</span> چطور یک ردیف را می‌شناسد؟ — <span dir="ltr">Reconciliation</span> و <span dir="ltr">Key</span></a></li>
<li dir="rtl"><a href="./03-react/effects.md">چه زمانی <span dir="ltr">useEffect</span> لازم داریم؟ — هماهنگی با بیرون <span dir="ltr">React</span></a></li>
<li dir="rtl"><a href="./03-react/refs.md">چیزی را نگه داریم بدون درخواست <span dir="ltr">render</span> — <span dir="ltr">Ref</span></a></li>
<li dir="rtl"><a href="./03-react/hooks.md"><span dir="ltr">Hook</span>ها چطور <span dir="ltr">state</span> هر <span dir="ltr">component</span> را پیدا می‌کنند؟</a></li>
<li dir="rtl"><a href="./03-react/custom-hooks.md">منطق مشترک را استخراج کنیم — <span dir="ltr">Custom Hook</span></a></li>
<li dir="rtl"><a href="./03-react/context-and-state-management.md">رساندن داده به چند لایه پایین‌تر — <span dir="ltr">Context</span> و مدیریت <span dir="ltr">State</span></a></li>
<li dir="rtl"><a href="./03-react/suspense-and-concurrent-react.md">منتظر ماندن رابط کاربری — <span dir="ltr">Suspense</span> و <span dir="ltr">Transition</span></a></li>
<li dir="rtl"><a href="./03-react/react-compiler-and-modern-apis.md"><span dir="ltr">React Compiler</span> و <span dir="ltr">API</span>های جدید؛ هرکدام چه مسئله‌ای حل می‌کنند؟</a></li>
</ul>

<a id="performance"></a>
<a id="04-performance"></a>

### سرعت و پاسخ‌گویی — <span dir="ltr">Performance</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./04-performance/performance-fundamentals.md">سرعت را از کجا بهتر کنیم؟ — <span dir="ltr">Performance Fundamentals</span></a></li>
<li dir="rtl"><a href="./04-performance/react-performance.md">بهینه‌سازی <span dir="ltr">React</span> با دلیل — <span dir="ltr">Memoization</span> و <span dir="ltr">Virtualization</span></a></li>
<li dir="rtl"><a href="./04-performance/browser-rendering.md">تغییر <span dir="ltr">CSS</span> چه هزینه‌ای دارد؟ — <span dir="ltr">Layout</span>، <span dir="ltr">Paint</span> و <span dir="ltr">Composite</span></a></li>
<li dir="rtl"><a href="./04-performance/core-web-vitals.md">کیفیت تجربه کاربر را با چه عددهایی بسنجیم؟ — <span dir="ltr">Core Web Vitals</span></a></li>
<li dir="rtl"><a href="./04-performance/network-and-bundle-performance.md">چرا دانلود کم هم گاهی دیر شروع می‌شود؟ — <span dir="ltr">Network</span> و <span dir="ltr">Bundle</span></a></li>
<li dir="rtl"><a href="./04-performance/images-fonts-assets.md">تصویر و فونت سبک‌تر، با نمایش پایدار</a></li>
</ul>

<a id="browser"></a>
<a id="05-browser"></a>

### مرورگر — <span dir="ltr">Browser</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./05-browser/browser-architecture.md">وقتی <span dir="ltr">URL</span> می‌زنیم چه اتفاقی می‌افتد؟ — <span dir="ltr">Browser Architecture</span></a></li>
<li dir="rtl"><a href="./05-browser/dom-and-events.md">کلیک از کجا عبور می‌کند؟ — <span dir="ltr">DOM</span> و <span dir="ltr">Event</span></a></li>
<li dir="rtl"><a href="./05-browser/rendering-pipeline.md">از <span dir="ltr">HTML</span> تا پیکسل — <span dir="ltr">Rendering Pipeline</span></a></li>
<li dir="rtl"><a href="./05-browser/storage-and-browser-apis.md">داده را کجای مرورگر نگه داریم؟ — <span dir="ltr">Storage</span> و <span dir="ltr">API</span>های کاربردی</a></li>
</ul>

<a id="network"></a>
<a id="06-network"></a>

### شبکه — <span dir="ltr">Network</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./06-network/http.md">مرورگر و سرور چطور حرف می‌زنند؟ — <span dir="ltr">HTTP</span></a></li>
<li dir="rtl"><a href="./06-network/http-caching.md">آیا لازم است همان فایل را دوباره دانلود کنیم؟ — <span dir="ltr">HTTP Cache</span></a></li>
<li dir="rtl"><a href="./06-network/cors.md">چرا درخواست در <span dir="ltr">Postman</span> کار می‌کند ولی در مرورگر نه؟ — <span dir="ltr">CORS</span></a></li>
<li dir="rtl"><a href="./06-network/cookies-and-auth.md">مرورگر چگونه <span dir="ltr">session</span> را همراه درخواست می‌فرستد؟ — <span dir="ltr">Cookie</span> و <span dir="ltr">Auth</span></a></li>
<li dir="rtl"><a href="./06-network/realtime-and-network-basics.md">از پیدا کردن سرور تا پیام زنده — <span dir="ltr">DNS</span>، <span dir="ltr">TLS</span>، <span dir="ltr">WebSocket</span> و <span dir="ltr">SSE</span></a></li>
</ul>

<a id="html-css"></a>
<a id="07-html-css"></a>
<a id="07-html--css"></a>

### ساختار و ظاهر — <span dir="ltr">HTML</span> و <span dir="ltr">CSS</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./07-html-css/html.md"><span dir="ltr">HTML</span> معنی‌دار — <span dir="ltr">Semantics</span></a></li>
<li dir="rtl"><a href="./07-html-css/css-core.md">چرا این <span dir="ltr">CSS</span> اعمال نمی‌شود؟ — <span dir="ltr">Cascade</span> و <span dir="ltr">Box Model</span></a></li>
<li dir="rtl"><a href="./07-html-css/flexbox-and-grid.md">ردیف می‌خواهیم یا شبکه؟ — <span dir="ltr">Flexbox</span> و <span dir="ltr">Grid</span></a></li>
<li dir="rtl"><a href="./07-html-css/responsive-and-stacking.md">صفحه باریک و <span dir="ltr">modal</span> پنهان — <span dir="ltr">Responsive</span> و <span dir="ltr">Stacking Context</span></a></li>
</ul>

<a id="accessibility"></a>
<a id="08-accessibility"></a>

### دسترس‌پذیری — <span dir="ltr">Accessibility</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./08-accessibility/accessibility.md">صفحه‌ای که با صفحه‌کلید هم کار کند — <span dir="ltr">Accessibility</span></a></li>
</ul>

<a id="security"></a>
<a id="09-security"></a>

### امنیت — <span dir="ltr">Security</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./09-security/frontend-security.md">چه چیزهایی را نمی‌توان به مرورگر اعتماد کرد؟ — <span dir="ltr">Frontend Security</span></a></li>
<li dir="rtl"><a href="./09-security/xss-and-csrf.md">دو حمله با دو سازوکار متفاوت — <span dir="ltr">XSS</span> و <span dir="ltr">CSRF</span></a></li>
<li dir="rtl"><a href="./09-security/authentication-security.md">توکن را کجا نگه داریم؟ — <span dir="ltr">Authentication Security</span></a></li>
</ul>

<a id="data-fetching"></a>
<a id="10-data-fetching"></a>

### دریافت و نگهداری داده — <span dir="ltr">Data Fetching</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./10-data-fetching/fetch.md">اولین درخواست شبکه را بفهمیم — <span dir="ltr">Fetch</span></a></li>
<li dir="rtl"><a href="./10-data-fetching/abort-controller.md">وقتی دیگر نتیجه را نمی‌خواهیم — <span dir="ltr">AbortController</span></a></li>
<li dir="rtl"><a href="./10-data-fetching/race-conditions-and-cancellation.md">چرا نتیجه جست‌وجوی قبلی جای جدید را می‌گیرد؟ — <span dir="ltr">Race Condition</span></a></li>
<li dir="rtl"><a href="./10-data-fetching/server-state.md">داده‌ای که مالک اصلی‌اش سرور است — <span dir="ltr">Server State</span></a></li>
<li dir="rtl"><a href="./10-data-fetching/tanstack-query-fundamentals.md">اولین <span dir="ltr">Query</span> را مرحله‌به‌مرحله بسازیم — <span dir="ltr">TanStack Query</span></a></li>
<li dir="rtl"><a href="./10-data-fetching/query-keys-and-options.md">آدرس داده در <span dir="ltr">cache</span> — <span dir="ltr">Query Key</span></a></li>
<li dir="rtl"><a href="./10-data-fetching/query-caching-and-defaults.md">تازه بودن با نگه داشتن فرق دارد — <span dir="ltr">staleTime</span> و <span dir="ltr">gcTime</span></a></li>
<li dir="rtl"><a href="./10-data-fetching/mutations-and-invalidation.md">بعد از ذخیره، لیست چرا قدیمی است؟ — <span dir="ltr">Mutation</span> و <span dir="ltr">Invalidation</span></a></li>
<li dir="rtl"><a href="./10-data-fetching/optimistic-updates.md">نتیجه را پیش از تأیید نشان بدهیم — <span dir="ltr">Optimistic Update</span></a></li>
<li dir="rtl"><a href="./10-data-fetching/pagination-and-infinite-queries.md">داده را مرحله‌ای بگیریم — <span dir="ltr">Pagination</span> و <span dir="ltr">Infinite Query</span></a></li>
<li dir="rtl"><a href="./10-data-fetching/prefetching-and-router-integration.md">داده صفحه بعد را زودتر آماده کنیم — <span dir="ltr">Prefetch</span> و <span dir="ltr">Router</span></a></li>
</ul>

<a id="testing"></a>
<a id="11-testing"></a>

### تست — <span dir="ltr">Testing</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./11-testing/testing-fundamentals.md">تست را از یک رفتار واقعی شروع کنیم — <span dir="ltr">Testing Fundamentals</span></a></li>
<li dir="rtl"><a href="./11-testing/testing-strategy-and-pyramid.md">چه چیزی را در چه سطحی تست کنیم؟ — <span dir="ltr">Test Strategy</span></a></li>
<li dir="rtl"><a href="./11-testing/vitest.md">اجرای اولین تست — <span dir="ltr">Vitest</span></a></li>
<li dir="rtl"><a href="./11-testing/mocking.md">وابستگی واقعی را کی جایگزین کنیم؟ — <span dir="ltr">Mocking</span></a></li>
<li dir="rtl"><a href="./11-testing/spies-and-interaction-testing.md">آیا این همکاری اتفاق افتاد؟ — <span dir="ltr">Spy</span> و <span dir="ltr">Interaction Testing</span></a></li>
<li dir="rtl"><a href="./11-testing/fake-timers-and-dates.md">تستی که واقعاً یک ثانیه منتظر نمی‌ماند — <span dir="ltr">Fake Timers</span></a></li>
<li dir="rtl"><a href="./11-testing/async-testing.md">تست باید منتظر نتیجه بماند — <span dir="ltr">Async Testing</span></a></li>
<li dir="rtl"><a href="./11-testing/test-quality-and-tdd.md">تستی بنویسیم که <span dir="ltr">refactor</span> را تحمل کند — <span dir="ltr">Test Quality</span> و <span dir="ltr">TDD</span></a></li>
<li dir="rtl"><a href="./11-testing/react-testing-library.md">تست <span dir="ltr">component</span> از نگاه کاربر — <span dir="ltr">React Testing Library</span></a></li>
<li dir="rtl"><a href="./11-testing/user-event-and-state-transitions.md">کلیک تنها یک <span dir="ltr">event</span> نیست — <span dir="ltr">userEvent</span> و تغییر وضعیت</a></li>
<li dir="rtl"><a href="./11-testing/async-react-testing.md">چه زمانی متن نتیجه روی صفحه ظاهر می‌شود؟ — <span dir="ltr">Async React Testing</span></a></li>
<li dir="rtl"><a href="./11-testing/msw.md">پاسخ سرور را در مرز شبکه کنترل کنیم — <span dir="ltr">MSW</span></a></li>
<li dir="rtl"><a href="./11-testing/forms-testing.md">فرم را با پر کردن واقعی تست کنیم</a></li>
<li dir="rtl"><a href="./11-testing/react-query-testing.md">تست <span dir="ltr">UI</span> وابسته به <span dir="ltr">Query</span> — <span dir="ltr">cache</span> مستقل، شبکه کنترل‌شده</a></li>
<li dir="rtl"><a href="./11-testing/custom-render-utils.md"><span dir="ltr">Provider</span>های لازم را یک بار تعریف کنیم — <span dir="ltr">Custom Render</span></a></li>
<li dir="rtl"><a href="./11-testing/accessibility-testing.md">دسترس‌پذیری را چطور بررسی کنیم؟</a></li>
<li dir="rtl"><a href="./11-testing/e2e-testing.md">مسیر کامل کاربر را در مرورگر بسنجیم — <span dir="ltr">Playwright</span> و <span dir="ltr">E2E</span></a></li>
<li dir="rtl"><a href="./11-testing/practice-setup.md">راه‌اندازی محیط تمرین تست</a></li>
</ul>

<a id="algorithms"></a>
<a id="12-algorithms"></a>
<a id="12-algorithms--data-structures"></a>

### الگوریتم و ساختار داده

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./12-algorithms/big-o.md">با بزرگ شدن ورودی چه اتفاقی می‌افتد؟ — <span dir="ltr">Big O</span></a></li>
<li dir="rtl"><a href="./12-algorithms/arrays-strings-map-set.md">انتخاب ساختار داده — <span dir="ltr">Array</span>، <span dir="ltr">String</span>، <span dir="ltr">Map</span> و <span dir="ltr">Set</span></a></li>
<li dir="rtl"><a href="./12-algorithms/stack-queue-recursion.md">پشته، صف و تابعی که خودش را صدا می‌زند</a></li>
<li dir="rtl"><a href="./12-algorithms/searching-sorting-patterns.md">از جست‌وجوی ساده تا نصف کردن مسئله — <span dir="ltr">Search Patterns</span></a></li>
<li dir="rtl"><a href="./12-algorithms/trees-and-graphs.md">پیمایش منوی تو در تو — <span dir="ltr">Tree</span>، <span dir="ltr">DFS</span> و <span dir="ltr">BFS</span></a></li>
<li dir="rtl"><a href="./12-algorithms/frontend-coding-exercises.md">تمرین کدنویسی فرانت‌اند با راه‌حل — <span dir="ltr">Debounce</span> و <span dir="ltr">Promise.all</span></a></li>
</ul>

<a id="architecture"></a>
<a id="13-architecture"></a>

### معماری و طراحی سیستم

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./13-architecture/frontend-architecture.md">پروژه را چطور تقسیم کنیم؟ — <span dir="ltr">Frontend Architecture</span></a></li>
<li dir="rtl"><a href="./13-architecture/rendering-strategies.md"><span dir="ltr">HTML</span> کجا و چه زمانی ساخته شود؟ — <span dir="ltr">CSR</span>، <span dir="ltr">SSR</span>، <span dir="ltr">SSG</span> و <span dir="ltr">RSC</span></a></li>
<li dir="rtl"><a href="./13-architecture/bff.md">یک واسطه مخصوص نیاز <span dir="ltr">frontend</span> — <span dir="ltr">Backend for Frontend</span></a></li>
<li dir="rtl"><a href="./13-architecture/microfrontends.md">وقتی چند تیم مستقل یک محصول می‌سازند — <span dir="ltr">Microfrontends</span></a></li>
<li dir="rtl"><a href="./13-architecture/frontend-system-design.md">در مصاحبه یک سیستم را چطور طراحی کنیم؟ — <span dir="ltr">Frontend System Design</span></a></li>
</ul>

<a id="build-tools"></a>
<a id="14-build-tools"></a>

### ابزارهای ساخت — <span dir="ltr">Build Tools</span>

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./14-build-tools/build-process-and-vite.md">از <span dir="ltr">JSX</span> تا فایل قابل اجرای مرورگر — <span dir="ltr">Build</span> و <span dir="ltr">Vite</span></a></li>
<li dir="rtl"><a href="./14-build-tools/bundling-and-tree-shaking.md">چه کدی در خروجی اولیه بماند؟ — <span dir="ltr">Bundling</span> و <span dir="ltr">Tree Shaking</span></a></li>
<li dir="rtl"><a href="./14-build-tools/esm-commonjs.md">فایل‌ها چطور به هم وصل می‌شوند؟ — <span dir="ltr">ESM</span> و <span dir="ltr">CommonJS</span></a></li>
</ul>

<a id="interview"></a>

### تمرین مصاحبه با پاسخ

<ul dir="rtl" align="right">
<li dir="rtl"><a href="./interview/javascript-questions.md">تمرین مصاحبه <span dir="ltr">JavaScript</span> — سؤال همراه با پاسخ و مثال</a></li>
<li dir="rtl"><a href="./interview/react-questions.md">تمرین مصاحبه <span dir="ltr">React</span> — ۳۱ سؤال با پاسخ</a></li>
<li dir="rtl"><a href="./interview/frontend-questions.md">تمرین مصاحبه عمومی <span dir="ltr">Frontend</span> — پاسخ‌ها را به هم وصل کن</a></li>
<li dir="rtl"><a href="./interview/coding-problems.md">مصاحبه کدنویسی — مسئله، راه‌حل و تحلیل</a></li>
</ul>

## منابع رسمی برای مراجعه بیشتر

توضیح فارسی برای یادگیری است؛ هنگام استفاده از <span dir="ltr">API</span>، مستندات نسخه نصب‌شده پروژه را هم بررسی کن:

<ul dir="rtl" align="right">
<li dir="rtl"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide">راهنمای <span dir="ltr">JavaScript</span> در <span dir="ltr">MDN</span></a></li>
<li dir="rtl"><a href="https://react.dev/learn">آموزش رسمی <span dir="ltr">React</span></a></li>
<li dir="rtl"><a href="https://www.typescriptlang.org/docs/handbook/intro.html"><span dir="ltr">TypeScript Handbook</span></a></li>
<li dir="rtl"><a href="https://tanstack.com/query/latest/docs/framework/react/overview"><span dir="ltr">TanStack Query</span></a></li>
<li dir="rtl"><a href="https://testing-library.com/docs/queries/about/"><span dir="ltr">Testing Library</span></a></li>
</ul>

## بررسی خود یادداشت‌ها

اگر <span dir="ltr">Node.js</span> داری، با اجرای <code><span dir="ltr">node scripts/check-notes.mjs</span></code> از ریشه این مخزن، لینک‌های داخلی، ساختار بخش‌های آموزشی، نحو مثال‌های <span dir="ltr">JavaScript</span> و خروجی نمونه‌های مستقل بررسی می‌شوند. این بررسی جای اجرای مثال‌های <span dir="ltr">React</span> در پروژه تمرینی را نمی‌گیرد.

## سابقه یادداشت‌های اولیه

[گزارش اصلاح یادداشت‌ها](./NOTES-MIGRATION.md) و [گزارش ادغام آرشیو دوم](./MERGE-REPORT.md) به زبان قبلی حفظ شده‌اند. این دو گزارش بخشی از مسیر آموزشی اصلی نیستند.

</div>
