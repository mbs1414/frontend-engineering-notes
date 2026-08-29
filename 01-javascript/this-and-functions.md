# `this` & Functions

## Normal-function `this`

For normal functions, `this` depends mainly on how the function is called.

```js
const user = {
  name: 'Mohammad',
  print() {
    console.log(this.name);
  },
};

user.print();
```

## Detached methods

```js
const print = user.print;
print();
```

The original object is no longer the call receiver, so `this` is not automatically `user`.

## `call`, `apply`, `bind`

```js
fn.call(context, a, b);
fn.apply(context, [a, b]);
const bound = fn.bind(context);
```

`bind` returns a new function.

## Arrow functions

Arrow functions do not create their own `this`; they capture lexical `this`.

```js
const obj = {
  name: 'A',
  delayed() {
    setTimeout(() => console.log(this.name), 0);
  },
};
```

Arrows also do not have their own `arguments` and cannot be used as constructors with `new`.

## Function forms

```js
function declaration() {}
const expression = function () {};
const arrow = () => {};
```

Declarations and expressions differ in initialization/hoisting behavior.

## Interview questions

1. How is `this` determined?
2. Why can a detached method lose its `this`?
3. `call` vs `apply` vs `bind`?
4. Arrow vs normal function?
5. Can arrow functions be constructors?
