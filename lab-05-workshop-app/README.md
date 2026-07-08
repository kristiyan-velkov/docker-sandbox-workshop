# Lab 5 — Run with Kit

**Time:** ~20 min  
**Repo:** [docker-sandbox-workshop](https://github.com/kristiyan-velkov/docker-sandbox-workshop) (reuse Lab 4 clone)  
**Workspace:** `workshop-app/` — run `sbx` from **inside** this folder with `.`

**Goal:** Run workshop-app with the **workshop kit**, test **network allow/deny** rules, and inspect what the kit injects.

→ **[GUIDE.md](./GUIDE.md)** — step-by-step commands

---

## Critical: workspace path

```bash
cd workshop-app
sbx run cursor . --kit ../customize/kit/workshop-app-nextjs --name lab5-kit
```

Do **not** run `sbx run cursor workshop-app/ …` from the monorepo root — kit `npm ci` will fail without `package.json` at workspace root.

---

## Prerequisites

- Lab 4 complete — `docker-sandbox-workshop` on disk
- `package.json` + `package-lock.json` in `workshop-app/` (`npm install` on host if needed)
- `sbx secret set -g cursor` from Lab 1

---

## Env

```bash
NEXT_PUBLIC_PLATFORM_URL=https://nextjs-26f1-3000.prg1.zerops.app
```

Copy from `.env.sandbox.example` → `.env.local` in `workshop-app/`.

---

## Docker docs

| Topic | Link |
|-------|------|
| Customize | [Templates, kits, and mixins](https://docs.docker.com/ai/sandboxes/customize/) |
| Kits | [Declarative runtime mixins](https://docs.docker.com/ai/sandboxes/customize/kits/) |

## Takeaway

**Kit** = runtime (`npm ci`, dev server, **network policy**) + workspace files (rules, skill). Always `cd workshop-app` → `sbx run cursor .`.
