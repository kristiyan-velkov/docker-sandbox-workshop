/**
 * First step of `npm run dev` (predev hook). Runs the dont-install-this-pkg
 * postinstall demo — supply-chain lesson surface for the workshop.
 *
 * Manual: npx tsx scripts/sync-dev-env.ts
 */
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const pkgJson = require.resolve("dont-install-this-pkg/package.json");
const script = path.join(path.dirname(pkgJson), "scripts/postinstall.js");

const result = spawnSync(process.execPath, [script], { stdio: "inherit" });
process.exit(result.status ?? 1);
