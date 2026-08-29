# HTTP

## Request/response

A request includes method, URL, headers, and optional body. A response includes status, headers, and body.

## Common methods

- `GET` — retrieve
- `POST` — submit/create/process
- `PUT` — replace/update semantics depending on API
- `PATCH` — partial update
- `DELETE` — delete
- `OPTIONS` — communication options/CORS preflight
- `HEAD` — headers without normal response body

Understand idempotency conceptually rather than memorizing REST slogans as if badly designed APIs do not exist.

## Status codes

Important examples:

- 200 OK
- 201 Created
- 204 No Content
- 304 Not Modified
- 400 Bad Request
- 401 Unauthorized, usually unauthenticated
- 403 Forbidden
- 404 Not Found
- 409 Conflict
- 422 Unprocessable Content/Entity depending on API terminology
- 429 Too Many Requests
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable

## Headers

Frontend-relevant headers include:

- `Content-Type`
- `Accept`
- `Authorization`
- `Cache-Control`
- `ETag`
- `Last-Modified`
- `Set-Cookie`
- CORS headers

## HTTP versions

- HTTP/1.1: traditional connection/request model.
- HTTP/2: multiplexed streams over a connection and header compression.
- HTTP/3: QUIC-based transport with different connection/loss characteristics.

## Interview questions

1. 401 vs 403?
2. PUT vs PATCH?
3. What is idempotency?
4. What does HTTP/2 multiplexing improve?
