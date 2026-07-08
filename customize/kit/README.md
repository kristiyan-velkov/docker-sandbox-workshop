# Kit

YAML [kit mixins](https://docs.docker.com/ai/sandboxes/customize/kits/) applied at sandbox creation with `--kit`. Mixins extend an existing agent with tools, network rules, files, and startup commands — stack several with repeated `--kit` flags.

| Kit | Purpose |
|-----|---------|
| [workshop-app-nextjs](./workshop-app-nextjs/) | `npm ci`, Next.js dev server, network allow-list, Claude skill, Cursor rules |

## Validate

```bash
sbx kit validate ./customize/kit/workshop-app-nextjs
sbx kit inspect ./customize/kit/workshop-app-nextjs
```

## Usage

**Local:** `--kit ./customize/kit/workshop-app-nextjs`

**GitHub:** `--kit "git+https://github.com/kristiyan-velkov/docker-sandbox-workshop.git#dir=customize/kit/workshop-app-nextjs"`

Allow the GitHub publisher first:

```bash
sbx settings set kit.allowedSources '["docker.io/","github.com/kristiyan-velkov/"]'
```

See [../README.md](../README.md) for full local vs GitHub instructions, [workshop-app-nextjs/README.md](./workshop-app-nextjs/README.md) for kit details, and [../SPEC-REFERENCE.md](../SPEC-REFERENCE.md) for field-by-field roles.
