# Stack Kings — Outlet Intelligence Web App

**Live:** https://stackkings.inusha.me  
**Monorepo (pipeline + app):** https://github.com/inusha-thathsara/DataStorm-7.0---Stack-Kings

This repository is the **standalone Next.js deploy** (app source at repo root). For the full data pipeline, clone the monorepo and run `python src/run_round2_pipeline.py`.

## Setup (judges / demo)

**Production (Vercel):** `DATABASE_URL` points to Neon Postgres; no local `outlets.json` required.

**Local without Postgres:** generate `public/data/outlets.json` (~40 MB) from the monorepo:

```bash
python src/phase6_export_app_data.py   # from monorepo root
```

Then in **this repo**:

```bash
npm install
npm run build:clean
npm run start
```

Open http://localhost:3000

**Development:** `npm run dev:clean`

## Features

### Browse & filter
- Paginated table of 20,000 outlet predictions (default sort: **outlet ID ascending**)
- Sort by gap, predicted liters, or trade spend; URL-synced filters and **saved presets**
- Sri Lanka map (sampled pins; green = Western trade spend)
- Optimization summary banner (LKR 5M Western allocator)

### Outlet detail
- Ceilings, competition, POI decay, trade spend + incremental volume
- **Explain:** structured SWOT + business summary (Ollama → Gemini → template)
- SWOT **click-to-highlight** chart refs; copy link, export Markdown, print/PDF

### Compare two outlets
- Table checkboxes → **Compare outlets**, or `/compare?a=&b=`
- Side-by-side charts; **searchable outlet pickers** to swap either side (IDs only)

### Data plane
- **Production:** Neon Postgres via `/api/outlets/*` (see `lib/db/schema.sql`)
- **Local fallback:** `public/data/outlets.json` when `DATABASE_URL` is unset

## Hybrid XAI

Copy `.env.example` to `.env.local`. Default model: `gemma3:1b` (Ollama). Production uses **Gemini** on Vercel when `GEMINI_API_KEY` is set.

```bash
npm test    # explainSchema unit tests
```

See monorepo [`app/README.md`](https://github.com/inusha-thathsara/DataStorm-7.0---Stack-Kings/blob/master/app/README.md) for full Ollama GPU setup and troubleshooting.
