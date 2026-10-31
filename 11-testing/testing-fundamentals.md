<div dir="rtl" align="right">

# تست را از یک رفتار واقعی شروع کنیم — <span dir="ltr">Testing Fundamentals</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** تابع، شرط و خطا در <span dir="ltr">JavaScript</span>. مثال‌ها با <span dir="ltr">Vitest</span> هستند.

## تست یعنی یک ادعای قابل اجرا

می‌خواهیم قانون تخفیف را بدون کلیک دستی هر بار بررسی کنیم. اول قرارداد را روشن می‌کنیم: درصد باید عدد متناهی بین صفر و صد باشد.

<div dir="ltr" align="left">

~~~js
export function discount(price, percent) {
  if (!Number.isFinite(price) || price < 0) {
    throw new Error('Invalid price');
  }
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    throw new Error('Invalid percent');
  }
  return price * (1 - percent / 100);
}
~~~

</div>

این را در <span dir="ltr">discount.js</span> بگذار. صرف بررسی <span dir="ltr">`percent 0 100`</span>، مقدار <span dir="ltr">null</span>، رشته یا <span dir="ltr">NaN</span> را به‌درستی رد نمی‌کند.

## مثال تست، با سه مرحله

<div dir="ltr" align="left">

~~~js
import { expect, it } from 'vitest';
import { discount } from './discount.js';

it('applies a 20 percent discount', () => {
  const price = 100;                   // Arrange: آماده‌سازی
  const result = discount(price, 20);   // Act: اجرای رفتار
  expect(result).toBe(80);             // Assert: بررسی
});
it.each([-1, 101, null, NaN])('rejects percent %s', percent => {
  expect(() => discount(100, percent)).toThrow();
});
~~~

</div>

برای تست <span dir="ltr">throw</span> یک تابع به <span dir="ltr">expect</span> می‌دهیم؛ اگر مستقیم <span dir="ltr">discount</span> را اجرا کنی، خطا پیش از <span dir="ltr">matcher</span> پرتاب می‌شود.

## ورودی معمولی، نامعتبر و مرزی

برای بازه صفر تا صد، خود مرزها و مقادیر نزدیکشان مهم‌اند: -۱، ۰، ۱، ۹۹، ۱۰۰، ۱۰۱. **<span dir="ltr">Boundary Testing</span>** فقط تست ورودی نامعتبر نیست؛ مرز معتبر هم باید بررسی شود. <span dir="ltr">it.each</span> یک رفتار مشترک را با چند ورودی اجرا می‌کند.

تست خوب رفتار قابل مشاهده را پوشش می‌دهد، مستقل است و شکستش معنی دارد. پاس شدن تست‌ها فقط یعنی ادعاهای نوشته‌شده در این اجرا رد نشده‌اند؛ اثبات نبودن همه باگ‌ها نیست.

## پاسخ مصاحبه و تمرین

**<span dir="ltr">Unit</span> چیست؟** یک بخش منسجم قابل آزمون، مثلاً تابع محاسبه؛ لازم نیست واحد را همیشه با یک خط یا یک فایل برابر بگیریم.

اگر قانون سن «۱۸ و بیشتر» است، کدام سه عدد نزدیک مرز را تست می‌کنی؟

<details>
<summary>پاسخ</summary>

۱۷، ۱۸ و ۱۹؛ این‌ها تفاوت > و >= را آشکار می‌کنند. بسته به قرارداد، نوع نامعتبر و سن منفی هم جدا بررسی می‌شوند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Testing Fundamentals

## Core principle

Test behavior and contracts that matter, not private implementation details that can change without changing observable behavior.

A useful shape is Arrange → Act → Assert. Boundary cases and negative paths deserve deliberate attention, especially around ranges, empty values, and invalid input.

## Course notes: Unit Testing Introduction

### What is Unit Testing?

Unit Testing is a software testing technique where we test the smallest testable parts of an application (called **units**) in isolation.

A unit is usually:

- A function
- A method
- A class
- A module

The goal is to verify that each unit behaves correctly under different conditions.

#### Example

```js
function add(a, b) {
  return a + b
}
```

A unit test verifies that this function returns the expected result.

```js
expect(add(1, 2)).toBe(3)
```

---

### What is Automated Testing?

Automated Testing is the practice of writing code that tests other code.

Instead of manually running the application and checking outputs every time, we create test scripts that execute automatically.

#### Manual Testing

1. Run the application.
2. Click buttons.
3. Enter data.
4. Verify results manually.

Problems:

- Slow
- Repetitive
- Error-prone
- Expensive

#### Automated Testing

1. Write tests once.
2. Run them whenever code changes.
3. Get immediate feedback.

Benefits:

- Faster execution
- Consistent results
- Better confidence in code changes

---

## Benefits of Unit Testing

Unit testing requires an upfront investment, but it saves significant time and effort as the project grows.

### 1. Detects Bugs Early

One of the biggest advantages of unit testing is finding bugs before the application reaches production.

Without tests:

```text
Write code
↓
Deploy
↓
User finds bug
↓
Fix bug
```

With tests:

```text
Write code
↓
Run tests
↓
Find bug immediately
↓
Fix before deployment
```

#### Why This Matters

The later a bug is discovered:

- The harder it is to debug
- The more expensive it becomes
- The more users it affects

Unit tests act as an early warning system.

---

### 2. Facilitates Refactoring

Refactoring means improving internal code structure without changing external behavior.

Example:

Before:

```js
function calculatePrice() {
  // messy implementation
}
```

After:

```js
function calculatePrice() {
  // cleaner implementation
}
```

The output should remain the same.

#### The Problem

How do we know the refactoring didn't break something?

#### The Solution

Run the test suite.

If all tests pass:

```text
Refactoring completed safely ✅
```

If tests fail:

```text
Something broke ❌
```

Tests provide confidence when modifying existing code.

---

### 3. Improves Code Quality

Writing tests naturally encourages better design.

Poorly designed code is often difficult to test.

For example:

```js
function processOrder() {
  // database access
  // API calls
  // calculations
  // file operations
  // logging
}
```

This function has too many responsibilities.

To make it testable, we often split it into smaller functions:

```js
calculatePrice()
saveOrder()
sendNotification()
```

Result:

- Smaller functions
- Better separation of concerns
- Cleaner architecture
- More maintainable code

Testing indirectly promotes good software design principles.

---

### 4. Acts as Documentation

Tests demonstrate how code is supposed to behave.

Sometimes tests explain functionality better than comments.

Example:

```js
it("should return 0 when cart is empty", () => {
  expect(calculateTotal([])).toBe(0)
})
```

From this test we immediately learn:

- Empty cart returns 0
- Function expects an array
- Expected behavior is clearly defined

Benefits:

- Easier onboarding for new developers
- Clear understanding of requirements
- Living documentation that stays updated

Unlike comments, tests are executed regularly and become outdated less often.

---

## Characteristics of Good Unit Tests

Mosh emphasizes writing tests that are:

### 1. Maintainable

Tests should be easy to understand and update.

Bad test:

```js
expect(foo(bar(baz(1, 2, 3)))).toEqual(...)
```

Good test:

```js
const result = calculateDiscount(order)

expect(result).toBe(20)
```

#### Maintainable Tests

- Have clear names
- Are short
- Focus on one behavior
- Avoid unnecessary complexity

---

### 2. Robust

Tests should not break because of unrelated changes.

Bad:

```js
expect(user.name).toBe("John")
expect(user.age).toBe(25)
expect(user.address.city).toBe("New York")
expect(user.phone).toBe("123")
```

If unrelated properties change, the test may fail unnecessarily.

Good tests focus only on the behavior being verified.

Robust tests:

- Minimize dependencies
- Avoid implementation details
- Test behavior rather than internal code structure

---

### 3. Trustworthy

Developers must trust test results.

A trustworthy test:

- Passes when code is correct
- Fails when code is broken

Bad tests create:

- False positives
- False negatives

#### False Positive

Test passes even though the code is wrong.

```text
Code broken ❌
Test passes ✅
```

Dangerous because bugs go unnoticed.

#### False Negative

Test fails even though the code is correct.

```text
Code correct ✅
Test fails ❌
```

Annoying because developers waste time investigating nonexistent issues.

Trustworthy tests give reliable feedback.

---

## Key Takeaways

- Unit testing verifies small pieces of code in isolation.
- Automated tests replace repetitive manual testing.
- Unit testing helps detect bugs early.
- Tests make refactoring safer.
- Testing encourages better code design.
- Tests serve as living documentation.
- Good tests are:
  - Maintainable
  - Robust
  - Trustworthy
- A test suite acts as a safety net for future code changes.

## Course notes: AAA Pattern

One of the most important principles in unit testing is the **AAA Pattern**.

AAA stands for:

```text
Arrange
Act
Assert
```

This pattern provides a clear structure for writing tests, making them:

- Easier to read
- Easier to maintain
- Easier to debug
- More consistent across a codebase

Most professional test suites follow this pattern.

---

## Why Use the AAA Pattern?

Without structure, tests can become confusing.

Example:

```js
expect(max(2, 1)).toBe(2)
```

This works, but in more complex scenarios it becomes difficult to identify:

- What data was prepared?
- What action was performed?
- What behavior was verified?

The AAA pattern separates these responsibilities clearly.

---

## AAA Structure

```text
Arrange
↓
Act
↓
Assert
```

Each section has a specific responsibility.

---

## 1. Arrange

The Arrange phase prepares everything needed for the test.

This includes:

- Creating variables
- Initializing objects
- Setting up mocks
- Preparing test data

Think of it as:

> "Given these conditions..."

---

### Example

```js
const a = 2
const b = 1
```

We're preparing the inputs that will be used during the test.

---

### Arrange Examples

#### Variables

```js
const username = "mosh"
const password = "1234"
```

#### Objects

```js
const user = {
  id: 1,
  name: "John",
}
```

#### Mock Services

```js
const sendEmail = vi.fn()
```

Everything required before executing the code belongs in Arrange.

---

## 2. Act

The Act phase executes the behavior being tested.

Think of it as:

> "When this action occurs..."

Usually there should be only one action.

---

### Example

```js
const result = max(a, b)
```

Here we call the function under test.

---

### Another Example

```js
userService.createUser(user)
```

or

```js
const response = await api.login(credentials)
```

The Act step represents the behavior we're evaluating.

---

## 3. Assert

The Assert phase verifies the outcome.

Think of it as:

> "Then this should happen..."

This is where expectations are written.

---

### Example

```js
expect(result).toBe(2)
```

We're checking that the result matches our expectation.

---

### More Examples

#### Boolean

```js
expect(isValid).toBe(true)
```

#### Object

```js
expect(user).toEqual(expectedUser)
```

#### Array

```js
expect(items).toContain("apple")
```

Assertions determine whether the test passes or fails.

---

## Complete Example

Your example follows the AAA pattern perfectly.

```js
import { describe, expect, it } from "vitest"
import { max } from "../intro"

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    // Arrange
    const a = 2
    const b = 1

    // Act
    const result = max(a, b)

    // Assert
    expect(result).toBe(2)
  })
})
```

---

## Visualizing the Test

```text
Arrange
a = 2
b = 1
      ↓

Act
max(2,1)
      ↓

Assert
expect(result).toBe(2)
```

This flow mirrors how humans naturally reason about behavior.

---

## Writing Better Test Names

Notice the test name:

```js
it("should return the first argument if it is greater")
```

A good test name describes:

- The scenario
- The expected outcome

Structure:

```text
should + expected behavior + condition
```

Examples:

```js
it("should return the larger number")
```

```js
it("should throw an error when username is empty")
```

```js
it("should save the user to the database")
```

Good names make tests act as documentation.

---

## AAA with Multiple Assertions

Sometimes a test contains several assertions.

Example:

```js
expect(user.name).toBe("John")
expect(user.age).toBe(25)
```

This is acceptable if all assertions verify the same behavior.

However, if assertions verify unrelated behaviors, create separate tests.

---

## AAA with Async Code

The pattern remains exactly the same.

```js
it("should return a user", async () => {
  // Arrange
  const id = 1

  // Act
  const user = await getUser(id)

  // Assert
  expect(user.id).toBe(1)
})
```

AAA works for both synchronous and asynchronous tests.

---

## Common Mistakes

### 1. Mixing Arrange and Act

Bad:

```js
const result = max(2, 1)
```

Here inputs are created inside the action.

Better:

```js
const a = 2
const b = 1

const result = max(a, b)
```

The separation improves readability.

---

### 2. Multiple Actions

Bad:

```js
login()
logout()
```

One test should usually focus on one action.

Multiple actions often indicate multiple behaviors are being tested.

---

### 3. No Clear Structure

Bad:

```js
const result = max(2, 1)
expect(result).toBe(2)
```

For very small tests this is acceptable, but as tests grow, lack of structure makes them harder to understand.

---

## Benefits of the AAA Pattern

### Readability

Anyone can immediately understand the test.

```text
Setup
↓
Execute
↓
Verify
```

---

### Maintainability

Changes become easier because responsibilities are separated.

---

### Consistency

Every test follows the same format.

Developers know exactly where to look.

---

### Debugging

When a test fails, it's easier to determine whether the issue occurred during:

- Setup
- Execution
- Verification

---

## AAA vs Given-When-Then

In behavior-driven testing, another common pattern exists:

```text
Given
When
Then
```

This is essentially the same idea.

| AAA     | BDD   |
| ------- | ----- |
| Arrange | Given |
| Act     | When  |
| Assert  | Then  |

Example:

```text
Given two numbers
When max() is called
Then the larger number should be returned
```

Both approaches encourage structured, readable tests.

---

## Key Takeaways

- AAA stands for:
  - Arrange
  - Act
  - Assert

- Arrange prepares test data and dependencies.
- Act executes the behavior being tested.
- Assert verifies the result.

- AAA improves:
  - Readability
  - Maintainability
  - Consistency
  - Debuggability

- Most professional test suites follow the AAA pattern.

- A well-structured unit test should clearly separate setup, execution, and verification.

## Course notes: Positive and Negative Testing

When writing unit tests, we should not only verify that code works correctly with valid input, but also verify how it behaves with invalid, unexpected, or edge-case input.

This leads to two important testing strategies:

1. Positive Testing
2. Negative Testing

A complete test suite typically includes both.

---

## What is Positive Testing?

Positive Testing verifies that the system behaves correctly when it receives valid input.

In other words:

```text
Given valid data
↓
The system should work as expected
```

Positive tests confirm that the happy path works.

---

## Example

Suppose we have:

```js
function max(a, b) {
  return a > b ? a : b
}
```

---

### Positive Test

```js
it("should return the first argument if it is greater", () => {
  expect(max(2, 1)).toBe(2)
})
```

Input:

```js
;(2, 1)
```

Expected:

```js
2
```

Valid input.

Expected behavior.

Positive test.

---

## More Positive Testing Examples

### Login

```js
login("admin", "1234")
```

Expected:

```text
User logs in successfully
```

---

### Registration

```js
register("John", "john@gmail.com")
```

Expected:

```text
Account created
```

---

### Calculator

```js
add(2, 3)
```

Expected:

```js
5
```

All of these verify correct behavior under normal conditions.

---

## Why Positive Testing Matters

Positive testing answers:

> Does the feature work when used correctly?

Without positive tests, we cannot verify that the intended functionality exists.

---

## What is Negative Testing?

Negative Testing verifies how the system behaves when it receives invalid or unexpected input.

In other words:

```text
Given invalid data
↓
The system should handle it correctly
```

Negative testing ensures the application is resilient and defensive.

---

## Example

Suppose we have:

```js
function setAge(age) {
  if (age < 0) throw new Error("Age cannot be negative")

  return age
}
```

---

### Negative Test

```js
it("should throw an error for negative ages", () => {
  expect(() => setAge(-1)).toThrowError()
})
```

Input:

```js
;-1
```

Expected:

```text
Error thrown
```

Invalid input.

Negative test.

---

## More Negative Testing Examples

### Login

```js
login("", "")
```

Expected:

```text
Validation Error
```

---

### Registration

```js
register("", "")
```

Expected:

```text
Validation Error
```

---

### Division

```js
divide(10, 0)
```

Expected:

```text
Error
```

or

```js
Infinity
```

depending on requirements.

---

## Positive vs Negative Testing

| Positive Testing       | Negative Testing            |
| ---------------------- | --------------------------- |
| Valid Input            | Invalid Input               |
| Happy Path             | Error Path                  |
| Expected Usage         | Unexpected Usage            |
| Success Scenarios      | Failure Scenarios           |
| Verifies Features Work | Verifies Errors Are Handled |

---

## Example: User Registration

Function:

```js
registerUser(name)
```

---

### Positive Test

```js
it("should register a user with a valid name", () => {
  const result = registerUser("John")

  expect(result).toBeDefined()
})
```

---

### Negative Test

```js
it("should throw an error if name is empty", () => {
  expect(() => registerUser("")).toThrowError()
})
```

Both tests are necessary.

---

## Example: max()

Function:

```js
max(a, b)
```

---

### Positive Tests

```js
expect(max(2, 1)).toBe(2)
```

```js
expect(max(1, 2)).toBe(2)
```

```js
expect(max(5, 5)).toBe(5)
```

---

### Negative Tests

Suppose the function should reject non-numeric values.

```js
expect(() => max("a", 1)).toThrowError()
```

```js
expect(() => max(null, 1)).toThrowError()
```

```js
expect(() => max(undefined, 1)).toThrowError()
```

These verify defensive behavior.

---

## Why Negative Testing Is Often More Important

Many bugs occur because of unexpected input.

Developers usually test:

```text
What users SHOULD do
```

But users often do:

```text
What developers never expected
```

Examples:

```js
null
undefined
NaN
empty strings
negative numbers
```

Negative tests help catch these scenarios early.

---

## Common Sources of Negative Tests

### Null Values

```js
expect(() => saveUser(null)).toThrowError()
```

---

### Undefined Values

```js
expect(() => saveUser(undefined)).toThrowError()
```

---

### Empty Strings

```js
expect(() => createUser("")).toThrowError()
```

---

### Invalid Numbers

```js
expect(() => withdraw(-100)).toThrowError()
```

---

### Out-of-Range Values

```js
expect(() => setAge(500)).toThrowError()
```

---

## Boundary Testing

Boundary testing is a special type of negative testing.

Many bugs occur at boundaries.

---

### Example

Age requirement:

```text
18+
```

Tests:

```js
17
18
19
```

Instead of:

```js
5
18
100
```

The values nearest the boundary are usually the most important.

---

## Example

Function:

```js
function canVote(age) {
  return age >= 18
}
```

---

#### Tests

```js
expect(canVote(17)).toBe(false)
```

```js
expect(canVote(18)).toBe(true)
```

```js
expect(canVote(19)).toBe(true)
```

This catches boundary-related bugs.

---

## A Good Test Suite Uses Both

Bad Test Suite:

```text
Only Positive Tests
```

Problem:

```text
Works for valid input
Fails for invalid input
```

---

Better Test Suite:

```text
Positive Tests
+
Negative Tests
```

Now both success paths and failure paths are verified.

---

## Real Example

Function:

```js
function calculateDiscount(percent) {
  if (percent < 0 || percent > 100) throw new Error()

  return percent
}
```

---

### Positive Tests

```js
expect(calculateDiscount(10)).toBe(10)
```

```js
expect(calculateDiscount(50)).toBe(50)
```

```js
expect(calculateDiscount(100)).toBe(100)
```

---

### Negative Tests

```js
expect(() => calculateDiscount(-1)).toThrowError()
```

```js
expect(() => calculateDiscount(101)).toThrowError()
```

```js
expect(() => calculateDiscount(null)).toThrowError()
```

---

## Key Takeaways

- Positive Testing verifies valid input and expected behavior.
- Negative Testing verifies invalid input and error handling.

- Positive Testing answers:
  - "Does it work correctly?"

- Negative Testing answers:
  - "Does it fail correctly?"

- A good test suite includes both positive and negative tests.

- Negative tests commonly cover:
  - null
  - undefined
  - empty strings
  - invalid numbers
  - out-of-range values

- Many real-world bugs come from unexpected input, making negative testing extremely important.

- Always test:
  - Happy paths ✅
  - Error paths ✅
  - Boundary conditions ✅

## Course notes: Boundary Testing

Boundary Testing (or Boundary Value Analysis) is a testing technique that focuses on values at the edges of valid and invalid input ranges.

Many software bugs occur at boundaries rather than in the middle of a range.

For this reason, boundary testing is one of the most valuable testing techniques in unit testing.

---

## Why Boundary Testing Matters

Consider a requirement:

```text
A user must be at least 18 years old to vote.
```

Most developers test:

```js
canVote(25)
```

This verifies a typical value.

However, the real risk is around the boundary:

```text
17
18
19
```

That's where bugs are most likely to occur.

---

## The Core Principle

Instead of testing random values:

```text
5
25
50
100
```

Test values around the edge:

```text
Boundary - 1
Boundary
Boundary + 1
```

---

## Example 1: Age Validation

Requirement:

```text
Age must be 18 or older.
```

Function:

```js
function canVote(age) {
  return age >= 18
}
```

---

### Boundary Tests

#### Below Boundary

```js
expect(canVote(17)).toBe(false)
```

---

#### At Boundary

```js
expect(canVote(18)).toBe(true)
```

---

#### Above Boundary

```js
expect(canVote(19)).toBe(true)
```

---

## Visual Representation

```text
Invalid | Boundary | Valid

  17    |    18    |   19
```

This simple strategy catches many off-by-one errors.

---

## Example 2: Discount Percentage

Requirement:

```text
Discount must be between 0 and 100.
```

Function:

```js
function applyDiscount(percent) {
  if (percent < 0 || percent > 100) throw new Error()

  return percent
}
```

---

### Important Boundaries

Minimum:

```text
0
```

Maximum:

```text
100
```

---

### Tests

#### Around Minimum

```js
expect(() => applyDiscount(-1)).toThrowError()
```

```js
expect(applyDiscount(0)).toBe(0)
```

```js
expect(applyDiscount(1)).toBe(1)
```

---

#### Around Maximum

```js
expect(applyDiscount(99)).toBe(99)
```

```js
expect(applyDiscount(100)).toBe(100)
```

```js
expect(() => applyDiscount(101)).toThrowError()
```

---

## Example 3: Array Length

Requirement:

```text
Username must contain
between 5 and 10 characters.
```

---

### Lower Boundary

```js
4 characters ❌
5 characters ✅
6 characters ✅
```

Tests:

```js
expect(isValidUsername("abcd")).toBe(false)
```

```js
expect(isValidUsername("abcde")).toBe(true)
```

```js
expect(isValidUsername("abcdef")).toBe(true)
```

---

### Upper Boundary

```js
9 characters  ✅
10 characters ✅
11 characters ❌
```

Tests:

```js
expect(isValidUsername("abcdefghi")).toBe(true)
```

```js
expect(isValidUsername("abcdefghij")).toBe(true)
```

```js
expect(isValidUsername("abcdefghijk")).toBe(false)
```

---

## Common Boundary Mistakes

Many bugs come from incorrect comparison operators.

---

### Buggy Code

```js
function canVote(age) {
  return age > 18
}
```

Problem:

```js
canVote(18)
```

returns:

```js
false
```

But requirements state:

```text
18 years old can vote.
```

A boundary test immediately reveals the bug.

---

## Off-by-One Errors

Boundary testing is especially effective at finding:

```text
Off-by-One Errors
```

Examples:

```text
>
instead of
>=
```

or

```text
<
instead of
<=
```

These mistakes are extremely common.

---

## Typical Boundary Patterns

Whenever you see a range:

```text
min <= value <= max
```

Test:

```text
min - 1
min
min + 1

max - 1
max
max + 1
```

---

## Example Template

Requirement:

```text
10 <= value <= 20
```

Tests:

| Value | Expected |
| ----- | -------- |
| 9     | Invalid  |
| 10    | Valid    |
| 11    | Valid    |
| 19    | Valid    |
| 20    | Valid    |
| 21    | Invalid  |

---

## Applying Boundary Testing to Unit Tests

Suppose we are testing:

```js
function isInRange(value) {
  return value >= 10 && value <= 20
}
```

---

### Positive Boundary Tests

```js
expect(isInRange(10)).toBe(true)
```

```js
expect(isInRange(20)).toBe(true)
```

---

### Negative Boundary Tests

```js
expect(isInRange(9)).toBe(false)
```

```js
expect(isInRange(21)).toBe(false)
```

---

## Boundary Testing and Positive/Negative Testing

Boundary testing often combines both.

Example:

```text
17  → Negative Test
18  → Positive Test
19  → Positive Test
```

The boundary itself may belong to either category depending on the requirement.

---

## When Should You Use Boundary Testing?

Use it whenever you see:

#### Numeric Ranges

```text
Age: 18+
```

```text
Score: 0-100
```

---

#### String Length Limits

```text
Minimum password length
```

```text
Maximum username length
```

---

#### Collection Sizes

```text
Shopping cart limit
```

```text
Maximum file uploads
```

---

#### Dates and Times

```text
Subscription expiration
```

```text
Booking deadlines
```

---

## Mosh's Practical Rule

When you find a boundary:

```text
Test:
Boundary - 1
Boundary
Boundary + 1
```

Example:

```text
Age >= 18

17
18
19
```

This simple rule catches a surprisingly large number of bugs.

---

## Real-World Example

Requirement:

```text
A movie can be rented
for a maximum of 30 days.
```

Tests:

```js
expect(canRent(29)).toBe(true)
```

```js
expect(canRent(30)).toBe(true)
```

```js
expect(canRent(31)).toBe(false)
```

These three tests provide far more value than testing:

```js
canRent(5)
canRent(15)
canRent(20)
```

because the risk lies at the edge.

---

## Key Takeaways

- Boundary Testing focuses on edge values.
- Most bugs occur at boundaries.
- Test:
  - Boundary - 1
  - Boundary
  - Boundary + 1

- Boundary testing helps detect:
  - Off-by-one errors
  - Incorrect comparison operators
  - Validation bugs

- Common boundaries include:
  - Numeric ranges
  - String lengths
  - Array sizes
  - Dates and times

- Whenever you see a requirement like:

```text
min <= value <= max
```

test:

```text
min - 1
min
min + 1

max - 1
max
max + 1
```

- Boundary testing is one of the highest-value testing techniques because it catches many real-world bugs with very few test cases.

## Course notes: Defensive Programming and Parameterized Tests

As software developers, we should not assume that functions will always receive valid input.

Users, APIs, databases, and even other developers can provide unexpected values.

To build reliable software, we often use:

1. Defensive Programming
2. Parameterized Tests

These concepts work extremely well together because defensive code introduces many validation rules that need to be tested efficiently.

---

## Defensive Programming

Defensive Programming is the practice of writing code that protects itself from invalid input and unexpected situations.

Instead of assuming everything is correct, we actively validate inputs and fail early when something is wrong.

---

## Why Defensive Programming Matters

Without defensive programming:

```js
function calculateDiscount(percent) {
  return percent / 100
}
```

What happens if:

```js
calculateDiscount(null)
```

or

```js
calculateDiscount(undefined)
```

or

```js
calculateDiscount("hello")
```

Unexpected behavior may occur.

---

## Defensive Approach

```js
function calculateDiscount(percent) {
  if (typeof percent !== "number") throw new Error("Percent must be a number")

  return percent / 100
}
```

Now invalid input is detected immediately.

---

## Fail Fast Principle

Defensive programming follows the:

```text
Fail Fast Principle
```

Instead of allowing bad data to flow through the application:

```text
Bad Input
↓
Bad Output
↓
Bug Later
```

We stop execution immediately:

```text
Bad Input
↓
Error Thrown
↓
Problem Found Early
```

---

## Example: Username Validation

Without validation:

```js
function createUser(username) {
  return {
    username,
  }
}
```

---

Problem:

```js
createUser("")
```

Creates an invalid user.

---

Better:

```js
function createUser(username) {
  if (!username) throw new Error("Username is required")

  return {
    username,
  }
}
```

---

## Defensive Checks Commonly Used

### Null Checks

```js
if (user == null) throw new Error()
```

---

### Undefined Checks

```js
if (value === undefined) throw new Error()
```

---

### Type Validation

```js
if (typeof age !== "number") throw new Error()
```

---

### Range Validation

```js
if (age < 0 || age > 120) throw new Error()
```

---

### String Validation

```js
if (!name.trim()) throw new Error()
```

---

## Defensive Programming and Unit Testing

Whenever defensive code exists, we should verify it with negative tests.

Example:

```js
function setAge(age) {
  if (age < 0) throw new Error()

  return age
}
```

---

### Positive Test

```js
expect(setAge(20)).toBe(20)
```

---

### Negative Test

```js
expect(() => setAge(-1)).toThrowError()
```

---

## Problem: Too Many Similar Tests

Suppose a function validates percentages.

```js
function setDiscount(percent) {
  if (percent < 0 || percent > 100) throw new Error()

  return percent
}
```

We want to test:

```js
;-1 - 10
101
150
999
```

Writing separate tests becomes repetitive.

---

## Parameterized Tests

Parameterized Tests allow us to run the same test with multiple input values.

Instead of:

```js
it("should throw for -1")
it("should throw for -10")
it("should throw for 101")
it("should throw for 150")
```

We define the test once and provide multiple inputs.

---

## Why Use Parameterized Tests?

Benefits:

- Less duplication
- Easier maintenance
- Cleaner code
- Better readability

---

## Example Without Parameterized Tests

```js
it("should throw for -1", () => {
  expect(() => setDiscount(-1)).toThrowError()
})

it("should throw for -10", () => {
  expect(() => setDiscount(-10)).toThrowError()
})

it("should throw for 101", () => {
  expect(() => setDiscount(101)).toThrowError()
})
```

Lots of duplication.

---

## Example With Parameterized Tests

Vitest provides:

```js
it.each()
```

or

```js
test.each()
```

---

### Example

```js
it.each([-1, -10, 101, 150])("should throw if discount is %i", (discount) => {
  expect(() => setDiscount(discount)).toThrowError()
})
```

Vitest automatically executes the same test for every value.

---

## Execution

Vitest runs:

```js
discount = -1
```

then:

```js
discount = -10
```

then:

```js
discount = 101
```

then:

```js
discount = 150
```

Each becomes a separate test case.

---

## Testing Valid Inputs

Parameterized tests are useful for positive tests as well.

---

### Example

```js
it.each([0, 1, 50, 99, 100])("should accept %i", (discount) => {
  expect(setDiscount(discount)).toBe(discount)
})
```

---

## Testing Multiple Parameters

Suppose we have:

```js
function max(a, b) {
  return a > b ? a : b
}
```

---

### Parameterized Test

```js
it.each([
  [2, 1, 2],
  [1, 2, 2],
  [5, 5, 5],
])("max(%i, %i) should return %i", (a, b, expected) => {
  expect(max(a, b)).toBe(expected)
})
```

---

## Visual Representation

```text
Input A | Input B | Expected
---------|---------|---------
2        | 1       | 2
1        | 2       | 2
5        | 5       | 5
```

One test definition.

Multiple test cases.

---

## Boundary Testing + Parameterized Tests

These concepts work perfectly together.

Requirement:

```text
0 <= discount <= 100
```

---

### Invalid Values

```js
it.each([-1, 101])("should throw for %i", (discount) => {
  expect(() => setDiscount(discount)).toThrowError()
})
```

---

### Valid Values

```js
it.each([0, 1, 99, 100])("should accept %i", (discount) => {
  expect(setDiscount(discount)).toBe(discount)
})
```

Notice how boundary values fit naturally into parameterized tests.

---

## When to Use Parameterized Tests

Use them when:

```text
Same Behavior
Different Inputs
```

Examples:

- Email validation
- Age validation
- Range checking
- Math functions
- String formatting
- Defensive validations

---

## When NOT to Use Parameterized Tests

Avoid them when:

```text
Each test has different logic
```

If the setup, action, or assertion changes significantly, separate tests are usually clearer.

---

## Real-World Example

Function:

```js
function isValidUsername(username) {
  return username.length >= 5
}
```

---

### Parameterized Test

```js
it.each([
  ["john", false],
  ["john1", true],
  ["abcdef", true],
])("should validate username %s", (username, expected) => {
  expect(isValidUsername(username)).toBe(expected)
})
```

This creates multiple test cases from a single test definition.

---

## Key Takeaways

### Defensive Programming

- Protects code from invalid input.
- Uses validation checks.
- Follows the Fail Fast principle.
- Often throws errors when input is invalid.
- Makes software more reliable.

---

### Parameterized Tests

- Run the same test with multiple inputs.
- Reduce duplication.
- Improve maintainability.
- Work well with:
  - Boundary Testing
  - Negative Testing
  - Input Validation

---

### Vitest Syntax

Single parameter:

```js
it.each([1, 2, 3])(...)
```

Multiple parameters:

```js
it.each([
  [1, 2, 2],
  [2, 1, 2],
])(...)
```

---

### Professional Testing Rule

When you find yourself copying the same test multiple times and only changing the input values:

```text
Use a Parameterized Test
```

This keeps your test suite cleaner, smaller, and easier to maintain.

</div>

</details>

</div>
