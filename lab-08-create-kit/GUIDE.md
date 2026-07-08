# Lab 8 — Step-by-step

Run from **repository root**.

## 1. Copy starter kit

```bash
cp -r lab-08-create-kit/starter-kit ./my-workshop-kit
```

## 2. Edit spec.yaml

Open `./my-workshop-kit/spec.yaml` — change `name`, `displayName`, `agentContext`, `caps.network.allow`, and `commands.install`.

> Never put secrets in `environment.variables`. Do not set `HTTP_PROXY`.

## 3. Validate and inspect

```bash
sbx kit validate ./my-workshop-kit
sbx kit inspect ./my-workshop-kit
```

## 4. Pack for sharing

```bash
sbx kit pack ./my-workshop-kit -o my-workshop-kit.zip
sbx kit inspect my-workshop-kit.zip
```

## 5. Dry-run

```bash
sbx create shell workshop-app/ --name kit-validate -q
sbx kit add kit-validate ./my-workshop-kit
sbx exec kit-validate -- test -f .claude/skills/my-workshop-kit/SKILL.md && echo "skill copied"
sbx rm kit-validate --force
```
