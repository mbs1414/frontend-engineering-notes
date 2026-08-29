# Narrowing & Type Guards

## Narrowing

Narrowing reduces a broad type to a more specific type based on runtime checks TypeScript understands.

```ts
function format(value: string | number) {
  if (typeof value === 'string') {
    return value.trim();
  }
  return value.toFixed(2);
}
```

## Common techniques

- `typeof`
- `instanceof`
- `in`
- equality/discriminant checks
- user-defined type guards

## Discriminated unions

```ts
type Result =
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: Error };

function render(result: Result) {
  if (result.status === 'success') {
    return result.data;
  }
  return result.error.message;
}
```

This pattern is excellent for modeling UI states safely.

## User-defined guard

```ts
function isUser(value: unknown): value is User {
  return typeof value === 'object' && value !== null && 'id' in value;
}
```

A type guard is only as trustworthy as its actual runtime checks.

## Exhaustiveness

Use `never` to catch forgotten variants in switches.

```ts
function assertNever(value: never): never {
  throw new Error('Unexpected value');
}
```

## Interview questions

1. What is narrowing?
2. What is a discriminated union?
3. Type guard vs type assertion?
4. How can `never` help exhaustiveness?
