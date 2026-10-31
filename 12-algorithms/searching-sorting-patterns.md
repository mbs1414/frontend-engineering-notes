<div dir="rtl" align="right">

# از جست‌وجوی ساده تا نصف کردن مسئله — <span dir="ltr">Search Patterns</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Big O</span>](./big-o.md) و آرایه.

جست‌وجوی خطی اعضا را یکی‌یکی می‌بیند و <span dir="ltr">O</span>(<span dir="ltr">n</span>) است. جست‌وجوی دودویی (**<span dir="ltr">Binary Search</span>**) در داده مرتب، هر مرحله نصف گزینه‌ها را کنار می‌گذارد.

## مثال اول: <span dir="ltr">Binary Search</span>

<div dir="ltr" align="left">

~~~js
function binarySearch(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (numbers[middle] === target) return middle;
    if (numbers[middle] < target) left = middle + 1;
    else right = middle - 1;
  }
  return -1;
}
console.log(binarySearch([2, 4, 6, 8, 10], 8)); // 3
console.log(binarySearch([], 8)); // -1
~~~

</div>

اول ۶ را می‌بینیم؛ ۸ بزرگ‌تر است، پس نیمه چپ حذف می‌شود. زمان <span dir="ltr">O</span>(<span dir="ltr">log n</span>) و فضای کمکی این نسخه <span dir="ltr">O</span>(1) است. ورودی باید با همان ترتیب مقایسه مرتب باشد.

## مثال دوم: الگو را از نشانه مسئله بشناس

| نشانه | الگوی قابل بررسی |
| --- | --- |
| دو سر آرایه مرتب | <span dir="ltr">Two Pointers</span> |
| بازه پیوسته از رشته یا آرایه | <span dir="ltr">Sliding Window</span> |
| جمع بازه‌های متعدد | <span dir="ltr">Prefix Sum</span> |
| پیدا کردن مقدار مکمل یا شمارش | <span dir="ltr">Map</span> / <span dir="ltr">Hashing</span> |

این‌ها نسخه حفظی نیستند. مثلاً <span dir="ltr">sliding window</span> با جمع و اعداد منفی به همان سادگی همه مسائل اعداد مثبت کار نمی‌کند؛ <span dir="ltr">invariant</span> الگوریتم را بررسی کن.

## پاسخ مصاحبه و تمرین

برای یک بار جست‌وجو در آرایه نامرتب، اول <span dir="ltr">sort</span> و بعد <span dir="ltr">binary search</span> همیشه بهتر است؟

<details>
<summary>پاسخ</summary>

خیر. هزینه مرتب‌سازی را هم حساب کن. برای یک جست‌وجو، پیمایش خطی ممکن است ساده‌تر و کم‌هزینه‌تر باشد؛ تعداد <span dir="ltr">query</span>ها مهم است.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Searching, Sorting & Common Patterns

## Linear search

O(n): inspect values until found.

## Binary search

Requires an order where halving the search space is valid.

```js
function binarySearch(values, target) {
  let left = 0;
  let right = values.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (values[mid] === target) return mid;
    if (values[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

Time: O(log n).

## Sorting

Understand comparators, mutation, and typical O(n log n) comparison-sort expectations.

```js
const sorted = [...users].sort((a, b) => a.age - b.age);
```

## Hashing

Use Map/Set to trade memory for fast lookup.

## Two pointers

Two indices move through data, useful for sorted-pair problems, palindromes, and merges.

## Sliding window

Track a contiguous range without recomputing the whole range each step.

Classic use: longest substring without repeated characters.

## Prefix sums

Precompute cumulative totals to answer many range-sum queries quickly.

## Interview questions

1. When can binary search be used?
2. What problem shape suggests sliding window?
3. Why use two pointers instead of nested loops?
4. Does `Array.sort` mutate?

</div>

</details>

</div>
