# Frontend Security

## Core areas

- XSS
- CSRF
- Content Security Policy
- authentication/session handling
- CORS understanding
- clickjacking defenses
- dependency/supply-chain risk
- safe handling of URLs, HTML, and files

## Client-side authorization is not security

```js
if (user.role === 'admin') {
  showDeleteButton();
}
```

Hiding a button is UX. The backend must authorize the delete request.

## Client validation vs server validation

Client validation improves UX. Server validation protects data integrity/security. A user can bypass frontend code entirely.

## Frontend secrets

Anything shipped into browser JavaScript is visible to users. Do not embed private API secrets in frontend bundles.

A Vite environment variable exposed to client code is configuration, not a secret vault wearing an uppercase name.

## Dependency risk

Keep dependencies intentional, updated, and monitored. Every package adds maintenance and supply-chain surface.

## Interview questions

1. Why can't frontend role checks enforce authorization?
2. Can a browser bundle contain a truly private API secret?
3. Client vs server validation?
