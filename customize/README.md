# Customize — templates & kit

Workshop assets for [Docker Sandboxes customize](https://docs.docker.com/ai/sandboxes/customize/):

| Path | Type | Purpose |
|------|------|---------|
| [templates/](./templates/) | **Templates** | Docker images — `docker build` + `sbx template load` |
| [kit/](./kit/) | **Kit** | YAML mixin (`schemaVersion: "1"`) — bootstrap startup, network allow/deny |

**Repository:** [github.com/kristiyan-velkov/docker-sandbox-workshop](https://github.com/kristiyan-velkov/docker-sandbox-workshop)

## Run with kit (Lab 5)

Workspace **must** be `workshop-app/` (contains `package.json`):

```bash
cd workshop-app
cp .env.sandbox.example .env.local   # optional — platform URL defaults in code
test -f package.json && test -f package-lock.json

sbx run cursor . \
  --kit ../customize/kit/workshop-app-nextjs \
  --name lab5-kit
```

Kit-only uses the default agent image — no custom template required for Lab 5.

## Build a template (optional)

From a template folder (requires Docker Desktop):

```bash
cd customize/templates/workshop-app-cursor
docker build -t workshop-app-cursor:v1 .
docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar
sbx template load workshop-app-cursor.tar
sbx template ls
cd ../../..
```

Then stack template + kit:

```bash
cd workshop-app
sbx run --template workshop-app-cursor:v1 cursor . \
  --kit ../customize/kit/workshop-app-nextjs \
  --name workshop-ui
```

## From GitHub (no prior clone)

### Kit — direct from the repo

```bash
sbx settings set kit.allowedSources '["docker.io/","github.com/kristiyan-velkov/"]'

cd workshop-app
sbx run cursor . \
  --kit "git+https://github.com/kristiyan-velkov/docker-sandbox-workshop.git#dir=customize/kit/workshop-app-nextjs" \
  --name workshop-ui
```

## Validate the kit

```bash
sbx kit validate ./customize/kit/workshop-app-nextjs
sbx kit inspect ./customize/kit/workshop-app-nextjs
```

## Labs using customize/

| Lab | Topic |
|-----|--------|
| [lab-05-workshop-app](../lab-05-workshop-app/) | Pre-built kit + network allow/deny demo |
| [lab-06-customize-stack](../lab-06-customize-stack/) | Create your custom kit — **final lab** |

## More detail

- [SPEC-REFERENCE.md](./SPEC-REFERENCE.md) — field-by-field roles for kits and templates
- [templates/README.md](./templates/README.md) — Cursor Docker templates
- [kit/workshop-app-nextjs/README.md](./kit/workshop-app-nextjs/README.md) — Next.js kit mixin
