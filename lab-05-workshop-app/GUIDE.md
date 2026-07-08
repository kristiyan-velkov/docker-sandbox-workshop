# Lab 5 — Step-by-step

Use your **Lab 4 clone** — only download if missing.

## 0. Repo

```bash
cd docker-sandbox-workshop
# missing? → git clone https://github.com/kristiyan-velkov/docker-sandbox-workshop.git && cd docker-sandbox-workshop
```

## 1. Env on the host

```bash
cd workshop-app
cp .env.sandbox.example .env.local
```

`.env.local` should contain:

```bash
NEXT_PUBLIC_PLATFORM_URL=https://nextjs-26f1-3000.prg1.zerops.app
```

## 2. Preflight — package files

Kit `npm ci` requires `package.json` and `package-lock.json` at the **workspace root**:

```bash
test -f package.json && test -f package-lock.json && echo OK
# missing lockfile? → npm install on host, then retry
```

## 3. Run with kit

Workspace must be **`workshop-app/`** (folder with `package.json`):

```bash
cd workshop-app
sbx run cursor . \
  --kit ../customize/kit/workshop-app-nextjs \
  --name lab5-kit
```

> **Root cause of past `npm ci` failures:** `commands.install` runs **before** the workspace is mounted. The kit uses `files/home/.local/bin/workshop-bootstrap.sh` + `commands.startup` with `${WORKDIR}`. Pull the latest kit if you still have `commands.install` or inline `initFiles` script.

Wait ~1 min for bootstrap (`npm ci` + dev server on first run).

Kit network policy (`../customize/kit/workshop-app-nextjs/spec.yaml`):

| | Domains |
|---|---------|
| allow | `registry.npmjs.org`, `dockerfrontend.com`, `kristiyanvelkov.com`, `leanpub.com` |
| deny | `google.com`, `linkedin.com` |

## 4. Agent — allowed research

> Research Kristiyan Velkov — read kristiyanvelkov.com for bio and books, check leanpub.com for publications. Summarize what you find.

## 5. Agent — denied sites

> Search Google for Kristiyan Velkov and fetch LinkedIn profile info. Report what worked and what failed.

```bash
sbx policy log lab5-kit --limit 15
```

## 6. Agent — inspect kit

> What did the workshop-app-nextjs kit add to this workspace? List `.cursor/rules/` and `.claude/skills/` files. Summarize `network.allowedDomains` and `commands.startup` from the kit spec.yaml.

```bash
sbx ls
sbx exec lab5-kit -- curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000
sbx exec lab5-kit -- ls -la .cursor/rules/
```

Expected: `200`.

## 7. Clean up

```bash
sbx rm lab5-kit --force
```

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `npm ci` EUSAGE (no lockfile) | Kit uses `files/home/` bootstrap + `startup`, not `commands.install`. Pull latest kit. |
| `ENOENT` package.json | Workspace must be `workshop-app/` (contains `package.json`). |
| `invalid container name "lab5-kit."` | No trailing `.` in `--name` |
| `sandbox not found` on `sbx rm` | Create failed — fix install error first |

---

## Docker docs

| Topic | Link |
|-------|------|
| Customize | [Templates, kits, and mixins](https://docs.docker.com/ai/sandboxes/customize/) |
| Kits | [Declarative runtime mixins](https://docs.docker.com/ai/sandboxes/customize/kits/) |
