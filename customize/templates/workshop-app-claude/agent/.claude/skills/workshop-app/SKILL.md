---
name: workshop-app
description: >-
  Build and maintain the WeAreDevelopers Berlin Docker Sandboxes workshop-app
  (Next.js 16). Use when editing UI, Server Actions, Supabase, or workshop copy.
---

# workshop-app

Next.js 16 App Router demo for the Docker Sandboxes workshop.

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
| Server Actions | `src/lib/actions/*.ts` (`"use server"`, async exports only) |
| Supabase | `src/lib/supabase/` — server client only |
| UI | Apple design system — `globals.css`, `src/components/ui/` |
| Layout | `PageShell`, `PageHero`, `CommandBlock`, `LabCard` |

## Rules

1. Add `"use client"` only for hooks and event handlers.
2. Never commit API keys — use host `.env.local` or `sbx secret set -g anthropic`.
3. Do not add new UI libraries; keep Apple tokens in `globals.css`.
4. Read `node_modules/next/dist/docs/` before unfamiliar Next.js 16 APIs.
5. Lab scripts live in parent `lab-*` folders — not in `workshop-app/`.

## Verification

- [ ] `npm run build` passes
- [ ] No secrets in the diff
- [ ] Workshop copy changes go to `workshop-data.ts`
