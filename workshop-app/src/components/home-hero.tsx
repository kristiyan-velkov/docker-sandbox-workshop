import { ChevronRight, Container } from "lucide-react";
import { HeroBackground } from "@/components/hero-background";
import { LinkButton } from "@/components/link-button";
import { platformUrl } from "@/lib/site-config";

const HERO_STATS = [
  { value: "10", label: "Hands-on labs" },
  { value: "sbx", label: "CLI workflow" },
  { value: "microVM", label: "Isolation" },
] as const;

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <HeroBackground />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Playground app
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
              <span className="text-slate-900">Play with sbx.</span>{" "}
              <span className="bg-linear-to-r from-indigo-500 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Run agents.
              </span>{" "}
              <span className="bg-linear-to-r from-emerald-500 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Ship safely.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-500 sm:text-xl">
              Playground for{" "}
              <strong className="font-semibold text-slate-700">
                Claude Code
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-slate-700">Cursor</strong>{" "}
              in isolated microVMs with the{" "}
              <strong className="font-semibold text-slate-700">sbx CLI</strong>.
              Labs, login, and progress live on the hosted platform.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <LinkButton
                href={platformUrl("/labs")}
                size="lg"
                className="shadow-lg shadow-indigo-200 hover:-translate-y-0.5"
              >
                Start labs
                <ChevronRight className="size-5" />
              </LinkButton>
              <LinkButton
                href={platformUrl()}
                variant="secondary"
                size="lg"
                className="border border-slate-200 shadow-sm hover:-translate-y-0.5 hover:border-slate-300"
              >
                Open platform
              </LinkButton>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm sm:max-w-lg">
              {HERO_STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`px-4 py-4 sm:px-5 ${i !== 0 ? "border-l border-slate-200" : ""}`}
                >
                  <p className="text-lg font-bold text-slate-900 sm:text-xl">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-500 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 -z-10 scale-90 rounded-3xl bg-indigo-100/60 blur-3xl" />
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 shadow-2xl shadow-slate-300/40 ring-1 ring-slate-200/60">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-amber-400" />
                  <span className="size-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-mono text-xs text-slate-400">
                    sbx — playground
                  </span>
                </div>
              </div>
              <pre className="bg-[#0d1117] p-6 font-mono text-[13px] leading-relaxed text-[#e6edf3]">
                <code>{`$ brew install docker/tap/sbx
$ sbx login
$ cd ~/my-project
$ sbx run claude .

# Agent runs in microVM
# Host stays untouched ✓`}</code>
              </pre>
              <div className="flex items-center gap-3 border-t border-slate-200 bg-white px-5 py-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-200">
                  <Container className="size-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Docker Sandboxes
                  </p>
                  <p className="text-xs text-slate-500">
                    Deny-by-default · Credential proxy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
