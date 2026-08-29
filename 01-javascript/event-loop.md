# JavaScript Event Loop

## Why it exists

Browser JavaScript typically executes on a main thread, while browser APIs handle timers, networking, events, and other asynchronous work. The event loop coordinates when queued callbacks can run.

## Simplified model

```text
Call Stack
   ↑
Event Loop
   ↑
Task Queue / Microtask Queue
   ↑
Browser APIs
```

This is a mental model, not a literal full browser architecture diagram.

## Tasks (often called macrotasks)

Examples include timer callbacks and DOM event callbacks.

## Microtasks

Examples include Promise reactions and `queueMicrotask` callbacks.

After the current task finishes, queued microtasks are drained before the next task runs and before an eligible rendering opportunity.

## Classic example

```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

Output:

```text
A
D
C
B
```

Reason:

1. `A` is synchronous.
2. Timer callback becomes a future task.
3. Promise callback becomes a microtask.
4. `D` is synchronous.
5. Current task ends.
6. Microtasks run (`C`).
7. Later task runs (`B`).

## `async/await`

`await` pauses that async function's continuation. The continuation resumes asynchronously through Promise/microtask machinery.

```js
async function run() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}

console.log(3);
run();
console.log(4);
```

Output:

```text
3
1
4
2
```

## Rendering connection

Long tasks delay input processing and rendering. This directly affects perceived responsiveness and can hurt INP.

## Interview questions

1. Task vs microtask?
2. Why does Promise usually run before `setTimeout(..., 0)`?
3. Does a zero-delay timer run immediately?
4. Where does execution resume after `await`?
5. How can long tasks hurt frontend performance?
