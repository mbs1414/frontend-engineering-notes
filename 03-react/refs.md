# React Refs

## Ref basics

```tsx
const inputRef = useRef<HTMLInputElement>(null);
```

A ref object persists across renders and exposes mutable `.current`.

## State vs ref

| Behavior | `useState` | `useRef` |
|---|---|---|
| Persists across renders | Yes | Yes |
| Update triggers render | Yes | No |
| Intended for visible UI state | Yes | Usually no |
| DOM handle | No | Yes |

This corrects the original misconception: state does **not** reset on every render.

## DOM refs

```tsx
function Search() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>
        Focus
      </button>
    </>
  );
}
```

## Good non-UI ref uses

- timer ID
- request sequence ID
- DOM node
- imperative third-party instance
- mutable value that should not cause a render

If the UI depends on a value, state is usually the correct tool.

## Interview questions

1. Ref vs state?
2. Why does ref mutation not re-render?
3. Common ref use cases?
4. When is using a ref instead of state a bug?
