# Arrays, Strings, Map & Set

## Arrays

Know common mutating methods:

```text
push, pop, splice, sort, reverse
```

Common non-mutating transformations:

```text
map, filter, slice, concat
```

Modern runtimes also provide copy-returning methods such as `toSorted`, `toReversed`, and `toSpliced`.

## Strings

Strings are immutable. Common problem patterns include frequency counting, two pointers, sliding windows, and parsing.

## Map

```js
const users = new Map();
users.set(user.id, user);
users.get(id);
```

Useful for explicit dictionaries and repeated lookup.

## Set

```js
const ids = new Set(items.map(item => item.id));
```

Useful for:

- deduplication
- membership checks
- visited-node tracking

## Frequency map

```js
function frequencies(values) {
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}
```

## Practice

- Two Sum
- duplicate detection
- Group Anagrams
- first non-repeating character
- array intersection
