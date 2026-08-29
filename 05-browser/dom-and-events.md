# DOM & Browser Events

## DOM

The DOM is the browser's object representation of a document.

```js
const button = document.querySelector('button');
```

## Event propagation

Simplified:

```text
Capture
  ↓
Target
  ↓
Bubble
```

## Event delegation

Attach a listener to an ancestor and use bubbling:

```js
list.addEventListener('click', event => {
  const item = event.target.closest('[data-item-id]');
  if (!item) return;
  console.log(item.dataset.itemId);
});
```

Useful for dynamic/large lists.

## `preventDefault` vs `stopPropagation`

- `preventDefault()` stops a browser default action when cancelable.
- `stopPropagation()` stops the event traveling further through propagation.

They solve different problems.

## Passive listeners

For some scroll/touch scenarios, passive listeners tell the browser the handler will not cancel scrolling, enabling optimizations.

## Interview questions

1. Capture vs bubble?
2. What is event delegation?
3. `preventDefault` vs `stopPropagation`?
4. Why is event delegation useful?
