@AGENTS.md

# Claude Code — workshop-app

Read `AGENTS.md` first. This file adds Claude Code–specific workflow for the Docker Sandboxes workshop.

## Working directory

Always run commands from `workshop-app/` unless editing parent lab folders.

## Authentication

- **In sbx sandbox:** credentials via host proxy — `sbx secret set -g anthropic` before `sbx run claude workshop-app/`
- **OAuth:** use `/login` inside Claude Code if you have a Claude subscription
- Never write `ANTHROPIC_API_KEY` or Supabase service keys into source files

## Recommended workflow

```bash
# From repo root
sbx run --clone claude workshop-app/ --name feature/your-change

# Inside sandbox
npm run dev          # verify UI
npm run build        # must pass
npm run lint
```

Use git worktree branch mode so `main` is untouched until review.

## Before editing UI

1. Check Apple design patterns in `globals.css` and existing components in `src/components/ui/`
2. Reuse `PageShell`, `PageHero`, `CommandBlock`, `LabCard`
3. Workshop copy lives in `src/lib/workshop-data.ts`

## Before editing `/register`

1. Server Action: `src/lib/actions/workshop-signups.ts` (async exports only)
2. Types: `src/lib/actions/workshop-signups.types.ts`
3. Client form: `src/components/register-form.tsx` (`useActionState`)
4. Confirm migration applied: `supabase/migrations/001_workshop_signups.sql`

Use Supabase MCP to verify `workshop_signups` table exists before debugging insert errors.

## Verification checklist

- [ ] `npm run build` passes
- [ ] No `"use client"` added without reason
- [ ] No secrets in diff
- [ ] Apple design tokens preserved in `globals.css`
- [ ] New routes added to `SiteHeader` nav if user-facing

## Workshop talking points (when demoing)

- Server Component loads signups; Client Component only handles the form
- Server Action validates with Zod, inserts via Supabase, calls `revalidatePath`
- Same app runs on host or inside `sbx` microVM — isolated from attendee machines
