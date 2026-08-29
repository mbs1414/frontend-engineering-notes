# Hooks Mental Model

## Call order matters

React associates hook state with hook call order. Hooks must not be called conditionally in ordinary component logic.

Bad:

```tsx
if (loggedIn) {
  useEffect(() => {}, []);
}
```

## Important hooks by purpose

### State

- `useState`
- `useReducer`

### Context

- `useContext`

### Refs/integration

- `useRef`
- `useImperativeHandle`

### Effects

- `useEffect`
- `useLayoutEffect`
- `useInsertionEffect` (specialized)

### Performance/scheduling

- `useMemo`
- `useCallback`
- `useTransition`
- `useDeferredValue`

### Other infrastructure

- `useId`
- `useSyncExternalStore`
- `useDebugValue`

### Modern async/form APIs

- `use`
- `useActionState`
- `useOptimistic`

`useFormStatus` comes from React DOM and is used for form/action status.

## Custom hooks

A custom hook extracts reusable stateful behavior. It does **not** automatically create shared state between all callers.

## Hooks are not lifecycle-method replacements

Think in terms of state, synchronization, subscriptions, scheduling, and reusable behavior rather than forcing hooks into old class lifecycle boxes.

## Interview questions

1. Why must hook order stay stable?
2. Does a custom hook share state automatically?
3. Why isn't `useEffect` simply `componentDidMount`?
4. When does `useSyncExternalStore` matter?
