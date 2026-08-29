# React Rendering

## Render is not DOM mutation

Rendering means React calls components to calculate what the UI should look like from the current props, state, and context.

Useful model:

```text
Update triggers work
      ↓
Render phase
calculate next UI
      ↓
Commit phase
apply necessary changes
      ↓
Browser paints when appropriate
```

A component can render while React decides no DOM change is necessary.

## What triggers rendering?

Common causes:

- local state update
- parent render
- consumed context update
- external-store subscription update

## Render should be pure

Rendering should calculate UI, not perform external side effects.

Bad:

```tsx
function Component() {
  localStorage.setItem('rendered', 'yes');
  return <div />;
}
```

External synchronization belongs in event handlers, effects, or the relevant framework/server mechanism.

## State snapshots

Each render sees a snapshot of state.

```tsx
setCount(count + 1);
console.log(count); // current render's old count
```

The setter schedules future work; it does not mutate the variable captured by the current render.

## Strict Mode

Development Strict Mode may intentionally perform extra calls/setup-cleanup cycles to reveal impure logic and missing cleanup. Do not confuse those diagnostics with production behavior.

## Interview questions

1. Render phase vs commit phase?
2. Does every render update the DOM?
3. Why should render be pure?
4. Why is state still old immediately after a setter?
