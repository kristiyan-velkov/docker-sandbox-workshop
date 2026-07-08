# Lab 2 — Network Policy

**Time:** ~35 min  
**Workspace:** [`workspace/`](./workspace/) (synced into the VM)

**Goal:** Initialize global balanced policy on the host, start Cursor in a sandbox, prove deny-by-default networking, allow `www.dockerfrontend.com`, inspect rules, revoke access with sandbox-scoped deny, and clean up.

→ **[GUIDE.md](./GUIDE.md)** — numbered step-by-step commands

---

## Why this lab matters

YOLO agents need network access — but unrestricted outbound traffic is how supply-chain attacks and data exfiltration happen. Sandboxes route HTTP(S) through a **host-side proxy** with an allow-list. You will ask Cursor to curl `www.dockerfrontend.com`, inspect the response, confirm policy blocks it by default, allow that host, then block it again for this sandbox only with `--sandbox`.

---

## Key concepts

| Concept | What it means in this lab |
|---------|---------------------------|
| `sbx run cursor .` | Boot microVM, sync workspace, start Cursor |
| `sbx policy init balanced` | Global allow-list posture — run on the host **before** starting the sandbox |
| `sbx policy reset` | Clear global policy so you can run `init` again if already initialized |
| `sbx policy allow network` | Explicitly permit outbound HTTPS to a host |
| `sbx policy deny network --sandbox` | Block outbound to a host for **one sandbox** — e.g. `sbx policy deny network --sandbox lab2 ads.example.com` |
| `sbx policy log <sandbox>` | Traffic audit — HOST, PROXY, RULE — validates blocked/allowed requests (no rule IDs) |
| `sbx policy ls --type network <sandbox>` | Rule definitions — UUID in **POLICY/RULE** column for user-added rules |
| `sbx policy rm network --id` | Remove a rule by UUID from `sbx policy ls` — required before changing allow/deny |
| `sbx policy rm network --resource` | Remove a rule by hostname — alternative to `--id` |

---

## Prerequisites

- Lab 1 complete (comfortable with `sbx run`, `sbx secret set -g cursor`, and `sbx rm`)
- Run the agent from `lab-02-network-policy/workspace/`

---

## What you'll do

1. Initialize global balanced policy on the host (`sbx policy init balanced`; use `sbx policy reset` first if already initialized)
2. Start Cursor from `workspace/` with `--name lab2`
3. Ask Cursor to curl `www.dockerfrontend.com` — blocked; validate with `sbx policy log`
4. Allow `www.dockerfrontend.com`; ask Cursor to curl again and show more about the book; check the log
5. Ask the agent to list Docker books on the site with titles and descriptions
6. Inspect policy with `sbx policy ls lab2`
7. Deny `www.dockerfrontend.com` for `lab2` only with `sbx policy deny network --sandbox lab2 …`
8. Remove network rules and tear down

**Success looks like:** Cursor shows blocked and allowed responses; `sbx policy log` confirms each block and allow for `www.dockerfrontend.com`; sandbox-scoped deny blocks the host again for `lab2` only.

---

## Folder layout

| Path | Purpose |
|------|---------|
| [GUIDE.md](./GUIDE.md) | Copy-paste walkthrough |
| [workspace/](./workspace/) | Sandbox workspace mount |

## Docker docs

| Topic | Link |
|-------|------|
| Network policy | [Local governance and allow-lists](https://docs.docker.com/ai/sandboxes/governance/local/) |
| Security | [Sandbox security model](https://docs.docker.com/ai/sandboxes/security/) |
| CLI reference | [sbx policy commands](https://docs.docker.com/reference/cli/sbx/) |

## See also

| Resource | Purpose |
|----------|---------|
| [Lab 1](../lab-01-first-sandbox/) | First sandbox workflow |
| [Lab 3](../lab-03-secrets/) | Credential proxy (complements network policy) |

## Takeaway

Network is **deny-by-default** with an allow-list enforced by a host-side proxy. Use `sbx policy log` to audit traffic and `sbx policy ls --type network` to find rule UUIDs (in the POLICY/RULE column). Rules are not updated in place — remove with `sbx policy rm network --id <uuid>` or `--resource <host>`, then apply the new rule.
