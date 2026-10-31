<div dir="rtl" align="right">

# پیمایش منوی تو در تو — <span dir="ltr">Tree</span>، <span dir="ltr">DFS</span> و <span dir="ltr">BFS</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Recursion</span> و <span dir="ltr">Queue</span>](./stack-queue-recursion.md).

درخت رابطه والد و فرزند دارد؛ مثل دسته‌بندی محصولات. گراف عمومی می‌تواند ارتباط‌های چندگانه و چرخه داشته باشد. <span dir="ltr">DOM</span> هم نمونه آشنای ساختار درختی است.

## مثال اول: عمق‌اول یا <span dir="ltr">DFS</span>

<div dir="ltr" align="left">

~~~js
const tree = {
  name: 'A',
  children: [
    { name: 'B', children: [{ name: 'D', children: [] }] },
    { name: 'C', children: [] },
  ],
};
function dfs(node) {
  console.log(node.name);
  for (const child of node.children) dfs(child);
}
dfs(tree); // A, B, D, C
~~~

</div>

تا پایان یک شاخه پایین می‌رویم، سپس برمی‌گردیم. <span dir="ltr">recursion</span> از <span dir="ltr">call stack</span> استفاده می‌کند.

## مثال دوم: سطح‌اول یا <span dir="ltr">BFS</span>

<div dir="ltr" align="left">

~~~js
function bfs(root) {
  const queue = [root];
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];
    console.log(node.name);
    queue.push(...node.children);
  }
}
bfs(tree); // A, B, C, D
~~~

</div>

ابتدا همه هم‌سطح‌ها دیده می‌شوند. نسخه بالا برای سادگی <span dir="ltr">node</span>های پردازش‌شده را هم در آرایه نگه می‌دارد؛ حافظه آن در کل <span dir="ltr">O</span>(<span dir="ltr">n</span>) است.

در گراف دارای چرخه باید <span dir="ltr">visited</span> داشته باشی تا دوباره وارد همان <span dir="ltr">node</span> نشوی. <span dir="ltr">DFS</span> و <span dir="ltr">BFS</span> با نمایش <span dir="ltr">adjacency list</span> معمولاً زمان <span dir="ltr">O</span>(<span dir="ltr">V</span> + <span dir="ltr">E</span>) دارند. <span dir="ltr">BFS</span> برای کوتاه‌ترین مسیر از نظر تعداد یال در گراف بدون وزن مناسب است، نه هر گراف وزن‌دار.

## پاسخ مصاحبه و تمرین

برای نزدیک‌ترین مقصد از نظر تعداد قدم در گراف بدون وزن، از کدام شروع می‌کنی؟

<details>
<summary>پاسخ</summary>

<span dir="ltr">BFS</span>؛ چون لایه‌ها را بر اساس فاصله از مبدأ بررسی می‌کند. <span dir="ltr">visited</span> را هنگام صف کردن مدیریت کن تا تکرار بی‌دلیل نسازی.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Trees & Graphs

## Trees in frontend

Frontend examples:

- DOM
- component tree
- nested navigation
- file explorer
- comments

## DFS

Explore deeply before siblings.

```js
function dfs(node) {
  console.log(node.value);
  for (const child of node.children ?? []) {
    dfs(child);
  }
}
```

Can also be implemented iteratively with a stack.

## BFS

Explore level by level using a queue.

Useful for shortest path in unweighted graphs and level traversal.

## Graphs

Graphs have nodes and edges and may contain cycles.

Use visited tracking:

```js
const visited = new Set();
```

## Interview questions

1. DFS vs BFS?
2. Which finds shortest path in an unweighted graph?
3. Why use a visited Set?
4. Name frontend structures that are trees.

</div>

</details>

</div>
