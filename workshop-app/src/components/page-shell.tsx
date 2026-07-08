import type { ReactNode } from "react";
import { HeroBackground } from "@/components/hero-background";

type PageShellProps = {
  children?: ReactNode;
  hero?: ReactNode;
};

export function PageShell({ children, hero }: PageShellProps) {
  return (
    <>
      {hero}
      {children ? (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {children}
        </main>
      ) : null}
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: ReactNode;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <HeroBackground />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {eyebrow ? <div className="mb-3">{eyebrow}</div> : null}
        <h1 className="max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">{description}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}

export function SectionTitle({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <div className="mb-8 space-y-2">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-indigo-600">
      {children}
    </code>
  );
}

export function AgendaList({
  items,
}: {
  items: readonly { time: string; title: string; duration: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {items.map((item, index) => (
        <div
          key={item.title}
          className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${
            index > 0 ? "border-t border-slate-200" : ""
          }`}
        >
          <div>
            <span className="font-mono text-xs text-slate-400">{item.time}</span>
            <p className="text-base font-semibold text-slate-900">{item.title}</p>
          </div>
          <span className="text-sm text-slate-500">{item.duration}</span>
        </div>
      ))}
    </div>
  );
}

export function FeatureIcon({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
      {children}
    </div>
  );
}
