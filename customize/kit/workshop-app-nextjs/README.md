# workshop-app-nextjs

Agent-agnostic [kit mixin](https://docs.docker.com/ai/sandboxes/customize/kits/) for the Next.js **playground app**.

**Repo:** [github.com/kristiyan-velkov/docker-sandbox-workshop](https://github.com/kristiyan-velkov/docker-sandbox-workshop)

Field reference: [Kit spec reference](https://docs.docker.com/ai/sandboxes/customize/kit-reference/) · [SPEC-REFERENCE.md](../../SPEC-REFERENCE.md)

## What this kit does

| Capability | Implementation |
|------------|----------------|
| **Bootstrap** | `files/home/.local/bin/workshop-bootstrap.sh` → `commands.startup` |
| **Deps + dev** | Script `cd "${WORKDIR}"`, `npm ci` if needed, `npm run dev :3000` |
| **Workspace files** | Cursor rules, Claude skill, `.env.sandbox.example` |
| **Network** | `allowedDomains` / `deniedDomains` in `spec.yaml` (Lab 5 exercises) |

> **Why not `commands.install` for npm?** Install runs before the workspace is mounted. Project deps use `files/home/` bootstrap + `startup` with `${WORKDIR}`.

## Kit layout

```text
workshop-app-nextjs/
├── spec.yaml
└── files/
    ├── home/.local/bin/workshop-bootstrap.sh   → /home/agent/ (bootstrap)
    └── workspace/
        ├── .cursor/rules/
        ├── .claude/skills/workshop-app/SKILL.md
        └── .env.sandbox.example
```

**Platform split:** `workshop-app` is the sbx playground. Register, login, and lab progress live on the [hosted platform](https://nextjs-26f1-3000.prg1.zerops.app/) — set `NEXT_PUBLIC_PLATFORM_URL` in `.env.local`.

## Run (Lab 5)

Workspace **must** contain `package.json`. From inside `workshop-app/`:

```bash
cd docker-sandbox-workshop/workshop-app
cp .env.sandbox.example .env.local   # optional — platform URL defaults in code
test -f package.json && test -f package-lock.json && echo OK

sbx run cursor . \
  --kit ../customize/kit/workshop-app-nextjs \
  --name lab5-kit
```

From monorepo root (equivalent):

```bash
sbx run cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name lab5-kit
```

Wait ~1 min for bootstrap on first start.

## Validate

```bash
sbx kit validate ./customize/kit/workshop-app-nextjs
sbx exec lab5-kit -- test -d node_modules && echo "deps OK"
sbx exec lab5-kit -- curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000
```

## Env

```bash
NEXT_PUBLIC_PLATFORM_URL=https://nextjs-26f1-3000.prg1.zerops.app
```

Copy `files/workspace/.env.sandbox.example` → `workshop-app/.env.local` on the host before `sbx run`.
