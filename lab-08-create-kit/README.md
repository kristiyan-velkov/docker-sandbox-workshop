# Lab 8 — Create Your Own Kit

**Time:** ~20 min  
**Output:** `./my-workshop-kit/` at repo root (gitignored)

**Goal:** Copy the starter scaffold, customize `spec.yaml`, validate with `sbx kit`, and pack a shareable ZIP.

→ **[GUIDE.md](./GUIDE.md)** — step-by-step commands  
→ [Kits docs](https://docs.docker.com/ai/sandboxes/customize/kits/) · [SPEC-REFERENCE.md](../customize/SPEC-REFERENCE.md)

---

## Why this lab matters

Labs 5–6 used the **built-in workshop kit** — a declarative mixin that installs deps, starts the dev server, and opens network paths. Teams need their own presets: linters, team rules, domain allow-lists, and agent skills packaged once and reused with `--kit ./my-team-kit`.

Lab 8 is where you **author** a kit: edit YAML, add a skill file, run `sbx kit validate`, and pack for distribution. No Docker build required — kits are `spec.yaml` + optional `files/`.

---

## Kit anatomy

```text
my-workshop-kit/
├── spec.yaml                          # v2 mixin — network, install, agentContext
└── files/workspace/
    └── .claude/skills/my-workshop-kit/
        └── SKILL.md                   # Agent conventions
```

| Field in starter | You customize |
|------------------|---------------|
| `name` / `displayName` | Your team identifier |
| `agentContext` | Rules appended to agent memory |
| `caps.network.allow` | Domains your app needs |
| `commands.install` | Tools to run at create time |
| `publishedPorts` + `startup` | Optional dev server (add in guide) |

> Never put secrets in `environment.variables`. Do not set `HTTP_PROXY`.

---

## Prerequisites

- Labs 5–6 complete (you understand what the workshop kit does)
- `sbx kit validate` available (`sbx version` current)

---

## What you'll do

1. `cp -r lab-08-create-kit/starter-kit ./my-workshop-kit`
2. Edit `spec.yaml` and the skill file
3. `sbx kit validate` and `sbx kit inspect` until **VALID**
4. `sbx kit pack` → ZIP for sharing
5. Dry-run with `sbx kit add` on a shell sandbox

**Success looks like:** `sbx kit validate ./my-workshop-kit` passes with no warnings; skill file appears in workspace after `kit add`.

---

## Folder layout

| Path | Purpose |
|------|---------|
| [GUIDE.md](./GUIDE.md) | Copy-paste walkthrough |
| [starter-kit/](./starter-kit/) | Valid v2 scaffold — copy, do not edit in place |

## See also

| Resource | Purpose |
|----------|---------|
| [Lab 9](../lab-09-use-custom-kit/) | Run agents with your kit |
| [workshop kit](../customize/kit/workshop-app-nextjs/spec.yaml) | Production reference spec |

## Takeaway

Kits are declarative: `spec.yaml` + optional `files/`. **Validate before every workshop** — broken kits fail at create time, not mid-demo.
