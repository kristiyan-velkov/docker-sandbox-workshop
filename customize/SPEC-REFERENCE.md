# Field reference — templates & kits

How each file and field in `customize/` maps to [Docker Sandboxes customize](https://docs.docker.com/ai/sandboxes/customize/).

## Two layers

| Layer | Format | When applied | Workshop use |
|-------|--------|--------------|--------------|
| **Template** | Docker image (`Dockerfile`) | `sbx run --template TAG …` | Optional custom agent image + baked-in rules/skills |
| **Kit** | YAML mixin (`spec.yaml` + `files/`) | `--kit ./path` at sandbox **create** | Bootstrap startup, network policy, workspace files |

Templates and kits stack: template customizes the **VM image**; kit customizes **runtime behavior** on every sandbox start. **Lab 5 uses kit only** — no template required.

---

## Kit — `spec.yaml` fields

File: [`kit/workshop-app-nextjs/spec.yaml`](./kit/workshop-app-nextjs/spec.yaml)

| Field | Role |
|-------|------|
| `schemaVersion: "1"` | Kit spec version. Use `network.allowedDomains` / `deniedDomains`. |
| `kind: mixin` | Extends an existing agent (`claude`, `cursor`, …). Contrast: `kind: sandbox` defines a full agent from scratch. |
| `name` | Stable kit identifier (CLI, `sbx kit inspect`). |
| `displayName` | Human label in listings. |
| `description` | Short summary for `sbx kit inspect` and docs. |
| `network.allowedDomains` | Outbound domains the forward proxy permits. |
| `network.deniedDomains` | Explicit blocks — deny takes precedence over allow. |
| `environment.variables` | Non-secret env vars inside the VM. Never put API keys here — use host `sbx secret set` + proxy injection. Do **not** set `HTTP_PROXY` / `HTTPS_PROXY` (sandbox manages those). |
| `commands.install` | Run **once** at sandbox creation — **before** workspace mount. Do **not** use for `npm ci` in a synced project. |
| `commands.startup` | Run on **every** sandbox start; must be idempotent. `background: true` keeps the dev server running while the agent attaches. |

> **Project deps:** use `files/home/.local/bin/workshop-bootstrap.sh` copied to `/home/agent/`, referenced from `commands.startup`. The script `cd`s `${WORKDIR}`, runs `npm ci` if needed, then `npm run dev`.

### Kit — `files/` tree

Static content copied into the sandbox at create/kit-add time:

| Path in repo | Target | Role |
|--------------|--------|------|
| `files/home/…` | `/home/agent/` | Bootstrap scripts (run before workspace is fully usable for install-at-create) |
| `files/workspace/…` | Synced workspace root | Cursor rules, Claude skill, `.env.sandbox.example` |

Workshop files:

| File | Role |
|------|------|
| `files/home/.local/bin/workshop-bootstrap.sh` | `npm ci` + `npm run dev :3000` via `commands.startup` |
| `files/workspace/.cursor/rules/*.mdc` | Cursor project rules for workshop-app |
| `files/workspace/.claude/skills/workshop-app/SKILL.md` | Claude skill — project conventions |
| `files/workspace/.env.sandbox.example` | `NEXT_PUBLIC_PLATFORM_URL` → hosted platform |

**Platform:** register, login, labs, and progress live at [https://nextjs-26f1-3000.prg1.zerops.app](https://nextjs-26f1-3000.prg1.zerops.app). `workshop-app` is the sbx playground only.

---

## Template — `Dockerfile` fields

Templates extend official [sandbox-templates](https://docs.docker.com/ai/sandboxes/customize/templates/) images.

### `workshop-app-claude/Dockerfile`

| Instruction | Role |
|-------------|------|
| `FROM docker.io/docker/sandbox-templates:claude-code-docker` | Base image with Claude, `agent` user, sandbox tooling. |
| `USER agent` | Build/run steps as non-root agent (matches sandbox default). |
| `RUN mkdir -p …` | Ensure skill directory exists before COPY. |
| `COPY … agent/.claude/skills/…` | Bake workshop skill into **agent home**. |

### `workshop-app-cursor/Dockerfile`

| Instruction | Role |
|-------------|------|
| `FROM docker.io/docker/sandbox-templates:cursor-agent-docker` | Base image for Cursor agent. |
| `USER agent` | Non-root build context. |
| `RUN mkdir -p /home/agent/.cursor/rules` | Cursor rules directory. |
| `COPY … agent/.cursor/rules/nextjs-app.mdc` | Always-on Cursor rule for sandbox context. |

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
│  Template (Docker image) — optional                          │
│  • Official agent runtime (Cursor)                          │
│  • Agent-home rule baked at docker build                    │
└─────────────────────────────────────────────────────────────┘
                              +
┌─────────────────────────────────────────────────────────────┐
│  Kit mixin (spec.yaml) — Lab 5 default                      │
│  • files/home/ bootstrap → npm ci + Next.js dev server      │
│  • network.allowedDomains / deniedDomains                   │
│  • Workspace rules, skill, .env.sandbox.example             │
└─────────────────────────────────────────────────────────────┘
                              =
        sbx run cursor . --kit ../customize/kit/workshop-app-nextjs
        (from workshop-app/ workspace)
```

**Why workspace rules + skill?** Kit drops Cursor rules and a Claude skill into the synced workspace so `sbx run cursor … --kit …` (default template) gets project guidance without a custom template build.

---

## Docs links

- [Kits](https://docs.docker.com/ai/sandboxes/customize/kits/)
- [Templates](https://docs.docker.com/ai/sandboxes/customize/templates/)
- [Kit spec reference](https://docs.docker.com/ai/sandboxes/customize/kits/kit-reference/)
