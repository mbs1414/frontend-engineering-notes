# Execution Context & Call Stack

## Execution context

An execution context is the environment in which JavaScript code is evaluated. Useful categories include global, module, and function execution contexts.

When a function is called, a function execution context is created for that invocation.

## Call stack

The call stack tracks active execution contexts using LIFO order.

```js
function third() { console.log('third'); }
function second() { third(); }
function first() { second(); }
first();
```

Conceptually:

```text
first
  second
    third
```

When `third` finishes, it leaves first, then `second`, then `first`.

## Stack overflow

Unbounded recursion eventually exhausts the call stack:

```js
function recurse() {
  recurse();
}
recurse();
```

## Why this matters in frontend

The call stack helps explain:

- synchronous blocking
- stack traces
- recursion
- event-loop behavior
- why long JavaScript tasks block input and rendering

## Long synchronous work

```js
const start = performance.now();
while (performance.now() - start < 3000) {
  // main thread blocked
}
```

During this time the browser cannot process many UI tasks normally.

## Interview questions

1. What does the call stack contain?
2. What is stack overflow?
3. How is the stack related to the event loop?
4. Why can synchronous JavaScript freeze the UI?
