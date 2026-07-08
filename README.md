# Docker Sandbox Workshop

Hands-on labs and demo app for **WeAreDevelopers World Congress · Berlin** — run AI agents safely with [Docker Sandboxes](https://docs.docker.com/ai/sandboxes/) (`sbx` CLI).

## What's included

| Path | Description |
|------|-------------|
| [lab-01-first-sandbox](./lab-01-first-sandbox/) | Install, run, inspect, clean up |
| [lab-02-network-policy](./lab-02-network-policy/) | Network policy, custom template, clone preview |
| [lab-03-secrets](./lab-03-secrets/) | Credential injection & security |
| [lab-04-clone-workflow](./lab-04-clone-workflow/) | Clone mode — commit on test branch, fetch on host |
| [lab-05-workshop-app](./lab-05-workshop-app/) | Run platform app with template + kit |
| [lab-06-customize-stack](./lab-06-customize-stack/) | Stack templates, kits, agent skills |
| [lab-07-build-component](./lab-07-build-component/) | Agent builds a new UI component |
| [lab-08-create-kit](./lab-08-create-kit/) | Create and validate your own kit |
| [lab-09-use-custom-kit](./lab-09-use-custom-kit/) | Run platform with your kit |
| [lab-10-capstone](./lab-10-capstone/) | GitHub secret + clone + PR workflow |
| [workshop-landing](./workshop-landing/) | Conference landing (Zerops) — links & redirects to platform |
| [workshop-app](./workshop-app/) | Next.js demo — sbx workspace for labs 4–10 |
| [docker-sandbox-platform](./docker-sandbox-platform/) | Hosted register, login, lab progress, Q&A — [nextjs-26f1-3000.prg1.zerops.app](https://nextjs-26f1-3000.prg1.zerops.app/) |
| [customize/](./customize/) | Sandbox templates & kit mixin |
| [AGENTS.md](./AGENTS.md) | Agent rules for Cursor / Claude Code |

## Prerequisites

- macOS, Linux (KVM), or Windows 11
- [Docker Sandboxes (`sbx`)](https://docs.docker.com/ai/sandboxes/get-started/)
- Docker Desktop (for custom templates in labs 5+)
- Anthropic key or Claude subscription (Claude Code)

```bash
brew install docker/tap/sbx   # macOS
sbx version && sbx login
```

## Quick start — core labs (1–3)

```bash
cd lab-01-first-sandbox
cat README.md    # overview → open GUIDE.md for commands
cd workspace
sbx run claude . --name my-sandbox
```

## Quick start — platform app in sbx

See [workshop-app/README.md](./workshop-app/README.md) and [Lab 5](./lab-05-workshop-app/).

```bash
cd customize/templates/workshop-app-cursor
docker build -t workshop-app-cursor:v1 .
docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar
sbx template load workshop-app-cursor.tar
cd ../..

sbx run --template workshop-app-cursor:v1 cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs --name workshop-ui
```

## Live demo — clone mode (Lab 4)

[Workflow patterns — Clone mode](https://docs.docker.com/ai/sandboxes/workflows/#clone-mode)

```bash
sbx run --clone cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs --name workshop-clone
# agent commits on feat/workshop-test → git fetch sandbox-workshop-clone
```

See [customize/README.md](./customize/README.md) and [customize/SPEC-REFERENCE.md](./customize/SPEC-REFERENCE.md).
