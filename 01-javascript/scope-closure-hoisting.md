<div dir="rtl" align="right">

# محدوده متغیر و حافظه تابع — <span dir="ltr">Scope</span>، <span dir="ltr">Hoisting</span> و <span dir="ltr">Closure</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [مقدار و متغیر](./fundamentals.md). این درس را در سه مرحله بخوان: پیدا کردن متغیر، زمان دسترسی، ماندن دسترسی بعد از پایان تابع.

## <span dir="ltr">Scope</span>: از کجا می‌توان متغیر را دید؟

فرض کن هر تابع یک اتاق است. از اتاق داخلی می‌توانی وسایل اتاق‌های بیرونی را ببینی، ولی از بیرون به متغیرهای خصوصی داخل دسترسی نداری. این فقط تشبیه است؛ در عمل موتور زبان محیط‌های متغیرها را نگه می‌دارد.

<div dir="ltr" align="left">

~~~js
const app = 'Shop';
function show() {
  const user = 'Sara';
  function print() {
    console.log(app, user);
  }
  print();
}
show(); // Shop Sara
~~~

</div>

برای پیدا کردن <span dir="ltr">user</span>، ابتدا داخل <span dir="ltr">print</span> جست‌وجو می‌شود؛ سپس محیط <span dir="ltr">show</span> و بعد محیط بیرونی. این مسیر **<span dir="ltr">Scope Chain</span>** است. محل نوشته شدن تابع مسیر را تعیین می‌کند؛ به این قاعده **<span dir="ltr">Lexical Scope</span>** می‌گویند.

<div dir="ltr" align="left">

~~~js
const name = 'global';
function read() { return name; }
function run() {
  const name = 'local';
  return read();
}
console.log(run()); // global
~~~

</div>

<span dir="ltr">read</span> در محیط بیرونی تعریف شده؛ فراخوانی آن از <span dir="ltr">run</span> مسیر جست‌وجویش را عوض نمی‌کند. اگر متغیر داخلی هم‌نام بیرونی باشد، داخلی آن را می‌پوشاند؛ این **<span dir="ltr">Shadowing</span>** است.

## <span dir="ltr">let</span> و <span dir="ltr">const</span> محدوده بلوک دارند

<div dir="ltr" align="left">

~~~js
if (true) {
  let inside = 1;
  var outside = 2;
}
console.log(outside); // 2
// console.log(inside); // ReferenceError
~~~

</div>

بلوک همان محدوده بین آکولادهاست. <span dir="ltr">var</span> در این مثال با <span dir="ltr">if</span> محدود نمی‌شود؛ معمولاً محدوده تابع دارد. <span dir="ltr">const</span> هم <span dir="ltr">block-scoped</span> است و برای مقداردهی مجدد مجاز نیست.

## <span dir="ltr">Hoisting</span>: چرا قبل از اعلان نتایج متفاوت داریم؟

موتور، پیش از اجرای خط‌های یک محدوده، <span dir="ltr">binding</span>های لازم را آماده می‌کند. کد واقعاً جابه‌جا نمی‌شود. «بالا بردن کد» فقط یک تعبیر آموزشی است.

<div dir="ltr" align="left">

~~~js
console.log(points); // undefined
var points = 10;
~~~

</div>

متغیر <span dir="ltr">var</span> زودتر ساخته و با <span dir="ltr">undefined</span> مقداردهی اولیه می‌شود؛ مقدار ۱۰ هنگام رسیدن اجرا به خط دوم قرار می‌گیرد.

<div dir="ltr" align="left">

~~~js
// این قطعه را جدا اجرا کن:
console.log(total); // ReferenceError
let total = 10;
~~~

</div>

<span dir="ltr">binding</span> مربوط به <span dir="ltr">let</span> هم وجود دارد، ولی تا رسیدن به اعلان قابل دسترسی نیست. این فاصله **<span dir="ltr">Temporal Dead Zone</span> / <span dir="ltr">TDZ</span>** است. <span dir="ltr">const</span> هم این رفتار را دارد.

<div dir="ltr" align="left">

~~~js
hello(); // hello
function hello() { console.log('hello'); }
~~~

</div>

<span dir="ltr">Function declaration</span> زودتر آماده می‌شود. اگر تابع را به یک متغیر <span dir="ltr">const</span> نسبت بدهی، قواعد <span dir="ltr">TDZ</span> همان متغیر برقرار است.

## <span dir="ltr">Closure</span>: دسترسی تابع با پایان تابع بیرونی از بین نمی‌رود

<div dir="ltr" align="left">

~~~js
function createCounter() {
  let count = 0;
  return function increment() {
    count += 1;
    return count;
  };
}
const first = createCounter();
console.log(first()); // 1
console.log(first()); // 2
const second = createCounter();
console.log(second()); // 1
~~~

</div>

۱. هر فراخوانی <span dir="ltr">createCounter</span> یک محیط تازه می‌سازد.
۲. تابع برگشتی به <span dir="ltr">count</span> همان محیط دسترسی دارد.
۳. حتی بعد از تمام شدن <span dir="ltr">createCounter</span>، این دسترسی باقی می‌ماند.
۴. <span dir="ltr">first</span> و <span dir="ltr">second</span> دو <span dir="ltr">count</span> مستقل دارند.

<span dir="ltr">Closure</span> یک عکس ثابت از مقدار متغیر نیست؛ به <span dir="ltr">binding</span> محیط خود دسترسی دارد. در <span dir="ltr">React</span> هر <span dir="ltr">render</span> محیط تازه‌ای می‌سازد؛ به همین دلیل <span dir="ltr">callback</span> قدیمی ممکن است هنوز مقدار <span dir="ltr">render</span> قدیمی را ببیند. به این وضعیت **<span dir="ltr">Stale Closure</span>** می‌گوییم.

## مثال کاربردی: ساختن تابع تخفیف

<div dir="ltr" align="left">

~~~js
function createDiscount(percent) {
  return price => price * (1 - percent / 100);
}
const studentPrice = createDiscount(20);
console.log(studentPrice(100)); // 80
console.log(studentPrice(250)); // 200
~~~

</div>

تابع برگشتی درصد ۲۰ را از محیط تعریفش می‌خواند؛ لازم نیست هر بار درصد را دوباره ارسال کنیم.

## پاسخ مصاحبه و اشتباه رایج

**<span dir="ltr">Closure</span> چیست؟** تابع همراه با دسترسی به محیط <span dir="ltr">lexical</span> محل ساخته شدنش. یک نمونه واقعی آن <span dir="ltr">event handler</span> یا تابع ساخته‌شده توسط <span dir="ltr">factory</span> است.

نگو «<span dir="ltr">let hoist</span> نمی‌شود». دقیق‌تر بگو <span dir="ltr">binding</span> آن زودتر ایجاد می‌شود، ولی پیش از <span dir="ltr">initialization</span> در <span dir="ltr">TDZ</span> قرار دارد.

## تمرین با پاسخ

<div dir="ltr" align="left">

~~~js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
~~~

</div>

<details>
<summary>خروجی چیست؟ اگر <span dir="ltr">var</span> را <span dir="ltr">let</span> کنیم چه می‌شود؟</summary>

با <span dir="ltr">var</span> خروجی سه بار ۳ است؛ <span dir="ltr">callback</span>ها همان <span dir="ltr">binding</span> مشترک <span dir="ltr">i</span> را می‌بینند و پس از تمام شدن حلقه اجرا می‌شوند. با <span dir="ltr">let</span> در این حلقه برای هر <span dir="ltr">iteration binding</span> جداگانه داریم، پس خروجی ۰، ۱ و ۲ می‌شود.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Scope, Hoisting, TDZ & Closures

## Lexical scope

JavaScript uses lexical scope. Visibility depends on where code is written.

```js
const globalValue = 1;

function outer() {
  const outerValue = 2;
  function inner() {
    console.log(globalValue, outerValue);
  }
  inner();
}
```

`inner` can access its own environment and outer lexical environments.

## Scope chain

Identifier lookup searches outward through lexical environments until a binding is found or the global boundary is reached.

## Shadowing

```js
const name = 'outer';
function print() {
  const name = 'inner';
  console.log(name); // inner
}
```

The inner binding shadows the outer one.

## Hoisting

"Hoisting" is a teaching term describing behavior caused by bindings being created during environment setup before normal statement execution.

### `var`

```js
console.log(value); // undefined
var value = 10;
```

The binding is initialized to `undefined` before the assignment executes.

### `let` and `const`

```js
console.log(value); // ReferenceError
const value = 10;
```

The binding exists but cannot be accessed before initialization. That region is the **Temporal Dead Zone (TDZ)**.

### Function declarations

```js
hello();
function hello() {
  console.log('hello');
}
```

Function declarations are initialized early enough to be called before their source position.

## Declaration vs assignment

```js
var count;  // declaration
count = 10; // assignment
```

The declaration/binding behavior occurs before normal execution; the later assignment does not.

## Closure

A closure exists when a function retains access to variables from the lexical environment where it was created.

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}

const counter = createCounter();
counter(); // 1
counter(); // 2
```

The outer function has finished, but the returned function still accesses `count`.

## Practical closure uses

- callbacks
- event handlers
- factory functions
- private state
- memoization
- timers
- React hooks

## Stale closures in React

A callback captures values from the render in which it was created.

```tsx
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

With an empty dependency array, this callback captures the initial `count`. React is not violating closure rules. Closure rules are merely being inconvenient with impressive consistency.

## Interview questions

1. What is hoisting really describing?
2. Why does `var` give `undefined` before declaration but `let` throws?
3. What is TDZ?
4. Define closure precisely.
5. What is a stale closure in React?

</div>

</details>

</div>
