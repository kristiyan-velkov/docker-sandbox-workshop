# Lab 3 — Secrets · Security

**Time:** ~20 min  
**Workspace:** [`workspace/`](./workspace/) (empty folder synced into the VM)

**Goal:** Store a GitHub token on the host, prove the VM only sees a sentinel value, and confirm the proxy still injects the real token for API calls.

→ **[GUIDE.md](./GUIDE.md)** — step-by-step commands

---

## Why this lab matters

Agents need tokens to work — but putting credentials in a Dockerfile, `.env` committed to git, or inside the VM filesystem is how workshops become breach demos. Sandboxes use a **credential proxy**: the VM receives a sentinel placeholder, and the host overwrites the auth header on outbound HTTPS to allowed domains.

You will pipe your GitHub CLI token to `sbx secret set -g github`, echo `$GH_TOKEN` inside the VM, and make a live API call through the proxy — without your real `ghp_…` or `gho_…` token ever appearing in the sandbox.

---

## Key concepts

| Concept | What it means in this lab |
|---------|---------------------------|
| `sbx secret set -g github` | Store GitHub token in OS keychain; available to future sandboxes |
| `GH_TOKEN` | Environment variable the proxy sets in the VM (GITHUB_TOKEN is usually unset) |
| `gho_sbxproxymanaged…` | Sentinel placeholder shaped like a token — not your real `gho_…` value |
| Credential proxy | Host injects real token on outbound requests to `api.github.com` |
| Live API check | `curl` to GitHub API from inside the VM — run via `sbx exec`, not on host |

---

## Prerequisites

- Labs 1–2 complete (or familiar with `sbx run cursor` and `sbx exec`)
- **gh CLI** logged in (`gh auth status`)
- **Cursor API key** from Lab 1 (`sbx secret set -g cursor`) — needed to run the agent
- Never commit tokens to this repo

---

## What you'll do

1. `echo "$(gh auth token)" | sbx secret set -g github` on the host **before** starting the sandbox
2. Start Cursor from `workspace/` with `sbx run cursor . --name lab3`
3. `sbx exec lab3 -- bash -c 'echo $GH_TOKEN'` → `gho_sbxproxymanaged…` (GITHUB_TOKEN usually unset)
4. `curl` the GitHub API from inside the sandbox using `$GH_TOKEN` → HTTP 200 (proxy injection working)
5. Attempt exfiltration to `evil.example.com` → blocked by network policy
6. Clean up sandbox (optionally remove secret on shared machines)

**Success looks like:** `GH_TOKEN` shows `gho_sbxproxymanaged…`, not your real token; GitHub API check returns HTTP 200; exfiltration curl is blocked.

---

## Folder layout

| Path | Purpose |
|------|---------|
| [GUIDE.md](./GUIDE.md) | Copy-paste walkthrough |
| [workspace/](./workspace/) | Sandbox workspace mount (syncs into the VM) |

## Docker docs

| Topic | Link |
|-------|------|
| Credential proxy | [Secrets and outbound injection](https://docs.docker.com/ai/sandboxes/security/credentials/) |
| GitHub token | [GitHub service in credentials docs](https://docs.docker.com/ai/sandboxes/security/credentials/#github-token) |
| Security | [Sandbox security model](https://docs.docker.com/ai/sandboxes/security/) |
| Network policy | [Local governance and allow-lists](https://docs.docker.com/ai/sandboxes/governance/local/) |

## See also

| Resource | Purpose |
|----------|---------|
| [Lab 1](../lab-01-first-sandbox/) | Cursor API key for `sbx run cursor` |
| [Lab 2](../lab-02-network-policy/) | Network policy blocks exfiltration attempts |
| [Lab 4](../lab-04-clone-workflow/) | Clone mode workflow |

## Takeaway

Real secrets stay on the **host** (OS keychain). The VM sees a **placeholder**; the proxy injects auth on the way out. Never put tokens in a Dockerfile or committed file.
