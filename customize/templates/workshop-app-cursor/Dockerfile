# Workshop template — Cursor agent + Docker-in-sandbox for workshop-app.
# See ../SPEC-REFERENCE.md for field-by-field roles.
# Docs: https://docs.docker.com/ai/sandboxes/customize/templates/

FROM docker.io/docker/sandbox-templates:cursor-agent-docker

USER agent

RUN mkdir -p /home/agent/.cursor/rules

# Generic Next.js rule in agent home — workshop-specific rules come from the kit (workspace).
COPY --chown=agent:agent agent/.cursor/rules/nextjs-app.mdc \
  /home/agent/.cursor/rules/nextjs-app.mdc
