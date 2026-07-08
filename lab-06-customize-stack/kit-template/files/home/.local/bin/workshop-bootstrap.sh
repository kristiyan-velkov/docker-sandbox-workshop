#!/bin/sh
set -e
cd "${WORKDIR}"
[ ! -f package.json ] && echo "Missing package.json" >&2 && exit 1
[ ! -d node_modules ] && npm ci --no-audit --no-fund --prefer-offline
exec npm run dev -- --hostname 0.0.0.0 --port 3000
