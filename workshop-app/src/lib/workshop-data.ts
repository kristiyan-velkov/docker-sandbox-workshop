import { WORKSHOP_LAB_IDS } from "@/lib/labs";

export const workshop = {
  title: "Run AI Agents Safely with Docker Sandboxes",
  duration: "6 hands-on labs",
  docsUrl: "https://docs.docker.com/ai/sandboxes/",
  githubRepoUrl: "https://github.com/kristiyan-velkov/docker-sandbox-workshop",
} as const;

export const labOptions = [
  { value: "all", label: "All labs" },
  ...WORKSHOP_LAB_IDS.map((id) => ({
    value: id,
    label: `Lab ${Number.parseInt(id.replace("lab-", ""), 10)}`,
  })),
] as const;

export const questionLabOptions = [
  { value: "general", label: "General / Q&A" },
  ...WORKSHOP_LAB_IDS.map((id) => ({
    value: id,
    label: `Lab ${Number.parseInt(id.replace("lab-", ""), 10)}`,
  })),
] as const;

export const agenda = [
  { time: "0:00", title: "Welcome & the YOLO problem", duration: "10 min" },
  { time: "0:10", title: "Lab 1 — First sandbox", duration: "25 min" },
  { time: "0:35", title: "Lab 2 — Network policy & templates", duration: "40 min" },
  { time: "1:15", title: "Lab 3 — Secrets & credential isolation", duration: "20 min" },
  { time: "1:35", title: "Labs 4–6 — self-paced (clone, kit, custom kit)", duration: "25+ min" },
  { time: "1:50", title: "Q&A", duration: "10 min" },
] as const;

export const isolationLayers = [
  {
    name: "Hypervisor",
    description: "Each agent runs in its own microVM with a dedicated kernel.",
  },
  {
    name: "Network",
    description: "Deny-by-default outbound traffic via a host-side proxy.",
  },
  {
    name: "Docker Engine",
    description: "Separate engine inside the VM — never your host daemon.",
  },
  {
    name: "Workspace",
    description: "Your project synced in; git credentials stay on the host.",
  },
  {
    name: "Credential proxy",
    description: "API keys injected on outbound HTTPS — never stored in the VM.",
  },
] as const;

export const labs = [
  {
    id: "lab-01",
    title: "Run Your First Sandbox",
    time: "25 min",
    folder: "lab-01-first-sandbox",
    githubPath: "lab-01-first-sandbox",
    description: "Install sbx, store Cursor API key, boot agent in a microVM, inspect and tear down.",
    task: `1. Install sbx and run sbx login.
2. Store your Cursor API key with sbx secret set -g cursor — never put it in a repo file.
3. cd into lab-01-first-sandbox/workspace/ and start Cursor with sbx run cursor . --name my-sandbox.
4. Ask the agent to create hello.txt in the workspace.
5. From a second terminal, inspect with sbx ls and sbx exec.
6. Remove the sandbox with sbx rm.

Done when hello.txt exists on your host in workspace/, sbx exec shows a different kernel than your machine, and sbx rm removes the sandbox from sbx ls.`,
    hints: [
      "Work from lab-01-first-sandbox/workspace/ — mounting the repo root is the most common mistake.",
      "Open a second terminal on the host for sbx ls, sbx exec, and sbx policy log while the agent runs.",
      "There is no sbx status — use sbx ls. Success for uname: VM kernel ≠ host kernel.",
      "If Cursor won't start: run sbx login and sbx secret set -g cursor on the host first.",
    ],
    steps: [
      {
        label: "Install & verify",
        task: "Install sbx from Docker's tap, print the version, then authenticate with sbx login. Expect a version string and a successful login message.",
        command: "brew install docker/tap/sbx && sbx version && sbx login",
      },
      {
        label: "Store Cursor key",
        task: "Run sbx secret set -g cursor on the host and paste your key when prompted. The key stays in the OS keychain — not in the repo.",
        command: "sbx secret set -g cursor",
      },
      {
        label: "Start sandbox",
        task: "cd into workspace/, then boot Cursor in a named sandbox. Leave this terminal on the agent — use another terminal for host commands.",
        command: "cd lab-01-first-sandbox/workspace && sbx run cursor . --name my-sandbox",
      },
      {
        label: "Inspect",
        task: "On the host: confirm my-sandbox appears in sbx ls. Ask the agent to create hello.txt, then check it appears in workspace/ on the host.",
        command: "sbx ls && sbx exec my-sandbox -- uname -a",
      },
      {
        label: "Clean up",
        task: "Review the last 10 proxy decisions, then force-remove the sandbox. Done when sbx ls no longer lists my-sandbox.",
        command: "sbx policy log --limit 10 && sbx rm my-sandbox --force",
      },
    ],
  },
  {
    id: "lab-02",
    title: "Network Policy · Template · Clone",
    time: "40 min",
    folder: "lab-02-network-policy",
    githubPath: "lab-02-network-policy",
    description: "Block outbound hosts, build a custom template, and preview clone mode.",
    task: `1. Initialize network policy and deny api.example.com.
2. Create shell sandbox lab2 and curl the denied host — expect HTTP 403, not a successful connection.
3. Build and load a custom image from sandbox.Dockerfile (docker build + sbx template load).
4. Run a sandbox with --template lab2-kit:latest and verify pandas imports inside the VM.
5. Preview --clone on this Git repo from the repository root.

Done when sbx policy log shows the deny rule matched, curl to the blocked host returns 403, and python3 imports pandas inside the template sandbox.`,
    hints: [
      "Run docker build from lab-02-network-policy/ where sandbox.Dockerfile lives — not from workspace/.",
      "HTTP 403 on curl means the deny rule worked. A timeout or 000 usually means policy was not initialized.",
      "Local images must be registered with sbx template load before you can pass --template.",
      "Clone mode (--clone) only applies at create time — you cannot add it to a running sandbox.",
    ],
    steps: [
      {
        label: "Init policy & deny",
        task: "Initialize the balanced policy profile (once per machine), then deny outbound HTTPS to api.example.com. Expect the deny rule to appear when you run sbx policy ls.",
        command:
          'cd lab-02-network-policy && sbx policy init balanced && sbx policy deny network "api.example.com"',
      },
      {
        label: "Verify block",
        task: "Create shell sandbox lab2 with the workspace mount, then curl https://api.example.com from inside the VM. Expect HTTP 403 — proof the proxy blocked the request, not a successful connection.",
        command:
          'cd lab-02-network-policy && sbx create shell workspace --name lab2 -q && sbx exec lab2 -- sh -c "curl -s -o /dev/null -w \'%{http_code}\n\' https://api.example.com"',
      },
      {
        label: "Build template",
        task: "Build lab2-kit:latest from sandbox.Dockerfile, save it to a tar archive, and load it into sbx. Expect sbx template ls to list lab2-kit:latest.",
        command:
          "cd lab-02-network-policy && docker build -f sandbox.Dockerfile -t lab2-kit:latest . && docker save lab2-kit:latest -o lab2-kit.tar && sbx template load lab2-kit.tar",
      },
      {
        label: "Run template",
        task: "Start a shell sandbox with --template lab2-kit:latest, then verify the extra Python packages inside the VM. Expect import pandas, numpy, matplotlib to succeed and print kit OK.",
        command:
          'cd lab-02-network-policy && sbx create shell workspace --name lab2-kit --template lab2-kit:latest -q && sbx exec lab2-kit -- python3 -c "import pandas, numpy, matplotlib; print(\'kit OK\')"',
      },
      {
        label: "Clone preview",
        task: "From the repository root, create a shell sandbox in clone mode on this Git checkout — a dry run before Lab 4. Expect a sandbox-featwork remote on the host after git fetch.",
        command: "sbx create shell . --name featwork --clone",
      },
    ],
  },
  {
    id: "lab-03",
    title: "Secrets · Security",
    time: "20 min",
    folder: "lab-03-secrets",
    githubPath: "lab-03-secrets",
    description: "Store GitHub token on the host, verify sentinel GH_TOKEN inside the VM.",
    task: `1. Pipe gh auth token to sbx secret set -g github on the host — never put it in a file in this repo.
2. Start sbx run cursor . --name lab3 from lab-03-secrets/workspace/.
3. sbx exec and echo $GH_TOKEN — output must contain sbxproxymanaged, never your real gho_… token.
4. curl api.github.com/user from inside the VM and confirm HTTP 200.
5. Remove the sandbox with sbx rm lab3.

Done when the sentinel value appears in the VM, the GitHub API check returns HTTP 200, and your real token never appears in terminal output inside the sandbox.`,
    hints: [
      "Requires gh CLI logged in — run gh auth status before sbx secret set -g github.",
      "GitHub auth uses GH_TOKEN in the VM, not GITHUB_TOKEN.",
      "API verification must run via sbx exec lab3 — not on the host.",
      "Optional exfil test: curl https://evil.example.com from inside the VM should be blocked by policy.",
    ],
    steps: [
      {
        label: "Store on host",
        task: "Run gh auth status, then pipe gh auth token to sbx secret set -g github. The token stays in the OS keychain — not in the repo.",
        command: 'gh auth status && echo "$(gh auth token)" | sbx secret set -g github',
      },
      {
        label: "Start sandbox",
        task: "From lab-03-secrets/workspace/, boot Cursor in a named sandbox. Leave this terminal on the agent — use another terminal for sbx exec checks.",
        command: "cd lab-03-secrets/workspace && sbx run cursor . --name lab3",
      },
      {
        label: "Check sentinel",
        task: "Echo GH_TOKEN inside the running sandbox. Output must contain sbxproxymanaged — if you see your real gho_… token, stop and fix your secret setup.",
        command: "sbx exec lab3 -- bash -c 'echo \"GH_TOKEN=$GH_TOKEN\"'",
      },
      {
        label: "Verify proxy",
        task: "Confirm the sentinel is present, then curl the GitHub API from inside the VM. Expect HTTP 200 — the host proxy injects your real token on the way out.",
        command:
          'sbx exec lab3 -- bash -c \'echo "$GH_TOKEN" | grep -q sbxproxymanaged && curl -s -o /dev/null -w "HTTP %{http_code}\\n" -H "Authorization: Bearer $GH_TOKEN" https://api.github.com/user\'',
      },
      {
        label: "Clean up",
        task: "Remove sandbox lab3 when verification passes. On shared machines, also run sbx secret rm -g github after the lab.",
        command: "sbx rm lab3 --force && sbx secret rm -g github --force",
      },
    ],
  },
  {
    id: "lab-04",
    title: "Direct & Clone Mode",
    time: "25 min",
    folder: "lab-04-clone-workflow",
    githubPath: "lab-04-clone-workflow",
    description: "Compare direct mode on workshop-app/ vs clone mode on the monorepo root.",
    task: `1. Validate workshop-app on the host: npm install && npm run dev, then stop.
2. Direct mode: sbx run cursor workshop-app/ --name lab4-direct — agent edits hero; changes appear on host immediately.
3. Clone mode: sbx run --clone cursor . --name lab4-clone from repo root.
4. Agent creates feat/lab4-test, commits in workshop-app/src/lib/workshop-data.ts.
5. git fetch sandbox-lab4-clone, review diff — host main stays clean.
6. git checkout -b feat/lab4-test sandbox-lab4-clone/feat/lab4-test, push, merge to main.

Done when direct hero edit is visible without fetch; host main never dirty during clone mode; agent branch reviewed and merged.`,
    hints: [
      "All sbx commands run from the monorepo root after setup — except direct mode uses workshop-app/ as workspace.",
      "Clone mode (--clone) requires the Git repository root — use . not workshop-app/.",
      "After fetch, the remote is named sandbox-lab4-clone (pattern: sandbox-<your --name>).",
      "Agent prompt: \"Create branch feat/lab4-test, add a one-line comment to workshop-data.ts, commit with docs: clone mode test.\"",
    ],
    steps: [
      {
        label: "Direct mode",
        task: "From repo root, start Cursor on workshop-app/ in direct mode. Ask the agent to update the hero tagline — edit should appear on the host without fetch.",
        command: "sbx run cursor workshop-app/ --name lab4-direct",
      },
      {
        label: "Clone mode",
        task: "From repo root, start Cursor in clone mode on the whole monorepo. Host main should stay clean while the agent works.",
        command: "sbx run --clone cursor . --name lab4-clone",
      },
      {
        label: "Fetch branch",
        task: "On the host (new terminal, repo root): fetch commits from the sandbox clone. Expect new refs under sandbox-lab4-clone/.",
        command: "git fetch sandbox-lab4-clone",
      },
      {
        label: "Push & merge",
        task: "Check out the agent branch, push to origin, and merge via PR or local merge. Review every changed line before merging.",
        command:
          "git checkout -b feat/lab4-test sandbox-lab4-clone/feat/lab4-test && git push -u origin feat/lab4-test",
      },
      {
        label: "Clean up",
        task: "Remove both sandboxes when review is done. Optionally delete the sandbox-lab4-clone remote.",
        command: "sbx rm lab4-direct lab4-clone --force",
      },
    ],
  },
  {
    id: "lab-05",
    title: "Run workshop-app with Kit",
    time: "20 min",
    folder: "lab-05-workshop-app",
    githubPath: "lab-05-workshop-app",
    description: "Run the pre-built kit from workshop-app/, test network allow/deny rules.",
    task: `1. cd workshop-app and copy .env.sandbox.example to .env.local (platform: https://nextjs-26f1-3000.prg1.zerops.app).
2. Confirm package.json and package-lock.json exist at workspace root.
3. sbx run cursor . --kit ../customize/kit/workshop-app-nextjs --name lab5-kit.
4. Agent researches kristiyanvelkov.com (allowed) and tries Google/LinkedIn (denied).
5. sbx policy log lab5-kit and curl :3000 — expect HTTP 200.

Done when curl prints 200, allowed research succeeds, and denied hosts appear blocked in policy log.`,
    hints: [
      "Workspace must be workshop-app/ — cd into it and use . not workshop-app/ from repo root.",
      "Kit uses files/home/ bootstrap + commands.startup — not commands.install (runs before workspace mount).",
      "Wait ~1 min on first start for npm ci and dev server.",
      "Kit network: allow registry.npmjs.org, kristiyanvelkov.com, leanpub.com; deny google.com, linkedin.com.",
    ],
    steps: [
      {
        label: "Preflight",
        task: "From workshop-app/, copy env example and confirm package files exist. npm install on host if lockfile is missing.",
        command:
          "cd workshop-app && cp .env.sandbox.example .env.local && test -f package.json && test -f package-lock.json && echo OK",
      },
      {
        label: "Run kit",
        task: "Start Cursor with the workshop kit mixin. Name it lab5-kit so later exec and policy commands match.",
        command:
          "cd workshop-app && sbx run cursor . --kit ../customize/kit/workshop-app-nextjs --name lab5-kit",
      },
      {
        label: "Network demo",
        task: "Ask the agent to research allowed sites and try denied ones. Review sbx policy log for allow/deny decisions.",
        command: "sbx policy log lab5-kit --limit 15",
      },
      {
        label: "Verify",
        task: "Curl the dev server inside the sandbox. HTTP 200 means Next.js is up. Inspect kit-injected rules and skills.",
        command:
          "sbx exec lab5-kit -- curl -s -o /dev/null -w '%{http_code}\\n' http://127.0.0.1:3000 && sbx exec lab5-kit -- ls .cursor/rules/",
      },
    ],
  },
  {
    id: "lab-06",
    title: "Create Your Custom Kit",
    time: "25 min",
    folder: "lab-06-customize-stack",
    githubPath: "lab-06-customize-stack",
    description: "Copy kit-template, customize spec.yaml, validate and run your own mixin.",
    task: `1. cp -r lab-06-customize-stack/kit-template to ./my-workshop-kit — never edit the template in place.
2. Edit spec.yaml: name, network.allowedDomains/deniedDomains, environment.variables.
3. Customize files/workspace/.claude/skills/my-workshop-kit/SKILL.md with your team rules.
4. sbx kit validate ./my-workshop-kit until it passes.
5. cd workshop-app && sbx run cursor . --kit ../my-workshop-kit --name lab6-my-kit.

Done when validate reports no errors, dev server returns HTTP 200, and the agent can read your skill file.`,
    hints: [
      "Edit only ./my-workshop-kit — kit-template/ stays pristine for other attendees.",
      "Bootstrap script is pre-wired in files/home/.local/bin/workshop-bootstrap.sh — tweak startup description if needed.",
      "Run validate after every spec change — one typo in YAML blocks the whole kit.",
      "Keep ./my-workshop-kit/ after the lab — reuse on any project with --kit ../my-workshop-kit.",
    ],
    steps: [
      {
        label: "Copy template",
        task: "Copy the kit scaffold to my-workshop-kit/ at repo root. ls my-workshop-kit/ — you should see spec.yaml and files/.",
        command: "cp -r lab-06-customize-stack/kit-template ./my-workshop-kit",
      },
      {
        label: "Validate",
        task: "Customize spec.yaml and skill content, then validate. Fix every reported error until the command exits successfully.",
        command: "sbx kit validate ./my-workshop-kit && sbx kit inspect ./my-workshop-kit",
      },
      {
        label: "Run your kit",
        task: "From workshop-app/, launch Cursor with your custom kit. Confirm the sandbox name is lab6-my-kit for verify steps.",
        command:
          "cd workshop-app && sbx run cursor . --kit ../my-workshop-kit --name lab6-my-kit",
      },
      {
        label: "Verify",
        task: "Confirm dev server and skill file inside the VM. Ask the agent to summarize your skill instructions.",
        command:
          "sbx exec lab6-my-kit -- curl -s -o /dev/null -w '%{http_code}\\n' http://127.0.0.1:3000 && sbx exec lab6-my-kit -- test -f .claude/skills/my-workshop-kit/SKILL.md",
      },
    ],
  },
] as const;

export const yoloPoints = [
  {
    title: "The problem",
    body: "YOLO mode lets agents run shell commands, install packages, and edit files without asking. Powerful — and dangerous on your host.",
  },
  {
    title: "The sbx answer",
    body: "sbx run cursor . boots a microVM. The agent goes full YOLO inside the sandbox. Your host, keys, and Docker daemon stay untouched.",
  },
  {
    title: "Default posture",
    body: "Network deny-by-default, credential proxy injection, isolated Docker Engine, and full teardown with sbx rm.",
  },
] as const;

export function labGithubUrl(githubPath: string) {
  return `${workshop.githubRepoUrl}/tree/main/${githubPath}`;
}

export function labGuideGithubUrl(githubPath: string) {
  return `${workshop.githubRepoUrl}/blob/main/${githubPath}/GUIDE.md`;
}

export function labReadmeGithubUrl(githubPath: string) {
  return `${workshop.githubRepoUrl}/blob/main/${githubPath}/README.md`;
}
