# Index Signatures and `Record`

Index signatures describe object types whose property names are not all known ahead of time.

```ts
type Scores = {
  [playerName: string]: number;
};
```

Prefer a more precise object type when the keys are known. An index signature is appropriate when the key space is genuinely dynamic.

`Record<K, V>` is often a clearer alternative:

```ts
type Scores = Record<string, number>;
```

Be careful with broad string index signatures: explicit properties must also be compatible with the index-signature value type.

## Course notes: TypeScript Index Signatures

### What Problem Does It Solve?

Sometimes we don't know all property names in advance.

Example:

```ts
const genres = {
  action: 120,
  comedy: 80,
  drama: 95,
}
```

Here the keys (`action`, `comedy`, `drama`) could be dynamic.

TypeScript needs a way to describe:

> "This object can have any string key, but the values must be numbers."

That's where **index signatures** come in.

---

## Basic Syntax

```ts
interface GenreCount {
  [key: string]: number
}
```

Meaning:

- Any property name is allowed
- Property names must be strings
- Property values must be numbers

Example:

```ts
const genres: GenreCount = {
  action: 120,
  comedy: 80,
  drama: 95,
}
```

Valid because every value is a number.

---

## Invalid Example

```ts
const genres: GenreCount = {
  action: 120,
  comedy: "many",
}
```

Error:

```text
Type 'string' is not assignable to type 'number'
```

because every value must be a number.

---

## Reading Properties

```ts
interface GenreCount {
  [key: string]: number
}

const genres: GenreCount = {
  action: 120,
}

console.log(genres["action"])
```

Output:

```text
120
```

---

## Number Index Signatures

You can also use numbers as keys.

```ts
interface MovieList {
  [index: number]: string
}
```

Example:

```ts
const movies: MovieList = {
  0: "Inception",
  1: "Interstellar",
  2: "Tenet",
}
```

---

## Combining Explicit Properties

You can mix known properties with an index signature.

```ts
interface Ratings {
  imdb: number
  [site: string]: number
}
```

Example:

```ts
const ratings: Ratings = {
  imdb: 8.8,
  rottenTomatoes: 87,
  metacritic: 74,
}
```

---

## Common React Example

Suppose an API returns validation errors.

```json
{
  "title": ["Required"],
  "year": ["Must be a number"]
}
```

You don't know the field names ahead of time.

Use:

```ts
interface ValidationErrors {
  [field: string]: string[]
}
```

Example:

```ts
const errors: ValidationErrors = {
  title: ["Required"],
  year: ["Must be a number"],
}
```

---

## Record vs Index Signature

These are equivalent:

```ts
interface GenreCount {
  [key: string]: number
}
```

and

```ts
type GenreCount = Record<string, number>
```

Many developers prefer:

```ts
Record<string, number>
```

because it's shorter.

---

## Real Movie Hub Example

Imagine a movie grouped by language.

```ts
interface MoviesByLanguage {
  [language: string]: string[]
}
```

Example:

```ts
const movies: MoviesByLanguage = {
  English: ["Inception", "Interstellar"],
  Korean: ["Parasite"],
  Japanese: ["Your Name"],
}
```

---

## When to Use Index Signatures

Use them when:

✅ Property names are unknown beforehand

✅ Keys are generated dynamically

✅ API responses have varying fields

✅ Creating lookup tables

Examples:

- Form validation errors
- Genre mappings
- Language mappings
- Cached API responses

---

## Key Takeaway

```ts
interface Example {
  [key: string]: ValueType
}
```

means:

> "This object can have any string key, and every value must be ValueType."

Examples:

```ts
[key: string]: number;
[key: string]: string;
[key: string]: Movie;
[key: string]: Movie[];
```

Index signatures are TypeScript's way of typing objects whose property names are not known ahead of time.

## Interview questions

1. When is an index signature appropriate?
2. How does `Record<K, V>` differ from an index signature?
3. Why can `[key: string]: any` destroy useful type safety?
