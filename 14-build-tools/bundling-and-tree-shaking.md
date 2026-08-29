# Bundling & Tree Shaking

## Module graph

A bundler begins from entry points and follows imports to build a dependency graph.

Output can include:

- entry chunks
- shared/vendor chunks
- dynamic chunks
- CSS/assets

## Code splitting

```js
import('./analytics.js');
```

Dynamic imports create asynchronous loading boundaries in common bundlers.

## Tree shaking

Removes exports/code proven unused, especially with statically analyzable ES modules and correct side-effect metadata.

## Side effects

A module can perform work merely by being imported:

```js
registerGlobalStyles();
```

Bundlers must preserve real side effects. Incorrect package metadata can prevent optimization or break behavior.

## Dead-code elimination

More general removal of code proven unreachable/unneeded by static analysis/build-time constants.

## Analyze

Inspect:

- initial chunks
- duplicate dependency versions
- large libraries
- whether lazy boundaries actually split output

## Interview questions

1. What does a bundler do?
2. Tree shaking vs code splitting?
3. Why do side effects matter?
4. What does dynamic `import()` enable?
