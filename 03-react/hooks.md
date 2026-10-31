<div dir="rtl" align="right">

# <span dir="ltr">Hook</span>ها چطور <span dir="ltr">state</span> هر <span dir="ltr">component</span> را پیدا می‌کنند؟

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">State</span>](./state.md)، [<span dir="ltr">Effect</span>](./effects.md) و [<span dir="ltr">Ref</span>](./refs.md).

## مدل ساده: ترتیب فراخوانی‌ها مهم است

<span dir="ltr">React</span> باید <span dir="ltr">state</span> هر <span dir="ltr">useState</span> را بین <span dir="ltr">render</span>ها به مورد متناظر وصل کند. برای <span dir="ltr">Hook</span>های معمول مثل <span dir="ltr">useState</span> و <span dir="ltr">useEffect</span>، ترتیب فراخوانی باید ثابت بماند. به همین دلیل آن‌ها را در شرط، حلقه یا تابع معمولی دلخواه فراخوانی نمی‌کنیم.

<div dir="ltr" align="left">

~~~jsx
// نادرست:
function Bad({ enabled }) {
  if (enabled) {
    // const [value, setValue] = useState('');
  }
  return null;
}
~~~

</div>

در یک <span dir="ltr">render</span>، <span dir="ltr">Hook</span> وجود دارد و در <span dir="ltr">render</span> بعدی ممکن است نباشد؛ ترتیب قابل اتکا نیست.

<div dir="ltr" align="left">

~~~jsx
// الگوی درست، داخل component:
useEffect(() => {
  if (!enabled) return;
  console.log('enabled');
}, [enabled]);
~~~

</div>

خود <span dir="ltr">Hook</span> همواره فراخوانی می‌شود و شرط داخل کار آن قرار می‌گیرد.

## کدام <span dir="ltr">Hook</span> برای کدام مسئله؟

| نیاز | ابزار معمول |
| --- | --- |
| داده‌ای که ظاهر را تغییر می‌دهد | <span dir="ltr">useState</span> یا <span dir="ltr">useReducer</span> |
| هماهنگی با سیستم بیرونی | <span dir="ltr">useEffect</span> |
| <span dir="ltr">DOM</span> یا مقدار پایدار غیرنمایشی | <span dir="ltr">useRef</span> |
| خواندن مقدار <span dir="ltr">provider</span> | <span dir="ltr">useContext</span> |
| <span dir="ltr">cache</span> محاسبه یا هویت تابع | <span dir="ltr">useMemo</span> یا <span dir="ltr">useCallback</span>، در صورت نیاز |

## مثال دوم: چرا <span dir="ltr">dependency</span> با <span dir="ltr">closure</span> مرتبط است؟

<div dir="ltr" align="left">

~~~jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
~~~

</div>

<span dir="ltr">updater</span> به مقدار صف‌شده دسترسی می‌گیرد، پس لازم نیست <span dir="ltr">callback</span> مقدار <span dir="ltr">count render</span> نخست را بخواند. اگر واقعاً مقدار <span dir="ltr">reactive</span> دیگری مثل <span dir="ltr">step</span> مصرف شود، باید آن وابستگی را هم در طراحی لحاظ کنی.

## پاسخ مصاحبه و تمرین

**آیا هر تابع با نام <span dir="ltr">use</span> یک <span dir="ltr">Hook</span> درست است؟** نام به ابزارها کمک می‌کند، ولی قواعد اجرا و استفاده صحیح از <span dir="ltr">Hook</span>ها همچنان لازم‌اند. <span dir="ltr">API</span> ویژه <span dir="ltr">use</span> در <span dir="ltr">React</span> قواعد متفاوتی از بعضی <span dir="ltr">Hook</span>های معمول دارد؛ آن استثنا را به <span dir="ltr">useState</span> تعمیم نده.

برای اجرای <span dir="ltr">Effect</span> فقط در حالت باز بودن <span dir="ltr">modal</span>، <span dir="ltr">Hook</span> را داخل <span dir="ltr">if</span> بگذاریم؟

<details>
<summary>پاسخ</summary>

خیر. <span dir="ltr">useEffect</span> را همیشه در سطح بالای <span dir="ltr">component</span> صدا بزن و داخل <span dir="ltr">callback</span> با <span dir="ltr">`if (!open) return`</span> کار را محدود کن؛ <span dir="ltr">dependency</span> مربوط به <span dir="ltr">open</span> را هم ثبت کن.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Hooks Mental Model

## Call order matters

React associates hook state with hook call order. Hooks must not be called conditionally in ordinary component logic.

Bad:

```tsx
if (loggedIn) {
  useEffect(() => {}, []);
}
```

## Important hooks by purpose

### State

- `useState`
- `useReducer`

### Context

- `useContext`

### Refs/integration

- `useRef`
- `useImperativeHandle`

### Effects

- `useEffect`
- `useLayoutEffect`
- `useInsertionEffect` (specialized)

### Performance/scheduling

- `useMemo`
- `useCallback`
- `useTransition`
- `useDeferredValue`

### Other infrastructure

- `useId`
- `useSyncExternalStore`
- `useDebugValue`

### Modern async/form APIs

- `use`
- `useActionState`
- `useOptimistic`

`useFormStatus` comes from React DOM and is used for form/action status.

## Custom hooks

A custom hook extracts reusable stateful behavior. It does **not** automatically create shared state between all callers.

## Hooks are not lifecycle-method replacements

Think in terms of state, synchronization, subscriptions, scheduling, and reusable behavior rather than forcing hooks into old class lifecycle boxes.

## Interview questions

1. Why must hook order stay stable?
2. Does a custom hook share state automatically?
3. Why isn't `useEffect` simply `componentDidMount`?
4. When does `useSyncExternalStore` matter?

</div>

</details>

</div>
