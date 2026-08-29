# Browser Architecture

Modern browsers separate work across processes/threads for security, rendering, networking, GPU/compositing, and workers. Exact implementations differ, but the concepts matter.

## Main-thread responsibilities

A page's main thread commonly handles much of:

- JavaScript execution
- DOM work
- style/layout
- event dispatch
- rendering coordination

Heavy JavaScript can therefore delay interaction and rendering.

## Browser APIs vs JavaScript language

These are platform/browser APIs, not ECMAScript language features:

- DOM
- `fetch`
- timers
- WebSocket
- Storage
- History
- URL
- Observers
- Workers

## Web Workers

Workers run JavaScript away from the main UI thread for suitable CPU-heavy tasks.

They do not directly manipulate the normal DOM. Communication occurs through messages/shared mechanisms.

## Interview questions

1. Why can heavy JS block rendering?
2. Is `setTimeout` part of the JS language itself?
3. What can a Web Worker help with?
4. Can a worker directly update the DOM?
