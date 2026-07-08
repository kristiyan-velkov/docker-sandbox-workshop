# workshop-app-cursor

Template for **Cursor**. Base: `docker.io/docker/sandbox-templates:cursor-agent-docker`.

## Build & load

```bash
cd customize/templates/workshop-app-cursor
docker build -t workshop-app-cursor:v1 .
docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar
sbx template load workshop-app-cursor.tar
sbx template ls
```

## Run

```bash
sbx run --template workshop-app-cursor:v1 cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs --name workshop-ui
```

## File roles

| File | Role |
|------|------|
| `Dockerfile` | Extends `cursor-agent-docker`; copies Next.js rule into agent home |
| `agent/.cursor/rules/nextjs-app.mdc` | Always-on Next.js App Router + sbx conventions |

See [SPEC-REFERENCE.md](../SPEC-REFERENCE.md).
