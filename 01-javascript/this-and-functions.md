<div dir="rtl" align="right">

# <span dir="ltr">this</span> به چه کسی اشاره می‌کند؟ — تابع معمولی و <span dir="ltr">Arrow Function</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** تابع، <span dir="ltr">object</span> و [<span dir="ltr">Lexical Scope</span>](./scope-closure-hoisting.md).

## مسئله اصلی

متغیرهای معمولی را با <span dir="ltr">Scope</span> پیدا می‌کنیم؛ اما <span dir="ltr">this</span> در تابع معمولی بیشتر به **شیوه فراخوانی** وابسته است. حفظ کردن اینکه «<span dir="ltr">this</span> همیشه خود شیء است» باعث خطا می‌شود.

<div dir="ltr" align="left">

~~~js
const user = {
  name: 'Sara',
  greet() { return this.name; },
};
console.log(user.greet()); // Sara
~~~

</div>

در فراخوانی <span dir="ltr">user.greet</span>() گیرنده فراخوانی <span dir="ltr">user</span> است. اگر همان تابع را جدا کنی، این شکل فراخوانی از بین می‌رود:

<div dir="ltr" align="left">

~~~js
'use strict';
function inspect() { return this; }
console.log(inspect()); // undefined
~~~

</div>

در <span dir="ltr">strict mode</span>، فراخوانی مستقل تابع معمولی <span dir="ltr">this</span> برابر <span dir="ltr">undefined</span> دارد. در کد غیر <span dir="ltr">strict</span> رفتار متفاوتی ممکن است دیده شود؛ ماژول‌های <span dir="ltr">ESM</span> به‌طور خودکار <span dir="ltr">strict</span> هستند.

## <span dir="ltr">call</span> و <span dir="ltr">apply</span> و <span dir="ltr">bind</span>

<div dir="ltr" align="left">

~~~js
function greet(prefix, suffix) {
  return prefix + this.name + suffix;
}
const person = { name: 'Ali' };
console.log(greet.call(person, 'Hi ', '!'));    // Hi Ali!
console.log(greet.apply(person, ['Hi ', '!'])); // Hi Ali!
const bound = greet.bind(person, 'Hello ');
console.log(bound('?')); // Hello Ali?
~~~

</div>

<span dir="ltr">call</span> و <span dir="ltr">apply</span> همین حالا تابع را اجرا می‌کنند؛ فرقشان نحوه ارسال آرگومان‌هاست. <span dir="ltr">bind</span> تابع جدیدی با <span dir="ltr">this</span> تثبیت‌شده می‌سازد و لزوماً همان لحظه آن را اجرا نمی‌کند.

## <span dir="ltr">Arrow Function</span> از محیط بیرونی <span dir="ltr">this</span> می‌گیرد

<div dir="ltr" align="left">

~~~js
const counter = {
  value: 3,
  readLater() {
    return () => this.value;
  },
};
const read = counter.readLater();
console.log(read()); // 3
~~~

</div>

<span dir="ltr">readLater</span> به شکل متد صدا زده شده، پس <span dir="ltr">this</span> آن <span dir="ltr">counter</span> است. تابع <span dir="ltr">arrow</span> همان <span dir="ltr">this</span> محیط بیرونی را استفاده می‌کند؛ <span dir="ltr">this</span> مستقل خودش را ندارد. <span dir="ltr">call</span> یا <span dir="ltr">bind</span> نمی‌تواند <span dir="ltr">this</span> یک <span dir="ltr">arrow</span> را دوباره تعیین کند.

اگر <span dir="ltr">greet</span> را مستقیماً به شکل <span dir="ltr">arrow</span> داخل <span dir="ltr">object</span> بنویسی، <span dir="ltr">this</span> آن از <span dir="ltr">object literal</span> گرفته نمی‌شود؛ <span dir="ltr">object literal</span> محیط <span dir="ltr">this</span> تازه ایجاد نمی‌کند. به همین دلیل <span dir="ltr">arrow</span> جایگزین همیشگی متد نیست.

## <span dir="ltr">new</span> چه کاری انجام می‌دهد؟

<div dir="ltr" align="left">

~~~js
function User(name) {
  this.name = name;
}
const sara = new User('Sara');
console.log(sara.name); // Sara
~~~

</div>

به‌صورت ساده: شیء تازه ساخته می‌شود، <span dir="ltr">prototype</span> آن به <span dir="ltr">User.prototype</span> وصل می‌شود، تابع با <span dir="ltr">this</span> آن شیء اجرا می‌شود و معمولاً همان شیء برمی‌گردد. اگر <span dir="ltr">constructor</span> صریحاً یک <span dir="ltr">object</span> برگرداند، آن <span dir="ltr">object</span> می‌تواند نتیجه <span dir="ltr">new</span> شود. <span dir="ltr">Arrow function</span> را نمی‌توان با <span dir="ltr">new</span> صدا زد.

## پاسخ مصاحبه و تمرین

**تفاوت اصلی <span dir="ltr">arrow</span> و <span dir="ltr">function</span>؟** علاوه بر <span dir="ltr">syntax</span>، <span dir="ltr">arrow</span>، <span dir="ltr">this</span> و <span dir="ltr">arguments</span> مستقل ندارد و <span dir="ltr">constructor</span> نیست؛ <span dir="ltr">function</span> معمولی این قابلیت‌ها را دارد.

<div dir="ltr" align="left">

~~~js
const team = { name: 'Frontend' };
function getName() { return this.name; }
const fixed = getName.bind(team);
console.log(fixed.call({ name: 'Other' }));
~~~

</div>

<details>
<summary>پاسخ</summary>

<span dir="ltr">Frontend</span> چاپ می‌شود. <span dir="ltr">this</span> تابع <span dir="ltr">bound</span> با <span dir="ltr">call</span> بعدی عوض نمی‌شود.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# `this` & Functions

## Normal-function `this`

For normal functions, `this` depends mainly on how the function is called.

```js
const user = {
  name: 'Mohammad',
  print() {
    console.log(this.name);
  },
};

user.print();
```

## Detached methods

```js
const print = user.print;
print();
```

The original object is no longer the call receiver, so `this` is not automatically `user`.

## `call`, `apply`, `bind`

```js
fn.call(context, a, b);
fn.apply(context, [a, b]);
const bound = fn.bind(context);
```

`bind` returns a new function.

## Arrow functions

Arrow functions do not create their own `this`; they capture lexical `this`.

```js
const obj = {
  name: 'A',
  delayed() {
    setTimeout(() => console.log(this.name), 0);
  },
};
```

Arrows also do not have their own `arguments` and cannot be used as constructors with `new`.

## Function forms

```js
function declaration() {}
const expression = function () {};
const arrow = () => {};
```

Declarations and expressions differ in initialization/hoisting behavior.

## Interview questions

1. How is `this` determined?
2. Why can a detached method lose its `this`?
3. `call` vs `apply` vs `bind`?
4. Arrow vs normal function?
5. Can arrow functions be constructors?

</div>

</details>

</div>
