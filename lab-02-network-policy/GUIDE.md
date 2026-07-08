# Lab 2 — Step-by-step

Run **policy commands on the host** first, then work from **`lab-02-network-policy/workspace/`** for the sandbox.

## 1. Initialize global balanced policy

Run on the host **before** starting the sandbox:

```bash
sbx policy init balanced
sbx policy ls
```

If you see `global network policy is already initialized`, reset and init again:

```bash
sbx policy reset
sbx policy init balanced
sbx policy ls
```

Expect the balanced allow-list defaults — `www.dockerfrontend.com` stays blocked until you allow it.

## 2. Start your sandbox

```bash
cd lab-02-network-policy/workspace
sbx run cursor . --name lab2
```

Wait until Cursor starts. Only the `workspace/` folder syncs into the VM. Use a **second host terminal** for `sbx policy` commands and `sbx policy log`.

## 3. Prove default deny — ask Cursor to curl

In Cursor, paste:

> curl https://www.dockerfrontend.com and show me the full response (status code and body). Confirm this URL is blocked by sandbox network policy.

The agent should report a blocked or failed request — not a normal homepage.

On the host, validate the block in the policy log:

```bash
sbx policy log lab2 --limit 10
```

Expect a blocked entry for `www.dockerfrontend.com`.

## 4. Allow `www.dockerfrontend.com` and ask Cursor to curl again

On the host:

```bash
sbx policy allow network www.dockerfrontend.com
```

In Cursor:

> curl https://www.dockerfrontend.com again and show me more about the book — title, description, and what you find on the page.

Then check the log:

```bash
sbx policy log lab2 --limit 10
```

Expect an allowed request for `www.dockerfrontend.com`.

## 5. Read the allowed site

In Cursor, paste:

> List the Docker books on www.dockerfrontend.com — give me the title and a short description for each one you find.

## 6. Inspect policy for this sandbox

**Two different commands — do not confuse them:**

| Command | Shows | Has rule IDs? |
|---------|-------|---------------|
| `sbx policy log lab2` | Traffic audit — which hosts were allowed/blocked | No — shows HOST, PROXY, RULE (e.g. `domain-allowed`) |
| `sbx policy ls --type network lab2` | Active rule definitions | Yes — UUID in **POLICY/RULE** column |

Validate traffic (no IDs):

```bash
sbx policy log lab2 --limit 10
```

Find rule IDs for removal or replacement:

```bash
sbx policy ls --type network lab2 | grep dockerfrontend
```

User-added rules show a UUID in the **POLICY/RULE** column:

```
PROVENANCE   APPLIES_TO     POLICY/RULE                            TYPE      DECISION   RESOURCES
local        sandbox:lab2   2ed35442-ebf3-4a92-a11e-56cb143969af   network   allow      www.dockerfrontend.com
```

**Rules are not updated in place.** To change allow/deny for a host, remove the existing rule first, then apply the new one:

```bash
# 1. Find the UUID in POLICY/RULE column
sbx policy ls --type network lab2 | grep dockerfrontend

# 2. Remove by ID (use the UUID from step 1)
sbx policy rm network --id 2ed35442-ebf3-4a92-a11e-56cb143969af --sandbox lab2

# 3. Apply the new rule
sbx policy deny network --sandbox lab2 www.dockerfrontend.com
```

To block a host **only for this sandbox** (without affecting others), use `--sandbox`:

```bash
sbx policy deny network --sandbox lab2 ads.example.com
```

That denies `ads.example.com` for `lab2` only — useful when one sandbox needs tighter rules than the global policy.

## 7. Deny `www.dockerfrontend.com` for `lab2` only

If a rule for this host already exists, remove it first (see step 6 — use the UUID from `sbx policy ls`, not `sbx policy log`). On the host:

```bash
sbx policy deny network --sandbox lab2 www.dockerfrontend.com
```

In Cursor:

> curl https://www.dockerfrontend.com again and show the response. Confirm the request is blocked by policy again.

Validate on the host:

```bash
sbx policy log lab2 --limit 10
```

## 8. Remove network rules and clean up

Find UUIDs in `sbx policy ls` (not `sbx policy log`), then remove by ID or resource:

```bash
sbx policy ls --type network lab2 | grep dockerfrontend

# By ID (UUID from POLICY/RULE column):
sbx policy rm network --id <uuid> --sandbox lab2

# Or by resource:
sbx policy rm network --sandbox lab2 --resource www.dockerfrontend.com
sbx policy rm network --resource www.dockerfrontend.com
sbx policy ls --type network lab2 | grep dockerfrontend
sbx rm lab2 --force
```

Done when the agent shows blocked and allowed curl responses, `sbx policy log` confirms each block and allow for `www.dockerfrontend.com`, and sandbox-scoped rules are removed at the end.

---

## Docker docs

| Topic | Link |
|-------|------|
| Network policy | [Local governance and allow-lists](https://docs.docker.com/ai/sandboxes/governance/local/) |
| Security | [Sandbox security model](https://docs.docker.com/ai/sandboxes/security/) |
| CLI reference | [sbx policy commands](https://docs.docker.com/reference/cli/sbx/) |
