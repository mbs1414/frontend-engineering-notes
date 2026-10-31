<div dir="rtl" align="right">

# اشتراک رفتار بین شیءها — <span dir="ltr">Prototype</span> و <span dir="ltr">Class</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** <span dir="ltr">object</span>، تابع و [<span dir="ltr">new</span> و <span dir="ltr">this</span>](./this-and-functions.md).

## چرا <span dir="ltr">prototype</span> داریم؟

صد کاربر داری که همه متد <span dir="ltr">greet</span> دارند. لازم نیست برای هر کاربر یک نسخه مستقل از تابع بسازی. می‌توان رفتار مشترک را در یک شیء دیگر نگه داشت و هنگام جست‌وجوی ویژگی به آن مراجعه کرد.

<div dir="ltr" align="left">

~~~js
const shared = {
  greet() { return 'Hi ' + this.name; },
};
const user = Object.create(shared);
user.name = 'Sara';
console.log(user.greet()); // Hi Sara
console.log(Object.hasOwn(user, 'greet')); // false
~~~

</div>

<span dir="ltr">user</span> خودش <span dir="ltr">greet</span> ندارد. موتور به <span dir="ltr">prototype</span> آن یعنی <span dir="ltr">shared</span> مراجعه می‌کند. هنگام فراخوانی <span dir="ltr">user.greet</span>()، <span dir="ltr">this</span> هنوز <span dir="ltr">user</span> است، پس <span dir="ltr">name</span> از <span dir="ltr">user</span> خوانده می‌شود.

زنجیره جست‌وجو را **<span dir="ltr">Prototype Chain</span>** می‌گویند. انتهای معمول این زنجیره <span dir="ltr">null</span> است. <span dir="ltr">prototype</span> با یک کپی کامل از ویژگی‌های والد فرق دارد؛ جست‌وجو هنگام دسترسی انجام می‌شود.

## ویژگی محلی می‌تواند ویژگی ارث‌رسیده را بپوشاند

<div dir="ltr" align="left">

~~~js
const base = { color: 'blue' };
const card = Object.create(base);
card.color = 'red';
console.log(card.color); // red
delete card.color;
console.log(card.color); // blue
~~~

</div>

حذف <span dir="ltr">color</span> محلی، <span dir="ltr">color</span> روی <span dir="ltr">base</span> را حذف نکرده است.

## <span dir="ltr">Class</span> همان رابطه را خواناتر می‌کند

<div dir="ltr" align="left">

~~~js
class User {
  constructor(name) { this.name = name; }
  greet() { return 'Hi ' + this.name; }
}
const a = new User('Sara');
const b = new User('Ali');
console.log(a.greet());             // Hi Sara
console.log(a.greet === b.greet);   // true
console.log(Object.getPrototypeOf(a) === User.prototype); // true
~~~

</div>

<span dir="ltr">name</span> برای هر <span dir="ltr">instance</span> جداست، ولی متد <span dir="ltr">greet</span> روی <span dir="ltr">User.prototype</span> قرار می‌گیرد و مشترک است. متدهایی که با <span dir="ltr">class field</span> به شکل <span dir="ltr">arrow</span> تعریف می‌شوند، معمولاً تابع جدا برای هر <span dir="ltr">instance</span> می‌سازند.

## <span dir="ltr">extends</span> و انتخاب طراحی

<div dir="ltr" align="left">

~~~js
class Admin extends User {
  canDelete() { return true; }
}
const admin = new Admin('Mina');
console.log(admin.greet());    // Hi Mina
console.log(admin.canDelete()); // true
~~~

</div>

رفتار <span dir="ltr">User</span> از مسیر <span dir="ltr">prototype</span> قابل دسترسی است. این مجوز فقط یک مثال زبانی است؛ مجوز واقعی حذف باید در سرور بررسی شود.

در طراحی واقعی، <span dir="ltr">inheritance</span> تنها انتخاب نیست. وقتی قابلیت‌ها مستقل‌اند، ترکیب چند تابع یا شیء کوچک (**<span dir="ltr">Composition</span>**) ممکن است از زنجیره طولانی کلاس‌ها روشن‌تر باشد.

## پاسخ مصاحبه و تمرین

**<span dir="ltr">prototype</span> و __<span dir="ltr">proto__</span> یکی‌اند؟** ویژگی <span dir="ltr">prototype</span> روی تابع‌های <span dir="ltr">constructor</span> در ساخت <span dir="ltr">instance</span> نقش دارد؛ <span dir="ltr">prototype</span> داخلی یک شیء رابطه جست‌وجوی آن شیء است. برای مشاهده رابطه از <span dir="ltr">Object.getPrototypeOf</span> استفاده کن.

اگر <span dir="ltr">a</span> خودش <span dir="ltr">greet</span> نداشته باشد ولی <span dir="ltr">prototype</span> آن داشته باشد، آیا <span dir="ltr">Object.hasOwn</span>(<span dir="ltr">a</span>, '<span dir="ltr">greet</span>') <span dir="ltr">true</span> می‌شود؟

<details>
<summary>پاسخ</summary>

خیر. <span dir="ltr">hasOwn</span> فقط ویژگی خود شیء را بررسی می‌کند. ولی <span dir="ltr">`'greet' in a`</span> می‌تواند <span dir="ltr">true</span> باشد چون زنجیره <span dir="ltr">prototype</span> را هم بررسی می‌کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Prototypes & Classes

## Prototype chain

Objects can delegate property lookup through a prototype chain.

```js
const animal = {
  speak() {
    return 'sound';
  },
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.speak();
```

If `speak` is not found on `dog`, lookup continues to its prototype.

## Constructor functions

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function () {
  return `Hi ${this.name}`;
};
```

`new User()` roughly creates an object, links it to `User.prototype`, calls the constructor with that object as `this`, then returns it unless another object is explicitly returned.

## Classes

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi ${this.name}`;
  }
}
```

Class syntax is built on JavaScript's prototype-based object model. Methods live on the prototype rather than being duplicated on every instance.

## Interview questions

1. What is the prototype chain?
2. Where are class methods stored?
3. What does `new` do?
4. Are JS classes separate from prototypes internally?

</div>

</details>

</div>
