<div dir="rtl" align="right">

# پروژه را چطور تقسیم کنیم؟ — <span dir="ltr">Frontend Architecture</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** <span dir="ltr">React</span>، [<span dir="ltr">Server State</span>](../10-data-fetching/server-state.md) و [استراتژی تست](../11-testing/testing-strategy-and-pyramid.md).

معماری یعنی تصمیم درباره مرز مسئولیت‌ها و جهت وابستگی‌ها، نه صرفاً اسم پوشه‌ها. هدف این است که تغییر یک قابلیت مجبورمان نکند قسمت‌های نامرتبط را هم دست‌کاری کنیم.

## مثال اول: <span dir="ltr">feature</span> فروشگاه

<div dir="ltr" align="left">

~~~text
src/
  features/
    products/
      api.js
      queries.js
      ProductList.jsx
      ProductList.test.jsx
  shared/
    ui/Button.jsx
    http/client.js
~~~

</div>

<span dir="ltr">api</span> قرارداد شبکه، <span dir="ltr">queries lifecycle</span> داده و <span dir="ltr">ProductList</span> نمایش را مدیریت می‌کند. این تقسیم وقتی مفید است که مسئولیت واقعی روشن باشد؛ برای یک صفحه کوچک لازم نیست ده لایه واسطه بسازی.

## مثال دوم: اشتراک زودهنگام

دو فرم شبیه‌اند، ولی یکی ثبت محصول و دیگری ویرایش کاربر است. اگر فوراً یک <span dir="ltr">UniversalForm</span> با ده‌ها <span dir="ltr">flag</span> بسازی، تغییر یکی می‌تواند دیگری را بشکند. ابتدا بخش‌های واقعاً پایدار مثل <span dir="ltr">Input</span> و قواعد مشترک را جدا کن.

<span dir="ltr">state</span> را بر اساس مالکیت قرار بده؛ <span dir="ltr">HTTP</span> و جزئیات کتابخانه را تا جای لازم پشت مرز روشن نگه دار. هیچ ساختاری جای رعایت قراردادها، تست و مستندسازی تصمیم‌ها را نمی‌گیرد.

## پاسخ مصاحبه و تمرین

اگر تغییر <span dir="ltr">URL</span> یک <span dir="ltr">endpoint</span> نیازمند تغییر در پانزده <span dir="ltr">component</span> است، چه چیزی را بررسی می‌کنی؟

<details>
<summary>پاسخ</summary>

مرز دسترسی داده و تکرار قرارداد <span dir="ltr">API</span> را. یک تابع یا لایه مناسب می‌تواند جزئیات <span dir="ltr">endpoint</span> را متمرکز کند، بدون ساخت <span dir="ltr">abstraction</span> عمومی بی‌نیاز.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Frontend Architecture

## Architecture is dependency management

Good frontend architecture controls:

- responsibility boundaries
- dependency direction
- state ownership
- API boundaries
- testability
- change impact

## Layer-based structure

```text
components/
pages/
services/
hooks/
utils/
```

Simple, but a feature can become scattered across many folders as the app grows.

## Feature-based structure

```text
features/
  users/
    api/
    components/
    hooks/
    model/
  billing/
```

Improves feature cohesion when boundaries are meaningful.

## Shared layer

Good candidates:

- design-system primitives
- generic utilities
- infrastructure clients

A `shared/` folder becomes a landfill if everything vaguely reusable is dropped there.

## Clean Architecture ideas

Useful principles:

- business rules should not depend unnecessarily on UI/framework details
- stable domain/use-case abstractions should not depend on volatile infrastructure
- external systems should sit behind clear boundaries

Do not force enterprise onion diagrams onto a six-screen application.

## Thin vs thick client

A thick client performs more logic/rendering in the browser. A thin client delegates more work to the server. Modern apps often mix both per feature.

## Interview questions

1. Feature-based vs layer-based architecture?
2. What makes a good module boundary?
3. When is Clean Architecture overkill?
4. What belongs in shared?

</div>

</details>

</div>
