# Docker Sandbox Workshop — Agent Rules

WeAreDevelopers World Congress · Berlin · 2-hour hands-on workshop.

## Mission

Help attendees run AI coding agents (Claude Code, Cursor) safely inside [Docker Sandboxes](https://docs.docker.com/ai/sandboxes/) using the `sbx` CLI — YOLO mode without host risk.

## Repository layout

| Path | Purpose |
|------|---------|
| `lab-01-first-sandbox/` | First sandbox: install, run, inspect, rm |
| `lab-02-network-policy/` | Network deny rules, custom template, clone workflow |
| `lab-03-secrets/` | `sbx secret set`, sentinel values, live API proxy check |
| `lab-04-clone-workflow/` | `--clone`, test branch, fetch on host |
| `lab-05-workshop-app/` | Template + kit for `workshop-app/` |
| `lab-06-customize-stack/` | Stack `customize/` templates, kits, skills |
| `lab-07-build-component/` | Agent builds UI in clone mode |
| `lab-08-create-kit/` | Create & validate `./my-workshop-kit` |
| `lab-09-use-custom-kit/` | Run with custom kit |
| `lab-10-capstone/` | GitHub secret + PR workflow |
| `workshop-app/` | Next.js demo — **sbx workspace** for labs 4–10 |
| `docker-sandbox-platform/` | Deployed register / login / progress — https://nextjs-26f1-3000.prg1.zerops.app |
| `workshop-landing/` | Conference landing on Zerops — `/login` & `/register` redirect to platform |
| `customize/` | Sandbox templates & kit for `workshop-app/` |
| `.cursor/mcp.json` | Chrome DevTools + Supabase MCP servers |

## Supabase + Server Actions

Hosted on **docker-sandbox-platform** at https://nextjs-26f1-3000.prg1.zerops.app/ (or override via `workshop-app/.env.local`):

- Server Actions: `docker-sandbox-platform/src/lib/actions/workshop.ts`
- Migrations: `docker-sandbox-platform/supabase/migrations/`
- Env: `NEXT_PUBLIC_PLATFORM_URL` in `workshop-app/.env.local` when running the sbx workspace locally

## Agent workflow for live demo (last 15 min)

1. Open `workshop-app/` in Cursor
2. Run `npm run dev` on host OR `sbx run cursor workshop-app/ --name workshop-ui`
3. Use Chrome DevTools MCP to verify the running app
4. Prefer clone mode: `sbx run --clone cursor workshop-app/ --name feature/demo`

## Security rules for agents

- Never write API keys into repo files, Dockerfiles, or `.env` committed to git
- Use `sbx secret set -g anthropic` on the host for credentials
- Do not disable network policy in lab examples
- Lab attack simulations use fake hosts (`api.example.com`, `evil.example.com`)

## sbx quick reference

```bash
sbx run claude .                         # YOLO agent in microVM
sbx run cursor workshop-app/             # Cursor agent on demo app
sbx ls                                   # list sandboxes (status, ports, workspace)
sbx policy deny network "host"           # block outbound
sbx secret set -g anthropic              # host keychain
sbx run --clone claude . --name feat-x   # isolated Git clone
sbx rm NAME                              # full teardown
```

Validate commands against [Docker Sandboxes docs](https://docs.docker.com/ai/sandboxes/) and `sbx --help`.

## workshop-app

Next.js 16 demo for sbx labs. **Agent rules:** [workshop-app/AGENTS.md](./workshop-app/AGENTS.md)

## docker-sandbox-platform

Deployable copy for hosted register, login, lab progress, and Q&A. Keep in sync with `workshop-app/` when changing lab UI.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
