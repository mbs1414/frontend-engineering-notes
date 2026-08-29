# Test Quality, False Results, and TDD

A trustworthy test suite should fail when the protected behavior breaks and remain green when harmless implementation details change.

## Course notes: False Positives, False Negatives, and TDD

One of the primary goals of unit testing is to create tests that are **trustworthy**.

A trustworthy test suite gives developers confidence that:

- If tests pass, the code works correctly.
- If tests fail, there is a real problem.

Unfortunately, poorly written tests can produce misleading results.

The two most dangerous testing problems are:

1. False Positives
2. False Negatives

---

## False Positives

A False Positive occurs when:

```text
Code is broken ❌
Test passes ✅
```

The test incorrectly reports success even though the application contains a bug.

---

### Why False Positives Are Dangerous

False positives create a false sense of confidence.

Developers may think:

```text
All tests are passing.
Everything is working.
```

When in reality:

```text
A bug still exists.
```

This is one of the worst outcomes in testing because problems can reach production unnoticed.

---

### Example

Suppose we have a function:

```js
function max(a, b) {
  return a
}
```

This implementation is incorrect.

It always returns the first argument.

---

#### Poor Test

```js
it("should return the first argument", () => {
  expect(max(2, 1)).toBe(2)
})
```

Test result:

```text
PASS ✅
```

But:

```js
max(1, 2)
```

returns:

```js
1
```

which is incorrect.

The test passed while the implementation was still broken.

This is a False Positive.

---

## Causes of False Positives

### Insufficient Test Coverage

Testing only one scenario.

Bad:

```js
expect(max(2, 1)).toBe(2)
```

Better:

```js
expect(max(2, 1)).toBe(2)
expect(max(1, 2)).toBe(2)
```

---

### Weak Assertions

Bad:

```js
expect(result).toBeDefined()
```

This verifies very little.

Better:

```js
expect(result).toBe(10)
```

---

### Testing the Wrong Thing

A test may verify implementation details rather than actual behavior.

This can allow bugs to slip through unnoticed.

---

## False Negatives

A False Negative occurs when:

```text
Code works correctly ✅
Test fails ❌
```

The application is fine, but the test incorrectly reports failure.

---

## Why False Negatives Are Harmful

False negatives waste developer time.

The typical workflow becomes:

```text
Test Fails
↓
Developer Investigates
↓
Code Is Actually Correct
↓
Time Wasted
```

If false negatives happen frequently, developers lose trust in the test suite.

---

### Example

Function:

```js
function add(a, b) {
  return a + b
}
```

Correct implementation.

---

#### Incorrect Test

```js
expect(add(2, 3)).toBe(6)
```

Result:

```text
FAIL ❌
```

The code is correct.

The test is wrong.

This is a False Negative.

---

## Causes of False Negatives

### Incorrect Expectations

Example:

```js
expect(result).toBe(100)
```

when the correct result should be:

```js
50
```

---

### Brittle Tests

Tests tightly coupled to implementation details.

Example:

```js
expect(functionName).toHaveBeenCalledTimes(3)
```

A harmless refactor may reduce calls to:

```js
2
```

The behavior remains correct, but the test fails.

---

### External Dependencies

Tests that rely on:

- APIs
- Databases
- Network access

can fail for reasons unrelated to the code being tested.

---

## Goal: Trustworthy Tests

Good tests should satisfy two conditions:

### When Code Is Correct

```text
Test Passes ✅
```

---

### When Code Is Broken

```text
Test Fails ❌
```

Anything else reduces confidence in the test suite.

---

## Code First vs Test First

When developing software, there are two common approaches.

---

## Code First Approach

The traditional workflow.

```text
Write Code
↓
Write Tests
↓
Run Tests
```

Example:

```js
function max(a, b) {
  return a > b ? a : b
}
```

After implementation:

```js
it("should return the larger number", () => {
  expect(max(2, 1)).toBe(2)
})
```

---

### Advantages

- Simple
- Natural for beginners
- Faster initially

---

### Disadvantages

- Tests may be forgotten
- Design decisions are already locked in
- Lower test coverage

---

## Test First Approach (TDD)

TDD stands for:

```text
Test-Driven Development
```

Instead of writing code first, we write the test first.

---

## What is TDD?

TDD is a development methodology where tests drive the implementation.

Workflow:

```text
Write Test
↓
Watch It Fail
↓
Write Code
↓
Make Test Pass
↓
Refactor
```

The test defines the desired behavior before implementation exists.

---

## The TDD Cycle

TDD follows a simple loop:

```text
Red
↓
Green
↓
Refactor
```

---

## Step 1: Write a Failing Test (Red)

Start by describing the behavior you want.

Example:

```js
it("should return the larger number", () => {
  expect(max(2, 1)).toBe(2)
})
```

At this point:

```js
max()
```

doesn't even exist.

Result:

```text
FAIL ❌
```

This is expected.

The failing test proves the test is capable of detecting problems.

---

## Step 2: Write Just Enough Code to Pass (Green)

Now implement the minimum amount of code required.

Example:

```js
function max(a, b) {
  return 2
}
```

This might pass the first test.

But it's not a complete solution.

Add more tests:

```js
expect(max(5, 1)).toBe(5)
```

Now the implementation must improve.

Eventually:

```js
function max(a, b) {
  return a > b ? a : b
}
```

All tests pass.

Result:

```text
PASS ✅
```

---

## Step 3: Refactor

Once tests are passing, improve the code if necessary.

Example:

Before:

```js
function max(a, b) {
  if (a > b) return a
  return b
}
```

After:

```js
function max(a, b) {
  return a > b ? a : b
}
```

Behavior remains unchanged.

Tests provide a safety net during refactoring.

---

## Red → Green → Refactor

Visualized:

```text
Write Failing Test
        ↓
       RED
        ↓
Write Minimal Code
        ↓
      GREEN
        ↓
Improve Design
        ↓
    REFACTOR
        ↓
Repeat
```

This cycle is the heart of TDD.

---

## Benefits of TDD

### Better Design

Writing tests first forces you to think about API design before implementation.

---

### Higher Test Coverage

Tests are created before functionality.

Less chance of forgetting tests.

---

### Confidence During Refactoring

The test suite acts as a safety net.

---

### Smaller Development Steps

Developers focus on one behavior at a time.

This often leads to cleaner code.

---

## Criticisms of TDD

TDD is powerful but not always necessary.

Common criticisms:

- Slower at the beginning
- Difficult for beginners
- Not ideal for every type of project
- Can lead to excessive testing if applied blindly

Many teams use a hybrid approach:

```text
Mostly Code First
+
TDD for critical logic
```

---

## TDD Example

Goal:

Create an `isEven()` function.

---

#### Step 1

Write Test

```js
it("should return true for even numbers", () => {
  expect(isEven(2)).toBe(true)
})
```

Result:

```text
FAIL ❌
```

---

#### Step 2

Write Minimal Code

```js
function isEven() {
  return true
}
```

Result:

```text
PASS ✅
```

---

#### Step 3

Add Another Test

```js
expect(isEven(3)).toBe(false)
```

Now:

```text
FAIL ❌
```

---

#### Step 4

Improve Implementation

```js
function isEven(number) {
  return number % 2 === 0
}
```

All tests pass.

---

## Key Takeaways

- False Positive:
  - Broken code
  - Passing test
  - Creates false confidence

- False Negative:
  - Correct code
  - Failing test
  - Wastes developer time

- Trustworthy tests:
  - Pass when code is correct
  - Fail when code is broken

- TDD stands for Test-Driven Development.

- TDD follows:
  1. Write a failing test
  2. Write just enough code to make it pass
  3. Refactor if necessary

- The TDD cycle is:
  - Red
  - Green
  - Refactor

- Tests should be trusted enough to act as a safety net for future changes.

## Course notes: Maintainable and Robust Tests

Writing tests is not enough.

Poorly written tests can become difficult to understand, expensive to maintain, and fragile when the codebase evolves.

A high-quality test suite should be:

1. Maintainable
2. Robust
3. Trustworthy

In this lesson, we'll focus on the first two characteristics.

---

## Maintainable Tests

A maintainable test is easy to:

- Read
- Understand
- Modify
- Debug

When another developer reads a test six months later, they should immediately understand:

```text
What is being tested?
Why is it being tested?
What result is expected?
```

If answering those questions requires digging through multiple files, the test is not maintainable.

---

## Characteristics of Maintainable Tests

### 1. Have a Clear Name

The test name should clearly describe:

- The behavior being tested
- The expected outcome

A test name should read almost like documentation.

---

#### Bad

```js
it("test1", () => {})
```

```js
it("max", () => {})
```

These names provide little information.

---

#### Good

```js
it("should return the first argument if it is greater", () => {})
```

```js
it("should throw an error when username is empty", () => {})
```

```js
it("should return false for invalid credentials", () => {})
```

A developer should understand the test without reading its implementation.

---

## 2. Test a Single Behavior

Each test should focus on one specific behavior.

---

#### Bad

```js
it("should create a user and send an email and save to database", () => {
  // multiple responsibilities
})
```

This test verifies several behaviors simultaneously.

If it fails:

```text
What broke?
```

It's difficult to know.

---

#### Better

```js
it("should save the user to the database")
```

```js
it("should send a welcome email")
```

Each test has one responsibility.

---

## Why This Matters

Single-purpose tests:

- Are easier to understand
- Are easier to debug
- Fail for one reason only

---

## 3. Are Small

Short tests are usually easier to understand.

---

#### Bad

```js
it("should process an order", () => {
  // 100+ lines
})
```

Large tests often indicate:

- Multiple responsibilities
- Excessive setup
- Complex logic

---

#### Better

```js
it("should calculate discount correctly", () => {
  // few lines
})
```

Small tests communicate intent more effectively.

---

## 4. Use Clear Variable Names

Variable names should explain their purpose.

---

#### Bad

```js
const a = 10
const b = 20
```

What do these values represent?

---

#### Better

```js
const regularPrice = 10
const discountedPrice = 20
```

Or:

```js
const validUser = {
  name: "John",
}
```

The meaning becomes immediately obvious.

---

## 5. Are Properly Formatted

Consistent formatting improves readability.

Use the AAA Pattern.

---

#### Good Example

```js
it("should return the larger number", () => {
  // Arrange
  const firstNumber = 2
  const secondNumber = 1

  // Act
  const result = max(firstNumber, secondNumber)

  // Assert
  expect(result).toBe(2)
})
```

The test structure is immediately recognizable.

---

## Robust Tests

A robust test continues to pass when the implementation changes but the behavior remains the same.

This is a critical principle.

---

## The Goal

Imagine we refactor a function:

Before:

```js
function max(a, b) {
  if (a > b) return a

  return b
}
```

After:

```js
function max(a, b) {
  return a > b ? a : b
}
```

The implementation changed.

The behavior did not.

A robust test should still pass.

---

## Test the What, Not the How

This is one of the most important testing principles.

---

### Test the What

Ask:

```text
What should the code do?
```

Example:

```js
expect(max(2, 1)).toBe(2)
```

We're testing the result.

This is behavior.

---

### Avoid Testing the How

Ask:

```text
How is the code implemented?
```

Example:

```js
expect(max).toUseIfStatement()
```

This focuses on implementation details.

If the implementation changes, the test breaks unnecessarily.

---

## Test Behavior, Not Implementation

Good tests focus on:

```text
Inputs
↓
Outputs
```

Bad tests focus on:

```text
Internal Steps
↓
Private Details
```

---

### Example

Function:

```js
function formatName(firstName, lastName) {
  return `${firstName} ${lastName}`
}
```

---

#### Good Test

```js
expect(formatName("John", "Doe")).toBe("John Doe")
```

We verify behavior.

---

#### Bad Test

```js
expect(formatName).toUseTemplateLiteral()
```

If someone changes the implementation to:

```js
return firstName + " " + lastName
```

The behavior remains correct.

The test should not fail.

---

## Avoid Tight Assertions

A tight assertion is an assertion that checks more than necessary.

These tests become fragile.

---

### Example

Suppose a function returns:

```js
{
  id: 1,
  name: "John",
  age: 25,
  createdAt: "2026-06-09"
}
```

---

#### Tight Assertion

```js
expect(user).toEqual({
  id: 1,
  name: "John",
  age: 25,
  createdAt: "2026-06-09",
})
```

This verifies every property.

A harmless change may break the test.

---

#### Better Assertion

```js
expect(user.name).toBe("John")
```

or

```js
expect(user).toMatchObject({
  name: "John",
})
```

Now the test focuses only on the behavior being verified.

---

## Why Tight Assertions Are Dangerous

Imagine a new property is added:

```js
{
  id: 1,
  name: "John",
  age: 25,
  isAdmin: false
}
```

Behavior hasn't changed.

But overly strict assertions may fail.

This creates unnecessary maintenance work.

---

## Example of a Fragile Test

```js
expect(sendEmail).toHaveBeenCalledTimes(3)
```

Later, the implementation is optimized:

```js
expect(sendEmail).toHaveBeenCalledTimes(2)
```

The application still works.

The test fails because it was tied to implementation details.

---

## Example of a Robust Test

Instead of:

```js
expect(sendEmail).toHaveBeenCalledTimes(3)
```

Verify the behavior:

```js
expect(emailWasSent).toBe(true)
```

Focus on what matters to the user or business requirement.

---

## Maintainable vs Robust

| Maintainable         | Robust                         |
| -------------------- | ------------------------------ |
| Easy to read         | Resistant to refactoring       |
| Clear names          | Tests behavior                 |
| Small tests          | Ignores implementation details |
| Clear variables      | Survives internal changes      |
| Consistent structure | Avoids tight assertions        |

---

## Real-World Example

Imagine you're testing a login feature.

---

#### Maintainable Test

```js
it("should return a token for valid credentials", () => {
  // Arrange
  const credentials = {
    username: "mosh",
    password: "1234",
  }

  // Act
  const token = login(credentials)

  // Assert
  expect(token).toBeDefined()
})
```

Clear.

Readable.

Focused.

---

#### Robust Test

```js
expect(token).toBeDefined()
```

Instead of:

```js
expect(authService.generateToken).toHaveBeenCalledTimes(1)
```

The first verifies behavior.

The second verifies implementation.

---

## Key Takeaways

- Maintainable tests are:
  - Easy to read
  - Easy to modify
  - Easy to understand

- Maintainable tests:
  - Have clear names
  - Test a single behavior
  - Are small
  - Use clear variables
  - Are properly formatted

- Robust tests continue to pass when implementation changes but behavior remains the same.

- Always:
  - Test the what, not the how
  - Test behavior, not implementation
  - Focus on inputs and outputs

- Avoid:
  - Tight assertions
  - Testing internal details
  - Coupling tests to implementation

- The best tests act as documentation while remaining resilient to refactoring.

## Additional shortages to remember

- test isolation and pollution
- flaky-test diagnosis
- deterministic random data/seeds
- mutation testing as a way to evaluate assertion strength
- property-based testing for broad input spaces
- contract testing for service boundaries
