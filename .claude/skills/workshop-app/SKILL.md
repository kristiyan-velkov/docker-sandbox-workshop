---
name: workshop-app
description: >-
  Build and maintain the Docker Sandboxes workshop-app
  (Next.js 16). Use when editing UI, routes, or workshop copy in the sbx workspace.
---

# workshop-app

Next.js 16 App Router demo for the Docker Sandboxes workshop.

**Auth and Supabase** live on **docker-sandbox-platform** (host), not in this app. Use `redirectToPlatform()` / `platformUrl()` from `src/lib/platform.ts`.

## Commands (run from workspace root)

```bash
npm run dev
npm run build    # must pass before finishing
npm run lint
```

## Architecture

| Area | Location |
|------|----------|
| Routes | `src/app/` — Server Components by default |
| Workshop copy | `src/lib/workshop-data.ts` |
| Platform links | `src/lib/platform.ts`, `src/lib/site-config.ts` |
| UI | Apple design system — `globals.css`, `src/components/ui/` |
| Layout | `PageShell`, `PageHero`, `CommandBlock`, `LabCard` |

## Rules

1. Add `"use client"` only for hooks and event handlers.
2. Never commit API keys — use host `.env.local` or `sbx secret set -g anthropic`.
3. Do not add Supabase or auth server actions here — link to the platform.
4. Do not add new UI libraries; keep Apple tokens in `globals.css`.
5. Read `node_modules/next/dist/docs/` before unfamiliar Next.js 16 APIs.
6. Lab scripts live in parent `lab-*` folders — not in `workshop-app/`.

## Key routes (this app)

- `/` — landing and agenda
- `/labs`, `/labs/[slug]` — lab content
- `/learn`, `/about` — workshop pages

Register, login, profile, questions → platform (https://nextjs-26f1-3000.prg1.zerops.app).

## Verification

- [ ] `npm run build` passes
- [ ] No secrets in the diff
- [ ] Workshop copy changes go to `workshop-data.ts`
