# Lab 5 — Run workshop-app (Template + Kit)

**Time:** ~20 min  
**Workspace:** [`workshop-app/`](../workshop-app/) (mount from **repository root**)

**Goal:** Launch the Next.js workshop demo inside a sandbox using both customization layers — a **template** for the agent image and a **kit** for app runtime setup — then confirm the dev server is live.

→ **[GUIDE.md](./GUIDE.md)** — step-by-step commands  
→ [workshop-app/README.md](../workshop-app/README.md) — app setup and sandbox options

---

## Why this lab matters

Labs 1–3 taught sbx basics: microVMs, network policy, and secrets. Lab 4 covered Git clone mode. **Lab 5 is the first time you run the real workshop app** the way attendees will use it in the live demo — not on the host, but inside an isolated sandbox with dependencies installed and Next.js already serving on port 3000.

You will stack two assets from [`customize/`](../customize/):

| Layer | What it is | What it adds in this lab |
|-------|------------|--------------------------|
| **Template** | Custom Docker image (`docker build` → `sbx template load`) | Cursor agent image with workshop rules baked into `/home/agent/.cursor/` |
| **Kit mixin** | YAML spec (`--kit ./customize/kit/workshop-app-nextjs`) | `npm ci`, background `npm run dev` on `:3000`, Cursor rules + Claude skill in the workspace |

The template shapes **who** the agent is. The kit shapes **what** the sandbox does when it starts. Together they replace manual setup you would otherwise run by hand after every `sbx run`.

---

## Prerequisites

- Labs 1–3 complete (or equivalent `sbx` familiarity)
- Optional `workshop-app/.env.local` — copy from [`.env.example`](../workshop-app/.env.example) (platform URL defaults to [hosted app](https://nextjs-26f1-3000.prg1.zerops.app/))
- **Docker Desktop** on the host (to build the template once)
- Optional: skip the template and use **kit-only** mode (see [GUIDE.md](./GUIDE.md))

---

## What you'll do

1. Copy env vars to `.env.local` on the host (synced into the VM with the workspace)
2. Build and load `workshop-app-cursor:v1` from `customize/templates/workshop-app-cursor/`
3. Run `sbx run --template … --kit … workshop-app/` and attach Cursor
4. Verify from a second terminal: `node_modules`, HTTP 200 on `:3000`, `sbx policy log`
5. Tear down with `sbx rm workshop-ui --force`

**Success looks like:** `sbx ls` shows `workshop-ui` with a forwarded port; `curl http://127.0.0.1:3000` inside the sandbox returns `200`; the agent can edit the app without touching your host Node install.

---

## See also

| Resource | Purpose |
|----------|---------|
| [customize/SPEC-REFERENCE.md](../customize/SPEC-REFERENCE.md) | Field-by-field template + kit reference |
| [Lab 6](../lab-06-customize-stack/) | Inspect each layer in detail |
| [Lab 4](../lab-04-clone-workflow/) | Clone mode for isolated Git work on this app |

## Takeaway

**Template** = custom agent VM image. **Kit** = declarative runtime (install, dev server, network, files). Stack both with `--template` and `--kit` for the full workshop demo — or use kit-only when you do not need a custom agent image.
