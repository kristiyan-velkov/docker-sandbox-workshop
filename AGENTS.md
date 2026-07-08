# Docker Sandbox Workshop — Agent Rules

2-hour hands-on workshop on [Docker Sandboxes](https://docs.docker.com/ai/sandboxes/).

## Mission

Help attendees run Cursor agents safely inside [Docker Sandboxes](https://docs.docker.com/ai/sandboxes/) using the `sbx` CLI — YOLO mode without host risk.

## Repository layout

| Path | Purpose |
|------|---------|
| `lab-01-first-sandbox/` | First sandbox: install, run, inspect, rm |
| `lab-02-network-policy/` | Network deny rules, custom template, clone workflow |
| `lab-03-secrets/` | `sbx secret set`, sentinel values, live API proxy check |
| `lab-04-clone-workflow/` | `--clone`, test branch, fetch on host |
| `lab-05-workshop-app/` | Run workshop-app with pre-built kit |
| `lab-06-customize-stack/` | Create your custom kit — final lab |
| `workshop-app/` | Next.js **playground** — sbx workspace for labs 4–6 |
| `docker-sandbox-platform/` | Hosted register, login, lab progress, Q&A — https://nextjs-26f1-3000.prg1.zerops.app |
| `workshop-landing/` | Conference landing on Zerops — `/login` & `/register` redirect to platform |
| `customize/` | Sandbox templates & kit for `workshop-app/` |
| `.cursor/mcp.json` | Chrome DevTools + Supabase MCP servers |

## Supabase + Server Actions

Hosted on **docker-sandbox-platform** (or local `workshop-app/` with `.env.local`):

- Server Actions: `docker-sandbox-platform/src/lib/actions/workshop.ts`
- Migrations: `docker-sandbox-platform/supabase/migrations/`
- Env: `workshop-app/.env.local` when running labs locally

## Agent workflow for live demo (last 15 min)

1. Open `workshop-app/` in Cursor
2. Run `npm run dev` on host OR `cd workshop-app && sbx run cursor . --kit ../customize/kit/workshop-app-nextjs --name workshop-ui`
3. Use Chrome DevTools MCP to verify the running app
4. Prefer clone mode from repo root: `sbx run --clone cursor . --name feature/demo`

## Security rules for agents

- Never write API keys into repo files, Dockerfiles, or `.env` committed to git
- Use `sbx secret set -g cursor` on the host before `sbx run cursor` (Lab 1). Lab 3 uses `sbx secret set -g github` for the credential-proxy demo.
- Do not disable network policy in lab examples
- Lab attack simulations use fake hosts (`api.example.com`, `evil.example.com`)

## sbx quick reference

```bash
sbx run cursor .                         # YOLO agent in microVM (from project dir)
cd workshop-app && sbx run cursor . \
  --kit ../customize/kit/workshop-app-nextjs   # Lab 5 kit pattern
sbx ls                                   # list sandboxes (status, ports, workspace)
sbx policy deny network "host"           # block outbound
sbx secret set -g cursor      # Cursor API key (Lab 1+)
sbx run --clone cursor . --name feat-x   # isolated Git clone
sbx rm NAME                              # full teardown
```

Validate commands against [Docker Sandboxes docs](https://docs.docker.com/ai/sandboxes/) and `sbx --help`.

## workshop-app

Next.js 16 **playground** for sbx labs. Labs, auth, and progress redirect to the [hosted platform](https://nextjs-26f1-3000.prg1.zerops.app). **Agent rules:** [workshop-app/AGENTS.md](./workshop-app/AGENTS.md)

## docker-sandbox-platform

Deployable copy for hosted register, login, lab progress, and Q&A. Keep in sync with `workshop-app/` when changing lab UI.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
