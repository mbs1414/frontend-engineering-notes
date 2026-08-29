# Rendering Strategies: CSR, SSR, SSG, ISR, RSC

## CSR

Client-Side Rendering means browser JavaScript creates most application UI after initial resources load.

Advantages:

- rich client interactions
- straightforward SPA model
- static hosting options

Costs:

- more client JavaScript
- first-content delays on weak devices/networks if poorly designed
- SEO/social metadata can need more care

## SSR

Server-Side Rendering produces HTML per request.

Advantages:

- earlier HTML/content
- can improve first-load/SEO behavior

Costs:

- server compute
- hydration/data/cache complexity

## SSG

Static Site Generation produces HTML ahead of requests, commonly at build time.

## ISR

Incremental Static Regeneration is a framework pattern where static output can be regenerated/revalidated after deployment instead of rebuilding everything.

Exact semantics are framework-specific.

## Hydration

Server-rendered HTML becomes connected to client React behavior.

```text
server HTML
+
client JS/React
→ interactive UI
```

A hydration mismatch happens when server and client output disagree.

## Streaming

The server can progressively send page output rather than wait for the whole tree before sending anything.

## React Server Components

Some component execution stays on the server, reducing client JavaScript for server-only components and enabling server-side data composition.

Important: Server Components are not automatically the default in every React application. Framework/runtime architecture determines support and defaults.

## Interview questions

1. CSR vs SSR?
2. SSG vs ISR?
3. What is hydration?
4. What causes hydration mismatch?
5. What can Server Components reduce?
