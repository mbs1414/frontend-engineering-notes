# Testing Forms

Form tests should focus on user-observable behavior:

- accessible labels and inputs
- validation messages
- valid submission
- invalid submission blocked
- loading/disabled states
- server errors
- focus behavior where relevant

For React Hook Form + Zod, test the actual form contract instead of testing Zod or React Hook Form internals themselves.

## Course notes: ProductForm Validation and Submission

`Testing_ProductForm_Validation_and_Submission.md`

## File Path

`/Form Testing/Testing_ProductForm_Validation_and_Submission.md`

## Note Content (.md)

## Testing Form Validation, User Interactions, and Submission States

### Overview

This set of tests goes beyond checking whether a form renders.

It tests the complete behavior of `ProductForm`, including:

- Rendering form fields
- Populating fields when editing
- Autofocus behavior
- Validation errors
- User interaction with form controls
- Successful submission
- Failed submission
- Submit button loading state
- Re-enabling the submit button
- Toast notifications
- Reusable test setup
- Parameterized tests

This is an important step in component testing because we are testing the component from the **user's perspective** rather than testing its implementation details.

---

## Test Structure

The test suite uses several techniques to keep the tests reusable and maintainable:

```text
beforeAll / afterAll
        ↓
renderComponent()
        ↓
waitForFormToLoad()
        ↓
fill()
        ↓
assert behavior
```

The main idea is:

> Create reusable helpers for repeated setup and user interactions, while keeping each test focused on one behavior.

---

## Creating Test Data with MSW Data

The test creates a category once:

```tsx
let category: Category

beforeAll(() => {
  category = db.category.create()
})
```

The category is stored in the test database and can be reused by multiple tests.

After all tests finish:

```tsx
afterAll(() => {
  db.category.delete({
    where: { id: { equals: category.id } },
  })
})
```

This removes the test data.

---

### Why `beforeAll`?

`beforeAll` runs once before all tests inside the `describe` block.

```tsx
beforeAll(() => {
  category = db.category.create()
})
```

This is useful when several tests need the same setup data.

#### Mental model

```text
beforeAll
    ↓
Create category
    ↓
Test 1
Test 2
Test 3
Test 4
...
    ↓
afterAll
    ↓
Delete category
```

---

## `afterAll`

`afterAll` runs once after all tests have completed.

```tsx
afterAll(() => {
  db.category.delete({
    where: { id: { equals: category.id } },
  })
})
```

Its purpose here is **cleanup**.

#### Why cleanup matters

Tests should avoid leaving data behind that could affect other tests.

This follows the general testing principle:

> Tests should clean up the state they create.

---

## Reusable `renderComponent` Helper

A major improvement in this test suite is the reusable:

```tsx
const renderComponent = (product?: Product) => {
```

Instead of repeating:

```tsx
render(
  <ProductForm ... />,
  { wrapper: AllProviders }
);
```

in every test, the setup is centralized.

---

### What `renderComponent` Does

It:

1. Creates the `onSubmit` mock.
2. Renders `ProductForm`.
3. Adds the `Toaster`.
4. Uses `AllProviders`.
5. Returns reusable helper functions and values.

```tsx
const renderComponent = (product?: Product) => {
  const onSubmit = vi.fn();

  render(
    <>
      <ProductForm product={product} onSubmit={onSubmit} />
      <Toaster />
    </>,
    {
      wrapper: AllProviders,
    }
  );

  return {
    onSubmit,
    ...
  };
};
```

This follows the **DRY principle**:

> Don't Repeat Yourself.

---

## Returning the Mock

The helper returns:

```tsx
return {
  onSubmit,
  ...
};
```

This allows individual tests to control and inspect the mock.

For example:

```tsx
const { waitForFormToLoad, onSubmit } = renderComponent()

onSubmit.mockRejectedValue({})
```

or:

```tsx
onSubmit.mockResolvedValue({})
```

or:

```tsx
onSubmit.mockReturnValue(new Promise(() => {}))
```

The test can therefore customize the submission behavior without changing the component.

---

## Reusable `waitForFormToLoad`

The helper contains:

```tsx
waitForFormToLoad: async () => {
```

The form depends on asynchronously loaded categories.

Therefore, the helper first waits for the form:

```tsx
await screen.findByRole("form")
```

After that, it retrieves all important form controls:

```tsx
const nameInput = screen.getByPlaceholderText(/name/i)
const priceInput = screen.getByPlaceholderText(/price/i)

const categoryInput = screen.getByRole("combobox", {
  name: /category/i,
})

const submitButton = screen.getByRole("button")
```

It then returns those elements.

This eliminates repeated queries across tests.

---

## Why `findByRole("form")`?

The form isn't immediately available because:

```tsx
if (isLoading) return <div>Loading...</div>
```

So:

```tsx
screen.getByRole("form")
```

could fail if the form hasn't rendered yet.

Instead:

```tsx
await screen.findByRole("form")
```

waits until the form appears.

#### Mental model

```text
getBy
    ↓
Element should already exist

findBy
    ↓
Element should eventually appear
```

---

## Using `findBy` Instead of `waitFor`

Instead of:

```tsx
await waitFor(() => {
  expect(screen.getByRole("form")).toBeInTheDocument()
})
```

we can simply write:

```tsx
await screen.findByRole("form")
```

This is cleaner because the intention is:

> Wait until the form appears.

---

## Returning a `fill` Function

The helper creates:

```tsx
const fill = async (product: FormData) => {
```

This function simulates how a user fills out and submits the form.

---

### `userEvent.setup()`

```tsx
const user = userEvent.setup()
```

`userEvent` simulates realistic user interactions.

Examples include:

```tsx
await user.type(...)
await user.click(...)
await user.tab()
```

This is generally preferable to manually changing DOM values.

---

## Filling the Name Field

```tsx
if (product.name !== undefined) await user.type(nameInput, product.name)
```

The test types the name exactly as a user would.

For example:

```tsx
await user.type(nameInput, "Bread")
```

results in the same kind of interaction a real user performs.

---

## Filling the Price Field

```tsx
if (product.price !== undefined)
  await user.type(priceInput, product.price.toString())
```

The HTML input receives text, so the value is converted to a string.

For example:

```tsx
price: 10
```

becomes:

```tsx
"10"
```

---

## Why `await` With `userEvent`?

Modern `userEvent` APIs are asynchronous.

Therefore:

```tsx
await user.type(...)
await user.click(...)
await user.tab()
```

should be awaited.

This ensures the test waits for the interaction to complete before continuing.

---

## Selecting the Category

The test first moves focus:

```tsx
await user.tab()
```

Then opens the category control:

```tsx
await user.click(categoryInput)
```

Then retrieves the options:

```tsx
const options = screen.getAllByRole("option")
```

Finally, it selects the first option:

```tsx
await user.click(options[0])
```

---

## Why Query Options by Role?

The test uses:

```tsx
screen.getAllByRole("option")
```

instead of looking for specific HTML elements.

Again, the test focuses on **accessible behavior**.

The user sees a list of selectable options, so querying by the `option` role matches that behavior.

---

## Submitting the Form

The helper finishes with:

```tsx
await user.click(submitButton)
```

This means every test using `fill()` performs a complete user flow:

```text
Fill fields
   ↓
Select category
   ↓
Click Submit
```

This is especially useful for validation and submission tests.

---

## Shared Valid Test Data

The helper defines:

```tsx
const validData: FormData = {
  id: 1,
  name: "a",
  price: 1,
  categoryId: category.id,
}
```

This represents a valid form submission.

Tests can reuse it:

```tsx
await form.fill(form.validData)
```

or modify individual fields:

```tsx
await form.fill({
  ...form.validData,
  name,
})
```

This keeps test data consistent.

---

## Parameterized Tests with `it.each`

One of the most useful techniques in this test suite is:

```tsx
it.each([
  {
    scenario: "missing",
    errorMessage: /required/i,
  },
  {
    scenario: "longer than 255 characters",
    name: "a".repeat(256),
    errorMessage: /255/,
  },
])(...)
```

`it.each` allows the same test behavior to run against multiple sets of data.

---

## Why Use `it.each`?

Without `it.each`, we might write:

```tsx
it("should show an error when name is missing", ...);

it("should show an error when name is too long", ...);
```

This creates duplication.

With `it.each`:

```tsx
it.each([
  ...
])(...)
```

we define the scenarios as data and reuse the same test logic.

---

## Parameterized Test Data

The table contains:

```tsx
{
  scenario: "missing",
  errorMessage: /required/i,
}
```

and:

```tsx
{
  scenario: "longer than 255 characters",
  name: "a".repeat(256),
  errorMessage: /255/,
}
```

The test title uses:

```tsx
"should display an error if name is $scenario"
```

So Vitest generates descriptive test names such as:

```text
should display an error if name is missing

should display an error if name is longer than 255 characters
```

---

## Testing Name Validation

The test:

```tsx
it.each([...])(
  "should display an error if name is $scenario",
  async ({ name, errorMessage }) => {
    const {
      waitForFormToLoad,
      expectErrorToBeInTheDocument,
    } = renderComponent();

    const form = await waitForFormToLoad();

    await form.fill({
      ...form.validData,
      name,
    });

    expectErrorToBeInTheDocument(errorMessage);
  }
);
```

tests multiple validation rules with one reusable test.

---

## Testing Price Validation

The same technique is used for price:

```tsx
it.each([
  {
    scenario: "missing",
    errorMessage: /required/i,
  },
  {
    scenario: "0",
    price: 0,
    errorMessage: /1/,
  },
  {
    scenario: "negative",
    price: -1,
    errorMessage: /1/,
  },
  {
    scenario: "greater than 1000",
    price: 1001,
    errorMessage: /1000/,
  },
  {
    scenario: "not a number",
    price: "a",
    errorMessage: /required/,
  },
])(...)
```

This tests the boundaries of the price validation rules.

---

## Boundary Testing

The price tests are also an example of **boundary testing**.

The schema appears to accept a range approximately like:

```text
1 --------------------------- 1000
↑                              ↑
minimum                        maximum
```

The tests check:

```text
0       → invalid
-1      → invalid
1       → valid
1000    → valid
1001    → invalid
```

Boundary tests are valuable because bugs often happen at the edges of allowed values.

---

## Testing Autofocus

The component contains:

```tsx
<TextField.Input autoFocus placeholder="Name" {...register("name")} />
```

The test verifies that behavior:

```tsx
expect(nameInput).toHaveFocus()
```

This is an excellent example of testing a **user-visible behavior** instead of checking the implementation.

We don't test:

```tsx
expect(nameInput).toHaveAttribute("autoFocus")
```

We test the actual result:

```tsx
expect(nameInput).toHaveFocus()
```

The question becomes:

> Does the user start with the Name field focused?

---

## Testing Edit Mode

The component accepts an optional product:

```tsx
interface Props {
  product?: Product
}
```

When a product is supplied:

```tsx
const product: Product = {
  id: 1,
  name: "Bread",
  price: 10,
  categoryId: category.id,
}
```

the form should be populated with its existing values.

The test verifies:

```tsx
expect(inputs.nameInput).toHaveValue(product.name)

expect(inputs.priceInput).toHaveValue(product.price.toString())

expect(inputs.categoryInput).toHaveTextContent(category.name)
```

This tests the **edit mode** behavior of the form.

---

## Mocking `onSubmit`

The component receives:

```tsx
onSubmit: (product: ProductFormData) => Promise<void>
```

The test replaces the real function with:

```tsx
const onSubmit = vi.fn()
```

This allows the test to observe how the component interacts with its parent.

---

## Testing Submission Data

The test:

```tsx
it("should call onSubmit with the correct data", async () => {
```

fills the form with valid data and then checks:

```tsx
expect(onSubmit).toHaveBeenCalledWith(formData)
```

This verifies that the component passes the correct data to the callback.

---

## Why Remove `id`?

The test data includes:

```tsx
id: 1
```

but the form should only submit the fields defined by `ProductFormData`.

So:

```tsx
const { id, ...formData } = form.validData
```

creates:

```tsx
{
  name: "a",
  price: 1,
  categoryId: category.id
}
```

The test then verifies:

```tsx
expect(onSubmit).toHaveBeenCalledWith(formData)
```

---

## Testing Failed Submission

The component catches submission errors:

```tsx
try {
  setSubmitting(true)
  await onSubmit(formData)
} catch (error) {
  toast.error("An unexpected error occurred")
} finally {
  setSubmitting(false)
}
```

The test simulates a failure:

```tsx
onSubmit.mockRejectedValue({})
```

Then submits the form.

The test waits for:

```tsx
const toast = await screen.findByRole("status")
```

and verifies:

```tsx
expect(toast).toHaveTextContent(/error/i)
```

This confirms that the user receives feedback when submission fails.

---

## Why `findByRole("status")`?

The toast is not necessarily available immediately.

Therefore:

```tsx
await screen.findByRole("status")
```

waits for it to appear.

This is another example of `findBy...` being useful for asynchronous UI.

---

## Testing the Loading State of the Submit Button

The component manages:

```tsx
const [isSubmitting, setSubmitting] = useState(false)
```

and disables the button while submitting:

```tsx
<Button size="3" disabled={isSubmitting}>
  Submit
</Button>
```

The test simulates a submission that never resolves:

```tsx
onSubmit.mockReturnValue(new Promise(() => {}))
```

This creates a pending Promise.

The component therefore stays in:

```text
isSubmitting = true
```

The test verifies:

```tsx
expect(form.submitButton).toBeDisabled()
```

---

## Why Use a Never-Resolving Promise?

This:

```tsx
new Promise(() => {})
```

creates a Promise that stays pending forever.

It's useful for simulating:

```text
Submission started
       ↓
Waiting for server
       ↓
Still waiting...
```

This lets the test observe the loading state.

---

## Testing Successful Submission

The test uses:

```tsx
onSubmit.mockResolvedValue({})
```

This simulates a successful asynchronous operation.

After the submission completes:

```tsx
expect(form.submitButton).not.toBeDisabled()
```

This verifies that the `finally` block eventually resets the state.

---

## Testing Failed Submission Also Re-Enables the Button

Another test uses:

```tsx
onSubmit.mockRejectedValue("error")
```

Even though submission fails, the button should become enabled again.

That is because the component uses:

```tsx
finally {
  setSubmitting(false);
}
```

This is an important behavior.

The button should be re-enabled whether the request:

```text
succeeds
   OR
fails
```

---

## Understanding `finally`

The component uses:

```tsx
try {
  setSubmitting(true)
  await onSubmit(formData)
} catch (error) {
  toast.error("An unexpected error occurred")
} finally {
  setSubmitting(false)
}
```

The control flow is:

```text
Start submission
      ↓
setSubmitting(true)
      ↓
await onSubmit()
      ↓
 ┌────┴────┐
 ↓         ↓
success   failure
 ↓         ↓
 └────┬────┘
      ↓
finally
      ↓
setSubmitting(false)
```

This guarantees that the submit button is restored to its normal state.

---

## Important Difference Between Mock Methods

The tests use several Vitest mock helpers.

### `mockResolvedValue`

```tsx
onSubmit.mockResolvedValue({})
```

Simulates a successful Promise:

```text
Promise → resolved
```

---

### `mockRejectedValue`

```tsx
onSubmit.mockRejectedValue("error")
```

Simulates a failed Promise:

```text
Promise → rejected
```

---

### `mockReturnValue`

```tsx
onSubmit.mockReturnValue(new Promise(() => {}))
```

Returns a Promise that remains pending.

```text
Promise → pending forever
```

#### Quick comparison

| Mock                    | Simulates                    |
| ----------------------- | ---------------------------- |
| `mockResolvedValue()`   | Successful async operation   |
| `mockRejectedValue()`   | Failed async operation       |
| `mockReturnValue()`     | Custom return value          |
| `new Promise(() => {})` | Never-ending async operation |

---

## Testing Toast Notifications

The test renders:

```tsx
<Toaster />
```

along with:

```tsx
<ProductForm ... />
```

This is necessary because `toast.error()` needs the `Toaster` component to display the notification.

Without it, the test may trigger the toast logic without having the actual toast UI in the rendered tree.

---

## Why `AllProviders` and `Toaster` Are Both Needed

There are two different responsibilities:

```text
AllProviders
    ↓
Application context/providers

Toaster
    ↓
Toast notification UI
```

The test therefore creates the environment required by the real component.

---

## Testing Philosophy

These tests demonstrate a useful testing principle:

> **Test the component the way a user interacts with it.**

The test:

```tsx
await user.type(...)
await user.click(...)
await user.tab()
```

looks much more like real interaction than directly modifying React state or calling internal methods.

We don't test:

```tsx
setSubmitting(true)
```

directly.

Instead, we test the observable result:

```tsx
expect(form.submitButton).toBeDisabled()
```

---

## Reusable Test Helpers

The test suite creates two important abstractions:

```tsx
renderComponent()
```

and:

```tsx
waitForFormToLoad()
```

The second helper returns:

```tsx
{
  ;(nameInput, priceInput, categoryInput, submitButton, fill, validData)
}
```

This keeps individual tests short and focused.

For example:

```tsx
it("should put focus on the name field", async () => {
  const { waitForFormToLoad } = renderComponent()

  const { nameInput } = await waitForFormToLoad()

  expect(nameInput).toHaveFocus()
})
```

The test reads almost like a specification.

---

## Good Test Naming

The tests use descriptive names:

```tsx
"should render form fields"

"should populate form fields when editing a product"

"should put focus on the name field"

"should display an error if name is $scenario"

"should call onSubmit with the correct data"

"should display a toast if submission fails"

"should disable the submit button upon submission"
```

A good test name should communicate:

> **What behavior is being tested?**

---

## One Issue in the Current Test Suite

There are two tests with exactly the same title:

```tsx
it('should re-enable the submit button after submission', async () => {
  ...
});
```

The second one tests a rejected submission.

It would be clearer to use different names.

For example:

```tsx
it("should re-enable the submit button after successful submission", async () => {
  ...
});

it("should re-enable the submit button after failed submission", async () => {
  ...
});
```

This makes test failures much easier to understand.

---

## Another Improvement: Type of `validData`

The current code uses:

```tsx
type FormData = {
  [K in keyof Product]: any
}
```

This works, but using `any` weakens TypeScript's type safety.

A better approach would be to model the actual form data type:

```tsx
const validData: ProductFormData = {
  name: "a",
  price: 1,
  categoryId: category.id,
}
```

Then, if the test specifically needs an `id`, keep that separate:

```tsx
const validProduct: Product = {
  id: 1,
  name: "a",
  price: 1,
  categoryId: category.id,
}
```

This avoids:

```tsx
[K in keyof Product]: any
```

and lets TypeScript help catch incorrect test data.

---

## Important Distinction: Component Test vs Implementation Test

Good:

```tsx
expect(form.submitButton).toBeDisabled()
```

This tests observable behavior.

Less useful:

```tsx
expect(setSubmitting).toHaveBeenCalledWith(true)
```

The second test would couple the test to the internal implementation.

If the developer changed the implementation from `useState` to another mechanism but the UI behavior stayed the same, the first test should continue to pass.

---

## Complete Testing Flow

The overall architecture can be visualized as:

```text
Test
 │
 ├── renderComponent()
 │      │
 │      ├── create onSubmit mock
 │      ├── render ProductForm
 │      ├── render Toaster
 │      └── apply AllProviders
 │
 └── waitForFormToLoad()
        │
        ├── wait for form
        ├── find inputs
        ├── create validData
        └── create fill()
                │
                ├── type name
                ├── type price
                ├── select category
                └── submit
```

This creates a reusable testing API specifically for `ProductForm`.

---

## Key Takeaways

- `beforeAll` is useful for shared setup that should happen once.
- `afterAll` is useful for cleaning up shared test data.
- Reusable render helpers reduce duplication across tests.
- `findBy...` is useful when an element appears asynchronously.
- `userEvent.setup()` provides realistic user interactions.
- `it.each` is excellent for testing multiple validation scenarios.
- Boundary testing is especially useful for form validation.
- `toHaveFocus()` verifies actual focus behavior.
- `mockResolvedValue()` simulates successful async operations.
- `mockRejectedValue()` simulates failed async operations.
- A never-resolving Promise can simulate a request that is still in progress.
- `finally` is important when UI state must be reset regardless of success or failure.
- Toasts need their provider/rendering component in the test environment.
- Tests should verify observable behavior instead of internal implementation.
- Good test helpers can make tests read almost like natural-language specifications.
- Avoid `any` in test data when a precise type is available.
- Test names should be unique and describe the behavior being verified.

---

## Quick Reference

| Testing Need              | Technique                |
| ------------------------- | ------------------------ |
| Shared setup              | `beforeAll()`            |
| Shared cleanup            | `afterAll()`             |
| Render reusable component | `renderComponent()`      |
| Wait for async appearance | `findBy...`              |
| Simulate user actions     | `userEvent`              |
| Test many scenarios       | `it.each()`              |
| Check focus               | `toHaveFocus()`          |
| Check disabled state      | `toBeDisabled()`         |
| Check enabled state       | `not.toBeDisabled()`     |
| Successful Promise        | `mockResolvedValue()`    |
| Failed Promise            | `mockRejectedValue()`    |
| Pending Promise           | `new Promise(() => {})`  |
| Check callback arguments  | `toHaveBeenCalledWith()` |
| Check toast appearance    | `findByRole("status")`   |

---

## Key Mental Model

```text
GOOD COMPONENT TEST

Render the component
        ↓
Wait for asynchronous UI
        ↓
Interact like a user
        ↓
Observe the UI / callback
        ↓
Assert the behavior
```

The goal is not to prove **how** the component works internally.

The goal is to prove that:

> **When a user interacts with the component, it behaves correctly.**

## Additional cases worth adding

- multiple validation errors
- server-side field error mapping
- async validation
- submit button pending state
- keyboard submit
- reset/default values/edit mode
- file inputs when used
