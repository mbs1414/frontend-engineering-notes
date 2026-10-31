<div dir="rtl" align="right">

# تایپ‌اسکریپت از صفر — <span dir="ltr">TypeScript Fundamentals</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [مبانی <span dir="ltr">JavaScript</span>](../01-javascript/fundamentals.md). کدهای <span dir="ltr">ts</span> را در <span dir="ltr">TypeScript Playground</span> یا پروژه دارای <span dir="ltr">type checker</span> بررسی کن؛ <span dir="ltr">Console</span> مرورگر <span dir="ltr">syntax</span> تایپ‌ها را نمی‌فهمد.

## قرار است چه مشکلی حل شود؟

فرض کن تابع قیمت، عدد می‌خواهد ولی یک رشته می‌گیرد. <span dir="ltr">TypeScript</span> پیش از اجرا ناسازگاری را گزارش می‌کند:

<div dir="ltr" align="left">

~~~ts
function discount(price: number): number {
  return price * 0.9;
}
discount(100);   // 90
// discount('100'); // خطای بررسی نوع
~~~

</div>

<span dir="ltr">`price: number`</span> یعنی پارامتر باید عدد باشد؛ <span dir="ltr">`): number`</span> نوع خروجی را مشخص می‌کند. این <span dir="ltr">annotation</span>ها معمولاً از <span dir="ltr">JavaScript</span> خروجی حذف می‌شوند. پس <span dir="ltr">TypeScript</span> داده بدی را که از اینترنت می‌رسد خودکار اصلاح یا اعتبارسنجی نمی‌کند.

## همیشه لازم نیست نوع را بنویسی

<div dir="ltr" align="left">

~~~ts
let count = 1; // نوع number است
count = 2;
// count = 'two'; // خطا
const fixed = 1; // نوع literal برابر 1
~~~

</div>

حدس زدن نوع از روی مقدار **<span dir="ltr">Inference</span>** است. <span dir="ltr">const</span> برای <span dir="ltr">primitive</span> می‌تواند نوع دقیق‌تری از <span dir="ltr">let</span> داشته باشد. برای <span dir="ltr">property</span> یک <span dir="ltr">object</span> قابل تغییر، <span dir="ltr">widening</span> ممکن است رخ دهد.

## مدل کردن داده و انتخاب‌ها

<div dir="ltr" align="left">

~~~ts
interface User {
  id: number;
  name: string;
  email?: string;
}
type Status = 'idle' | 'loading' | 'success' | 'error';
const user: User = { id: 1, name: 'Sara' };
const requestStatus: Status = 'loading';
~~~

</div>

علامت ? یعنی <span dir="ltr">property</span> اختیاری است. علامت | یعنی یکی از این نوع‌ها؛ به آن **<span dir="ltr">Union</span>** می‌گوییم. <span dir="ltr">`A & B`</span> یعنی مقدار باید هر دو قرارداد را برآورده کند؛ این **<span dir="ltr">Intersection</span>** است.

<span dir="ltr">type</span> و <span dir="ltr">interface</span> هر دو برای شکل <span dir="ltr">object</span> مفیدند. <span dir="ltr">type</span> برای <span dir="ltr">union</span> هم کاربرد دارد؛ <span dir="ltr">interface</span> قابلیت <span dir="ltr">declaration merging</span> دارد. برای انتخاب بینشان قرارداد پروژه و نیاز واقعی مهم است.

## <span dir="ltr">any</span> و <span dir="ltr">unknown</span>

<div dir="ltr" align="left">

~~~ts
function print(value: unknown) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  }
}
~~~

</div>

<span dir="ltr">unknown</span> می‌گوید نوع را هنوز نمی‌دانم؛ قبل از استفاده بررسی کن. <span dir="ltr">any</span> اجازه می‌دهد بررسی مؤثر را دور بزنی. <span dir="ltr">void</span> معمولاً می‌گوید از مقدار برگشتی تابع استفاده معنادار نداریم؛ <span dir="ltr">never</span> نماینده حالتی است که نباید مقدار داشته باشد، مثلاً خروجی تابعی که همیشه <span dir="ltr">throw</span> می‌کند.

## <span dir="ltr">as const</span> و <span dir="ltr">satisfies</span>

<div dir="ltr" align="left">

~~~ts
const options = { method: 'GET' } as const;
const routes = {
  home: '/',
  users: '/users',
} satisfies Record<string, string>;
~~~

</div>

<span dir="ltr">as const</span> نوع <span dir="ltr">literal</span> را حفظ و <span dir="ltr">property</span>ها را در سطح <span dir="ltr">type readonly</span> می‌کند؛ <span dir="ltr">object</span> را در <span dir="ltr">runtime</span> فریز نمی‌کند. <span dir="ltr">satisfies</span> سازگاری با قرارداد را بررسی می‌کند و معمولاً <span dir="ltr">inference</span> مفید مقدار را نگه می‌دارد؛ اعتبارسنجی <span dir="ltr">runtime</span> نیست.

## پاسخ مصاحبه و تمرین

**آیا <span dir="ltr">`as User`</span> داده <span dir="ltr">API</span> را بررسی می‌کند؟** خیر؛ <span dir="ltr">assertion</span> فقط به <span dir="ltr">type checker</span> می‌گوید به ادعای ما اعتماد کند.

برای ورودی ناشناخته تابع، <span dir="ltr">any</span> بهتر است یا <span dir="ltr">unknown</span>؟

<details>
<summary>پاسخ</summary>

معمولاً <span dir="ltr">unknown</span>، چون مجبوری قبل از خواندن <span dir="ltr">property</span> یا فراخوانی متد، نوع و ساختار را بررسی کنی. <span dir="ltr">any</span> این محافظت را حذف می‌کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# TypeScript Fundamentals

## What TypeScript does

TypeScript adds static type analysis to JavaScript. Type information is generally erased before browser runtime.

## Inference

```ts
const count = 1; // inferred number
```

Prefer inference when the type is obvious.

## Union types

```ts
type Status = 'idle' | 'loading' | 'success' | 'error';
```

Useful for constrained UI/application states.

## Intersection types

```ts
type UserWithPermissions = User & Permissions;
```

## `type` vs `interface`

Both can describe object shapes. Important differences include declaration merging and some composition ergonomics. Neither is universally superior.

## `any`, `unknown`, `never`, `void`

- `any`: disables meaningful checking for that value.
- `unknown`: requires narrowing before unsafe operations.
- `never`: represents a value that should never occur.
- `void`: commonly represents a function whose return value is not meaningfully used.

```ts
function parse(value: unknown) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
}
```

## `as const`

```ts
const config = { method: 'GET' } as const;
```

Keeps the property as the literal type `'GET'` rather than widening to `string`.

## `satisfies`

```ts
const routes = {
  home: '/',
  users: '/users',
} satisfies Record<string, string>;
```

Checks compatibility while retaining useful inference.

## Interview questions

1. Why prefer `unknown` to `any` at unsafe boundaries?
2. Union vs intersection?
3. What is `never` useful for?
4. Does TypeScript validate runtime API data automatically?

</div>

</details>

</div>
