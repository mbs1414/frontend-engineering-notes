# Accessibility Fundamentals

## Native semantics first

Prefer:

```html
<button>Save</button>
```

over:

```html
<div role="button" tabindex="0">Save</div>
```

Native controls already include keyboard behavior, semantics, focus behavior, and assistive-technology integration.

## Accessible name

Interactive elements need a meaningful accessible name from visible text, labels, or appropriate ARIA mechanisms.

## Forms

```html
<label for="email">Email</label>
<input id="email" name="email" />
```

Placeholder text is not a replacement for a label.

## Keyboard navigation

Users should be able to:

- reach interactive controls
- see focus
- activate controls correctly
- close overlays
- avoid keyboard traps

Do not remove focus outlines without a visible replacement.

## Focus management

For modal dialogs:

- move focus appropriately into the dialog
- keep keyboard interaction inside while modal
- allow expected close behavior
- return focus sensibly after close

Use proven accessible primitives when possible.

## ARIA

ARIA supplements native HTML when native semantics cannot express the required widget pattern.

> No ARIA is better than incorrect ARIA.

## Visual accessibility

Consider:

- contrast
- text zoom
- reduced motion
- color not being the only state indicator

## Interview questions

1. Why button instead of div+click?
2. What is an accessible name?
3. Placeholder vs label?
4. What is focus trapping?
5. When should ARIA be used?
