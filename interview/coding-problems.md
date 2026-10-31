<div dir="rtl" align="right">

# مصاحبه کدنویسی — مسئله، راه‌حل و تحلیل

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Big O</span>](../12-algorithms/big-o.md)، [<span dir="ltr">Map</span> و <span dir="ltr">Set</span>](../12-algorithms/arrays-strings-map-set.md). قبل از دیدن راه‌حل، ورودی/خروجی و مرزها را خودت بنویس.

## مسئله اول: <span dir="ltr">Two Sum</span>

آرایه و <span dir="ltr">target</span> می‌گیریم؛ <span dir="ltr">index</span> دو عضو متفاوت که مجموعشان <span dir="ltr">target</span> است را برگردان. فرض کن وجود جواب تضمین نشده است.

<div dir="ltr" align="left">

~~~js
function twoSum(numbers, target) {
  const seen = new Map();
  for (let i = 0; i < numbers.length; i++) {
    const needed = target - numbers[i];
    if (seen.has(needed)) return [seen.get(needed), i];
    seen.set(numbers[i], i);
  }
  return null;
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 3], 6));         // [0, 1]
~~~

</div>

روش ساده همه جفت‌ها را می‌بیند: <span dir="ltr">O</span>(<span dir="ltr">n</span>²). اینجا مقدارهای قبلی را نگه می‌داریم و دنبال مکمل می‌گردیم؛ زمان متوسط در مدل معمول <span dir="ltr">Map</span> برابر <span dir="ltr">O</span>(<span dir="ltr">n</span>) و فضای کمکی <span dir="ltr">O</span>(<span dir="ltr">n</span>) است. بررسی پیش از ذخیره باعث می‌شود همان عضو را دوبار استفاده نکنیم.

## مسئله دوم: پرانتزهای معتبر

قرارداد این نسخه فقط رشته شامل ()[]{} است؛ کاراکتر دیگر نامعتبر است.

<div dir="ltr" align="left">

~~~js
function validBrackets(text) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const char of text) {
    if ('([{'.includes(char)) stack.push(char);
    else if (Object.hasOwn(pairs, char)) {
      if (stack.pop() !== pairs[char]) return false;
    } else return false;
  }
  return stack.length === 0;
}
console.log(validBrackets('([])')); // true
console.log(validBrackets('([)]')); // false
console.log(validBrackets(''));     // true
~~~

</div>

آخرین پرانتز باز باید اول بسته شود؛ پس <span dir="ltr">Stack</span> مناسب است. زمان <span dir="ltr">O</span>(<span dir="ltr">n</span>) و فضای بدترین حالت <span dir="ltr">O</span>(<span dir="ltr">n</span>) است. خالی بودن <span dir="ltr">stack</span> هنگام بسته شدن هم با مقایسه <span dir="ltr">undefined</span> رد می‌شود.

## مسیر تمرین بعدی

1. [<span dir="ltr">Binary Search</span>](../12-algorithms/searching-sorting-patterns.md) و [<span dir="ltr">DFS/BFS</span>](../12-algorithms/trees-and-graphs.md).
2. [<span dir="ltr">Debounce</span> و <span dir="ltr">Promise.all</span> آموزشی](../12-algorithms/frontend-coding-exercises.md).
3. <span dir="ltr">Group Anagrams</span>: کلمات با کلید مرتب‌شده یا شمارش حروف گروه شوند؛ قواعد حروف و <span dir="ltr">Unicode</span> را مشخص کن.
4. <span dir="ltr">Longest Substring</span>: با <span dir="ltr">sliding window</span> و آخرین محل دیده‌شدن کاراکتر، پنجره بدون تکرار نگه دار.
5. <span dir="ltr">Merge Intervals</span>: بازه‌ها را با شروع مرتب کن و هم‌پوشان‌ها را ادغام کن؛ قرارداد تماس مرزها را روشن کن.
6. <span dir="ltr">Autocomplete</span>: <span dir="ltr">state</span> ورودی، <span dir="ltr">debounce</span>، <span dir="ltr">cancellation</span>، نتیجه منسوخ و رفتار صفحه‌کلید را طراحی کن.
7. <span dir="ltr">Undo/redo</span>: <span dir="ltr">history</span> گذشته و آینده را با دو <span dir="ltr">stack</span> مدل کن؛ ویرایش جدید معمولاً آینده <span dir="ltr">redo</span> را پاک می‌کند.
8. <span dir="ltr">Event emitter</span>، <span dir="ltr">concurrency limiter</span> و <span dir="ltr">retry</span>: اول قرارداد لغو، خطا، ترتیب و <span dir="ltr">cleanup</span> را مشخص کن.

## تمرین با پاسخ

در <span dir="ltr">Two Sum</span> اگر قبل از بررسی مکمل، مقدار عضو فعلی را در <span dir="ltr">Map</span> بگذاریم چه خطری داریم؟

<details>
<summary>پاسخ</summary>

برای ورودی [3] و <span dir="ltr">target</span>=6 ممکن است <span dir="ltr">index</span> صفر را دوبار استفاده کنیم. قرارداد دو عضو متفاوت را با بررسی قبل از ذخیره رعایت می‌کنیم.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Coding Problems

## High priority

- debounce
- throttle
- `Promise.all`
- Two Sum
- Valid Parentheses
- Group Anagrams
- Binary Search
- Longest Substring Without Repeating Characters
- flatten nested array
- `groupBy`
- deduplicate values
- merge intervals
- tree max depth
- DFS/BFS traversal

## Frontend-flavored exercises

### Search autocomplete

Requirements:

- controlled input
- debounce
- cancel previous request
- loading/error/empty states
- keyboard navigation
- stale-response protection

### Undo/redo

Use two stacks and explain transitions.

### Event emitter

Implement:

```text
on(event, handler)
off(event, handler)
emit(event, payload)
once(event, handler)
```

### Request concurrency limiter

Given many request functions, run at most N simultaneously.

### Retry helper

Support max attempts, exponential backoff, AbortSignal, and selective non-retryable errors.

## Rule for every solution

Explain:

1. brute-force approach
2. improved approach
3. time complexity
4. space complexity
5. edge cases
6. why the chosen data structure fits

</div>

</details>

</div>
