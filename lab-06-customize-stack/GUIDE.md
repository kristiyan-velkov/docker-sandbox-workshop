# Lab 6 — Step-by-step

From **docker-sandbox-workshop** monorepo root (Lab 4 clone). Final lab — create your custom kit.

## 1. Copy the kit template

Never edit `lab-06-customize-stack/kit-template/` in place.

```bash
cp -r lab-06-customize-stack/kit-template ./my-workshop-kit
ls my-workshop-kit/
```

You should see `spec.yaml`, `README.md`, and `files/home/` + `files/workspace/`.

## 2. Fill in spec.yaml

Open `my-workshop-kit/spec.yaml`. Edit each block:

| Block | What to set |
|-------|-------------|
| `name` / `displayName` | Your kit id — e.g. `acme-nextjs-kit` |
| `description` | Short summary for `sbx kit inspect` |
| `network.allowedDomains` | Domains your team needs (`registry.npmjs.org`, APIs, docs) |
| `network.deniedDomains` | Domains to block (`google.com`, `linkedin.com`, …) |
| `environment.variables` | Non-secret env in the VM |
| `commands.startup` | Pre-wired to `workshop-bootstrap.sh` — tweak `description` if you like |

Bootstrap script is already in `files/home/.local/bin/workshop-bootstrap.sh` — `cd ${WORKDIR}`, `npm ci`, `npm run dev :3000`.

## 3. Customize the skill

Edit `my-workshop-kit/files/workspace/.claude/skills/my-workshop-kit/SKILL.md` with your team rules. If you change `name` in `spec.yaml`, rename the skill folder to match.

## 4. Validate

```bash
sbx kit validate ./my-workshop-kit
sbx kit inspect ./my-workshop-kit
```

Fix every error before running.

## 5. Run your kit

```bash
cd workshop-app
cp .env.sandbox.example .env.local

sbx run cursor . \
  --kit ../my-workshop-kit \
  --name lab6-my-kit
```

## 6. Verify

```bash
sbx ls
sbx exec lab6-my-kit -- curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000
sbx exec lab6-my-kit -- test -f .claude/skills/my-workshop-kit/SKILL.md && echo "skill OK"
```

Agent prompt:

> Read `.claude/skills/my-workshop-kit/SKILL.md` and summarize my kit rules.

## 7. Clean up

```bash
sbx rm lab6-my-kit --force
```

Keep `./my-workshop-kit/` — reuse it on any project with `--kit ../my-workshop-kit`.

---

## Blank template reference

Starting point in `kit-template/spec.yaml`:

```yaml
schemaVersion: "1"
kind: mixin
name: my-workshop-kit
displayName: My workshop kit
description: >-
  Custom kit template for Lab 6

network:
  allowedDomains:
    - registry.npmjs.org
  deniedDomains:
    - google.com

environment:
  variables:
    NEXT_TELEMETRY_DISABLED: "1"

commands:
  startup:
    - command: [sh, /home/agent/.local/bin/workshop-bootstrap.sh]
      user: "1000"
      background: true
      description: npm ci (if needed) and Next.js dev server on :3000
```

### Block-by-block

| Block | What it does |
|-------|----------------|
| `schemaVersion: "1"` | Required. Official kit schema — [kit-reference](https://docs.docker.com/ai/sandboxes/customize/kit-reference/). |
| `kind: mixin` | Extends an existing agent (`cursor`). Use `kind: sandbox` + `sandbox:` block for a full custom agent. |
| `name` / `displayName` / `description` | Identity — `name` is the CLI identifier. |
| `network.allowedDomains` | Domains the proxy permits. |
| `network.deniedDomains` | Explicit blocks — deny wins over allow. |
| `environment.variables` | Non-secret env in the VM. |
| `files/home/` | Bootstrap script → `/home/agent/` — npm ci + dev server. |
| `commands.startup` | Runs every start; `background: true` for dev server. |
| `commands.install` | Agent/tool installs (`curl \| bash`) at create time — not `npm ci` in mounted workspaces. |
| `files/workspace/` | Static files copied into workspace — rules, skills, `.env` examples. |

Full field reference: [Kit spec reference](https://docs.docker.com/ai/sandboxes/customize/kit-reference/) · [SPEC-REFERENCE.md](../customize/SPEC-REFERENCE.md)

---

## Docker docs

| Topic | Link |
|-------|------|
| Customize | [Templates, kits, and mixins](https://docs.docker.com/ai/sandboxes/customize/) |
| Kit reference | [Kit spec reference](https://docs.docker.com/ai/sandboxes/customize/kit-reference/) |
