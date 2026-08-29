# WebSocket, SSE, DNS, TCP & TLS

## WebSocket

Persistent bidirectional communication after an HTTP-based handshake/upgrade.

Good for:

- chat
- collaborative apps
- real-time dashboards
- two-way live controls

Production concerns:

- reconnect
- heartbeat
- auth refresh
- message ordering/duplicates
- backpressure
- cleanup

## Server-Sent Events

SSE is a long-lived HTTP stream from server to client.

```js
const source = new EventSource('/events');
source.onmessage = event => console.log(event.data);
```

Good for notifications, progress, and server → client streams.

## WebSocket vs SSE

| | WebSocket | SSE |
|---|---|---|
| Direction | Bidirectional | Server → client |
| Browser API | `WebSocket` | `EventSource` |
| Reconnect | app-managed patterns | built-in EventSource retry behavior |

## DNS

Resolves hostnames to network address information.

## TCP

HTTP/1.1 and HTTP/2 commonly use TCP for reliable ordered byte transport.

## TLS

HTTPS uses TLS for encryption in transit and server authentication via certificates.

## HTTP/3 / QUIC

HTTP/3 uses QUIC, changing connection establishment and packet-loss behavior compared with TCP-based HTTP versions.

## Navigation mental model

```text
URL → DNS → connection → TLS → HTTP → server/CDN → response → browser rendering
```

Caches and connection reuse mean not every request repeats every step.

## Interview questions

1. WebSocket vs SSE?
2. What does DNS do?
3. What does TLS provide?
4. Why is connection reuse valuable?
