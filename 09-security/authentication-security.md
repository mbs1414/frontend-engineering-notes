# Authentication & Token Storage

## Authentication vs authorization

- Authentication: identity.
- Authorization: permission.

The server must enforce authorization.

## HttpOnly cookie session/token

Advantages:

- JavaScript cannot directly read an HttpOnly cookie.
- browser integrates cookie sending automatically.

Concerns:

- CSRF-aware design
- cookie scope/configuration
- session lifecycle

## Bearer tokens in JavaScript-readable storage

Advantages:

- explicit attachment to API requests
- simple client patterns

Concerns:

- successful XSS can read/exfiltrate the token
- refresh/revocation/storage lifecycle

## In-memory tokens

Reduce persistence but disappear on reload and are still usable by active XSS during compromise.

## Refresh tokens

Long-lived credentials need stronger handling. Rotation, reuse detection, revocation, and secure cookie architecture can matter.

## Logout

Deleting local state may not invalidate a server session/token. Proper logout can require server-side invalidation/revocation.

## Interview questions

1. Authentication vs authorization?
2. Why use HttpOnly?
3. Why isn't localStorage automatically the single answer to token storage?
4. Why can server-side logout invalidation matter?
