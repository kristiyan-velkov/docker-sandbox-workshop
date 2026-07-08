# Lab 10 — Step-by-step

Run from **repository root**.

## 1. GitHub secret on host

```bash
echo "$(gh auth token)" | sbx secret set -g github
sbx secret ls
```

## 2. Clone + kit

```bash
sbx run --clone cursor workshop-app/ \
  --kit ./my-workshop-kit \
  --name capstone
```

## 3. Agent task

> Create branch `feat/lab-10-capstone`. Update the duration string in `src/lib/workshop-data.ts`. Commit, push to origin, and run `gh pr create --title "feat: capstone lab update" --body "Lab 10 sandbox workflow"`.

Fallback if push fails:

```bash
git fetch sandbox-capstone
git checkout -b feat/lab-10-capstone sandbox-capstone/feat/lab-10-capstone
git push -u origin feat/lab-10-capstone
gh pr create --title "feat: capstone lab update" --body "Lab 10 sandbox workflow"
```

## 4. Audit

```bash
sbx policy log --limit 20
sbx exec capstone -- gh auth status
```

## 5. Clean up

```bash
sbx rm capstone --force
git remote remove sandbox-capstone 2>/dev/null || true
```

Optional:

```bash
sbx kit pack ./my-workshop-kit -o my-workshop-kit.zip
```
