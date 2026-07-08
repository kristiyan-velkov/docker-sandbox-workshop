# Docker Sandbox Platform

Next.js app for the **WeAreDevelopers Berlin** workshop — lab progress, registration, login, and Q&A (Supabase). Intended to live in its own repository; the monorepo also includes a lightweight [workshop-app landing](../workshop-app/) for Zerops.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4 + Apple design system (tokens in `src/app/globals.css`)
- Supabase + Server Actions
- shadcn/ui
- Lucide icons

## Pages

| Route | Content |
|-------|---------|
| `/` | Landing, agenda, lab overview |
| `/labs` | All hands-on labs with commands |
| `/yolo` | YOLO mode inside sbx |
| `/security` | Isolation layers, network, secrets |
| `/register` | Workshop signup — Server Actions + Supabase |

## Supabase setup

1. Copy the template and add your anon key:

```bash
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_SUPABASE_ANON_KEY from Supabase dashboard
```

2. Run migration in Supabase SQL editor (or via Supabase MCP):

```
supabase/migrations/001_workshop_signups.sql
```

3. Open `/register` and submit the form.

## Run locally (host)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Run in Docker Sandbox (template + kit)

The workshop ships a **template** (custom agent image) and a **kit mixin** (npm install, dev server, network allow-list). See [customize/SPEC-REFERENCE.md](../customize/SPEC-REFERENCE.md) for how they fit together.

**Prerequisites**

- [sbx CLI](https://docs.docker.com/ai/sandboxes/get-started/) — `sbx login`
- Copy `.env.example` → `.env.local` (optional — platform links default to https://nextjs-26f1-3000.prg1.zerops.app)
- **Claude:** `sbx secret set -g anthropic` on the host
- **Custom template:** Docker Desktop (for `docker build`)

All commands below assume **repo root** unless noted.

### Option A — Kit only (fastest)

Uses the default agent image. The kit runs `npm ci`, starts Next.js on `:3000`, and applies network rules.

```bash
# Cursor
sbx run cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name workshop-ui

# Claude Code
sbx run claude workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name workshop-ui
```

### Option B — Custom template + kit (workshop default)

Build the template **once** per machine, then stack the kit at create time.

**Cursor**

```bash
cd customize/templates/workshop-app-cursor
docker build -t workshop-app-cursor:v1 .
docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar
sbx template load workshop-app-cursor.tar
cd ../../..

sbx run --template workshop-app-cursor:v1 cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name workshop-ui
```

**Claude**

```bash
cd customize/templates/workshop-app-claude
docker build -t workshop-app-claude:v1 .
docker image save workshop-app-claude:v1 -o workshop-app-claude.tar
sbx template load workshop-app-claude.tar
cd ../../..

sbx run --template workshop-app-claude:v1 claude workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name workshop-ui
```

### Option C — Kit from GitHub (no local customize/ clone)

```bash
sbx settings set kit.allowedSources '["docker.io/","github.com/kristiyan-velkov/"]'

sbx run cursor workshop-app/ \
  --kit "git+https://github.com/kristiyan-velkov/docker-sandbox-workshop.git#dir=customize/kit/workshop-app-nextjs" \
  --name workshop-ui
```

Pair with a locally built template using `--template workshop-app-cursor:v1` as in option B.

### Option D — Clone mode (isolated Git work)

```bash
sbx run --template workshop-app-cursor:v1 --clone cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name feature/workshop-ui
```

Agent commits stay on a sandbox remote until you `git fetch sandbox-feature/workshop-ui`.

---

## Verify the sandbox

From a **second host terminal** while the agent runs:

```bash
sbx ls
# workshop-ui   cursor|claude   running   …   next-dev :3000

sbx exec workshop-ui -- test -d node_modules && echo "deps OK"
sbx exec workshop-ui -- curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000
# -> 200 or 307

sbx exec workshop-ui -- tail -20 /tmp/next-dev.log
sbx policy log --limit 10
```

Open the forwarded port from `sbx ls` in your browser, or use Chrome DevTools MCP from the repo root.

### Clean up

```bash
sbx rm workshop-ui --force
```

---

## Lab walkthrough

Step-by-step exercises:

| Lab | Topic |
|-----|--------|
| [lab-04-clone-workflow](../lab-04-clone-workflow/) | Clone mode — test branch & fetch |
| [lab-05-workshop-app](../lab-05-workshop-app/) | Template + kit for this app |
| [lab-06-customize-stack](../lab-06-customize-stack/) | Stack templates, kits, skills |
| [lab-07-build-component](../lab-07-build-component/) | Agent builds a new component |
| [lab-08-create-kit](../lab-08-create-kit/) | Create your own kit |
| [lab-09-use-custom-kit](../lab-09-use-custom-kit/) | Run with your kit |
| [lab-10-capstone](../lab-10-capstone/) | GitHub + PR workflow |

Each lab: **README.md** (overview) + **GUIDE.md** (commands).

More detail: [customize/README.md](../customize/README.md)

---

## Deploy on Zerops

Next.js **standalone** output (`output: "standalone"` in `next.config.ts`) is built and served with `node server.js` on port 3000.

| File | Purpose |
|------|---------|
| [`zerops.yaml`](./zerops.yaml) | Build/deploy/run recipe (app-root layout) |
| [`import.yaml`](./import.yaml) | One-click project bootstrap |
| [`../zerops.yaml`](../zerops.yaml) | Monorepo recipe — **use this** when deploying from repo root |
| [`../import.yaml`](../import.yaml) | Monorepo import — paste into Zerops Import dialog |

### Quick import

1. Zerops GUI → **Import a project** → paste [`../import.yaml`](../import.yaml) (monorepo) or [`import.yaml`](./import.yaml) (app-only repo)
2. Set Supabase keys in **Secret Variables** on the `nextjs` service:
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Note the generated `WORKSHOP_ADMIN_SECRET` (or override it) for `/admin` login
4. Rebuild after changing any `NEXT_PUBLIC_*` variable (inlined at build time)

### Environment variables

| Variable | Where | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Env | Public Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Secret | Client + Server Actions |
| `WORKSHOP_ADMIN_SECRET` | Secret | `/admin` login |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Admin dashboard queries |

Service hostname must be **`nextjs`** — it matches `setup: nextjs` in `zerops.yaml`.

## Agent rules (Cursor & Claude Code)

| File | Purpose |
|------|---------|
| [AGENTS.md](./AGENTS.md) | Stack, routes, Next.js + Supabase conventions |
| [CLAUDE.md](./CLAUDE.md) | Claude Code + sbx workflow |
| [.cursor/rules/](./.cursor/rules/) | Cursor project rules (auto-applied) |

Open this folder as the workspace root in Cursor for project-scoped rules, or work from repo root — rules match `src/**` paths.

## Edit content

Workshop copy and lab commands: `src/lib/workshop-data.ts`

## MCP (repo root)

See `../.cursor/mcp.json` — Chrome DevTools and Supabase MCP configured at repo root.
