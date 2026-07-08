# Lab 6 — Create Your Custom Kit

**Time:** ~25 min  
**Repo:** [docker-sandbox-workshop](https://github.com/kristiyan-velkov/docker-sandbox-workshop)  
**Workspace:** `workshop-app/`  
**Final lab** — build and run your own mixin kit.

**Goal:** Copy the kit template, fill in `spec.yaml`, validate, and run workshop-app with **your own kit**.

→ **[GUIDE.md](./GUIDE.md)** — step-by-step + annotated `spec.yaml`

---

## Core concepts

A **kit** is a folder with `spec.yaml` and optional `files/` that you pass to `sbx run` with `--kit`. It does not replace the agent — it **extends** it.

| Concept | What it means |
|---------|----------------|
| **Mixin** (`kind: mixin`) | Layers runtime behavior on top of an existing agent (`cursor`, `claude`). No custom Docker image required. |
| **`spec.yaml`** | Declarative config: identity, network rules, env vars, startup commands. `sbx kit validate` checks it before run. |
| **`files/home/`** | Static files injected into `/home/agent/` — e.g. a bootstrap script that runs `npm ci` and starts the dev server. |
| **`files/workspace/`** | Static files copied into your project workspace — Cursor rules, Claude skills, `.env` examples. |
| **`commands.startup`** | Runs every sandbox start. `background: true` keeps the dev server running while Cursor attaches. |
| **`network.allowedDomains`** | Outbound allow-list enforced by the sandbox proxy. Deny rules win over allow. |
| **`commands.install`** | *Not used for npm.* Install runs at create time, before your workspace is mounted — use `files/home/` + `startup` instead. |

**Lab 5 vs Lab 6:** Lab 5 used a pre-built kit (`customize/kit/workshop-app-nextjs`). Lab 6 is the kit **you** build — copy `kit-template/`, fill in each `spec.yaml` field, validate, run.

---

## What this kit does

When you run `sbx run cursor . --kit ../my-workshop-kit`, the mixin:

1. **Applies network policy** — your `allowedDomains` / `deniedDomains` from `spec.yaml`.
2. **Injects a bootstrap script** — `files/home/.local/bin/workshop-bootstrap.sh` → `commands.startup` runs it in the background.
3. **Installs deps and starts Next.js** — script `cd`s `${WORKDIR}`, runs `npm ci` if needed, then `npm run dev` on `:3000`.
4. **Copies workspace files** — your skill under `files/workspace/.claude/skills/` lands in the synced workspace.
5. **Sets env** — keys from `environment.variables` in the VM.

```text
my-workshop-kit/
├── spec.yaml                              # you fill in: name, network, env, startup
└── files/
    ├── home/.local/bin/workshop-bootstrap.sh   → npm ci + dev server (provided)
    └── workspace/.claude/skills/.../SKILL.md   → agent instructions (you edit)
```

---

## What you'll do

1. `cp -r lab-06-customize-stack/kit-template ./my-workshop-kit`
2. Fill in `spec.yaml` — `name`, `network`, `environment`, `startup` (see GUIDE.md)
3. Edit your skill in `files/workspace/.claude/skills/my-workshop-kit/SKILL.md`
4. `sbx kit validate ./my-workshop-kit`
5. `cd workshop-app && sbx run cursor . --kit ../my-workshop-kit --name lab6-my-kit`
6. Verify HTTP 200 and agent reads your skill

---

## Docker docs

| Topic | Link |
|-------|------|
| Customize | [Templates, kits, and mixins](https://docs.docker.com/ai/sandboxes/customize/) |
| Kits | [Declarative runtime mixins](https://docs.docker.com/ai/sandboxes/customize/kits/) |
| Kit reference | [spec.yaml field reference](https://docs.docker.com/ai/sandboxes/customize/kit-reference/) |

## Takeaway

A kit is **declarative infrastructure**: `spec.yaml` defines runtime behavior; `files/` injects scripts and agent context. Validate before every run. You now have `./my-workshop-kit/` to reuse on any project with `sbx run cursor . --kit ../my-workshop-kit`.
