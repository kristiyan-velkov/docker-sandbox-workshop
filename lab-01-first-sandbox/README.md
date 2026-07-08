# Lab 1 — Run Your First Docker Sandbox

**Time:** ~25 min  
**Workspace:** [`workspace/`](./workspace/) (synced into the VM)

**Goal:** Install `sbx`, start Cursor in an isolated microVM, create `hello.txt`, test workspace boundaries, and tear down cleanly.

→ **[GUIDE.md](./GUIDE.md)** — numbered step-by-step commands

---

## Why this lab matters

This is the foundation of the workshop. Before network policy or secrets, you need to see what a sandbox **is**: a separate microVM with its own kernel. The agent runs inside that VM; only `workspace/` syncs from your disk — files outside that folder stay on the host.

---

## Key concepts

| Concept | What it means in this lab |
|---------|---------------------------|
| `sbx run cursor .` | Boot microVM, sync workspace, start Cursor |
| `sbx secret set -g cursor` | Store Cursor API key on the host — required before the agent starts |
| Workspace mount | Only `workspace/` is visible inside the VM |
| `sbx ls` | List sandboxes — there is no `sbx status` |
| `sbx rm --force` | Full teardown of the microVM |

---

## Prerequisites

- [Docker Sandboxes (`sbx`)](https://docs.docker.com/ai/sandboxes/get-started/) installed
- `sbx login` completed
- A **Cursor API key** stored with `sbx secret set -g cursor` — see [GUIDE.md](./GUIDE.md) step 3

---

## What you'll do

1. Install and verify the `sbx` CLI (`brew install`, `sbx version`)
2. Sign in with `sbx login`
3. Store your Cursor API key with `sbx secret set -g cursor`
4. Start Cursor from `workspace/` with `--name my-sandbox`
5. Ask the agent to create `hello.txt`
6. Ask the agent to delete `../delete-me.txt` and observe the workspace boundary
7. Remove the sandbox

**Success looks like:** Cursor starts without a `CURSOR_API_KEY` error; `hello.txt` in `workspace/`; `delete-me.txt` still at the lab root.

---

## Folder layout

| Path | Purpose |
|------|---------|
| [GUIDE.md](./GUIDE.md) | Copy-paste walkthrough |
| [delete-me.txt](./delete-me.txt) | Outside workspace — used for the boundary exercise |
| [workspace/](./workspace/) | Sandbox workspace mount |

## Docker docs

| Topic | Link |
|-------|------|
| Get started | [Install sbx and first sandbox](https://docs.docker.com/ai/sandboxes/get-started/) |
| Cursor agent | [API key and configuration](https://docs.docker.com/ai/sandboxes/agents/cursor/) |
| Credentials | [Stored secrets (`sbx secret set`)](https://docs.docker.com/ai/sandboxes/security/credentials/#stored-secrets) |
| Usage | [Direct mode and workspace mounts](https://docs.docker.com/ai/sandboxes/usage/) |
| Architecture | [MicroVM isolation model](https://docs.docker.com/ai/sandboxes/architecture/) |
| CLI reference | [sbx command reference](https://docs.docker.com/reference/cli/sbx/) |

## See also

| Next | Topic |
|------|--------|
| [Lab 2](../lab-02-network-policy/) | Network deny rules |

## Takeaway

Each agent runs in its own **microVM**. The **workspace** syncs in; everything outside it stays on the host and cannot be changed from inside the sandbox.
