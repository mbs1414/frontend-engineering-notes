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
