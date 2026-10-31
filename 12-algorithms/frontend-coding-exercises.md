<div dir="rtl" align="right">

# تمرین کدنویسی فرانت‌اند با راه‌حل — <span dir="ltr">Debounce</span> و <span dir="ltr">Promise.all</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Closure</span>](../01-javascript/scope-closure-hoisting.md)، [<span dir="ltr">Promise</span>](../01-javascript/async-javascript.md)، [<span dir="ltr">Big O</span>](./big-o.md).

## تمرین اول: فقط بعد از مکث اجرا کن

<span dir="ltr">Debounce</span> برای جست‌وجو مفید است: هر ورودی تازه، انتظار قبلی را لغو می‌کند. این نسخه فقط اجرای <span dir="ltr">trailing</span> دارد و روش <span dir="ltr">cancel</span> را هم می‌دهد.

<div dir="ltr" align="left">

~~~js
function debounce(fn, delay) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}
const search = debounce(query => console.log(query), 20);
search('r');
search('re');
search('react'); // پس از مکث، فقط react چاپ می‌شود
~~~

</div>

<span dir="ltr">Closure</span> شناسه <span dir="ltr">timer</span> را نگه می‌دارد. تابع معمولی <span dir="ltr">this</span> فراخوانی را می‌گیرد و <span dir="ltr">arrow</span> داخل <span dir="ltr">timer</span> همان <span dir="ltr">this</span> را حفظ می‌کند. این نسخه نتیجه <span dir="ltr">async</span> تابع را به <span dir="ltr">caller</span> برنمی‌گرداند و <span dir="ltr">leading</span> یا <span dir="ltr">flush</span> ندارد.

## تمرین دوم: نسخه آموزشی <span dir="ltr">Promise.all</span> برای آرایه

<div dir="ltr" align="left">

~~~js
function allArray(values) {
  return new Promise((resolve, reject) => {
    if (values.length === 0) return resolve([]);
    const results = new Array(values.length);
    let remaining = values.length;
    for (let index = 0; index < values.length; index++) {
      Promise.resolve(values[index]).then(value => {
        results[index] = value;
        remaining--;
        if (remaining === 0) resolve(results);
      }, reject);
    }
  });
}
allArray([Promise.resolve('A'), 'B']).then(console.log); // ['A', 'B']
~~~

</div>

نتیجه را با <span dir="ltr">index</span> ورودی ذخیره می‌کنیم، نه ترتیب پایان. عدد و مقدار معمولی هم با <span dir="ltr">Promise.resolve</span> پذیرفته می‌شود. این تابع آموزشی فقط قرارداد آرایه دارد؛ جایگزین کامل استاندارد برای همه <span dir="ltr">iterable</span>ها نیست. <span dir="ltr">rejection</span> کارهای دیگر را <span dir="ltr">cancel</span> نمی‌کند.

## تمرین‌های بعدی و معیار پاسخ

<span dir="ltr">Throttle</span>، <span dir="ltr">flatten</span>، <span dir="ltr">groupBy</span>، <span dir="ltr">memoize</span>، <span dir="ltr">LRU cache</span>، <span dir="ltr">event emitter</span>، <span dir="ltr">concurrency limiter</span> و <span dir="ltr">retry</span> را به ترتیب نیاز تمرین کن. قبل از کدنویسی ورودی، خروجی و مرزها را روشن کن؛ بعد راه ساده، راه بهتر، زمان و حافظه را توضیح بده.

## تمرین با پاسخ

برای <span dir="ltr">debounce</span> با <span dir="ltr">delay</span>=۲۰، در زمان‌های ۰، ۵ و ۱۰ میلی‌ثانیه فراخوانی داریم. اجرای آخر تقریباً چه زمانی مجاز می‌شود؟

<details>
<summary>پاسخ</summary>

۲۰ میلی‌ثانیه پس از آخرین فراخوانی، یعنی حدود زمان ۳۰؛ زمان واقعی <span dir="ltr">callback</span> می‌تواند به خاطر زمان‌بندی دیرتر شود. صفر یا هر <span dir="ltr">delay</span> دیگری تضمین اجرای دقیق روی ساعت نیست.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Frontend Coding Exercises

## High-value implementations

1. Debounce
2. Throttle
3. `Promise.all`
4. Flatten nested array
5. `groupBy`
6. Memoize function
7. LRU cache
8. Event emitter (`on`, `off`, `emit`, `once`)
9. Request concurrency limiter
10. Retry with exponential backoff and cancellation

## Debounce requirements

```js
function debounce(fn, delay) {
  // implement
}
```

Discuss:

- argument/`this` preservation
- leading/trailing execution
- cancellation

## `Promise.all` requirements

Handle:

- order preservation
- non-Promise values via `Promise.resolve`
- first rejection
- empty input

## Frontend-flavored tasks

### Autocomplete

- controlled input
- debounce
- cancel previous request
- stale-request protection
- loading/error/empty UI
- keyboard navigation

### Undo/redo

Use two stacks and explain transitions.

### Tree explorer

Render/search nested data and explain DFS/recursion.

## Classic problems

- Two Sum
- Valid Parentheses
- Group Anagrams
- Binary Search
- Longest Substring Without Repeating Characters
- Merge Intervals
- Maximum Depth of Binary Tree
- BFS level traversal

## Practice rule

For every solution explain:

1. brute force
2. improved approach
3. time complexity
4. space complexity
5. edge cases
6. why the data structure fits

</div>

</details>

</div>
