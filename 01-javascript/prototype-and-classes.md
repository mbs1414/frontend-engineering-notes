# Prototypes & Classes

## Prototype chain

Objects can delegate property lookup through a prototype chain.

```js
const animal = {
  speak() {
    return 'sound';
  },
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.speak();
```

If `speak` is not found on `dog`, lookup continues to its prototype.

## Constructor functions

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function () {
  return `Hi ${this.name}`;
};
```

`new User()` roughly creates an object, links it to `User.prototype`, calls the constructor with that object as `this`, then returns it unless another object is explicitly returned.

## Classes

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi ${this.name}`;
  }
}
```

Class syntax is built on JavaScript's prototype-based object model. Methods live on the prototype rather than being duplicated on every instance.

## Interview questions

1. What is the prototype chain?
2. Where are class methods stored?
3. What does `new` do?
4. Are JS classes separate from prototypes internally?
