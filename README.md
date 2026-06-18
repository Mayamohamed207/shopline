# Shopline

A single-page React app that fetches, searches, and filters products from the [Fake Store API](https://fakestoreapi.com/products).

## Running it locally

```bash
npm install
npm run dev
```

The app starts on `http://localhost:5173` (Vite default). For a CRA-style setup, use `npm start` instead and it'll run on `http://localhost:3000`.

## Tools and libraries

- **React + TypeScript** — component structure and type safety for product data shapes.
- **Tailwind CSS** — utility-first styling, used directly in JSX rather than separate stylesheets.
- **Axios** — handles the API fetch in `useProducts`, mainly for cleaner error handling than raw `fetch`.
- **Lucide React** — icon set used across buttons, search, cart, and empty/error states.

## Architecture notes

- `components/shared/` holds `Button`, `Badge`, and `StarRating` — the primitives reused across `ProductCard`, `ProductModal`, `CartSidebar`, `CategoryFilter`, and `ErrorMessage`, so there's one place to change button styling instead of several.
- `hooks/useProducts.ts` owns the fetch, loading, and error state, keeping `App.tsx` focused on filtering/search logic and layout.
- `hooks/useCart.ts` owns all cart state and mutations (`addToCart`, `removeFromCart`, `increaseQty`, `decreaseQty`), so `App.tsx` and `CartSidebar` just consume cart logic instead of duplicating it.
- Search and category filtering both run through a single `useMemo` in `App.tsx`, so the filtered list only recomputes when `products`, `search`, `activeCategory`, or `sort` actually change — not on every render.

## Cart quantity controls

`CartSidebar` includes per-item quantity controls (`+` / `-`) backed by `increaseQty` and `decreaseQty` in `useCart.ts`:

- `increaseQty(id)` bumps that item's quantity by 1.
- `decreaseQty(id)` decrements it, then filters out any item whose quantity drops to 0 — so hitting `-` on the last unit removes it from the cart instead of leaving a "0" line item.

Both are wrapped in `useCallback`, consistent with the rest of the cart actions, so they don't get redefined on every render.

## Handling the optimization requirement

The brief asks for the filter logic to avoid re-rendering the entire list on every keystroke. Two things make that true here:

1. `ProductCard` is wrapped in `React.memo`, so a card only re-renders if its own props change — not just because its parent re-rendered.
2. `addToCart` and `removeFromCart` are wrapped in `useCallback` in `App.tsx`. Without this, those functions get redefined on every render, which would break `memo`'s comparison and silently re-render every card anyway — wrapping the callbacks is what makes the `memo` on `ProductCard` actually do something.

## Challenges faced

1- The main one was Making `React.memo` actually prevent re-renders rather than just being cosmetic. I had to trace the props passed into `ProductCard` and wrap the function handlers in `useCallback` so updates in the parent component wouldn't break the memoization.

2- The other was adapting the navigation header for mobile screens. I structured the flex layout so the logo and action icons stay in the top row, while the search bar drops down into its own full-width row below for a cleaner, more usable mobile interface.
