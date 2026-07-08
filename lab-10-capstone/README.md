# Lab 10 — Capstone: Clone, Commit & Open a PR

**Time:** ~20 min  
**Workspace:** [`workshop-app/`](../workshop-app/) (from **repository root**)

**Goal:** Wire together everything from the workshop — clone mode, your kit, GitHub credentials, and agent-driven PR — into one delivery workflow.

→ **[GUIDE.md](./GUIDE.md)** — step-by-step commands  
→ [Workflow patterns](https://docs.docker.com/ai/sandboxes/workflows/) · [Authenticated CLI tools](https://docs.docker.com/ai/sandboxes/workflows/#authenticated-cli-tools)

---

## Why this lab matters

This is the **capstone**. You combine:

| Workshop topic | Lab where you learned it | Used here |
|----------------|--------------------------|-----------|
| Credential proxy | Lab 3 | `sbx secret set -g github` — token never in VM |
| Clone mode | Lab 4, 7 | Agent commits on isolated branch |
| Template + kit | Lab 5–9 | Your kit or workshop kit |
| Network audit | Lab 2 | `sbx policy log` after `gh` calls |
| Agent development | Lab 7 | Edit `workshop-data.ts`, build gate |

The agent creates a branch, commits, pushes (or you fetch from `sandbox-capstone`), and opens a PR with `gh` — all inside the sandbox, host stays safe.

---

## Prerequisites

- Labs 4, 7–9 complete (clone, component work, custom kit)
- [GitHub CLI](https://cli.github.com/) authenticated: `gh auth status`
- `./my-workshop-kit/` from Lab 8 **or** `./customize/kit/workshop-app-nextjs`
- Push access to a fork or branch you can PR from

---

## What you'll do

1. `echo "$(gh auth token)" | sbx secret set -g github`
2. `sbx run --clone cursor workshop-app/ --kit ./my-workshop-kit --name capstone`
3. Agent: branch `feat/lab-10-capstone`, edit copy, commit, `gh pr create`
4. Fallback: `git fetch sandbox-capstone` and PR from host
5. Audit with `sbx policy log`; optional `sbx kit pack`
6. Clean up sandbox and remote

**Success looks like:** PR opened (or branch fetchable on host); `gh auth status` works inside sandbox via proxy; policy log shows `api.github.com` allowed with injected credentials.

---

## If push fails inside the sandbox

Fetch on the host instead — clone mode always leaves a `sandbox-<name>` remote:

```bash
git fetch sandbox-capstone
git checkout -b feat/lab-10-capstone sandbox-capstone/feat/lab-10-capstone
gh pr create --fill
```

---

## See also

| Resource | Purpose |
|----------|---------|
| [Lab 3](../lab-03-secrets/) | How credential proxy works |
| [Lab 4](../lab-04-clone-workflow/) | Clone fetch workflow |
| [CI and headless use](https://docs.docker.com/ai/sandboxes/workflows/#ci-and-headless-use) | Automate in CI |

## Takeaway

Sandboxes support **real delivery workflows**: clone mode for isolation, kits for team defaults, secrets for `gh`/API tools, policy log for audit. Your host stays safe while the agent ships code.
