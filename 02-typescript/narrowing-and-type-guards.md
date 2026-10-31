<div dir="rtl" align="right">

# محدود کردن نوع با بررسی واقعی — <span dir="ltr">Narrowing</span> و <span dir="ltr">Type Guard</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Union</span> و <span dir="ltr">unknown</span>](./fundamentals.md).

## چرا بررسی نوع لازم است؟

اگر مقدار ممکن است <span dir="ltr">string</span> یا <span dir="ltr">number</span> باشد، نمی‌توانی بدون بررسی متد مخصوص <span dir="ltr">string</span> را صدا بزنی. **<span dir="ltr">Narrowing</span>** یعنی <span dir="ltr">type checker</span> از شرط‌های کد می‌فهمد در یک شاخه، گزینه‌های کمتری ممکن است.

<div dir="ltr" align="left">

~~~ts
function format(value: string | number) {
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  return value.toUpperCase();
}
console.log(format(12));    // "12.00"
console.log(format('sara')); // "SARA"
~~~

</div>

پس از <span dir="ltr">return</span> شاخه اول، در ادامه فقط <span dir="ltr">string</span> باقی می‌ماند. برای آرایه از <span dir="ltr">Array.isArray</span>، برای بعضی <span dir="ltr">object</span>ها از <span dir="ltr">in</span> یا <span dir="ltr">instanceof</span> استفاده می‌کنیم؛ هرکدام کاربرد و محدودیت خودش را دارد.

## مثال دوم: حالت‌های درخواست را درست مدل کن

<div dir="ltr" align="left">

~~~ts
type Result =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };

function describe(result: Result) {
  switch (result.status) {
    case 'loading': return 'Loading';
    case 'success': return result.data.join(', ');
    case 'error': return result.message;
    default: {
      const impossible: never = result;
      return impossible;
    }
  }
}
~~~

</div>

<span dir="ltr">status</span> نقش برچسب مشترک یا **<span dir="ltr">Discriminant</span>** دارد. در شاخه <span dir="ltr">success</span>، <span dir="ltr">data</span> حتماً وجود دارد. این طراحی از ترکیب‌های نامعتبر مثل «موفق ولی بدون داده» جلوگیری می‌کند. <span dir="ltr">never</span> هم کمک می‌کند اضافه شدن حالت جدیدِ رسیدگی‌نشده دیده شود.

## <span dir="ltr">Type Guard</span> سفارشی

<div dir="ltr" align="left">

~~~ts
function isUser(value: unknown): value is { name: string } {
  return typeof value === 'object'
    && value !== null
    && 'name' in value
    && typeof value.name === 'string';
}
~~~

</div>

<span dir="ltr">`value is ...`</span> یک ادعا درباره نتیجه بررسی است. <span dir="ltr">TypeScript</span> صحت کامل منطق این ادعا را اثبات نمی‌کند؛ اگر <span dir="ltr">guard</span> ناقص بنویسی، اطمینان کاذب می‌گیری. <span dir="ltr">null</span> باید جدا حذف شود چون <span dir="ltr">typeof</span> آن <span dir="ltr">object</span> است.

## پاسخ مصاحبه و تمرین

**چرا <span dir="ltr">`if (value)`</span> همیشه بررسی مناسبی نیست؟** چون ۰ و رشته خالی هم <span dir="ltr">falsy</span> هستند، ولی شاید ورودی معتبر باشند.

برای مقداری با نوع <span dir="ltr">`number | null`</span> که صفر هم معتبر است چه شرطی می‌نویسی؟

<details>
<summary>پاسخ</summary>

<span dir="ltr">`value !== null`</span>. این شرط فقط <span dir="ltr">null</span> را کنار می‌گذارد و عدد صفر را حفظ می‌کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Narrowing & Type Guards

## Narrowing

Narrowing reduces a broad type to a more specific type based on runtime checks TypeScript understands.

```ts
function format(value: string | number) {
  if (typeof value === 'string') {
    return value.trim();
  }
  return value.toFixed(2);
}
```

## Common techniques

- `typeof`
- `instanceof`
- `in`
- equality/discriminant checks
- user-defined type guards

## Discriminated unions

```ts
type Result =
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: Error };

function render(result: Result) {
  if (result.status === 'success') {
    return result.data;
  }
  return result.error.message;
}
```

This pattern is excellent for modeling UI states safely.

## User-defined guard

```ts
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value;
}
```

A type guard is only as trustworthy as its actual runtime checks.

## Exhaustiveness

Use `never` to catch forgotten variants in switches.

```ts
function assertNever(value: never): never {
  throw new Error('Unexpected value');
}
```

## Interview questions

1. What is narrowing?
2. What is a discriminated union?
3. Type guard vs type assertion?
4. How can `never` help exhaustiveness?

</div>

</details>

</div>
