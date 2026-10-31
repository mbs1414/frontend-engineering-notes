<div dir="rtl" align="right">

# وقتی چند تیم مستقل یک محصول می‌سازند — <span dir="ltr">Microfrontends</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [معماری <span dir="ltr">frontend</span>](./frontend-architecture.md) و [<span dir="ltr">Build</span>](../14-build-tools/build-process-and-vite.md).

<span dir="ltr">Microfrontend</span> برنامه را به بخش‌هایی با <span dir="ltr">ownership</span> و امکان تحویل مستقل تقسیم می‌کند. مسئله اصلی اغلب مرز تیم و انتشار است؛ زیاد بودن تعداد <span dir="ltr">component</span>ها به‌تنهایی دلیل کافی نیست.

## مثال اول: مرز قابلیت

<div dir="ltr" align="left">

~~~text
Shell: ناوبری و قراردادهای مشترک
Catalog: جست‌وجو و محصول
Checkout: سفارش و پرداخت
Account: پروفایل و تاریخچه
~~~

</div>

اگر هر تغییر <span dir="ltr">Catalog</span> مجبور به انتشار همه بخش‌ها باشد، استقلال فقط در اسم پوشه‌هاست. قرارداد <span dir="ltr">routing</span>، <span dir="ltr">session</span>، <span dir="ltr">event</span> و نسخه <span dir="ltr">shared dependency</span>ها باید مشخص باشد.

## مثال دوم: راه‌های ترکیب

<span dir="ltr">iframe</span> جداسازی زیادی می‌دهد ولی ارتباط و تجربه یکپارچه هزینه دارد. ترکیب هنگام <span dir="ltr">build</span> ساده‌تر است ولی استقلال انتشار محدودتر می‌شود. ترکیب <span dir="ltr">runtime</span> یا <span dir="ltr">Module Federation</span> امکانات دیگری می‌دهد و به مدیریت نسخه، خطا و بارگذاری نیاز دارد.

<span dir="ltr">CSS</span> مشترک، چند نسخه <span dir="ltr">React</span>، <span dir="ltr">bundle</span> تکراری، تست بین بخش‌ها و تجربه کاربری ناهماهنگ از هزینه‌ها هستند.

## پاسخ مصاحبه و تمرین

برای تیم سه‌نفره و محصول کوچک، <span dir="ltr">microfrontend</span> انتخاب پیش‌فرض خوبی است؟

<details>
<summary>پاسخ</summary>

معمولاً ابتدا <span dir="ltr">modular monolith</span> با مرزهای روشن کافی است. استقلال تیم‌ها و انتشار باید آن‌قدر ارزش داشته باشد که پیچیدگی <span dir="ltr">integration</span> را توجیه کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Microfrontends

## Idea

Split a large frontend into independently owned/deployed application slices with explicit integration boundaries.

Strongest justification is usually organizational scale and release independence, not technical fashion.

## Integration styles

Possible approaches include:

- build-time packages
- runtime composition
- server composition
- iframes for constrained cases
- Module Federation/runtime module sharing

## Module Federation

One implementation technique for loading/sharing modules across separately built applications. It is not the definition of microfrontends.

## Costs

- duplicate dependencies
- inconsistent design
- routing complexity
- auth/session coordination
- cross-app communication
- version conflicts
- larger bundles
- harder local development/debugging

## Good signals

- multiple autonomous teams
- independent release cadence matters
- clear bounded product domains
- coordination in a frontend monolith is the bottleneck

Weak signal: the project has twelve pages and someone wants an architecture diagram with more boxes.

## Interview questions

1. Why use microfrontends?
2. Main costs?
3. What is Module Federation?
4. When should you avoid microfrontends?

</div>

</details>

</div>
