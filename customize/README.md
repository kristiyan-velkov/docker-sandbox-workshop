# Customize — templates & kit

Workshop assets for [Docker Sandboxes customize](https://docs.docker.com/ai/sandboxes/customize/):

| Path | Type | Purpose |
|------|------|---------|
| [templates/](./templates/) | **Templates** | Docker images — `docker build` + `sbx template load` |
| [kit/](./kit/) | **Kit** | YAML mixin (`schemaVersion: "2"`) — `npm ci`, dev server, `caps.network.allow` |

**Repository:** [github.com/kristiyan-velkov/docker-sandbox-workshop](https://github.com/kristiyan-velkov/docker-sandbox-workshop)

## Build a template (no shell scripts)

From a template folder (requires Docker Desktop):

```bash
cd customize/templates/workshop-app-cursor
docker build -t workshop-app-cursor:v1 .
docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar
sbx template load workshop-app-cursor.tar
sbx template ls
cd ../../..
```

Claude: same steps in `workshop-app-claude/` with tag `workshop-app-claude:v1`.

## Quick start (local clone)

```bash
# After building the template (above):
sbx run --template workshop-app-cursor:v1 cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name workshop-ui
```

Kit only (default agent image):

```bash
sbx run cursor workshop-app/ --kit ./customize/kit/workshop-app-nextjs --name workshop-ui
```

## From GitHub (no prior clone)

### Kit — direct from the repo

```bash
sbx settings set kit.allowedSources '["docker.io/","github.com/kristiyan-velkov/"]'

sbx run cursor workshop-app/ \
  --kit "git+https://github.com/kristiyan-velkov/docker-sandbox-workshop.git#dir=customize/kit/workshop-app-nextjs" \
  --name workshop-ui
```

### Templates — clone, build, then run

```bash
git clone --depth 1 https://github.com/kristiyan-velkov/docker-sandbox-workshop.git
cd docker-sandbox-workshop/customize/templates/workshop-app-cursor
docker build -t workshop-app-cursor:v1 .
docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar
sbx template load workshop-app-cursor.tar
```

## Validate the kit

```bash
sbx kit validate ./customize/kit/workshop-app-nextjs
sbx kit inspect ./customize/kit/workshop-app-nextjs
```

## Labs using customize/

| Lab | Topic |
|-----|--------|
| [lab-05-workshop-app](../lab-05-workshop-app/) | Template + kit for workshop-app |
| [lab-06-customize-stack](../lab-06-customize-stack/) | Stack templates, kits, skills |
| [lab-08-create-kit](../lab-08-create-kit/) | Build your own kit |
| [lab-09-use-custom-kit](../lab-09-use-custom-kit/) | Run with your kit |

## More detail

- [SPEC-REFERENCE.md](./SPEC-REFERENCE.md) — field-by-field roles for kits and templates
- [templates/README.md](./templates/README.md) — Claude & Cursor Docker templates
- [kit/workshop-app-nextjs/README.md](./kit/workshop-app-nextjs/README.md) — Next.js kit mixin
