<div dir="rtl" align="right">

# وقتی کلیدهای <span dir="ltr">object</span> ثابت نیستند — <span dir="ltr">Index Signature</span> و <span dir="ltr">Record</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** <span dir="ltr">object</span> و [انواع <span dir="ltr">TypeScript</span>](./fundamentals.md).

## مسئله: قیمت‌ها را با شناسه پیدا کنیم

در آرایه برای پیدا کردن محصول باید جست‌وجو کنیم؛ گاهی یک دیکشنری با کلید شناسه مناسب‌تر است. نام همه کلیدها را از قبل نمی‌دانیم، ولی نوع مقدارشان را می‌دانیم.

<div dir="ltr" align="left">

~~~ts
type Prices = { [productId: string]: number };
const prices: Prices = { book: 100, pen: 20 };
console.log(prices.book); // 100
~~~

</div>

این <span dir="ltr">syntax</span> یک **<span dir="ltr">Index Signature</span>** است. <span dir="ltr">`Record0`</span> هم شکل مشابهی بیان می‌کند. اما دقت کن: تضمین نمی‌کند برای هر رشته دلخواه واقعاً داده‌ای در <span dir="ltr">runtime</span> وجود دارد.

<div dir="ltr" align="left">

~~~ts
type Products = Record<string, { title: string } | undefined>;
const products: Products = { p1: { title: 'Book' } };
console.log(products['missing']?.title); // undefined
~~~

</div>

با احتمال <span dir="ltr">undefined</span> صریح برخورد کردیم. تنظیم <span dir="ltr">noUncheckedIndexedAccess</span> هم می‌تواند نبودن مقدار هنگام دسترسی با <span dir="ltr">index</span> را در <span dir="ltr">type checking</span> آشکارتر کند.

## وقتی مجموعه کلیدها معلوم است

<div dir="ltr" align="left">

~~~ts
type Status = 'loading' | 'success' | 'error';
const labels: Record<Status, string> = {
  loading: 'در حال دریافت',
  success: 'آماده',
  error: 'خطا',
};
~~~

</div>

اینجا هر سه کلید لازم‌اند؛ حذف <span dir="ltr">error</span> خطای <span dir="ltr">type</span> می‌دهد. این با <span dir="ltr">Record</span><string, string> که دامنه کلید باز دارد فرق دارد.

## اشتباه رایج و پاسخ مصاحبه

اگر یک <span dir="ltr">index signature</span> رشته‌ای برای <span dir="ltr">number</span> تعریف کنی، <span dir="ltr">property</span>های رشته‌ای صریح همان <span dir="ltr">object</span> هم باید با آن سازگار باشند. برای مدل دارای نام رشته‌ای و جدول عددی، معمولاً جدول را در <span dir="ltr">property</span> جدا بگذار.

**<span dir="ltr">Record</span> یا <span dir="ltr">Map</span>؟** <span dir="ltr">Record</span> یک ابزار <span dir="ltr">type</span> برای <span dir="ltr">object</span> است. <span dir="ltr">Map</span> ساختار <span dir="ltr">runtime</span> با <span dir="ltr">API</span> و امکان کلیدهای متنوع است؛ این دو در یک سطح قرار ندارند.

## تمرین با پاسخ

برای جدولی که فقط بخشی از <span dir="ltr">status</span>ها در آن وجود دارند چه می‌نویسی؟

<details>
<summary>پاسخ</summary>

<span dir="ltr">`Partial0>`</span>. کلیدها محدودند ولی اختیاری‌اند، پس هنگام خواندن احتمال <span dir="ltr">undefined</span> را بررسی می‌کنیم.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Index Signatures and `Record`

Index signatures describe object types whose property names are not all known ahead of time.

```ts
type Scores = {
  [playerName: string]: number;
};
```

Prefer a more precise object type when the keys are known. An index signature is appropriate when the key space is genuinely dynamic.

`Record<K, V>` is often a clearer alternative:

```ts
type Scores = Record<string, number>;
```

Be careful with broad string index signatures: explicit properties must also be compatible with the index-signature value type.

## Course notes: TypeScript Index Signatures

### What Problem Does It Solve?

Sometimes we don't know all property names in advance.

Example:

```ts
const genres = {
  action: 120,
  comedy: 80,
  drama: 95,
}
```

Here the keys (`action`, `comedy`, `drama`) could be dynamic.

TypeScript needs a way to describe:

> "This object can have any string key, but the values must be numbers."

That's where **index signatures** come in.

---

## Basic Syntax

```ts
interface GenreCount {
  [key: string]: number
}
```

Meaning:

- Any property name is allowed
- Property names must be strings
- Property values must be numbers

Example:

```ts
const genres: GenreCount = {
  action: 120,
  comedy: 80,
  drama: 95,
}
```

Valid because every value is a number.

---

## Invalid Example

```ts
const genres: GenreCount = {
  action: 120,
  comedy: "many",
}
```

Error:

```text
Type 'string' is not assignable to type 'number'
```

because every value must be a number.

---

## Reading Properties

```ts
interface GenreCount {
  [key: string]: number
}

const genres: GenreCount = {
  action: 120,
}

console.log(genres["action"])
```

Output:

```text
120
```

---

## Number Index Signatures

You can also use numbers as keys.

```ts
interface MovieList {
  [index: number]: string
}
```

Example:

```ts
const movies: MovieList = {
  0: "Inception",
  1: "Interstellar",
  2: "Tenet",
}
```

---

## Combining Explicit Properties

You can mix known properties with an index signature.

```ts
interface Ratings {
  imdb: number
  [site: string]: number
}
```

Example:

```ts
const ratings: Ratings = {
  imdb: 8.8,
  rottenTomatoes: 87,
  metacritic: 74,
}
```

---

## Common React Example

Suppose an API returns validation errors.

```json
{
  "title": ["Required"],
  "year": ["Must be a number"]
}
```

You don't know the field names ahead of time.

Use:

```ts
interface ValidationErrors {
  [field: string]: string[]
}
```

Example:

```ts
const errors: ValidationErrors = {
  title: ["Required"],
  year: ["Must be a number"],
}
```

---

## Record vs Index Signature

These are equivalent:

```ts
interface GenreCount {
  [key: string]: number
}
```

and

```ts
type GenreCount = Record<string, number>
```

Many developers prefer:

```ts
Record<string, number>
```

because it's shorter.

---

## Real Movie Hub Example

Imagine a movie grouped by language.

```ts
interface MoviesByLanguage {
  [language: string]: string[]
}
```

Example:

```ts
const movies: MoviesByLanguage = {
  English: ["Inception", "Interstellar"],
  Korean: ["Parasite"],
  Japanese: ["Your Name"],
}
```

---

## When to Use Index Signatures

Use them when:

✅ Property names are unknown beforehand

✅ Keys are generated dynamically

✅ API responses have varying fields

✅ Creating lookup tables

Examples:

- Form validation errors
- Genre mappings
- Language mappings
- Cached API responses

---

## Key Takeaway

```ts
interface Example {
  [key: string]: ValueType
}
```

means:

> "This object can have any string key, and every value must be ValueType."

Examples:

```ts
[key: string]: number;
[key: string]: string;
[key: string]: Movie;
[key: string]: Movie[];
```

Index signatures are TypeScript's way of typing objects whose property names are not known ahead of time.

## Interview questions

1. When is an index signature appropriate?
2. How does `Record<K, V>` differ from an index signature?
3. Why can `[key: string]: any` destroy useful type safety?

</div>

</details>

</div>
