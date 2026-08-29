# Cookies & Authentication

## Cookie attributes

### `HttpOnly`

Prevents normal JavaScript access through `document.cookie`. Helps reduce direct credential theft via XSS.

### `Secure`

Restricts cookie transmission to secure HTTPS contexts.

### `SameSite`

Controls cross-site cookie sending and is important in CSRF defense.

Common values:

- `Strict`
- `Lax`
- `None` (used with secure requirements in modern browsers)

## Cookie vs localStorage for auth

There is no honest one-line winner.

**HttpOnly cookie:**

- JavaScript cannot directly read it.
- browser sends it automatically when rules match.
- requires CSRF-aware design.

**localStorage bearer token:**

- easy for JS to attach explicitly.
- successful XSS can read/exfiltrate it.

Security depends on architecture and threat model.

## Authentication vs authorization

- Authentication: who are you?
- Authorization: are you allowed to do this?

Authorization must be enforced by the server. Hiding an admin button is UX, not a security boundary.

## Interview questions

1. What does HttpOnly help protect?
2. Why does SameSite matter?
3. Why can cookie sessions face CSRF?
4. Auth vs authorization?
5. Cookie vs localStorage tradeoffs?
