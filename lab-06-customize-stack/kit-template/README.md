# Lab 6 kit template

Blank scaffold for your custom mixin kit. Copy to `./my-workshop-kit` at the monorepo root — never edit this folder in place.

```bash
cp -r lab-06-customize-stack/kit-template ./my-workshop-kit
```

## Fill in `spec.yaml`

| Field | You set |
|-------|---------|
| `name` / `displayName` | Your kit identifier (e.g. `acme-nextjs-kit`) |
| `description` | One-line summary for `sbx kit inspect` |
| `network.allowedDomains` | Domains your team needs (npm registry, APIs, docs) |
| `network.deniedDomains` | Domains to block |
| `environment.variables` | Non-secret env vars in the VM |
| `commands.startup` | Already wired to `workshop-bootstrap.sh` — edit `description` if needed |

Bootstrap script and skill are in `files/` — customize the skill under `files/workspace/.claude/skills/my-workshop-kit/SKILL.md` (rename folder if you change `name`).

```bash
sbx kit validate ./my-workshop-kit
cd workshop-app
sbx run cursor . --kit ../my-workshop-kit --name lab6-my-kit
```

See [README.md](../README.md) for core concepts and [GUIDE.md](../GUIDE.md) for the full walkthrough.
