<div dir="rtl" align="right">

# تست <span dir="ltr">component</span> از نگاه کاربر — <span dir="ltr">React Testing Library</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Vitest</span>](./vitest.md)، <span dir="ltr">React</span> و [راه‌اندازی محیط تمرین](./practice-setup.md).

<span dir="ltr">RTL</span> صفحه <span dir="ltr">render</span>شده را جست‌وجو می‌کند. به‌جای <span dir="ltr">state</span> خصوصی <span dir="ltr">component</span>، متن، نقش کنترل و نتیجه تعامل را می‌سنجیم.

## مثال اول: یک تست کامل دکمه

<div dir="ltr" align="left">

~~~jsx
import { useState } from 'react';
import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>
    Count: {count}
  </button>;
}
it('increments after clicking', async () => {
  const user = userEvent.setup();
  render(<Counter />);
  await user.click(screen.getByRole('button', { name: 'Count: 0' }));
  expect(screen.getByRole('button', { name: 'Count: 1' })).toBeInTheDocument();
});
~~~

</div>

<span dir="ltr">getByRole</span> از نقش و <span dir="ltr">accessible name</span> استفاده می‌کند. این روش با رفتار کاربر و کیفیت <span dir="ltr">semantic UI</span> مرتبط است؛ <span dir="ltr">test-id</span> برای مواقع نیاز باقی می‌ماند.

## مثال دوم: سه خانواده <span dir="ltr">query</span>

| روش | اگر عنصر نباشد | کاربرد |
| --- | --- | --- |
| <span dir="ltr">getBy</span>... | خطا | باید همین حالا وجود داشته باشد |
| <span dir="ltr">queryBy</span>... | <span dir="ltr">null</span> | بررسی نبودن |
| <span dir="ltr">findBy</span>... | منتظر می‌ماند و در شکست <span dir="ltr">reject</span> می‌شود | ظاهر شدن غیرهم‌زمان |

<span dir="ltr">findBy</span> را <span dir="ltr">await</span> کن. این تمایز در [مرجع <span dir="ltr">Query</span>ها](https://testing-library.com/docs/queries/about/) توضیح داده شده است.

## پاسخ مصاحبه و تمرین

برای <span dir="ltr">assert</span> نبودن <span dir="ltr">alert</span> از <span dir="ltr">getByRole</span> استفاده کنیم؟

<details>
<summary>پاسخ</summary>

از <span dir="ltr">queryByRole</span> استفاده کن: <span dir="ltr">`expect(screen.queryByRole('alert')).not.toBeInTheDocument()`</span>. <span dir="ltr">getBy</span> پیش از رسیدن به <span dir="ltr">assertion</span>، خطا می‌دهد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# React Testing Library

React Testing Library encourages tests that interact with rendered UI similarly to users and assistive technologies.

## Query priority

Prefer semantic queries such as roles and labels. Reach for `data-testid` when the UI has no suitable semantic/queryable identity, not as the default reflex.

## Query families

- `getBy*`: synchronous; throws if missing
- `queryBy*`: synchronous; returns `null` when missing, useful for absence
- `findBy*`: asynchronous; waits for an element

## Course notes: Testing Philosophy

### Overview

React component testing primarily focuses on two major concerns:

1. How components render
2. How components respond to user actions

The goal is to verify that components behave correctly from a user's perspective.

---

### What Should We Test?

#### 1. Rendering

Rendering tests verify that a component displays the correct UI.

Examples:

- Text is visible
- Buttons are rendered
- Form fields exist
- Error messages appear when expected
- Data is displayed correctly

```tsx
render(<LoginForm />)

expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument()
```

---

#### 2. User Interaction

Interaction tests verify that the component responds correctly when users interact with it.

Examples:

- Clicking buttons
- Typing into inputs
- Selecting options
- Submitting forms
- Opening and closing dialogs

```tsx
await user.click(loginButton)

expect(screen.getByText(/welcome/i)).toBeInTheDocument()
```

---

### Behavior Over Implementation

A fundamental principle of React testing is:

> Test behavior, not implementation details.

Tests should focus on what users can observe, not how the component is internally built.

#### Good Examples

✅ Verify visible UI

```tsx
expect(screen.getByText("Welcome")).toBeInTheDocument()
```

✅ Verify user interactions

```tsx
await user.click(button)

expect(screen.getByText("Saved")).toBeInTheDocument()
```

---

#### Bad Examples

❌ Testing internal state

```tsx
expect(component.state.isOpen).toBe(true)
```

❌ Testing private functions

```tsx
expect(handleClick).toHaveBeenCalled()
```

❌ Testing implementation-specific details that users cannot see

---

### Why Avoid Testing Implementation?

Implementation details frequently change during refactoring.

For example:

- State management may change
- Internal functions may be renamed
- Hooks may be replaced
- Component structure may change

If tests depend on implementation details, they break even when the application still works correctly.

Behavior-focused tests remain stable because user-facing functionality has not changed.

---

### No Test > Bad Test

A bad test can be more harmful than having no test at all.

Bad tests:

- Create false confidence
- Break during refactoring
- Slow development
- Increase maintenance costs
- Encourage developers to ignore failing tests

Good tests:

- Validate real user behavior
- Catch regressions
- Remain stable over time
- Increase confidence when refactoring

---

### Characteristics of Good Tests

A good test should:

- Focus on user behavior
- Be easy to understand
- Be reliable
- Be maintainable
- Fail only when actual functionality breaks

---

### Key Takeaways

- React testing focuses on rendering and user interactions.
- Test what users see and do.
- Avoid testing implementation details.
- Favor behavior-driven tests.
- Bad tests can be worse than having no tests.
- Well-written tests provide confidence and support safe refactoring.

## Course notes: Component Rendering

### Overview

One of the most common testing scenarios in React is verifying that a component renders different UI based on its props.

A component can have multiple rendering paths (conditional rendering), and each path should be tested independently.

---

### Example Component

```tsx
const Greet = ({ name }: { name?: string }) => {
  if (name) return <h1>Hello {name}</h1>

  return <button>Login</button>
}

export default Greet
```

#### Rendering Behavior

The component has two possible outcomes:

| Condition              | Rendered Element |
| ---------------------- | ---------------- |
| `name` is provided     | Heading (`h1`)   |
| `name` is not provided | Login button     |

Because there are two rendering paths, we need at least two tests.

---

### Testing Different Rendering Paths

#### Test: Render Heading When Name Is Provided

```tsx
it("should render Hello with the name when name is provided", () => {
  render(<Greet name="Mosh" />)

  const heading = screen.getByRole("heading")

  expect(heading).toBeInTheDocument()
  expect(heading).toHaveTextContent(/mosh/i)
})
```

#### What This Test Verifies

- The heading is rendered.
- The heading exists in the document.
- The provided name appears in the heading text.

---

#### Test: Render Login Button When Name Is Not Provided

```tsx
it("should render login button when name is not provided", () => {
  render(<Greet />)

  const button = screen.getByRole("button")

  expect(button).toBeInTheDocument()
  expect(button).toHaveTextContent(/login/i)
})
```

#### What This Test Verifies

- The button is rendered.
- The button exists in the document.
- The button displays the expected text.

---

### Using screen.getByRole()

React Testing Library encourages querying elements the way users and assistive technologies find them.

#### Heading

```tsx
screen.getByRole("heading")
```

Finds:

```html
<h1>Hello Mosh</h1>
```

---

#### Button

```tsx
screen.getByRole("button")
```

Finds:

```html
<button>Login</button>
```

---

### screen.debug()

```tsx
screen.debug()
```

Prints the current DOM to the terminal.

Example output:

```html
<body>
  <div>
    <button>Login</button>
  </div>
</body>
```

Useful when:

- A query fails
- An element cannot be found
- You want to inspect the rendered DOM

#### Best Practice

Use `screen.debug()` only while troubleshooting.

Remove it once tests are working correctly.

---

### Test Structure

A common pattern:

```tsx
it("should do something", () => {
  render(<Component />)

  const element = screen.getByRole(...)

  expect(element).toBeInTheDocument()
})
```

This follows the Arrange-Act-Assert pattern:

#### Arrange

```tsx
render(<Greet name="Mosh" />)
```

Setup the component.

#### Act

```tsx
screen.getByRole("heading")
```

Interact with or query the UI.

#### Assert

```tsx
expect(heading).toBeInTheDocument()
expect(heading).toHaveTextContent(/mosh/i)
```

Verify the expected behavior.

---

### Why Test Both Scenarios?

The component contains conditional logic:

```tsx
if (name) {
  return <h1>Hello {name}</h1>
}

return <button>Login</button>
```

Each branch can fail independently.

Testing both branches ensures:

- Complete coverage of component behavior.
- Confidence when refactoring.
- Protection against regressions.

---

### Best Practices

- Test all conditional rendering paths.
- Query elements by role whenever possible.
- Verify user-visible output.
- Avoid testing implementation details.
- Use `screen.debug()` only for debugging.
- Write descriptive test names that explain behavior.

---

### Key Takeaways

- Components often have multiple rendering paths.
- Each rendering path should have its own test.
- `render()` mounts the component for testing.
- `screen.getByRole()` is the preferred query method.
- `screen.debug()` helps inspect the rendered DOM.
- Focus on what the user sees rather than implementation details.
- Follow the Arrange → Act → Assert testing structure.

## Course notes: Conditional Rendering and Query Methods

### Overview

Components often render different UI elements based on prop values.

When testing these components, we need to verify:

- Content that should always be displayed.
- Elements that should conditionally appear.
- Elements that should conditionally not appear.

This example also introduces an important distinction between:

- `getBy*` queries
- `queryBy*` queries

---

### Example Component

```tsx
const UserAccount = ({ user }: { user: User }) => {
  return (
    <>
      <h2>User Profile</h2>

      {user.isAdmin && <button>Edit</button>}

      <div>
        <strong>Name:</strong> {user.name}
      </div>
    </>
  )
}
```

#### Rendering Logic

| Condition         | Result                       |
| ----------------- | ---------------------------- |
| User exists       | User name is displayed       |
| User is admin     | Edit button is displayed     |
| User is not admin | Edit button is not displayed |

---

### Test Data Setup

Creating reusable test objects makes tests easier to read and maintain.

```tsx
const userA: User = {
  id: 1,
  name: "mosh",
  isAdmin: true,
}

const userB: User = {
  id: 1,
  name: "mosh",
  isAdmin: false,
}
```

#### Benefits

- Reduces duplication.
- Makes test intent clear.
- Simplifies updates.

---

### Testing User Information

#### Render User Name

```tsx
it("should render username when the name is provided", () => {
  render(<UserAccount user={userA} />)

  const name = screen.getByText(/mosh/i)

  expect(name).toBeInTheDocument()
})
```

#### What This Test Verifies

- User information is rendered.
- The name appears on the page.
- The component correctly displays passed props.

---

### Testing Conditional Rendering

#### Render Edit Button for Admin Users

```tsx
it("should render edit button when the user is admin", () => {
  render(<UserAccount user={userA} />)

  const editButton = screen.getByRole("button")

  expect(editButton).toBeInTheDocument()
  expect(editButton).toHaveTextContent(/edit/i)
})
```

#### What This Test Verifies

Since:

```tsx
userA.isAdmin === true
```

The following code executes:

```tsx
{
  user.isAdmin && <button>Edit</button>
}
```

Therefore the button should exist.

---

### Testing Absence of Elements

#### Do Not Render Edit Button for Non-Admin Users

```tsx
it("should not render edit button when the user is not admin", () => {
  render(<UserAccount user={userB} />)

  const editButton = screen.queryByRole("button")

  expect(editButton).not.toBeInTheDocument()
})
```

#### What This Test Verifies

Since:

```tsx
userB.isAdmin === false
```

The button should not be rendered.

---

### getByRole vs queryByRole

Understanding when to use each query is essential.

#### getByRole

```tsx
screen.getByRole("button")
```

Use when the element must exist.

Behavior:

- Returns the element if found.
- Throws an error if not found.

Example:

```tsx
const button = screen.getByRole("button")

expect(button).toBeInTheDocument()
```

---

#### queryByRole

```tsx
screen.queryByRole("button")
```

Use when the element may not exist.

Behavior:

- Returns the element if found.
- Returns `null` if not found.
- Does not throw an error.

Example:

```tsx
const button = screen.queryByRole("button")

expect(button).not.toBeInTheDocument()
```

---

### Why Not Use getByRole for Negative Assertions?

Incorrect:

```tsx
expect(screen.getByRole("button")).not.toBeInTheDocument()
```

Problem:

- `getByRole()` throws an error immediately.
- The assertion never runs.

Correct:

```tsx
expect(screen.queryByRole("button")).not.toBeInTheDocument()
```

---

### Testing Conditional UI

Whenever a component contains logic such as:

```tsx
condition && <Component />
```

or

```tsx
condition ? <A /> : <B />
```

Test all possible outcomes.

Example:

```tsx
user.isAdmin
```

Should have tests for:

- Admin user
- Non-admin user

This ensures complete behavioral coverage.

---

### screen.debug()

```tsx
screen.debug()
```

Prints the rendered DOM to the console.

Example:

```html
<body>
  <div>
    <h2>User Profile</h2>
    <button>Edit</button>
    <div><strong>Name:</strong> mosh</div>
  </div>
</body>
```

Useful for:

- Troubleshooting failing tests.
- Inspecting rendered markup.
- Understanding query failures.

Remove it after debugging.

---

### Best Practices

- Test every conditional rendering path.
- Use `getBy*` when an element must exist.
- Use `queryBy*` when checking absence.
- Create reusable test data.
- Focus on visible behavior.
- Verify both positive and negative scenarios.

---

### Key Takeaways

- Conditional rendering should be tested from every possible branch.
- `getByRole()` is used when an element is expected to exist.
- `queryByRole()` is used when an element is expected not to exist.
- Negative assertions should use `queryBy*` queries.
- Reusable test data improves readability and maintainability.
- Test what the user sees rather than implementation details.

## Course notes: Lists and Links

### Overview

Many React components render collections of data such as:

- Users
- Products
- Posts
- Comments

When testing list-based components, we typically verify:

1. The empty state.
2. The rendered list items.
3. The attributes of rendered elements.
4. The correctness of generated links.

---

### Example Component

```tsx
const UserList = ({ users }: { users: User[] }) => {
  if (users.length === 0) return <p>No users available.</p>

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <a href={`/users/${user.id}`}>{user.name}</a>
        </li>
      ))}
    </ul>
  )
}
```

#### Rendering Logic

| Condition            | Result            |
| -------------------- | ----------------- |
| `users.length === 0` | Show message      |
| `users.length > 0`   | Render user links |

---

### Testing Empty States

#### Test

```tsx
it("should render no users when the users is not provided", () => {
  render(<UserList users={[]} />)

  const result = screen.getByText(/no users/i)

  expect(result).toBeInTheDocument()
})
```

#### What This Test Verifies

When:

```tsx
users.length === 0
```

The component renders:

```html
<p>No users available.</p>
```

This ensures the user receives meaningful feedback instead of an empty page.

---

### Why Test Empty States?

Empty states are common UI scenarios.

Examples:

- No search results.
- Empty shopping cart.
- No notifications.
- No users available.

These paths are easy to overlook but important to test.

---

### Testing Rendered Lists

#### Test

```tsx
it("should render a list of users", () => {
  const users: User[] = [
    {
      id: 1,
      name: "mosh",
      isAdmin: false,
    },
  ]

  render(<UserList users={users} />)

  users.forEach((user) => {
    const link = screen.getByRole("link", {
      name: user.name,
    })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", `/users/${user.id}`)
  })
})
```

---

### Testing Dynamic Content

The component generates links dynamically:

```tsx
<a href={`/users/${user.id}`}>{user.name}</a>
```

For the user:

```tsx
{
  id: 1,
  name: "mosh"
}
```

The rendered HTML becomes:

```html
<a href="/users/1">mosh</a>
```

The test verifies both:

- Visible text
- Generated URL

---

### Querying Links

#### Using getByRole

```tsx
screen.getByRole("link", {
  name: user.name,
})
```

Role:

```html
<a href="..."></a>
```

Accessible role:

```txt
link
```

Accessible name:

```txt
mosh
```

This query closely matches how users and screen readers identify links.

---

### Testing Attributes

#### toHaveAttribute()

Use:

```tsx
expect(link).toHaveAttribute("href", "/users/1")
```

To verify:

- Navigation URLs
- Input attributes
- Image sources
- Accessibility attributes
- Custom HTML attributes

---

### Testing Multiple Items

Instead of writing separate assertions:

```tsx
expect(...)
expect(...)
expect(...)
```

Loop through the source data:

```tsx
users.forEach((user) => {
  ...
})
```

Benefits:

- Less duplication.
- Easier maintenance.
- Scales automatically when test data grows.

---

### Example with Multiple Users

```tsx
const users = [
  { id: 1, name: "Mosh", isAdmin: false },
  { id: 2, name: "John", isAdmin: false },
  { id: 3, name: "Sarah", isAdmin: true },
]
```

The same test automatically validates:

```html
<a href="/users/1">Mosh</a>
<a href="/users/2">John</a>
<a href="/users/3">Sarah</a>
```

without requiring additional assertions.

---

### screen.debug()

```tsx
screen.debug()
```

Possible output:

```html
<body>
  <div>
    <ul>
      <li>
        <a href="/users/1">mosh</a>
      </li>
    </ul>
  </div>
</body>
```

Useful for:

- Inspecting generated markup.
- Understanding query failures.
- Debugging incorrect attributes.

Remove after debugging.

---

### Best Practices

- Always test empty states.
- Verify both rendered content and attributes.
- Query links using `getByRole("link")`.
- Prefer accessible queries over CSS selectors.
- Use loops when validating collections.
- Test user-visible behavior rather than implementation details.

---

### Key Takeaways

- List components should be tested for both empty and populated states.
- `getByRole("link")` is the preferred way to query links.
- `toHaveAttribute()` verifies generated HTML attributes.
- Dynamic lists can be tested efficiently using loops.
- Empty states are important UI behaviors and should always be covered by tests.
- React Testing Library encourages testing rendered output rather than component internals.

## Course notes: Null Rendering and Multiple Elements

### Overview

Some React components intentionally render nothing under certain conditions.

In React, returning:

```tsx
return null
```

means no DOM elements will be rendered.

When testing such components, we need to verify:

1. The component renders nothing when required.
2. The component renders all expected elements when data is available.
3. Multiple elements are rendered correctly.
4. Generated attributes contain the correct values.

---

### Example Component

```tsx
const ProductImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
  if (imageUrls.length === 0) return null

  return (
    <ul>
      {imageUrls.map((url) => (
        <li key={url}>
          <img src={url} />
        </li>
      ))}
    </ul>
  )
}
```

#### Rendering Logic

| Condition        | Result                  |
| ---------------- | ----------------------- |
| No image URLs    | Render nothing (`null`) |
| Image URLs exist | Render image list       |

---

### Testing Null Rendering

#### Test

```tsx
it("should be null if there is no image URLs", () => {
  const { container } = render(<ProductImageGallery imageUrls={[]} />)

  expect(container).toBeEmptyDOMElement()
})
```

#### What This Test Verifies

When:

```tsx
imageUrls.length === 0
```

The component executes:

```tsx
return null
```

As a result, no DOM elements are rendered.

---

### The Container Object

React Testing Library's `render()` function returns several utilities.

```tsx
const { container } = render(...)
```

`container` represents the root DOM node that contains the rendered component.

Example:

```html
<div></div>
```

---

### toBeEmptyDOMElement()

Use:

```tsx
expect(container).toBeEmptyDOMElement()
```

To verify that no child elements were rendered.

Useful when testing:

- Components returning `null`
- Empty states
- Conditional rendering
- Permission-based UI

---

### Testing Multiple Elements

#### Test

```tsx
it("should render a list of image URLs", () => {
  const imageURLs = ["banana", "apple"]

  render(<ProductImageGallery imageUrls={imageURLs} />)

  const images = screen.getAllByRole("img")

  expect(images).toHaveLength(2)

  images.forEach((img, index) => {
    expect(img).toHaveAttribute("src", imageURLs[index])
  })
})
```

---

### Querying Multiple Elements

#### getAllByRole()

Use:

```tsx
screen.getAllByRole("img")
```

When multiple matching elements are expected.

Returns:

```tsx
HTMLElement[]
```

Example:

```html
<img src="banana" /> <img src="apple" />
```

Result:

```tsx
;[HTMLImageElement, HTMLImageElement]
```

---

### getByRole vs getAllByRole

#### getByRole

Returns a single element.

```tsx
screen.getByRole("button")
```

Throws an error if:

- No match exists.
- Multiple matches exist.

---

#### getAllByRole

Returns an array of elements.

```tsx
screen.getAllByRole("img")
```

Throws an error if:

- No matching elements exist.

Useful when multiple elements are expected.

---

### Testing Array Length

#### toHaveLength()

Use:

```tsx
expect(images).toHaveLength(2)
```

To verify the exact number of rendered elements.

This ensures:

- All expected items were rendered.
- No extra items were rendered.

---

### Testing Generated Attributes

Each image is generated dynamically:

```tsx
<img src={url} />
```

The test verifies:

```tsx
expect(img).toHaveAttribute("src", imageURLs[index])
```

This confirms that every image received the correct URL.

---

### Looping Through Rendered Elements

A useful pattern:

```tsx
images.forEach((img, index) => {
  ...
})
```

Benefits:

- Avoids repetitive assertions.
- Scales automatically as data grows.
- Keeps tests concise and maintainable.

---

### Why Query by Role?

Images have an accessible role:

```txt
img
```

Therefore:

```tsx
screen.getAllByRole("img")
```

is preferred over:

```tsx
container.querySelectorAll("img")
```

because it aligns with React Testing Library's user-focused philosophy.

---

### screen.debug()

```tsx
screen.debug()
```

Possible output:

```html
<body>
  <div>
    <ul>
      <li>
        <img src="banana" />
      </li>
      <li>
        <img src="apple" />
      </li>
    </ul>
  </div>
</body>
```

Useful for:

- Understanding rendered output.
- Debugging failed queries.
- Inspecting generated attributes.

Remove once tests are working correctly.

---

### Best Practices

- Test both rendering and non-rendering scenarios.
- Use `toBeEmptyDOMElement()` when testing `null` returns.
- Use `getAllBy*` queries for collections.
- Verify collection size with `toHaveLength()`.
- Verify generated attributes.
- Prefer role-based queries over DOM selectors.

---

### Key Takeaways

- Components can intentionally render nothing by returning `null`.
- `container` provides access to the rendered DOM root.
- `toBeEmptyDOMElement()` is useful for testing null rendering.
- `getAllByRole()` returns multiple matching elements.
- `toHaveLength()` verifies the number of rendered elements.
- Looping through rendered elements simplifies collection testing.
- Attribute assertions ensure dynamic content is rendered correctly.

## Useful query you should also know

`within(container)` scopes queries to a specific section/row/dialog when the page contains repeated accessible elements.

</div>

</details>

</div>
