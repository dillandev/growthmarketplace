# widgets/

Small reusable pieces used across many screens. They keep your UI consistent and prevent repeating code.

- `AppMessage.jsx` — shows error/info/success messages (used on forms, pages, modals).
- `DiamondsRow.jsx` — displays rating visually using diamonds (used in reviews + profile feedback).
- `NavigationBar.jsx` — top bar container that holds profile menu + notifications.
- `NotificationBell.jsx` — clickable bell/button that opens the notifications modal.
- `NotificationModal.jsx` — popup that shows all notifications and lets user mark them as read.
- `ProfileMenu.jsx` — dropdown menu for profile actions (mainly logout).
- `SimpleField.jsx` — reusable label + value block (used in profile details).
- `SimpleSection.jsx` — wraps sections with a title + divider (used across pages).
- `StatusText.jsx` — displays status like `pending`, `accepted`, `declined` in a consistent way.
- `TipModal.jsx` — popup showing sharer PayPal email and confirming tip action.

## Why this folder exists

- Avoid repeating UI patterns
- Keep pages/components cleaner
- Centralize shared behavior (like notifications, messages, status)
- Makes updates easier (change once → affects everywhere)

## Where they are used

- Dashboard → `NavigationBar`, `NotificationBell`
- Profile → `SimpleField`, `DiamondsRow`, `TipModal`
- Clientele → `StatusText`
- Review → `DiamondsRow`
- All pages → `AppMessage`, `SimpleSection`