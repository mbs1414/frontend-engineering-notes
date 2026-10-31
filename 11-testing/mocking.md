<div dir="rtl" align="right">

# وابستگی واقعی را کی جایگزین کنیم؟ — <span dir="ltr">Mocking</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Vitest</span>](./vitest.md).

فرض کن تابع ثبت سفارش پس از محاسبه، پیام می‌فرستد. در تست محاسبه لازم نیست واقعاً ایمیل بفرستیم. جایگزین کنترل‌شده، تست را قابل تکرار می‌کند؛ ولی اگر همه منطق اصلی را <span dir="ltr">mock</span> کنیم، دیگر همکاری واقعی را نمی‌سنجیم.

## مثال اول: تزریق وابستگی

<div dir="ltr" align="left">

~~~js
import { expect, it, vi } from 'vitest';
function placeOrder(order, notify) {
  if (order.total <= 0) throw new Error('Invalid order');
  notify(order.id);
  return 'saved';
}
it('notifies after a valid order', () => {
  const notify = vi.fn();
  expect(placeOrder({ id: 7, total: 100 }, notify)).toBe('saved');
  expect(notify).toHaveBeenCalledWith(7);
});
~~~

</div>

<span dir="ltr">notify</span> جایگزین شده ولی تصمیم‌گیری <span dir="ltr">placeOrder</span> واقعی است. این مرز روشن، نسبت به <span dir="ltr">mock</span> کردن جزئیات تصادفی کد، نگهداری آسان‌تری دارد.

## مثال دوم: <span dir="ltr">Promise</span> کنترل‌شده

<div dir="ltr" align="left">

~~~js
const load = vi.fn().mockResolvedValue({ name: 'Sara' });
// برای مسیر خطا:
const fail = vi.fn().mockRejectedValue(new Error('Offline'));
~~~

</div>

این‌ها باید در تست با <span dir="ltr">await</span> مصرف شوند. <span dir="ltr">mock</span> نتیجه واقعی <span dir="ltr">API</span> را اثبات نمی‌کند؛ تست <span dir="ltr">integration</span> قرارداد شبکه یا <span dir="ltr">backend</span> جای جداگانه دارد.

<span dir="ltr">clear</span> تاریخچه فراخوانی، <span dir="ltr">reset</span> پیاده‌سازی <span dir="ltr">mock</span> و <span dir="ltr">restore</span> برگرداندن مورد جاسوسی‌شده را هدف می‌گیرند؛ کاربردشان یکسان نیست.

## پاسخ مصاحبه و تمرین

در تست خطای سرور فرم، خود <span dir="ltr">component</span> فرم را <span dir="ltr">mock</span> کنیم؟

<details>
<summary>پاسخ</summary>

خیر؛ رفتار فرم موضوع تست است. مرز شبکه را کنترل کن و ببین فرم خطا را چطور به کاربر نشان می‌دهد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Mocking in Vitest

Mocks are useful at boundaries you intentionally do not want a test to exercise. Over-mocking can produce a beautifully green suite that mostly proves your mocks agree with each other.

## Course notes: Mock Functions

When unit testing, we often need to isolate the code under test from its dependencies.

Examples:

- APIs
- Databases
- Email services
- Payment gateways
- External libraries

We don't want our tests to:

- Send real emails
- Call real APIs
- Connect to real databases

Instead, we replace these dependencies with **Mock Functions**.

---

## What is a Mock Function?

A mock function is a fake implementation of a function that allows us to:

- Control its behavior
- Track how it was called
- Verify interactions

Think of it as a stand-in for a real dependency.

---

## Why Use Mock Functions?

Suppose we have:

```js
function registerUser(emailService) {
  emailService.send()

  return true
}
```

We don't want a test to send a real email.

Instead:

```js
const emailService = {
  send: vi.fn(),
}
```

Now we can verify:

- Was `send()` called?
- How many times was it called?
- What arguments were passed?

without sending anything.

---

## Creating Mock Functions

Vitest provides:

```js
vi.fn()
```

The `vi` object is Vitest's utility object.

---

### Example

```js
const mockFn = vi.fn()
```

This creates an empty mock function.

---

### Usage

```js
mockFn()
```

Vitest automatically records:

- Call count
- Arguments
- Return values

---

## Example

```js
const log = vi.fn()

log("hello")
```

Now:

```js
expect(log).toHaveBeenCalled()
```

passes.

---

## Verifying Calls

One of the most common uses of mocks is checking whether a function was called.

---

## `toHaveBeenCalled()`

Checks whether a function was invoked.

---

### Example

```js
const fn = vi.fn()

fn()

expect(fn).toHaveBeenCalled()
```

Result:

```text
PASS
```

---

### Without Calling

```js
const fn = vi.fn()

expect(fn).toHaveBeenCalled()
```

Result:

```text
FAIL
```

---

## `toHaveBeenCalledOnce()`

Checks whether the function was called exactly one time.

---

### Example

```js
const fn = vi.fn()

fn()

expect(fn).toHaveBeenCalledOnce()
```

---

### Failure Example

```js
fn()
fn()
```

Now:

```js
expect(fn).toHaveBeenCalledOnce()
```

fails.

---

## `toHaveBeenCalledWith()`

Checks the arguments used during a call.

---

### Example

```js
const fn = vi.fn()

fn("John")
```

```js
expect(fn).toHaveBeenCalledWith("John")
```

Passes.

---

## Multiple Arguments

```js
fn("John", 25)
```

```js
expect(fn).toHaveBeenCalledWith("John", 25)
```

---

## Real-World Example

Function:

```js
function notify(emailService) {
  emailService.send("Welcome!")
}
```

Test:

```js
it("should send welcome email", () => {
  const send = vi.fn()

  notify({ send })

  expect(send).toHaveBeenCalledWith("Welcome!")
})
```

---

## Returning Values from Mock Functions

By default:

```js
vi.fn()
```

returns:

```js
undefined
```

Sometimes we need the mock to return a value.

---

## `mockReturnValue()`

Configures the value returned by a mock function.

---

### Example

```js
const getUser = vi.fn()

getUser.mockReturnValue({
  id: 1,
})
```

Now:

```js
getUser()
```

returns:

```js
{
  id: 1
}
```

---

### Test Example

```js
const getUser = vi.fn()

getUser.mockReturnValue("John")

expect(getUser()).toBe("John")
```

---

## Why Use mockReturnValue?

Suppose:

```js
function getGreeting(getUser) {
  return `Hello ${getUser()}`
}
```

Test:

```js
const getUser = vi.fn()

getUser.mockReturnValue("John")

expect(getGreeting(getUser)).toBe("Hello John")
```

---

## Mocking Async Functions

Many real-world dependencies return Promises.

Examples:

- API calls
- Database queries

Vitest provides special helpers.

---

## `mockResolvedValue()`

Creates a Promise that resolves automatically.

Equivalent to:

```js
Promise.resolve(value)
```

---

### Example

```js
const fetchUser = vi.fn()

fetchUser.mockResolvedValue({
  id: 1,
})
```

---

### Usage

```js
const user = await fetchUser()
```

Result:

```js
{
  id: 1
}
```

---

## Test Example

```js
it("should return a user", async () => {
  const fetchUser = vi.fn()

  fetchUser.mockResolvedValue({
    id: 1,
  })

  const user = await fetchUser()

  expect(user.id).toBe(1)
})
```

---

## Why mockResolvedValue?

Instead of:

```js
fetchUser.mockImplementation(() =>
  Promise.resolve({
    id: 1,
  }),
)
```

You can simply write:

```js
fetchUser.mockResolvedValue({
  id: 1,
})
```

Cleaner and easier to read.

---

## Custom Behavior

Sometimes returning a fixed value isn't enough.

We need custom logic.

---

## `mockImplementation()`

Provides a custom implementation.

---

### Example

```js
const add = vi.fn()

add.mockImplementation((a, b) => a + b)
```

---

### Usage

```js
expect(add(2, 3)).toBe(5)
```

---

## Another Example

```js
const greet = vi.fn()

greet.mockImplementation((name) => `Hello ${name}`)
```

---

### Result

```js
greet("John")
```

returns:

```js
"Hello John"
```

---

## Real-World Example

Suppose:

```js
function login(authService) {
  return authService.authenticate()
}
```

Test:

```js
const authenticate = vi.fn()

authenticate.mockImplementation(() => ({
  token: "abc123",
}))

expect(
  login({
    authenticate,
  }),
).toMatchObject({
  token: "abc123",
})
```

---

## Comparing Mock Helpers

### `mockReturnValue`

Returns the same value every time.

```js
vi.fn().mockReturnValue("John")
```

---

### `mockResolvedValue`

Returns a resolved Promise.

```js
vi.fn().mockResolvedValue("John")
```

Equivalent to:

```js
Promise.resolve("John")
```

---

### `mockImplementation`

Executes custom logic.

```js
vi.fn().mockImplementation((name) => `Hello ${name}`)
```

---

## Example: Complete Mock Test

```js
it("should send email", () => {
  const send = vi.fn()

  send.mockReturnValue(true)

  send("john@test.com")

  expect(send).toHaveBeenCalled()

  expect(send).toHaveBeenCalledOnce()

  expect(send).toHaveBeenCalledWith("john@test.com")
})
```

---

## Common Pattern

Arrange:

```js
const send = vi.fn()
```

---

Act:

```js
send("john@test.com")
```

---

Assert:

```js
expect(send).toHaveBeenCalled()
```

```js
expect(send).toHaveBeenCalledWith("john@test.com")
```

```js
expect(send).toHaveBeenCalledOnce()
```

---

## Mock Functions and Unit Testing

Mocks help ensure:

```text
Unit Test
↓
Tests One Unit
↓
Without Real Dependencies
```

This is one of the most important principles of unit testing.

---

## Key Takeaways

### Creating Mock Functions

```js
vi.fn()
```

---

### Return Values

```js
mockReturnValue()
```

Returns a regular value.

---

### Async Return Values

```js
mockResolvedValue()
```

Returns a resolved Promise.

---

### Custom Behavior

```js
mockImplementation()
```

Provides custom logic.

---

### Verify Calls

```js
toHaveBeenCalled()
```

Checks whether the function was called.

---

### Verify Arguments

```js
toHaveBeenCalledWith()
```

Checks the arguments.

---

### Verify Call Count

```js
toHaveBeenCalledOnce()
```

Checks that the function was called exactly once.

---

### Professional Rule

When testing code that depends on:

- APIs
- Databases
- Email services
- Authentication providers
- Third-party services

Use mock functions to isolate the unit under test and verify interactions without performing real operations.

## Course notes: Mocking Modules

In the previous lesson, we learned how to mock individual functions using:

```js
vi.fn()
```

However, real applications often import functions from other files (modules).

Example:

```js
import { sendEmail } from "./email"
```

```js
import { getUser } from "./users"
```

```js
import axios from "axios"
```

These dependencies may:

- Call APIs
- Send emails
- Access databases
- Read files

When unit testing, we usually don't want to execute the real implementation.

Instead, we replace entire modules with mocks.

This process is called:

```text
Module Mocking
```

---

## Why Mock Modules?

Suppose we have:

```js
// email.js

export function sendEmail() {
  // Real email logic
}
```

And:

```js
// register.js

import { sendEmail } from "./email"

export function registerUser() {
  sendEmail()
}
```

If we test:

```js
registerUser()
```

the real email service may execute.

That's undesirable because:

- Tests become slow
- Tests depend on external systems
- Side effects occur
- Tests become unreliable

---

## Goal of Module Mocking

Replace:

```js
Real Dependency
```

with:

```js
Fake Dependency
```

while testing.

---

## The `vi.mock()` Function

Vitest provides:

```js
vi.mock()
```

for mocking entire modules.

---

### Basic Syntax

```js
vi.mock("./email")
```

Vitest automatically replaces the module with a mocked version.

---

## Example Project Structure

```text
src/
│
├── email.js
├── register.js
└── register.test.js
```

---

### email.js

```js
export function sendEmail() {
  console.log("Sending email")
}
```

---

### register.js

```js
import { sendEmail } from "./email"

export function registerUser() {
  sendEmail()
}
```

---

### register.test.js

```js
import { vi } from "vitest"

vi.mock("./email")
```

Now:

```js
sendEmail()
```

becomes a mock function.

No real email is sent.

---

## Mocking a Module Factory

Sometimes we want complete control over the module.

---

### Syntax

```js
vi.mock("./email", () => {
  return {
    sendEmail: vi.fn(),
  }
})
```

---

This tells Vitest:

```text
Whenever "./email" is imported
↓
Use this fake implementation
```

instead.

---

## Example

```js
vi.mock("./email", () => ({
  sendEmail: vi.fn(),
}))
```

Now:

```js
sendEmail
```

is fully mocked.

---

## Verifying Module Calls

Suppose:

```js
import { sendEmail } from "./email"

import { registerUser } from "./register"
```

---

Test:

```js
vi.mock("./email", () => ({
  sendEmail: vi.fn(),
}))

it("should send email", () => {
  registerUser()

  expect(sendEmail).toHaveBeenCalled()
})
```

---

## Mocking Return Values

Modules often return data.

Example:

```js
export function getUser() {
  return {
    id: 1,
  }
}
```

---

Test:

```js
vi.mock("./users", () => ({
  getUser: vi.fn(),
}))
```

---

Configure:

```js
getUser.mockReturnValue({
  id: 10,
})
```

Now:

```js
getUser()
```

returns:

```js
{
  id: 10
}
```

---

## Example

Real module:

```js
// users.js

export function getUser() {
  return {
    id: 1,
    name: "John",
  }
}
```

---

Test:

```js
vi.mock("./users", () => ({
  getUser: vi.fn(),
}))

getUser.mockReturnValue({
  id: 99,
})
```

The test controls the returned data completely.

---

## Mocking Async Modules

Very common in real-world applications.

---

Example:

```js
export async function fetchUser() {
  return {
    id: 1,
  }
}
```

---

Mock:

```js
vi.mock("./api", () => ({
  fetchUser: vi.fn(),
}))
```

---

Configure:

```js
fetchUser.mockResolvedValue({
  id: 1,
})
```

---

Test

```js
const user = await fetchUser()

expect(user.id).toBe(1)
```

---

## Example: API Service

---

### api.js

```js
export async function getMovies() {
  // HTTP request
}
```

---

### movieService.js

```js
import { getMovies } from "./api"

export async function loadMovies() {
  return getMovies()
}
```

---

### movieService.test.js

```js
import { getMovies } from "./api"

import { loadMovies } from "./movieService"
```

---

Mock:

```js
vi.mock("./api", () => ({
  getMovies: vi.fn(),
}))
```

---

Configure:

```js
getMovies.mockResolvedValue([
  {
    id: 1,
    title: "Movie A",
  },
])
```

---

Test:

```js
it("should load movies", async () => {
  const movies = await loadMovies()

  expect(movies).toHaveLength(1)

  expect(getMovies).toHaveBeenCalled()
})
```

---

## Partial Module Mocking

Sometimes we want to mock only one function.

---

Module:

```js
export function add() {}
export function subtract() {}
```

---

Mock only:

```js
add()
```

while keeping:

```js
subtract()
```

real.

---

Vitest provides:

```js
vi.importActual()
```

---

Example

```js
vi.mock("./math", async () => {
  const actual = await vi.importActual("./math")

  return {
    ...actual,
    add: vi.fn(),
  }
})
```

---

Result

```text
add()       → Mocked
subtract()  → Real
```

---

## Mocking Third-Party Libraries

Module mocking is commonly used with:

- Axios
- Fetch wrappers
- Firebase
- Prisma
- Stripe SDKs

---

Example

```js
import axios from "axios"
```

---

Mock:

```js
vi.mock("axios")
```

---

Configure:

```js
axios.get.mockResolvedValue({
  data: [],
})
```

---

Test:

```js
expect(axios.get).toHaveBeenCalled()
```

---

## Common Mistakes

## 1. Forgetting to Mock Before Import Usage

Mocks should be defined before the tested behavior executes.

---

## 2. Testing the Mock Instead of Behavior

Bad:

```js
expect(getUser())
  .toEqual(...);
```

Good:

```js
expect(loadUser())
  .toEqual(...);
```

Test your code.

Not the mock.

---

## 3. Over-Mocking

Avoid mocking everything.

Mock only external dependencies.

---

Good Candidates

```text
APIs
Databases
Email Services
Authentication Providers
Third-Party Libraries
```

---

Usually Don't Mock

```text
Pure Functions
Business Logic
Utility Functions
```

These are often the code you actually want to test.

---

## Mock Functions vs Mock Modules

### Mock Function

Mocks one function.

```js
const fn = vi.fn()
```

---

### Mock Module

Mocks an imported module.

```js
vi.mock("./email")
```

---

## Real-World Workflow

```text
Service Under Test
        ↓
Depends On API
        ↓
Mock API Module
        ↓
Control Returned Data
        ↓
Verify Behavior
```

This pattern appears constantly in professional projects.

---

## Key Takeaways

### Mock an Entire Module

```js
vi.mock("./module")
```

---

### Custom Module Mock

```js
vi.mock("./module", () => ({
  fn: vi.fn(),
}))
```

---

### Return Data

```js
mockReturnValue()
```

---

### Return Async Data

```js
mockResolvedValue()
```

---

### Verify Calls

```js
toHaveBeenCalled()
```

---

### Partial Mocking

```js
vi.importActual()
```

Allows mixing real and mocked functions.

---

### Professional Rule

Mock modules when they represent:

- External services
- Network calls
- Databases
- File systems
- Third-party libraries

Keep business logic real and test it directly.

The goal is to isolate the unit under test while maintaining fast, reliable, and predictable tests.

## Course notes: Partial Mocking

In previous lessons, we learned how to completely mock a module using:

```js
vi.mock("./module")
```

or

```js
vi.mock("./module", () => ({
  fn: vi.fn(),
}))
```

However, sometimes we don't want to mock the entire module.

Instead:

```text
Keep Most Functions Real
↓
Mock Only One Specific Function
```

This technique is called:

```text
Partial Mocking
```

---

## Why Partial Mocking?

Consider a module:

```js
// email.js

export function sendEmail() {
  // Sends a real email
}

export function validateEmail(email) {
  return email.includes("@")
}
```

Suppose our tests need:

```text
validateEmail() → Real
sendEmail()     → Mocked
```

Why?

Because:

```text
validateEmail()
```

is business logic we want to test.

But:

```text
sendEmail()
```

is an external side effect that should not run during tests.

---

## The Problem with Full Mocking

If we do:

```js
vi.mock("../libs/email")
```

Every exported function becomes mocked.

Result:

```text
sendEmail()      → Mocked
validateEmail()  → Mocked
```

Now we lose the real implementation of:

```js
validateEmail()
```

which may be important to our test.

---

## Solution: Partial Mocking

Vitest allows us to:

1. Import the real module
2. Keep its exports
3. Replace only selected functions

---

## The Pattern

```js
vi.mock("../libs/email", async (importOriginal) => {
  const originalModule = await importOriginal()

  return {
    ...originalModule,

    sendEmail: vi.fn(),
  }
})
```

---

## Breaking It Down

### Step 1

```js
async (importOriginal) => {
```

Vitest passes a helper function:

```js
importOriginal
```

This allows us to access the actual module.

---

### Step 2

```js
const originalModule = await importOriginal()
```

Imports the real module.

Equivalent to:

```js
import * as emailModule from "../libs/email"
```

but designed specifically for mocking.

---

### Step 3

```js
return {
  ...originalModule,
}
```

Copy all exports.

Result:

```text
Everything remains real
```

---

### Step 4

Override specific functions.

```js
sendEmail: vi.fn(),
```

Result:

```text
validateEmail() → Real
sendEmail()     → Mock
```

---

## Complete Example

### email.js

```js
export function validateEmail(email) {
  return email.includes("@")
}

export function sendEmail(email) {
  console.log(`Sending email to ${email}`)
}
```

---

### userService.js

```js
import { validateEmail, sendEmail } from "../libs/email"

export function register(email) {
  if (!validateEmail(email)) throw new Error("Invalid Email")

  sendEmail(email)
}
```

---

### userService.test.js

```js
import { vi } from "vitest"

vi.mock("../libs/email", async (importOriginal) => {
  const originalModule = await importOriginal()

  return {
    ...originalModule,

    sendEmail: vi.fn(),
  }
})
```

---

## What Happens?

#### Real

```js
validateEmail()
```

still executes normally.

---

#### Mocked

```js
sendEmail()
```

becomes:

```js
vi.fn()
```

No email is sent.

---

## Testing Interactions

```js
import { sendEmail } from "../libs/email"

it("should send email after registration", () => {
  register("john@test.com")

  expect(sendEmail).toHaveBeenCalled()
})
```

---

## Visual Representation

Without Partial Mocking:

```text
email.js

validateEmail()  → Mock
sendEmail()      → Mock
```

---

With Partial Mocking:

```text
email.js

validateEmail()  → Real
sendEmail()      → Mock
```

---

## Real-World Example: Axios Wrapper

Suppose:

```js
api.js
```

contains:

```js
export const BASE_URL = "https://api.com"

export async function get() {}

export async function post() {}
```

---

We want:

```text
BASE_URL → Real
post()   → Real
get()    → Mock
```

---

Partial Mock:

```js
vi.mock("../api", async (importOriginal) => {
  const originalModule = await importOriginal()

  return {
    ...originalModule,

    get: vi.fn(),
  }
})
```

---

## Why Not Mock Everything?

Over-mocking creates tests that:

- Are harder to understand
- Hide bugs
- Test fake implementations

Example:

```js
validateEmail()
```

If mocked, we never verify the real validation logic.

Partial mocking allows us to mock only the expensive or external parts.

---

## Common Use Cases

### External Services

```js
sendEmail()
```

```js
sendSMS()
```

```js
publishEvent()
```

---

### API Calls

```js
getMovies()
```

```js
getUsers()
```

---

### Database Operations

```js
save()
```

```js
delete()
```

---

While keeping:

```js
Validation Logic
Formatting Logic
Business Rules
```

real.

---

## Difference Between Full and Partial Mocking

### Full Mock

```js
vi.mock("../libs/email")
```

Result:

```text
Everything Mocked
```

---

### Partial Mock

```js
vi.mock("../libs/email", async (importOriginal) => {
  const originalModule = await importOriginal()

  return {
    ...originalModule,
    sendEmail: vi.fn(),
  }
})
```

Result:

```text
Everything Real
Except sendEmail()
```

---

## Mosh's Key Idea

The purpose of partial mocking is:

```text
Mock Side Effects
↓
Keep Business Logic Real
```

This gives us:

- Faster tests
- Safer tests
- More realistic tests

without triggering external dependencies.

---

## Key Takeaways

### Partial Mocking

Allows mocking only selected exports while keeping the rest of the module real.

---

### Pattern

```js
vi.mock("../libs/email", async (importOriginal) => {
  const originalModule = await importOriginal()

  return {
    ...originalModule,

    sendEmail: vi.fn(),
  }
})
```

---

### What Does `importOriginal()` Do?

```js
await importOriginal()
```

Loads the real module.

---

### Why Use `...originalModule`?

```js
...originalModule
```

Preserves all original exports.

---

### Why Override Specific Functions?

```js
sendEmail: vi.fn()
```

Replaces only the dependency that causes side effects.

---

### Professional Rule

When a module contains:

```text
Business Logic
+
External Side Effects
```

Use Partial Mocking.

Keep the business logic real and mock only the side-effect-producing functions.

## Course notes: Clearing, Resetting, and Restoring Mocks

When working with mocks and spies, Vitest tracks information about every mock function.

For example:

```js
const fn = vi.fn()

fn("John")
fn("Bob")
```

Vitest records:

- Number of calls
- Arguments passed
- Return values
- Instances created

This information is stored internally in the mock object.

---

## Mock State

Example:

```js
const fn = vi.fn()

fn("John")
fn("Bob")
```

Vitest stores something like:

```js
fn.mock
```

```js
{
  calls: [["John"], ["Bob"]]
}
```

This is called:

```text
Mock State
```

---

## Why Clean Mocks?

Suppose:

```js
it("test 1", () => {
  fn()

  expect(fn).toHaveBeenCalledOnce()
})

it("test 2", () => {
  expect(fn).toHaveBeenCalledOnce()
})
```

Without cleaning:

```text
Test 1
↓
Call Count = 1

Test 2
↓
Call Count Still = 1
```

The second test may fail unexpectedly.

Tests should be:

```text
Independent
```

Therefore mock state should often be cleaned between tests.

---

## Three Important Methods

Vitest provides:

```js
mockClear()
mockReset()
mockRestore()
```

They sound similar but do different things.

---

## 1. mockClear()

This is the method you'll use most often.

---

### What Does It Do?

Removes:

```text
Call History
Arguments
Call Count
```

but keeps:

```text
Mock Implementation
Return Values
```

---

## Example

```js
const fn = vi.fn()

fn("John")
```

Call count:

```js
expect(fn).toHaveBeenCalledOnce()
```

---

Clear:

```js
fn.mockClear()
```

Now:

```js
expect(fn).not.toHaveBeenCalled()
```

passes.

---

## What Stays?

```js
const fn = vi.fn()

fn.mockReturnValue(10)

fn.mockClear()
```

Still:

```js
fn()
```

returns:

```js
10
```

because the implementation remains.

---

## Visual Representation

Before:

```text
Calls: 5
Implementation: Exists
```

After:

```text
Calls: 0
Implementation: Exists
```

---

## Common Usage

```js
afterEach(() => {
  fn.mockClear()
})
```

or

```js
beforeEach(() => {
  fn.mockClear()
})
```

---

## 2. mockReset()

More aggressive than:

```js
mockClear()
```

---

### What Does It Do?

Removes:

```text
Call History
Arguments
Call Count
Implementation
Return Values
```

---

## Example

```js
const fn = vi.fn()

fn.mockReturnValue(10)
```

---

Before reset:

```js
fn()
```

returns:

```js
10
```

---

Reset:

```js
fn.mockReset()
```

---

After reset:

```js
fn()
```

returns:

```js
undefined
```

because the implementation was removed.

---

## Visual Representation

Before:

```text
Calls: 5
Implementation: Exists
```

After:

```text
Calls: 0
Implementation: Removed
```

---

## Example

```js
const fn = vi.fn()

fn.mockReturnValue(100)

fn.mockReset()

expect(fn()).toBeUndefined()
```

---

## When To Use mockReset()

Use when:

```text
You Want A Completely Fresh Mock
```

This is less common than:

```js
mockClear()
```

---

## 3. mockRestore()

Used primarily with:

```js
vi.spyOn()
```

---

## What Does It Do?

Restores the original implementation.

---

Example:

```js
const math = {
  add(a, b) {
    return a + b
  },
}
```

---

Create spy:

```js
const spy = vi.spyOn(math, "add")
```

---

Override:

```js
spy.mockReturnValue(100)
```

Now:

```js
math.add(2, 3)
```

returns:

```js
100
```

---

Restore:

```js
spy.mockRestore()
```

Now:

```js
math.add(2, 3)
```

returns:

```js
5
```

again.

---

## Visual Representation

Before Spy:

```text
Original Function
```

---

After Spy Override:

```text
Mock Function
```

---

After Restore:

```text
Original Function Again
```

---

## Important

`mockRestore()` is most useful for:

```js
vi.spyOn()
```

because spies wrap real functions.

---

## Global Cleanup Methods

Instead of cleaning individual mocks:

```js
mock1.mockClear()
mock2.mockClear()
mock3.mockClear()
```

Vitest provides global helpers.

---

## clearAllMocks()

Most commonly used.

---

### What Does It Do?

Equivalent to:

```js
mockClear()
```

for every mock.

---

Removes:

```text
Call History
Arguments
Call Count
```

Keeps:

```text
Implementations
```

---

## Example

```js
afterEach(() => {
  vi.clearAllMocks()
})
```

This is one of the most common patterns in professional projects.

---

## resetAllMocks()

Equivalent to:

```js
mockReset()
```

for all mocks.

---

Removes:

```text
Call History
Implementation
Return Values
```

---

Example:

```js
afterEach(() => {
  vi.resetAllMocks()
})
```

---

## restoreAllMocks()

Equivalent to:

```js
mockRestore()
```

for all spies.

---

Example:

```js
afterEach(() => {
  vi.restoreAllMocks()
})
```

---

## Comparison Table

| Method            | Clears Calls | Removes Implementation | Restores Original Function |
| ----------------- | ------------ | ---------------------- | -------------------------- |
| mockClear()       | ✅           | ❌                     | ❌                         |
| mockReset()       | ✅           | ✅                     | ❌                         |
| mockRestore()     | ✅           | ✅                     | ✅                         |
| clearAllMocks()   | ✅           | ❌                     | ❌                         |
| resetAllMocks()   | ✅           | ✅                     | ❌                         |
| restoreAllMocks() | ✅           | ✅                     | ✅                         |

---

## Real-World Example

```js
const sendEmail = vi.fn()

beforeEach(() => {
  sendEmail.mockClear()
})
```

Every test starts with:

```text
0 Calls
```

while keeping:

```text
Same Mock Implementation
```

---

## Why Is mockClear() Used Most Often?

Most tests need:

```text
Fresh Call History
```

but still want:

```text
Same Mock Behavior
```

Example:

```js
sendEmail.mockReturnValue(true)
```

We usually don't want to redefine this in every test.

So:

```js
mockClear()
```

is the perfect choice.

---

## Interview Question

### Difference Between mockClear and mockReset

#### mockClear

Removes:

```text
Call History
```

Keeps:

```text
Implementation
```

---

#### mockReset

Removes:

```text
Call History
Implementation
```

---

Example:

```js
fn.mockReturnValue(10)
```

After:

```js
mockClear()
```

still returns:

```js
10
```

After:

```js
mockReset()
```

returns:

```js
undefined
```

---

## Key Takeaways

### mockClear()

```js
mock.mockClear()
```

Removes:

- Call history
- Arguments
- Call count

Keeps:

- Implementation
- Return values

Most commonly used.

---

### mockReset()

```js
mock.mockReset()
```

Removes:

- Call history
- Implementation
- Return values

Creates a fresh mock.

---

### mockRestore()

```js
mock.mockRestore()
```

Restores the original implementation.

Typically used with:

```js
vi.spyOn()
```

---

### Global Helpers

```js
vi.clearAllMocks()
```

Equivalent to:

```js
mockClear()
```

for all mocks.

---

```js
vi.resetAllMocks()
```

Equivalent to:

```js
mockReset()
```

for all mocks.

---

```js
vi.restoreAllMocks()
```

Equivalent to:

```js
mockRestore()
```

for all spies.

---

### Professional Rule

Use:

```js
vi.clearAllMocks()
```

in most projects because tests usually need:

```text
Fresh Call History
```

while keeping:

```text
Existing Mock Behavior
```

This is why `mockClear()` and `clearAllMocks()` are by far the most commonly used cleanup methods in real-world unit testing.

## Rule of thumb

Prefer a real implementation when it is fast, deterministic, and part of the behavior under test. Mock unstable/expensive/external boundaries or when isolation is the actual purpose of the test.

</div>

</details>

</div>
