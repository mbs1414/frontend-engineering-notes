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
