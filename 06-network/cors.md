# CORS & Same-Origin Policy

## Origin

Origin is based on scheme, host, and port.

```text
https://example.com
https://api.example.com   ← different host
http://example.com        ← different scheme
https://example.com:444   ← different port
```

## Same-Origin Policy

Browsers restrict certain cross-origin interactions for security.

## CORS

Cross-Origin Resource Sharing lets a server tell browsers which cross-origin responses may be exposed to frontend code.

Important:

> CORS is primarily a browser security mechanism. Server-to-server tools are not restricted in the same way.

That is why an API can work in curl/Postman and fail in browser JavaScript.

## Preflight

Requests that do not meet "simple request" conditions may trigger an `OPTIONS` preflight.

```http
OPTIONS /api/users
Origin: https://app.example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: authorization
```

The server must respond with appropriate allowed-origin/method/header information.

## Credentials

Cross-origin cookies/credentials require compatible browser request settings and server CORS headers. Wildcard origins have restrictions when credentials are involved.

## CORS is not authentication

Allowing an origin does not identify or authorize a user.

## Interview questions

1. What is an origin?
2. Why can Postman work while browser fetch fails?
3. What is preflight?
4. Is CORS authentication?
5. Why does `OPTIONS` appear?
