# Next.js template — Cursor agent in Docker Sandbox.
# See ../SPEC-REFERENCE.md for field-by-field roles.
# Docs: https://docs.docker.com/ai/sandboxes/customize/templates/

# FROM: official Cursor sandbox base — pair with `sbx run … cursor` and matching --template tag
FROM docker.io/docker/sandbox-templates:cursor-agent-docker

# USER agent: build and run as non-root sandbox user
USER agent

# RUN: ensure Cursor rules directory exists before COPY
RUN mkdir -p /home/agent/.cursor/rules

# COPY: bake Next.js App Router rule into agent home (kit adds project rules to the workspace)
COPY --chown=agent:agent agent/.cursor/rules/nextjs-app.mdc \
  /home/agent/.cursor/rules/nextjs-app.mdc
