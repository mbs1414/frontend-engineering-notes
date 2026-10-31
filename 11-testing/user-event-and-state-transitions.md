<div dir="rtl" align="right">

# کلیک تنها یک <span dir="ltr">event</span> نیست — <span dir="ltr">userEvent</span> و تغییر وضعیت

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">RTL</span>](./react-testing-library.md).

کاربر هنگام تایپ و کلیک، مجموعه‌ای از رفتارهای مرورگر را ایجاد می‌کند؛ <span dir="ltr">userEvent</span> تلاش می‌کند تعامل سطح بالاتری را شبیه‌سازی کند. معمولاً یک <span dir="ltr">instance</span> برای هر تست می‌سازیم و تعامل‌ها را <span dir="ltr">await</span> می‌کنیم.

## مثال اول: تایپ

<div dir="ltr" align="left">

~~~jsx
const user = userEvent.setup();
render(<input aria-label="نام" />);
const input = screen.getByRole('textbox', { name: 'نام' });
await user.type(input, 'Sara');
expect(input).toHaveValue('Sara');
~~~

</div>

این بخش داخل تست <span dir="ltr">async</span> با <span dir="ltr">import</span>های درس <span dir="ltr">RTL</span> است. اگر <span dir="ltr">input</span> مقدار قبلی دارد، برای جایگزینی آن <span dir="ltr">user.clear</span> و سپس <span dir="ltr">user.type</span> مناسب است.

## مثال دوم: حالت‌ها را دنبال کن

<div dir="ltr" align="left">

~~~text
فرم خالی -> تایپ معتبر -> ارسال -> pending -> موفق یا خطا
~~~

</div>

فقط بررسی <span dir="ltr">callback</span> ارسال کافی نیست؛ ببین کنترل‌ها، پیام‌ها و امکان ارسال دوباره در هر حالت چه رفتاری دارند. برای <span dir="ltr">checkbox</span> از <span dir="ltr">role</span> مناسب و <span dir="ltr">toBeChecked</span>، برای انتخاب از <span dir="ltr">selectOptions</span> و برای <span dir="ltr">Tab</span> از <span dir="ltr">user.tab</span> کمک بگیر.

<span dir="ltr">fireEvent</span> یک <span dir="ltr">event</span> سطح پایین می‌فرستد و هنوز در موارد خاص مفید است؛ به‌تنهایی هم‌معنی یک تعامل کامل کاربر نیست. <span dir="ltr">userEvent</span> هم جای تست مرورگر واقعی برای همه جزئیات <span dir="ltr">platform</span> را نمی‌گیرد.

## پاسخ مصاحبه و تمرین

اگر دکمه هنگام ارسال <span dir="ltr">disabled</span> می‌شود، چه چیزی ارزش تست دارد؟

<details>
<summary>پاسخ</summary>

هنگام <span dir="ltr">pending</span> دکمه <span dir="ltr">disabled</span> باشد و پس از پایان طبق قرارداد دوباره فعال شود؛ همچنین ارسال تکراری ناخواسته رخ ندهد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# userEvent and State Transitions

Prefer `userEvent` for realistic interactions such as typing, clicking, tabbing, selecting, and keyboard use. Modern `userEvent` APIs are asynchronous, so create a user instance and `await` interactions.

## Course notes: userEvent

### Overview

React Testing Library encourages testing components the way real users interact with them.

For interactive components, tests typically verify:

1. Initial UI state.
2. User interactions.
3. UI updates after interactions.

The primary tool for simulating user behavior is:

```tsx
userEvent
```

Unlike manually firing events, `userEvent` simulates realistic browser interactions.

---

### Example Component

```tsx
const TermsAndConditions = () => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div>
      <h1>Terms & Conditions</h1>

      <label htmlFor="agree">
        <input
          type="checkbox"
          id="agree"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        I accept the terms and conditions.
      </label>

      <button disabled={!isChecked}>Submit</button>
    </div>
  )
}
```

---

### Component Behavior

#### Initial State

```tsx
isChecked = false
```

Result:

- Checkbox is unchecked.
- Submit button is disabled.

#### After User Checks the Box

```tsx
isChecked = true
```

Result:

- Checkbox becomes checked.
- Submit button becomes enabled.

---

## Testing Initial State

### Test

```tsx
it("should render with correct text and initial state", () => {
  render(<TermsAndConditions />)

  const heading = screen.getByRole("heading")
  expect(heading).toBeInTheDocument()
  expect(heading).toHaveTextContent("Terms & Conditions")

  const checkbox = screen.getByRole("checkbox")
  expect(checkbox).toBeInTheDocument()
  expect(checkbox).not.toBeChecked()

  const button = screen.getByRole("button")
  expect(button).toBeInTheDocument()
  expect(button).toBeDisabled()
})
```

---

### What This Test Verifies

#### Heading Exists

```tsx
expect(heading).toBeInTheDocument()
```

Verifies the page title is rendered.

---

#### Checkbox Starts Unchecked

```tsx
expect(checkbox).not.toBeChecked()
```

Verifies the component's initial state.

---

#### Button Starts Disabled

```tsx
expect(button).toBeDisabled()
```

Verifies that users cannot submit until they accept the terms.

---

## Simulating User Actions

### Why userEvent?

React Testing Library recommends:

```tsx
userEvent
```

instead of:

```tsx
fireEvent
```

because it simulates interactions closer to how real users interact with the browser.

Examples:

- Clicking
- Typing
- Selecting
- Tabbing
- Hovering

---

### Creating a User Instance

```tsx
const user = userEvent.setup()
```

This creates a virtual user that can perform interactions.

---

## Testing Checkbox Interaction

### Test

```tsx
it("should enable the button when the checkbox is checked", async () => {
  // Arrange
  render(<TermsAndConditions />)

  // Act
  const checkbox = screen.getByRole("checkbox")

  const user = userEvent.setup()

  await user.click(checkbox)

  // Assert
  const button = screen.getByRole("button")

  expect(button).toBeEnabled()
})
```

---

### Arrange → Act → Assert Pattern

#### Arrange

Prepare the component.

```tsx
render(<TermsAndConditions />)
```

---

#### Act

Perform a user action.

```tsx
await user.click(checkbox)
```

---

#### Assert

Verify the outcome.

```tsx
expect(button).toBeEnabled()
```

---

## Why Is user.click() Async?

```tsx
await user.click(...)
```

Many user interactions trigger:

- State updates
- Re-renders
- Effects
- Async DOM updates

Because of this, `userEvent` methods return promises.

Always use:

```tsx
await user.click(...)
```

when simulating user actions.

---

## Querying Form Elements

### Checkbox

```tsx
screen.getByRole("checkbox")
```

Finds:

```html
<input type="checkbox" />
```

---

### Button

```tsx
screen.getByRole("button")
```

Finds:

```html
<button>Submit</button>
```

---

### Heading

```tsx
screen.getByRole("heading")
```

Finds:

```html
<h1>Terms & Conditions</h1>
```

---

## Useful Jest-DOM Matchers

### toBeChecked

```tsx
expect(checkbox).toBeChecked()
```

Checks checkbox state.

---

### not.toBeChecked

```tsx
expect(checkbox).not.toBeChecked()
```

Verifies a checkbox starts unchecked.

---

### toBeDisabled

```tsx
expect(button).toBeDisabled()
```

Verifies an element cannot be interacted with.

---

### toBeEnabled

```tsx
expect(button).toBeEnabled()
```

Verifies an element is interactive.

---

## Additional Test Worth Adding

Verify that the checkbox itself becomes checked.

```tsx
await user.click(checkbox)

expect(checkbox).toBeChecked()
```

This validates both:

- Checkbox state change.
- Button state change.

---

## Best Practices

- Test the initial UI state before interactions.
- Simulate actions using `userEvent`.
- Always await user interactions.
- Follow Arrange → Act → Assert.
- Query elements by role whenever possible.
- Verify behavior from the user's perspective.

---

## Key Takeaways

- `userEvent` simulates real user interactions.
- `userEvent.setup()` creates a virtual user.
- User interactions should typically be awaited.
- Test both the initial state and updated state.
- `toBeChecked()`, `toBeDisabled()`, and `toBeEnabled()` are common form assertions.
- React Testing Library focuses on how users interact with the UI, not internal implementation details.

## Course notes: Callbacks and User Typing

### Overview

Many React components communicate with their parent components through callback functions.

Examples:

- Search boxes
- Form submissions
- Dropdown selections
- Filter controls
- Modal actions

When testing these components, we typically verify:

1. The UI renders correctly.
2. User input is handled properly.
3. Callback functions are called when expected.
4. Callback functions receive the correct arguments.
5. Callbacks are not called when conditions are not met.

---

### Example Component

```tsx
interface Props {
  onChange: (text: string) => void
}

const SearchBox = ({ onChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchTerm) onChange(searchTerm)
        }}
      />
    </div>
  )
}
```

---

### Component Behavior

#### Initial State

```tsx
searchTerm = ""
```

Result:

- Input is rendered.
- No callback is executed.

---

#### User Types Text

```tsx
SearchTerm
```

Result:

- State is updated.
- Callback is still not called.

---

#### User Presses Enter

```tsx
Enter
```

Result:

- `onChange` executes.
- Search term is passed as an argument.

---

### Mock Functions

When testing callback props, we usually replace the real implementation with a mock function.

```tsx
const onChange = vi.fn()
```

#### What Is vi.fn()?

`vi.fn()` creates a mock function that:

- Records calls.
- Records arguments.
- Tracks invocation count.
- Can be inspected by assertions.

Example:

```tsx
const mock = vi.fn()

mock("hello")
```

Vitest records:

```tsx
mock.calls[0] === ["hello"]
```

---

### Creating a Test Setup Function

#### renderComponent()

```tsx
const renderComponent = () => {
  const onChange = vi.fn()

  const user = userEvent.setup()

  render(<SearchBox onChange={onChange} />)

  return {
    input: screen.getByPlaceholderText(/search/i),
    onChange,
    user,
  }
}
```

---

### Why Use a Setup Function?

Benefits:

- Eliminates duplication.
- Centralizes component setup.
- Makes tests shorter.
- Improves maintainability.

Without a setup function, every test would repeat:

```tsx
const onChange = vi.fn()
const user = userEvent.setup()
render(...)
```

---

## Testing Rendered Inputs

### Test

```tsx
it("should render an input field for searching", () => {
  const { input } = renderComponent()

  expect(input).toBeInTheDocument()
})
```

#### What This Verifies

The component successfully renders a search input.

---

### Querying Inputs

#### getByPlaceholderText

```tsx
screen.getByPlaceholderText(/search/i)
```

Finds:

```html
<input placeholder="Search..." />
```

Useful when:

- Inputs do not have labels.
- Placeholder text is stable.

---

## Testing User Typing

### Test

```tsx
await user.type(input, searchTerm + "{enter}")
```

#### What Happens?

The virtual user performs:

```txt
S
e
a
r
c
h
T
e
r
m
Enter
```

just like a real user.

---

### Why Use user.type()?

Instead of manually firing events:

```tsx
fireEvent.change(...)
fireEvent.keyDown(...)
```

`user.type()` simulates realistic typing behavior.

---

## Testing Callback Execution

### Test

```tsx
it("should call onChange when enter is pressed", async () => {
  const { input, user, onChange } = renderComponent()

  await user.type(input, searchTerm + "{enter}")

  expect(onChange).toHaveBeenCalledWith(searchTerm)
})
```

---

### What This Verifies

When:

```txt
User types text
```

and then:

```txt
User presses Enter
```

the component executes:

```tsx
onChange(searchTerm)
```

with the correct value.

---

## Testing Function Arguments

### toHaveBeenCalledWith()

Use:

```tsx
expect(onChange).toHaveBeenCalledWith(searchTerm)
```

To verify:

- Function execution.
- Correct argument values.

This is often more important than simply checking:

```tsx
expect(onChange).toHaveBeenCalled()
```

because it validates the data being passed.

---

## Testing Negative Scenarios

### Test

```tsx
it("shouldn't call onChange if input field is empty", async () => {
  const { input, user, onChange } = renderComponent()

  await user.type(input, "{enter}")

  expect(onChange).not.toHaveBeenCalled()
})
```

---

### What This Verifies

Given:

```tsx
searchTerm === ""
```

The condition:

```tsx
if (e.key === "Enter" && searchTerm)
```

evaluates to:

```tsx
false
```

Therefore:

```tsx
onChange(...)
```

should never execute.

---

## Positive vs Negative Tests

A complete test suite should verify both:

#### Positive Behavior

```txt
Should call callback
```

and

#### Negative Behavior

```txt
Should not call callback
```

This ensures all logic branches are covered.

---

## Common Mock Function Assertions

### Function Was Called

```tsx
expect(mock).toHaveBeenCalled()
```

---

### Function Was Not Called

```tsx
expect(mock).not.toHaveBeenCalled()
```

---

### Function Called With Arguments

```tsx
expect(mock).toHaveBeenCalledWith("search")
```

---

### Function Called Specific Number of Times

```tsx
expect(mock).toHaveBeenCalledTimes(1)
```

---

## Testing User Behavior vs Implementation

Avoid testing:

```tsx
const [searchTerm, setSearchTerm]
```

or:

```tsx
setSearchTerm(...)
```

directly.

Instead test:

```txt
User types text
```

↓

```txt
User presses Enter
```

↓

```txt
Callback receives expected value
```

This follows the React Testing Library principle:

> Test behavior, not implementation.

---

## Best Practices

- Use `vi.fn()` for callback props.
- Verify callback arguments, not just invocation.
- Test both positive and negative scenarios.
- Use setup functions to reduce duplication.
- Simulate typing with `user.type()`.
- Focus on user-visible behavior.

---

## Key Takeaways

- `vi.fn()` creates mock functions for testing callbacks.
- Mock functions record calls and arguments.
- `user.type()` simulates realistic typing behavior.
- `toHaveBeenCalledWith()` verifies callback arguments.
- Negative tests are just as important as positive tests.
- Setup functions improve readability and maintainability.
- Callback testing should focus on behavior rather than internal state implementation.

## Course notes: State Transitions and Toggle Behavior

### Overview

Many React components change their UI in response to user actions.

Common examples include:

- Expand/Collapse sections
- Accordions
- Dropdown menus
- Modals
- Navigation menus
- Show More / Show Less functionality

When testing these components, we should verify:

1. Initial state.
2. UI rendered for that state.
3. State changes after user interaction.
4. UI updates after state changes.
5. Ability to return to the original state.

---

### Example Component

```tsx
const ExpandableText = ({ text }: { text: string }) => {
  const limit = 255
  const [isExpanded, setExpanded] = useState(false)

  if (text.length <= limit) return <article>{text}</article>

  return (
    <div>
      {isExpanded ? (
        <article>{text}</article>
      ) : (
        <article>{text.substring(0, limit)}...</article>
      )}

      <button onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  )
}
```

---

### Component Behavior

#### Short Text

```tsx
text.length <= 255
```

Result:

- Full text is displayed.
- No button is rendered.

---

#### Long Text

```tsx
text.length > 255
```

Initial result:

- Truncated text is displayed.
- Show More button is displayed.

---

#### Expanded State

After clicking:

```tsx
Show More
```

Result:

- Full text is displayed.
- Button changes to Show Less.

---

#### Collapsed State

After clicking:

```tsx
Show Less
```

Result:

- Text becomes truncated again.
- Button changes back to Show More.

---

## Test Data Setup

### Reusable Test Strings

```tsx
const textA = "A".repeat(255)
const textB = "A".repeat(260)
```

#### Why?

`textA`

```tsx
length === 255
```

Tests the boundary condition.

---

`textB`

```tsx
length > 255
```

Tests truncation behavior.

---

## Testing Boundary Conditions

### Render Full Text at Limit

```tsx
it("should render the full text when text length is less than or equal to 255 characters", () => {
  render(<ExpandableText text={textA} />)

  const text = screen.getByText(textA)

  expect(text).toBeInTheDocument()
})
```

#### What This Verifies

The component correctly handles:

```tsx
text.length === limit
```

without truncating.

---

### Why Boundary Tests Matter

Most bugs occur around:

- Minimum values
- Maximum values
- Exact limits

Testing:

```tsx
255
```

is often more important than testing:

```tsx
100
```

or

```tsx
200
```

---

## Testing Truncated Content

### Test

```tsx
it("should render truncated text when text length exceeds 255 characters", () => {
  render(<ExpandableText text={textB} />)

  const article = screen.getByRole("article")

  expect(article).toHaveTextContent(textB.substring(0, 255) + "...")
})
```

#### What This Verifies

The component correctly executes:

```tsx
text.substring(0, limit)
```

and appends:

```tsx
...
```

---

## Testing Conditional Button Rendering

### Test

```tsx
it("should render 'Show More' button when text is truncated", () => {
  render(<ExpandableText text={textB} />)

  const button = screen.getByRole("button")

  expect(button).toBeInTheDocument()

  expect(button).toHaveTextContent(/show more/i)
})
```

#### What This Verifies

The button only appears when:

```tsx
text.length > limit
```

---

## Testing State Changes

### Expanding Content

#### Test

```tsx
it("should expand to show full text when 'Show More' button is clicked", async () => {
  render(<ExpandableText text={textB} />)

  const button = screen.getByRole("button")

  const user = userEvent.setup()

  await user.click(button)

  const article = screen.getByRole("article")

  expect(article).toHaveTextContent(textB)

  expect(button).toHaveTextContent(/less/i)
})
```

#### State Transition

Before click:

```tsx
isExpanded = false
```

After click:

```tsx
isExpanded = true
```

---

### What This Test Verifies

- User interaction updates state.
- Full content becomes visible.
- Button label changes.
- UI reflects the new state.

---

## Testing Toggle Behavior

### Test

```tsx
it("should collapse text when show less button is clicked", async () => {
  render(<ExpandableText text={textB} />)

  const button = screen.getByRole("button")

  const user = userEvent.setup()

  await user.click(button)

  await user.click(button)

  const article = screen.getByRole("article")

  expect(article).toHaveTextContent(textB.substring(0, 255) + "...")

  expect(button).toHaveTextContent(/more/i)
})
```

---

### Why This Test Is Important

Many tests verify only:

```txt
Initial → Expanded
```

But not:

```txt
Expanded → Collapsed
```

Testing both directions ensures the toggle functionality works completely.

---

## Testing State Transitions

A useful pattern:

```txt
Initial State
      ↓
User Action
      ↓
New State
      ↓
User Action
      ↓
Original State
```

This validates the entire interaction cycle.

---

## Querying Semantic Elements

### Article

```tsx
screen.getByRole("article")
```

Finds:

```html
<article>...</article>
```

Using semantic HTML improves accessibility and testability.

---

### Button

```tsx
screen.getByRole("button")
```

Finds:

```html
<button>Show More</button>
```

---

## What Are We Really Testing?

We're not testing:

```tsx
const [isExpanded, setExpanded]
```

or

```tsx
setExpanded(...)
```

directly.

We're testing the behavior users observe:

- Truncated text
- Full text
- Button label changes
- Toggle functionality

This follows the principle:

> Test behavior, not implementation.

---

## Best Practices

- Test boundary conditions.
- Verify initial state.
- Verify state changes.
- Verify UI updates after interactions.
- Test both directions of toggle behavior.
- Focus on user-visible outcomes.
- Avoid testing React state directly.

---

## Key Takeaways

- Interactive components often have multiple UI states.
- Boundary values should always be tested.
- `userEvent` is used to trigger state changes.
- Toggle components should be tested in both directions.
- State itself is not tested directly; visible behavior is.
- Effective interaction tests validate the complete user journey from initial state to final state.

## Add keyboard behavior to your mental model

```tsx
const user = userEvent.setup();
await user.tab();
await user.keyboard('{Enter}');
```

A click-only test can miss accessibility and focus bugs that a keyboard-flow test exposes.

</div>

</details>

</div>
