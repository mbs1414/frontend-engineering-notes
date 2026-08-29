# Fake Timers and Dates

Tests involving time should be deterministic. Freeze time when calendar/date logic is under test, and use fake timers when timer scheduling is part of the behavior.

## Course notes: Mocking Dates in Vitest

One of the most common sources of unreliable tests is:

```js
new Date()
```

or

```js
Date.now()
```

Why?

Because the current date and time constantly change.

A test that passes today may fail tomorrow.

This creates:

```text
Flaky Tests
```

Tests should be:

- Repeatable
- Predictable
- Independent of the current time

To achieve this, we mock dates.

---

## The Problem with Real Dates

Suppose we have:

```js
export function isWeekend() {
  const today = new Date()

  const day = today.getDay()

  return day === 0 || day === 6
}
```

---

Test:

```js
expect(isWeekend()).toBe(false)
```

This test might:

```text
Pass on Monday
Fail on Saturday
```

because it depends on the actual date.

---

## Why Mock Dates?

Instead of using:

```text
Current System Time
```

we use:

```text
Controlled Fake Time
```

This makes tests deterministic.

---

## Vitest Fake Timers

Vitest provides:

```js
vi.useFakeTimers()
```

This allows Vitest to control:

- Date
- Timers
- Time-related APIs

---

## Setting a Fake Date

Vitest provides:

```js
vi.setSystemTime()
```

---

### Example

```js
vi.useFakeTimers()

vi.setSystemTime(new Date("2025-01-01"))
```

Now:

```js
new Date()
```

returns:

```js
2025 - 01 - 01
```

regardless of the real date.

---

## Basic Example

Function:

```js
export function getCurrentYear() {
  return new Date().getFullYear()
}
```

---

Test:

```js
import { expect, it, vi } from "vitest"

it("should return current year", () => {
  vi.useFakeTimers()

  vi.setSystemTime(new Date("2025-06-15"))

  expect(getCurrentYear()).toBe(2025)
})
```

---

## Testing Weekend Logic

Function:

```js
export function isWeekend() {
  const day = new Date().getDay()

  return day === 0 || day === 6
}
```

---

Test Saturday

```js
vi.useFakeTimers()

vi.setSystemTime(new Date("2025-06-14"))
```

---

Assert

```js
expect(isWeekend()).toBe(true)
```

---

Test Monday

```js
vi.setSystemTime(new Date("2025-06-16"))
```

---

Assert

```js
expect(isWeekend()).toBe(false)
```

---

## Common Pattern

Arrange:

```js
vi.useFakeTimers()

vi.setSystemTime(fakeDate)
```

---

Act:

```js
const result = someFunction()
```

---

Assert:

```js
expect(result).toBe(expected)
```

---

## Restoring Real Time

After mocking time:

```js
vi.useRealTimers()
```

should usually be called.

---

Example:

```js
afterEach(() => {
  vi.useRealTimers()
})
```

This prevents one test from affecting another.

---

## Complete Example

```js
import { afterEach, expect, it, vi } from "vitest"

afterEach(() => {
  vi.useRealTimers()
})

it("should return 2025", () => {
  vi.useFakeTimers()

  vi.setSystemTime(new Date("2025-01-01"))

  expect(getCurrentYear()).toBe(2025)
})
```

---

## Mocking Date.now()

Many applications use:

```js
Date.now()
```

instead of:

```js
new Date()
```

The same technique works.

---

Example

```js
vi.useFakeTimers()

vi.setSystemTime(new Date("2025-01-01"))
```

---

Now:

```js
Date.now()
```

returns the timestamp for:

```text
2025-01-01
```

---

## Alternative Approach: Spying

Sometimes you'll see:

```js
vi.spyOn(Date, "now")
```

---

Example

```js
vi.spyOn(Date, "now").mockReturnValue(new Date("2025-01-01").getTime())
```

---

Result

```js
Date.now()
```

always returns:

```text
January 1, 2025
```

---

## Which Approach Is Better?

Usually:

```js
vi.useFakeTimers()
```

and

```js
vi.setSystemTime()
```

are preferred.

Why?

Because they affect:

```text
Date.now()
new Date()
Timers
```

all at once.

---

## Real-World Example

Function:

```js
export function canVote(birthYear) {
  const currentYear = new Date().getFullYear()

  return currentYear - birthYear >= 18
}
```

---

Test

```js
vi.useFakeTimers()

vi.setSystemTime(new Date("2025-01-01"))

expect(canVote(2000)).toBe(true)
```

---

Without mocking:

```text
Result Changes Every Year
```

which is bad for testing.

---

## Common Mistakes

### Forgetting Fake Timers

Bad:

```js
vi.setSystemTime(new Date())
```

without:

```js
vi.useFakeTimers()
```

---

Always enable fake timers first.

---

### Forgetting Real Timers

Bad:

```js
vi.useFakeTimers()
```

and never restoring them.

---

Good:

```js
afterEach(() => {
  vi.useRealTimers()
})
```

---

### Using Today's Date in Tests

Bad:

```js
expect(getCurrentYear()).toBe(2026)
```

This will eventually fail.

Always control time explicitly.

---

## Interview Question

### Why Mock Dates?

Answer:

```text
To make tests deterministic
and independent of the
actual system time.
```

---

## Key Takeaways

### Enable Fake Timers

```js
vi.useFakeTimers()
```

---

### Set Fake Date

```js
vi.setSystemTime(new Date("2025-01-01"))
```

---

### Restore Real Time

```js
vi.useRealTimers()
```

---

### Alternative

```js
vi.spyOn(Date, "now")
```

Can mock:

```js
Date.now()
```

directly.

---

### Professional Rule

Any test that depends on:

```text
Current Date
Current Time
Current Year
Expiration Dates
Age Calculations
Scheduling Logic
```

should mock time.

Never let your tests depend on the actual clock.

Controlled time leads to reliable, repeatable, and trustworthy tests.

## More timer APIs to know

Depending on the test, useful controls include advancing time by a specific amount, running pending timers, or restoring real timers in cleanup.

Be careful with `userEvent` plus fake timers: simulated user interactions may schedule timers, so configure/advance them intentionally rather than leaving the test suspended in temporal purgatory.
