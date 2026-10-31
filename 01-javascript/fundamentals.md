<div dir="rtl" align="right">

# مبانی جاوااسکریپت — مقدار، نوع و کپی کردن (<span dir="ltr">JavaScript Fundamentals</span>)

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** آشنایی ابتدایی با متغیر و تابع. مثال‌های این درس را می‌توانی جداگانه در <span dir="ltr">Console</span> مرورگر اجرا کنی.

## از یک مسئله شروع کنیم

دو متغیر ساخته‌ای و یکی را تغییر می‌دهی. گاهی دیگری هم تغییر می‌کند؛ گاهی نه. برای فهمیدن دلیل، باید فرق «خود مقدار» و «ارجاع به یک شیء» را بشناسی.

مقادیر ساده یا **<span dir="ltr">Primitive</span>** شامل <span dir="ltr">`string`</span>، <span dir="ltr">`number`</span>، <span dir="ltr">`boolean`</span>، <span dir="ltr">`undefined`</span>، <span dir="ltr">`null`</span>، <span dir="ltr">`bigint`</span> و <span dir="ltr">`symbol`</span> هستند. آرایه، تابع و شیء معمولی از نوع <span dir="ltr">object</span> هستند. <span dir="ltr">`null`</span> یک <span dir="ltr">primitive</span> است، حتی با اینکه <span dir="ltr">`typeof null`</span> به دلیل رفتاری تاریخی، <span dir="ltr">`"object"`</span> می‌دهد.

## مثال اول: کپی مقدار ساده

<div dir="ltr" align="left">

~~~js
let score = 10;
let nextScore = score;
nextScore = 20;
console.log(score);     // 10
console.log(nextScore); // 20
~~~

</div>

در خط دوم، مقدار ۱۰ کپی می‌شود. دو متغیر مستقل داریم؛ تغییر یکی، مقدار دیگری را عوض نمی‌کند.

## مثال دوم: دو ارجاع به یک شیء

<div dir="ltr" align="left">

~~~js
const user = { name: 'Sara' };
const selectedUser = user;
selectedUser.name = 'Ali';
console.log(user.name);          // Ali
console.log(user === selectedUser); // true
~~~

</div>

شیء جدیدی نساختیم. هر دو متغیر به همان شیء اشاره می‌کنند. مثل دو برگه با آدرس یک خانه: اگر خانه رنگ شود، هر دو آدرس همچنان به همان خانه می‌رسند.

<span dir="ltr">`const`</span> یعنی خود متغیر را دوباره مقداردهی نمی‌کنی؛ به معنی قفل شدن ویژگی‌های شیء نیست.

## آرگومان تابع چگونه منتقل می‌شود؟

<div dir="ltr" align="left">

~~~js
function change(user) {
  user.name = 'Mina';
  user = { name: 'Reza' };
}
const person = { name: 'Sara' };
change(person);
console.log(person.name); // Mina
~~~

</div>

پارامتر تابع یک **کپی از مقدار ارجاع** می‌گیرد. خط اول شیء مشترک را تغییر می‌دهد؛ خط دوم فقط پارامتر محلی را به شیء دیگری وصل می‌کند. پس جمله دقیق مصاحبه این است: «جاوااسکریپت آرگومان‌ها را با مقدار منتقل می‌کند؛ مقدار یک متغیر شیئی، ارجاع به شیء است.»

## تغییر شیء و ساختن نسخه جدید

<span dir="ltr">`Mutation`</span> یعنی تغییر همان شیء. در به‌روزرسانی <span dir="ltr">immutable</span>، نسخه تازه‌ای می‌سازیم:

<div dir="ltr" align="left">

~~~js
const before = { name: 'Sara', age: 24 };
const after = { ...before, age: 25 };
console.log(before.age);      // 24
console.log(after.age);       // 25
console.log(before === after); // false
~~~

</div>

اما <span dir="ltr">spread</span> فقط یک **کپی سطحی (<span dir="ltr">Shallow Copy</span>)** می‌سازد:

<div dir="ltr" align="left">

~~~js
const original = { address: { city: 'Tehran' } };
const copy = { ...original };
copy.address.city = 'Shiraz';
console.log(original.address.city); // Shiraz
~~~

</div>

شیء بیرونی تازه است، ولی <span dir="ltr">address</span> هنوز مشترک است. برای تغییر مستقل شهر:

<div dir="ltr" align="left">

~~~js
const independent = {
  ...original,
  address: { ...original.address, city: 'Tabriz' },
};
~~~

</div>

<span dir="ltr">`structuredClone`</span> بسیاری از ساختارها را عمیق کپی می‌کند؛ همه‌چیز، از جمله تابع، قابل <span dir="ltr">clone</span> شدن نیست. تبدیل به <span dir="ltr">JSON</span> هم جایگزین عمومی کپی عمیق نیست.

## مقایسه و تبدیل نوع

<div dir="ltr" align="left">

~~~js
console.log(0 == false);           // true
console.log(0 === false);          // false
console.log({ id: 1 } === { id: 1 }); // false
console.log(NaN === NaN);          // false
console.log(Object.is(NaN, NaN));   // true
console.log(Object.is(0, -0));      // false
~~~

</div>

`==` ممکن است قبل از مقایسه نوع را تبدیل کند. `===` این تبدیل را انجام نمی‌دهد. دو شیء با محتوای مشابه لزوماً هویت یکسان ندارند. <span dir="ltr">React</span> برای بعضی مقایسه‌ها از <span dir="ltr">`Object.is`</span> استفاده می‌کند؛ فهم این موضوع بعداً در <span dir="ltr">state</span> و <span dir="ltr">dependency</span>ها کمک می‌کند.

## تابع مرتبه بالاتر و زمان اجرا

تابعی که تابع دیگری بگیرد یا برگرداند، **<span dir="ltr">Higher-order Function</span>** است:

<div dir="ltr" align="left">

~~~js
const prices = [100, 200];
const discounted = prices.map(price => price * 0.9);
console.log(discounted); // [90, 180]
~~~

</div>

در اینجا <span dir="ltr">`map`</span> یک تابع دریافت کرده است. خطای <span dir="ltr">`JSON.parse('hello')`</span> هنگام اجرا یا <span dir="ltr">runtime</span> رخ می‌دهد. خطای تایپ مثل نسبت دادن رشته به <span dir="ltr">number</span> در <span dir="ltr">TypeScript</span>، پیش از اجرا توسط <span dir="ltr">type checker</span> گزارش می‌شود؛ صرف استفاده از ابزار <span dir="ltr">build</span> تضمین نمی‌کند <span dir="ltr">type checking</span> هم انجام شود.

## پاسخ مصاحبه

**چرا تغییر مستقیم شیء در <span dir="ltr">React</span> مشکل‌ساز است؟** چون ممکن است همان ارجاع قبلی را به <span dir="ltr">setter</span> بدهیم و <span dir="ltr">React</span> تغییر مورد انتظار را تشخیص ندهد. نسخه جدید ساختن هم تشخیص تغییر و هم دنبال کردن تاریخچه داده را آسان‌تر می‌کند.

## تمرین با پاسخ

پیش از اجرا حدس بزن:

<div dir="ltr" align="left">

~~~js
const a = { list: [1] };
const b = { ...a };
b.list.push(2);
console.log(a.list);
~~~

</div>

<details>
<summary>پاسخ و دلیل</summary>

خروجی <span dir="ltr">`[1, 2]`</span> است. آرایه داخلی مشترک است. اگر بنویسی <span dir="ltr">`const b = { ...a, list: [...a.list] }`</span>، آرایه مستقل می‌شود و <span dir="ltr">push</span> دیگر آرایه <span dir="ltr">a</span> را تغییر نمی‌دهد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# JavaScript Fundamentals

## Values and types

Primitive values include `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, and `null`. Arrays, functions, dates, maps, sets, and ordinary records are objects.

## Primitive vs object behavior

Primitives are copied by value:

```js
let a = 10;
let b = a;
b = 20;
console.log(a); // 10
```

Object variables contain a reference value:

```js
const a = { count: 1 };
const b = a;
b.count = 2;
console.log(a.count); // 2
```

A precise interview answer is: **JavaScript passes arguments by value. For objects, the passed value is a reference to the object.**

## Equality

```js
0 == false;  // true because coercion occurs
0 === false; // false
```

Prefer `===` unless coercive equality is intentional.

`Object.is` differs for some edge cases:

```js
Object.is(NaN, NaN); // true
Object.is(0, -0);    // false
```

## Mutation and immutability

Mutation changes an existing object:

```js
user.name = 'Sara';
```

Immutable-style update creates a new object:

```js
const nextUser = { ...user, name: 'Sara' };
```

This matters in React because changed object identity is often used to represent changed state.

## Shallow copy

Spread is shallow:

```js
const original = { profile: { name: 'A' } };
const copy = { ...original };
copy.profile.name = 'B';
console.log(original.profile.name); // B
```

`structuredClone` can deeply clone many supported structures. JSON stringify/parse is not a universal deep-clone solution.

## Higher-order functions

A higher-order function receives a function, returns a function, or both.

```js
items.map(item => item.id);

function withLogging(fn) {
  return (...args) => {
    console.log(args);
    return fn(...args);
  };
}
```

## Runtime vs build/compile time

Runtime error:

```js
JSON.parse('not-json');
```

Type/build-time error:

```ts
const count: number = 'ten';
```

Modern frontend tooling can include type checking, transpilation, bundling, minification, and then browser runtime.

## Interview questions

1. Are objects passed by reference in JavaScript?
2. `==` vs `===` vs `Object.is`?
3. What is a shallow copy?
4. Why does object identity matter in React?
5. What is a higher-order function?

</div>

</details>

</div>
