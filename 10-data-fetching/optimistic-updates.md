# Optimistic Updates

An optimistic update changes the UI/cache before the server confirms success.

Typical lifecycle:

```text
snapshot current cache
       ↓
cancel conflicting refetches
       ↓
apply optimistic cache change
       ↓
server mutation
   ↙         ↘
error       success
 ↓             ↓
rollback     reconcile/invalidate
```

## Why rollback matters

Without a snapshot/rollback strategy, a failed mutation can leave the UI showing data the server never accepted.

## When not to use optimism

Avoid it when:

- failure is common
- server rules are complex/unpredictable
- the server substantially transforms the result
- a wrong temporary state would be dangerous or confusing

## Interview questions

1. What makes an update optimistic?
2. What must happen on failure?
3. Why cancel or coordinate in-flight refetches?
4. When is pessimistic UX safer?
