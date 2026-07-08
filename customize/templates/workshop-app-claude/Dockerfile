# Workshop template — Claude Code + Docker-in-sandbox for workshop-app.
# See ../SPEC-REFERENCE.md for field-by-field roles.
# Docs: https://docs.docker.com/ai/sandboxes/customize/templates/

# FROM: official Claude sandbox base — pair with `sbx run … claude` and matching --template tag
FROM docker.io/docker/sandbox-templates:claude-code-docker

# USER agent: build and run as non-root sandbox user
USER agent

# RUN: ensure skill directory exists before COPY
RUN mkdir -p /home/agent/.claude/skills/workshop-app

# COPY: bake workshop skill into agent home (persists across workspace sync)
COPY --chown=agent:agent agent/.claude/skills/workshop-app/SKILL.md \
  /home/agent/.claude/skills/workshop-app/SKILL.md
