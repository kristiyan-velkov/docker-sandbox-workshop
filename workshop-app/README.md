# workshop-app — Playground

Next.js **playground app** for the Docker Sandboxes workshop — run inside sandboxes for labs 4–6. Labs, registration, login, and progress live on the [hosted platform](https://nextjs-26f1-3000.prg1.zerops.app).

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4 + Apple design system (tokens in `src/app/globals.css`)
- shadcn/ui
- Lucide icons

## Pages

| Route | Content |
|-------|---------|
| `/` | Playground landing, quick start, isolation overview |
| `/about` | Workshop context |
| `/labs`, `/login`, `/register`, `/profile` | Redirect to hosted platform |

## Run locally (host)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional env (platform links):

```bash
cp .env.sandbox.example .env.local
# NEXT_PUBLIC_PLATFORM_URL=https://nextjs-26f1-3000.prg1.zerops.app
```

---

## Run in Docker Sandbox (Lab 5 kit)

The workshop ships a **kit mixin** (bootstrap startup, dev server, network allow/deny). See [customize/SPEC-REFERENCE.md](../customize/SPEC-REFERENCE.md).

**Prerequisites**

- [sbx CLI](https://docs.docker.com/ai/sandboxes/get-started/) — `sbx login`
- `sbx secret set -g cursor` from Lab 1
- `package.json` + `package-lock.json` in this folder

Workspace **must** be `workshop-app/`:

```bash
cd workshop-app
cp .env.sandbox.example .env.local   # optional
test -f package.json && test -f package-lock.json

sbx run cursor . \
  --kit ../customize/kit/workshop-app-nextjs \
  --name lab5-kit
```

Wait ~1 min for bootstrap on first start. Open the forwarded port from `sbx ls`.

### Optional — custom template + kit

Build once per machine, then stack at create time:

```bash
cd customize/templates/workshop-app-cursor
docker build -t workshop-app-cursor:v1 .
docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar
sbx template load workshop-app-cursor.tar
cd ../../workshop-app

sbx run --template workshop-app-cursor:v1 cursor . \
  --kit ../customize/kit/workshop-app-nextjs \
  --name workshop-ui
```

### Clone mode (Lab 4)

From **monorepo root** (Git root required):

```bash
cd ..
sbx run --clone cursor . --name lab4-clone
git fetch sandbox-lab4-clone
```

---

## Verify the sandbox

From a **second host terminal**:

```bash
sbx ls
sbx exec lab5-kit -- curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000
# -> 200

sbx policy log lab5-kit --limit 10
```

### Clean up

```bash
sbx rm lab5-kit --force
```

---

## Lab walkthrough

| Lab | Topic |
|-----|--------|
| [lab-04-clone-workflow](../lab-04-clone-workflow/) | Direct & clone mode |
| [lab-05-workshop-app](../lab-05-workshop-app/) | Pre-built kit + network demo |
| [lab-06-customize-stack](../lab-06-customize-stack/) | Create your custom kit — final lab |

Each lab: **README.md** (overview) + **GUIDE.md** (commands).

More detail: [customize/README.md](../customize/README.md)

---

## Agent rules (Cursor & Claude Code)

| File | Purpose |
|------|---------|
| [AGENTS.md](./AGENTS.md) | Stack, routes, sbx workflow |
| [CLAUDE.md](./CLAUDE.md) | Claude Code + sbx workflow |
| [.cursor/rules/](./.cursor/rules/) | Cursor project rules |

## Edit content

Workshop copy and lab commands: `src/lib/workshop-data.ts`

## MCP (repo root)

See `../.cursor/mcp.json` — Chrome DevTools MCP configured at repo root.
