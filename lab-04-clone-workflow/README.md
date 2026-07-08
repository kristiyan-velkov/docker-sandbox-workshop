# Lab 4 — Direct & Clone Mode

**Time:** ~25 min  
**Workspace:** [`workshop-app/`](../workshop-app/) in [docker-sandbox-workshop](https://github.com/kristiyan-velkov/docker-sandbox-workshop)

**Goal:** Clone the workshop repo, validate `workshop-app` locally, then compare **direct mode** and **clone mode** in sbx.

→ **[GUIDE.md](./GUIDE.md)** — step-by-step commands

---

## Why this lab matters

In Lab 1 you used **direct mode** — the sandbox mounts your host folder; agent edits appear immediately. That is fine for exploration, but risky for Git: the agent can commit, stash, or dirty your main checkout.

**Clone mode** gives the sandbox a **private Git clone**. The agent branches and commits inside the VM. When done, you `git fetch sandbox-<name>` on the host and review before merging. Your local `main` stays clean.

This lab uses **`workshop-app/`** from the workshop monorepo — no kit, no Supabase setup.

---

## Direct vs clone

| | Direct mode (default) | Clone mode (`--clone`) |
|---|----------------------|------------------------|
| Workspace | Host folder mounted read-write | Private in-VM Git clone |
| Host changes | Immediate | Only after `git fetch sandbox-<name>` |
| Host working tree | Can be modified | Stays clean |
| Set at | Any run | **Create time only** — cannot add later |

---

## Prerequisites

- Labs 1–3 complete
- Node.js on the host (for `npm install` / `npm run dev`)
- `sbx secret set -g cursor` from Lab 1

---

## What you'll do

**Setup**

1. `git clone https://github.com/kristiyan-velkov/docker-sandbox-workshop`
2. `cd workshop-app` → `npm install` → `npm run dev` → confirm http://localhost:3000

**Part A — Direct mode**

1. `sbx run cursor workshop-app/ --name lab4-direct` from monorepo root
2. Ask the agent to update the hero tagline in `src/components/home-hero.tsx`
3. Confirm the edit is already on the host
4. `sbx rm lab4-direct`

**Part B — Clone mode**

1. `sbx run --clone cursor workshop-app/ --name lab4-clone`
2. Ask the agent to create `feat/lab4-test` and commit a small docs change
3. On the host: `git fetch sandbox-lab4-clone`, review diff — `git status` still clean
4. Remove sandbox and remote

**Success looks like:** App runs locally on the host; direct-mode edits appear immediately; clone-mode commits show up only after `git fetch sandbox-lab4-clone`.

---

## Docker docs

| Topic | Link |
|-------|------|
| Workflow patterns | [Direct, clone, and worktree modes](https://docs.docker.com/ai/sandboxes/workflows/) |
| Clone mode | [Isolated Git clone in the VM](https://docs.docker.com/ai/sandboxes/workflows/#clone-mode) |
| Git workflows | [Fetch sandbox remotes on the host](https://docs.docker.com/ai/sandboxes/workflows/#git-workflows) |

## See also

| Resource | Purpose |
|----------|---------|
| [Lab 5](../lab-05-workshop-app/) | Run workshop-app with a kit mixin |
| [Lab 7](../lab-07-build-component/) | Clone mode for UI work |
| [Lab 10](../lab-10-capstone/) | Clone + PR with `gh` |

## Takeaway

Validate on the **host** first, then use **direct mode** for immediate edits or **clone mode** to isolate agent Git work — fetch `sandbox-<name>` when done, review, then merge or discard.
