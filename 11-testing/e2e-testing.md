<div dir="rtl" align="right">

# مسیر کامل کاربر را در مرورگر بسنجیم — <span dir="ltr">Playwright</span> و <span dir="ltr">E2E</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [استراتژی تست](./testing-strategy-and-pyramid.md). برنامه باید در آدرس مشخص در حال اجرا و داده تست کنترل‌شده باشد.

<span dir="ltr">E2E</span> می‌تواند مسیری مثل ورود، انتخاب محصول و ثبت سفارش را از بیرون بررسی کند. چون بخش‌های بیشتری درگیرند، داده و محیط ناپایدار می‌توانند تست را <span dir="ltr">flaky</span> کنند.

## مثال اول: جست‌وجو

<div dir="ltr" align="left">

~~~js
import { test, expect } from '@playwright/test';
test('searches products', async ({ page }) => {
  await page.goto('http://localhost:5173/products');
  await page.getByRole('searchbox', { name: 'جست‌وجو' }).fill('Book');
  await page.getByRole('button', { name: 'جست‌وجو' }).click();
  await expect(page.getByRole('heading', { name: 'Book' })).toBeVisible();
});
~~~

</div>

این قرارداد فرضی برنامه است. آدرس، نام کنترل‌ها و <span dir="ltr">fixture</span> داده باید با پروژه واقعی هماهنگ شوند. <span dir="ltr">locator</span> و <span dir="ltr">assertion</span>های <span dir="ltr">Playwright</span> انتظارهای خودکار دارند؛ <span dir="ltr">waitForTimeout</span> ثابت معمولاً انتخاب مناسبی نیست.

## مثال دوم: دو کاربر یا دو تست

هر تست باید هویت و داده مشخص خودش را داشته باشد. اگر یکی محصول مشترک را حذف کند، تست دیگری ممکن است بی‌دلیل شکست بخورد. جداسازی <span dir="ltr">context</span> مرورگر، به‌تنهایی داده <span dir="ltr">backend</span> را جدا نمی‌کند.

## پاسخ مصاحبه و تمرین

آیا همه خطاهای تابع محاسبه تخفیف را با <span dir="ltr">E2E</span> بررسی کنیم؟

<details>
<summary>پاسخ</summary>

معمولاً در <span dir="ltr">unit test</span> سریع‌تر و دقیق‌ترند. <span dir="ltr">E2E</span> را برای مسیرهای مهمی نگه دار که اتصال بخش‌ها و رفتار واقعی مرورگر ارزش دارد.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# End-to-End Testing with Playwright

E2E tests exercise the application in a real browser and are best reserved for high-value cross-system flows.

## Good candidates

- authentication/login/logout
- critical create/edit/delete workflow
- routing and permissions
- checkout/payment initiation
- file upload/download flows
- browser behavior that JSDOM cannot model reliably

## Playwright concepts to know

- locators, especially role-based locators
- auto-waiting
- browser contexts
- fixtures
- network interception when appropriate
- screenshots/traces on failure
- parallelism
- projects/browsers

## Avoid duplicate coverage

Do not recreate every component test as E2E. Use E2E for risks that require the browser/system boundary.

## Flakiness rules

Avoid fixed sleeps. Wait for a real UI/network condition. Keep tests isolated and make test data creation deterministic.

</div>

</details>

</div>
