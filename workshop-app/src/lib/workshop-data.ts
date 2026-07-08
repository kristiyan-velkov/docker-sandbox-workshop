import { WORKSHOP_LAB_IDS } from "@/lib/labs";

export const workshop = {
  title: "Run AI Agents Safely with Docker Sandboxes",
  event: "WeAreDevelopers World Congress",
  location: "Berlin",
  duration: "10 hands-on labs",
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
  { time: "1:35", title: "Labs 4–10 — self-paced (clone, app, kits, capstone)", duration: "25+ min" },
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
    description: "Install sbx, boot Claude Code in a microVM, inspect and tear down.",
    task: `1. Install sbx and run sbx login.
2. cd into lab-01-first-sandbox/workspace/ and start Claude with sbx run claude . --name my-sandbox.
3. Ask the agent to create hello.txt in the workspace.
4. From a second terminal, inspect with sbx ls and sbx exec.
5. Remove the sandbox with sbx rm.

Done when hello.txt exists on your host in workspace/, sbx exec shows a different kernel than your machine, and sbx rm removes the sandbox from sbx ls.`,
    hints: [
      "Work from lab-01-first-sandbox/workspace/ — mounting the repo root is the most common mistake.",
      "Open a second terminal on the host for sbx ls, sbx exec, and sbx policy log while the agent runs.",
      "There is no sbx status — use sbx ls. Success for uname: VM kernel ≠ host kernel.",
      "If Claude won't start: run sbx login and sbx secret set -g anthropic on the host first.",
    ],
    steps: [
      {
        label: "Install & verify",
        task: "Install sbx from Docker's tap, print the version, then authenticate with sbx login. Expect a version string and a successful login message.",
        command: "brew install docker/tap/sbx && sbx version",
      },
      {
        label: "Start sandbox",
        task: "cd into workspace/, then boot Claude Code in a named sandbox. Leave this terminal on the agent — use another terminal for host commands.",
        command: "cd lab-01-first-sandbox/workspace && sbx run claude . --name my-sandbox",
      },
      {
        label: "Inspect",
        task: "On the host: confirm my-sandbox appears in sbx ls and list its network policy. Ask the agent to create hello.txt, then check it appears in workspace/ on the host.",
        command: "sbx ls && sbx policy ls my-sandbox",
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
    description: "Store credentials on the host, verify sentinel values inside the VM.",
    task: `1. Store your real Anthropic key on the host with sbx secret set -g anthropic — never put it in a file in this repo.
2. Start sbx run claude . --name lab3 from lab-03-secrets/workspace/.
3. sbx exec and echo $ANTHROPIC_API_KEY — output must be proxy-managed, never sk-ant-….
4. curl the Anthropic API from inside the VM and confirm HTTP 200.
5. Remove the sandbox with sbx rm lab3.

Done when the sentinel value appears in the VM, the API check returns HTTP 200, and your real key never appears in terminal output inside the sandbox.`,
    hints: [
      "Use a valid Anthropic key — dummy keys show proxy-managed but the API check returns 401.",
      "API verification must run via sbx exec lab3 — not on the host.",
      "If lab3 does not exist yet: start it with sbx run claude . --name lab3 from workspace/ first.",
      "Optional exfil test: curl https://evil.example.com from inside the VM should be blocked by policy.",
    ],
    steps: [
      {
        label: "Store on host",
        task: "Run sbx secret set -g anthropic on the host and paste your key when prompted. The key stays in the OS keychain — not in the repo.",
        command: "sbx secret set -g anthropic",
      },
      {
        label: "Start sandbox",
        task: "From lab-03-secrets/workspace/, boot Claude in a named sandbox. Leave this terminal on the agent — use another terminal for sbx exec checks.",
        command: "cd lab-03-secrets/workspace && sbx run claude . --name lab3",
      },
      {
        label: "Check sentinel",
        task: "Echo ANTHROPIC_API_KEY inside the running sandbox. Output must be exactly proxy-managed — if you see sk-ant-…, stop and fix your secret setup.",
        command: "sbx exec lab3 -- bash -c 'echo $ANTHROPIC_API_KEY'",
      },
      {
        label: "Verify proxy",
        task: "Confirm the sentinel is proxy-managed, then curl the Anthropic API from inside the VM. Expect HTTP 200 — the host proxy injects your real key on the way out.",
        command:
          "sbx exec lab3 -- bash -c 'test \"$ANTHROPIC_API_KEY\" = \"proxy-managed\" && curl -s -o /dev/null -w \"HTTP %{http_code}\\n\" https://api.anthropic.com/v1/messages -H \"Content-Type: application/json\" -H \"x-api-key: $ANTHROPIC_API_KEY\" -H \"anthropic-version: 2023-06-01\" -d \"{\\\"model\\\":\\\"claude-3-5-haiku-latest\\\",\\\"max_tokens\\\":1,\\\"messages\\\":[{\\\"role\\\":\\\"user\\\",\\\"content\\\":\\\"hi\\\"}]}\"'",
      },
      {
        label: "Clean up",
        task: "Remove sandbox lab3 when verification passes. On shared machines, also run sbx secret rm -g anthropic after the lab.",
        command: "sbx rm lab3 --force",
      },
    ],
  },
  {
    id: "lab-04",
    title: "Clone Mode · Git Workflow",
    time: "15 min",
    folder: "lab-04-clone-workflow",
    githubPath: "lab-04-clone-workflow",
    description: "Clone-mode sandbox, agent commits on a test branch, fetch on the host.",
    task: `1. Optional: copy workshop-app/.env.example to .env.local (platform links default to https://nextjs-26f1-3000.prg1.zerops.app).
2. sbx run --clone cursor workshop-app/ with the workshop kit as workshop-clone.
3. Ask the agent to create branch feat/workshop-test, add a one-line comment to workshop-data.ts, and commit.
4. On the host, run git fetch sandbox-workshop-clone and review the diff.
5. Remove the sandbox with sbx rm workshop-clone.

Done when host git status is still clean, git log sandbox-workshop-clone/feat/workshop-test shows the agent commit, and you reviewed the diff before merging anything.`,
    hints: [
      "Run every sbx command from the repository root — kit path ./customize/kit/… is relative to root.",
      "Clone mode gives the VM its own Git copy — your host main branch stays untouched until you fetch.",
      "After fetch, the remote is named sandbox-workshop-clone (pattern: sandbox-<your --name>).",
      "Agent prompt: \"Create branch feat/workshop-test, add a comment to workshop-data.ts, commit, and tell me the branch name.\"",
    ],
    steps: [
      {
        label: "Clone sandbox",
        task: "Launch Cursor in clone mode on workshop-app/ with the Next.js kit. Wait until the agent session is ready before prompting.",
        command:
          "sbx run --clone cursor workshop-app/ --kit ./customize/kit/workshop-app-nextjs --name workshop-clone",
      },
      {
        label: "Fetch branch",
        task: "On the host (new terminal, repo root): fetch commits from the sandbox clone. Expect new refs under sandbox-workshop-clone/.",
        command: "git fetch sandbox-workshop-clone",
      },
      {
        label: "Review diff",
        task: "Compare main to the agent branch before merging. Read every changed line — do not merge blindly.",
        command: "git diff main..sandbox-workshop-clone/feat/workshop-test",
      },
      {
        label: "Clean up",
        task: "Remove the sandbox when review is done. Optionally delete the sandbox-workshop-clone remote with git remote remove.",
        command: "sbx rm workshop-clone --force",
      },
    ],
  },
  {
    id: "lab-05",
    title: "Run workshop-app",
    time: "20 min",
    folder: "lab-05-workshop-app",
    githubPath: "lab-05-workshop-app",
    description: "Build template, stack kit mixin, verify Next.js dev server.",
    task: `1. Optional: copy workshop-app/.env.example to .env.local (platform: https://nextjs-26f1-3000.prg1.zerops.app).
2. Build and sbx template load workshop-app-cursor:v1.
3. sbx run with --template and --kit as workshop-ui.
4. curl http://127.0.0.1:3000 inside the VM and expect HTTP 200.
5. Open the forwarded URL from sbx ls in your browser.

Done when curl prints 200 and the workshop site loads in the browser.`,
    hints: [
      "Template = custom agent Docker image. Kit = spec that runs npm ci, starts dev server, and opens network ports.",
      "Build the template once — subsequent runs reuse workshop-app-cursor:v1 until you rebuild.",
      "sbx ls shows forwarded ports (e.g. localhost:PORT → 3000). Use that URL in your browser.",
      "Kit-only fallback: skip --template and use sbx run cursor workshop-app/ --kit ./customize/kit/workshop-app-nextjs.",
    ],
    steps: [
      {
        label: "Build template",
        task: "Build the Cursor agent image, export to tar, load into sbx. Takes a few minutes — wait for sbx template load to finish without errors.",
        command:
          "cd customize/templates/workshop-app-cursor && docker build -t workshop-app-cursor:v1 . && docker image save workshop-app-cursor:v1 -o workshop-app-cursor.tar && sbx template load workshop-app-cursor.tar",
      },
      {
        label: "Run stack",
        task: "From repo root: start Cursor with both template and kit on workshop-app/. Name it workshop-ui so later exec/curl commands match.",
        command:
          "sbx run --template workshop-app-cursor:v1 cursor workshop-app/ --kit ./customize/kit/workshop-app-nextjs --name workshop-ui",
      },
      {
        label: "Verify",
        task: "Curl the dev server inside the sandbox. HTTP 200 means Next.js is up. If 000, wait for npm run dev to finish booting.",
        command:
          "sbx exec workshop-ui -- curl -s -o /dev/null -w '%{http_code}\\n' http://127.0.0.1:3000",
      },
    ],
  },
  {
    id: "lab-06",
    title: "Templates · Kits · Skills",
    time: "15 min",
    folder: "lab-06-customize-stack",
    githubPath: "lab-06-customize-stack",
    description: "Stack customize/ template + kit, inspect layers, sbx kit add.",
    task: `1. sbx kit validate the workshop kit — fix any spec errors before running.
2. Run the full template + kit stack as customize-stack.
3. sbx exec and confirm .claude/skills/workshop-app/SKILL.md exists in the VM.
4. sbx kit add to copy the kit into kit-add-demo/ on the host.

Done when validate passes with no errors, the skill file exists in the VM, and kit-add-demo/ appears on the host.`,
    hints: [
      "Validate first — sbx kit validate catches spec.yaml mistakes before a 5-minute sandbox boot fails.",
      "Skills are injected into the workspace at .claude/skills/<name>/SKILL.md — not into the template image.",
      "Requires workshop-app-cursor:v1 from Lab 5 — rebuild the template if sbx says it is missing.",
      "kit add is a host-side copy helper — useful to fork a kit before customizing in Lab 8.",
    ],
    steps: [
      {
        label: "Validate kit",
        task: "Run validate from repo root. Read every error line and fix spec.yaml before continuing — zero errors is the goal.",
        command: "sbx kit validate ./customize/kit/workshop-app-nextjs",
      },
      {
        label: "Full stack",
        task: "Launch the same stack as Lab 5 but name it customize-stack. Confirm dev server starts and agent has workshop rules.",
        command: "sbx run --template workshop-app-cursor:v1 cursor workshop-app/ --kit ./customize/kit/workshop-app-nextjs --name customize-stack",
      },
      {
        label: "Verify skill",
        task: "Check the skill file inside the VM. Exit code 0 = file exists. If missing, re-check kit files/ in the spec.",
        command: "sbx exec customize-stack -- test -f .claude/skills/workshop-app/SKILL.md",
      },
      {
        label: "kit add",
        task: "Copy the workshop kit into ./kit-add-demo on the host. Inspect the folder — it should mirror the kit structure.",
        command: "sbx kit add kit-add-demo ./customize/kit/workshop-app-nextjs",
      },
    ],
  },
  {
    id: "lab-07",
    title: "Build a Component",
    time: "20 min",
    folder: "lab-07-build-component",
    githubPath: "lab-07-build-component",
    description: "Clone mode + kit — agent adds a UI component, lint and build gate.",
    task: `1. sbx run --clone cursor workshop-app/ with kit as feature-component.
2. Prompt the agent to create branch feat/lab-7-stats-card, add a WorkshopStats component, run npm run lint and npm run build, then commit.
3. sbx exec npm run build yourself as a quality gate.
4. git fetch sandbox-feature-component on the host and review the diff.

Done when build exits 0, the component renders on the home page, and you reviewed the diff on the host.`,
    hints: [
      "Paste this agent prompt: \"Create branch feat/lab-7-stats-card. Add WorkshopStats showing event, location, duration from workshop-data.ts using existing Apple CSS tokens. Render on home below hero. Run npm run lint && npm run build. Commit when green.\"",
      "Do not accept agent output until npm run build passes inside the sandbox — that is your quality gate.",
      "Use existing shadcn/Tailwind tokens — tell the agent not to add new UI libraries.",
      "Host git status should stay clean until you explicitly merge or checkout the fetched branch.",
    ],
    steps: [
      {
        label: "Clone + kit",
        task: "Start clone-mode Cursor with the workshop kit. Wait for npm ci and dev server before sending the component prompt.",
        command:
          "sbx run --clone cursor workshop-app/ --kit ./customize/kit/workshop-app-nextjs --name feature-component",
      },
      {
        label: "Build gate",
        task: "Run production build inside the VM after the agent finishes. Exit code 0 required — fix or re-prompt the agent if it fails.",
        command: "sbx exec feature-component -- npm run build",
      },
      {
        label: "Fetch",
        task: "On the host: fetch the agent branch and inspect with git log and git diff before merging to main.",
        command: "git fetch sandbox-feature-component",
      },
    ],
  },
  {
    id: "lab-08",
    title: "Create Your Kit",
    time: "20 min",
    folder: "lab-08-create-kit",
    githubPath: "lab-08-create-kit",
    description: "Copy starter-kit, customize spec.yaml, validate and pack.",
    task: `1. cp lab-08-create-kit/starter-kit to ./my-workshop-kit — never edit the starter in place.
2. Edit spec.yaml: set your kit name, caps.network.allow hosts you need, and tweak the skill SKILL.md.
3. sbx kit validate ./my-workshop-kit until it passes with no errors.
4. sbx kit pack to my-workshop-kit.zip.

Done when validate reports no errors and the zip file exists for Lab 9.`,
    hints: [
      "Edit only ./my-workshop-kit — the starter-kit/ folder stays pristine for other attendees.",
      "In spec.yaml: name, caps.network.allow (npm, Supabase, GitHub as needed), and files/workspace paths must match your layout.",
      "Run validate after every spec change — one typo in YAML blocks the whole kit.",
      "Pack produces my-workshop-kit.zip — you can also use the folder directly with --kit ./my-workshop-kit in Lab 9.",
    ],
    steps: [
      {
        label: "Copy starter",
        task: "Copy the starter scaffold to my-workshop-kit/ at repo root. ls my-workshop-kit/ — you should see spec.yaml and files/.",
        command: "cp -r lab-08-create-kit/starter-kit ./my-workshop-kit",
      },
      {
        label: "Validate",
        task: "Customize spec.yaml and skill content, then validate. Fix every reported error until the command exits successfully.",
        command: "sbx kit validate ./my-workshop-kit",
      },
      {
        label: "Pack",
        task: "Pack the kit into a zip for sharing or backup. Confirm my-workshop-kit.zip was created in the current directory.",
        command: "sbx kit pack ./my-workshop-kit -o my-workshop-kit.zip",
      },
    ],
  },
  {
    id: "lab-09",
    title: "Use Your Custom Kit",
    time: "15 min",
    folder: "lab-09-use-custom-kit",
    githubPath: "lab-09-use-custom-kit",
    description: "Run workshop-app with the kit you built in Lab 8.",
    task: `1. sbx run --clone cursor workshop-app/ --kit ./my-workshop-kit --name my-kit-clone.
2. sbx exec and verify .claude/skills/my-workshop-kit/SKILL.md exists in the workspace.
3. Ask the agent a question that should trigger your skill instructions.

Done when the skill file is present and the agent follows your kit instructions.`,
    hints: [
      "If my-workshop-kit/ is missing, complete Lab 8 first or use --kit ./customize/kit/workshop-app-nextjs as fallback.",
      "Skill path must match the folder name in your kit — default starter uses my-workshop-kit.",
      "Clone mode keeps your host Git clean while you test whether the kit injects the right files and rules.",
      "Check sbx ls for the dev-server port if you want to preview workshop-app in the browser.",
    ],
    steps: [
      {
        label: "Run",
        task: "From repo root: launch clone-mode Cursor with your custom kit. Confirm the sandbox name is my-kit-clone for the verify step.",
        command: "sbx run --clone cursor workshop-app/ --kit ./my-workshop-kit --name my-kit-clone",
      },
      {
        label: "Verify skill",
        task: "Confirm your skill file landed in the workspace. test -f exits 0 on success — if it fails, check files/ paths in spec.yaml.",
        command: "sbx exec my-kit-clone -- test -f .claude/skills/my-workshop-kit/SKILL.md",
      },
    ],
  },
  {
    id: "lab-10",
    title: "Capstone · PR Workflow",
    time: "20 min",
    folder: "lab-10-capstone",
    githubPath: "lab-10-capstone",
    description: "GitHub secret, clone mode, agent opens a PR — full delivery loop.",
    task: `1. Pipe gh auth token to sbx secret set -g github on the host (run gh auth status first).
2. sbx run --clone cursor workshop-app/ --kit ./my-workshop-kit --name capstone.
3. Agent creates feat/lab-10-capstone, edits copy, commits, and runs gh pr create — or you git fetch sandbox-capstone and open the PR from the host.
4. sbx policy log --limit 20 to audit GitHub API calls.

Done when a PR exists (or branch is fetched on host), gh worked via the proxy, and policy log shows api.github.com allowed.`,
    hints: [
      "Never commit tokens — echo \"$(gh auth token)\" | sbx secret set -g github stores it on the host only.",
      "If gh push fails inside the VM: git fetch sandbox-capstone on the host and open the PR from there.",
      "Agent prompt: \"Branch feat/lab-10-capstone. Update hero copy in workshop-data.ts. npm run build. Commit and gh pr create with a short description.\"",
      "sbx policy log confirms credentials were injected — you should see api.github.com without the raw token in logs.",
    ],
    steps: [
      {
        label: "GitHub secret",
        task: "Store GitHub token on the host for the credential proxy. Requires gh CLI logged in — run gh auth status first.",
        command: 'echo "$(gh auth token)" | sbx secret set -g github',
      },
      {
        label: "Clone + kit",
        task: "Start the capstone sandbox in clone mode with your kit. Use my-workshop-kit from Lab 8 or swap in ./customize/kit/workshop-app-nextjs.",
        command: "sbx run --clone cursor workshop-app/ --kit ./my-workshop-kit --name capstone",
      },
      {
        label: "Fetch",
        task: "Fallback if in-VM push fails: on the host, fetch the agent branch and finish the PR workflow locally with gh or git.",
        command: "git fetch sandbox-capstone",
      },
      {
        label: "Audit",
        task: "Review the last 20 outbound requests. Confirm GitHub API calls were allowed and no unexpected hosts were contacted.",
        command: "sbx policy log --limit 20",
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
    body: "sbx run claude . boots a microVM. The agent goes full YOLO inside the sandbox. Your host, keys, and Docker daemon stay untouched.",
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
