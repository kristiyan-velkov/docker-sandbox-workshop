# Lab 7 — Step-by-step

Run from **repository root**. Ensure `workshop-app/.env.local` exists.

## 1. Clone + kit

```bash
sbx run --clone cursor workshop-app/ \
  --kit ./customize/kit/workshop-app-nextjs \
  --name feature-component
```

## 2. Agent task

> Create branch `feat/lab-7-stats-card`. Add a `WorkshopStats` component in `src/components/workshop-stats.tsx` showing event, location, and duration from `workshop-data.ts` using Apple tokens. Render it on the home page below the hero. Run `npm run lint` and `npm run build`. Commit when done.

## 3. Verify inside sandbox

```bash
sbx exec feature-component -- npm run lint
sbx exec feature-component -- npm run build
sbx exec feature-component -- curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000
```

## 4. Review on host

```bash
git fetch sandbox-feature-component
git log sandbox-feature-component/feat/lab-7-stats-card --oneline -3
git diff main..sandbox-feature-component/feat/lab-7-stats-card --stat
```

## 5. Clean up

```bash
sbx rm feature-component --force
git remote remove sandbox-feature-component 2>/dev/null || true
```
