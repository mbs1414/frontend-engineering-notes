# TypeScript Fundamentals

## What TypeScript does

TypeScript adds static type analysis to JavaScript. Type information is generally erased before browser runtime.

## Inference

```ts
const count = 1; // inferred number
```

Prefer inference when the type is obvious.

## Union types

```ts
type Status = 'idle' | 'loading' | 'success' | 'error';
```

Useful for constrained UI/application states.

## Intersection types

```ts
type UserWithPermissions = User & Permissions;
```

## `type` vs `interface`

Both can describe object shapes. Important differences include declaration merging and some composition ergonomics. Neither is universally superior.

## `any`, `unknown`, `never`, `void`

- `any`: disables meaningful checking for that value.
- `unknown`: requires narrowing before unsafe operations.
- `never`: represents a value that should never occur.
- `void`: commonly represents a function whose return value is not meaningfully used.

```ts
function parse(value: unknown) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
}
```

## `as const`

```ts
const config = { method: 'GET' } as const;
```

Keeps the property as the literal type `'GET'` rather than widening to `string`.

## `satisfies`

```ts
const routes = {
  home: '/',
  users: '/users',
} satisfies Record<string, string>;
```

Checks compatibility while retaining useful inference.

## Interview questions

1. Why prefer `unknown` to `any` at unsafe boundaries?
2. Union vs intersection?
3. What is `never` useful for?
4. Does TypeScript validate runtime API data automatically?
