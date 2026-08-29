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
