# CodeFlex AI

AI fitness trainer that helps users generate personalized workout and diet programs.

## Stack

- **Next.js 15** — App Router frontend
- **Convex** — database and backend functions
- **Clerk** — authentication (webhooks via Svix)
- **shadcn/ui** — reusable UI components
- **Vapi** — AI voice conversation
- **Tailwind CSS** — styling

## Getting started

```bash
npm install
```

Copy env vars into `.env.local` (Clerk, Convex, Vapi). Then run both:

```bash
npm run dev          # Next.js on http://localhost:3000
npx convex dev       # sync Convex backend + generate types
```

## Project structure (current)

```
src/app/                 # pages (home, auth, generate-program, profile)
src/components/          # UI + layout (Navbar, Footer, UserPrograms, …)
src/components/ui/       # shadcn components
convex/                  # schema, users sync, Clerk webhook
```

## Notes

- Clerk `user.created` webhooks hit `convex/http.ts` and sync users into Convex.
- shadcn aliases are configured in `components.json` (`@/components`, `@/lib/utils`, etc.).
