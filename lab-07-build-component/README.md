# Lab 7 — Build a New Component

**Time:** ~20 min  
**Workspace:** [`workshop-app/`](../workshop-app/) · **mode:** `--clone` + workshop kit

**Goal:** Let the agent add a real UI component to the Next.js demo in an isolated Git branch; you review and merge from the host.

→ **[GUIDE.md](./GUIDE.md)** — step-by-step commands

---

## Why this lab matters

Labs 4–6 covered clone mode, the full stack, and customization layers. **Lab 7 is hands-on agent development** — the kind of task you would run in the live demo: ask Cursor to build UI inside the sandbox, with your host checkout protected by clone mode and the kit handling `npm ci` + dev server.

You will enforce the project **build gate** (`npm run lint`, `npm run build`) before accepting agent output — conventions from the workshop skill in the workspace.

---

## Why clone + kit together

| Piece | Role in this lab |
|-------|------------------|
| `--clone` | Agent commits on `feat/lab-7-stats-card` without touching host `main` |
| `--kit …/workshop-app-nextjs` | Dependencies installed, dev server on `:3000`, network for npm/Supabase |
| Apple design tokens | Agent must use existing `globals.css` — no new UI libraries |

---

## Prerequisites

- Labs 4–5 complete (clone mode + kit on `workshop-app/`)
- `workshop-app/.env.local` on the host before launch

---

## What you'll do

1. Start `sbx run --clone cursor workshop-app/ --kit … --name feature-component`
2. Prompt the agent to add a `WorkshopStats` component and render it on the home page
3. Verify `npm run lint` and `npm run build` inside the sandbox
4. `git fetch sandbox-feature-component` and review the diff on the host
5. Clean up

**Success looks like:** Component builds without errors; branch visible on `sandbox-feature-component/feat/lab-7-stats-card`; host `git status` still clean before you choose to merge.

---

## Agent prompt (starting point)

> Create branch `feat/lab-7-stats-card`. Add a `WorkshopStats` component showing event, location, and duration from `workshop-data.ts` using Apple tokens. Render it on the home page below the hero. Run `npm run lint` and `npm run build`. Commit when done.

---

## See also

| Resource | Purpose |
|----------|---------|
| [Lab 4](../lab-04-clone-workflow/) | Clone mode fundamentals |
| [workshop-app/AGENTS.md](../workshop-app/AGENTS.md) | Project conventions |
| [Lab 10](../lab-10-capstone/) | Ship changes via PR |

## Takeaway

Clone mode + kit = safe agent UI work. Always run `npm run build` before merging agent output into your main branch.
