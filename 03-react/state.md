# React State

## State persists across renders

```tsx
const [count, setCount] = useState(0);
```

React associates state with component identity and remembers it across renders.

## State updates schedule renders

```tsx
setCount(1);
```

The current render's `count` variable does not mutate in place.

## Functional updates

Use when the next state depends on previous state:

```tsx
setCount(current => current + 1);
```

This works safely with queued/batched updates.

## Batching

React can group multiple updates to avoid unnecessary separate renders.

```tsx
setFirstName('A');
setLastName('B');
```

## Derived state

Avoid duplicating information that can be calculated.

Bad:

```tsx
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

Better:

```tsx
const fullName = `${firstName} ${lastName}`;
```

This removes synchronization bugs and an effect-driven extra update.

## State ownership

Use the lowest owner that needs to coordinate the value.

- local UI → component state
- sibling coordination → lifted state
- broad client state → context/store if justified
- server data → server-state solution
- navigation/filter state → often URL
- form data → form state

## Controlled vs uncontrolled

Controlled:

```tsx
<input value={name} onChange={e => setName(e.target.value)} />
```

Uncontrolled:

```tsx
<input defaultValue="A" ref={inputRef} />
```

Neither is universally better.

## Interview questions

1. What is batching?
2. Why use functional updates?
3. What is derived state?
4. Controlled vs uncontrolled?
5. Where should state live?
