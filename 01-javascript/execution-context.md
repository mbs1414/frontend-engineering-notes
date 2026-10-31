<div dir="rtl" align="right">

# اجرای تابع‌ها را دنبال کنیم — <span dir="ltr">Execution Context</span> و <span dir="ltr">Call Stack</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Scope</span>](./scope-closure-hoisting.md).

## مسئله چیست؟

وقتی یک تابع تابع دیگری را صدا می‌زند، موتور چطور می‌فهمد بعد از پایان تابع دوم باید کجا برگردد؟ با نگه داشتن سابقه فراخوانی‌ها در **<span dir="ltr">Call Stack</span>**.

هر فراخوانی تابع، اطلاعات اجرای خودش را دارد؛ از جمله پارامترها، متغیرهای محلی و ارتباط با محیط بیرونی. به این مجموعه اطلاعات **<span dir="ltr">Execution Context</span>** می‌گوییم. <span dir="ltr">context</span> را با خود تابع اشتباه نگیر: یک تابع می‌تواند چند بار فراخوانی شود و هر بار <span dir="ltr">context</span> تازه‌ای بسازد.

## یک مثال با ردگیری

<div dir="ltr" align="left">

~~~js
function double(number) {
  return number * 2;
}
function calculate() {
  const result = double(4);
  return result + 1;
}
console.log(calculate()); // 9
~~~

</div>

مسیر ساده‌شده:

<div dir="ltr" align="left">

~~~text
اجرای کد اصلی
  -> calculate وارد stack می‌شود
    -> double وارد stack می‌شود
    <- double مقدار 8 برمی‌گرداند و خارج می‌شود
  <- calculate مقدار 9 برمی‌گرداند و خارج می‌شود
  -> console.log عدد 9 را چاپ می‌کند
~~~

</div>

<span dir="ltr">Stack</span> ساختاری با قانون «آخرین ورودی، اولین خروجی» یا **<span dir="ltr">LIFO</span>** است. نمی‌توان <span dir="ltr">calculate</span> را تمام کرد در حالی که هنوز منتظر جواب <span dir="ltr">double</span> است.

## مثال دوم: هر فراخوانی متغیرهای خودش را دارد

<div dir="ltr" align="left">

~~~js
function greet(name) {
  const message = 'Hello ' + name;
  return message;
}
console.log(greet('Sara')); // Hello Sara
console.log(greet('Ali'));  // Hello Ali
~~~

</div>

متغیر <span dir="ltr">name</span> فراخوانی دوم، متغیر <span dir="ltr">name</span> فراخوانی اول نیست. این استقلال در <span dir="ltr">recursion</span> هم اهمیت دارد.

## بازگشت و پر شدن <span dir="ltr">stack</span>

<div dir="ltr" align="left">

~~~js
function countdown(n) {
  if (n === 0) return;
  console.log(n);
  countdown(n - 1);
}
countdown(3); // 3, 2, 1
~~~

</div>

برای <span dir="ltr">n</span>های ۳، ۲، ۱ و ۰ فراخوانی‌های جدا داریم. شرط <span dir="ltr">n</span> برابر صفر جلوی ادامه را می‌گیرد. بدون شرط پایان یا با عمق خیلی زیاد ممکن است خطای **<span dir="ltr">Maximum call stack size exceeded</span>** رخ دهد.

## <span dir="ltr">Stack</span> با <span dir="ltr">Scope</span> فرق دارد

<span dir="ltr">Stack</span> می‌گوید «الان چه تابعی اجرا می‌شود و بعد کجا برگردیم؟». <span dir="ltr">Scope</span> می‌گوید «این تابع از کجا متغیر پیدا می‌کند؟». اولی به مسیر فراخوانی مربوط است، دومی به محل تعریف کد.

## اشتباه رایج و پاسخ مصاحبه

**آیا <span dir="ltr">setTimeout</span> در <span dir="ltr">stack</span> منتظر می‌ماند؟** خیر. ثبت <span dir="ltr">timer</span> سریع تمام می‌شود؛ <span dir="ltr">callback</span> بعداً، وقتی امکان اجرای <span dir="ltr">task</span> آن فراهم شد، وارد <span dir="ltr">stack</span> می‌شود. در [<span dir="ltr">Event Loop</span>](./event-loop.md) ترتیبش را می‌بینیم.

## تمرین با پاسخ

اگر <span dir="ltr">a</span> تابع <span dir="ltr">b</span> را صدا بزند و <span dir="ltr">b</span> تابع <span dir="ltr">c</span> را، اولین تابعی که تمام می‌شود کدام است؟

<details>
<summary>پاسخ</summary>

اگر هر سه اجرای عادی و <span dir="ltr">synchronous</span> داشته باشند، <span dir="ltr">c</span> اول تمام می‌شود؛ سپس <span dir="ltr">b</span> و بعد <span dir="ltr">a</span>. مسیر برگشت برعکس مسیر ورود است.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Execution Context & Call Stack

## Execution context

An execution context is the environment in which JavaScript code is evaluated. Useful categories include global, module, and function execution contexts.

When a function is called, a function execution context is created for that invocation.

## Call stack

The call stack tracks active execution contexts using LIFO order.

```js
function third() { console.log('third'); }
function second() { third(); }
function first() { second(); }
first();
```

Conceptually:

```text
first
  second
    third
```

When `third` finishes, it leaves first, then `second`, then `first`.

## Stack overflow

Unbounded recursion eventually exhausts the call stack:

```js
function recurse() {
  recurse();
}
recurse();
```

## Why this matters in frontend

The call stack helps explain:

- synchronous blocking
- stack traces
- recursion
- event-loop behavior
- why long JavaScript tasks block input and rendering

## Long synchronous work

```js
const start = performance.now();
while (performance.now() - start < 3000) {
  // main thread blocked
}
```

During this time the browser cannot process many UI tasks normally.

## Interview questions

1. What does the call stack contain?
2. What is stack overflow?
3. How is the stack related to the event loop?
4. Why can synchronous JavaScript freeze the UI?

</div>

</details>

</div>
