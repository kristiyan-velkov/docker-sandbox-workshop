# Field reference — templates & kits

How each file and field in `customize/` maps to [Docker Sandboxes customize](https://docs.docker.com/ai/sandboxes/customize/).

## Two layers

| Layer | Format | When applied | Workshop use |
|-------|--------|--------------|--------------|
| **Template** | Docker image (`Dockerfile`) | `sbx run --template TAG …` | Agent home image + baked-in agent rules/skills |
| **Kit** | YAML mixin (`spec.yaml` + `files/`) | `--kit ./path` at sandbox **create** | `npm ci`, dev server, network allow-list, workspace files |

Templates and kits stack: template customizes the **VM image**; kit customizes **runtime behavior** on every sandbox start.

---

## Kit — `spec.yaml` fields

File: [`kit/workshop-app-nextjs/spec.yaml`](./kit/workshop-app-nextjs/spec.yaml)

| Field | Role |
|-------|------|
| `schemaVersion: "2"` | Kit spec version. v2 uses `caps.network` and top-level `publishedPorts` (v1 `network.*` fields still work but warn). |
| `kind: mixin` | Extends an existing agent (`claude`, `cursor`, …). Contrast: `kind: sandbox` defines a full agent from scratch. |
| `name` | Stable kit identifier (CLI, `sbx kit inspect`). |
| `displayName` | Human label in listings. |
| `description` | Short summary for `sbx kit inspect` and docs. |
| `publishedPorts` | Inbound ports exposed from the sandbox VM. `container: 3000` matches Next.js dev; `name: next-dev` labels it in `sbx ls`. |
| `caps.network.allow` | Outbound domains the forward proxy permits. Deny-by-default outside this list. Kit rules are ignored when org governance is active. |
| `environment.variables` | Non-secret env vars inside the VM. Never put API keys here — use host `sbx secret set` + proxy injection. Do **not** set `HTTP_PROXY` / `HTTPS_PROXY` (sandbox manages those). |
| `commands.install` | Run **once** at sandbox creation (e.g. `npm ci`). `user: "1000"` runs as the `agent` user. |
| `commands.initFiles` | Files written at startup with runtime substitution (`${WORKDIR}` → synced workspace path). Used for scripts that need the live workspace path. |
| `commands.startup` | Run on **every** sandbox start; must be idempotent. `background: true` keeps the dev server running while the agent attaches. |

### Kit — `files/` tree

Static content copied into the sandbox at create/kit-add time:

| Path in repo | Target | Role |
|--------------|--------|------|
| `files/workspace/…` | Synced workspace root | Project-local files (skills, env example) — survives workspace sync |
| `files/home/…` | `/home/agent/` | Agent home dotfiles (this kit uses workspace only) |

Workshop files:

| File | Role |
|------|------|
| `files/workspace/.claude/skills/workshop-app/SKILL.md` | Claude Code skill — project conventions when editing `workshop-app/` |
| `files/workspace/.cursor/rules/*.mdc` | Cursor rules — sandbox context, project routes, Next.js, Apple design |
| `files/workspace/.env.sandbox.example` | `NEXT_PUBLIC_PLATFORM_URL` → https://nextjs-26f1-3000.prg1.zerops.app |

---

## Template — `Dockerfile` fields

Templates extend official [sandbox-templates](https://docs.docker.com/ai/sandboxes/customize/templates/) images.

### `workshop-app-claude/Dockerfile`

| Instruction | Role |
|-------------|------|
| `FROM docker.io/docker/sandbox-templates:claude-code-docker` | Base image with Claude Code, `agent` user, sandbox tooling. `--template` tag must pair with agent `claude`. |
| `USER agent` | Build/run steps as non-root agent (matches sandbox default). |
| `RUN mkdir -p …` | Ensure skill directory exists before COPY. |
| `COPY … agent/.claude/skills/…` | Bake workshop skill into **agent home** (persists across workspace sync; separate from kit workspace copy). |

### `workshop-app-cursor/Dockerfile`

| Instruction | Role |
|-------------|------|
| `FROM docker.io/docker/sandbox-templates:cursor-agent-docker` | Base image for Cursor agent. Pair with agent `cursor`. |
| `USER agent` | Non-root build context. |
| `RUN mkdir -p /home/agent/.cursor/rules` | Cursor rules directory. |
| `COPY … agent/.cursor/rules/nextjs-app.mdc` | Baked-in Next.js App Router rule for sandbox development. |

### Template — `agent/` sources

| File | Role |
|------|------|
| `agent/.claude/skills/workshop-app/SKILL.md` | Source copied into Claude template image (`/home/agent/.claude/skills/…`). |
| `agent/.cursor/rules/nextjs-app.mdc` | Next.js App Router rule copied into Cursor template image. |

### Template — build & load commands

Run from each template directory (requires Docker Desktop on the host):

| Step | Command | Role |
|------|---------|------|
| Build | `docker build -t workshop-app-cursor:v1 .` | Produce customized image from `Dockerfile` |
| Export | `docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar` | Tarball format for `sbx template load` |
| Load | `sbx template load workshop-app-cursor.tar` | Register with sbx for `--template` |
| Verify | `sbx template ls` | Confirm tag is available |

---

## How template + kit divide responsibility

```text
┌─────────────────────────────────────────────────────────────┐
│  Template (Docker image)                                     │
│  • Official agent runtime (Claude / Cursor)                    │
│  • Agent-home skill or rule (baked at docker build)           │
└─────────────────────────────────────────────────────────────┘
                              +
┌─────────────────────────────────────────────────────────────┐
│  Kit mixin (spec.yaml)                                       │
│  • npm ci + Next.js dev server startup                       │
│  • Network allow-list (npm, docs, …)                         │
│  • publishedPorts :3000                                      │
│  • Workspace skill + Cursor rules + .env.sandbox.example     │
└─────────────────────────────────────────────────────────────┘
                              =
        sbx run --template workshop-app-cursor:v1 cursor … \
          --kit ./customize/kit/workshop-app-nextjs
```

**Why both skill/rule locations?** The template bakes Claude skills or Cursor rules into agent home when using `--template workshop-app-claude:v1` or `workshop-app-cursor:v1`. The kit also drops workspace copies so `sbx run cursor … --kit …` (default template) still gets project guidance without a custom template.

---

## Docs links

- [Kits](https://docs.docker.com/ai/sandboxes/customize/kits/)
- [Templates](https://docs.docker.com/ai/sandboxes/customize/templates/)
- [Kit spec reference](https://docs.docker.com/ai/sandboxes/customize/kits/kit-reference/)
