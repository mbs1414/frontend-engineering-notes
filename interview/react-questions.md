<div dir="rtl" align="right">

# تمرین مصاحبه <span dir="ltr">React</span> — ۳۱ سؤال با پاسخ

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">State</span>](../03-react/state.md)، [<span dir="ltr">Effect</span>](../03-react/effects.md) و [<span dir="ltr">Rendering</span>](../03-react/rendering.md). پاسخ را با یک نمونه از پروژه خودت کامل کن.

## <span dir="ltr">Rendering</span> و <span dir="ltr">State</span>

1. **چه چیزی <span dir="ltr">render</span> ایجاد می‌کند؟** <span dir="ltr">mount</span>، <span dir="ltr">update state</span>، <span dir="ltr">render</span> والد و تغییر <span dir="ltr">context</span> مصرف‌شده از علت‌های رایج‌اند؛ بعضی مسیرها با <span dir="ltr">memoization</span> قابل رد کردن‌اند.
2. **<span dir="ltr">Render</span> و <span dir="ltr">commit</span>؟** <span dir="ltr">render</span> محاسبه خروجی بعدی است؛ <span dir="ltr">commit</span> اعمال تغییرهای لازم است. مرورگر پس از آن کار نمایش را انجام می‌دهد.
3. **هر <span dir="ltr">render</span>، <span dir="ltr">DOM</span> را تغییر می‌دهد؟** خیر؛ اگر خروجی لازم همان قبلی باشد، تغییر <span dir="ltr">DOM</span> آن بخش ممکن است لازم نباشد.
4. **<span dir="ltr">Reconciliation</span> چیست؟** فرایند متناظر کردن ساختار قبلی و بعدی برای تشخیص هویت‌ها و تغییرات لازم.
5. **هویت <span dir="ltr">component</span> به چیست؟** نوع، جایگاه در درخت و <span dir="ltr">key</span> در تشخیص آن نقش دارند. تغییر هویت می‌تواند <span dir="ltr">state</span> را <span dir="ltr">reset</span> کند.
6. **چرا <span dir="ltr">key</span>؟** برای دنبال کردن هویت خواهر و برادرهای یک لیست بین <span dir="ltr">render</span>ها.
7. **خطر <span dir="ltr">index key</span> چیست؟** با درج و حذف یا جابه‌جایی، <span dir="ltr">state</span> یک جایگاه ممکن است به داده ردیف دیگری وصل شود.
8. **چرا پس از <span dir="ltr">setter</span> مقدار قدیمی است؟** <span dir="ltr">handler</span> مقدار <span dir="ltr">snapshot</span> همان <span dir="ltr">render</span> را می‌خواند؛ <span dir="ltr">setter</span> درخواست <span dir="ltr">state</span> بعدی می‌دهد و <span dir="ltr">binding</span> فعلی را عوض نمی‌کند.
9. **<span dir="ltr">Batching</span> چیست؟** گروه‌بندی <span dir="ltr">update</span>ها برای جلوگیری از <span dir="ltr">commit</span>های جداگانه غیرضروری؛ به معنی <span dir="ltr">Promise</span> بودن <span dir="ltr">setter</span> نیست.
10. **<span dir="ltr">Functional update</span> کی؟** وقتی نتیجه بعدی به <span dir="ltr">state</span> قبلی صف‌شده وابسته است، مثل <span dir="ltr">`setCount(c => c + 1)`</span>.
11. **<span dir="ltr">Derived state</span> چیست؟** داده‌ای که از ورودی‌های موجود محاسبه می‌شود. نام کامل از نام و نام خانوادگی معمولاً <span dir="ltr">state</span> و <span dir="ltr">Effect</span> مستقل نمی‌خواهد.
12. **<span dir="ltr">Controlled</span> و <span dir="ltr">uncontrolled</span>؟** در <span dir="ltr">controlled</span> مقدار <span dir="ltr">input</span> از <span dir="ltr">state React</span> می‌آید؛ در <span dir="ltr">uncontrolled</span> مرورگر مقدار جاری را نگه می‌دارد و معمولاً <span dir="ltr">defaultValue/ref</span> استفاده می‌شود.

## <span dir="ltr">Effect</span> و <span dir="ltr">Ref</span>

13. **<span dir="ltr">useEffect</span> برای چیست؟** هماهنگی با سیستم بیرونی مثل <span dir="ltr">timer</span>، <span dir="ltr">subscription</span> یا <span dir="ltr">widget</span>؛ برای محاسبه ساده خروجی معمولاً لازم نیست.
14. **چرا <span dir="ltr">cleanup</span>؟** برای پایان دادن به اتصال قبلی پیش از <span dir="ltr">setup</span> جدید یا پایان حضور <span dir="ltr">component</span>؛ مثل حذف <span dir="ltr">listener</span> و پاک کردن <span dir="ltr">timer</span>.
15. **<span dir="ltr">Stale closure</span> در <span dir="ltr">React</span>؟** <span dir="ltr">callback</span> مقدارهای <span dir="ltr">render</span> زمان ساخته شدنش را می‌بیند. <span dir="ltr">dependency</span> نادرست می‌تواند مقدار قدیمی را نگه دارد.
16. **<span dir="ltr">useEffect</span> و <span dir="ltr">useLayoutEffect</span>؟** دومی برای اندازه‌گیری/تغییر لازم پیش از <span dir="ltr">paint</span> است و می‌تواند نمایش را متوقف کند؛ اولی انتخاب معمول <span dir="ltr">synchronization</span> است.
17. **<span dir="ltr">useRef</span> و <span dir="ltr">useState</span>؟** تغییر <span dir="ltr">state</span> می‌تواند <span dir="ltr">render</span> درخواست کند؛ تغییر <span dir="ltr">ref.current</span> چنین درخواستی نمی‌دهد. نیاز <span dir="ltr">UI</span> معیار انتخاب است.
18. **آیا <span dir="ltr">ref</span> پایدار می‌ماند؟** <span dir="ltr">object ref</span> در عمر همان <span dir="ltr">instance</span> حفظ می‌شود؛ با هویت تازه یا <span dir="ltr">mount</span> تازه، <span dir="ltr">ref</span> تازه داریم.
19. **چرا <span dir="ltr">mutation ref render</span> نمی‌سازد؟** <span dir="ltr">ref</span> قرارداد نگهداری مقدار خارج چرخه درخواست <span dir="ltr">render</span> است؛ برای نمایش <span dir="ltr">reactive</span> باید <span dir="ltr">state</span> یا منبع <span dir="ltr">reactive</span> مناسب داشت.

## <span dir="ltr">Performance</span>

20. **<span dir="ltr">memo</span>، <span dir="ltr">useMemo</span> و <span dir="ltr">useCallback</span>؟** اولی امکان رد <span dir="ltr">render component</span> با <span dir="ltr">props</span> مشابه؛ دومی <span dir="ltr">cache</span> محاسبه؛ سومی حفظ هویت تابع است.
21. **چه زمانی <span dir="ltr">memoization</span> بی‌فایده است؟** محاسبه ارزان، <span dir="ltr">dependency</span> همیشه متفاوت یا <span dir="ltr">props</span> همیشه تازه می‌تواند سود را کم کند و پیچیدگی اضافه کند. <span dir="ltr">Profiler</span> مبناست.
22. **لیست بزرگ را چطور سریع کنیم؟** اول هزینه را مشخص کن؛ کاهش کار هر ردیف، <span dir="ltr">pagination</span> و <span dir="ltr">virtualization</span> گزینه‌های اصلی‌اند.
23. **<span dir="ltr">Pagination</span> و <span dir="ltr">virtualization</span>؟** اولی داده را صفحه‌بندی می‌کند؛ دومی تعداد ردیف‌های <span dir="ltr">render</span>شده را محدود می‌کند. می‌توان هر دو را داشت.
24. **<span dir="ltr">useTransition</span> و <span dir="ltr">useDeferredValue</span>؟** اولی <span dir="ltr">update</span>هایی را در سطح اولویت کمتر قرار می‌دهد؛ دومی مصرف مقدار را می‌تواند عقب‌تر ببرد. هیچ‌کدام <span dir="ltr">debounce</span> با <span dir="ltr">delay</span> ثابت نیست.
25. **<span dir="ltr">Compiler</span> چه تغییر می‌دهد؟** با پیکربندی مناسب بخشی از <span dir="ltr">memoization</span> را هنگام <span dir="ltr">build</span> خودکار می‌کند؛ نیاز به مدل درست <span dir="ltr">state</span>، خلوص و اندازه‌گیری باقی است.

## معماری

26. **<span dir="ltr">Context</span> یا <span dir="ltr">store</span>؟** <span dir="ltr">Context</span> توزیع مقدار است؛ <span dir="ltr">store</span> می‌تواند ابزار <span dir="ltr">transition</span>، <span dir="ltr">selector</span> و <span dir="ltr">subscription</span> مناسب‌تری برای <span dir="ltr">state</span> پیچیده بدهد. نیاز واقعی و هزینه انتخاب را بگو.
27. **<span dir="ltr">Server state</span> و <span dir="ltr">client state</span>؟** مالک اصلی اولی سرور است و نسخه <span dir="ltr">client</span> ممکن است <span dir="ltr">stale</span> شود؛ دومی مثل باز بودن <span dir="ltr">modal</span> متعلق به <span dir="ltr">UI</span> است.
28. **چرا <span dir="ltr">context</span> بزرگ <span dir="ltr">render</span>های زیادی می‌دهد؟** مصرف‌کننده‌ها به <span dir="ltr">value context</span> مشترک وابسته‌اند؛ <span dir="ltr">object</span> تازه یا تغییر بخش پرمصرف می‌تواند دامنه <span dir="ltr">update</span> را بزرگ کند.
29. **<span dir="ltr">Suspense</span> چیست؟** <span dir="ltr">boundary</span> برای <span dir="ltr">fallback</span> منبع یا کد سازگار با <span dir="ltr">Suspense</span>. <span dir="ltr">fetch</span> معمولی در <span dir="ltr">Effect</span> خودکار آن را فعال نمی‌کند.
30. **<span dir="ltr">Hydration</span> چیست؟** متصل کردن <span dir="ltr">React client</span> به <span dir="ltr">HTML</span> تولیدشده پیشین؛ خروجی اولیه باید سازگار باشد.
31. **<span dir="ltr">Server Component</span> چیست؟** <span dir="ltr">component</span>ی که در محیط جدا از <span dir="ltr">client</span> اجرا می‌شود و کد خودش برای اجرای <span dir="ltr">client</span> لازم نیست؛ با <span dir="ltr">SSR</span> یکی نیست و به زیرساخت سازگار نیاز دارد.

## نمونه سؤال کدنویسی

<div dir="ltr" align="left">

~~~jsx
// در handler یک render با count = 0:
setCount(count + 1);
setCount(count + 1);
// مقدار بعدی: 1
~~~

</div>

<div dir="ltr" align="left">

~~~jsx
setCount(c => c + 1);
setCount(c => c + 1);
// از صفر: مقدار بعدی 2
~~~

</div>

توضیح بده چرا در اولی دو بار مقدار ۱ درخواست شده و در دومی دو تبدیل پشت‌سرهم داریم.

## تمرین با پاسخ

برای فیلتر کردن <span dir="ltr">products</span> با <span dir="ltr">query</span>، یک <span dir="ltr">Effect</span> که <span dir="ltr">filtered</span> را <span dir="ltr">set</span> کند لازم است؟

<details>
<summary>پاسخ</summary>

معمولاً نه؛ <span dir="ltr">filtered</span> را در <span dir="ltr">render</span> از <span dir="ltr">products</span> و <span dir="ltr">query</span> محاسبه کن. اگر هزینه واقعی بالا بود، <span dir="ltr">memoization</span> را پس از اندازه‌گیری بررسی کن.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# React Interview Questions

## Rendering and state

1. What triggers a render?
2. Render vs commit?
3. Does every render update the DOM?
4. What is reconciliation?
5. How does component identity work?
6. Why are keys important?
7. Why are index keys risky?
8. Why is state still old immediately after a setter?
9. What is batching?
10. When use functional updates?
11. What is derived state?
12. Controlled vs uncontrolled?

## Effects and refs

13. What problem should `useEffect` solve?
14. Why cleanup?
15. What is a stale closure?
16. `useEffect` vs `useLayoutEffect`?
17. `useRef` vs `useState`?
18. Does a ref persist?
19. Why doesn't ref mutation re-render?

## Performance

20. `memo` vs `useMemo` vs `useCallback`?
21. When is memoization useless/harmful?
22. How optimize a huge list?
23. Pagination vs virtualization?
24. `useTransition` vs `useDeferredValue`?
25. What does React Compiler change?

## Architecture

26. Context vs Redux/Zustand?
27. Server state vs client state?
28. Why can a giant context cause broad renders?
29. What is Suspense?
30. What is hydration?
31. What are Server Components?

</div>

</details>

</div>
