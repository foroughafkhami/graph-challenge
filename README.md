# GRAPH — Flight Ticket Dashboard

React flight-ticket dashboard for the GRAPH frontend assessment. Login + dashboard,
talking to a provided fake Express backend.

## Run

```bash
# 1. Backend (port 3001) — file is named `index`, no extension
cd resources/backend && npm install && node index

# 2. App
pnpm install
pnpm dev
```

Login with **admin / 123456**. The app calls the backend through a Vite dev proxy
(`/api/*` → `localhost:3001`), since the backend sends no CORS headers.

Scripts: `pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm preview`.

## Features

- **Login** — react-hook-form + zod; wrong password surfaces in a modal (no `alert`).
- **Auth** — token persisted in a cookie, attached as `Authorization: Bearer` to every
  request except `/login`. Dashboard is route-guarded; logout calls `/logout` and clears state.
- **User menu** — popover with username (`/username`) + logout.
- **Flight list** — paginated `useInfiniteQuery` (`/list`): 3 cards initially, "Load More"
  fetches 3 more, hidden once viewed ≥ total. Viewed/total counter at the top.
- **Ticket card** — animated open/close between closed (airline, time, destination, price)
  and open (duration, boarding, gate, seat, transfer) states.

## Structure

Feature-based (`@/` → `src/`):

- `lib/api-client.ts` — single fetch wrapper: base path, Bearer header, typed errors.
- `features/auth`, `features/flights` — each owns its `components`, `api`, `state`, `schema`.
- `app/` — providers, query client, route guards · `routes.tsx` — route table.
- `components/ui` — vendored shadcn primitives · `components/common` — shared app components.

## Libraries

| Library                       | What For                                                       | Why                                                                                                                                                                      |
| ----------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TanStack React Query          | server state / data fetching, infinite pagination              | Because it's the best Async state manager I've ever seen, always love to use it.                                                                                         |
| Jotai                         | client state (auth token via `atomWithStorage`, expanded card) | It's an overkill for this project, but I just wanted to showcase my state manager preference.                                                                            |
| react-hook-form + zod         | login form + validation, single source of truth for types      | I choose this setup whenever there are no Swagger files for apis. uncontrolled = fewer re-renders; zod schema drives both validation and inferred types.                 |
| shadcn/ui + Radix + Base UI   | vendored, owned UI primitives                                  | accessible, unstyled primitives I own and restyle to the design — no black-box library                                                                                   |
| Tailwind CSS + tw-animate-css | styling and animations                                         | not a huge fan of tailwind because of the messy code, but modern headless libraries all use tailwind + AI agents understand it way better than any other styling method. |
| axios                         | HTTP client under the api-client wrapper                       | interceptors centralize the Bearer header and 401 handling in one place. also goes well with Tanstack Query.                                                             |
| lucide-react                  | icons                                                          | lightweight, tree-shakeable icon set that fits the shadcn design.                                                                                                        |
