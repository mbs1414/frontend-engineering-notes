<div dir="rtl" align="right">

# یک تابع برای چند نوع، با حفظ ارتباط — <span dir="ltr">Generics</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [انواع پایه](./fundamentals.md) و [<span dir="ltr">Narrowing</span>](./narrowing-and-type-guards.md).

## <span dir="ltr">Generic</span> چه مشکلی را حل می‌کند؟

تابعی می‌خواهیم که اولین عضو آرایه را بدهد. اگر <span dir="ltr">any</span> بنویسیم، رابطه بین ورودی و خروجی را از دست می‌دهیم. <span dir="ltr">T</span> یک نام موقت برای نوع است؛ مثل پارامتر تابع، ولی برای <span dir="ltr">type checker</span>.

<div dir="ltr" align="left">

~~~ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}
const firstName = first(['Sara', 'Ali']); // string | undefined
const id = first([10, 20]);         // number | undefined
~~~

</div>

نوع خروجی از نوع اعضای ورودی پیروی می‌کند. <span dir="ltr">undefined</span> را هم نگه داشتیم چون آرایه ممکن است خالی باشد.

## محدودیت روی نوع — <span dir="ltr">Constraint</span>

<div dir="ltr" align="left">

~~~ts
function getId<T extends { id: number }>(item: T) {
  return item.id;
}
getId({ id: 1, name: 'Sara' }); // 1
// getId({ name: 'Sara' }); // خطا: id ندارد
~~~

</div>

<span dir="ltr">extends</span> اینجا می‌گوید <span dir="ltr">T</span> باید حداقل <span dir="ltr">id</span> عددی داشته باشد؛ به معنی اجبار به ارث‌بری از یک کلاس نیست.

## <span dir="ltr">keyof</span> و ارتباط کلید با خروجی

<div dir="ltr" align="left">

~~~ts
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
const person = { name: 'Sara', age: 24 };
const age = getProperty(person, 'age'); // number
// getProperty(person, 'phone'); // خطا
~~~

</div>

<span dir="ltr">keyof</span> کلیدهای مجاز را می‌دهد. <span dir="ltr">T</span>[<span dir="ltr">K</span>] نوع <span dir="ltr">property</span> انتخاب‌شده است. <span dir="ltr">generic</span> اینجا فقط برای «قابل استفاده مجدد بودن» نیست؛ ارتباط دقیق کلید و مقدار را هم حفظ می‌کند.

## ابزارهای پرکاربرد

<div dir="ltr" align="left">

~~~ts
type User = { id: number; name: string; email: string };
type UserPreview = Pick<User, 'id' | 'name'>;
type NewUser = Omit<User, 'id'>;
type UserPatch = Partial<NewUser>;
type ReadonlyUser = Readonly<User>;
~~~

</div>

<span dir="ltr">Pick</span> چند <span dir="ltr">property</span> را انتخاب می‌کند؛ <span dir="ltr">Omit</span> حذفشان می‌کند؛ <span dir="ltr">Partial</span> همه را اختیاری می‌کند. <span dir="ltr">Readonly</span> در سطح <span dir="ltr">type</span> جلوی <span dir="ltr">assignment</span> را می‌گیرد و خودبه‌خود <span dir="ltr">deep freeze</span> نیست. <span dir="ltr">Required</span> اختیاری بودن را برمی‌دارد؛ <span dir="ltr">ReturnType</span> و <span dir="ltr">Parameters</span> خروجی و پارامترهای تابع را استخراج می‌کنند؛ <span dir="ltr">Awaited</span> نوع نتیجه انتظار برای <span dir="ltr">Promise</span> را مدل می‌کند.

## مباحث مرحله دوم

<div dir="ltr" align="left">

~~~ts
type Optional<T> = { [K in keyof T]?: T[K] };
type ArrayElement<T> = T extends Array<infer Item> ? Item : T;
type NumberItem = ArrayElement<number[]>; // number
~~~

</div>

اولی **<span dir="ltr">Mapped Type</span>** است: روی کلیدهای یک نوع حرکت می‌کند. دومی **<span dir="ltr">Conditional Type</span>** است: بر اساس شکل نوع تصمیم می‌گیرد. <span dir="ltr">infer</span> نوع داخل آرایه را استخراج می‌کند. فعلاً لازم نیست این‌ها را حفظ کنی؛ اول مثال <span dir="ltr">getProperty</span> را خودت توضیح بده.

## پاسخ مصاحبه و تمرین

**<span dir="ltr">Generic</span> جای اعتبارسنجی <span dir="ltr">API</span> را می‌گیرد؟** خیر. <span dir="ltr">`fetchJson0()`</span> می‌تواند نوع ادعایی بدهد، ولی ساختار پاسخ واقعی باید جدا بررسی شود.

برای فرم ویرایش که <span dir="ltr">name</span> و <span dir="ltr">email</span> هر دو می‌توانند حذف شوند، چه نوعی مناسب است؟

<details>
<summary>پاسخ</summary>

<span dir="ltr">`Partial0>`</span>. این فقط شکل مجاز داده در <span dir="ltr">TypeScript</span> را تعیین می‌کند؛ قواعد اعتبار داده همچنان جدا هستند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Generics & Advanced Types

## Generics

Generics preserve relationships between types without falling back to `any`.

```ts
function identity<T>(value: T): T {
  return value;
}
```

## Constraints

```ts
function getId<T extends { id: string | number }>(value: T) {
  return value.id;
}
```

## `keyof` and indexed access

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

## Utility types

High-value utilities:

```ts
Partial<T>
Required<T>
Readonly<T>
Pick<T, K>
Omit<T, K>
Record<K, V>
ReturnType<T>
Parameters<T>
Awaited<T>
```

## Mapped types

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

## Conditional types

```ts
type ElementType<T> = T extends (infer U)[] ? U : T;
```

## Generic React APIs

Generics are useful for reusable tables, selects, hooks, fetch clients, and form abstractions where input/output relationships must remain typed.

## Runtime validation still matters

TypeScript does not prove that API JSON matches a declared type. Validate external data at runtime when correctness or security matters.

## Interview questions

1. Why use a generic instead of `any`?
2. What is a generic constraint?
3. What does `keyof` do?
4. `Pick` vs `Omit`?
5. Why doesn't TypeScript replace runtime validation?

## Generics in reusable data-fetching code

A generic hook is a useful teaching example because the relationship between the requested resource and returned data stays typed. In production, a server-state library may own caching/refetching, but the TypeScript idea remains valuable.

## Course notes: Generic Type Parameters and Generic Data Fetching Hook

⬅️ Previous Topic: [TypeScript Index Signatures](./index-signatures-and-record.md)

🏠 Home: [README](../README.md)

---

## Overview

As applications grow, creating a separate custom hook for every resource becomes repetitive.

Example:

```ts
useMovies()
useGenres()
useActors()
useReviews()
```

All of these hooks often perform the same task:

1. Fetch data
2. Handle loading state
3. Handle errors
4. Return results

Instead of duplicating code, we can create a single reusable hook using **TypeScript Generics**.

---

## The Problem

Without generics, we might write:

```ts
const useMovies = () => { ... }
const useGenres = () => { ... }
const useActors = () => { ... }
```

Most of the code is identical.

Only the data type changes.

This violates the DRY principle:

```text
Don't Repeat Yourself
```

---

## What Are Generics?

Generics allow us to write code that works with multiple types while maintaining type safety.

Think of a generic as a placeholder.

Example:

```ts
function identity<T>(value: T): T {
  return value
}
```

Here:

```ts
T
```

means:

```text
"I don't know the type yet.
The caller will tell me."
```

---

## Generic Example

```ts
function identity<T>(value: T): T {
  return value
}
```

Usage:

```ts
identity<string>("Hello")
identity<number>(10)
identity<boolean>(true)
```

TypeScript automatically understands:

```ts
const name = identity<string>("John")
```

Result:

```ts
string
```

---

## Understanding T

By convention:

```ts
T
```

stands for:

```text
Type
```

You may also see:

```ts
TData
TItem
TValue
TResponse
```

These are simply more descriptive names.

---

## Generic Arrays

Instead of:

```ts
Movie[]
```

we can write:

```ts
T[]
```

Meaning:

```text
An array of any type.
```

Examples:

```ts
Movie[]
Genre[]
Actor[]
Review[]
```

---

## Generic useData Hook

```ts
const useData = <T>(endpoint: string) => {
```

This tells TypeScript:

```text
This hook works with any data type.
```

The caller decides what T is.

---

## State Declaration

```ts
const [data, setData] = useState<T[]>([])
```

Without generics:

```ts
const [movies, setMovies] = useState<Movie[]>([])
```

With generics:

```ts
const [data, setData] = useState<T[]>([])
```

Now the hook can store:

```ts
Movie[]
Genre[]
Actor[]
Platform[]
```

or any other resource.

---

## Generic API Request

```ts
apiClient.get<T[]>(endpoint)
```

This tells Axios:

```text
The API response contains an array of T.
```

Examples:

```ts
apiClient.get<Movie[]>("movies")
```

or

```ts
apiClient.get<Genre[]>("genres")
```

depending on how the hook is used.

---

## Complete Hook

```ts
const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState("")
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    apiClient
      .get<T[]>(endpoint, {
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((error) => {
        if (error instanceof CanceledError) return

        setError(error.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { data, error, isLoading }
}
```

---

## Using the Hook With Movies

Movie interface:

```ts
interface Movie {
  id: number
  title: string
}
```

Usage:

```ts
const { data: movies, error, isLoading } = useData<Movie>("movies")
```

TypeScript now knows:

```ts
movies
```

is:

```ts
Movie[]
```

---

## Using the Hook With Genres

```ts
interface Genre {
  id: number
  name: string
}
```

Usage:

```ts
const { data: genres } = useData<Genre>("genres")
```

TypeScript understands:

```ts
genres
```

is:

```ts
Genre[]
```

without creating a new hook.

---

## Why This Is Powerful

One hook can now fetch:

```text
Movies
Genres
Actors
Reviews
Platforms
Users
Comments
```

while maintaining full type safety.

---

## Type Safety Example

Movie interface:

```ts
interface Movie {
  title: string
}
```

Usage:

```ts
const { data: movies } = useData<Movie>("movies")
```

Valid:

```ts
movies[0].title
```

Error:

```ts
movies[0].unknownProperty
```

TypeScript catches mistakes before runtime.

---

## Real Movie Hub Architecture

Instead of:

```text
useMovies()
useGenres()
usePlatforms()
useActors()
```

You can build:

```text
useData<T>()
```

and then create lightweight wrappers:

```ts
const useMovies = () => useData<Movie>("movies")
```

```ts
const useGenres = () => useData<Genre>("genres")
```

These wrappers remain tiny and reusable.

---

## Common Mistake #1

Incorrect:

```ts
const useData = (endpoint: string) => {
  const [data, setData] = useState<T[]>([])
}
```

Error:

```text
Cannot find name 'T'
```

Because TypeScript doesn't know what T is.

You must declare it:

```ts
const useData = <T>(endpoint: string) => {
```

---

## Common Mistake #2

Forgetting Axios Generic

Incorrect:

```ts
apiClient.get(endpoint)
```

Then TypeScript falls back to:

```ts
any
```

You lose type safety.

Always write:

```ts
apiClient.get<T[]>(endpoint)
```

---

## Key Takeaway

Generics allow us to write reusable code while preserving type safety.

```ts
const useData = <T>(endpoint: string)
```

means:

```text
Create a hook that can fetch any type of data.
```

The caller supplies the type:

```ts
useData<Movie>("movies")
useData<Genre>("genres")
useData<Actor>("actors")
```

This is one of the most important TypeScript patterns used in professional React applications.

### Important correction

If a custom effect depends on an `endpoint`, `id`, filters, or other external values, those values belong in the effect dependency model. A hard-coded empty dependency array means the effect will not rerun when those inputs change.

</div>

</details>

</div>
