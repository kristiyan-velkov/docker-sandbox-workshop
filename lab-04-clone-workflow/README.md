# Lab 4 — Direct & Clone Mode

**Time:** ~25 min  
**Repo:** [docker-sandbox-workshop](https://github.com/kristiyan-velkov/docker-sandbox-workshop)  
**Workspace:** `workshop-app/`

**Goal:** Compare **direct mode** (host edits immediately) vs **clone mode** (isolated Git in the VM), then bring agent work back to your repo on `main`.

→ **[GUIDE.md](./GUIDE.md)** — step-by-step commands

---

## Why this lab matters

In Lab 1 you used **direct mode** — the sandbox mounts your host folder; agent edits appear immediately. That is fine for exploration, but risky for Git: the agent can commit, stash, or dirty your main checkout.

**Clone mode** gives the sandbox a **private Git clone**. The agent branches and commits inside the VM. When done, you `git fetch sandbox-<name>` on the host, review, push, and merge. Your local `main` stays clean during agent work.

No kit or Supabase setup for this lab.

---

## Direct vs clone

| | Direct mode (default) | Clone mode (`--clone`) |
|---|----------------------|------------------------|
| Workspace | `workshop-app/` (read-write mount) | `.` at repo root (private in-VM clone) |
| Host changes | Immediate | Only after `git fetch sandbox-<name>` |
| Host `main` | Can be modified | Stays clean |
| Set at | Any run | **Create time only** |

All `sbx` commands run from the **monorepo root** after setup. `--clone` requires the Git repo root (`.`) — not `workshop-app/`.

---

## Prerequisites

- Labs 1–3 complete
- Node.js on the host
- `sbx secret set -g cursor` from Lab 1

---

## What you'll do

**Setup (host)**

```bash
git clone https://github.com/kristiyan-velkov/docker-sandbox-workshop.git
cd docker-sandbox-workshop/workshop-app && npm install && npm run dev
# confirm http://localhost:3000, Ctrl+C, cd ..
```

**Part A — Direct mode**

1. `sbx run cursor workshop-app/ --name lab4-direct`
2. Agent updates hero tagline in `src/components/home-hero.tsx` — edit appears on host immediately
3. `sbx rm lab4-direct --force`

**Part B — Clone mode**

1. `sbx run --clone cursor . --name lab4-clone`
2. Agent creates `feat/lab4-test`, commits in `workshop-app/src/lib/workshop-data.ts`
3. `git fetch sandbox-lab4-clone`, review — `git status` on `main` stays clean
4. Push branch, merge into `main` (PR or local merge)
5. Remove sandbox and remote

**Done when:** Direct hero edit visible without fetch; host `main` never dirty during clone mode; agent commit on `origin/feat/lab4-test`, reviewed, merged into `main`.

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
| [Lab 6](../lab-06-customize-stack/) | Create your custom kit — final lab |

## Takeaway

Validate on the **host** first. Use **direct mode** on `workshop-app/` for immediate edits, or **clone mode** on `.` to isolate agent Git work — fetch `sandbox-<name>`, review, push, and merge when done.
