# Lab 6 — Step-by-step

Run from **repository root**.

## 1. Inspect the workshop kit

```bash
sbx kit validate ./customize/kit/workshop-app-nextjs
sbx kit inspect ./customize/kit/workshop-app-nextjs
```

## 2. Build template + run full stack

```bash
cd customize/templates/workshop-app-cursor
docker build -t workshop-app-cursor:v1 .
docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar
sbx template load workshop-app-cursor.tar
cd ../../..

sbx run --template workshop-app-cursor:v1 cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name customize-stack
```

## 3. Verify each layer

```bash
sbx exec customize-stack -- test -d node_modules && echo "kit install OK"
sbx exec customize-stack -- curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000
sbx exec customize-stack -- test -f .claude/skills/workshop-app/SKILL.md && echo "workspace skill OK"
sbx exec customize-stack -- test -f /home/agent/.cursor/rules/sandbox-workshop.mdc && echo "template rule OK"
```

Ask the agent:

> Read `.claude/skills/workshop-app/SKILL.md` and summarize the build gate rules.

## 4. kit add on existing sandbox

```bash
sbx create shell workshop-app/ --name kit-add-demo -q
sbx kit add kit-add-demo ./customize/kit/workshop-app-nextjs
sbx exec kit-add-demo -- test -d node_modules && echo "kit add OK"
sbx rm kit-add-demo customize-stack --force
```
