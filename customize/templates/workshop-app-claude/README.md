# workshop-app-claude

Template for **Claude Code**. Base: `docker.io/docker/sandbox-templates:claude-code-docker`.

## Build & load

```bash
cd customize/templates/workshop-app-claude
docker build -t workshop-app-claude:v1 .
docker image save workshop-app-claude:v1 -o workshop-app-claude.tar
sbx template load workshop-app-claude.tar
sbx template ls
```

## Run

```bash
sbx run --template workshop-app-claude:v1 claude workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs --name workshop-ui
```

## File roles

| File | Role |
|------|------|
| `Dockerfile` | Extends `claude-code-docker`; copies skill into agent home |
| `agent/.claude/skills/workshop-app/SKILL.md` | Baked-in Claude skill |

See [SPEC-REFERENCE.md](../SPEC-REFERENCE.md).
