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
