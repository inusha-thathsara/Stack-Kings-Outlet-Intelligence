# Stack Kings — Outlet Intelligence Web App

Next.js app for browsing 20,000 FMCG outlet predictions. **App-only repo** for Vercel deploy.

**Full monorepo (Python pipeline + local Ollama):** [DataStorm-7.0---Stack-Kings](https://github.com/inusha-thathsara/DataStorm-7.0---Stack-Kings)

**Live demo:** https://stackkings.inusha.me

## Deploy on Vercel

1. Import this repo; root directory **`.`**; framework **Next.js**.
2. Set environment variables (see `.env.example`):
   - `DATABASE_URL` — Neon Postgres connection string
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
   - `AUTH_BYPASS=false`
   - `GEMINI_API_KEY`, optional `GEMINI_MODEL=gemini-2.5-flash`
   - `NEXT_PUBLIC_OLLAMA_ENABLED=false` (cloud deploy)
   - Optional map: `OVERPASS_API_URL`, `NEXT_PUBLIC_MAP_POI_OVERLAY=off`
3. Deploy.

Without `DATABASE_URL`, the app falls back to `public/data/outlets.json` if present locally.

## Local development

```bash
npm install
cp .env.example .env.local   # fill DATABASE_URL, Clerk keys, etc.
npm run dev
```

Open http://localhost:3000

## Features

- Postgres-backed paginated outlet APIs (or JSON fallback)
- Clerk auth with RBAC (national / western / distributor roles via Clerk public metadata)
- OpenStreetMap + outlet markers; optional Overpass POI overlay
- Hybrid XAI: Ollama (local) or Gemini (Vercel) with template fallback

## Pitch deck

See `StackKings_PitchDeck.pdf` in this repo.
