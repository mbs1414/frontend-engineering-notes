# Reconciliation, Identity & Keys

## Reconciliation

Reconciliation is React's process for comparing previous and next element trees and deciding what UI work is necessary.

## Component identity

React uses position, element type, and keys to decide whether state belongs to the same component identity or a new one.

Changing identity can reset state.

## Keys

```tsx
items.map(item => (
  <Row key={item.id} item={item} />
));
```

Good keys are stable, unique among siblings, and based on logical item identity.

## Why index keys can break behavior

Before insert:

```text
0 → A
1 → B
2 → C
```

After inserting X at the start:

```text
0 → X
1 → A
2 → B
3 → C
```

If index is the key, existing keys now refer to different logical items. That can produce incorrect local state, input values, focus, and animations.

## Keys can intentionally reset state

```tsx
<Chat key={userId} userId={userId} />
```

A changed key creates a new identity and resets local state.

## `React.memo`

```tsx
const Row = memo(function Row({ item }) {
  return <div>{item.name}</div>;
});
```

`memo` can skip rendering when props compare equal. New object/function references can defeat this optimization.

## Interview questions

1. What is reconciliation?
2. Why are keys important?
3. Why are index keys risky?
4. How can a key reset state?
5. What does `memo` actually skip?
