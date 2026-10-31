<div dir="rtl" align="right">

# <span dir="ltr">React</span> چطور یک ردیف را می‌شناسد؟ — <span dir="ltr">Reconciliation</span> و <span dir="ltr">Key</span>

[فهرست درس‌ها](../README.md) · [روش مطالعه](../ROADMAP.md)

**پیش‌نیاز:** [<span dir="ltr">Rendering</span>](./rendering.md) و [<span dir="ltr">State</span>](./state.md).

## مسئله: بعد از مرتب‌سازی، <span dir="ltr">input</span> ردیف اشتباهی مقدار دارد

<span dir="ltr">React</span> باید تشخیص دهد کدام <span dir="ltr">component</span> قبلی با کدام <span dir="ltr">component</span> جدید متناظر است تا <span dir="ltr">state</span> را حفظ کند. نوع <span dir="ltr">component</span>، جایگاه آن در درخت و <span dir="ltr">key</span> در این هویت نقش دارند. مقایسه ساختار قبلی و بعدی را معمولاً **<span dir="ltr">Reconciliation</span>** می‌نامیم.

<div dir="ltr" align="left">

~~~jsx
// الگوی مناسب برای لیست قابل تغییر:
users.map(user => <UserRow key={user.id} user={user} />);
~~~

</div>

اگر سارا از ردیف اول به دوم برود، <span dir="ltr">id</span> او ثابت است و <span dir="ltr">React</span> می‌تواند هویت ردیفش را دنبال کند.

<div dir="ltr" align="left">

~~~jsx
// در لیست دارای حذف و جابه‌جایی خطرناک است:
users.map((user, index) => <UserRow key={index} user={user} />);
~~~

</div>

با <span dir="ltr">key</span> برابر <span dir="ltr">index</span>، هویت بیشتر به جایگاه گره می‌خورد. اگر ردیف اول حذف شود، <span dir="ltr">state</span> محلی آن جایگاه ممکن است به کاربر دیگری وصل بماند.

## مثال دوم: <span dir="ltr">reset</span> عمدی فرم

<div dir="ltr" align="left">

~~~jsx
<ProfileForm key={selectedUserId} userId={selectedUserId} />
~~~

</div>

تغییر <span dir="ltr">key</span> می‌تواند هویت تازه‌ای بسازد و <span dir="ltr">state</span> فرم را <span dir="ltr">reset</span> کند. این گاهی دقیقاً رفتار مورد نیاز است.

<span dir="ltr">key</span> باید بین خواهر و برادرهای همان لیست یکتا و بین <span dir="ltr">render</span>ها برای همان موجودیت پایدار باشد. <span dir="ltr">`Math.random()`</span> در <span dir="ltr">render</span> هویت را مدام عوض می‌کند و ممکن است <span dir="ltr">input</span>، <span dir="ltr">focus</span> و <span dir="ltr">state</span> از دست بروند. <span dir="ltr">key</span> هم <span dir="ltr">props</span> عادی نیست؛ اگر فرزند <span dir="ltr">id</span> می‌خواهد، آن را جدا بده.

## پاسخ مصاحبه و تمرین

**چرا <span dir="ltr">index</span> همیشه غلط نیست؟** اگر لیست واقعاً ثابت باشد و حذف، درج، جابه‌جایی و <span dir="ltr">state</span> حساس ردیف نداشته باشد ممکن است مشکلی ایجاد نکند؛ <span dir="ltr">id</span> پایدار انتخاب عمومی روشن‌تری است.

برای سبد خرید با امکان حذف و مرتب‌سازی، <span dir="ltr">key</span> را <span dir="ltr">price</span> بگذاریم یا <span dir="ltr">productId</span>؟

<details>
<summary>پاسخ</summary>

شناسه پایدار ردیف. <span dir="ltr">price</span> هم تغییر می‌کند و هم ممکن است تکراری باشد. اگر یک محصول چند ردیف مستقل دارد، شناسه خود ردیف سبد مناسب‌تر از <span dir="ltr">productId</span> تنهاست.

</details>

---

<!-- ORIGINAL_REFERENCE -->
<details>
<summary>متن انگلیسی قبلی — مرجع تکمیلی و اختیاری</summary>

<div dir="ltr" align="left">

# Reconciliation, Identity & Keys

## Reconciliation

Reconciliation is React's process for comparing previous and next element trees and deciding what UI work is necessary.

## Component identity

React uses position, element type, and keys to decide whether state belongs to the same component identity or a new one.

Changing identity can reset state.

## Keys

```tsx
items.map(item => (
  <Row key={item.id} item={item} />
));
```

Good keys are stable, unique among siblings, and based on logical item identity.

## Why index keys can break behavior

Before insert:

```text
0 → A
1 → B
2 → C
```

After inserting X at the start:

```text
0 → X
1 → A
2 → B
3 → C
```

If index is the key, existing keys now refer to different logical items. That can produce incorrect local state, input values, focus, and animations.

## Keys can intentionally reset state

```tsx
<Chat key={userId} userId={userId} />
```

A changed key creates a new identity and resets local state.

## `React.memo`

```tsx
const Row = memo(function Row({ item }) {
  return <div>{item.name}</div>;
});
```

`memo` can skip rendering when props compare equal. New object/function references can defeat this optimization.

## Interview questions

1. What is reconciliation?
2. Why are keys important?
3. Why are index keys risky?
4. How can a key reset state?
5. What does `memo` actually skip?

</div>

</details>

</div>
