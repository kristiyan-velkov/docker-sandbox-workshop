# Templates

Docker Sandbox [templates](https://docs.docker.com/ai/sandboxes/customize/templates/) — extend official `docker/sandbox-templates` base images.

| Template | Base | Agent | Tag |
|----------|------|-------|-----|
| [workshop-app-claude](./workshop-app-claude/) | `claude-code-docker` | `claude` | `workshop-app-claude:v1` |
| [workshop-app-cursor](./workshop-app-cursor/) | `cursor-agent-docker` | `cursor` | `workshop-app-cursor:v1` |

Pair with the [workshop-app-nextjs kit](../kit/workshop-app-nextjs/) for `npm ci` and the dev server.

**Field reference:** [SPEC-REFERENCE.md](../SPEC-REFERENCE.md)

## Build & load (copy-paste)

**Cursor:**

```bash
cd customize/templates/workshop-app-cursor
docker build -t workshop-app-cursor:v1 .
docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar
sbx template load workshop-app-cursor.tar
sbx template ls
```

**Claude:** same in `workshop-app-claude/` with tag `workshop-app-claude:v1`.

## Run from repo root

```bash
sbx run --template workshop-app-cursor:v1 cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name workshop-ui
```

Remove when done:

```bash
sbx template rm workshop-app-cursor:v1
rm -f customize/templates/workshop-app-cursor/workshop-app-cursor.tar
```

See [customize/README.md](../README.md) and [Lab 5](../../lab-05-workshop-app/).
