# Spies and Interaction Testing

Interaction testing verifies that collaboration occurred: a dependency was called, called with specific arguments, or called a certain number of times.

Use it when the interaction itself is part of the contract. Prefer state/output verification when users care about the result rather than the internal call choreography.

## Course notes: Spying in Vitest

So far we've learned:

- Mock Functions (`vi.fn()`)
- Mocking Modules (`vi.mock()`)
- Partial Mocking
- Interaction Testing

Another important testing technique is:

```text
Spying
```

Spying allows us to observe how a function is used without necessarily replacing its implementation.

---

## What is a Spy?

A spy is a wrapper around an existing function that records:

- Whether it was called
- How many times it was called
- Which arguments were passed
- What it returned

while optionally keeping the original implementation.

Think of a spy as:

```text
Hidden Camera 🎥
```

The function still runs, but we're watching it.

---

## Mock vs Spy

### Mock

Replaces the function.

```js
const sendEmail = vi.fn()
```

Result:

```text
Original Function Removed
```

---

### Spy

Observes the function.

```js
vi.spyOn(object, "method")
```

Result:

```text
Original Function Still Runs
```

unless we override it.

---

## Why Use Spies?

Suppose we have:

```js
const logger = {
  log(message) {
    console.log(message)
  },
}
```

We want to verify:

```text
Was log() called?
```

without replacing the method.

A spy is perfect for this.

---

## Creating a Spy

Vitest provides:

```js
vi.spyOn()
```

---

### Syntax

```js
vi.spyOn(object, "method")
```

---

## Example

```js
const logger = {
  log(message) {
    console.log(message)
  },
}

const spy = vi.spyOn(logger, "log")
```

Now:

```js
logger.log("hello")
```

can be inspected.

---

## Verifying Calls

```js
expect(spy).toHaveBeenCalled()
```

---

## Verifying Arguments

```js
expect(spy).toHaveBeenCalledWith("hello")
```

---

## Complete Example

```js
const logger = {
  log(message) {
    console.log(message)
  },
}

const spy = vi.spyOn(logger, "log")

logger.log("test")

expect(spy).toHaveBeenCalled()

expect(spy).toHaveBeenCalledWith("test")
```

---

## Original Implementation Still Runs

This is the biggest difference between spies and mocks.

---

Example:

```js
const math = {
  add(a, b) {
    return a + b
  },
}

const spy = vi.spyOn(math, "add")

const result = math.add(2, 3)
```

Result:

```js
5
```

because the real implementation executes.

---

Test:

```js
expect(result).toBe(5)

expect(spy).toHaveBeenCalled()
```

---

## Overriding a Spy

Sometimes we want:

```text
Spy
+
Custom Behavior
```

---

Example

```js
const spy = vi.spyOn(math, "add")

spy.mockReturnValue(100)
```

---

Now:

```js
math.add(2, 3)
```

returns:

```js
100
```

instead of:

```js
5
```

---

## Example

```js
const math = {
  add(a, b) {
    return a + b
  },
}

const spy = vi.spyOn(math, "add")

spy.mockReturnValue(100)

expect(math.add(2, 3)).toBe(100)
```

Now the spy behaves like a mock.

---

## Spying on Module Functions

Suppose:

```js
// email.js

export function sendEmail() {
  console.log("email")
}
```

---

Import:

```js
import * as email from "./email"
```

---

Create Spy:

```js
const spy = vi.spyOn(email, "sendEmail")
```

---

Use:

```js
email.sendEmail()
```

---

Verify:

```js
expect(spy).toHaveBeenCalled()
```

---

## Common Real-World Example

Suppose:

```js
logger.info("User created")
```

We want to verify logging occurred.

---

Test:

```js
const spy = vi.spyOn(logger, "info")

createUser()

expect(spy).toHaveBeenCalledWith("User created")
```

---

## Restoring Original Behavior

Spies modify functions.

After tests, restore them.

---

### Restore One Spy

```js
spy.mockRestore()
```

---

Example

```js
const spy = vi.spyOn(math, "add")

spy.mockRestore()
```

Original implementation returns.

---

## Restore All Spies

```js
vi.restoreAllMocks()
```

Often used in:

```js
afterEach(() => {
  vi.restoreAllMocks()
})
```

---

## Why Restore?

Without restoration:

```text
Test A modifies function
↓
Test B accidentally uses modified version
↓
Unexpected failures
```

Restoration prevents test pollution.

---

## Spy vs Mock Comparison

| Feature                       | Spy | Mock |
| ----------------------------- | --- | ---- |
| Tracks calls                  | ✅  | ✅   |
| Tracks arguments              | ✅  | ✅   |
| Keeps original implementation | ✅  | ❌   |
| Can override behavior         | ✅  | ✅   |
| Replaces function entirely    | ❌  | ✅   |

---

## When to Use a Spy

Use a spy when:

```text
You Want To Observe
Not Replace
```

Examples:

- Logging
- Analytics
- Event publishing
- Notifications
- Function usage tracking

---

## When to Use a Mock

Use a mock when:

```text
You Need Complete Control
```

Examples:

- API calls
- Database operations
- Email services
- Payment gateways

---

## Example: Interaction Testing with Spy

Function:

```js
const emailService = {
  send(email) {
    return true
  },
}

function register() {
  emailService.send("john@test.com")
}
```

---

Test:

```js
const spy = vi.spyOn(emailService, "send")

register()

expect(spy).toHaveBeenCalledWith("john@test.com")
```

Notice:

```text
send()
still runs
```

but we can verify the interaction.

---

## Common Interview Question

### Difference Between `vi.fn()` and `vi.spyOn()`

#### `vi.fn()`

Creates a completely fake function.

```js
const fn = vi.fn()
```

---

#### `vi.spyOn()`

Wraps an existing function.

```js
vi.spyOn(object, "method")
```

---

Result:

```text
vi.fn()
↓
Replace

vi.spyOn()
↓
Observe
```

---

## Key Takeaways

### Create a Spy

```js
vi.spyOn(object, "method")
```

---

### Verify Calls

```js
expect(spy).toHaveBeenCalled()
```

---

### Verify Arguments

```js
expect(spy).toHaveBeenCalledWith(value)
```

---

### Override Behavior

```js
spy.mockReturnValue(value)
```

---

### Restore Original Function

```js
spy.mockRestore()
```

or

```js
vi.restoreAllMocks()
```

---

### Professional Rule

Use:

```text
Spy
```

when you want to observe an existing function.

Use:

```text
Mock
```

when you want to replace a dependency entirely.

A spy lets you verify interactions while preserving the original behavior, making it ideal for tracking how a unit communicates with its collaborators.

## Course notes: Interaction Testing

When writing unit tests, we typically verify one of two things:

1. The result produced by a unit.
2. The interaction between units.

This leads to two major uses of mock functions:

```text
1. Provide Values (State Verification)
2. Test Interactions (Interaction Verification)
```

Understanding the difference is important because interaction testing is one of the most common patterns in real-world applications.

---

## What is Interaction Testing?

Interaction Testing verifies that one unit communicates correctly with its dependencies.

Instead of checking:

```text
What was returned?
```

we check:

```text
What was called?
How many times?
With what arguments?
```

---

## State Verification vs Interaction Verification

### State Verification

Checks the output or state of the system.

Example:

```js
function add(a, b) {
  return a + b
}
```

Test:

```js
expect(add(2, 3)).toBe(5)
```

We verify:

```text
Returned Value
```

---

### Interaction Verification

Checks communication between objects.

Example:

```js
emailService.send()
```

Test:

```js
expect(send).toHaveBeenCalled()
```

We verify:

```text
Behavior Between Units
```

---

## Two Uses of Mock Functions

According to Mosh, mock functions are primarily used for:

```text
1. Providing Values
2. Testing Interactions
```

---

## Use Case #1: Providing Values

Suppose:

```js
function getGreeting(getUser) {
  return `Hello ${getUser()}`
}
```

---

Test:

```js
const getUser = vi.fn()

getUser.mockReturnValue("John")

expect(getGreeting(getUser)).toBe("Hello John")
```

---

Why use a mock?

```text
Control Input
```

The mock provides predictable data.

---

This type of testing focuses on:

```text
Returned Values
```

rather than interactions.

---

## Use Case #2: Testing Interactions

Suppose:

```js
function registerUser(emailService) {
  emailService.send("welcome@email.com")
}
```

---

Test:

```js
const send = vi.fn()

registerUser({
  send,
})

expect(send).toHaveBeenCalled()
```

---

Here we don't care about:

```text
Return Value
```

Instead we care about:

```text
Did send() execute?
```

This is interaction testing.

---

## Real-World Example

Imagine:

```js
function placeOrder(paymentGateway) {
  paymentGateway.charge(100)
}
```

---

What should we verify?

Not:

```text
How charge() works
```

because that's another unit.

Instead:

```text
Did placeOrder()
call charge()?
```

---

Test:

```js
const charge = vi.fn()

placeOrder({
  charge,
})

expect(charge).toHaveBeenCalled()
```

---

## Verifying Arguments

Often the interaction itself isn't enough.

We also want to verify the data being passed.

---

Example:

```js
function placeOrder(paymentGateway) {
  paymentGateway.charge(100)
}
```

---

Test:

```js
expect(charge).toHaveBeenCalledWith(100)
```

This confirms:

```text
Correct Dependency
+
Correct Data
```

---

## Verifying Call Count

Sometimes an action should occur exactly once.

---

Example:

```js
expect(send).toHaveBeenCalledOnce()
```

---

This prevents:

```text
Duplicate Emails
Duplicate Charges
Duplicate Requests
```

---

## Example: Email Service

Function:

```js
function register(emailService) {
  emailService.send("welcome")
}
```

---

Test:

```js
it("should send a welcome email", () => {
  const send = vi.fn()

  register({
    send,
  })

  expect(send).toHaveBeenCalled()

  expect(send).toHaveBeenCalledOnce()

  expect(send).toHaveBeenCalledWith("welcome")
})
```

---

## Example: Logging

Suppose:

```js
function processOrder(logger) {
  logger.log("Order processed")
}
```

---

Test:

```js
const log = vi.fn()

processOrder({
  log,
})

expect(log).toHaveBeenCalledWith("Order processed")
```

---

## Interaction Testing and Unit Testing

One goal of unit testing is:

```text
Testing One Unit In Isolation
```

Interaction testing helps achieve this.

---

Example:

```text
OrderService
↓
PaymentGateway
```

We don't want to test:

```text
PaymentGateway
```

inside:

```text
OrderService Test
```

Instead:

```text
Mock PaymentGateway
Verify Interaction
```

---

## Common Interaction Assertions

### Was It Called?

```js
expect(fn).toHaveBeenCalled()
```

---

### Called Once?

```js
expect(fn).toHaveBeenCalledOnce()
```

---

### Called With Arguments?

```js
expect(fn).toHaveBeenCalledWith(value)
```

---

### Multiple Arguments

```js
expect(fn).toHaveBeenCalledWith("John", 25)
```

---

## Example: User Service

Function:

```js
function saveUser(repository, user) {
  repository.save(user)
}
```

---

Test:

```js
const save = vi.fn()

const user = {
  id: 1,
}

saveUser({ save }, user)

expect(save).toHaveBeenCalledWith(user)
```

---

## Common Mistake

Testing implementation details instead of behavior.

Bad:

```js
expect(service.users).toHaveLength(1)
```

if the requirement is:

```text
Save User
```

---

Better:

```js
expect(save).toHaveBeenCalledWith(user)
```

Focus on:

```text
Behavior
```

not internal implementation.

---

## Interaction Testing Flow

```text
Arrange
↓
Create Mock Dependency

Act
↓
Execute Unit Under Test

Assert
↓
Verify Interaction
```

---

## Example

```js
const send = vi.fn()

registerUser({
  send,
})

expect(send).toHaveBeenCalledWith("welcome@email.com")
```

---

## When to Use Interaction Testing

Use interaction testing when a unit:

- Calls another service
- Sends emails
- Saves data
- Logs information
- Calls an API
- Publishes events
- Writes files

---

## When Not to Use Interaction Testing

For pure functions:

```js
function add(a, b) {
  return a + b
}
```

Interaction testing adds no value.

Use:

```js
expect(add(2, 3)).toBe(5)
```

instead.

---

## Key Takeaways

### Two Main Uses of Mock Functions

#### 1. Providing Values

```js
mockReturnValue()
```

Used to control input and outputs.

Example:

```js
getUser.mockReturnValue("John")
```

---

#### 2. Testing Interactions

Used to verify communication between units.

Examples:

```js
toHaveBeenCalled()
```

```js
toHaveBeenCalledWith()
```

```js
toHaveBeenCalledOnce()
```

---

### Interaction Testing Verifies

- Was a dependency called?
- Was it called once?
- Was it called with the correct arguments?

---

### Professional Rule

When testing business logic that depends on another service:

```text
Mock the Dependency
↓
Execute the Unit
↓
Verify the Interaction
```

Do not test the dependency itself.

Verify that your unit communicates with it correctly.

This keeps unit tests fast, isolated, and focused on a single responsibility.
