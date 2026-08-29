# HTML & Semantics

## Semantic HTML

Choose elements based on meaning and behavior, not appearance.

Useful elements:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `aside`
- `footer`
- `button`
- `a`
- `form`
- `label`

## Button vs link

- `<button>` performs an action.
- `<a href>` navigates.

A clickable `<div>` is usually a sign that native HTML has been politely ignored and now keyboard/accessibility behavior must be rebuilt manually.

## Forms

```html
<label for="email">Email</label>
<input id="email" name="email" type="email" autocomplete="email" />
```

Important concepts:

- label association
- `name`
- input type
- native validation
- autocomplete
- submit semantics
- button type

Inside forms, `<button>` defaults to submit behavior unless its type says otherwise.

## Images

Meaningful images need useful alt text. Decorative images can use empty alt:

```html
<img src="decoration.svg" alt="" />
```

## Scripts and metadata

Understand `async`, `defer`, module scripts, page title, viewport metadata, language, and description/social metadata where needed.

## Interview questions

1. Button vs anchor?
2. Why are labels important?
3. What happens when a form button has no explicit type?
4. Why does semantic HTML matter?
