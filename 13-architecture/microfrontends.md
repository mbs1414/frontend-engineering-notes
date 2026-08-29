# Microfrontends

## Idea

Split a large frontend into independently owned/deployed application slices with explicit integration boundaries.

Strongest justification is usually organizational scale and release independence, not technical fashion.

## Integration styles

Possible approaches include:

- build-time packages
- runtime composition
- server composition
- iframes for constrained cases
- Module Federation/runtime module sharing

## Module Federation

One implementation technique for loading/sharing modules across separately built applications. It is not the definition of microfrontends.

## Costs

- duplicate dependencies
- inconsistent design
- routing complexity
- auth/session coordination
- cross-app communication
- version conflicts
- larger bundles
- harder local development/debugging

## Good signals

- multiple autonomous teams
- independent release cadence matters
- clear bounded product domains
- coordination in a frontend monolith is the bottleneck

Weak signal: the project has twelve pages and someone wants an architecture diagram with more boxes.

## Interview questions

1. Why use microfrontends?
2. Main costs?
3. What is Module Federation?
4. When should you avoid microfrontends?
