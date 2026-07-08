# Docker Sandbox Workshop

Hands-on labs and demo app — run AI agents safely with [Docker Sandboxes](https://docs.docker.com/ai/sandboxes/) (`sbx` CLI).

## What's included

| Path | Description |
|------|-------------|
| [lab-01-first-sandbox](./lab-01-first-sandbox/) | Install, run, inspect, clean up |
| [lab-02-network-policy](./lab-02-network-policy/) | Network policy — deny, allow, inspect, remove rules |
| [lab-03-secrets](./lab-03-secrets/) | Credential injection & security |
| [lab-04-clone-workflow](./lab-04-clone-workflow/) | Direct & clone mode on the workshop app |
| [lab-05-workshop-app](./lab-05-workshop-app/) | Run workshop-app with the pre-built kit |
| [lab-06-customize-stack](./lab-06-customize-stack/) | Create your custom kit — **final lab** |
| [workshop-landing](./workshop-landing/) | Conference landing (Zerops) — links & redirects to platform |
| [workshop-app](./workshop-app/) | Next.js demo — sbx workspace for labs 4–6 |
| [docker-sandbox-platform](./docker-sandbox-platform/) | Hosted register, login, lab progress, Q&A |
| [customize/](./customize/) | Sandbox templates & kit mixin |
| [AGENTS.md](./AGENTS.md) | Agent rules for Cursor |

## Prerequisites

- macOS, Linux (KVM), or Windows 11
- [Docker Sandboxes (`sbx`)](https://docs.docker.com/ai/sandboxes/get-started/)
- Docker Desktop (for custom templates in labs 5+)
- Cursor account with an API key stored via `sbx secret set -g cursor` (see [Lab 1](./lab-01-first-sandbox/GUIDE.md) step 3)

```bash
brew trust docker/tap
brew install docker/tap/sbx
sbx version
sbx login
sbx secret set -g cursor
```

## Quick start — core labs (1–3)

```bash
cd lab-01-first-sandbox
cat README.md    # overview → open GUIDE.md for commands
cd workspace
sbx run cursor . --name my-sandbox
```

## Quick start — workshop-app with kit (Lab 5)

Reuse your Lab 4 clone. See [Lab 5](./lab-05-workshop-app/).

```bash
cd docker-sandbox-workshop
cp workshop-app/.env.sandbox.example workshop-app/.env.local
cd workshop-app
test -f package.json && test -f package-lock.json

sbx run cursor . --kit ../customize/kit/workshop-app-nextjs --name lab5-kit
# Agent: research Kristiyan Velkov on kristiyanvelkov.com (allowed), try Google (denied)
sbx policy log lab5-kit --limit 15
```

## Create your own kit (Lab 6)

See [Lab 6](./lab-06-customize-stack/).

```bash
cp -r lab-06-customize-stack/kit-template ./my-workshop-kit
# Fill in spec.yaml — name, network, env
sbx kit validate ./my-workshop-kit
cd workshop-app
sbx run cursor . --kit ../my-workshop-kit --name lab6-my-kit
```

## Live demo — direct & clone mode (Lab 4)

Clone [docker-sandbox-workshop](https://github.com/kristiyan-velkov/docker-sandbox-workshop), validate locally, then compare direct and clone mode from the **repo root**.

```bash
git clone https://github.com/kristiyan-velkov/docker-sandbox-workshop.git
cd docker-sandbox-workshop/workshop-app
npm install && npm run dev   # http://localhost:3000 — Ctrl+C when done
cd ..

# Direct mode — workshop-app/ workspace; edits appear on host immediately
sbx run cursor workshop-app/ --name lab4-direct
sbx rm lab4-direct --force

# Clone mode — . at repo root (--clone requires Git root)
sbx run --clone cursor . --name lab4-clone
git fetch sandbox-lab4-clone
git checkout -b feat/lab4-test sandbox-lab4-clone/feat/lab4-test
git push -u origin feat/lab4-test
```

See [customize/README.md](./customize/README.md) and [customize/SPEC-REFERENCE.md](./customize/SPEC-REFERENCE.md).
