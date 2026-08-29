# Performance Fundamentals

## Measure first

```text
Measure
 ↓
Find bottleneck
 ↓
Understand cause
 ↓
Optimize
 ↓
Measure again
```

Starting with `useMemo` is not a performance strategy.

## Performance layers

```text
Network
  ↓
HTML/CSS/JS download
  ↓
parse/compile JavaScript
  ↓
execute JavaScript
  ↓
application/React work
  ↓
style calculation
  ↓
layout
  ↓
paint
  ↓
composite
```

React is one layer, not the entire universe.

## Questions that matter

- How fast does meaningful content appear?
- How responsive are interactions?
- Does layout jump?
- Is navigation fast?
- Is scrolling smooth?

## Tools

- Chrome DevTools Performance
- Network panel
- Lighthouse
- React DevTools Profiler
- Web Vitals / RUM
- bundle analyzer
- coverage tools

## Long tasks

Long main-thread tasks can block input, rendering, timers, and other JavaScript work.

Solutions may include reducing work, splitting work, scheduling lower-priority work, moving suitable CPU-heavy tasks to Web Workers, or avoiding unnecessary computation.

## Lab vs real-user data

Lab tests are controlled and repeatable. Real User Monitoring shows what actual devices/networks experience. Use both.

## Interview questions

1. What is your performance-debugging workflow?
2. What is a long task?
3. Why isn't React memoization enough?
4. Lab vs field/RUM data?
