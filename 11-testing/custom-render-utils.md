<div dir="rtl" align="right">

# <span dir="ltr">Provider</span>های لازم را یک بار تعریف کنیم — <span dir="ltr">Custom Render</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">RTL</span>](./react-testing-library.md)، [<span dir="ltr">Context</span>](../03-react/context-and-state-management.md).

<span dir="ltr">component</span> واقعی ممکن است <span dir="ltr">theme</span>، <span dir="ltr">router</span> یا <span dir="ltr">QueryClient</span> بخواهد. <span dir="ltr">helper</span> تست باید این وابستگی‌ها را روشن و قابل تنظیم فراهم کند؛ نه اینکه پشت یک تابع مبهم تمام برنامه <span dir="ltr">production</span> را راه بیندازد.

## مثال اول: <span dir="ltr">provider</span> کوچک

<div dir="ltr" align="left">

~~~jsx
import { createContext } from 'react';
import { render } from '@testing-library/react';
const ThemeContext = createContext('light');
function renderThemed(ui, theme = 'light') {
  return render(
    <ThemeContext.Provider value={theme}>
      {ui}
    </ThemeContext.Provider>,
  );
}
~~~

</div>

در پروژه واقعی باید همان <span dir="ltr">ThemeContext</span> مصرف‌شده در <span dir="ltr">component</span> را <span dir="ltr">import</span> کنی؛ ساختن <span dir="ltr">context</span> دیگری با نام مشابه آن را تأمین نمی‌کند.

## مثال دوم: <span dir="ltr">helper</span> دارای <span dir="ltr">state</span> قابل تغییر

برای <span dir="ltr">QueryClient</span>، <span dir="ltr">store</span> و <span dir="ltr">history</span>، <span dir="ltr">instance</span> تازه در هر تست بساز. <span dir="ltr">config</span> ثابت می‌تواند مشترک باشد، ولی <span dir="ltr">cache</span> قابل تغییر نباید ناخواسته از تست قبلی برسد. اگر لازم است <span dir="ltr">route</span> یا <span dir="ltr">user</span> اولیه را تغییر دهی، ورودی <span dir="ltr">helper</span> را محدود و واضح نگه دار.

## پاسخ مصاحبه و تمرین

آیا <span dir="ltr">helper</span> هر تست باید همه <span dir="ltr">provider</span>های برنامه را داشته باشد؟

<details>
<summary>پاسخ</summary>

خیر. فقط <span dir="ltr">provider</span>های لازم برای قرارداد همان تست. تعداد زیاد وابستگی پنهان، خطا و <span dir="ltr">maintenance</span> را سخت می‌کند.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Custom Render Utilities

Real components often depend on providers: QueryClient, router, theme, authentication/context, feature flags, etc.

Create a test render helper that mirrors the providers actually needed without hiding too much magic.

```tsx
function renderApp(ui: React.ReactNode, options = {}) {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <AppProviders>{ui}</AppProviders>
    </QueryClientProvider>
  );
}
```

## Principles

- fresh mutable providers/cache per test
- accept route/initial state only when tests need it
- return the `user` instance when convenient
- keep the helper transparent enough that failures remain understandable
- do not use one enormous helper that silently boots your entire production platform

## Router testing

For React Router or TanStack Router, use an in-memory history/router and assert navigation through rendered behavior/URL state rather than mocking navigation functions by default.

</div>

</details>

</div>
