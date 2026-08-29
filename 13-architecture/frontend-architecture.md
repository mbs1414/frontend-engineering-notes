# Frontend Architecture

## Architecture is dependency management

Good frontend architecture controls:

- responsibility boundaries
- dependency direction
- state ownership
- API boundaries
- testability
- change impact

## Layer-based structure

```text
components/
pages/
services/
hooks/
utils/
```

Simple, but a feature can become scattered across many folders as the app grows.

## Feature-based structure

```text
features/
  users/
    api/
    components/
    hooks/
    model/
  billing/
```

Improves feature cohesion when boundaries are meaningful.

## Shared layer

Good candidates:

- design-system primitives
- generic utilities
- infrastructure clients

A `shared/` folder becomes a landfill if everything vaguely reusable is dropped there.

## Clean Architecture ideas

Useful principles:

- business rules should not depend unnecessarily on UI/framework details
- stable domain/use-case abstractions should not depend on volatile infrastructure
- external systems should sit behind clear boundaries

Do not force enterprise onion diagrams onto a six-screen application.

## Thin vs thick client

A thick client performs more logic/rendering in the browser. A thin client delegates more work to the server. Modern apps often mix both per feature.

## Interview questions

1. Feature-based vs layer-based architecture?
2. What makes a good module boundary?
3. When is Clean Architecture overkill?
4. What belongs in shared?
