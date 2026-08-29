# Accessibility Testing

Accessibility tests are not a separate universe from UI tests. Semantic queries already reward accessible markup.

## High-value checks

- controls have accessible names
- labels are associated with inputs
- keyboard navigation works
- focus moves intentionally for dialogs/menus/forms
- disabled state is represented semantically
- dialogs have appropriate roles/names
- dynamic status/errors are announced when required

```tsx
expect(screen.getByRole('button', { name: /save/i })).toBeEnabled();
```

## Focus flow

```tsx
const user = userEvent.setup();
await user.tab();
expect(screen.getByRole('textbox', { name: /name/i })).toHaveFocus();
```

Component tests cannot replace manual screen-reader testing or browser-level accessibility audits, but they can prevent many semantic regressions cheaply.
