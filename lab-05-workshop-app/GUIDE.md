# Lab 5 — Step-by-step

Run from **repository root**.

## 1. Env on the host

```bash
cp workshop-app/.env.example workshop-app/.env.local
# Optional — defaults to https://nextjs-26f1-3000.prg1.zerops.app if unset
```

## 2. Build Cursor template (once per machine)

Requires Docker Desktop:

```bash
cd customize/templates/workshop-app-cursor
docker build -t workshop-app-cursor:v1 .
docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar
sbx template load workshop-app-cursor.tar
sbx template ls
cd ../../..
```

## 3. Run template + kit

```bash
sbx run --template workshop-app-cursor:v1 cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name workshop-ui
```

Kit-only shortcut (skip step 2):

```bash
sbx run cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name workshop-ui
```

## 4. Verify (second terminal)

```bash
sbx ls
sbx exec workshop-ui -- test -d node_modules && echo "deps OK"
sbx exec workshop-ui -- curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000
sbx policy log --limit 10
```

## 5. Clean up

```bash
sbx rm workshop-ui --force
```
