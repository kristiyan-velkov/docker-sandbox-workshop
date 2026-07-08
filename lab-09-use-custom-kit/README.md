# Lab 9 — Use Your Custom Kit

**Time:** ~15 min  
**Workspace:** [`workshop-app/`](../workshop-app/) (from **repository root**)

**Goal:** Run the demo app with `./my-workshop-kit/` from Lab 8 and confirm your install steps, skills, and network rules actually apply.

→ **[GUIDE.md](./GUIDE.md)** — step-by-step commands

---

## Why this lab matters

Authoring a kit (Lab 8) and **using** it are different skills. `--kit` only applies at **sandbox create** — passing it to an existing name fails. You need to know how to re-validate after edits, run with clone mode for safe Git work, and spot-check that your skill and install commands ran.

Lab 9 closes the customize loop: your team's preset replaces the workshop kit in `sbx run … --kit ./my-workshop-kit`.

---

## Workshop kit vs yours

| | Workshop kit | Your kit (Lab 8) |
|---|--------------|------------------|
| Path | `customize/kit/workshop-app-nextjs` | `./my-workshop-kit` |
| Dev server | Yes (startup + port 3000) | Optional — add in Lab 8 if needed |
| Skill | `workshop-app/SKILL.md` | `my-workshop-kit/SKILL.md` |
| Validate | `sbx kit validate ./customize/kit/…` | `sbx kit validate ./my-workshop-kit` |

Compare with `sbx kit inspect` on both to see the diff.

---

## Prerequisites

- **Lab 8 complete** — `./my-workshop-kit/` exists and validates
- `workshop-app/.env.local` on the host

---

## What you'll do

1. Re-validate `./my-workshop-kit`
2. `sbx run --clone cursor workshop-app/ --kit ./my-workshop-kit --name my-kit-clone`
3. Verify `node_modules`, skill file, env vars, `sbx policy log`
4. Agent smoke test — read skill, make a one-line edit
5. Clean up

**Success looks like:** Your skill path exists in the workspace; install command ran; policy log shows domains you allowed in `spec.yaml`.

---

## See also

| Resource | Purpose |
|----------|---------|
| [Lab 8](../lab-08-create-kit/) | Create the kit |
| [Lab 10](../lab-10-capstone/) | Ship with `gh` + your kit |
| [GitHub kit URL](../customize/README.md) | Share kit without cloning full repo |

## Takeaway

Your kit is a **portable team preset** — validate, pack, share via ZIP or Git URL. Use clone mode when the agent will commit changes.
