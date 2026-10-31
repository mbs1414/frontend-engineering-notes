<div dir="rtl" align="right">

# واژه‌نامه همراه مطالعه

[فهرست](./README.md) · [روش مطالعه](./ROADMAP.md)

این جدول را یک‌جا حفظ نکن؛ هر بار معنی اصطلاحی را فراموش کردی، همان ردیف را بخوان. جزئیات و استثناها در درس مربوط آمده‌اند.

| اصطلاح | معنی ساده | نمونه یا نکته |
| --- | --- | --- |
| <span dir="ltr">Value</span> / <span dir="ltr">Type</span> | مقدار / نوع مقدار | ۱۰ / <span dir="ltr">number</span> |
| <span dir="ltr">Reference</span> | ارجاع به شیء | دو متغیر ممکن است به یک <span dir="ltr">object</span> برسند |
| <span dir="ltr">Identity</span> | هویت | محتوای برابر لزوماً هویت برابر نیست |
| <span dir="ltr">Mutation</span> | تغییر داده موجود | تغییر <span dir="ltr">user.name</span> |
| <span dir="ltr">Immutable Update</span> | ساخت نسخه تازه برای تغییر | <span dir="ltr">spread</span> و جایگزینی <span dir="ltr">property</span> |
| <span dir="ltr">Shallow Copy</span> | کپی لایه بیرونی | <span dir="ltr">object</span> داخلی ممکن است مشترک بماند |
| <span dir="ltr">Scope</span> | محدوده دسترسی متغیر | متغیر محلی تابع |
| <span dir="ltr">Binding</span> | ارتباط نام متغیر با جایگاه مقدار | <span dir="ltr">closure</span> به محیط <span dir="ltr">binding</span>ها دسترسی دارد |
| <span dir="ltr">Lexical</span> | وابسته به محل تعریف کد | مستقل از محل صدا زدن تابع |
| <span dir="ltr">Hoisting</span> | رفتار آماده‌سازی زودتر <span dir="ltr">binding</span>ها | جابه‌جایی واقعی <span dir="ltr">source</span> نیست |
| <span dir="ltr">TDZ</span> | بازه پیش از <span dir="ltr">initialization</span> متغیر <span dir="ltr">lexical</span> | دسترسی زودهنگام به <span dir="ltr">let</span> خطاست |
| <span dir="ltr">Closure</span> | تابع با دسترسی به محیط محل ساخت | <span dir="ltr">counter</span> خصوصی |
| <span dir="ltr">Call Stack</span> | سابقه تابع‌های در حال اجرا | آخرین فراخوانی اول برمی‌گردد |
| <span dir="ltr">Callback</span> | تابع داده‌شده برای فراخوانی | <span dir="ltr">handler</span> کلیک |
| <span dir="ltr">Promise</span> | نماینده نتیجه آینده | <span dir="ltr">pending</span>، <span dir="ltr">fulfilled</span> یا <span dir="ltr">rejected</span> |
| <span dir="ltr">Task</span> / <span dir="ltr">Microtask</span> | دو نوع کار در زمان‌بندی <span dir="ltr">event loop</span> | <span dir="ltr">timer</span> / واکنش <span dir="ltr">Promise</span> |
| <span dir="ltr">Render</span> | محاسبه خروجی <span dir="ltr">UI</span> | اجرای تابع <span dir="ltr">component</span> |
| <span dir="ltr">Commit</span> | اعمال تغییر لازم | به‌روزرسانی <span dir="ltr">DOM</span> |
| <span dir="ltr">State</span> | داده حفظ‌شده مرتبط با تغییر <span dir="ltr">UI</span> | شمارنده |
| <span dir="ltr">Props</span> | ورودی <span dir="ltr">component</span> | نام ارسال‌شده از والد |
| <span dir="ltr">Snapshot</span> | مقدارهای متعلق به یک <span dir="ltr">render</span> | <span dir="ltr">handler</span> همان <span dir="ltr">render</span> آن‌ها را می‌خواند |
| <span dir="ltr">Effect</span> | هماهنگی با سیستم بیرونی | <span dir="ltr">timer</span> یا <span dir="ltr">subscription</span> |
| <span dir="ltr">Cleanup</span> | پایان دادن به اتصال قبلی | حذف <span dir="ltr">listener</span> |
| <span dir="ltr">Dependency</span> | مقدار مؤثر در یک کار | <span dir="ltr">roomId</span> برای اتصال اتاق |
| <span dir="ltr">Ref</span> | ظرف پایدار بدون درخواست <span dir="ltr">render</span> با <span dir="ltr">mutation</span> | ارجاع <span dir="ltr">input</span> |
| <span dir="ltr">Context</span> | رساندن مقدار در درخت <span dir="ltr">component</span>ها | <span dir="ltr">theme</span> |
| <span dir="ltr">Memoization</span> | استفاده مجدد از نتیجه با ورودی مناسب | <span dir="ltr">cache</span> محاسبه |
| <span dir="ltr">Reconciliation</span> | متناظر کردن ساختار قبلی و بعدی | دنبال کردن هویت ردیف |
| <span dir="ltr">Hydration</span> | اتصال <span dir="ltr">React client</span> به <span dir="ltr">HTML</span> قبلی | صفحه <span dir="ltr">SSR</span> |
| <span dir="ltr">DOM</span> | درخت و <span dir="ltr">API</span> سند | عناصر <span dir="ltr">HTML</span> |
| <span dir="ltr">Layout</span> | اندازه و موقعیت | عرض و جای کارت |
| <span dir="ltr">Paint</span> / <span dir="ltr">Composite</span> | ساخت ظاهر / ترکیب لایه‌ها | مراحل نمایش صفحه |
| <span dir="ltr">Origin</span> | <span dir="ltr">scheme</span>، <span dir="ltr">host</span> و <span dir="ltr">port</span> | مبنای <span dir="ltr">cross-origin</span> |
| <span dir="ltr">Endpoint</span> | مسیر یک قابلیت <span dir="ltr">API</span> | /<span dir="ltr">api/users</span> |
| <span dir="ltr">Header</span> / <span dir="ltr">Payload</span> | اطلاعات جانبی / داده اصلی پیام | <span dir="ltr">Content-Type</span> / <span dir="ltr">body</span> |
| <span dir="ltr">Cache</span> | نسخه نگه‌داشته‌شده | پاسخ <span dir="ltr">HTTP</span> یا داده <span dir="ltr">query</span> |
| <span dir="ltr">Fresh</span> / <span dir="ltr">Stale</span> | تازه / نیازمند بررسی طبق سیاست | <span dir="ltr">stale</span> الزاماً یعنی غلط نیست |
| <span dir="ltr">Invalidation</span> | نامعتبر کردن تازگی <span dir="ltr">cache</span> | پس از <span dir="ltr">mutation</span> |
| <span dir="ltr">Race Condition</span> | نتیجه وابسته به ترتیب زمانی کنترل‌نشده | پاسخ قدیمی جای جدید می‌نشیند |
| <span dir="ltr">Cancellation</span> | لغو کار پشتیبانی‌کننده | <span dir="ltr">AbortController</span> |
| <span dir="ltr">Debounce</span> | اجرا پس از مکث | جست‌وجو بعد از توقف تایپ |
| <span dir="ltr">Throttle</span> | محدود کردن دفعات اجرا در بازه | کنترل نرخ <span dir="ltr">handler</span> |
| <span dir="ltr">Pagination</span> | تقسیم داده به صفحه | صفحه محصولات |
| <span dir="ltr">Virtualization</span> | محدود کردن ردیف‌های <span dir="ltr">render</span>شده | محدوده قابل دید لیست |
| <span dir="ltr">Authentication</span> | تشخیص هویت | کاربر کیست؟ |
| <span dir="ltr">Authorization</span> | بررسی مجوز | اجازه حذف دارد؟ |
| <span dir="ltr">XSS</span> | تبدیل داده مهاجم به کد در صفحه | <span dir="ltr">HTML</span> ناامن |
| <span dir="ltr">CSRF</span> | درخواست ناخواسته با <span dir="ltr">credential</span> قربانی | تغییر حساس با <span dir="ltr">cookie</span> |
| <span dir="ltr">Assertion</span> | ادعای قابل بررسی تست | <span dir="ltr">expect</span>(<span dir="ltr">result</span>).<span dir="ltr">toBe</span>(3) |
| <span dir="ltr">Mock</span> / <span dir="ltr">Spy</span> | جایگزین کنترل‌شده / مشاهده فراخوانی | پاسخ ساختگی / <span dir="ltr">spyOn</span> |
| <span dir="ltr">Integration</span> / <span dir="ltr">E2E</span> | تست همکاری بخش‌ها / مسیر گسترده کاربر | فرم با داده / خرید در مرورگر |
| <span dir="ltr">Big O</span> | رشد هزینه با اندازه ورودی | <span dir="ltr">O</span>(<span dir="ltr">n</span>) |
| <span dir="ltr">Stack</span> / <span dir="ltr">Queue</span> | آخرین‌ورودی‌اول / اولین‌ورودی‌اول | <span dir="ltr">undo</span> / صف کار |
| <span dir="ltr">DFS</span> / <span dir="ltr">BFS</span> | عمق‌اول / سطح‌اول | پیمایش درخت |
| <span dir="ltr">Transpilation</span> | تبدیل <span dir="ltr">syntax</span> | تبدیل <span dir="ltr">JSX</span> |
| <span dir="ltr">Bundling</span> | ساخت خروجی از گراف ماژول‌ها | <span dir="ltr">chunk</span>های <span dir="ltr">production</span> |
| <span dir="ltr">Tree Shaking</span> | حذف کد غیرلازم قابل حذف | <span dir="ltr">export</span> استفاده‌نشده |
| <span dir="ltr">Code Splitting</span> | تقسیم کد برای بارگذاری مناسب‌تر | صفحه گزارش |
| <span dir="ltr">Trade-off</span> | سود و هزینه یک تصمیم | <span dir="ltr">cache</span> و تازگی |

</div>
