# Lab 1 — Step-by-step

Work from **`lab-01-first-sandbox/workspace/`** unless noted.

## 1. Install the sbx CLI

```bash
brew trust docker/tap
brew install docker/tap/sbx
sbx version
```

On Linux (Ubuntu):

```bash
curl -fsSL https://get.docker.com | sudo REPO_ONLY=1 sh
sudo apt-get install docker-sbx
sbx version
```

## 2. Sign in

```bash
sbx login
```

## 3. Store your Cursor API key

Cursor needs a host-stored secret before `sbx run cursor` can start the agent. **Do not** put the key in a file in this repo.

Run on the host (paste your key when prompted):

```bash
sbx secret set -g cursor
sbx secret ls
```

Create a key in **Cursor → Settings → API** (or ask your team admin). The host proxy injects it on outbound requests — inside the sandbox, `CURSOR_API_KEY` shows as `proxy-managed`, not your raw `crsr_…` key.

**If the agent exits** with `The API key was loaded from the CURSOR_API_KEY environment variable`:

```bash
unset CURSOR_API_KEY
sbx secret set -g cursor
```

A stale export in your shell can conflict with the keychain entry. Unset it, store the key again with `sbx secret set -g cursor`, then start a **new** sandbox (global secrets apply at create time).

→ [Stored secrets](https://docs.docker.com/ai/sandboxes/security/credentials/#stored-secrets) · [Cursor agent](https://docs.docker.com/ai/sandboxes/agents/cursor/#authentication)

## 4. Start your first sandbox

```bash
cd lab-01-first-sandbox/workspace
sbx run cursor . --name my-sandbox
```

Wait until Cursor starts. Only the `workspace/` folder syncs into the VM.

## 5. Create `hello.txt` in the workspace

In Cursor, paste:

> Create a file named `hello.txt` in this workspace with a one-line greeting, then show me the file contents.

Confirm the file appears on the host:

```bash
ls lab-01-first-sandbox/workspace/hello.txt
```

## 6. Test the workspace boundary

The file `delete-me.txt` lives **outside** the synced workspace (one directory above). In Cursor, paste:

> Try to delete `../delete-me.txt` from this workspace. Report whether it worked and explain why sandbox workspace mounts limit what you can change on the host.

The file should remain on the host — the agent cannot remove paths outside the workspace mount.

## 7. Policy log and clean up

```bash
sbx policy log --limit 10
sbx rm my-sandbox --force
```

Done when Cursor starts without an API key error, `hello.txt` exists in `workspace/`, `delete-me.txt` is still at the lab root, and `sbx ls` no longer lists `my-sandbox`.

---

## Docker docs

| Topic | Link |
|-------|------|
| Get started | [Install sbx and first sandbox](https://docs.docker.com/ai/sandboxes/get-started/) |
| Cursor agent | [API key and configuration](https://docs.docker.com/ai/sandboxes/agents/cursor/) |
| Credentials | [Stored secrets (`sbx secret set`)](https://docs.docker.com/ai/sandboxes/security/credentials/#stored-secrets) |
| Usage | [Direct mode and workspace mounts](https://docs.docker.com/ai/sandboxes/usage/) |
| Architecture | [MicroVM isolation model](https://docs.docker.com/ai/sandboxes/architecture/) |
| CLI reference | [sbx command reference](https://docs.docker.com/reference/cli/sbx/) |
