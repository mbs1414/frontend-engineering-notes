<div dir="rtl" align="right">

# محیط تمرین تست — از نصب تا اولین تست

[فهرست](../README.md) · [<span dir="ltr">Vitest</span>](./vitest.md) · [<span dir="ltr">React Testing Library</span>](./react-testing-library.md)

این مخزن مجموعه یادداشت است؛ برنامه <span dir="ltr">React</span> و <span dir="ltr">backend</span> آماده ندارد. دستورهای این راهنما برای یک **پوشه تمرینی جدا** هستند. نصب <span dir="ltr">Node.js</span> و <span dir="ltr">npm</span> سازگار با نسخه ابزارها پیش‌نیاز است.

## ۱. ساخت پروژه

<div dir="ltr" align="left">

~~~sh
npm create vite@latest frontend-practice -- --template react
cd frontend-practice
npm install
npm install -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
~~~

</div>

برای مثال‌های ساده <span dir="ltr">JavaScript</span> نیازی به این ابزارها نیست؛ <span dir="ltr">Console</span> مرورگر کافی است.

## ۲. تنظیم محیط <span dir="ltr">DOM</span>

فایل <span dir="ltr">vite.config.js</span> پروژه تمرینی:

<div dir="ltr" align="left">

~~~js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
  },
});
~~~

</div>

<span dir="ltr">jsdom</span> بخشی از <span dir="ltr">DOM</span> را شبیه‌سازی می‌کند؛ موتور واقعی <span dir="ltr">layout</span> و نمایش مرورگر نیست. برای بررسی واقعی <span dir="ltr">CSS</span> و رفتار <span dir="ltr">platform</span>، تست مرورگر لازم می‌شود.

فایل <span dir="ltr">src/test/setup.js</span>:

<div dir="ltr" align="left">

~~~js
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
afterEach(() => { cleanup(); });
~~~

</div>

<span dir="ltr">jest-dom matcher</span>هایی مانند <span dir="ltr">toBeInTheDocument</span> را اضافه می‌کند. <span dir="ltr">cleanup</span> درخت <span dir="ltr">render</span>شده تست قبلی را برمی‌دارد. <span dir="ltr">API</span>های <span dir="ltr">Vitest</span> را صریح <span dir="ltr">import</span> می‌کنیم و <span dir="ltr">globals</span> فعال نیست.

## ۳. اولین تست

فایل <span dir="ltr">src/Counter.test.jsx</span>:

<div dir="ltr" align="left">

~~~jsx
import { useState } from 'react';
import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>
    Count: {count}
  </button>;
}
it('increments after a click', async () => {
  const user = userEvent.setup();
  render(<Counter />);
  await user.click(screen.getByRole('button', { name: 'Count: 0' }));
  expect(screen.getByRole('button', { name: 'Count: 1' })).toBeInTheDocument();
});
~~~

</div>

اجرا:

<div dir="ltr" align="left">

~~~sh
npx vitest run
~~~

</div>

انتظار داریم پاس شود. <span dir="ltr">updater</span> را طوری تغییر بده که مقدار ثابت بماند؛ حالا تست باید شکست بخورد. این نشان می‌دهد <span dir="ltr">assertion</span> تغییر مورد نظر را می‌سنجد.

## ۴. ابزارهای بیشتر، هنگام نیاز

برای <span dir="ltr">Query</span>، بسته @<span dir="ltr">tanstack/react-query</span> و <span dir="ltr">Provider</span> لازم است. برای <span dir="ltr">MSW</span>، بسته <span dir="ltr">msw</span> و <span dir="ltr">lifecycle</span> سرور تست را طبق [درس <span dir="ltr">MSW</span>](./msw.md) اضافه کن. <span dir="ltr">Playwright</span> و مرورگرهایش مسیر جداگانه‌ای از <span dir="ltr">jsdom</span> دارند.

قطعه‌هایی که در درس‌ها «الگو» نام دارند و <span dir="ltr">component</span>هایی مثل <span dir="ltr">RegistrationForm</span> را فرض می‌کنند، فایل مستقل آماده اجرا نیستند. نام و قراردادشان را با پروژه واقعی جایگزین کن.

| نشانه خطا | چیزی که بررسی می‌کنی |
| --- | --- |
| <span dir="ltr">document is not defined</span> | <span dir="ltr">environment</span> برابر <span dir="ltr">jsdom</span> است؟ |
| <span dir="ltr">toBeInTheDocument</span> شناخته نمی‌شود | <span dir="ltr">setupFiles</span> و <span dir="ltr">import jest-dom</span> درست است؟ |
| <span dir="ltr">JSX parse error</span> | پسوند <span dir="ltr">jsx</span> و <span dir="ltr">plugin React</span> تنظیم است؟ |
| نتیجه <span dir="ltr">fetch</span> پیدا نمی‌شود | <span dir="ltr">await</span> و پاسخ <span dir="ltr">API</span> کنترل‌شده درست‌اند؟ |
| فقط گروهی شکست می‌خورد | <span dir="ltr">cache</span>، <span dir="ltr">timer</span>، <span dir="ltr">mock</span> یا <span dir="ltr">DOM</span> باقی مانده است؟ |

منابع: [<span dir="ltr">Vitest</span>](https://vitest.dev/guide/)، [<span dir="ltr">RTL Setup</span>](https://testing-library.com/docs/react-testing-library/setup/)، [<span dir="ltr">Vite</span>](https://vite.dev/guide/).

</div>
