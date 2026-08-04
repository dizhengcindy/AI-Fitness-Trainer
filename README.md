# CodeFlex AI

Voice-first AI fitness trainer that builds personalized workout and diet programs from a short conversation.

Talk to an AI coach about your goals, experience, injuries, and dietary needs. Gemini turns that intake into a structured plan, which is saved to your profile and ready to follow.

## Features

- **Voice intake** — Real-time conversation with a Vapi AI assistant to collect fitness goals and constraints
- **Personalized plans** — Gemini generates workout schedules (sets/reps by day) and meal plans with calorie targets
- **User profiles** — View active and past plans after signing in with Clerk
- **Public program examples** — Landing page showcases sample user programs

## Stack

| Layer | Tech |
| --- | --- |
| Frontend | Next.js 15 (App Router), React 19, Tailwind CSS 4, shadcn/ui |
| Auth | Clerk (JWT + `user.created` webhook via Svix) |
| Backend / DB | Convex |
| Voice AI | Vapi |
| Plan generation | Google Gemini |

## Getting started

### Prerequisites

- Node.js 18+
- Accounts for [Clerk](https://clerk.com), [Convex](https://convex.dev), [Vapi](https://vapi.ai), and [Google AI Studio](https://aistudio.google.com) (Gemini)

### Install

```bash
npm install
```

### Environment variables

Create a `.env.local` in the project root:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=          # e.g. https://your-instance.clerk.accounts.dev
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Convex (filled in by `npx convex dev`)
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CONVEX_SITE_URL=

# Vapi
NEXT_PUBLIC_VAPI_API_KEY=
NEXT_PUBLIC_VAPI_ASSISTANT_ID=
```

Set these on the **Convex dashboard** (Environment Variables), not only in `.env.local`:

```bash
CLERK_JWT_ISSUER_DOMAIN=
CLERK_WEBHOOK_SECRET=
GEMINI_API_KEY=
```

### Clerk webhook

Point a Clerk webhook at your Convex HTTP endpoint:

```
https://<your-deployment>.convex.site/clerk-webhook
```

Subscribe to `user.created` so new sign-ups sync into the Convex `users` table.

### Run locally

Use two terminals:

```bash
npx convex dev       # sync backend, generate types, set Convex URL
npm run dev          # Next.js on http://localhost:3000
```

## How it works

1. User signs in with Clerk → webhook syncs them to Convex.
2. On `/generate-program`, the client starts a Vapi voice call with the configured assistant.
3. When the call ends, a Convex HTTP action uses Gemini to produce a workout + diet plan.
4. The plan is stored in Convex (`plans`) and shown on `/profile`. Creating a new plan deactivates previous ones.

## Project structure

```
src/
  app/                    # Routes: home, auth, generate-program, profile
  components/             # Navbar, Footer, profile UI, landing sections
  components/ui/          # shadcn primitives
  lib/                    # Vapi client, utils
  providers/              # Convex + Clerk provider
  middleware.ts           # Clerk middleware
convex/
  schema.ts               # users + plans tables
  users.ts                # User sync mutation
  plans.ts                # Create / list plans
  http.ts                 # Clerk webhook + Gemini plan generation
  auth.config.ts          # Clerk JWT validation for Convex
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npx convex dev` | Local Convex backend sync |
