# Scope, Hoisting, TDZ & Closures

## Lexical scope

JavaScript uses lexical scope. Visibility depends on where code is written.

```js
const globalValue = 1;

function outer() {
  const outerValue = 2;
  function inner() {
    console.log(globalValue, outerValue);
  }
  inner();
}
```

`inner` can access its own environment and outer lexical environments.

## Scope chain

Identifier lookup searches outward through lexical environments until a binding is found or the global boundary is reached.

## Shadowing

```js
const name = 'outer';
function print() {
  const name = 'inner';
  console.log(name); // inner
}
```

The inner binding shadows the outer one.

## Hoisting

"Hoisting" is a teaching term describing behavior caused by bindings being created during environment setup before normal statement execution.

### `var`

```js
console.log(value); // undefined
var value = 10;
```

The binding is initialized to `undefined` before the assignment executes.

### `let` and `const`

```js
console.log(value); // ReferenceError
const value = 10;
```

The binding exists but cannot be accessed before initialization. That region is the **Temporal Dead Zone (TDZ)**.

### Function declarations

```js
hello();
function hello() {
  console.log('hello');
}
```

Function declarations are initialized early enough to be called before their source position.

## Declaration vs assignment

```js
var count;  // declaration
count = 10; // assignment
```

The declaration/binding behavior occurs before normal execution; the later assignment does not.

## Closure

A closure exists when a function retains access to variables from the lexical environment where it was created.

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}

const counter = createCounter();
counter(); // 1
counter(); // 2
```

The outer function has finished, but the returned function still accesses `count`.

## Practical closure uses

- callbacks
- event handlers
- factory functions
- private state
- memoization
- timers
- React hooks

## Stale closures in React

A callback captures values from the render in which it was created.

```tsx
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

With an empty dependency array, this callback captures the initial `count`. React is not violating closure rules. Closure rules are merely being inconvenient with impressive consistency.

## Interview questions

1. What is hoisting really describing?
2. Why does `var` give `undefined` before declaration but `let` throws?
3. What is TDZ?
4. Define closure precisely.
5. What is a stale closure in React?
