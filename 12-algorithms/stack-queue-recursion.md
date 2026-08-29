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
