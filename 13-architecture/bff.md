# Backend For Frontend (BFF)

## Definition

A BFF is a backend/API layer designed around the needs of a particular frontend/client.

```text
Web App ───── Web BFF ────┐
                          ├── internal services
Mobile App ── Mobile BFF ─┘
```

## Benefits

A BFF can:

- aggregate multiple services
- adapt response shapes
- hide internal service topology
- handle client-specific auth/session logic
- reduce frontend request waterfalls
- protect server-only secrets/integrations

## BFF vs GraphQL

- BFF = architectural pattern
- GraphQL = API/query technology

A BFF can expose REST, GraphQL, RPC, or another interface.

## Costs

- another service to deploy/observe
- possible duplicated logic
- versioning/ownership complexity

Business-critical domain rules should usually live in appropriate backend/domain services rather than being copied into every BFF.

## Interview questions

1. What is a BFF?
2. How can it improve frontend performance?
3. Is GraphQL the same thing?
4. What should not be duplicated into each BFF?
