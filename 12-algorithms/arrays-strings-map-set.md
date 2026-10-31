<div dir="rtl" align="right">

# انتخاب ساختار داده — <span dir="ltr">Array</span>، <span dir="ltr">String</span>، <span dir="ltr">Map</span> و <span dir="ltr">Set</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Big O</span>](./big-o.md).

آرایه برای ترتیب و <span dir="ltr">index</span> مناسب است. <span dir="ltr">Set</span> برای عضویت و یکتایی، <span dir="ltr">Map</span> برای نگاشت کلید به مقدار. انتخاب درست می‌تواند یک جست‌وجوی تکراری را حذف کند.

## مثال اول: حذف تکراری‌ها

<div dir="ltr" align="left">

~~~js
const unique = [...new Set([1, 2, 1, 3])];
console.log(unique); // [1, 2, 3]
console.log(new Set([{ id: 1 }, { id: 1 }]).size); // 2
~~~

</div>

دو <span dir="ltr">object</span> مستقل با <span dir="ltr">id</span> یکسان، از نظر هویت یکسان نیستند. برای حذف تکرار بر اساس <span dir="ltr">id</span> باید همان <span dir="ltr">id</span> را کلید قرار دهی.

## مثال دوم: شمارش تکرار

<div dir="ltr" align="left">

~~~js
function frequencies(words) {
  const counts = new Map();
  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}
console.log(frequencies(['a', 'b', 'a']).get('a')); // 2
~~~

</div>

با فرض هزینه متوسط مناسب برای عملیات <span dir="ltr">Map</span>، پیمایش در مدل معمول <span dir="ltr">O</span>(<span dir="ltr">n</span>) است. مشخصات زبان برای همه پیاده‌سازی‌ها «دسترسی <span dir="ltr">hash</span> با زمان دقیق ثابت» تضمین نمی‌کند.

<span dir="ltr">String</span> در <span dir="ltr">JavaScript</span> بر پایه <span dir="ltr">UTF-16</span> است؛ <span dir="ltr">length</span> همیشه تعداد نویسه‌های قابل مشاهده برای انسان نیست. برای <span dir="ltr">emoji</span> و متن ترکیبی، قرارداد مسئله را روشن کن. <span dir="ltr">sort</span> آرایه را تغییر می‌دهد؛ برای ترتیب عددی <span dir="ltr">comparator</span> مثل <span dir="ltr">`(a, b) => a - b`</span> لازم است.

## پاسخ مصاحبه و تمرین

برای بررسی تکراری بودن یک شناسه در هر قدم، آرایه و <span dir="ltr">includes</span> تکراری بهتر است یا <span dir="ltr">Set</span>؟

<details>
<summary>پاسخ</summary>

در ورودی بزرگ، <span dir="ltr">Set</span> معمولاً انتخاب مناسب‌تری است چون جست‌وجوی خطی برای هر عضو را حذف می‌کند. هزینه حافظه مجموعه را هم بگو.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Arrays, Strings, Map & Set

## Arrays

Know common mutating methods:

```text
push, pop, splice, sort, reverse
```

Common non-mutating transformations:

```text
map, filter, slice, concat
```

Modern runtimes also provide copy-returning methods such as `toSorted`, `toReversed`, and `toSpliced`.

## Strings

Strings are immutable. Common problem patterns include frequency counting, two pointers, sliding windows, and parsing.

## Map

```js
const users = new Map();
users.set(user.id, user);
users.get(id);
```

Useful for explicit dictionaries and repeated lookup.

## Set

```js
const ids = new Set(items.map(item => item.id));
```

Useful for:

- deduplication
- membership checks
- visited-node tracking

## Frequency map

```js
function frequencies(values) {
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}
```

## Practice

- Two Sum
- duplicate detection
- Group Anagrams
- first non-repeating character
- array intersection

</div>

</details>

</div>
