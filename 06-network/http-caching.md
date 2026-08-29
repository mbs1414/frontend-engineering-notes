# HTTP Caching

## `Cache-Control`

```http
Cache-Control: no-store
```

Do not store the response.

```http
Cache-Control: no-cache
```

May store it, but revalidate before reuse.

```http
Cache-Control: public, max-age=31536000, immutable
```

Useful for content-hashed immutable static assets.

## Validators

### ETag

Server:

```http
ETag: "abc123"
```

Client revalidation:

```http
If-None-Match: "abc123"
```

If unchanged, server can respond:

```http
304 Not Modified
```

### Last-Modified

Time-based validator used with `If-Modified-Since`.

## Cache layers are different

- browser HTTP cache
- CDN cache
- Service Worker Cache Storage
- TanStack Query/server-state cache
- in-memory memoization

Do not use the word "cache" as though these are one storage bucket with multiple branding departments.

## Content hashing

```text
app.8b13f3.js
```

A changed file gets a new URL, allowing long-lived caching for unchanged assets.

## Interview questions

1. `no-cache` vs `no-store`?
2. What is ETag?
3. Why is 304 useful?
4. Why content-hash filenames?
5. HTTP cache vs TanStack Query cache?
