<div dir="rtl" align="right">

# چه چیزی را در چه سطحی تست کنیم؟ — <span dir="ltr">Test Strategy</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [مبانی تست](./testing-fundamentals.md).

<span dir="ltr">Unit</span>، <span dir="ltr">Integration</span> و <span dir="ltr">E2E</span> دامنه متفاوت دارند. واحد کوچک سریع‌تر عیب‌یابی می‌شود؛ <span dir="ltr">integration</span> همکاری چند بخش را می‌سنجد؛ <span dir="ltr">E2E</span> مسیر کاربر را در مرورگر و مجموعه بزرگ‌تری از سیستم بررسی می‌کند.

## مثال اول: فرم ورود

| قانون | سطح مناسب اولیه |
| --- | --- |
| تابع تشخیص ایمیل خالی | <span dir="ltr">unit</span> |
| پر کردن فرم و نمایش خطای <span dir="ltr">API</span> | <span dir="ltr">component/integration</span> |
| ورود واقعی و دیدن داشبورد | <span dir="ltr">E2E</span> محدود و مهم |

<span dir="ltr">Pyramid</span> و <span dir="ltr">Trophy</span> مدل تصمیم‌گیری درباره ترکیب تست‌ها هستند، نه دستور درصد ثابت برای همه تیم‌ها. هزینه اجرا، اطمینان مورد نیاز و احتمال خطا تعیین‌کننده‌اند.

## مثال دوم: <span dir="ltr">coverage</span> گمراه‌کننده

<div dir="ltr" align="left">

~~~js
function divide(a, b) { return a / b; }
// این فراخوانی ممکن است خط تابع را پوشش دهد:
divide(6, 2);
~~~

</div>

پوشش خط بالا ثابت نمی‌کند قرارداد تقسیم بر صفر یا ورودی نامعتبر درست است. <span dir="ltr">coverage</span> نشان می‌دهد چه کدی اجرا شده، نه کیفیت همه ادعاها.

## پاسخ مصاحبه و تمرین

برای هر ترکیب ممکن فرم یک تست <span dir="ltr">E2E</span> بنویسیم؟

<details>
<summary>پاسخ</summary>

معمولاً نه. ترکیب‌های محلی را در سطح مناسب سریع‌تر بررسی کن و مسیرهای بحرانی را با چند <span dir="ltr">E2E</span> قابل اعتماد پوشش بده.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Testing Strategy: Pyramid, Trophy, and Tooling

## Test levels

- unit: small logic in isolation
- component: rendered UI behavior
- integration: multiple units/boundaries working together
- E2E: browser-level user flows in a realistic system

## Pyramid vs trophy

The classic testing pyramid recommends many unit tests, fewer integration tests, and a small E2E layer. Modern frontend teams often put more weight on integration/component tests because they can exercise user behavior, rendering, routing/providers, and network boundaries together without the full cost of E2E.

Treat these models as heuristics, not religious geometry.

## Coverage

Line/function/branch coverage is a diagnostic signal, not proof of test quality. A suite can achieve high coverage with weak assertions. Prefer meaningful risk coverage over chasing 100% as a vanity metric.

## Course notes: Types of Tests and Testing Pyramid

When building software, we don't rely on a single type of test.

Different tests provide different levels of confidence, speed, and cost.

The three main categories are:

1. Unit Tests
2. Integration Tests
3. End-to-End (E2E) Tests

Understanding the differences between them is essential because a good testing strategy uses all three appropriately.

---

## 1. Unit Tests

Unit tests verify the smallest pieces of code in isolation.

Usually, a unit is:

- A function
- A method
- A class

The goal is to test a single piece of logic without involving external dependencies such as:

- Databases
- APIs
- File systems
- Network requests

### Example

```js
function calculateDiscount(price) {
  return price * 0.9
}
```

Unit Test:

```js
it("should apply a 10% discount", () => {
  expect(calculateDiscount(100)).toBe(90)
})
```

---

### Characteristics

#### Fast ⚡

Unit tests execute very quickly.

Thousands of unit tests can run in a few seconds.

#### Cheap

They require minimal setup.

#### Easy to Debug

When a unit test fails, the problem is usually isolated to a small piece of code.

#### High Maintenance Value

They help developers refactor code safely.

---

### Confidence Level

Unit tests provide confidence that individual pieces work correctly.

However, they do not verify whether different parts of the application work together.

---

## 2. Integration Tests

Integration tests verify how multiple units work together.

Instead of testing a single function, we test interactions between components.

Examples:

- Application ↔ Database
- Service ↔ API
- Controller ↔ Service
- React Component ↔ Backend

---

### Example

Suppose we have:

```text
User Service
      ↓
Database
```

A unit test might mock the database.

An integration test uses a real database (or a test database) to verify that both layers work correctly together.

Example scenario:

```text
Create User
↓
Save User
↓
Retrieve User
↓
Verify Data
```

---

### Characteristics

#### Medium Speed

Slower than unit tests because external systems are involved.

#### More Realistic

Tests actual interactions between components.

#### More Complex Setup

May require:

- Databases
- APIs
- Test environments

---

### Confidence Level

Higher confidence than unit tests because they verify real integrations.

However, they still don't test the entire application from a user's perspective.

---

## 3. End-to-End (E2E) Tests

End-to-End tests simulate real user behavior.

These tests verify the entire application flow from start to finish.

They interact with the system exactly as a user would.

---

### Example

Testing an online store:

```text
Open Website
↓
Login
↓
Search Product
↓
Add Product To Cart
↓
Checkout
↓
Receive Confirmation
```

This entire workflow can be validated by a single E2E test.

---

### Characteristics

#### Highest Confidence ✅

They verify that the whole application works correctly.

#### Slowest ❌

Because:

- Browser must launch
- Pages must render
- Network requests occur
- Databases are accessed

Execution can take minutes instead of seconds.

#### Expensive

Writing and maintaining E2E tests requires significant effort.

#### Fragile

UI changes can cause tests to fail even when business logic remains correct.

---

### Confidence Level

Highest confidence because they test the system exactly as users use it.

---

## Comparing the Three Types

| Type        | Speed   | Cost    | Confidence  | Scope               |
| ----------- | ------- | ------- | ----------- | ------------------- |
| Unit        | Fastest | Lowest  | Low-Medium  | Single Unit         |
| Integration | Medium  | Medium  | Medium-High | Multiple Components |
| E2E         | Slowest | Highest | Highest     | Entire Application  |

---

## Which Type of Tests Should We Write?

A common beginner mistake is thinking:

```text
More E2E Tests = Better Testing
```

Not necessarily.

While E2E tests provide the most confidence, they are:

- Slow
- Expensive
- Fragile
- Harder to maintain

The industry-recommended approach is the Testing Pyramid.

---

## The Testing Pyramid

```text
           /\
          /E2E\
         /----\
        /Integration\
       /------------\
      /  Unit Tests  \
     /----------------\
```

The pyramid suggests:

#### Many Unit Tests

Base of the pyramid.

These tests should make up the majority of your test suite.

Reasons:

- Fast
- Cheap
- Reliable

---

#### Some Integration Tests

Middle layer.

Used to verify interactions between components.

Examples:

- Database communication
- API integration
- Service interactions

---

#### Few E2E Tests

Top of the pyramid.

Used to verify critical user journeys.

Examples:

- User registration
- Login
- Checkout process
- Payment flow

Only test the most important workflows.

---

## Why Is The Pyramid Shaped This Way?

Because of the trade-off between:

### Speed

```text
Unit > Integration > E2E
```

Unit tests are extremely fast.

E2E tests are the slowest.

---

### Confidence

```text
E2E > Integration > Unit
```

E2E tests provide the highest confidence.

---

### Cost

```text
Unit < Integration < E2E
```

Unit tests are the cheapest to create and maintain.

E2E tests are the most expensive.

---

## Practical Example

Imagine an e-commerce application.

### Unit Tests

```text
✓ Calculate discount
✓ Calculate tax
✓ Validate email
✓ Format price
✓ Generate invoice number
```

Hundreds or thousands of these tests.

---

### Integration Tests

```text
✓ Save order to database
✓ Fetch products from API
✓ Create payment record
✓ Authenticate user
```

Dozens of these tests.

---

### E2E Tests

```text
✓ User can register
✓ User can login
✓ User can purchase a product
✓ User can complete checkout
```

Only a handful of these tests.

---

## Common Mistake: Ice Cream Cone Anti-Pattern

Some teams create the opposite of the Testing Pyramid.

```text
      Many E2E Tests
             ↑
      Few Integration Tests
             ↑
      Very Few Unit Tests
```

This is known as the Ice Cream Cone Anti-Pattern.

Problems:

- Slow feedback
- Expensive maintenance
- Fragile test suite
- Difficult debugging

When an E2E test fails, finding the exact cause can be difficult.

---

## Key Takeaways

- There are three main types of tests:
  - Unit Tests
  - Integration Tests
  - End-to-End (E2E) Tests

- Unit tests verify individual units in isolation.
- Integration tests verify interactions between components.
- E2E tests verify complete user workflows.

- E2E tests provide the highest confidence.
- Unit tests are the fastest and cheapest.

- Follow the Testing Pyramid:
  - Many Unit Tests
  - Some Integration Tests
  - Few E2E Tests

- A balanced test suite provides both speed and confidence.

## Course notes: JavaScript Testing Ecosystem

To write and execute tests effectively, we use several types of testing tools.

A complete testing setup usually consists of:

1. Test Runner
2. Assertion Library
3. Mocking Tools
4. Coverage Tools

Modern testing frameworks often combine several of these features into a single package.

---

## 1. Test Runner

A Test Runner is responsible for finding, executing, and reporting test results.

Think of it as the engine that runs your tests.

Without a test runner:

```text
Write Test
↓
Nothing Executes
```

With a test runner:

```text
Write Test
↓
Run Command
↓
Execute Tests
↓
Show Results
```

---

### Responsibilities of a Test Runner

A test runner:

- Discovers test files
- Executes test cases
- Reports passed tests
- Reports failed tests
- Measures execution time
- Watches files for changes

---

### Example

```js
describe("Math", () => {
  test("should add numbers", () => {
    expect(1 + 1).toBe(2)
  })
})
```

The test runner executes this test and reports:

```text
✓ should add numbers
```

or

```text
✗ should add numbers
```

---

## Popular Test Runners

### Jest

One of the most popular JavaScript testing frameworks.

Features:

- Test Runner
- Assertion Library
- Mocking
- Coverage Reporting

All-in-one solution.

Example:

```bash
npm test
```

---

### Mocha

A flexible and lightweight test runner.

Features:

- Test Runner only
- Requires additional libraries for assertions and mocking

Usually paired with:

```text
Mocha + Chai + Sinon
```

---

### Jasmine

One of the earliest JavaScript testing frameworks.

Provides:

- Test Runner
- Assertions
- Mocking

Inspired many modern testing tools.

---

### Vitest

A modern testing framework built for Vite projects.

Features:

- Extremely fast
- Jest-compatible API
- Built-in assertions
- Built-in mocking

Becoming increasingly popular in modern frontend development.

Example:

```bash
npm run test
```

---

### Cypress

Although often categorized as an E2E testing framework, it can also run component tests.

Best known for:

- Browser testing
- End-to-End testing
- Integration testing

Example:

```text
Open Browser
↓
Click Button
↓
Verify Result
```

Cypress tests simulate real user interactions.

---

## 2. Assertion Library

Running a test isn't enough.

We need a way to verify results.

This is the role of an Assertion Library.

Assertions compare:

```text
Expected Value
vs
Actual Value
```

---

### Example

Function:

```js
function add(a, b) {
  return a + b
}
```

Test:

```js
expect(add(1, 2)).toBe(3)
```

Assertion:

```js
toBe(3)
```

If the result is not 3, the test fails.

---

## Common Assertion Libraries

### Jest Assertions

```js
expect(result).toBe(10)
expect(array).toContain("item")
expect(user).toEqual(expectedUser)
```

---

### Chai

Commonly used with Mocha.

```js
expect(result).to.equal(10)
```

or

```js
assert.equal(result, 10)
```

---

## Why Assertions Matter

Without assertions:

```js
test("add numbers", () => {
  add(1, 2)
})
```

The test always passes because nothing is being verified.

Assertions define expected behavior.

---

## 3. Mocking Tools

Real applications depend on external systems:

- Databases
- APIs
- Email Services
- Payment Gateways
- File Systems

Using these dependencies during testing can be:

- Slow
- Expensive
- Unreliable

Instead, we replace them with mocks.

---

## What is Mocking?

Mocking means replacing a real dependency with a fake implementation.

Example:

Instead of:

```text
Test
↓
Real API
```

Use:

```text
Test
↓
Mock API
```

---

### Example

Real Service:

```js
async function getUser() {
  return axios.get("/users/1")
}
```

Mocked Version:

```js
jest.mock("axios")
```

Now no real network request occurs.

---

## Benefits of Mocking

- Faster tests
- Predictable behavior
- Isolation
- No external dependencies

---

## Common Mocking Tools

### Jest Mock Functions

```js
jest.fn()
```

Example:

```js
const callback = jest.fn()
```

---

### Jest Mocks

```js
jest.mock("./api")
```

Used to replace entire modules.

---

### Sinon

Popular mocking library used with Mocha.

Supports:

- Stubs
- Spies
- Mocks

Example:

```js
sinon.stub(api, "getUser")
```

---

## 4. Coverage Tools

Coverage tools measure how much of the application is tested.

They answer:

> How much of our code is exercised by tests?

---

## Example

Code:

```js
function login(user) {
  if (!user) return false

  return true
}
```

Test:

```js
login(null)
```

Coverage Report:

```text
Branch 1 Tested ✓
Branch 2 Not Tested ✗
```

The tool reveals untested code paths.

---

## Coverage Metrics

### Line Coverage

Measures executed lines.

Example:

```text
85% Lines Covered
```

---

### Function Coverage

Measures tested functions.

Example:

```text
90% Functions Covered
```

---

### Branch Coverage

Measures tested decision paths.

Example:

```js
if (user)
```

Coverage checks whether both:

```text
true branch
false branch
```

have been tested.

---

## Coverage Example

```text
Statements: 95%
Branches: 88%
Functions: 92%
Lines: 95%
```

---

## Popular Coverage Tools

### Istanbul (nyc)

Most widely used JavaScript coverage tool.

Provides detailed reports.

---

### Jest Coverage

Built into Jest.

Run:

```bash
jest --coverage
```

or

```bash
npm test -- --coverage
```

Produces reports showing:

- Tested files
- Untested lines
- Coverage percentages

---

## Why Coverage Matters

Coverage helps identify:

- Untested code
- Missing branches
- Dead code

However:

⚠️ High coverage does NOT guarantee high-quality tests.

Example:

```js
expect(true).toBe(true)
```

This increases coverage but provides little value.

Always prioritize meaningful tests over coverage percentages.

---

## Popular JavaScript Testing Tools

| Tool    | Test Runner | Assertions | Mocking | Coverage |
| ------- | ----------- | ---------- | ------- | -------- |
| Jest    | ✅          | ✅         | ✅      | ✅       |
| Mocha   | ✅          | ❌         | ❌      | ❌       |
| Jasmine | ✅          | ✅         | ✅      | Partial  |
| Vitest  | ✅          | ✅         | ✅      | ✅       |
| Cypress | E2E Focus   | ✅         | Limited | Partial  |

---

## Which Tool Should You Learn?

### For Most JavaScript Projects

Learn:

```text
Jest
```

Why?

- Industry standard
- Complete testing solution
- Excellent documentation
- Huge ecosystem

---

### For Modern Vite Projects

Learn:

```text
Vitest
```

Why?

- Faster than Jest
- Excellent Vite integration
- Jest-compatible API

---

### For E2E Testing

Learn:

```text
Cypress
```

Why?

- Great developer experience
- Real browser testing
- Easy debugging

---

## Key Takeaways

- A testing setup consists of:
  - Test Runner
  - Assertion Library
  - Mocking Tools
  - Coverage Tools

- Test Runner executes tests.
- Assertion Library verifies results.
- Mocking Tools replace external dependencies.
- Coverage Tools measure tested code.

- Jest is an all-in-one testing framework.
- Mocha is a test runner often paired with Chai and Sinon.
- Jasmine provides running, assertions, and mocking.
- Vitest is a modern, fast alternative to Jest.
- Cypress is primarily used for End-to-End testing.

- Coverage is useful, but meaningful tests are more important than high coverage percentages.

## Interview questions

1. Unit vs integration vs E2E?
2. Testing pyramid vs testing trophy?
3. Why is 100% coverage not proof of correctness?
4. What should determine where you invest testing effort?

</div>

</details>

</div>
