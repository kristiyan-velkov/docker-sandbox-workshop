---
name: workshop-app
description: >-
  Build and maintain the Docker Sandboxes workshop-app (Next.js 16 demo).
  Use when editing UI, workshop copy, or layout. Auth and labs gating live on
  docker-sandbox-platform — not in this repo.
---

# workshop-app

Next.js 16 App Router **demo site** for the Docker Sandboxes workshop. This repo does **not** include Supabase or attendee auth — `/register` and `/login` link to **docker-sandbox-platform** (set `NEXT_PUBLIC_PLATFORM_URL` in `.env.local`).

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
| UI | Apple design system — `globals.css`, `src/components/ui/` |
| Layout | `PageShell`, `PageHero`, `CommandBlock`, `LabCard` |
| Platform (auth, progress) | Separate repo — docker-sandbox-platform |

## Rules

1. Add `"use client"` only for hooks and event handlers.
2. Never commit API keys — use `sbx secret set -g cursor` on the host for the agent.
3. Do not add new UI libraries; keep Apple tokens in `globals.css`.
4. Read `node_modules/next/dist/docs/` before unfamiliar Next.js 16 APIs.
5. Lab scripts live in parent `lab-*` folders — not in `workshop-app/`.
6. Do not add Supabase, Server Actions, or register flows here — link to the platform URL instead.

## Key routes

- `/` — landing and agenda
- `/labs` — lab overview (links to platform when deployed)
- `/learn` — YOLO, security, commands
- `/about` — author and conference info

## Verification

- [ ] `npm run build` passes
- [ ] No secrets in the diff
- [ ] Workshop copy changes go to `workshop-data.ts`
