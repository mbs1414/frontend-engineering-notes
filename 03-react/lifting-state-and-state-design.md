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
