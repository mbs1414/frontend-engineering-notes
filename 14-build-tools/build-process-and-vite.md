# Build Process & Vite

## Source to browser

A modern build may involve:

```text
TypeScript/JSX
    ↓
type checking (often separate)
    ↓
transformation/transpilation
    ↓
module graph
    ↓
bundling/chunking
    ↓
minification
    ↓
assets/source maps
    ↓
deployment
```

## Transpilation

Transforms source syntax/features into another JavaScript target. Tools in this ecosystem include Babel, SWC, and esbuild.

## Bundling

Builds a module graph and produces optimized output chunks/assets.

## Type checking

TypeScript checking is logically distinct from bundling. Some fast pipelines transpile TS and run `tsc --noEmit` separately.

## Source maps

Map generated/minified code back to source for debugging/monitoring.

## Vite development

Vite uses native ES module behavior and fast transforms so it does not need to eagerly bundle the entire app before development serving in the traditional way. Dependencies may be optimized/pre-bundled.

## HMR

Hot Module Replacement updates changed modules without always requiring a full reload.

## Vite environment variables

Client-exposed variables are bundled into browser code and are not secret.

```ts
import.meta.env.VITE_API_URL
```

## Interview questions

1. Bundler vs transpiler?
2. Is type checking the same as bundling?
3. What are source maps?
4. Why is Vite fast in development?
5. Are client env variables secret?
