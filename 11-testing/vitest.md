# Vitest

Vitest is a Vite-native test framework with familiar Jest-style APIs for tests, assertions, mocks, timers, and coverage.

## High-value areas

- matchers and asymmetric matchers
- test setup/teardown
- parameterized tests (`it.each` / `test.each`)
- filtering/focused tests
- test environments such as Node vs JSDOM
- setup files and global configuration

## Course notes: Vitest Matchers

Matchers are methods used with `expect()` to verify that a value behaves as expected.

They are the foundation of assertions in Vitest.

General syntax:

```js
expect(actualValue).matcher(expectedValue)
```

Example:

```js
expect(2 + 2).toBe(4)
```

Here:

- `2 + 2` → Actual value
- `4` → Expected value
- `toBe()` → Matcher

---

## Categories of Matchers

Vitest provides many built-in matchers.

The most commonly used categories are:

1. Equality Matchers
2. Truthiness Matchers
3. Number Matchers
4. String Matchers
5. Object Matchers
6. Array Matchers
7. Exception Matchers

---

## 1. Equality Matchers

Used to compare values.

---

## `toBe()`

Checks strict equality using:

```js
Object.is()
```

Best for:

- Numbers
- Strings
- Booleans
- Primitive values

---

### Example

```js
expect(1 + 1).toBe(2)
```

```js
expect("hello").toBe("hello")
```

```js
expect(true).toBe(true)
```

---

### Behind the Scenes

```js
expect(2).toBe(2)
```

is similar to:

```js
Object.is(2, 2)
```

---

## `toEqual()`

Performs deep equality comparison.

Useful for:

- Objects
- Arrays
- Nested structures

---

### Example

```js
expect({
  name: "John",
}).toEqual({
  name: "John",
})
```

---

### Why Not `toBe()`?

This fails:

```js
expect({
  name: "John",
}).toBe({
  name: "John",
})
```

Because they are different object references.

---

#### Visual Example

```js
const a = { name: "John" }
const b = { name: "John" }
```

```text
a === b
false
```

But:

```js
expect(a).toEqual(b)
```

passes because the contents are identical.

---

## When to Use

### Use `toBe`

```js
expect(result).toBe(10)
```

For primitives.

---

### Use `toEqual`

```js
expect(user).toEqual(expectedUser)
```

For objects and arrays.

---

## 2. Truthiness Matchers

Used to verify truthy and falsy values.

---

## `toBeTruthy()`

Passes for any truthy value.

Truthy values include:

```js
true
1
"hello"
[]
{}
```

---

### Example

```js
expect("hello").toBeTruthy()
```

```js
expect(100).toBeTruthy()
```

---

## `toBeFalsy()`

Passes for any falsy value.

Falsy values:

```js
false
0
;("")
null
undefined
NaN
```

---

### Example

```js
expect(0).toBeFalsy()
```

```js
expect("").toBeFalsy()
```

---

## `toBeNull()`

Checks specifically for:

```js
null
```

Example:

```js
expect(value).toBeNull()
```

---

## `toBeUndefined()`

Checks specifically for:

```js
undefined
```

Example:

```js
expect(value).toBeUndefined()
```

---

## `toBeDefined()`

Verifies a value is not:

```js
undefined
```

Example:

```js
expect(user).toBeDefined()
```

---

## Truthiness Matcher Summary

| Matcher         | Checks        |
| --------------- | ------------- |
| toBeTruthy()    | Truthy value  |
| toBeFalsy()     | Falsy value   |
| toBeNull()      | null          |
| toBeUndefined() | undefined     |
| toBeDefined()   | Not undefined |

---

## 3. Number Matchers

Used for numeric comparisons.

---

## `toBeGreaterThan()`

```js
expect(10).toBeGreaterThan(5)
```

Passes because:

```text
10 > 5
```

---

## `toBeGreaterThanOrEqual()`

```js
expect(10).toBeGreaterThanOrEqual(10)
```

Passes because:

```text
10 >= 10
```

---

## `toBeLessThan()`

```js
expect(5).toBeLessThan(10)
```

Passes because:

```text
5 < 10
```

---

## `toBeLessThanOrEqual()`

```js
expect(5).toBeLessThanOrEqual(5)
```

Passes because:

```text
5 <= 5
```

---

## `toBeCloseTo()`

Used for floating-point numbers.

Important because JavaScript has precision issues.

---

### Example

```js
0.1 + 0.2
```

Result:

```js
0.30000000000000004
```

This fails:

```js
expect(0.1 + 0.2).toBe(0.3)
```

---

#### Correct Approach

```js
expect(0.1 + 0.2).toBeCloseTo(0.3)
```

---

## Number Matcher Summary

| Matcher                | Example                |
| ---------------------- | ---------------------- |
| toBeGreaterThan        | 10 > 5                 |
| toBeGreaterThanOrEqual | 10 >= 10               |
| toBeLessThan           | 5 < 10                 |
| toBeLessThanOrEqual    | 5 <= 5                 |
| toBeCloseTo            | Floating-point numbers |

---

## 4. String Matchers

Used for string validation.

---

## `toMatch()`

Checks whether a string matches:

- A substring
- A regular expression

---

### Example: String

```js
expect("Hello World").toMatch("World")
```

---

### Example: Regex

```js
expect("hello@gmail.com").toMatch(/gmail\.com$/)
```

---

## Email Validation Example

```js
expect("test@example.com").toMatch(/.+@.+\..+/)
```

---

## 5. Object Matchers

Used to verify object properties.

---

## `toMatchObject()`

Performs partial object matching.

---

### Example

```js
expect(user).toMatchObject({
  name: "John",
})
```

Passes even if user contains additional properties.

---

#### User Object

```js
{
  id: 1,
  name: "John",
  age: 25
}
```

This still passes.

---

### Why It's Useful

Supports robust testing by avoiding overly strict assertions.

---

## `toHaveProperty()`

Checks whether an object contains a property.

---

### Example

```js
expect(user).toHaveProperty("name")
```

---

### Property + Value

```js
expect(user).toHaveProperty("name", "John")
```

---

### Nested Properties

```js
expect(user).toHaveProperty("address.city")
```

---

## Object Matcher Summary

| Matcher        | Purpose                   |
| -------------- | ------------------------- |
| toMatchObject  | Partial object comparison |
| toHaveProperty | Verify property exists    |

---

## 6. Array Matchers

Used to verify array contents.

---

## `toContain()`

Checks whether an array contains a value.

---

### Example

```js
const numbers = [1, 2, 3]
```

```js
expect(numbers).toContain(2)
```

Passes.

---

### Example

```js
const fruits = ["apple", "banana"]
```

```js
expect(fruits).toContain("banana")
```

Passes.

---

## `toHaveLength()`

Verifies array length.

---

### Example

```js
expect([1, 2, 3]).toHaveLength(3)
```

---

### String Example

```js
expect("hello").toHaveLength(5)
```

---

## Array Matcher Summary

| Matcher      | Purpose       |
| ------------ | ------------- |
| toContain    | Contains item |
| toHaveLength | Verify size   |

---

## 7. Exception Matchers

Used to test errors.

---

## `toThrowError()`

Verifies a function throws an exception.

---

### Example Function

```js
function login() {
  throw new Error("Invalid user")
}
```

---

### Test

```js
expect(() => login()).toThrowError()
```

---

## Specific Message

```js
expect(() => login()).toThrowError("Invalid user")
```

---

## Important

Incorrect:

```js
expect(login()).toThrowError()
```

This executes the function immediately.

---

Correct:

```js
expect(() => login()).toThrowError()
```

Pass a function reference.

---

## Matcher Cheat Sheet

### Equality

```js
toBe()
toEqual()
```

---

### Truthiness

```js
toBeTruthy()
toBeFalsy()
toBeNull()
toBeUndefined()
toBeDefined()
```

---

### Numbers

```js
toBeGreaterThan()
toBeGreaterThanOrEqual()
toBeLessThan()
toBeLessThanOrEqual()
toBeCloseTo()
```

---

### Strings

```js
toMatch()
```

---

### Objects

```js
toMatchObject()
toHaveProperty()
```

---

### Arrays

```js
toContain()
toHaveLength()
```

---

### Exceptions

```js
toThrowError()
```

---

## Best Practices

### Use the Most Specific Matcher Possible

Bad:

```js
expect(user).toBeTruthy()
```

Good:

```js
expect(user.name).toBe("John")
```

More specific assertions provide better feedback.

---

### Use `toEqual()` for Objects

```js
expect(user).toEqual(expectedUser)
```

---

### Use `toMatchObject()` for Partial Checks

```js
expect(user).toMatchObject({
  name: "John",
})
```

This creates more robust tests.

---

### Use `toBeCloseTo()` for Decimal Calculations

```js
expect(0.1 + 0.2).toBeCloseTo(0.3)
```

Avoid floating-point precision issues.

---

## Key Takeaways

- Matchers define how expectations are verified.
- `toBe()` is used for primitive values.
- `toEqual()` performs deep equality comparisons.
- Truthiness matchers verify truthy, falsy, null, and undefined values.
- Number matchers compare numeric values.
- `toMatch()` verifies strings and regex patterns.
- `toMatchObject()` and `toHaveProperty()` are useful for object testing.
- `toContain()` and `toHaveLength()` are common array matchers.
- `toThrowError()` verifies exceptions.
- Choosing the correct matcher improves readability, maintainability, and test quality.

## Course notes: Setup and Teardown

As a test suite grows, many tests require the same setup code.

For example:

- Creating test data
- Initializing a database connection
- Creating mock objects
- Starting a server
- Resetting application state

Copying the same setup code into every test leads to:

- Duplication
- Hard-to-maintain tests
- Inconsistent test environments

Vitest provides **Setup and Teardown Hooks** to solve this problem.

---

## What Are Setup and Teardown?

Setup and teardown allow us to prepare and clean up a test environment automatically.

---

### Setup

Runs before tests.

Purpose:

```text
Create a consistent environment
```

Examples:

- Create users
- Connect to a database
- Initialize mocks
- Create temporary files

---

### Teardown

Runs after tests.

Purpose:

```text
Clean up resources
```

Examples:

- Remove test data
- Disconnect databases
- Clear timers
- Reset mocks

---

## Why Is This Important?

Tests should be:

```text
Independent
Repeatable
Reliable
```

A test should pass whether it runs:

```text
First
Middle
Last
```

or by itself.

A consistent environment helps guarantee this.

---

## Example Without Setup Hooks

```js
it("test 1", () => {
  const user = {
    id: 1,
    name: "John",
  }

  expect(user.name).toBe("John")
})

it("test 2", () => {
  const user = {
    id: 1,
    name: "John",
  }

  expect(user.id).toBe(1)
})
```

Notice the duplication.

---

## Example With Setup Hooks

```js
let user

beforeEach(() => {
  user = {
    id: 1,
    name: "John",
  }
})

it("test 1", () => {
  expect(user.name).toBe("John")
})

it("test 2", () => {
  expect(user.id).toBe(1)
})
```

The setup code is written once.

---

## Available Hooks

Vitest provides four primary hooks:

```js
beforeEach()
beforeAll()
afterEach()
afterAll()
```

---

## beforeEach()

Runs before every test.

---

### Execution Flow

```text
beforeEach
↓
Test 1

beforeEach
↓
Test 2

beforeEach
↓
Test 3
```

---

### Example

```js
import { beforeEach, describe, expect, it } from "vitest"

let numbers

beforeEach(() => {
  numbers = [1, 2, 3]
})

describe("array tests", () => {
  it("should contain 2", () => {
    expect(numbers).toContain(2)
  })

  it("should have length 3", () => {
    expect(numbers).toHaveLength(3)
  })
})
```

Each test gets a fresh array.

---

## Why Use beforeEach?

Suppose a test modifies data.

```js
numbers.push(4)
```

Without resetting:

```text
Test 1 changes state
↓
Test 2 fails unexpectedly
```

Using `beforeEach()` prevents state leakage.

---

## afterEach()

Runs after every test.

---

### Execution Flow

```text
Test 1
↓
afterEach

Test 2
↓
afterEach
```

---

### Example

```js
afterEach(() => {
  vi.clearAllMocks()
})
```

This ensures mocks are reset after every test.

---

## Common Use Cases

```js
afterEach(() => {
  clearDatabase()
})
```

```js
afterEach(() => {
  removeTempFiles()
})
```

```js
afterEach(() => {
  resetApplicationState()
})
```

---

## beforeAll()

Runs once before all tests.

---

### Execution Flow

```text
beforeAll

↓
Test 1

↓
Test 2

↓
Test 3
```

Only executes a single time.

---

## Example

```js
beforeAll(() => {
  connectToDatabase()
})
```

All tests share the same connection.

---

## When to Use beforeAll()

Use it for expensive setup operations.

Examples:

- Database connections
- Starting a server
- Loading configuration
- Creating shared resources

---

## Example

```js
beforeAll(() => {
  console.log("Database Connected")
})
```

Output:

```text
Database Connected
```

appears only once.

---

## afterAll()

Runs once after all tests finish.

---

### Execution Flow

```text
Test 1
↓
Test 2
↓
Test 3
↓
afterAll
```

---

## Example

```js
afterAll(() => {
  disconnectDatabase()
})
```

---

## Why Use afterAll?

Resources should be released when testing completes.

Examples:

```js
afterAll(() => {
  server.close()
})
```

```js
afterAll(() => {
  database.disconnect()
})
```

---

## Complete Example

```js
import {
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  describe,
  expect,
  it,
} from "vitest"

let users

beforeAll(() => {
  console.log("Database Connected")
})

beforeEach(() => {
  users = []
})

afterEach(() => {
  users = []
})

afterAll(() => {
  console.log("Database Disconnected")
})

describe("users", () => {
  it("should add a user", () => {
    users.push("John")

    expect(users).toContain("John")
  })

  it("should start empty", () => {
    expect(users).toHaveLength(0)
  })
})
```

---

## Execution Order

Understanding execution order is important.

---

### Example

```js
beforeAll(() => {
  console.log("beforeAll")
})

beforeEach(() => {
  console.log("beforeEach")
})

afterEach(() => {
  console.log("afterEach")
})

afterAll(() => {
  console.log("afterAll")
})

it("test 1", () => {
  console.log("test1")
})

it("test 2", () => {
  console.log("test2")
})
```

---

### Output

```text
beforeAll

beforeEach
test1
afterEach

beforeEach
test2
afterEach

afterAll
```

---

## Hooks and AAA Pattern

Setup hooks usually replace the Arrange phase.

Example:

```js
beforeEach(() => {
  user = createUser()
})
```

Then inside tests:

```js
it("should update name", () => {
  // Act
  user.name = "John"

  // Assert
  expect(user.name).toBe("John")
})
```

The Arrange step is centralized.

---

## Best Practices

### Use beforeEach for Fresh State

Good:

```js
beforeEach(() => {
  cart = []
})
```

Every test starts clean.

---

### Avoid Shared Mutable State

Bad:

```js
beforeAll(() => {
  cart = []
})
```

Tests may accidentally affect each other.

---

### Keep Hooks Small

Good:

```js
beforeEach(() => {
  user = createUser()
})
```

Bad:

```js
beforeEach(() => {
  // 100 lines of setup
})
```

Large hooks become difficult to understand.

---

### Prefer beforeEach Over beforeAll

If tests modify state:

```js
beforeEach()
```

is usually safer.

---

## Common Interview Question

### Difference Between beforeAll and beforeEach

#### beforeAll

Runs:

```text
One Time
```

Good for:

```text
Expensive Setup
```

Examples:

- Database connection
- Server startup

---

#### beforeEach

Runs:

```text
Before Every Test
```

Good for:

```text
Fresh State
```

Examples:

- New arrays
- New objects
- Mock resets

---

## Quick Reference

### Setup Hooks

```js
beforeAll()
beforeEach()
```

---

### Teardown Hooks

```js
afterEach()
afterAll()
```

---

## Execution Order

```text
beforeAll

beforeEach
Test 1
afterEach

beforeEach
Test 2
afterEach

beforeEach
Test 3
afterEach

afterAll
```

---

## Key Takeaways

- Setup creates a consistent environment.
- Teardown cleans up after tests.

- `beforeEach()`
  - Runs before every test.
  - Creates fresh state.

- `afterEach()`
  - Runs after every test.
  - Cleans temporary state.

- `beforeAll()`
  - Runs once before all tests.
  - Ideal for expensive setup.

- `afterAll()`
  - Runs once after all tests.
  - Releases shared resources.

- Proper setup and teardown help create:
  - Maintainable tests
  - Independent tests
  - Reliable tests
  - Predictable test execution

## Practical configuration topics to add to your interview knowledge

```ts
// vitest.config.ts (illustrative)
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: { reporter: ['text', 'html'] },
  },
});
```

Know *why* a React component suite usually needs a DOM-like environment, while pure Node utilities may not.
