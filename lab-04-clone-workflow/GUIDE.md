# Lab 4 — Step-by-step

## 0. Clone the workshop repo

```bash
git clone https://github.com/kristiyan-velkov/docker-sandbox-workshop.git
cd docker-sandbox-workshop
```

## 1. Validate workshop-app on the host

```bash
cd workshop-app
npm install
npm run dev
```

Open **http://localhost:3000** in your browser — confirm the site loads.

Stop the dev server with **Ctrl+C** before starting sandboxes.

```bash
cd ..   # back to docker-sandbox-workshop root
```

---

## Part A — Direct mode

### 2. Start sandbox (default)

From the **monorepo root** (`docker-sandbox-workshop/`):

```bash
sbx run cursor workshop-app/ --name lab4-direct
```

Direct mode mounts your working tree **read-write**. Changes the agent makes appear on the host immediately.

### 3. Agent task

> Update the hero tagline in `src/components/home-hero.tsx` to mention Docker Sandboxes. Show me the new line.

On the host, open `workshop-app/src/components/home-hero.tsx` — the edit should already be there.

### 4. Clean up direct mode

```bash
sbx rm lab4-direct --force
```

---

## Part B — Clone mode

### 5. Start sandbox with `--clone`

From the monorepo root:

```bash
sbx run --clone cursor workshop-app/ --name lab4-clone
```

Clone mode gives the agent a **private Git clone** inside the VM. Your host repo is mounted **read-only** — the host gains remote `sandbox-lab4-clone`.

### 6. Agent task

> Create branch `feat/lab4-test`. Add a one-line comment at the top of `src/lib/workshop-data.ts` noting this was edited in clone mode. Commit with message `docs: clone mode test`.

While the agent works, `git status` on the host should stay clean.

### 7. Fetch and review on the host

From the monorepo root:

```bash
git fetch sandbox-lab4-clone
git log sandbox-lab4-clone/feat/lab4-test --oneline -3
git diff main..sandbox-lab4-clone/feat/lab4-test
git status   # host tree still clean
```

### 8. Optional — check out the branch

```bash
git checkout -b feat/lab4-test sandbox-lab4-clone/feat/lab4-test
git checkout main
git branch -D feat/lab4-test
```

### 9. Clean up clone mode

```bash
sbx rm lab4-clone --force
git remote remove sandbox-lab4-clone 2>/dev/null || true
```

---

## Docker docs

| Topic | Link |
|-------|------|
| Workflow patterns | [Direct, clone, and worktree modes](https://docs.docker.com/ai/sandboxes/workflows/) |
| Clone mode | [Isolated Git clone in the VM](https://docs.docker.com/ai/sandboxes/workflows/#clone-mode) |
| Git workflows | [Fetch sandbox remotes on the host](https://docs.docker.com/ai/sandboxes/workflows/#git-workflows) |
