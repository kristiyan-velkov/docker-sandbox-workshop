export const site = {
  title: "Docker Sandbox Workshop",
  githubRepoUrl: "https://github.com/kristiyan-velkov/docker-sandbox-workshop",
  dockerUrl: "https://www.docker.com/",
  dockerSandboxesUrl: "https://docs.docker.com/ai/sandboxes/",
  zeropsUrl: "https://zerops.io",
  zeropsDocsUrl: "https://docs.zerops.io/",
  /** Hosted register / login / progress / Q&A (docker-sandbox-platform on Zerops). */
  platformDefaultUrl: "https://nextjs-26f1-3000.prg1.zerops.app",
} as const;

/** Full platform URL — labs, registration, login, progress tracking. */
export function platformUrl(path = "") {
  const base =
    process.env.NEXT_PUBLIC_PLATFORM_URL?.replace(/\/$/, "") ?? site.platformDefaultUrl;
  return path ? `${base}${path.startsWith("/") ? path : `/${path}`}` : base;
}
