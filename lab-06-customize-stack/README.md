# Lab 6 — Stack Templates, Kits & Agent Skills

**Time:** ~15 min  
**Workspace:** [`workshop-app/`](../workshop-app/) (from **repository root**)

**Goal:** Run the full [`customize/`](../customize/) stack, inspect what each layer adds, and use `sbx kit validate` / `sbx kit add`.

→ **[GUIDE.md](./GUIDE.md)** — step-by-step commands  
→ [SPEC-REFERENCE.md](../customize/SPEC-REFERENCE.md) — field-by-field reference

---

## Why this lab matters

Lab 5 got the demo app running. Lab 6 zooms in on **what actually landed** in the sandbox — three separate mechanisms that are easy to confuse:

1. **Template** — baked into the VM **image** at `docker build` time (agent-home rules)
2. **Kit** — applied at sandbox **create** via `spec.yaml` (install, startup, network, ports)
3. **Agent skills / files** — copied into the **workspace** from the kit's `files/workspace/`

You will validate the kit, run the full stack, and `test` each layer from a second terminal so you know where to look when something is missing.

---

## Three layers

| Layer | Location in repo | Lands in sandbox as |
|-------|------------------|---------------------|
| **Template** | `customize/templates/workshop-app-cursor/` | `/home/agent/.cursor/rules/nextjs-app.mdc` |
| **Kit runtime** | `customize/kit/workshop-app-nextjs/spec.yaml` | `npm ci`, dev server, network rules, `:3000` port |
| **Kit files** | `kit/.../files/workspace/` | `.claude/skills/workshop-app/SKILL.md` in workspace |

Optional: load the kit from GitHub with `kit.allowedSources` — same mixin, remote source.

---

## Prerequisites

- Lab 5 complete (template built, kit familiar)
- Docker Desktop (if template not already loaded)

---

## What you'll do

1. `sbx kit validate` and `sbx kit inspect` the workshop kit
2. Run template + kit on `workshop-app/`
3. Verify deps, dev server, workspace skill, and template rule
4. Demo `sbx kit add` on an existing shell sandbox
5. Clean up

**Success looks like:** All four `test` checks in the guide pass; `sbx kit inspect` shows v2 schema, network allows, and published port 3000.

---

## See also

| Resource | Purpose |
|----------|---------|
| [Lab 8](../lab-08-create-kit/) | Build your own kit from `starter-kit/` |
| [Kits docs](https://docs.docker.com/ai/sandboxes/customize/kits/) | Official kit reference |
| [Lab 5](../lab-05-workshop-app/) | First full stack run |

## Takeaway

Templates customize the **VM image**. Kits customize **runtime** (tools, network, startup). Skills and `agentContext` guide the model — ship them via `files/workspace/` or kit `agentContext:`.
