# JavaScript Fundamentals

## Values and types

Primitive values include `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, and `null`. Arrays, functions, dates, maps, sets, and ordinary records are objects.

## Primitive vs object behavior

Primitives are copied by value:

```js
let a = 10;
let b = a;
b = 20;
console.log(a); // 10
```

Object variables contain a reference value:

```js
const a = { count: 1 };
const b = a;
b.count = 2;
console.log(a.count); // 2
```

A precise interview answer is: **JavaScript passes arguments by value. For objects, the passed value is a reference to the object.**

## Equality

```js
0 == false;  // true because coercion occurs
0 === false; // false
```

Prefer `===` unless coercive equality is intentional.

`Object.is` differs for some edge cases:

```js
Object.is(NaN, NaN); // true
Object.is(0, -0);    // false
```

## Mutation and immutability

Mutation changes an existing object:

```js
user.name = 'Sara';
```

Immutable-style update creates a new object:

```js
const nextUser = { ...user, name: 'Sara' };
```

This matters in React because changed object identity is often used to represent changed state.

## Shallow copy

Spread is shallow:

```js
const original = { profile: { name: 'A' } };
const copy = { ...original };
copy.profile.name = 'B';
console.log(original.profile.name); // B
```

`structuredClone` can deeply clone many supported structures. JSON stringify/parse is not a universal deep-clone solution.

## Higher-order functions

A higher-order function receives a function, returns a function, or both.

```js
items.map(item => item.id);

function withLogging(fn) {
  return (...args) => {
    console.log(args);
    return fn(...args);
  };
}
```

## Runtime vs build/compile time

Runtime error:

```js
JSON.parse('not-json');
```

Type/build-time error:

```ts
const count: number = 'ten';
```

Modern frontend tooling can include type checking, transpilation, bundling, minification, and then browser runtime.

## Interview questions

1. Are objects passed by reference in JavaScript?
2. `==` vs `===` vs `Object.is`?
3. What is a shallow copy?
4. Why does object identity matter in React?
5. What is a higher-order function?
