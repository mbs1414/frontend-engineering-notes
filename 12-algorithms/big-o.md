# Big O

## Why it matters

Big O describes how time or space requirements grow as input grows.

Frontend developers do not need competitive-programming obsession, but should notice when a 10,000-item transformation becomes quadratic.

## Common complexities

### O(1)

```js
map.get(id);
array[index];
```

### O(n)

```js
items.find(predicate);
items.map(mapper);
```

### O(log n)

Search space halves repeatedly, such as binary search.

### O(n log n)

Common efficient comparison-sort complexity class.

### O(n²)

```js
for (const a of items) {
  for (const b of items) {
    // ...
  }
}
```

## Real frontend example

Potential repeated scan:

```js
users.map(user => ({
  ...user,
  role: roles.find(role => role.id === user.roleId),
}));
```

Build a lookup map:

```js
const roleById = new Map(roles.map(role => [role.id, role]));

const result = users.map(user => ({
  ...user,
  role: roleById.get(user.roleId),
}));
```

This trades extra memory for faster repeated lookup.

## Interview questions

1. What does Big O describe?
2. O(n) vs O(n²)?
3. Why use a Map for repeated lookup?
4. Give a time-space tradeoff example.
