# GRAPH — Flight Ticket Dashboard (Frontend Assessment)

Agent rules for this repository. These OVERRIDE generic defaults. Read fully before writing code.

## What this is

A take-home **frontend recruitment assessment** for GRAPH (graph-inc.ir), v1.1, June 2023.
The deliverable is a React flight-ticket dashboard talking to a provided fake backend.
It is graded on **code quality, problem-solving, React proficiency, and production-grade UI** —
not on backend work. The backend is fixed; do not treat its quirks as bugs to fix, work with them.

## Golden rules (graded, non-negotiable)

1. **shadcn/ui for all UI elements.** Every interactive UI component must be built with shadcn/ui
   (`src/components/ui/`). Do NOT use black-box component libraries, admin templates, or "panel"
   starters (no MUI, Ant, Chakra, Bootstrap). shadcn components are _vendored into this repo_ — you
   own and customize the code. Treat shadcn output as a starting point: restyle it to match the
   design, don't ship it stock. Headless/animation utilities are fine if disclosed.
2. **No `alert()`.** Auth/API errors must surface through a custom modal/popup component.
3. **Match the design assets.** Implement layout, states, and animations to match the files in
   `resources/attach/` (see Design assets). Do not invent a different look.
4. **Disclose every external library** you add, in `README.md`, with a one-line reason.
5. **Professional standard.** Treat it as production: typed, accessible, responsive, no dead code,
   no console spam, no leftover scaffolding. The current `src/App.tsx` is Vite boilerplate — replace it.

## Stack (already set up — do not swap without reason)

- React **19** + TypeScript (strict-ish: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`).
- **Vite 8** dev/build. Package manager is **pnpm** (`pnpm-lock.yaml` present — use pnpm, not npm).
- ESLint flat config (`eslint.config.js`) · **Prettier** for code formatting.
- **UI:** shadcn/ui (vendored) · **Styling:** Tailwind CSS · **Server state / data fetching:**
  TanStack React Query · **Client state:** Jotai · **Routing:** React Router v7 ·
  **Forms:** react-hook-form + zod · **Tests:** Vitest + React Testing Library.

Scripts: `pnpm dev` · `pnpm build` (runs `tsc -b` then vite) · `pnpm lint` · `pnpm format` · `pnpm preview`.
A change isn't done until `pnpm build`, `pnpm lint`, and `pnpm format:check` are all clean.

## Required features

**Two pages**, client-side routed:

- **Login page** — authenticate; on failure show error in a modal (not `alert`); on success redirect
  to the dashboard. Implement the animations shown in the design.
- **Dashboard** — flight list + user menu.

**Auth**

- Persist the token across reloads (e.g. storage) and attach it as `Authorization: Bearer {TOKEN}` to
  every request except `/login`.
- **Logout** calls `/logout`, clears the token/session, and returns to the login page.
- Protect the dashboard route: no valid token ⇒ redirect to login.

**User menu** — a popover showing the username from `/username` and a Logout button.

**Flight list**

- Paginated via `/list?page=&size=`. Show **3 cards initially**; a **"Load More"** button fetches
  **3 more per click**.
- Hide "Load More" once `viewed >= total` (list exhausted).
- Show a **viewed / total** counter at the top of the list.

**Ticket card — two states**, with smooth open/close transitions:

- **Closed:** airline, time, destination, price.
- **Open:** flight time, duration, boarding time, gate, seat, transfer info.

## Backend — `resources/backend/`

Fake Express server. Setup: `cd resources/backend && npm install`, then `node index.js`.
Runs on **port 3001**. All endpoints return JSON with a `result` field.

> ⚠️ The server file is named `index` (no `.js` extension). Rename/copy to `index.js` before
> running, or run `node index`.

Credentials: **admin / 123456**.

| Method | Path        | Auth | Notes                                                                                                                                            |
| ------ | ----------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/login`    | no   | Body is **`application/x-www-form-urlencoded`** (`username`, `password`). Returns `{ token, result: "success" }`, or `{ result: "wrong_pass" }`. |
| POST   | `/logout`   | yes  | Invalidates token. 401 `{result:"unauthorized"}` if bad.                                                                                         |
| GET    | `/username` | yes  | `{ username:"admin", result:"success" }`.                                                                                                        |
| GET    | `/list`     | yes  | Query `page` (**1-indexed**) & `size`. Returns `{ total, result: [flight...] }`.                                                                 |

**Backend quirks you must design around (do not "fix" the backend):**

- **No CORS headers.** A browser app on the Vite dev origin will be blocked. Add a **Vite dev proxy**
  in `vite.config.ts` (e.g. proxy `/api` → `http://localhost:3001`) and call same-origin paths.
- **Single global token.** Only one session exists server-side; a new login or any logout invalidates
  the previous token. Logging in elsewhere will 401 existing requests.
- `/list` does no bounds checking; with `total: 10` and the seeded array, an over-page returns `[]` —
  use that (or the `total`) to stop "Load More".
- Login body MUST be form-urlencoded; sending JSON will not authenticate.

### Flight object shape

```ts
type Place = { country: string; iso3: string; time: string /* ISO */; airline: string };
type Flight = {
  logoSrc: string;
  logoStyle: { height: string; margin: string };
  src: Place; // origin
  dst: Place; // destination
  boarding: string; // seconds, as a string
  transfer: boolean;
  gates: number;
  seat: string;
  price: string;
  class: 'economy' | 'business';
};
```

## Design assets — `resources/attach/`

- `status-1.PNG`, `status-2.PNG` — closed vs. open card states. Match these.
- `action.mp4` — reference for the open/close and page animations. Match the motion.
- `airplane.png` — card artwork.

Read these before building the card and login UI. Animations are explicitly graded.

## Working agreements

- Keep components small, typed, and self-built. Reasonable folder structure (`src/components`,
  `src/pages`, `src/api`, etc.). Centralize the fetch/auth layer so the `Bearer` header and base
  path live in one place.
- Don't add dependencies casually; each one must be justified and disclosed in `README.md`.
- Replace the boilerplate `README.md` with real project docs (run steps, libraries, decisions).
- Verify before claiming done: app runs (`pnpm dev` + backend on 3001), login→dashboard→load-more→
  open card→logout all work, `pnpm build` and `pnpm lint` pass.

---

# General React + TypeScript conventions

Apply these across the whole codebase. They encode the chosen stack
(shadcn · Tailwind · React Query · Jotai · React Router · react-hook-form/zod · Vitest/RTL).

## Project structure (feature-based)

Group by feature, not by file type. Each feature owns its UI, data, and state.

```
src/
  app/                 # app shell: router, providers (QueryClient, Jotai), root layout
  components/
    ui/                # shadcn primitives (vendored — owned, customizable)
    common/            # shared app-level components (Modal wrapper, Spinner, etc.)
  features/
    auth/
      components/      # LoginForm, UserMenu, ...
      api/             # useLogin, useLogout, useUsername (React Query hooks + fetchers)
      state/           # jotai atoms (token, isAuthenticated)
      schema.ts        # zod schemas + inferred types
    flights/
      components/      # FlightCard, FlightList, LoadMoreButton, ...
      api/             # useFlights (paginated query)
      types.ts
  lib/
    api-client.ts      # single fetch wrapper: base path, Bearer header, error normalization
    utils.ts           # cn() and small pure helpers
  hooks/               # cross-feature reusable hooks
  routes.tsx           # route table + guards
  main.tsx
```

- Co-locate tests next to source: `Foo.tsx` ↔ `Foo.test.tsx`.
- A feature never imports another feature's internals — share via `components/`, `hooks/`, or `lib/`.
- Use the `@/` path alias for `src/` (configure in `vite.config.ts` + `tsconfig`).

## TypeScript

- No `any`. Use `unknown` + narrowing at boundaries. Prefer `type` aliases; `interface` only for
  extendable public shapes. Derive types from zod with `z.infer`, don't hand-duplicate them.
- Functional components typed as `function Comp(props: Props)` — avoid `React.FC`.
- Make impossible states unrepresentable (discriminated unions over boolean soup).
- Keep `strict`-equivalent hygiene: no unused locals/params (the tsconfig already enforces this).

## React patterns

- Small, single-responsibility components; lift shared logic into custom hooks (`useX`).
- Rules of Hooks always; complete, honest dependency arrays (don't silence the linter).
- Keys must be stable IDs, never array index for dynamic lists.
- Don't `useEffect` for derived data (compute in render) or for fetching (use React Query).
- Memoize only with a measured reason; clarity first.
- Prefer composition (`children`/slots) over prop-drilling or boolean flag explosions.

## Styling — Tailwind + shadcn

- Tailwind utilities are the default; reach for a CSS file only for things utilities can't express.
- Merge classes with the `cn()` helper (`clsx` + `tailwind-merge`); use `cva` for component variants.
- No magic numbers/colors — drive spacing, colors, radius from the Tailwind theme tokens. Define the
  design's palette/typography in the theme so it matches `resources/attach/` assets.
- shadcn components live in `components/ui/` and are **yours**: restyle them to the design, don't treat
  them as an untouchable dependency. Add components via the shadcn CLI, then adapt.
- Build mobile-first and responsive; ensure focus states, keyboard nav, and `aria-*` are intact.

## Data fetching — TanStack React Query

- All server interaction goes through React Query hooks; components never call `fetch` directly.
- One `QueryClient` at the app root with sane defaults (retry, `staleTime`, no refetch storms).
- **Query keys** are structured and centralized per feature, e.g. `['flights', { page, size }]`.
- The list uses pagination — prefer `useInfiniteQuery` for "Load More" (append pages; stop when
  `viewed >= total`). Mutations (`login`/`logout`) use `useMutation` and invalidate/clear caches.
- All fetchers funnel through `lib/api-client.ts`, which attaches `Authorization: Bearer {token}`,
  hits the proxied base path, and throws a typed error on non-2xx so `isError`/`error` work.
- Render real `isLoading` / `isError` / `isSuccess` states — skeletons/spinners, not blank screens.

## Client state — Jotai

- Jotai is for **client/UI state only** (auth token, modal open, which card is expanded). Server data
  stays in React Query — do not mirror fetched data into atoms.
- Keep atoms small and colocated in the owning feature's `state/`. Use `atomWithStorage` to persist
  the auth token across reloads. Derive, don't duplicate (derived atoms over synced copies).
- Read auth state from a derived atom (`isAuthenticated`) rather than scattering token checks.

## Routing — React Router v7

- Centralize routes; wrap the dashboard in a `<ProtectedRoute>` that redirects to `/login` when
  unauthenticated. Send authenticated users away from `/login`.
- Successful login navigates to the dashboard; logout navigates back to `/login` after clearing state.
- Use real URLs (`/login`, `/`) so back/forward and refresh behave.

## Forms — react-hook-form + zod

- Every form is RHF with a `zodResolver`; the zod schema is the single source of truth for shape,
  validation, and the inferred TS type. Show inline field errors (never `alert`).
- Surface server/auth failures (e.g. wrong password) in the shared modal, with disabled/`isSubmitting`
  button states during the request.

## Testing — Vitest + React Testing Library

- Cover the graded flows: login success→redirect, login failure→modal, "Load More" pagination +
  counter, card open/close, logout→redirect. Test behavior via the DOM, not implementation details.
- Query by role/label/text (accessible queries); use `userEvent` for interactions.
- Mock the network at the boundary (MSW or a mocked api-client). Each test runs against a fresh
  `QueryClient`. No reliance on a live backend in tests.

## Naming & quality

- `PascalCase` components/types, `camelCase` vars/functions, `useX` hooks, `SCREAMING_SNAKE` consts.
- Files: components `PascalCase.tsx`; hooks/utils `camelCase.ts`. One main export per component file.
- No dead code, commented-out blocks, or `console.log` in committed work. Comment the _why_, not the _what_.
- Every added dependency is intentional and disclosed in `README.md`.
