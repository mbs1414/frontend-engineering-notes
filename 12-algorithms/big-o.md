<div dir="rtl" align="right">

# با بزرگ شدن ورودی چه اتفاقی می‌افتد؟ — <span dir="ltr">Big O</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** حلقه و آرایه در <span dir="ltr">JavaScript</span>.

<span dir="ltr">Big O</span> رشد هزینه نسبت به اندازه ورودی را توصیف می‌کند، نه زمان دقیق روی ساعت. وقتی می‌گوییم <span dir="ltr">O</span>(<span dir="ltr">n</span>)، منظور این است که با رشد <span dir="ltr">n</span>، هزینه در حد خطی رشد می‌کند؛ ضریب ثابت در این توصیف حذف می‌شود.

## مثال اول: یک عبور

<div dir="ltr" align="left">

~~~js
function sum(numbers) {
  let total = 0;
  for (const number of numbers) total += number;
  return total;
}
console.log(sum([2, 3, 4])); // 9
~~~

</div>

برای <span dir="ltr">n</span> عضو، <span dir="ltr">n</span> بار جمع داریم: زمان <span dir="ltr">O</span>(<span dir="ltr">n</span>). فقط چند متغیر اضافی داریم: فضای کمکی <span dir="ltr">O</span>(1). حافظه خود ورودی را معمولاً از فضای کمکی جدا حساب می‌کنیم.

## مثال دوم: همه جفت‌ها

<div dir="ltr" align="left">

~~~js
function countPairs(items) {
  let count = 0;
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) count++;
  }
  return count;
}
console.log(countPairs([1, 2, 3])); // 9
~~~

</div>

<span dir="ltr">n</span> ضربدر <span dir="ltr">n</span> تکرار داریم: <span dir="ltr">O</span>(<span dir="ltr">n</span>²). اما دو حلقه پشت‌سرهم هرکدام <span dir="ltr">n</span> بار، <span dir="ltr">O</span>(2<span dir="ltr">n</span>) و در نهایت <span dir="ltr">O</span>(<span dir="ltr">n</span>) هستند؛ صرف داشتن دو حلقه معیار نیست.

| رشد | نمونه |
| --- | --- |
| <span dir="ltr">O</span>(1) | دسترسی با <span dir="ltr">index</span> در مدل رایج آرایه |
| <span dir="ltr">O</span>(<span dir="ltr">log n</span>) | نصف کردن مکرر فضای جست‌وجو |
| <span dir="ltr">O</span>(<span dir="ltr">n</span>) | پیمایش همه اعضا |
| <span dir="ltr">O</span>(<span dir="ltr">n log n</span>) | بسیاری از الگوریتم‌های مرتب‌سازی مقایسه‌ای کارآمد |
| <span dir="ltr">O</span>(<span dir="ltr">n</span>²) | بررسی همه جفت‌ها |

## پاسخ مصاحبه و تمرین

آیا الگوریتم <span dir="ltr">O</span>(<span dir="ltr">n</span>) در هر اندازه‌ای از <span dir="ltr">O</span>(<span dir="ltr">n log n</span>) سریع‌تر است؟

<details>
<summary>پاسخ</summary>

خیر؛ ثابت‌ها، اندازه ورودی و محیط مهم‌اند. <span dir="ltr">Big O</span> رشد بلندمدت را توصیف می‌کند؛ اندازه‌گیری واقعی مکمل آن است.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Big O

## Why it matters

Big O describes how time or space requirements grow as input grows.

Frontend developers do not need competitive-programming obsession, but should notice when a 10,000-item transformation becomes quadratic.

## Common complexities

### O(1)

```js
map.get(id);
array[index];
```

### O(n)

```js
items.find(predicate);
items.map(mapper);
```

### O(log n)

Search space halves repeatedly, such as binary search.

### O(n log n)

Common efficient comparison-sort complexity class.

### O(n²)

```js
for (const a of items) {
  for (const b of items) {
    // ...
  }
}
```

## Real frontend example

Potential repeated scan:

```js
users.map(user => ({
  ...user,
  role: roles.find(role => role.id === user.roleId),
}));
```

Build a lookup map:

```js
const roleById = new Map(roles.map(role => [role.id, role]));

const result = users.map(user => ({
  ...user,
  role: roleById.get(user.roleId),
}));
```

This trades extra memory for faster repeated lookup.

## Interview questions

1. What does Big O describe?
2. O(n) vs O(n²)?
3. Why use a Map for repeated lookup?
4. Give a time-space tradeoff example.

</div>

</details>

</div>
