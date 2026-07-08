# Lab 9 — Step-by-step

Run from **repository root**. Requires `./my-workshop-kit/` from Lab 8.

## 1. Re-validate

```bash
sbx kit validate ./my-workshop-kit
sbx kit inspect ./my-workshop-kit
```

## 2. Run with your kit

```bash
sbx run --clone cursor workshop-app/ \
  --kit ./my-workshop-kit \
  --name my-kit-clone
```

## 3. Verify

```bash
sbx exec my-kit-clone -- test -d node_modules && echo "install OK"
sbx exec my-kit-clone -- test -f .claude/skills/my-workshop-kit/SKILL.md && echo "skill OK"
sbx policy log --limit 10
```

## 4. Agent smoke test

> Read `.claude/skills/my-workshop-kit/SKILL.md` and list the rules. Make a one-line comment change in `src/lib/workshop-data.ts`.

## 5. Clean up

```bash
sbx rm my-kit-clone --force
```

Compare with the official kit:

```bash
sbx kit inspect ./customize/kit/workshop-app-nextjs
sbx kit inspect ./my-workshop-kit
```
