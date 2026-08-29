# ESM vs CommonJS

## ES Modules

```js
export function add() {}
import { add } from './math.js';
```

ESM has statically analyzable import/export structure, which helps bundlers build dependency graphs and tree shake code.

## CommonJS

```js
module.exports = { add };
const { add } = require('./math');
```

Historically common in Node.js ecosystems.

## Dynamic import

```js
const module = await import('./feature.js');
```

Useful for lazy loading/code splitting.

## Interop

Real projects often consume both ESM and CommonJS packages. Toolchains handle interop, sometimes with caveats.

## Interview questions

1. ESM vs CommonJS syntax?
2. Why is ESM tree-shaking-friendly?
3. What does dynamic import enable?
