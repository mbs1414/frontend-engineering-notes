# XSS & CSRF

## XSS

Cross-Site Scripting occurs when attacker-controlled content is interpreted/executed as dangerous markup/script in another user's browser under the application's origin.

Common categories:

- stored XSS
- reflected XSS
- DOM-based XSS

React escapes normal string rendering:

```tsx
<div>{userInput}</div>
```

Raw HTML is much riskier:

```tsx
<div dangerouslySetInnerHTML={{ __html: html }} />
```

Only use trusted/sanitized HTML with an understood threat model.

Dangerous sinks include `innerHTML`, `outerHTML`, `insertAdjacentHTML`, and unsafe dynamic script/URL handling.

### CSP

Content Security Policy can restrict script/resource execution and reduce impact of some injection attacks. It is defense in depth, not a substitute for safe output handling.

## CSRF

Cross-Site Request Forgery tricks a browser into sending an unwanted authenticated request, commonly relying on cookies that the browser attaches automatically.

Defenses may include:

- `SameSite` cookies
- CSRF tokens
- origin/referer checks where appropriate
- custom-header/CORS architecture
- reauthentication for sensitive operations

## Difference

**XSS:** attacker code executes in your application origin/context.

**CSRF:** attacker site causes an unwanted authenticated request.

Bearer tokens manually attached from JS change CSRF exposure but increase XSS token-theft exposure if stored in JavaScript-readable storage.

## Interview questions

1. Why is normal React string output safer than raw HTML?
2. What is stored XSS?
3. XSS vs CSRF?
4. How does SameSite help?
5. What does CSP do?
