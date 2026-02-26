# vendor-product-mini

A Next.js + TypeScript vendor product management mini-app with TradeZ login UI.

## Tech Stack

- **Next.js** v16 (App Router)
- **TypeScript** v5.2
- **MUI / Material UI** v6.4
- **Redux Toolkit** v2.0
- **Notistack** v3.0 (toast notifications)
- **Emotion** (CSS-in-JS)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/login`.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Providers
│   ├── page.tsx                # Redirects to /login
│   └── login/
│       └── page.tsx            # TradeZ Login Page
├── components/
│   └── providers/
│       └── Providers.tsx       # MUI Theme + Redux + Notistack
├── store/
│   ├── store.ts                # Redux store
│   └── slices/
│       └── authSlice.ts        # Auth state management
└── theme/
    └── theme.ts                # MUI custom theme
```

## Connecting to a Real API

In `src/app/login/page.tsx`, replace the simulated login with your API call:

```ts
const res = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password }),
});
if (!res.ok) throw new Error("Login failed");
const data = await res.json();
dispatch(loginSuccess({ username: data.username }));
```
