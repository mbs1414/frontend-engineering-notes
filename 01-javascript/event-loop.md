<div dir="rtl" align="right">

# چرا <span dir="ltr">Promise</span> قبل از تایمر اجرا می‌شود؟ — <span dir="ltr">Event Loop</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Call Stack</span>](./execution-context.md). مثال‌ها برای مرورگر هستند؛ جزئیات زمان‌بندی <span dir="ltr">Node.js</span> می‌تواند متفاوت باشد.

## اول مسئله را ببین

مرورگر باید هم کد اجرا کند، هم به کلیک جواب بدهد و هم صفحه را بکشد. اگر منتظر تمام شدن شبکه بماند، صفحه هنگ می‌کند. <span dir="ltr">API</span>هایی مثل <span dir="ltr">fetch</span> و <span dir="ltr">timer</span> امکان می‌دهند کار ثبت شود و ادامه کد اجرا شود. <span dir="ltr">callback</span> آماده‌شده هم نمی‌تواند وسط اجرای عادی کد فعلی بپرد.

<span dir="ltr">Event Loop</span> هماهنگ می‌کند کارهای صف‌شده چه زمانی نوبت اجرا بگیرند. این به معنی اجرای هم‌زمان همه کدهای <span dir="ltr">JavaScript</span> روی یک <span dir="ltr">stack</span> نیست.

## سه مفهوم لازم

| مفهوم | معنی ساده | نمونه |
| --- | --- | --- |
| <span dir="ltr">Call Stack</span> | تابع‌هایی که همین حالا در حال اجرا هستند | اجرای یک <span dir="ltr">handler</span> |
| <span dir="ltr">Task</span> | یک نوبت اجرای کار | <span dir="ltr">callback</span> تایمر یا رویداد |
| <span dir="ltr">Microtask</span> | کاری که در <span dir="ltr">checkpoint</span> مربوط به <span dir="ltr">microtask</span>ها پردازش می‌شود | <span dir="ltr">callback</span> مربوط به <span dir="ltr">then</span> |

در مدل ساده این درس، بعد از تمام شدن <span dir="ltr">task</span> فعلی، <span dir="ltr">microtask</span>های صف‌شده تخلیه می‌شوند؛ سپس مرورگر فرصت پردازش کارهای دیگر و احتمالاً <span dir="ltr">rendering</span> دارد. بعد از هر <span dir="ltr">task</span> الزاماً یک <span dir="ltr">paint</span> اتفاق نمی‌افتد و همه <span dir="ltr">task</span>ها هم یک صف واحد جهانی ندارند.

## مثال اول، خط‌به‌خط

<div dir="ltr" align="left">

~~~js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
~~~

</div>

خروجی:

<div dir="ltr" align="left">

~~~text
A
D
C
B
~~~

</div>

۱. <span dir="ltr">A</span> همین حالا چاپ می‌شود.
۲. <span dir="ltr">timer</span> ثبت می‌شود. صفر بودن <span dir="ltr">delay</span> یعنی اجرای فوری تضمین نشده است.
۳. چون <span dir="ltr">Promise</span> از قبل <span dir="ltr">fulfilled</span> است، <span dir="ltr">callback</span> مربوط به <span dir="ltr">then</span> به صف <span dir="ltr">microtask</span> می‌رود.
۴. <span dir="ltr">D</span> همین حالا چاپ می‌شود.
۵. اجرای فعلی تمام می‌شود؛ <span dir="ltr">C</span> در مرحله <span dir="ltr">microtask</span> اجرا می‌شود.
۶. بعداً نوبت <span dir="ltr">task</span> مربوط به <span dir="ltr">timer</span> می‌رسد و <span dir="ltr">B</span> چاپ می‌شود.

## مثال دوم: <span dir="ltr">microtask</span> می‌تواند <span dir="ltr">microtask</span> تازه بسازد

<div dir="ltr" align="left">

~~~js
Promise.resolve().then(() => {
  console.log(1);
  queueMicrotask(() => console.log(2));
});
setTimeout(() => console.log(3), 0);
~~~

</div>

خروجی ۱، ۲، ۳ است. صف <span dir="ltr">microtask</span> تا خالی شدن پردازش می‌شود. اگر بی‌پایان <span dir="ltr">microtask</span> بسازی، می‌توانی نوبت رسیدن به کارهای دیگر را عقب بیندازی.

## <span dir="ltr">await</span> دقیقاً کجا وقفه ایجاد می‌کند؟

<div dir="ltr" align="left">

~~~js
async function run() {
  console.log('inside-before');
  await Promise.resolve();
  console.log('inside-after');
}
console.log('start');
run();
console.log('end');
~~~

</div>

خروجی:

<div dir="ltr" align="left">

~~~text
start
inside-before
end
inside-after
~~~

</div>

تابع <span dir="ltr">async</span> تا رسیدن به <span dir="ltr">await</span> عادی اجرا می‌شود. ادامه همان تابع بعداً از مسیر <span dir="ltr">Promise</span> اجرا می‌شود؛ بقیه برنامه متوقف نمی‌شود. <span dir="ltr">async</span> کردن یک محاسبه سنگین هم خودبه‌خود آن را به <span dir="ltr">thread</span> دیگری منتقل نمی‌کند.

## ارتباط با تجربه کاربر

اگر یک حلقه ۳۰۰ میلی‌ثانیه <span dir="ltr">main thread</span> را مشغول کند، <span dir="ltr">callback</span> کلیک و بعضی کارهای نمایش باید منتظر بمانند. نتیجه می‌تواند تأخیر در واکنش صفحه باشد. بسته به نوع کار می‌توان آن را خرد کرد یا محاسبه مناسب را به <span dir="ltr">Web Worker</span> منتقل کرد.

## پاسخ مصاحبه و اشتباه رایج

**آیا <span dir="ltr">Promise</span> همیشه از <span dir="ltr">timer</span> زودتر تمام می‌شود؟** خیر؛ آماده شدن نتیجه شبکه با اولویت صف فرق دارد. در مثال اول <span dir="ltr">Promise</span> از قبل <span dir="ltr">resolve</span> شده بود. <span dir="ltr">Promise</span> یک درخواست کند ممکن است خیلی بعد از یک <span dir="ltr">timer</span> آماده شود.

## تمرین با پاسخ

<div dir="ltr" align="left">

~~~js
console.log(1);
setTimeout(() => console.log(2), 0);
queueMicrotask(() => console.log(3));
console.log(4);
~~~

</div>

<details>
<summary>ترتیب خروجی و دلیل</summary>

۱، ۴، ۳، ۲. ابتدا اجرای <span dir="ltr">synchronous</span>، سپس <span dir="ltr">microtask</span>، سپس <span dir="ltr">task</span> تایمر. برای پاسخ مصاحبه فقط اعداد را نگو؛ توضیح بده هر خط در کدام مرحله قرار می‌گیرد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# JavaScript Event Loop

## Why it exists

Browser JavaScript typically executes on a main thread, while browser APIs handle timers, networking, events, and other asynchronous work. The event loop coordinates when queued callbacks can run.

## Simplified model

```text
Call Stack
   ↑
Event Loop
   ↑
Task Queue / Microtask Queue
   ↑
Browser APIs
```

This is a mental model, not a literal full browser architecture diagram.

## Tasks (often called macrotasks)

Examples include timer callbacks and DOM event callbacks.

## Microtasks

Examples include Promise reactions and `queueMicrotask` callbacks.

After the current task finishes, queued microtasks are drained before the next task runs and before an eligible rendering opportunity.

## Classic example

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

Output:

```text
A
D
C
B
```

Reason:

1. `A` is synchronous.
2. Timer callback becomes a future task.
3. Promise callback becomes a microtask.
4. `D` is synchronous.
5. Current task ends.
6. Microtasks run (`C`).
7. Later task runs (`B`).

## `async/await`

`await` pauses that async function's continuation. The continuation resumes asynchronously through Promise/microtask machinery.

```js
async function run() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}

console.log(3);
run();
console.log(4);
```

Output:

```text
3
1
4
2
```

## Rendering connection

Long tasks delay input processing and rendering. This directly affects perceived responsiveness and can hurt INP.

## Interview questions

1. Task vs microtask?
2. Why does Promise usually run before `setTimeout(..., 0)`?
3. Does a zero-delay timer run immediately?
4. Where does execution resume after `await`?
5. How can long tasks hurt frontend performance?

</div>

</details>

</div>
