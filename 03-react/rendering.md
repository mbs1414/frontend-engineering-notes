<div dir="rtl" align="right">

# <span dir="ltr">React</span> چطور صفحه را به‌روز می‌کند؟ — <span dir="ltr">Render</span> و <span dir="ltr">Commit</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** تابع و <span dir="ltr">object</span> در <span dir="ltr">JavaScript</span>. یک <span dir="ltr">component</span> معمولاً تابعی است که از ورودی‌ها، توضیح ظاهر صفحه را به شکل <span dir="ltr">JSX</span> برمی‌گرداند.

## سه اتفاق جدا را تشخیص بده

۱. **<span dir="ltr">Trigger</span>:** چیزی مثل تغییر <span dir="ltr">state</span>، درخواست به‌روزرسانی ایجاد می‌کند.
۲. **<span dir="ltr">Render</span>:** <span dir="ltr">React</span> تابع <span dir="ltr">component</span>ها را اجرا می‌کند تا ظاهر بعدی محاسبه شود.
۳. **<span dir="ltr">Commit</span>:** تغییرات لازم به <span dir="ltr">DOM</span> اعمال می‌شود. بعد مرورگر فرصت نمایش پیکسل‌ها را دارد.

<span dir="ltr">Render</span> شدن یعنی محاسبه، و همیشه به معنی تغییر <span dir="ltr">DOM</span> نیست. اگر متن خروجی همان قبلی باشد، ممکن است نیازی به تغییر آن <span dir="ltr">node</span> نباشد.

<div dir="ltr" align="left">

~~~jsx
function Greeting({ name }) {
  console.log('render');
  return <h1>Hello {name}</h1>;
}
~~~

</div>

اگر والد دوباره <span dir="ltr">render</span> شود، <span dir="ltr">Greeting</span> هم معمولاً دوباره اجرا می‌شود. اگر <span dir="ltr">name</span> همچنان <span dir="ltr">Sara</span> باشد، متن <span dir="ltr">h1</span> می‌تواند ثابت بماند.

## چرا <span dir="ltr">render</span> باید خالص باشد؟

<div dir="ltr" align="left">

~~~jsx
// نادرست: هر render آرایه مشترک را تغییر می‌دهد
const history = [];
function Bad({ name }) {
  history.push(name);
  return <p>{name}</p>;
}
~~~

</div>

<span dir="ltr">React</span> ممکن است محاسبه <span dir="ltr">render</span> را تکرار یا کنار بگذارد. تغییر داده بیرونی، ارسال درخواست یا ثبت <span dir="ltr">listener</span> داخل بدنه <span dir="ltr">render</span> می‌تواند رفتار تکراری یا ناسازگار بسازد. برای واکنش به کلیک، <span dir="ltr">event handler</span> و برای هماهنگی با سیستم بیرونی، <span dir="ltr">Effect</span> را بررسی کن.

<div dir="ltr" align="left">

~~~jsx
function SaveButton() {
  return <button onClick={() => console.log('save')}>ذخیره</button>;
}
~~~

</div>

اینجا صرف <span dir="ltr">render</span> شدن دکمه، <span dir="ltr">save</span> را اجرا نمی‌کند؛ کلیک <span dir="ltr">handler</span> را اجرا می‌کند.

## پاسخ مصاحبه و تمرین

**چه چیزهایی <span dir="ltr">render</span> ایجاد می‌کنند؟** <span dir="ltr">mount</span> اولیه، به‌روزرسانی <span dir="ltr">state</span>، <span dir="ltr">render</span> والد و تغییر <span dir="ltr">context</span> مصرف‌شده از علت‌های رایج‌اند. <span dir="ltr">memo</span> می‌تواند در شرایطی بعضی <span dir="ltr">render</span>های ناشی از والد را رد کند، ولی <span dir="ltr">state</span> و <span dir="ltr">context</span> همچنان مهم‌اند.

اگر <span dir="ltr">console.log</span> بدنه <span dir="ltr">component</span> دو بار اجرا شد، آیا <span dir="ltr">DOM</span> حتماً دو بار تغییر کرده؟

<details>
<summary>پاسخ</summary>

خیر. <span dir="ltr">render</span> و <span dir="ltr">commit</span> متفاوت‌اند. در <span dir="ltr">Strict Mode</span> توسعه هم بعضی اجراها برای پیدا کردن ناخالصی‌ها تکرار می‌شوند؛ تعداد <span dir="ltr">log</span>ها را برابر تعداد تغییر <span dir="ltr">DOM</span> نگیر.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# React Rendering

## Render is not DOM mutation

Rendering means React calls components to calculate what the UI should look like from the current props, state, and context.

Useful model:

```text
Update triggers work
      ↓
Render phase
calculate next UI
      ↓
Commit phase
apply necessary changes
      ↓
Browser paints when appropriate
```

A component can render while React decides no DOM change is necessary.

## What triggers rendering?

Common causes:

- local state update
- parent render
- consumed context update
- external-store subscription update

## Render should be pure

Rendering should calculate UI, not perform external side effects.

Bad:

```tsx
function Component() {
  localStorage.setItem('rendered', 'yes');
  return <div />;
}
```

External synchronization belongs in event handlers, effects, or the relevant framework/server mechanism.

## State snapshots

Each render sees a snapshot of state.

```tsx
setCount(count + 1);
console.log(count); // current render's old count
```

The setter schedules future work; it does not mutate the variable captured by the current render.

## Strict Mode

Development Strict Mode may intentionally perform extra calls/setup-cleanup cycles to reveal impure logic and missing cleanup. Do not confuse those diagnostics with production behavior.

## Interview questions

1. Render phase vs commit phase?
2. Does every render update the DOM?
3. Why should render be pure?
4. Why is state still old immediately after a setter?

</div>

</details>

</div>
