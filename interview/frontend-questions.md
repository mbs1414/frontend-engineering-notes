<div dir="rtl" align="right">

# تمرین مصاحبه عمومی <span dir="ltr">Frontend</span> — پاسخ‌ها را به هم وصل کن

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** مرور درس‌های <span dir="ltr">Browser</span>، <span dir="ltr">Network</span>، <span dir="ltr">Performance</span>، <span dir="ltr">HTML/CSS</span> و <span dir="ltr">Security</span>. برای هر پاسخ، علت و یک نمونه عملی بیان کن.

## <span dir="ltr">Browser</span>

1. **بعد از وارد کردن <span dir="ltr">URL</span>؟** <span dir="ltr">cache</span> و مسیر شبکه بررسی می‌شود، اتصال لازم ایجاد یا استفاده می‌شود، پاسخ پردازش می‌شود و <span dir="ltr">DOM</span>، <span dir="ltr">style</span>، <span dir="ltr">layout</span> و نمایش شکل می‌گیرد؛ اجرای <span dir="ltr">JavaScript</span> و تعامل هم به این مسیر مرتبط‌اند.
2. **<span dir="ltr">DOM</span> و <span dir="ltr">CSSOM</span>؟** اولی ساختار سند و دومی مدل قواعد <span dir="ltr">CSS</span> است؛ محاسبه ظاهر و <span dir="ltr">layout</span> از داده‌های مرتبط استفاده می‌کند.
3. **<span dir="ltr">Layout</span>، <span dir="ltr">paint</span> و <span dir="ltr">composite</span>؟** اندازه و موقعیت؛ ساخت ظاهر؛ ترکیب لایه‌ها. هر تغییر لزوماً همه مراحل را تکرار نمی‌کند.
4. **<span dir="ltr">Layout thrashing</span>؟** تناوب نوشتن <span dir="ltr">style</span> و خواندن اندازه وابسته می‌تواند <span dir="ltr">layout</span> اجباری مکرر بسازد؛ خواندن و نوشتن‌ها را مناسب گروه‌بندی کن.
5. **<span dir="ltr">async</span> و <span dir="ltr">defer</span>؟** برای <span dir="ltr">script</span> کلاسیک خارجی، <span dir="ltr">async</span> پس از آماده شدن و بدون تضمین ترتیب؛ <span dir="ltr">defer</span> پس از <span dir="ltr">parse</span> و با حفظ ترتیب مربوط اجرا می‌شود.
6. **<span dir="ltr">Capture</span> و <span dir="ltr">bubble</span>؟** یکی حرکت در مسیر به سمت <span dir="ltr">target</span> و دیگری از <span dir="ltr">target</span> به سمت بالا برای <span dir="ltr">event</span>های دارای <span dir="ltr">bubbling</span> است.
7. **<span dir="ltr">Event delegation</span>؟** <span dir="ltr">listener</span> روی والد، رویداد فرزندها را مدیریت می‌کند؛ با <span dir="ltr">target/closest</span> هدف مناسب را پیدا می‌کنیم.
8. **<span dir="ltr">localStorage</span>، <span dir="ltr">cookie</span> و <span dir="ltr">IndexedDB</span>؟** اولی <span dir="ltr">key/value</span> رشته‌ای <span dir="ltr">synchronous</span>، دومی دارای قواعد ارسال <span dir="ltr">HTTP</span>، سومی ذخیره ساختاریافته <span dir="ltr">asynchronous</span> است.
9. **<span dir="ltr">IntersectionObserver</span>؟** تشخیص تقاطع عنصر با <span dir="ltr">viewport</span> یا <span dir="ltr">root</span> تعیین‌شده؛ برای بارگذاری تدریجی یا <span dir="ltr">sentinel</span> لیست کاربرد دارد.

## <span dir="ltr">Network</span>

10. **<span dir="ltr">HTTP request/response</span>؟** <span dir="ltr">method</span>، مسیر، <span dir="ltr">header</span> و <span dir="ltr">body</span> درخواست؛ <span dir="ltr">status</span>، <span dir="ltr">header</span> و <span dir="ltr">body</span> پاسخ قرارداد مکالمه‌اند.
11. **401 و 403؟** 401 به احراز هویت مورد نیاز/نامعتبر مربوط است؛ 403 یعنی سرور عملیات را مجاز نمی‌داند. قرارداد <span dir="ltr">API</span> را هم بررسی کن.
12. **<span dir="ltr">CORS</span>؟** سازوکار مجوز مرورگر برای دسترسی <span dir="ltr">cross-origin</span> بر اساس پاسخ سرور.
13. **<span dir="ltr">Preflight</span>؟** درخواست <span dir="ltr">OPTIONS</span> مرورگر پیش از برخی درخواست‌های <span dir="ltr">cross-origin</span> برای بررسی مجوز <span dir="ltr">method/header</span>.
14. **چرا <span dir="ltr">Postman</span> کار می‌کند؟** <span dir="ltr">Same-Origin Policy</span> محدودیت محیط مرورگر است؛ ابزار دیگر همان سیاست صفحه وب را اعمال نمی‌کند.
15. **<span dir="ltr">no-cache</span> و <span dir="ltr">no-store</span>؟** اولی پیش از <span dir="ltr">reuse</span> اعتبارسنجی می‌خواهد؛ دومی منع ذخیره است.
16. **<span dir="ltr">ETag</span>؟** <span dir="ltr">validator</span> نسخه محتواست؛ <span dir="ltr">If-None-Match</span> می‌تواند پاسخ 304 و <span dir="ltr">reuse body</span> قبلی ایجاد کند.
17. **<span dir="ltr">WebSocket</span> و <span dir="ltr">SSE</span>؟** اولی دوطرفه، دومی جریان <span dir="ltr">server</span> به <span dir="ltr">client</span> با قرارداد <span dir="ltr">EventSource</span>؛ نیاز <span dir="ltr">reconnect</span> و احراز هویت را جدا بسنج.
18. **<span dir="ltr">DNS</span> و <span dir="ltr">TLS</span>؟** <span dir="ltr">DNS</span> اطلاعات مقصد را از نام پیدا می‌کند؛ <span dir="ltr">TLS</span> امنیت ارتباط و بررسی هویت سرور با گواهی را فراهم می‌کند.

## <span dir="ltr">Performance</span>

19. **<span dir="ltr">LCP</span>، <span dir="ltr">INP</span> و <span dir="ltr">CLS</span>؟** زمان نمایش محتوای بزرگ اصلی، پاسخ‌گویی تعامل و ناپایداری بصری. هرکدام مسئله متفاوتی را می‌سنجد.
20. **صفحه کند را از کجا بررسی کنیم؟** سناریوی مشخص، ابزار مناسب، پیدا کردن گلوگاه، تغییر محدود و اندازه‌گیری دوباره.
21. **<span dir="ltr">Preload</span> و <span dir="ltr">prefetch</span>؟** منبع مهم همین صفحه در برابر نیاز احتمالی آینده؛ زیاده‌روی می‌تواند با منابع حیاتی رقابت کند.
22. **عکس چگونه <span dir="ltr">CLS</span> می‌سازد؟** اگر جا رزرو نشده باشد، رسیدن عکس عناصر را جابه‌جا می‌کند؛ <span dir="ltr">width/height</span> یا نسبت مناسب کمک می‌کند.
23. **چرا <span dir="ltr">lazy</span> کردن <span dir="ltr">hero</span> ممکن است بد باشد؟** شروع دریافت عنصر مهم <span dir="ltr">LCP</span> را عقب می‌اندازد.
24. **<span dir="ltr">Request waterfall</span>؟** زنجیره‌ای از درخواست‌ها که شروع هرکدام منتظر قبلی است؛ همیشه با کم کردن حجم تنها حل نمی‌شود.
25. **<span dir="ltr">Tree shaking</span> و <span dir="ltr">code splitting</span>؟** حذف کد استفاده‌نشده در برابر تقسیم کد لازم برای بارگذاری مناسب‌تر.

## <span dir="ltr">HTML</span>، <span dir="ltr">CSS</span> و <span dir="ltr">Accessibility</span>

26. **<span dir="ltr">Button</span> و <span dir="ltr">link</span>؟** دکمه برای عمل؛ لینک با <span dir="ltr">href</span> برای مقصد و ناوبری.
27. **چرا <span dir="ltr">label</span>؟** نام و ارتباط قابل دسترس برای کنترل فرم و تجربه بهتر کلیک و ابزار کمکی.
28. **<span dir="ltr">Cascade</span> و <span dir="ltr">specificity</span>؟** <span dir="ltr">cascade</span> چند مرحله اولویت دارد؛ <span dir="ltr">specificity</span> تنها یکی از آن‌هاست. «آخرین قانون همیشه می‌برد» غلط است.
29. **<span dir="ltr">Flex</span> و <span dir="ltr">Grid</span>؟** محور اصلی در برابر شبکه ردیف و ستون؛ بر اساس ساختار چیدمان انتخاب کن.
30. **<span dir="ltr">Stacking context</span>؟** محدوده محلی ترتیب لایه‌ها که فرزندان در چارچوب آن با بیرون مقایسه می‌شوند.
31. **چرا <span dir="ltr">z-index</span> بزرگ شکست می‌خورد؟** ممکن است داخل <span dir="ltr">context</span> والد پایین‌تر باشد یا <span dir="ltr">clipping</span> اتفاق افتاده باشد.
32. **<span dir="ltr">Accessible name</span>؟** نامی که کنترل با آن برای فناوری کمکی شناسایی می‌شود؛ از متن، <span dir="ltr">label</span> و قواعد <span dir="ltr">ARIA</span> می‌تواند بیاید.
33. **کی <span dir="ltr">ARIA</span>؟** وقتی <span dir="ltr">semantic</span> بومی کافی نیست؛ <span dir="ltr">role</span> به‌تنهایی رفتار صفحه‌کلید ایجاد نمی‌کند.

## <span dir="ltr">Security</span>

34. **<span dir="ltr">XSS</span> و <span dir="ltr">CSRF</span>؟** اولی اجرای کد تزریق‌شده در <span dir="ltr">origin</span>؛ دومی وادار کردن مرورگر قربانی به درخواست <span dir="ltr">credentialed</span> ناخواسته.
35. **چرا <span dir="ltr">role frontend</span> کافی نیست؟** کاربر می‌تواند <span dir="ltr">UI</span> و درخواست را تغییر دهد؛ سرور باید مجوز عملیات و منبع را <span dir="ltr">enforce</span> کند.
36. **<span dir="ltr">HttpOnly</span>، <span dir="ltr">Secure</span> و <span dir="ltr">SameSite</span>؟** محدودیت خواندن با <span dir="ltr">JS</span>، ارسال روی ارتباط امن و قواعد ارسال <span dir="ltr">cross-site</span>؛ هرکدام بخشی از دفاع است.
37. **ریسک <span dir="ltr">token</span> در <span dir="ltr">localStorage</span>؟** <span dir="ltr">JavaScript</span> صفحه آن را می‌خواند، پس <span dir="ltr">XSS</span> می‌تواند آن را سرقت کند.
38. **چرا <span dir="ltr">env frontend secret</span> نیست؟** مقداری که به <span dir="ltr">bundle client</span> وارد شود برای کاربر قابل مشاهده است؛ نام <span dir="ltr">environment</span> امنیت ایجاد نمی‌کند.

## تمرین با پاسخ

کاربر روی خرید کلیک می‌کند، دکمه پایین می‌پرد و پرداخت چند ثانیه بعد ثبت می‌شود. آیا یک مشکل <span dir="ltr">Performance</span> داریم؟

<details>
<summary>پاسخ</summary>

حداقل دو علامت متفاوت داریم: جابه‌جایی بصری را با <span dir="ltr">layout shift</span> و فضای رزروشده بررسی کن؛ تأخیر پرداخت می‌تواند شبکه، <span dir="ltr">backend</span> یا <span dir="ltr">main thread</span> باشد. باید مسیر تعامل را اندازه گرفت، نه اینکه هر دو را با یک <span dir="ltr">useMemo</span> درمان کرد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Frontend Interview Questions

## Browser

1. What happens after entering a URL?
2. DOM vs CSSOM?
3. Layout vs paint vs composite?
4. What is layout thrashing?
5. `async` vs `defer`?
6. Event bubbling vs capturing?
7. What is event delegation?
8. localStorage vs cookies vs IndexedDB?
9. IntersectionObserver use case?

## Network

10. Explain an HTTP request/response.
11. 401 vs 403?
12. What is CORS?
13. What is preflight?
14. Why can Postman work while browser fails?
15. `no-cache` vs `no-store`?
16. What is ETag?
17. WebSocket vs SSE?
18. What do DNS and TLS do?

## Performance

19. LCP, INP, CLS?
20. How debug a slow page?
21. Preload vs prefetch?
22. How do images cause CLS?
23. Why can lazy-loading the hero image hurt LCP?
24. What is a request waterfall?
25. Tree shaking vs code splitting?

## HTML/CSS/A11y

26. Button vs link?
27. Why labels?
28. Explain cascade/specificity.
29. Flexbox vs Grid?
30. What is a stacking context?
31. Why can huge z-index fail?
32. What is an accessible name?
33. When use ARIA?

## Security

34. XSS vs CSRF?
35. Why can't frontend role checks enforce authorization?
36. HttpOnly/Secure/SameSite?
37. localStorage token risks?
38. Why aren't frontend env variables secret?

</div>

</details>

</div>
