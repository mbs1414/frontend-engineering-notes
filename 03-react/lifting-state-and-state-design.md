<div dir="rtl" align="right">

# دو <span dir="ltr">component</span> چطور یک مقدار مشترک داشته باشند؟ — <span dir="ltr">Lifting State</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">State</span>](./state.md) و <span dir="ltr">props</span>، یعنی ورودی‌هایی که والد به فرزند می‌دهد.

## مسئله: دو <span dir="ltr">input</span> باید هماهنگ باشند

اگر هر <span dir="ltr">input state</span> مستقل داشته باشد، تایپ در اولی دومی را عوض نمی‌کند. <span dir="ltr">state</span> را به والد مشترک می‌بریم و مقدار و <span dir="ltr">handler</span> را به هر دو می‌دهیم. این **<span dir="ltr">Lifting State Up</span>** است.

<div dir="ltr" align="left">

~~~jsx
import { useState } from 'react';
function NameInput({ value, onChange }) {
  return <input aria-label="نام" value={value}
    onChange={e => onChange(e.target.value)} />;
}
export default function Profile() {
  const [name, setName] = useState('');
  return <>
    <NameInput value={name} onChange={setName} />
    <p>پیش‌نمایش: {name}</p>
  </>;
}
~~~

</div>

مالک مقدار <span dir="ltr">Profile</span> است. <span dir="ltr">NameInput</span> مقدار را مستقیم تغییر نمی‌دهد؛ رویداد تغییر را به مالک خبر می‌دهد. با افزودن <span dir="ltr">NameInput</span> دوم و همان <span dir="ltr">props</span>، هر دو هماهنگ می‌مانند.

## مثال دوم: انتخاب از لیست

<div dir="ltr" align="left">

~~~jsx
const users = [{ id: 1, name: 'Sara' }, { id: 2, name: 'Ali' }];
const [selectedId, setSelectedId] = useState(1);
const selectedUser = users.find(user => user.id === selectedId);
~~~

</div>

به‌جای نگه داشتن هم <span dir="ltr">id</span> و هم نسخه دیگری از <span dir="ltr">user</span>، فقط <span dir="ltr">id</span> را نگه می‌داریم و بقیه را محاسبه می‌کنیم. اگر داده‌ها تغییر کنند، احتمال ناهماهنگی کمتر است.

## اشتباه رایج و پاسخ مصاحبه

بردن همه <span dir="ltr">state</span>ها به بالاترین <span dir="ltr">component</span> کار را لزوماً بهتر نمی‌کند؛ مالکیت و تعداد مصرف‌کننده‌ها را پیچیده می‌کند. حالت باز بودن یک <span dir="ltr">tooltip</span> معمولاً نزدیک خودش می‌ماند. فیلتر قابل اشتراک با لینک ممکن است در <span dir="ltr">URL</span> مناسب‌تر باشد.

**<span dir="ltr">Single Source of Truth</span> چیست؟** برای هر داده یک مالک مشخص داریم و نسخه‌های مستقلِ هم‌معنا را بی‌دلیل همگام نمی‌کنیم.

## تمرین با پاسخ

یک دکمه در <span dir="ltr">Header</span> باید <span dir="ltr">modal</span> داخل <span dir="ltr">Main</span> را باز کند. <span dir="ltr">state</span> کجا قرار بگیرد؟

<details>
<summary>پاسخ</summary>

در نزدیک‌ترین والد مشترک <span dir="ltr">Header</span> و <span dir="ltr">Main</span>، یا یک مالک مشترک مناسب اگر فاصله زیاد است. ابتدا ساختار ساده <span dir="ltr">props</span> را امتحان کن؛ صرف داشتن دو مصرف‌کننده الزام به <span dir="ltr">store</span> عمومی نیست.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Lifting State and State Design

## Lifting state up

Move state to the closest common owner when multiple components must coordinate the same source of truth.

```text
SearchInput ──event──▶ Parent state ──value──▶ Results
```

Do not automatically move everything to the application root. Lift only as high as coordination requires.

## Grouping state

Related values *can* be grouped in an object, but grouping is not automatically superior to multiple `useState` calls.

Prefer separate state when values change independently. Consider an object or `useReducer` when several values participate in the same transitions or should be updated together.

Also ask whether the value belongs somewhere else entirely:

- filter/page/sort that should be shareable/bookmarkable → often URL state
- remote API data → server state
- form values → form library/form state
- temporary visual toggle → local component state

## Course notes: Lifting State Up and State Objects

⬅️ Previous Topic: [Generic Type Parameters & Generic Data Fetching Hook](../02-typescript/generics-and-advanced-types.md)

🏠 Home: [README](../README.md)

---

## Overview

One of the most important questions in React is:

> Where should state live?

A common beginner mistake is placing state in the wrong component.

React follows a simple principle:

```text
State should live in the closest common parent
of all components that need it.
```

This pattern is called:

```text
Lifting State Up
```

---

## The Problem

Imagine Movie Hub has:

```text
App
├── SearchInput
└── MovieGrid
```

The user types into:

```text
SearchInput
```

and

```text
MovieGrid
```

must display filtered movies.

Both components need access to:

```text
searchText
```

---

## Incorrect Approach

```tsx
function SearchInput() {
  const [searchText, setSearchText] = useState("")
}
```

Problem:

```text
MovieGrid cannot access searchText.
```

The state only exists inside:

```text
SearchInput
```

---

## Lifting State Up

Move the state to the nearest shared parent.

```text
App
├── SearchInput
└── MovieGrid
```

The closest common parent is:

```text
App
```

---

## Parent Owns State

```tsx
function App() {
  const [searchText, setSearchText] = useState("")

  return (
    <>
      <SearchInput searchText={searchText} onSearch={setSearchText} />

      <MovieGrid searchText={searchText} />
    </>
  )
}
```

Now:

```text
App owns the state.
```

---

## Passing Data Down

```tsx
<MovieGrid searchText={searchText} />
```

This is called:

```text
Props
```

Data flows:

```text
Parent → Child
```

---

## Passing Events Up

```tsx
<SearchInput onSearch={setSearchText} />
```

Child component:

```tsx
function SearchInput({ onSearch }) {
  return <input onChange={(e) => onSearch(e.target.value)} />
}
```

Flow:

```text
Child → Parent
```

through callback functions.

---

## Visual Flow

```text
User Types
      ↓
SearchInput
      ↓
onSearch()
      ↓
App State Updates
      ↓
MovieGrid Receives New Props
      ↓
Movies Re-render
```

---

## Why Lift State Up?

Benefits:

✅ Single source of truth

✅ Easier debugging

✅ Consistent UI

✅ Predictable data flow

✅ Components stay synchronized

---

## Real Movie Hub Example

Imagine:

```text
Navbar
├── SearchInput

MovieGrid
```

Both need:

```text
searchText
```

Store it in:

```tsx
function App() {
  const [searchText, setSearchText] = useState("")
}
```

and pass it where needed.

---

## Encapsulating Related State

As applications grow, multiple state variables often belong together.

Example:

```tsx
const [genre, setGenre] = useState("")
const [platform, setPlatform] = useState("")
const [sortOrder, setSortOrder] = useState("")
```

These values represent:

```text
Movie Query State
```

They are related.

---

## Better Solution

Encapsulate them in a single object.

```tsx
const [movieQuery, setMovieQuery] = useState({
  genre: "",
  platform: "",
  sortOrder: "",
})
```

Now all query-related values are grouped together.

---

## Why Use Objects?

Without objects:

```tsx
genre
platform
sortOrder
searchText
releaseYear
```

Many separate state variables become difficult to manage.

With an object:

```tsx
movieQuery
```

contains everything.

---

## Real Movie Hub Example

```tsx
const [movieQuery, setMovieQuery] = useState({
  searchText: "",
  genre: "",
  sortOrder: "",
})
```

This represents the user's current query.

---

## Updating Object State

Incorrect:

```tsx
setMovieQuery({
  genre: "Action",
})
```

This replaces the entire object.

Result:

```text
searchText is lost
sortOrder is lost
```

---

## Correct Approach

```tsx
setMovieQuery({
  ...movieQuery,
  genre: "Action",
})
```

The spread operator copies existing properties.

Result:

```text
searchText preserved
sortOrder preserved
genre updated
```

---

## Functional Update Pattern

Even better:

```tsx
setMovieQuery((prev) => ({
  ...prev,
  genre: "Action",
}))
```

Why?

Because React state updates may be asynchronous.

This guarantees you're working with the latest state.

---

## Movie Hub Architecture

Eventually your state may look like:

```tsx
const [movieQuery, setMovieQuery] = useState({
  searchText: "",
  selectedGenre: null,
  selectedPlatform: null,
  sortOrder: "",
})
```

Then:

```text
Navbar
GenreSelector
PlatformSelector
SortSelector
MovieGrid
```

all work from a single source of truth.

---

## Common Mistake #1

Creating state in multiple components.

```tsx
SearchInput
MovieGrid
```

both have:

```tsx
const [searchText, setSearchText]
```

Result:

```text
State becomes duplicated.
Components become unsynchronized.
```

---

## Common Mistake #2

Not lifting state high enough.

If two components need the same data:

```text
Move state to the closest common parent.
```

---

## Common Mistake #3

Replacing object state accidentally.

```tsx
setMovieQuery({
  genre: "Action",
})
```

This removes every other property.

Always spread existing state.

---

## Key Takeaway

### Lifting State Up

```text
If two components need the same state,
move that state to their closest common parent.
```

---

### Encapsulating Related Values

Instead of:

```tsx
genre
platform
sortOrder
searchText
```

use:

```tsx
movieQuery
```

React applications become easier to scale when related values are grouped into a single state object and managed from one source of truth.

## Interview questions

1. What is the closest common owner?
2. When should state remain local?
3. Object state vs separate `useState` values?
4. When would you use URL state or `useReducer` instead?

</div>

</details>

</div>
