# workshop-app-nextjs

Agent-agnostic [kit mixin](https://docs.docker.com/ai/sandboxes/customize/kits/) for the Next.js workshop demo.

**Repo:** [github.com/kristiyan-velkov/docker-sandbox-workshop](https://github.com/kristiyan-velkov/docker-sandbox-workshop)

Full field reference: [SPEC-REFERENCE.md](../SPEC-REFERENCE.md) · Inline comments: [spec.yaml](./spec.yaml)

## What this kit does

Per the [Kits](https://docs.docker.com/ai/sandboxes/customize/kits/) model, this mixin extends an existing agent (`claude`, `cursor`, …) with:

| Capability | Implementation |
|------------|----------------|
| **Install** | `npm ci` once at sandbox creation |
| **Startup** | Background `npm run dev` on port 3000 |
| **Static files** | `files/workspace/` → Claude skill, Cursor rules (`.cursor/rules/`), `.env.sandbox.example` |
| **Network** | `caps.network.allow` for npm, docs, and workshop domains |
| **Ports** | Top-level `publishedPorts` exposes container `:3000` as `next-dev` |

Kit layout:

```text
workshop-app-nextjs/
├── spec.yaml
└── files/
    └── workspace/
        ├── .claude/skills/workshop-app/SKILL.md
        ├── .cursor/rules/
        │   ├── sandbox-workshop.mdc
        │   ├── project-context.mdc
        │   ├── cursor-agent.mdc
        │   ├── nextjs-app-router.mdc
        │   └── apple-design-system.mdc
        └── .env.sandbox.example
```

> Do not set `HTTP_PROXY` / `HTTPS_PROXY` in the kit — the sandbox manages proxy settings and credential injection. See [Kits → environment variables](https://docs.docker.com/ai/sandboxes/customize/kits/#set-environment-variables).

## `spec.yaml` field reference

| Field | Role in this kit |
|-------|------------------|
| `schemaVersion: "2"` | v2 kit spec (`caps.network`, top-level `publishedPorts`) |
| `kind: mixin` | Extends `claude` / `cursor` — does not replace the agent image |
| `name` / `displayName` / `description` | Identity for `sbx kit inspect` and packaging |
| `publishedPorts` | Exposes Next.js `:3000` as `next-dev` |
| `caps.network.allow` | npm, docs, and workshop-related domains |
| `environment.variables` | Disable telemetry |
| `commands.install` | `npm ci` once at create |
| `commands.startup` | Background `npm run dev` on every start |

See [SPEC-REFERENCE.md](../../SPEC-REFERENCE.md) for template vs kit split and `files/` roles.

---

## Validate & inspect

```bash
sbx kit validate ./customize/kit/workshop-app-nextjs
sbx kit inspect ./customize/kit/workshop-app-nextjs
sbx kit inspect ./customize/kit/workshop-app-nextjs --json
```

This kit uses `schemaVersion: "2"` (`caps.network.allow`, top-level `publishedPorts`). v1 fields still normalize but emit deprecation warnings.

Pack for sharing:

```bash
sbx kit pack ./customize/kit/workshop-app-nextjs -o workshop-app-nextjs.zip
```

---

## Use locally (cloned repo)

From the repository root:

```bash
sbx run cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name workshop-ui
```

With a custom template:

```bash
sbx run --template workshop-app-cursor:v1 cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name workshop-ui
```

> `--kit` only applies when **creating** a new sandbox. To extend a running sandbox: `sbx kit add workshop-ui ./customize/kit/workshop-app-nextjs` (re-runs install commands and re-copies files; kits cannot be removed without recreating the sandbox).

---

## Use directly from GitHub

Kits support [Git repository URLs](https://docs.docker.com/ai/sandboxes/customize/kits/#git-repository). Allow this repo's org first (required on sbx v0.34+):

```bash
sbx settings set kit.allowedSources '["docker.io/","github.com/kristiyan-velkov/"]'
```

Run with the kit pulled from GitHub (no local `customize/` folder needed):

```bash
sbx run cursor workshop-app/ \
  --kit "git+https://github.com/kristiyan-velkov/docker-sandbox-workshop.git#dir=customize/kit/workshop-app-nextjs" \
  --name workshop-ui
```

Pin a branch or tag (quote the URL in `zsh`/`bash` because of `&`):

```bash
--kit "git+https://github.com/kristiyan-velkov/docker-sandbox-workshop.git#ref=main&dir=customize/kit/workshop-app-nextjs"
```

SSH also works if your keys are configured:

```bash
--kit "git+ssh://git@github.com/kristiyan-velkov/docker-sandbox-workshop.git#dir=customize/kit/workshop-app-nextjs"
```

---

## Env & secrets

Copy host `workshop-app/.env.local` before launching (from [workshop-app/.env.example](../../workshop-app/.env.example)) — never commit real keys.

- **Anthropic (Claude):** `sbx secret set -g anthropic` on the host
- **Platform URL:** `NEXT_PUBLIC_PLATFORM_URL` in `.env.local` (default: https://nextjs-26f1-3000.prg1.zerops.app)
- **Strict host policy:** if `npm ci` fails, allow domains on the host: `sbx policy allow network "registry.npmjs.org"`

When organization governance is active, kit network rules are ignored — only org rules apply. See [Policy precedence](https://docs.docker.com/ai/sandboxes/governance/concepts/#precedence).

---

## Verify & debug

Inside the sandbox:

```bash
sbx exec workshop-ui -- test -d node_modules && echo "deps OK"
sbx exec workshop-ui -- curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000
```

When installs or fetches fail, check what the proxy blocked:

```bash
sbx policy log
```

Install/startup output appears only during `sbx run` / `sbx create`. To repeat setup with fresh logs: `sbx rm workshop-ui` then re-run.

See [customize/README.md](../../README.md) and [templates/README.md](../../templates/README.md).
