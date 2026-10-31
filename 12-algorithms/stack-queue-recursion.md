<div dir="rtl" align="right">

# پشته، صف و تابعی که خودش را صدا می‌زند

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Call Stack</span>](../01-javascript/execution-context.md)، [<span dir="ltr">Big O</span>](./big-o.md).

**<span dir="ltr">Stack</span>** آخرین ورودی را اول خارج می‌کند (<span dir="ltr">LIFO</span>)، مثل <span dir="ltr">undo</span>. **<span dir="ltr">Queue</span>** اولین ورودی را اول خارج می‌کند (<span dir="ltr">FIFO</span>)، مثل صف کارهای منتظر.

## مثال اول: پشته

<div dir="ltr" align="left">

~~~js
const undo = [];
undo.push('type A');
undo.push('type B');
console.log(undo.pop()); // type B
console.log(undo.pop()); // type A
~~~

</div>

برای <span dir="ltr">queue</span> پرتعداد، <span dir="ltr">shift</span> مکرر آرایه می‌تواند هزینه جابه‌جایی داشته باشد؛ نگه داشتن <span dir="ltr">head index</span> یا ساختار صف مناسب گزینه بهتری است.

## مثال دوم: <span dir="ltr">recursion</span> با شرط پایان

<div dir="ltr" align="left">

~~~js
function factorial(n) {
  if (!Number.isInteger(n) || n < 0) throw new Error('Invalid n');
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(4)); // 24
~~~

</div>

مسیر ۴ ضربدر <span dir="ltr">factorial</span>(3)، سپس ۳ ضربدر <span dir="ltr">factorial</span>(2) تا رسیدن به صفر ادامه دارد. هنگام برگشت نتیجه‌ها ساخته می‌شوند. برای ورودی کوچک آموزشی مناسب است؛ عددهای بزرگ محدودیت دقت <span dir="ltr">number</span> و عمق <span dir="ltr">stack</span> دارند.

زمان این الگوریتم <span dir="ltr">O</span>(<span dir="ltr">n</span>) و فضای <span dir="ltr">call stack</span> هم <span dir="ltr">O</span>(<span dir="ltr">n</span>) است. حذف آرایه از کد به معنی فضای کمکی ثابت نیست؛ <span dir="ltr">stack</span> فراخوانی هم حافظه مصرف می‌کند.

## پاسخ مصاحبه و تمرین

چرا <span dir="ltr">recursion</span> بدون <span dir="ltr">base case</span> خطرناک است؟

<details>
<summary>پاسخ</summary>

فراخوانی‌ها پایان ندارند و معمولاً <span dir="ltr">stack</span> پر می‌شود. علاوه بر داشتن شرط، باید هر مرحله واقعاً به آن نزدیک شود.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Stack, Queue & Recursion

## Stack

LIFO: last in, first out.

Uses:

- undo/redo
- nested parsing
- DFS
- valid-parentheses problems

```js
function isValid(input) {
  const pairs = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);
  const stack = [];

  for (const char of input) {
    if (!pairs.has(char)) {
      stack.push(char);
      continue;
    }
    if (stack.pop() !== pairs.get(char)) return false;
  }

  return stack.length === 0;
}
```

## Queue

FIFO: first in, first out.

Uses:

- BFS
- task processing
- message queues

For very large algorithmic queues, repeated `array.shift()` can be inefficient; a head index avoids shifting all elements.

## Recursion

A recursive solution needs:

- base case
- progress toward base case

```js
function findNode(node, id) {
  if (node.id === id) return node;

  for (const child of node.children ?? []) {
    const found = findNode(child, id);
    if (found) return found;
  }

  return null;
}
```

Useful for nested menus, comments, file trees, ASTs, and DOM-like structures.

Deep recursion can overflow the call stack. An explicit stack can replace recursion.

## Interview questions

1. Stack vs queue?
2. BFS uses which?
3. Why do tree problems often fit recursion?
4. When can recursion be unsafe?

</div>

</details>

</div>
