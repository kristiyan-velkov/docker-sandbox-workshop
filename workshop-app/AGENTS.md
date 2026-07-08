# workshop-app — Agent Rules

Next.js **playground** for sbx labs 4–6. Labs, auth, and progress live on the [hosted platform](https://nextjs-26f1-3000.prg1.zerops.app) (`docker-sandbox-platform`).

## Mission

Maintain the sandbox playground: Apple-styled UI, quick start, isolation overview. Link outward to the platform — do not add Supabase or auth here.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router |
| UI | Apple design system — tokens in `globals.css`, shadcn in `src/components/ui/` |
| Styling | Tailwind v4 |

## Directory map

```
src/app/              Routes (Server Components by default)
src/components/       Shared UI — page-shell, site-header, home-hero
src/lib/workshop-data.ts   Static workshop copy & lab commands (platform sync)
src/lib/site-config.ts     Platform URL default
```

## Commands (run from `workshop-app/`)

```bash
npm run dev      # http://localhost:3000
npm run build    # must pass before PR
npm run lint
```

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Playground landing |
| `/about` | Workshop context |
| `/labs`, `/login`, `/register`, … | Redirect to platform |

## Next.js rules

1. **Default to Server Components** — add `"use client"` only for hooks/events.
2. **Content edits** → `src/lib/workshop-data.ts`.
3. **No secrets** in committed files. Optional `NEXT_PUBLIC_PLATFORM_URL` in `.env.local`.
4. Read `node_modules/next/dist/docs/` before using unfamiliar Next.js 16 APIs.

## sbx (labs 4–6)

```bash
# Lab 5 — from workshop-app/
sbx run cursor . --kit ../customize/kit/workshop-app-nextjs --name lab5-kit

# Lab 4 clone — from monorepo root
sbx run --clone cursor . --name lab4-clone
```

Validate with `sbx exec <name> -- curl http://127.0.0.1:3000` after kit bootstrap.

## MCP (repo root `../.cursor/mcp.json`)

| Server | Use for |
|--------|---------|
| chrome-devtools | Verify pages in browser / forwarded sbx port |
