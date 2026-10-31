<div dir="rtl" align="right">

# از پیدا کردن سرور تا پیام زنده — <span dir="ltr">DNS</span>، <span dir="ltr">TLS</span>، <span dir="ltr">WebSocket</span> و <span dir="ltr">SSE</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">HTTP</span>](./http.md).

<span dir="ltr">DNS</span> نام دامنه را به اطلاعات مقصد مرتبط می‌کند. <span dir="ltr">TCP</span> انتقال مرتب و قابل اتکای بایت‌ها را فراهم می‌کند. <span dir="ltr">TLS</span> لایه امنیت ارتباط و احراز هویت طرف سرور با گواهی را اضافه می‌کند. <span dir="ltr">HTTP/3</span> از <span dir="ltr">QUIC</span> روی <span dir="ltr">UDP</span> استفاده می‌کند؛ «همه <span dir="ltr">HTTP</span>ها روی <span dir="ltr">TCP</span> هستند» جمله دقیقی نیست.

## برای داده زنده کدام مسیر؟

| روش | جهت اصلی | مثال |
| --- | --- | --- |
| <span dir="ltr">Polling</span> | درخواست‌های تکراری <span dir="ltr">client</span> | بررسی دوره‌ای وضعیت |
| <span dir="ltr">SSE</span> | جریان <span dir="ltr">server</span> به <span dir="ltr">client</span> | اعلان یا قیمت زنده |
| <span dir="ltr">WebSocket</span> | دوطرفه | چت و تعامل پرتعداد |

## مثال اول: <span dir="ltr">SSE</span> در مرورگر

<div dir="ltr" align="left">

~~~js
const stream = new EventSource('/api/events');
stream.onmessage = event => console.log(event.data);
// در پایان نیاز:
// stream.close();
~~~

</div>

سرور باید پاسخ <span dir="ltr">text/event-stream</span> سازگار بفرستد. <span dir="ltr">EventSource</span> سازوکار <span dir="ltr">reconnect</span> دارد، ولی مجوز، تکرار پیام و بازیابی وضعیت همچنان نیازمند طراحی‌اند.

## مثال دوم: <span dir="ltr">WebSocket</span>

<div dir="ltr" align="left">

~~~js
const socket = new WebSocket('wss://example.com/chat');
socket.addEventListener('open', () => socket.send('hello'));
socket.addEventListener('message', event => console.log(event.data));
// هنگام پایان: socket.close();
~~~

</div>

آدرس فرضی است. ارسال را پس از <span dir="ltr">open</span> انجام می‌دهیم. <span dir="ltr">WebSocket</span> به‌تنهایی صف آفلاین، تضمین پردازش دقیقاً یک بار یا <span dir="ltr">reconnect</span> برنامه را فراهم نمی‌کند.

## پاسخ مصاحبه و تمرین

برای فهرست اعلان‌هایی که فقط سرور به صفحه می‌فرستد، حتماً <span dir="ltr">WebSocket</span> لازم است؟

<details>
<summary>پاسخ</summary>

خیر. <span dir="ltr">SSE</span> ممکن است ساده‌تر باشد؛ محدودیت احراز هویت، <span dir="ltr">proxy</span>، تعداد اتصال و نیاز واقعی دوطرفه را هم بررسی کن.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

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

</div>

</details>

</div>
